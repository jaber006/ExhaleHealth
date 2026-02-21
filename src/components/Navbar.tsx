"use client";

import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-warm-white/95 backdrop-blur-md border-b border-sage/20">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl sm:text-3xl font-light tracking-tight text-primary">
              exhale
            </span>
            {/* Breath wave element */}
            <svg
              width="24"
              height="16"
              viewBox="0 0 24 16"
              fill="none"
              className="text-sage group-hover:text-primary transition-colors animate-wave"
            >
              <path
                d="M1 8C4 3 8 13 12 8C16 3 20 13 23 8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/#how-it-works"
              className="text-charcoal/70 hover:text-primary transition-colors font-medium"
            >
              How It Works
            </Link>
            <Link
              href="/about"
              className="text-charcoal/70 hover:text-primary transition-colors font-medium"
            >
              About
            </Link>
            <Link
              href="/login"
              className="text-charcoal/70 hover:text-primary transition-colors font-medium"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-full font-medium transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-95"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-sage/10 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
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

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-6 animate-slide-down">
            <div className="flex flex-col gap-1">
              <Link
                href="/#how-it-works"
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 rounded-lg text-charcoal/70 hover:text-primary hover:bg-sage/10 transition-all font-medium"
              >
                How It Works
              </Link>
              <Link
                href="/about"
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 rounded-lg text-charcoal/70 hover:text-primary hover:bg-sage/10 transition-all font-medium"
              >
                About
              </Link>
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 rounded-lg text-charcoal/70 hover:text-primary hover:bg-sage/10 transition-all font-medium"
              >
                Sign In
              </Link>
              <div className="mt-2 px-4">
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center bg-primary hover:bg-primary-dark text-white px-5 py-3 rounded-full font-medium transition-all"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
