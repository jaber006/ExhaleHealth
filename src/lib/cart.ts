'use client'

import { type Product } from './products'

export interface CartItem {
  product: Product
  quantity: number
}

const CART_KEY = 'exhale_cart'

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(CART_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveCart(items: CartItem[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(CART_KEY, JSON.stringify(items))
  window.dispatchEvent(new Event('cart-updated'))
}

export function addToCart(product: Product, quantity = 1) {
  const items = getCart()
  const existing = items.find(item => item.product.id === product.id)
  if (existing) {
    existing.quantity += quantity
  } else {
    items.push({ product, quantity })
  }
  saveCart(items)
}

export function removeFromCart(productId: string) {
  const items = getCart().filter(item => item.product.id !== productId)
  saveCart(items)
}

export function updateCartQuantity(productId: string, quantity: number) {
  if (quantity <= 0) {
    removeFromCart(productId)
    return
  }
  const items = getCart()
  const existing = items.find(item => item.product.id === productId)
  if (existing) {
    existing.quantity = quantity
    saveCart(items)
  }
}

export function clearCart() {
  saveCart([])
}

export function getCartTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
}

export function getCartCount(items?: CartItem[]): number {
  const cartItems = items ?? getCart()
  return cartItems.reduce((sum, item) => sum + item.quantity, 0)
}
