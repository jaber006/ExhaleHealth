import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Exhale — Quit Smoking | Online Pharmacy Australia",
    template: "%s | Exhale",
  },
  description:
    "Australia's online pharmacy for smoking cessation. Free assessment by an AHPRA-registered pharmacist. Evidence-based cessation products delivered to your door.",
  keywords: [
    "quit smoking",
    "NRT",
    "nicotine replacement therapy",
    "online pharmacy",
    "Australia",
    "smoking cessation",
    "pharmacist",
  ],
  metadataBase: new URL("https://exhale.health"),
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://exhale.health",
    siteName: "Exhale",
    title: "Exhale — Quit Smoking | Online Pharmacy Australia",
    description:
      "Australia's online pharmacy for smoking cessation. Free pharmacist assessment and evidence-based cessation products delivered to your door.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Exhale — Quit Smoking",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Exhale — Quit Smoking",
    description:
      "Australia's online pharmacy for smoking cessation. Free pharmacist assessment and cessation products delivered Australia-wide.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://exhale.health/#organization",
                  name: "Exhale",
                  url: "https://exhale.health",
                  description:
                    "Australia's online pharmacy for smoking cessation products",
                  contactPoint: {
                    "@type": "ContactPoint",
                    contactType: "customer service",
                    email: "hello@exhale.health",
                  },
                },
                {
                  "@type": "WebSite",
                  "@id": "https://exhale.health/#website",
                  url: "https://exhale.health",
                  name: "Exhale",
                  publisher: {
                    "@id": "https://exhale.health/#organization",
                  },
                },
                {
                  "@type": "MedicalBusiness",
                  "@id": "https://exhale.health/#business",
                  name: "Exhale Pharmacy",
                  url: "https://exhale.health",
                  description:
                    "AHPRA-registered online pharmacy specialising in smoking cessation",
                  medicalSpecialty: "Pharmacy",
                  priceRange: "$$",
                  areaServed: {
                    "@type": "Country",
                    name: "Australia",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased bg-warm-white text-charcoal`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
