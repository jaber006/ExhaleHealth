-- Exhale Health - Initial Database Schema
-- Created: 2026-02-21

-- Enable necessary extensions
create extension if not exists "uuid-ossp" schema extensions;

-- ============================================
-- PROFILES
-- ============================================
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  first_name text not null,
  last_name text not null,
  date_of_birth date not null,
  phone text,
  email text not null,
  shipping_street text,
  shipping_suburb text,
  shipping_state text,
  shipping_postcode text,
  id_verified boolean default false,
  id_document_url text,
  assessment_status text default 'pending' check (assessment_status in ('pending', 'approved', 'needs_info', 'declined')),
  is_admin boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- ASSESSMENTS
-- ============================================
create table public.assessments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  smoking_years integer,
  cigarettes_per_day integer,
  previous_quit_attempts text,
  current_nicotine_use text,
  health_conditions jsonb default '[]'::jsonb,
  medications text,
  pregnancy_status text check (pregnancy_status in ('not_pregnant', 'pregnant', 'breastfeeding', 'planning', 'na')),
  cardiovascular_conditions boolean default false,
  quit_motivation text,
  preferred_method text check (preferred_method in ('nrt', 'therapeutic_vape', 'both', 'unsure')),
  pharmacist_notes text,
  reviewed_by uuid references public.profiles(id),
  reviewed_at timestamptz,
  status text default 'submitted' check (status in ('submitted', 'approved', 'needs_info', 'declined')),
  decline_reason text,
  created_at timestamptz default now()
);

-- ============================================
-- PRODUCTS
-- ============================================
create table public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  brand text,
  type text not null check (type in ('liquid', 'salt', 'pod', 'device', 'nrt_patch', 'nrt_gum', 'nrt_lozenge', 'nrt_spray')),
  category text not null check (category in ('nrt', 'therapeutic_vape', 'support')),
  description text,
  nicotine_strength_mg numeric,
  volume_ml numeric,
  flavour text,
  schedule text default 'none' check (schedule in ('s3', 's4', 'none')),
  wholesale_price integer, -- cents
  retail_price integer not null, -- cents
  rrp integer, -- cents
  stock_quantity integer default 0,
  min_order_qty integer default 1,
  image_url text,
  tga_notified boolean default false,
  active boolean default true,
  requires_assessment boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- ORDERS
-- ============================================
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  status text default 'pending' check (status in ('pending', 'pharmacist_review', 'dispensed', 'shipped', 'delivered', 'cancelled')),
  subtotal integer not null, -- cents
  shipping_cost integer not null default 0, -- cents
  total integer not null, -- cents
  stripe_payment_intent_id text,
  shipping_address jsonb, -- snapshot at time of order
  tracking_number text,
  shipped_at timestamptz,
  pharmacist_notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- ORDER ITEMS
-- ============================================
create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid not null references public.products(id),
  quantity integer not null default 1,
  unit_price integer not null, -- cents, snapshot at time of order
  created_at timestamptz default now()
);

-- ============================================
-- SAS C NOTIFICATIONS (TGA Compliance)
-- ============================================
create table public.sas_c_notifications (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders(id),
  user_id uuid not null references public.profiles(id),
  product_id uuid not null references public.products(id),
  tga_reference text,
  notification_date date,
  status text default 'pending' check (status in ('pending', 'submitted', 'confirmed')),
  notes text,
  created_at timestamptz default now()
);

-- ============================================
-- INDEXES
-- ============================================
create index idx_profiles_email on public.profiles(email);
create index idx_profiles_assessment_status on public.profiles(assessment_status);
create index idx_assessments_user_id on public.assessments(user_id);
create index idx_assessments_status on public.assessments(status);
create index idx_products_category on public.products(category);
create index idx_products_active on public.products(active);
create index idx_orders_user_id on public.orders(user_id);
create index idx_orders_status on public.orders(status);
create index idx_order_items_order_id on public.order_items(order_id);
create index idx_sas_c_user_id on public.sas_c_notifications(user_id);
create index idx_sas_c_status on public.sas_c_notifications(status);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

-- Profiles: users can read/update their own, admins can read all
alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Admins can view all profiles"
  on public.profiles for select
  using (exists (select 1 from public.profiles where id = auth.uid() and is_admin = true));

-- Assessments: users can manage their own, admins can view/update all
alter table public.assessments enable row level security;

create policy "Users can view own assessments"
  on public.assessments for select
  using (user_id = auth.uid());

create policy "Users can create own assessments"
  on public.assessments for insert
  with check (user_id = auth.uid());

create policy "Admins can view all assessments"
  on public.assessments for select
  using (exists (select 1 from public.profiles where id = auth.uid() and is_admin = true));

create policy "Admins can update all assessments"
  on public.assessments for update
  using (exists (select 1 from public.profiles where id = auth.uid() and is_admin = true));

-- Products: everyone can read active, admins can manage
alter table public.products enable row level security;

create policy "Anyone can view active products"
  on public.products for select
  using (active = true);

create policy "Admins can manage products"
  on public.products for all
  using (exists (select 1 from public.profiles where id = auth.uid() and is_admin = true));

-- Orders: users can view their own, admins can view/update all
alter table public.orders enable row level security;

create policy "Users can view own orders"
  on public.orders for select
  using (user_id = auth.uid());

create policy "Users can create own orders"
  on public.orders for insert
  with check (user_id = auth.uid());

create policy "Admins can view all orders"
  on public.orders for select
  using (exists (select 1 from public.profiles where id = auth.uid() and is_admin = true));

create policy "Admins can update all orders"
  on public.orders for update
  using (exists (select 1 from public.profiles where id = auth.uid() and is_admin = true));

-- Order items: inherit from orders
alter table public.order_items enable row level security;

create policy "Users can view own order items"
  on public.order_items for select
  using (exists (select 1 from public.orders where orders.id = order_items.order_id and orders.user_id = auth.uid()));

create policy "Users can create own order items"
  on public.order_items for insert
  with check (exists (select 1 from public.orders where orders.id = order_items.order_id and orders.user_id = auth.uid()));

create policy "Admins can view all order items"
  on public.order_items for select
  using (exists (select 1 from public.profiles where id = auth.uid() and is_admin = true));

-- SAS C: admins only
alter table public.sas_c_notifications enable row level security;

create policy "Admins can manage SAS C notifications"
  on public.sas_c_notifications for all
  using (exists (select 1 from public.profiles where id = auth.uid() and is_admin = true));

-- ============================================
-- FUNCTIONS
-- ============================================

-- Auto-update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.handle_updated_at();

create trigger products_updated_at
  before update on public.products
  for each row execute function public.handle_updated_at();

create trigger orders_updated_at
  before update on public.orders
  for each row execute function public.handle_updated_at();

-- Auto-create profile on user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, first_name, last_name, date_of_birth)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'first_name', ''),
    coalesce(new.raw_user_meta_data->>'last_name', ''),
    coalesce((new.raw_user_meta_data->>'date_of_birth')::date, '2000-01-01')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Sync assessment status to profile
create or replace function public.sync_assessment_status()
returns trigger as $$
begin
  update public.profiles
  set assessment_status = new.status
  where id = new.user_id;
  return new;
end;
$$ language plpgsql security definer;

create trigger on_assessment_status_change
  after update of status on public.assessments
  for each row execute function public.sync_assessment_status();

-- ============================================
-- SEED: Initial Products
-- ============================================

-- NRT Products (ARTG registered, can show publicly)
insert into public.products (name, brand, type, category, description, nicotine_strength_mg, schedule, retail_price, rrp, stock_quantity, tga_notified, active, requires_assessment) values
('Nicotinell Patch 21mg Step 1', 'Nicotinell', 'nrt_patch', 'nrt', '24-hour sustained release nicotine patch. Step 1 (21mg) for smokers of 20+ cigarettes per day.', 21, 'none', 3495, 3495, 50, true, true, false),
('Nicotinell Patch 14mg Step 2', 'Nicotinell', 'nrt_patch', 'nrt', '24-hour sustained release nicotine patch. Step 2 (14mg) for step-down therapy.', 14, 'none', 3295, 3295, 50, true, true, false),
('Nicotinell Gum 4mg Classic', 'Nicotinell', 'nrt_gum', 'nrt', 'Sugar-free nicotine gum 4mg. For smokers of 25+ cigarettes per day. Classic flavour.', 4, 'none', 1995, 1995, 100, true, true, false),
('Nicotinell Gum 2mg Mint', 'Nicotinell', 'nrt_gum', 'nrt', 'Sugar-free nicotine gum 2mg. For smokers of fewer than 25 cigarettes per day. Mint flavour.', 2, 'none', 1795, 1795, 100, true, true, false),
('Nicotinell Lozenge 2mg Mint', 'Nicotinell', 'nrt_lozenge', 'nrt', 'Nicotine lozenge 2mg. Dissolves slowly for discreet craving relief. Mint flavour.', 2, 'none', 1695, 1695, 100, true, true, false);

-- Therapeutic Vape Products (S3, behind assessment wall)
-- Note: Using placeholder products until Lanavape/Wild by Instinct samples confirmed
insert into public.products (name, brand, type, category, description, nicotine_strength_mg, volume_ml, flavour, schedule, retail_price, rrp, stock_quantity, tga_notified, active, requires_assessment) values
('LANAVAPE Closed Pod - Tobacco 20mg/mL', 'LANAVAPE', 'pod', 'therapeutic_vape', 'TGA-notified closed pod system. Tobacco flavour, 20mg/mL nicotine. For smoking cessation.', 20, 2, 'Tobacco', 's3', 1995, 1995, 0, true, true, true),
('LANAVAPE Closed Pod - Mint 20mg/mL', 'LANAVAPE', 'pod', 'therapeutic_vape', 'TGA-notified closed pod system. Mint flavour, 20mg/mL nicotine. For smoking cessation.', 20, 2, 'Mint', 's3', 1995, 1995, 0, true, true, true),
('LANAVAPE Closed Pod - Menthol 10mg/mL', 'LANAVAPE', 'pod', 'therapeutic_vape', 'TGA-notified closed pod system. Menthol flavour, 10mg/mL nicotine. For smoking cessation.', 10, 2, 'Menthol', 's3', 1995, 1995, 0, true, true, true),
('LANAVAPE Starter Device', 'LANAVAPE', 'device', 'therapeutic_vape', 'TGA-notified closed pod device. Rechargeable via USB-C. Compatible with LANAVAPE pods.', null, null, null, 's3', 3995, 3995, 0, true, true, true);
