// Hardcoded product catalogue for v1 — will move to Supabase later
// Prices in cents (AUD)

export type ProductCategory = 'therapeutic_vapes' | 'nrt_gum' | 'nrt_patches' | 'nrt_lozenges'

export interface Product {
  id: string
  name: string
  brand: string
  category: ProductCategory
  type: string
  nicotine_strength_mg: number | null
  flavour: string | null
  description: string
  price: number // cents
  schedule: 's3' | 'none'
  requires_auth: boolean
  in_stock: boolean
  badge?: string
}

export const products: Product[] = [
  // ── Therapeutic Vapes (S3 — BEHIND AUTH WALL) ─────────────────────
  {
    id: 'lana-mint-20',
    name: 'LANAVAPE Mini Pro Pods Mint 20mg',
    brand: 'LANAVAPE',
    category: 'therapeutic_vapes',
    type: 'pod',
    nicotine_strength_mg: 20,
    flavour: 'Mint',
    description: 'Closed pod system. 20mg/mL nicotine salt. Refreshing mint flavour. TGA notified.',
    price: 2995,
    schedule: 's3',
    requires_auth: true,
    in_stock: true,
  },
  {
    id: 'lana-mint-ice-20',
    name: 'LANAVAPE Mini Pro Pods Mint Ice 20mg',
    brand: 'LANAVAPE',
    category: 'therapeutic_vapes',
    type: 'pod',
    nicotine_strength_mg: 20,
    flavour: 'Mint Ice',
    description: 'Closed pod system. 20mg/mL nicotine salt. Cool icy mint flavour. TGA notified.',
    price: 2995,
    schedule: 's3',
    requires_auth: true,
    in_stock: true,
  },
  {
    id: 'lana-tobacco-20',
    name: 'LANAVAPE Mini Pro Pods Tobacco 20mg',
    brand: 'LANAVAPE',
    category: 'therapeutic_vapes',
    type: 'pod',
    nicotine_strength_mg: 20,
    flavour: 'Tobacco',
    description: 'Closed pod system. 20mg/mL nicotine salt. Smooth tobacco flavour. TGA notified.',
    price: 2995,
    schedule: 's3',
    requires_auth: true,
    in_stock: true,
  },
  {
    id: 'lana-device',
    name: 'LANAVAPE Lana Mini Pro Device',
    brand: 'LANAVAPE',
    category: 'therapeutic_vapes',
    type: 'device',
    nicotine_strength_mg: null,
    flavour: null,
    description: 'Rechargeable closed pod device with LED indicator. USB-C charging. Compatible with all LANAVAPE Mini Pro pods.',
    price: 3995,
    schedule: 's3',
    requires_auth: true,
    in_stock: true,
    badge: 'Starter Kit',
  },
  {
    id: 'lana-starter-bundle',
    name: 'LANAVAPE Starter Bundle',
    brand: 'LANAVAPE',
    category: 'therapeutic_vapes',
    type: 'bundle',
    nicotine_strength_mg: 20,
    flavour: null,
    description: 'Everything you need to get started. Includes LANAVAPE Mini Pro Device + 1 pod pack of your choice. Save $10.',
    price: 5995,
    schedule: 's3',
    requires_auth: true,
    in_stock: true,
    badge: 'Best Value',
  },

  // ── NRT Products (ARTG Registered — Can show publicly) ───────────
  {
    id: 'ntell-gum-mint-4',
    name: 'Nicotinell Gum Mint 4mg',
    brand: 'Nicotinell',
    category: 'nrt_gum',
    type: 'nrt_gum',
    nicotine_strength_mg: 4,
    flavour: 'Mint',
    description: 'Sugar-free nicotine gum for heavy smokers (20+ cigarettes/day). 96 pieces.',
    price: 3699,
    schedule: 'none',
    requires_auth: false,
    in_stock: true,
  },
  {
    id: 'ntell-gum-mint-2',
    name: 'Nicotinell Gum Mint 2mg',
    brand: 'Nicotinell',
    category: 'nrt_gum',
    type: 'nrt_gum',
    nicotine_strength_mg: 2,
    flavour: 'Mint',
    description: 'Sugar-free nicotine gum for light-moderate smokers (<20 cigarettes/day). 96 pieces.',
    price: 3499,
    schedule: 'none',
    requires_auth: false,
    in_stock: true,
  },
  {
    id: 'ntell-gum-fruit-4',
    name: 'Nicotinell Gum Fruit 4mg',
    brand: 'Nicotinell',
    category: 'nrt_gum',
    type: 'nrt_gum',
    nicotine_strength_mg: 4,
    flavour: 'Fruit',
    description: 'Fruit-flavoured nicotine gum for heavy smokers. Sugar-free. 96 pieces.',
    price: 3699,
    schedule: 'none',
    requires_auth: false,
    in_stock: true,
  },
  {
    id: 'ntell-patch-21',
    name: 'Nicotinell Patch 21mg Step 1',
    brand: 'Nicotinell',
    category: 'nrt_patches',
    type: 'nrt_patch',
    nicotine_strength_mg: 21,
    flavour: null,
    description: '24-hour transdermal nicotine patch. Step 1 for heavy smokers (20+ cigarettes/day). 7 patches.',
    price: 3299,
    schedule: 'none',
    requires_auth: false,
    in_stock: true,
  },
  {
    id: 'ntell-patch-14',
    name: 'Nicotinell Patch 14mg Step 2',
    brand: 'Nicotinell',
    category: 'nrt_patches',
    type: 'nrt_patch',
    nicotine_strength_mg: 14,
    flavour: null,
    description: '24-hour transdermal nicotine patch. Step 2 for step-down therapy. 7 patches.',
    price: 3099,
    schedule: 'none',
    requires_auth: false,
    in_stock: true,
  },
  {
    id: 'ntell-patch-7',
    name: 'Nicotinell Patch 7mg Step 3',
    brand: 'Nicotinell',
    category: 'nrt_patches',
    type: 'nrt_patch',
    nicotine_strength_mg: 7,
    flavour: null,
    description: '24-hour transdermal nicotine patch. Step 3 — final step-down before stopping. 7 patches.',
    price: 2899,
    schedule: 'none',
    requires_auth: false,
    in_stock: true,
  },
  {
    id: 'ntell-loz-mint-4',
    name: 'Nicotinell Lozenge Mint 4mg',
    brand: 'Nicotinell',
    category: 'nrt_lozenges',
    type: 'nrt_lozenge',
    nicotine_strength_mg: 4,
    flavour: 'Mint',
    description: 'Sugar-free mint lozenges for heavy smokers. Dissolves slowly for steady relief. 36 lozenges.',
    price: 2199,
    schedule: 'none',
    requires_auth: false,
    in_stock: true,
  },
  {
    id: 'ntell-loz-mint-2',
    name: 'Nicotinell Lozenge Mint 2mg',
    brand: 'Nicotinell',
    category: 'nrt_lozenges',
    type: 'nrt_lozenge',
    nicotine_strength_mg: 2,
    flavour: 'Mint',
    description: 'Sugar-free mint lozenges for light-moderate smokers. 36 lozenges.',
    price: 1999,
    schedule: 'none',
    requires_auth: false,
    in_stock: true,
  },
]

export const productCategories: { id: ProductCategory; label: string; requiresAuth: boolean }[] = [
  { id: 'therapeutic_vapes', label: 'Therapeutic Vapes', requiresAuth: true },
  { id: 'nrt_gum', label: 'NRT Gum', requiresAuth: false },
  { id: 'nrt_patches', label: 'NRT Patches', requiresAuth: false },
  { id: 'nrt_lozenges', label: 'NRT Lozenges', requiresAuth: false },
]

export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`
}

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id)
}

export const SHIPPING_THRESHOLD = 10000 // $100 in cents
export const SHIPPING_COST = 1290 // $12.90 in cents

export const TGA_DISCLAIMER = `All nicotine vaping products are listed on the Therapeutic Goods Administration (TGA) notified list. Currently, no nicotine vaping products in Australia are registered in the Australian Register of Therapeutic Goods (ARTG). Medicines not in the ARTG are known as 'unapproved' medicines. The TGA has not assessed these medicines for safety, quality and efficacy.

There are various smoking cessation aids registered in the ARTG, including many first-line NRTs and some prescription medicines, which the TGA has assessed for safety, quality and efficacy.

For more information: https://www.tga.gov.au/products/unapproved-therapeutic-goods/vaping-hub`
