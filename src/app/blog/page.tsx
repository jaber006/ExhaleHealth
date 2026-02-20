import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog — Quit Smoking Tips & Resources",
  description:
    "Expert advice on quitting smoking and vaping. Tips, resources, and the latest research from our AHPRA-registered pharmacist.",
  openGraph: {
    title: "Blog | Exhale — Quit Smoking & Vaping Resources",
    description:
      "Expert advice on quitting smoking and vaping from our AHPRA-registered pharmacist.",
  },
};

const upcomingPosts = [
  {
    title: "NRT Patches vs Gum: Which Is Right for You?",
    excerpt:
      "A pharmacist's guide to choosing between nicotine patches and gum based on your smoking habits and lifestyle.",
    category: "NRT Guide",
    readTime: "5 min read",
  },
  {
    title: "Understanding Australia's New Vaping Laws (2024)",
    excerpt:
      "What the TGA's October 2024 vaping reforms mean for smokers trying to quit and how therapeutic vapes now work.",
    category: "Regulation",
    readTime: "7 min read",
  },
  {
    title: "5 Science-Backed Tips to Manage Nicotine Cravings",
    excerpt:
      "Evidence-based strategies to handle cravings during your first week of quitting, from a registered pharmacist.",
    category: "Quit Tips",
    readTime: "4 min read",
  },
];

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/5 to-sage/10 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal">
              The Exhale Blog
            </h1>
            <p className="mt-4 text-charcoal/60 text-lg">
              Expert advice, quit tips, and the latest research on smoking and
              vaping cessation from our AHPRA-registered pharmacist.
            </p>
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-16 sm:py-24 bg-warm-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0D6B5E"
                strokeWidth="1.5"
              >
                <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
                <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-charcoal mb-3">
              Coming Soon
            </h2>
            <p className="text-charcoal/60 max-w-lg mx-auto">
              We&apos;re preparing helpful articles to support your quit journey.
              Check back soon for expert insights from our pharmacist.
            </p>
          </div>

          {/* Preview cards */}
          <div className="space-y-4">
            {upcomingPosts.map((post, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-sage/10 hover:shadow-lg hover:shadow-sage/10 transition-all duration-300 opacity-80 hover:opacity-100"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  {/* Placeholder image */}
                  <div className="w-full sm:w-32 h-24 sm:h-20 bg-gradient-to-br from-sage/10 to-primary/5 rounded-xl flex items-center justify-center shrink-0">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#0D6B5E"
                      strokeWidth="1.5"
                      opacity="0.3"
                    >
                      <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
                      <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
                    </svg>
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                        {post.category}
                      </span>
                      <span className="text-xs text-charcoal/40">
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="font-semibold text-charcoal mb-1">
                      {post.title}
                    </h3>
                    <p className="text-charcoal/60 text-sm line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="shrink-0">
                    <span className="inline-flex items-center gap-1 text-charcoal/30 text-sm font-medium">
                      Coming Soon
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter signup */}
          <div className="mt-12 bg-white rounded-2xl p-8 border border-sage/10 text-center">
            <h3 className="text-xl font-bold text-charcoal mb-2">
              Get Notified When We Publish
            </h3>
            <p className="text-charcoal/60 text-sm mb-6">
              Sign up for updates and be the first to read our quit tips and
              resources.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-full border border-sage/20 bg-warm-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-sm"
              />
              <button className="bg-primary hover:bg-primary-dark text-white font-medium px-6 py-3 rounded-full transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-95 text-sm whitespace-nowrap">
                Notify Me
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-white border-t border-sage/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-charcoal mb-3">
            Can&apos;t Wait? Talk to Our Pharmacist Now.
          </h2>
          <p className="text-charcoal/60 mb-6">
            Get personalised advice for your quit journey today.
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
