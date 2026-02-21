import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-charcoal text-white/80">
      {/* Wave top */}
      <div className="w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
          className="w-full h-10 sm:h-16"
        >
          <path
            d="M0 30 C300 60 600 0 900 30 C1050 45 1150 30 1200 30 L1200 0 L0 0Z"
            fill="#FAFAF5"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-light tracking-tight text-white">
                exhale
              </span>
              <svg
                width="20"
                height="14"
                viewBox="0 0 24 16"
                fill="none"
                className="text-sage"
              >
                <path
                  d="M1 8C4 3 8 13 12 8C16 3 20 13 23 8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed">
              Australia&apos;s trusted online pharmacy for smoking cessation.
              AHPRA-registered pharmacist assessments and evidence-based
              cessation products delivered to your door.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/#how-it-works"
                  className="text-white/60 hover:text-sage transition-colors text-sm"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-white/60 hover:text-sage transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-white/60 hover:text-sage transition-colors text-sm"
                >
                  Get Started
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-white/60 hover:text-sage transition-colors text-sm"
                >
                  Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact & Legal</h3>
            <ul className="space-y-2.5">
              <li className="text-white/60 text-sm">
                <a
                  href="mailto:mohammad@exhale.health"
                  className="hover:text-sage transition-colors"
                >
                  mohammad@exhale.health
                </a>
              </li>
              <li className="text-white/60 text-sm mt-4">
                <Link
                  href="/privacy"
                  className="hover:text-sage transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li className="text-white/60 text-sm">
                <Link
                  href="/terms"
                  className="hover:text-sage transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Quitline */}
        <div className="mt-10 p-4 rounded-xl bg-white/5 border border-white/10 text-center">
          <p className="text-white/60 text-sm">
            Need support? Call{" "}
            <a href="tel:137848" className="text-sage font-semibold hover:text-white transition-colors">
              Quitline 13 78 48
            </a>{" "}
            — free, confidential smoking cessation support.
          </p>
        </div>

        {/* Compliance Bar */}
        <div className="mt-8 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/40">
              <span className="flex items-center gap-1.5">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-sage/60"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                AHPRA Registered — PHA0002147134
              </span>
              <span>•</span>
              <span>TGA Compliant</span>
            </div>
            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} Exhale. All rights reserved.
            </p>
          </div>
          <p className="mt-4 text-center text-xs text-white/30 max-w-3xl mx-auto">
            Exhale is an online pharmacy service operated by an AHPRA-registered
            pharmacist. Cessation products are supplied following a pharmacist
            assessment in accordance with TGA regulations. This website does not
            provide medical advice. Always seek the guidance of a qualified health
            professional.
          </p>
        </div>
      </div>
    </footer>
  );
}
