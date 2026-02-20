"use client";

import Link from "next/link";
import { useState } from "react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  inStock: boolean;
  requiresConsultation: boolean;
}

export function ProductCard({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const categoryLabels: Record<string, string> = {
    patches: "Patches",
    gum: "Gum & Lozenges",
    spray: "Sprays",
    inhaler: "Inhalers",
    vape: "Therapeutic Vape",
  };

  const categoryColours: Record<string, string> = {
    patches: "bg-primary/10 text-primary",
    gum: "bg-sage/20 text-primary-dark",
    spray: "bg-blue-50 text-blue-700",
    inhaler: "bg-purple-50 text-purple-700",
    vape: "bg-amber-50 text-amber-700",
  };

  return (
    <div className="group bg-white rounded-2xl border border-sage/10 overflow-hidden hover:shadow-xl hover:shadow-sage/10 transition-all duration-300 hover:-translate-y-1 flex flex-col">
      {/* Image placeholder */}
      <div className="relative h-48 bg-gradient-to-br from-sage/10 to-primary/5 flex items-center justify-center overflow-hidden">
        <div className="text-primary/20 group-hover:text-primary/30 transition-colors">
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            {product.category === "patches" ? (
              <>
                <rect x="3" y="3" width="18" height="18" rx="4" />
                <path d="M9 12h6M12 9v6" />
              </>
            ) : product.category === "gum" ? (
              <>
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
              </>
            ) : product.category === "spray" || product.category === "inhaler" ? (
              <>
                <path d="M7 21h10M12 21V11M5 11h14l-2-7H7L5 11z" />
                <path d="M12 4V2" />
              </>
            ) : (
              <>
                <path d="M8 21h8M12 21V11" />
                <rect x="7" y="5" width="10" height="6" rx="2" />
              </>
            )}
          </svg>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-full ${
              categoryColours[product.category] || "bg-gray-100 text-gray-600"
            }`}
          >
            {categoryLabels[product.category] || product.category}
          </span>
        </div>

        {product.requiresConsultation && (
          <div className="absolute top-3 right-3">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 flex items-center gap-1">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Rx Required
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-charcoal mb-1.5 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-charcoal/60 text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </span>

          {product.requiresConsultation ? (
            <Link
              href="/book"
              className="bg-primary/10 hover:bg-primary hover:text-white text-primary font-medium px-4 py-2 rounded-full text-sm transition-all"
            >
              Book First
            </Link>
          ) : (
            <button
              onClick={handleAddToCart}
              className={`font-medium px-4 py-2 rounded-full text-sm transition-all active:scale-95 ${
                added
                  ? "bg-sage text-white"
                  : "bg-primary hover:bg-primary-dark text-white hover:shadow-lg hover:shadow-primary/20"
              }`}
            >
              {added ? "✓ Added" : "Add to Cart"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
