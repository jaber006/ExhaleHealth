import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "Products — NRT & Therapeutic Vapes",
  description:
    "Browse our range of nicotine replacement therapy products including patches, gum, lozenges, sprays, inhalers, and therapeutic vapes. Delivered Australia-wide.",
  openGraph: {
    title: "Products — NRT & Therapeutic Vapes | Exhale",
    description:
      "Browse pharmacist-recommended NRT products and therapeutic vapes for smoking cessation.",
  },
};

const products = [
  // Patches
  {
    id: "1",
    name: "Nicorette Invisipatch Step 1",
    description:
      "25mg nicotine patch for heavy smokers. 16-hour sustained release. 7 patches per box.",
    price: 34.99,
    category: "patches",
    inStock: true,
    requiresConsultation: false,
  },
  {
    id: "2",
    name: "Nicorette Invisipatch Step 2",
    description:
      "15mg nicotine patch for moderate smokers. 16-hour sustained release. 7 patches per box.",
    price: 32.99,
    category: "patches",
    inStock: true,
    requiresConsultation: false,
  },
  {
    id: "3",
    name: "Nicabate CQ Clear Patch Step 1",
    description:
      "21mg nicotine patch. 24-hour continuous release for all-day craving control. 7 patches.",
    price: 36.99,
    category: "patches",
    inStock: true,
    requiresConsultation: false,
  },
  {
    id: "4",
    name: "Nicabate CQ Clear Patch Step 2",
    description:
      "14mg nicotine patch for step-down therapy. 24-hour release. 7 patches per box.",
    price: 34.49,
    category: "patches",
    inStock: true,
    requiresConsultation: false,
  },

  // Gum & Lozenges
  {
    id: "5",
    name: "Nicorette Gum Icy Mint 4mg",
    description:
      "Fast-acting nicotine gum for strong cravings. Icy mint flavour. 30 pieces per pack.",
    price: 18.99,
    category: "gum",
    inStock: true,
    requiresConsultation: false,
  },
  {
    id: "6",
    name: "Nicorette Gum Classic 2mg",
    description:
      "Nicotine gum for light to moderate smokers. Original flavour. 30 pieces per pack.",
    price: 16.49,
    category: "gum",
    inStock: true,
    requiresConsultation: false,
  },
  {
    id: "7",
    name: "Nicorette Cooldrops Lozenges 4mg",
    description:
      "Discreet nicotine lozenges. Cool mint flavour, dissolves slowly. 20 lozenges.",
    price: 15.99,
    category: "gum",
    inStock: true,
    requiresConsultation: false,
  },
  {
    id: "8",
    name: "Nicabate Mini Lozenges 4mg",
    description:
      "Mini lozenges for fast craving relief. Mint flavour. 20 lozenges per pack.",
    price: 14.99,
    category: "gum",
    inStock: true,
    requiresConsultation: false,
  },

  // Sprays & Inhalers
  {
    id: "9",
    name: "Nicorette QuickMist Mouth Spray",
    description:
      "Fastest craving relief — works in 30 seconds. Cool berry flavour. 150 sprays.",
    price: 28.99,
    category: "spray",
    inStock: true,
    requiresConsultation: false,
  },
  {
    id: "10",
    name: "Nicorette QuickMist Duo Pack",
    description:
      "Two mouth sprays for extended use. Cool berry flavour. 2 × 150 sprays.",
    price: 49.99,
    category: "spray",
    inStock: true,
    requiresConsultation: false,
  },
  {
    id: "11",
    name: "Nicorette Inhalator 15mg",
    description:
      "Mimics hand-to-mouth action of smoking. 20 cartridges per pack. Helps with behavioural cravings.",
    price: 32.99,
    category: "inhaler",
    inStock: true,
    requiresConsultation: false,
  },
  {
    id: "12",
    name: "Nicorette Inhalator Refill 15mg",
    description:
      "Refill cartridges for the Nicorette Inhalator. 20 cartridges.",
    price: 28.99,
    category: "inhaler",
    inStock: true,
    requiresConsultation: false,
  },

  // Therapeutic Vapes
  {
    id: "13",
    name: "Therapeutic Vape — Tobacco 20mg",
    description:
      "TGA-approved therapeutic vape. Tobacco flavour. 20mg/mL nicotine. Consultation required.",
    price: 24.99,
    category: "vape",
    inStock: true,
    requiresConsultation: true,
  },
  {
    id: "14",
    name: "Therapeutic Vape — Mint 12mg",
    description:
      "TGA-approved therapeutic vape. Mint flavour. 12mg/mL nicotine for step-down therapy. Consultation required.",
    price: 24.99,
    category: "vape",
    inStock: true,
    requiresConsultation: true,
  },
  {
    id: "15",
    name: "Therapeutic Vape — Berry 6mg",
    description:
      "TGA-approved therapeutic vape. Berry flavour. 6mg/mL nicotine for final step-down. Consultation required.",
    price: 22.99,
    category: "vape",
    inStock: true,
    requiresConsultation: true,
  },
  {
    id: "16",
    name: "Therapeutic Vape Device Kit",
    description:
      "Starter device kit for therapeutic vaping. Includes device, charger, and instructions. Consultation required.",
    price: 39.99,
    category: "vape",
    inStock: true,
    requiresConsultation: true,
  },
];

const categories = [
  { id: "all", label: "All Products" },
  { id: "patches", label: "Patches" },
  { id: "gum", label: "Gum & Lozenges" },
  { id: "spray", label: "Sprays" },
  { id: "inhaler", label: "Inhalers" },
  { id: "vape", label: "Therapeutic Vapes" },
];

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const activeCategory = params.category || "all";

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/5 to-sage/10 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal">
            Our Products
          </h1>
          <p className="mt-4 text-charcoal/60 text-lg max-w-2xl">
            Pharmacist-recommended NRT products and TGA-approved therapeutic
            vapes. All products available for delivery Australia-wide.
          </p>
        </div>
      </section>

      {/* Filters & Products */}
      <section className="py-12 sm:py-16 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={
                  cat.id === "all" ? "/products" : `/products?category=${cat.id}`
                }
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "bg-white text-charcoal/70 hover:bg-sage/10 border border-sage/20"
                }`}
              >
                {cat.label}
              </Link>
            ))}
          </div>

          {/* Therapeutic Vapes Notice */}
          {(activeCategory === "all" || activeCategory === "vape") && (
            <div className="mb-8 bg-primary/5 border border-primary/10 rounded-xl p-5 flex items-start gap-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-primary shrink-0 mt-0.5"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" />
              </svg>
              <div>
                <p className="font-semibold text-charcoal">
                  Therapeutic Vapes Require a Consultation
                </p>
                <p className="text-charcoal/60 text-sm mt-1">
                  In accordance with TGA regulations, therapeutic vaping products
                  can only be supplied following a pharmacist consultation.{" "}
                  <Link
                    href="/book"
                    className="text-primary font-medium hover:underline"
                  >
                    Book your consultation →
                  </Link>
                </p>
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-charcoal/50 text-lg">
                No products found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-white border-t border-sage/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-charcoal mb-3">
            Not Sure What&apos;s Right for You?
          </h2>
          <p className="text-charcoal/60 mb-6">
            Our pharmacist can recommend the best products for your quit journey.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3.5 rounded-full transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-95"
          >
            Book a Consultation — $29.95
          </Link>
        </div>
      </section>
    </>
  );
}
