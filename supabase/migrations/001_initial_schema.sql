-- Exhale Health — Initial Database Schema
-- Run this in Supabase SQL Editor

-- ============================================================
-- PROFILES (extends Supabase auth.users)
-- ============================================================
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  first_name text,
  last_name text,
  date_of_birth date,
  phone text,
  street_address text,
  suburb text,
  state text,
  postcode text,
  id_document_url text,
  assessment_status text not null default 'pending'
    check (assessment_status in ('pending', 'approved', 'needs_info', 'declined')),
  is_admin boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Users can read/update their own profile
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, first_name, last_name)
  values (
    new.id,
    new.raw_user_meta_data ->> 'first_name',
    new.raw_user_meta_data ->> 'last_name'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- ASSESSMENTS
-- ============================================================
create table public.assessments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  smoking_years integer,
  cigarettes_per_day integer,
  previous_quit_attempts text,
  current_nicotine_use text,
  health_conditions jsonb default '[]'::jsonb,
  medications text,
  pregnancy_status boolean default false,
  cardiovascular_conditions boolean default false,
  quit_motivation text,
  preferred_nicotine_delivery text,
  pharmacist_notes text,
  reviewed_by uuid references public.profiles(id),
  reviewed_at timestamptz,
  status text not null default 'submitted'
    check (status in ('submitted', 'approved', 'needs_info', 'declined')),
  decline_reason text,
  created_at timestamptz not null default now()
);

alter table public.assessments enable row level security;

create policy "Users can view own assessments"
  on public.assessments for select
  using (auth.uid() = user_id);

create policy "Users can insert own assessments"
  on public.assessments for insert
  with check (auth.uid() = user_id);

-- ============================================================
-- PRODUCTS
-- ============================================================
create table public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  brand text,
  type text not null,
  nicotine_strength_mg numeric,
  volume_ml numeric,
  flavour text,
  schedule text not null default 'none'
    check (schedule in ('s3', 's4', 'none')),
  description text,
  wholesale_price integer not null default 0,
  retail_price integer not null,
  rrp integer not null,
  stock_quantity integer not null default 0,
  min_order_qty integer not null default 1,
  image_url text,
  tga_notified boolean not null default false,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.products enable row level security;

-- Products visible to approved members only
create policy "Approved users can view active products"
  on public.products for select
  using (
    active = true
    and exists (
      select 1 from public.profiles
      where id = auth.uid()
      and assessment_status = 'approved'
    )
  );

-- ============================================================
-- ORDERS
-- ============================================================
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'pending'
    check (status in ('pending', 'pharmacist_review', 'dispensed', 'shipped', 'delivered', 'cancelled')),
  subtotal integer not null,
  shipping_cost integer not null default 0,
  total integer not null,
  stripe_payment_intent_id text,
  stripe_checkout_session_id text,
  shipping_address jsonb,
  tracking_number text,
  shipped_at timestamptz,
  pharmacist_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.orders enable row level security;

create policy "Users can view own orders"
  on public.orders for select
  using (auth.uid() = user_id);

create policy "Users can insert own orders"
  on public.orders for insert
  with check (auth.uid() = user_id);

-- ============================================================
-- ORDER ITEMS
-- ============================================================
create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid not null references public.products(id),
  quantity integer not null default 1,
  unit_price integer not null
);

alter table public.order_items enable row level security;

create policy "Users can view own order items"
  on public.order_items for select
  using (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
    )
  );

-- ============================================================
-- SAS C NOTIFICATIONS (TGA compliance tracking)
-- ============================================================
create table public.sas_c_notifications (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id),
  user_id uuid not null references public.profiles(id),
  product_id uuid not null references public.products(id),
  tga_reference text,
  notification_date date,
  status text not null default 'pending'
    check (status in ('pending', 'submitted', 'confirmed')),
  notes text,
  created_at timestamptz not null default now()
);

alter table public.sas_c_notifications enable row level security;

-- ============================================================
-- UPDATED_AT TRIGGER
-- ============================================================
create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.update_updated_at();

create trigger products_updated_at
  before update on public.products
  for each row execute function public.update_updated_at();

create trigger orders_updated_at
  before update on public.orders
  for each row execute function public.update_updated_at();

-- ============================================================
-- STORAGE BUCKET for ID documents
-- ============================================================
insert into storage.buckets (id, name, public) values ('documents', 'documents', false);

create policy "Users can upload their own documents"
  on storage.objects for insert
  with check (bucket_id = 'documents' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Users can view their own documents"
  on storage.objects for select
  using (bucket_id = 'documents' and auth.uid()::text = (storage.foldername(name))[1]);
