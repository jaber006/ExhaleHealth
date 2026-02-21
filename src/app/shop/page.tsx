'use client'

import { useState } from 'react'
import { products, productCategories, formatPrice, TGA_DISCLAIMER, type ProductCategory } from '@/lib/products'
import { addToCart } from '@/lib/cart'
import { ShoppingCart, AlertTriangle, Check, Filter } from 'lucide-react'

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>('all')
  const [addedId, setAddedId] = useState<string | null>(null)

  const filtered = activeCategory === 'all'
    ? products.filter(p => p.in_stock)
    : products.filter(p => p.category === activeCategory && p.in_stock)

  const showVapeDisclaimer = activeCategory === 'all' || activeCategory === 'therapeutic_vapes'

  const handleAddToCart = (product: (typeof products)[0]) => {
    addToCart(product)
    setAddedId(product.id)
    setTimeout(() => setAddedId(null), 2000)
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-light text-gray-900">Shop</h1>
          <p className="text-gray-500 mt-2">
            Pharmacist-curated cessation products. All products reviewed and approved by your pharmacist.
          </p>
        </div>

        {showVapeDisclaimer && (
          <div className="mb-6 p-5 rounded-xl bg-amber-50 border border-amber-200">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-amber-800 text-sm mb-2">Important Information — Therapeutic Vaping Products</p>
                <p className="text-amber-700 text-xs leading-relaxed whitespace-pre-line">{TGA_DISCLAIMER}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          <Filter className="w-4 h-4 text-gray-400 shrink-0" />
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeCategory === 'all'
                ? 'bg-[#0D6B5E] text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-[#0D6B5E]/40'
            }`}
          >
            All Products
          </button>
          {productCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#0D6B5E] text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-[#0D6B5E]/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-[#0D6B5E]/20 transition-all group">
              <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative">
                <div className="text-center px-4">
                  <p className="text-gray-400 text-sm font-medium">{product.brand}</p>
                  <p className="text-gray-300 text-xs mt-1">{product.flavour || product.type}</p>
                </div>
                {product.badge && (
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#0D6B5E] text-white text-xs font-medium">
                    {product.badge}
                  </span>
                )}
                {product.schedule === 's3' && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-medium">
                    S3
                  </span>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-medium text-gray-900 text-sm leading-tight">{product.name}</h3>
                {product.nicotine_strength_mg && (
                  <p className="text-xs text-gray-400 mt-1">{product.nicotine_strength_mg}mg/mL nicotine</p>
                )}
                <p className="text-xs text-gray-500 mt-2 leading-relaxed line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-lg font-semibold text-gray-900">{formatPrice(product.price)}</span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      addedId === product.id
                        ? 'bg-green-500 text-white'
                        : 'bg-[#0D6B5E] text-white hover:bg-[#095C50]'
                    }`}
                  >
                    {addedId === product.id ? (
                      <><Check className="w-4 h-4" /> Added</>
                    ) : (
                      <><ShoppingCart className="w-4 h-4" /> Add</>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p>No products found in this category.</p>
          </div>
        )}

        <div className="mt-12 p-6 rounded-xl bg-[#0D6B5E]/5 border border-[#0D6B5E]/10 text-center">
          <p className="text-sm text-gray-600">
            Not sure what&apos;s right for you? Contact us at{' '}
            <a href="mailto:mohammad@exhale.health" className="text-[#0D6B5E] font-medium hover:underline">
              mohammad@exhale.health
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
