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
    default: "Exhale — Quit Smoking & Vaping | Online Pharmacy Australia",
    template: "%s | Exhale",
  },
  description:
    "Australia's online pharmacy for smoking cessation. Speak to an AHPRA-registered pharmacist and get NRT or therapeutic vapes delivered to your door.",
  keywords: [
    "quit smoking",
    "quit vaping",
    "NRT",
    "nicotine replacement therapy",
    "online pharmacy",
    "Australia",
    "therapeutic vapes",
    "smoking cessation",
    "pharmacist consultation",
  ],
  metadataBase: new URL("https://exhale.health"),
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://exhale.health",
    siteName: "Exhale",
    title: "Exhale — Quit Smoking & Vaping | Online Pharmacy Australia",
    description:
      "Australia's online pharmacy for smoking cessation. Speak to an AHPRA-registered pharmacist and get NRT or therapeutic vapes delivered.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Exhale — Quit Smoking & Vaping",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Exhale — Quit Smoking & Vaping",
    description:
      "Australia's online pharmacy for smoking cessation. AHPRA-registered pharmacist consultations and NRT delivery.",
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
                    "Australia's online pharmacy for smoking cessation",
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
                    "AHPRA-registered online pharmacy specialising in smoking and vaping cessation",
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
