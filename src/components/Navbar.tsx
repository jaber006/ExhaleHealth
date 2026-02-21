"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { ShoppingCart } from "lucide-react";
import { getCartCount } from "@/lib/cart";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setUser({ id: user.id, email: user.email });
    });

    // Cart count
    setCartCount(getCartCount());
    const handler = () => setCartCount(getCartCount());
    window.addEventListener("cart-updated", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("cart-updated", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[#FAFAF5]/95 backdrop-blur-md border-b border-[#8FBC8F]/20">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl sm:text-3xl font-light tracking-tight text-[#0D6B5E]">
              exhale
            </span>
            <svg
              width="24"
              height="16"
              viewBox="0 0 24 16"
              fill="none"
              className="text-[#8FBC8F] group-hover:text-[#0D6B5E] transition-colors"
            >
              <path
                d="M1 8C4 3 8 13 12 8C16 3 20 13 23 8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/#how-it-works"
              className="text-gray-600 hover:text-[#0D6B5E] transition-colors text-sm font-medium"
            >
              How It Works
            </Link>
            <Link
              href="/about"
              className="text-gray-600 hover:text-[#0D6B5E] transition-colors text-sm font-medium"
            >
              About
            </Link>
            <Link
              href="/faq"
              className="text-gray-600 hover:text-[#0D6B5E] transition-colors text-sm font-medium"
            >
              FAQ
            </Link>

            {user ? (
              <>
                <Link
                  href="/shop"
                  className="text-gray-600 hover:text-[#0D6B5E] transition-colors text-sm font-medium"
                >
                  Shop
                </Link>
                <Link
                  href="/cart"
                  className="relative text-gray-600 hover:text-[#0D6B5E] transition-colors"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#0D6B5E] text-white text-xs flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <Link
                  href="/account"
                  className="text-gray-600 hover:text-[#0D6B5E] transition-colors text-sm font-medium"
                >
                  Account
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-[#0D6B5E] transition-colors text-sm font-medium"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="bg-[#0D6B5E] hover:bg-[#095C50] text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:shadow-lg hover:shadow-[#0D6B5E]/20"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {isOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-6">
            <div className="flex flex-col gap-1">
              <Link href="/#how-it-works" onClick={() => setIsOpen(false)}
                className="px-4 py-3 rounded-lg text-gray-600 hover:text-[#0D6B5E] hover:bg-[#0D6B5E]/5 transition-all text-sm font-medium">
                How It Works
              </Link>
              <Link href="/about" onClick={() => setIsOpen(false)}
                className="px-4 py-3 rounded-lg text-gray-600 hover:text-[#0D6B5E] hover:bg-[#0D6B5E]/5 transition-all text-sm font-medium">
                About
              </Link>
              <Link href="/faq" onClick={() => setIsOpen(false)}
                className="px-4 py-3 rounded-lg text-gray-600 hover:text-[#0D6B5E] hover:bg-[#0D6B5E]/5 transition-all text-sm font-medium">
                FAQ
              </Link>
              {user ? (
                <>
                  <Link href="/shop" onClick={() => setIsOpen(false)}
                    className="px-4 py-3 rounded-lg text-gray-600 hover:text-[#0D6B5E] hover:bg-[#0D6B5E]/5 transition-all text-sm font-medium">
                    Shop
                  </Link>
                  <Link href="/orders" onClick={() => setIsOpen(false)}
                    className="px-4 py-3 rounded-lg text-gray-600 hover:text-[#0D6B5E] hover:bg-[#0D6B5E]/5 transition-all text-sm font-medium">
                    My Orders
                  </Link>
                  <Link href="/account" onClick={() => setIsOpen(false)}
                    className="px-4 py-3 rounded-lg text-gray-600 hover:text-[#0D6B5E] hover:bg-[#0D6B5E]/5 transition-all text-sm font-medium">
                    Account
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setIsOpen(false)}
                    className="px-4 py-3 rounded-lg text-gray-600 hover:text-[#0D6B5E] hover:bg-[#0D6B5E]/5 transition-all text-sm font-medium">
                    Sign In
                  </Link>
                  <div className="mt-2 px-4">
                    <Link href="/register" onClick={() => setIsOpen(false)}
                      className="block w-full text-center bg-[#0D6B5E] hover:bg-[#095C50] text-white px-5 py-3 rounded-full text-sm font-medium transition-all">
                      Get Started
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
