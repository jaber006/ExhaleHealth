'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getCart, updateCartQuantity, removeFromCart, getCartTotal, type CartItem } from '@/lib/cart'
import { formatPrice, SHIPPING_THRESHOLD, SHIPPING_COST } from '@/lib/products'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    setItems(getCart())
    const handler = () => setItems(getCart())
    window.addEventListener('cart-updated', handler)
    return () => window.removeEventListener('cart-updated', handler)
  }, [])

  const subtotal = getCartTotal(items)
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
  const total = subtotal + shipping

  const handleUpdateQty = (productId: string, qty: number) => {
    updateCartQuantity(productId, qty)
    setItems(getCart())
  }

  const handleRemove = (productId: string) => {
    removeFromCart(productId)
    setItems(getCart())
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-gray-200 mx-auto mb-4" />
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h1>
          <p className="text-gray-500 mb-6">Browse our range of cessation products.</p>
          <Link href="/shop" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0D6B5E] text-white font-medium hover:bg-[#095C50] transition-all">
            Shop Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-light text-gray-900 mb-8">Your Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.product.id} className="bg-white rounded-xl border border-gray-100 p-5 flex items-center gap-4">
                {/* Image placeholder */}
                <div className="w-20 h-20 bg-gray-50 rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-xs text-gray-400">{item.product.brand}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 text-sm truncate">{item.product.name}</h3>
                  {item.product.nicotine_strength_mg && (
                    <p className="text-xs text-gray-400">{item.product.nicotine_strength_mg}mg/mL</p>
                  )}
                  <p className="text-sm font-semibold text-gray-900 mt-1">{formatPrice(item.product.price)}</p>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleUpdateQty(item.product.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                  <button
                    onClick={() => handleUpdateQty(item.product.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                {/* Line total */}
                <div className="text-right">
                  <p className="font-semibold text-gray-900 text-sm">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                  <button
                    onClick={() => handleRemove(item.product.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors mt-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-100 p-6 sticky top-24">
              <h2 className="font-semibold text-gray-900 mb-4">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? (
                      <span className="text-[#0D6B5E]">FREE</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-gray-400">
                    Free shipping on orders over {formatPrice(SHIPPING_THRESHOLD)}
                  </p>
                )}
                <div className="pt-3 border-t border-gray-100 flex justify-between">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="font-semibold text-gray-900 text-lg">{formatPrice(total)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full mt-6 py-3 rounded-full bg-[#0D6B5E] text-white font-medium hover:bg-[#095C50] transition-all flex items-center justify-center gap-2"
              >
                Checkout <ArrowRight className="w-4 h-4" />
              </Link>

              <Link href="/shop" className="block text-center text-sm text-[#0D6B5E] hover:underline mt-4">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
