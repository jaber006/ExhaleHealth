import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Exhale Health — Quit Smoking & Vaping Support",
    template: "%s | Exhale Health",
  },
  description:
    "Australia's online pharmacy for smoking and vaping cessation. Speak to an AHPRA-registered pharmacist, get NRT delivered or access therapeutic vapes. Quit with confidence.",
  keywords: [
    "quit smoking Australia",
    "quit vaping Australia",
    "NRT online pharmacy",
    "nicotine replacement therapy",
    "therapeutic vapes pharmacy",
    "pharmacist consultation smoking",
    "smoking cessation online",
  ],
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://exhale.health",
    siteName: "Exhale Health",
    title: "Exhale Health — Quit Smoking & Vaping Support",
    description:
      "Speak to an AHPRA-registered pharmacist. Get NRT delivered or access therapeutic vapes. Australia's online quit smoking platform.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU">
      <body className="antialiased bg-[#FAFAF5] text-[#2D2D2D]">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2 no-underline">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0D6B5E] to-[#8FBC8F] flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l7 4.5-7 4.5z" fill="currentColor" opacity="0"/>
                  <path d="M8 16c0-3 2-5.5 4-7s4-3 4-5c0 3-2 5.5-4 7s-4 3-4 5z" fill="currentColor" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="text-xl font-light tracking-tight text-[#2D2D2D]">
                exhale<span className="text-[#0D6B5E]">.</span>
              </span>
            </a>
            <div className="hidden md:flex items-center gap-8">
              <a href="/products" className="text-sm text-gray-600 hover:text-[#0D6B5E] transition-colors no-underline">
                Products
              </a>
              <a href="/book" className="text-sm text-gray-600 hover:text-[#0D6B5E] transition-colors no-underline">
                Consultation
              </a>
              <a href="/about" className="text-sm text-gray-600 hover:text-[#0D6B5E] transition-colors no-underline">
                About
              </a>
              <a href="/blog" className="text-sm text-gray-600 hover:text-[#0D6B5E] transition-colors no-underline">
                Blog
              </a>
              <a
                href="/book"
                className="px-5 py-2.5 rounded-full bg-[#0D6B5E] text-white text-sm font-medium hover:bg-[#095C50] transition-colors no-underline"
              >
                Book a Consultation
              </a>
            </div>
          </div>
        </nav>

        {children}

        {/* Footer */}
        <footer className="bg-[#2D2D2D] text-white/70 mt-24">
          <div className="max-w-6xl mx-auto px-6 py-16">
            <div className="grid md:grid-cols-4 gap-12">
              <div>
                <span className="text-xl font-light text-white">
                  exhale<span className="text-[#8FBC8F]">.</span>
                </span>
                <p className="mt-4 text-sm leading-relaxed">
                  Australia&apos;s online pharmacy for smoking and vaping cessation support.
                </p>
              </div>
              <div>
                <h4 className="text-white text-sm font-medium mb-4">Services</h4>
                <div className="flex flex-col gap-2">
                  <a href="/book" className="text-sm hover:text-white transition-colors no-underline text-white/70">Pharmacist Consultation</a>
                  <a href="/products" className="text-sm hover:text-white transition-colors no-underline text-white/70">NRT Products</a>
                  <a href="/products" className="text-sm hover:text-white transition-colors no-underline text-white/70">Therapeutic Vapes</a>
                </div>
              </div>
              <div>
                <h4 className="text-white text-sm font-medium mb-4">Resources</h4>
                <div className="flex flex-col gap-2">
                  <a href="/blog" className="text-sm hover:text-white transition-colors no-underline text-white/70">Blog</a>
                  <a href="/about" className="text-sm hover:text-white transition-colors no-underline text-white/70">About Us</a>
                  <a href="/privacy" className="text-sm hover:text-white transition-colors no-underline text-white/70">Privacy Policy</a>
                  <a href="/terms" className="text-sm hover:text-white transition-colors no-underline text-white/70">Terms of Service</a>
                </div>
              </div>
              <div>
                <h4 className="text-white text-sm font-medium mb-4">Compliance</h4>
                <p className="text-xs leading-relaxed">
                  AHPRA Registered Pharmacist: PHA0002147134<br />
                  TGA SAS-C Compliant<br />
                  ABN: Pending
                </p>
                <p className="text-xs mt-4 leading-relaxed">
                  Therapeutic vaping goods are unapproved therapeutic goods. They have not been assessed by the TGA for quality, safety or efficacy.
                </p>
              </div>
            </div>
            <div className="border-t border-white/10 mt-12 pt-8 text-center text-xs">
              © {new Date().getFullYear()} Exhale Health. All rights reserved. | Quit support: call Quitline 13 78 48
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
