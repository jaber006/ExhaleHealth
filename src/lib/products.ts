export type ProductCategory = 'nrt' | 'therapeutic-vape' | 'support'

export interface Product {
  id: string
  name: string
  brand?: string
  description: string
  price: number // cents
  category: ProductCategory
  type?: string
  flavour?: string
  schedule?: 's3' | 'none'
  nicotine_strength_mg?: number
  badge?: string
  image?: string
  in_stock: boolean
  inStock?: boolean
  requiresAssessment: boolean
}

export const SHIPPING_THRESHOLD = 10000 // $100 in cents
export const SHIPPING_COST = 1290 // $12.90

export const TGA_DISCLAIMER = `All nicotine vaping products are listed on the Therapeutic Goods Administration (TGA) notified list. Currently, no nicotine vaping products in Australia are registered in the Australian Register of Therapeutic Goods (ARTG). Medicines not in the ARTG are known as 'unapproved' medicines. The TGA has not assessed these medicines for safety, quality and efficacy.

There are various smoking cessation aids registered in the ARTG, including many first-line NRTs and some prescription medicines, which the TGA has assessed for safety, quality and efficacy.

For more information: https://www.tga.gov.au/products/unapproved-therapeutic-goods/vaping-hub`

export const productCategories: { id: ProductCategory; value: ProductCategory; label: string }[] = [
  { id: 'nrt', value: 'nrt', label: 'NRT Products' },
  { id: 'therapeutic-vape', value: 'therapeutic-vape', label: 'Therapeutic Vapes' },
  { id: 'support', value: 'support', label: 'Quit Support' },
]

// Placeholder products — will be replaced with Supabase data
export const products: Product[] = [
  {
    id: 'nrt-patch-01',
    name: 'Nicotine Patch 21mg',
    brand: 'Nicotinell',
    description: 'Step 1 transdermal nicotine patch. 24-hour sustained release.',
    price: 3495,
    category: 'nrt',
    in_stock: true,
    requiresAssessment: false,
  },
  {
    id: 'nrt-gum-01',
    name: 'Nicotine Gum 4mg',
    brand: 'Nicotinell',
    description: 'Sugar-free nicotine gum. Relieves cravings in minutes.',
    price: 1995,
    category: 'nrt',
    in_stock: true,
    requiresAssessment: false,
  },
  {
    id: 'nrt-lozenge-01',
    name: 'Nicotine Lozenge 2mg',
    brand: 'Nicotinell',
    description: 'Discreet oral nicotine replacement. Dissolves slowly.',
    price: 1795,
    category: 'nrt',
    in_stock: true,
    requiresAssessment: false,
  },
  {
    id: 'tv-device-01',
    name: 'Therapeutic Vape Device',
    brand: 'LANAVAPE',
    description: 'TGA-notified closed-system device for smoking cessation.',
    price: 4995,
    category: 'therapeutic-vape',
    schedule: 's3',
    in_stock: true,
    requiresAssessment: true,
  },
  {
    id: 'tv-pod-tobacco-01',
    name: 'Tobacco Flavour Pod 20mg/mL',
    brand: 'LANAVAPE',
    description: 'Nicotine e-liquid pod. 20mg/mL concentration. TGA notified.',
    price: 1995,
    category: 'therapeutic-vape',
    schedule: 's3',
    nicotine_strength_mg: 20,
    flavour: 'Tobacco',
    in_stock: true,
    requiresAssessment: true,
  },
  {
    id: 'tv-pod-mint-01',
    name: 'Mint Flavour Pod 10mg/mL',
    brand: 'LANAVAPE',
    description: 'Nicotine e-liquid pod. 10mg/mL concentration. TGA notified.',
    price: 1995,
    category: 'therapeutic-vape',
    schedule: 's3',
    nicotine_strength_mg: 10,
    flavour: 'Mint',
    in_stock: true,
    requiresAssessment: true,
  },
]

export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}
