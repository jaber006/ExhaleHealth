'use client'

import Link from 'next/link'
import { CheckCircle, Package, ArrowRight } from 'lucide-react'

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-3">Order Placed!</h1>
        <p className="text-gray-500 mb-6">
          Thank you for your order. Our pharmacist will review it shortly and prepare your products for dispatch.
        </p>
        
        <div className="p-5 rounded-xl bg-[#0D6B5E]/5 border border-[#0D6B5E]/10 mb-8 text-left">
          <h3 className="font-medium text-gray-900 text-sm mb-3 flex items-center gap-2">
            <Package className="w-4 h-4 text-[#0D6B5E]" /> What happens next
          </h3>
          <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
            <li>Our pharmacist reviews your order (clinical check)</li>
            <li>Products are dispensed and packaged</li>
            <li>Order is shipped via Australia Post</li>
            <li>You&apos;ll receive tracking info by email</li>
          </ol>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#0D6B5E] text-white font-medium hover:bg-[#095C50] transition-all"
          >
            Continue Shopping <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/"
            className="text-sm text-[#0D6B5E] hover:underline"
          >
            Return to home
          </Link>
        </div>
      </div>
    </div>
  )
}
