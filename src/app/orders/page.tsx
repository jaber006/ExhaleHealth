'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { formatPrice } from '@/lib/products'
import { Package, ShoppingBag, Loader2, ExternalLink } from 'lucide-react'

interface Order {
  id: string
  status: string
  subtotal: number
  shipping_cost: number
  total: number
  tracking_number: string | null
  created_at: string
  order_items: {
    id: string
    quantity: number
    unit_price: number
    products: {
      name: string
    }
  }[]
}

const statusLabels: Record<string, { label: string; color: string }> = {
  pending: { label: 'Pending', color: 'bg-amber-100 text-amber-700' },
  pharmacist_review: { label: 'Under Review', color: 'bg-blue-100 text-blue-700' },
  dispensed: { label: 'Dispensed', color: 'bg-purple-100 text-purple-700' },
  shipped: { label: 'Shipped', color: 'bg-cyan-100 text-cyan-700' },
  delivered: { label: 'Delivered', color: 'bg-green-100 text-green-700' },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-700' },
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function loadOrders() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/login?redirect=/orders')
        return
      }

      const { data } = await supabase
        .from('orders')
        .select('*, order_items(id, quantity, unit_price, products(name))')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (data) setOrders(data as Order[])
      setLoading(false)
    }
    loadOrders()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#0D6B5E]" />
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-gray-200 mx-auto mb-4" />
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">No orders yet</h1>
          <p className="text-gray-500 mb-6">Your order history will appear here.</p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0D6B5E] text-white font-medium hover:bg-[#095C50] transition-all"
          >
            Browse Shop
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-light text-gray-900 mb-8">My Orders</h1>

        <div className="space-y-4">
          {orders.map(order => {
            const status = statusLabels[order.status] || { label: order.status, color: 'bg-gray-100 text-gray-700' }
            return (
              <div key={order.id} className="bg-white rounded-xl border border-gray-100 p-6 hover:border-[#0D6B5E]/20 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-xs text-gray-400 font-mono">#{order.id.slice(0, 8)}</p>
                    <p className="text-sm text-gray-500 mt-0.5">
                      {new Date(order.created_at).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
                    {status.label}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  {order.order_items.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.products?.name} × {item.quantity}</span>
                      <span className="text-gray-900">{formatPrice(item.unit_price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <span className="font-semibold">{formatPrice(order.total)}</span>
                  {order.tracking_number && (
                    <a
                      href={`https://auspost.com.au/mypost/track/#/details/${order.tracking_number}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-[#0D6B5E] hover:underline"
                    >
                      <Package className="w-4 h-4" /> Track
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
