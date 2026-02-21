import { getProductById, type Product } from './products'

export interface CartItem {
  productId: string
  quantity: number
  product: Product
}

const CART_KEY = 'exhale_cart'

function getStoredCart(): { productId: string; quantity: number }[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(CART_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function saveCart(items: { productId: string; quantity: number }[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(CART_KEY, JSON.stringify(items))
}

export function getCart(): CartItem[] {
  const stored = getStoredCart()
  return stored
    .map((item) => {
      const product = getProductById(item.productId)
      if (!product) return null
      return { productId: item.productId, quantity: item.quantity, product }
    })
    .filter(Boolean) as CartItem[]
}

export function addToCart(productId: string, quantity = 1) {
  const items = getStoredCart()
  const existing = items.find((i) => i.productId === productId)
  if (existing) {
    existing.quantity += quantity
  } else {
    items.push({ productId, quantity })
  }
  saveCart(items)
}

export function updateCartQuantity(productId: string, quantity: number) {
  const items = getStoredCart()
  const item = items.find((i) => i.productId === productId)
  if (item) {
    item.quantity = Math.max(0, quantity)
    saveCart(items.filter((i) => i.quantity > 0))
  }
}

export function removeFromCart(productId: string) {
  const items = getStoredCart().filter((i) => i.productId !== productId)
  saveCart(items)
}

export function clearCart() {
  if (typeof window === 'undefined') return
  localStorage.removeItem(CART_KEY)
}

export function getCartTotal(items?: CartItem[]): number {
  const cartItems = items ?? getCart()
  return cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
}

export function getCartCount(items?: CartItem[]): number {
  const cartItems = items ?? getCart()
  return cartItems.reduce((sum, item) => sum + item.quantity, 0)
}
