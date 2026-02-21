import {
  ClipboardList,
  UserPlus,
  ShieldCheck,
  ShoppingBag,
  Shield,
  Clock,
  Truck,
  ChevronRight,
} from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Register",
    desc: "Create your free account with age verification. Quick and easy — takes less than 2 minutes.",
    num: "1",
  },
  {
    icon: ClipboardList,
    title: "Complete Assessment",
    desc: "Answer a short health questionnaire about your smoking history, medications, and quit goals.",
    num: "2",
  },
  {
    icon: ShieldCheck,
    title: "Get Approved",
    desc: "Our AHPRA-registered pharmacist reviews your assessment and creates a personalised quit plan.",
    num: "3",
  },
  {
    icon: ShoppingBag,
    title: "Shop",
    desc: "Access our curated range of pharmacist-recommended cessation products, delivered to your door.",
    num: "4",
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
    q: "How does the process work?",
    a: "It's simple: register for a free account, complete a short health assessment quiz, and our pharmacist will review it. Once approved, you'll have access to our curated range of cessation products. The entire process is free — you only pay when you purchase products.",
  },
  {
    q: "How much does it cost to get started?",
    a: "Getting started is completely free. Registration and your health assessment cost nothing. You only pay when you're ready to purchase products. We offer free shipping on orders over $100.",
  },
  {
    q: "What's the difference between NRT and therapeutic vapes?",
    a: "NRT (Nicotine Replacement Therapy) includes patches, gum, lozenges, and sprays — these are TGA-approved first-line treatments. Therapeutic vapes are unapproved goods available through pharmacies as an alternative for people who haven't succeeded with NRT alone.",
  },
  {
    q: "Do you ship Australia-wide?",
    a: "Yes! We ship to all Australian addresses via Australia Post. Orders over $100 qualify for free shipping. Standard shipping is $12.90.",
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
            Quit smoking.
            <br />
            <span className="text-[#0D6B5E]">Start breathing.</span>
          </h1>
          <p className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Australia&apos;s online pharmacy for smoking cessation. Get a free assessment
            from an AHPRA-registered pharmacist and access evidence-based cessation
            products delivered to your door.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <a
              href="/register"
              className="px-8 py-4 rounded-full bg-[#0D6B5E] text-white font-medium hover:bg-[#095C50] transition-all hover:shadow-lg hover:shadow-[#0D6B5E]/20 no-underline flex items-center justify-center gap-2"
            >
              Get Started — Free
              <ChevronRight className="w-4 h-4" />
            </a>
            <a
              href="#how-it-works"
              className="px-8 py-4 rounded-full border border-gray-200 text-gray-700 font-medium hover:border-[#0D6B5E] hover:text-[#0D6B5E] transition-colors no-underline"
            >
              Learn More
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-12">
            {[
              { icon: Shield, text: "TGA Compliant" },
              { icon: Clock, text: "Same-Day Dispatch" },
              { icon: Truck, text: "Free Shipping $100+" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-500">
                <item.icon className="w-4 h-4 text-[#0D6B5E]" />
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#0D6B5E] text-sm font-medium mb-2">HOW IT WORKS</p>
            <h2 className="text-3xl font-light">Four simple steps to a smoke-free life</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-16 left-[15%] right-[15%] h-px bg-gradient-to-r from-[#0D6B5E]/20 via-[#0D6B5E]/40 to-[#0D6B5E]/20" />
            {steps.map((step, i) => (
              <div key={i} className="relative text-center">
                <div className="w-28 h-28 mx-auto rounded-2xl bg-gradient-to-br from-[#f0f9f7] to-[#e8f5f1] flex items-center justify-center mb-6 relative">
                  <step.icon className="w-10 h-10 text-[#0D6B5E]" />
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

      {/* Why Exhale */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#0D6B5E] text-sm font-medium mb-2">WHY EXHALE</p>
            <h2 className="text-3xl font-light">Pharmacy-led smoking cessation</h2>
            <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
              Research shows that pharmacist-supported quit attempts are significantly
              more successful than going it alone.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "AHPRA-Registered Pharmacist",
                desc: "Every assessment is reviewed by a qualified, registered pharmacist who creates a personalised quit plan for you.",
                icon: ShieldCheck,
              },
              {
                title: "Evidence-Based Products",
                desc: "Access TGA-compliant cessation products including NRT patches, gum, lozenges, and therapeutic vapes.",
                icon: Shield,
              },
              {
                title: "Convenient & Private",
                desc: "Complete your assessment online, get approved from home, and have products delivered discreetly to your door.",
                icon: Truck,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl bg-white border border-gray-100 hover:border-[#0D6B5E]/30 hover:shadow-lg transition-all"
              >
                <div className="w-14 h-14 rounded-xl bg-[#0D6B5E]/10 flex items-center justify-center mb-4">
                  <item.icon className="w-7 h-7 text-[#0D6B5E]" />
                </div>
                <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quitline Support Banner */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-[#f0f9f7] to-[#e8f5f1] border border-[#0D6B5E]/10 text-center">
            <h3 className="text-lg font-medium text-[#2D2D2D] mb-2">
              Need to talk to someone now?
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Quitline provides free, confidential support for quitting smoking.
            </p>
            <a
              href="tel:137848"
              className="inline-flex items-center gap-2 text-[#0D6B5E] font-semibold text-lg hover:underline"
            >
              📞 Call Quitline: 13 78 48
            </a>
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
              <h2 className="text-3xl font-light mb-4">Ready to start your smoke-free life?</h2>
              <p className="text-white/70 mb-8 max-w-lg mx-auto">
                Register for free, complete your assessment, and get access to pharmacist-recommended
                cessation products — all from the comfort of your home.
              </p>
              <a
                href="/register"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-[#0D6B5E] font-medium hover:bg-gray-100 transition-colors no-underline"
              >
                Get Started — Free
                <ChevronRight className="w-4 h-4" />
              </a>
              <p className="text-white/50 text-xs mt-4">
                Free registration and assessment. You only pay when you purchase products.
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
              "Australia's online pharmacy for smoking cessation support.",
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
