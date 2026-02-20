import {
  ClipboardList,
  Phone,
  Mail,
  Star,
  Quote,
  Shield,
  Clock,
  Truck,
  ChevronRight,
  Heart,
  Leaf,
  Award,
} from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    title: "Book Online",
    desc: "Choose a time for your phone consultation. Fill in a quick health questionnaire.",
    num: "1",
  },
  {
    icon: Phone,
    title: "Pharmacist Consultation",
    desc: "Personalised quit plan with our AHPRA-registered pharmacist via phone call.",
    num: "2",
  },
  {
    icon: Mail,
    title: "Products Delivered",
    desc: "NRT shipped to your door. Therapeutic vapes available for collection.",
    num: "3",
  },
];

const products = [
  {
    title: "NRT Patches",
    desc: "24-hour steady nicotine release. Step-down programmes available.",
    icon: Heart,
    color: "from-teal-50 to-emerald-50",
  },
  {
    title: "Gum & Lozenges",
    desc: "Fast-acting craving relief when you need it most.",
    icon: Leaf,
    color: "from-green-50 to-lime-50",
  },
  {
    title: "Sprays & Inhalers",
    desc: "Rapid absorption for intense cravings. Oral and nasal options.",
    icon: Award,
    color: "from-emerald-50 to-teal-50",
  },
  {
    title: "Therapeutic Vapes",
    desc: "TGA-notified vaping goods for smoking cessation. Consultation required.",
    icon: Shield,
    color: "from-cyan-50 to-teal-50",
    badge: "Consultation Required",
  },
];

const testimonials = [
  {
    quote:
      "After 15 years of smoking, Exhale helped me quit in 8 weeks. The pharmacist was incredibly supportive and checked in regularly.",
    name: "Michael R.",
    location: "Perth",
    initial: "M",
  },
  {
    quote:
      "I switched from illegal vapes to a proper quit plan. Having a real pharmacist guide me made all the difference.",
    name: "Jess L.",
    location: "Sydney",
    initial: "J",
  },
  {
    quote:
      "The NRT subscription was so convenient. Products at my door every month, plus check-in calls to keep me on track.",
    name: "David W.",
    location: "Brisbane",
    initial: "D",
  },
];

const faqs = [
  {
    q: "Can a pharmacist help me quit smoking?",
    a: "Absolutely. Pharmacists are registered health practitioners trained in smoking cessation. They can assess your needs, recommend NRT products, create a personalised quit plan, and provide ongoing support. Our pharmacist is AHPRA-registered (PHA0002147134).",
  },
  {
    q: "Are therapeutic vapes legal in Australia?",
    a: "Yes. Since 1 October 2024, pharmacists can supply therapeutic vapes with nicotine concentrations of 20mg/mL or less to adults 18+ without a prescription, for smoking cessation purposes. All products must be on the TGA notified vape list.",
  },
  {
    q: "Do you ship NRT products Australia-wide?",
    a: "Yes! NRT products (patches, gum, lozenges, sprays, inhalers) are shipped Australia-wide via Australia Post. Free shipping on orders over $50. Same-day dispatch for orders placed before 2pm AEST.",
  },
  {
    q: "How much does a consultation cost?",
    a: "A pharmacist consultation is $29.95. This includes a personalised quit plan, product recommendations, and follow-up support. If we determine our service isn't suitable for your needs, you won't be charged.",
  },
  {
    q: "What's the difference between NRT and therapeutic vapes?",
    a: "NRT (Nicotine Replacement Therapy) includes patches, gum, lozenges, and sprays — these are TGA-approved first-line treatments. Therapeutic vapes are unapproved goods available through pharmacies as an alternative for people who haven't succeeded with NRT alone.",
  },
];

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f0f9f7] via-[#f5faf8] to-[#FAFAF5]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#0D6B5E]/5 rounded-full blur-3xl -translate-y-1/2" />
        <div className="relative max-w-4xl mx-auto px-6 pt-24 pb-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0D6B5E]/10 text-[#0D6B5E] text-sm font-medium mb-8">
            <Shield className="w-4 h-4" />
            AHPRA Registered Pharmacist
          </div>
          <h1 className="text-5xl md:text-6xl font-light leading-tight tracking-tight">
            Quit smoking. Quit vaping.
            <br />
            <span className="text-[#0D6B5E]">Start breathing.</span>
          </h1>
          <p className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Australia&apos;s online pharmacy for smoking cessation. Speak to an AHPRA-registered
            pharmacist and get NRT delivered or access therapeutic vapes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <a
              href="/book"
              className="px-8 py-4 rounded-full bg-[#0D6B5E] text-white font-medium hover:bg-[#095C50] transition-all hover:shadow-lg hover:shadow-[#0D6B5E]/20 no-underline flex items-center justify-center gap-2"
            >
              Book a Consultation
              <ChevronRight className="w-4 h-4" />
            </a>
            <a
              href="/products"
              className="px-8 py-4 rounded-full border border-gray-200 text-gray-700 font-medium hover:border-[#0D6B5E] hover:text-[#0D6B5E] transition-colors no-underline"
            >
              Browse NRT Products
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-12">
            {[
              { icon: Shield, text: "TGA Compliant" },
              { icon: Clock, text: "Same-Day Dispatch" },
              { icon: Truck, text: "Free Shipping $50+" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-500">
                <item.icon className="w-4 h-4 text-[#0D6B5E]" />
                {item.text}
              </div>
            ))}
          </div>
          <div className="mt-6 inline-flex items-center gap-2 text-sm text-[#0D6B5E]">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#E8B931] text-[#E8B931]" />
              ))}
            </div>
            500+ patients helped with quitting
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#0D6B5E] text-sm font-medium mb-2">HOW IT WORKS</p>
            <h2 className="text-3xl font-light">Three simple steps to quitting</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-px bg-gradient-to-r from-[#0D6B5E]/20 via-[#0D6B5E]/40 to-[#0D6B5E]/20" />
            {steps.map((step, i) => (
              <div key={i} className="relative text-center">
                <div className="w-32 h-32 mx-auto rounded-2xl bg-gradient-to-br from-[#f0f9f7] to-[#e8f5f1] flex items-center justify-center mb-6 relative">
                  <step.icon className="w-12 h-12 text-[#0D6B5E]" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#0D6B5E] text-white text-sm font-medium flex items-center justify-center">
                    {step.num}
                  </div>
                </div>
                <h3 className="text-lg font-medium mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#0D6B5E] text-sm font-medium mb-2">PRODUCTS</p>
            <h2 className="text-3xl font-light">Evidence-based cessation products</h2>
            <p className="mt-4 text-gray-500">
              First-line NRT products shipped Australia-wide. Therapeutic vapes available with pharmacist consultation.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {products.map((product, i) => (
              <a
                key={i}
                href="/products"
                className="group relative p-8 rounded-2xl bg-gradient-to-br ${product.color} border border-gray-100 hover:border-[#0D6B5E]/30 hover:shadow-lg transition-all no-underline text-[#2D2D2D]"
              >
                {product.badge && (
                  <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#0D6B5E] text-white text-xs font-medium">
                    {product.badge}
                  </span>
                )}
                <div className="w-14 h-14 rounded-xl bg-white/80 flex items-center justify-center mb-4 group-hover:bg-white transition-colors">
                  <product.icon className="w-7 h-7 text-[#0D6B5E]" />
                </div>
                <h3 className="text-lg font-medium mb-2">{product.title}</h3>
                <p className="text-gray-500 text-sm">{product.desc}</p>
                <div className="mt-4 text-[#0D6B5E] text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  View products <ChevronRight className="w-4 h-4" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#0D6B5E] text-sm font-medium mb-2">TESTIMONIALS</p>
            <h2 className="text-3xl font-light">Real stories from real quitters</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="relative p-8 rounded-2xl bg-[#FAFAF5] border border-gray-100 hover:shadow-md transition-all"
              >
                <Quote className="absolute top-6 right-6 w-8 h-8 text-[#0D6B5E]/10" />
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-[#E8B931] text-[#E8B931]" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0D6B5E]/10 text-[#0D6B5E] flex items-center justify-center font-medium text-sm">
                    {t.initial}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#0D6B5E] text-sm font-medium mb-2">FAQ</p>
            <h2 className="text-3xl font-light">Common questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group bg-white rounded-xl border border-gray-100 overflow-hidden"
              >
                <summary className="px-6 py-5 cursor-pointer text-sm font-medium flex items-center justify-between list-none hover:bg-gray-50 transition-colors">
                  {faq.q}
                  <ChevronRight className="w-4 h-4 text-gray-400 transition-transform group-open:rotate-90" />
                </summary>
                <div className="px-6 pb-5 text-sm text-gray-500 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="p-12 rounded-3xl bg-gradient-to-br from-[#0D6B5E] to-[#095C50] text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <h2 className="text-3xl font-light mb-4">Ready to quit?</h2>
              <p className="text-white/70 mb-8 max-w-lg mx-auto">
                Book a consultation with our pharmacist today. Personalised quit plan, product
                recommendations, and ongoing support — all from the comfort of your home.
              </p>
              <a
                href="/book"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-[#0D6B5E] font-medium hover:bg-gray-100 transition-colors no-underline"
              >
                Book Your Consultation — $29.95
                <ChevronRight className="w-4 h-4" />
              </a>
              <p className="text-white/50 text-xs mt-4">
                No charge if we determine our service isn&apos;t suitable for you
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalBusiness",
            name: "Exhale Health",
            url: "https://exhale.health",
            description:
              "Australia's online pharmacy for smoking and vaping cessation support.",
            medicalSpecialty: "Pharmacy",
            telephone: "+61429664266",
            address: {
              "@type": "PostalAddress",
              addressCountry: "AU",
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
    </main>
  );
}
