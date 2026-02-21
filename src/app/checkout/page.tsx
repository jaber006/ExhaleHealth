'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCart, getCartTotal, clearCart, type CartItem } from '@/lib/cart'
import { formatPrice, SHIPPING_THRESHOLD, SHIPPING_COST } from '@/lib/products'
import { Lock, ShieldCheck } from 'lucide-react'

export default function CheckoutPage() {
  const [items, setItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const cartItems = getCart()
    if (cartItems.length === 0) {
      router.push('/cart')
      return
    }
    setItems(cartItems)
  }, [router])

  const subtotal = getCartTotal(items)
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
  const total = subtotal + shipping

  const handleCheckout = async () => {
    setLoading(true)

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(item => ({
            product_id: item.product.id,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
          })),
        }),
      })

      const data = await response.json()

      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url
      } else {
        throw new Error(data.error || 'Failed to create checkout session')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-light text-gray-900 mb-2">Checkout</h1>
        <p className="text-gray-500 mb-8">Review your order before payment.</p>

        {/* Order items */}
        <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50">
          {items.map((item) => (
            <div key={item.product.id} className="p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 text-sm">{item.product.name}</p>
                <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
              </div>
              <p className="font-medium text-sm">{formatPrice(item.product.price * item.quantity)}</p>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="mt-6 bg-white rounded-xl border border-gray-100 p-6">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Shipping</span>
              <span>{shipping === 0 ? <span className="text-[#0D6B5E]">FREE</span> : formatPrice(shipping)}</span>
            </div>
            <div className="pt-3 border-t border-gray-100 flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>

        {/* Pharmacist note */}
        <div className="mt-6 p-4 rounded-xl bg-[#0D6B5E]/5 border border-[#0D6B5E]/10">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#0D6B5E] shrink-0 mt-0.5" />
            <p className="text-xs text-gray-600">
              Your order will be reviewed by our pharmacist before dispatch to ensure clinical appropriateness.
              You&apos;ll receive an email when your order ships.
            </p>
          </div>
        </div>

        {/* Pay button */}
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full mt-6 py-4 rounded-full bg-[#0D6B5E] text-white font-medium hover:bg-[#095C50] transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-lg"
        >
          <Lock className="w-4 h-4" />
          {loading ? 'Redirecting to payment...' : `Pay ${formatPrice(total)}`}
        </button>

        <p className="text-center text-xs text-gray-400 mt-3 flex items-center justify-center gap-1">
          <Lock className="w-3 h-3" /> Secure payment powered by Stripe
        </p>
      </div>
    </div>
  )
}
