import Link from "next/link";

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-primary min-h-[90vh] flex items-center">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating circles */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-sage/10 rounded-full blur-3xl animate-breathe" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-sage/10 rounded-full blur-3xl animate-breathe delay-1000" />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-float" />
        
        {/* Wave pattern at bottom */}
        <svg
          className="absolute bottom-0 w-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0 60 C200 100 400 20 600 60 C800 100 1000 20 1200 60 L1200 120 L0 120Z"
            fill="#FAFAF5"
            opacity="1"
          />
          <path
            d="M0 80 C300 110 500 50 700 80 C900 110 1100 50 1200 80 L1200 120 L0 120Z"
            fill="#FAFAF5"
            opacity="0.5"
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="max-w-3xl">
          <div className="animate-fade-in-up">
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-sage-light">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              AHPRA-Registered Pharmacist Service
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight animate-fade-in-up delay-100">
            Quit smoking.
            <br />
            Quit vaping.
            <br />
            <span className="text-sage-light">Start breathing.</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-white/80 max-w-2xl leading-relaxed animate-fade-in-up delay-200">
            Australia&apos;s online pharmacy for smoking cessation. Speak to an
            AHPRA-registered pharmacist and get NRT or therapeutic vapes
            delivered to your door.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300">
            <Link
              href="/book"
              className="inline-flex items-center justify-center bg-white text-primary font-semibold px-8 py-4 rounded-full hover:bg-sage-light hover:text-primary-dark transition-all hover:shadow-xl hover:shadow-black/10 active:scale-95 text-lg"
            >
              Book a Consultation
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-full hover:bg-white/20 transition-all border border-white/20 active:scale-95 text-lg"
            >
              Browse NRT Products
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap gap-6 animate-fade-in-up delay-500">
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-sage-light">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              AHPRA Registered
            </div>
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-sage-light">
                <path d="M9 12l2 2 4-4" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              TGA Compliant
            </div>
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-sage-light">
                <rect x="1" y="3" width="22" height="18" rx="2" />
                <path d="M1 9h22" />
              </svg>
              Free Shipping Over $50
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const stats = [
    { value: "500+", label: "Patients Helped" },
    { value: "AHPRA", label: "Registered Pharmacist" },
    { value: "Same-Day", label: "Dispatch Available" },
  ];

  return (
    <section className="py-12 sm:py-16 bg-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary">
                {stat.value}
              </div>
              <div className="mt-1 text-charcoal/60 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Book Online",
      description:
        "Choose a convenient time for your phone consultation with our pharmacist. Quick, easy, and completely private.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
          <circle cx="12" cy="16" r="1" fill="currentColor" />
        </svg>
      ),
    },
    {
      number: "02",
      title: "Pharmacist Consultation",
      description:
        "Receive a personalised quit plan from our AHPRA-registered pharmacist. Tailored to your smoking or vaping history.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
        </svg>
      ),
    },
    {
      number: "03",
      title: "Products Delivered",
      description:
        "NRT products shipped directly to your door, or collect therapeutic vapes from our pharmacy. Fast, discreet delivery.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="1" y="3" width="22" height="14" rx="2" />
          <path d="M1 10h22M8 17v4M16 17v4M5 21h14" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal">
            How It Works
          </h2>
          <p className="mt-4 text-charcoal/60 text-lg max-w-2xl mx-auto">
            Three simple steps to start your quit journey with professional
            pharmacist support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, i) => (
            <div key={i} className="relative group">
              {/* Connector line */}
              {i < 2 && (
                <div className="hidden md:block absolute top-16 left-[calc(100%_-_1rem)] w-[calc(100%_-_4rem)] h-px bg-sage/30 z-0" />
              )}

              <div className="relative bg-warm-white rounded-2xl p-8 hover:shadow-lg hover:shadow-sage/10 transition-all duration-300 border border-sage/10">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    {step.icon}
                  </div>
                  <span className="text-5xl font-bold text-sage/30">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-charcoal mb-3">
                  {step.title}
                </h3>
                <p className="text-charcoal/60 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCategoriesSection() {
  const categories = [
    {
      name: "NRT Patches",
      description:
        "Slow-release nicotine patches for consistent craving control throughout the day.",
      href: "/products?category=patches",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="4" />
          <path d="M9 12h6M12 9v6" />
        </svg>
      ),
      colour: "from-primary/5 to-sage/10",
    },
    {
      name: "Gum & Lozenges",
      description:
        "Fast-acting relief for sudden cravings. Available in multiple flavours and strengths.",
      href: "/products?category=gum",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="3" strokeLinecap="round" />
          <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="3" strokeLinecap="round" />
        </svg>
      ),
      colour: "from-sage/10 to-primary/5",
    },
    {
      name: "Sprays & Inhalers",
      description:
        "Quick-relief nicotine sprays and inhalers for on-the-go craving management.",
      href: "/products?category=spray",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M7 21h10M12 21V11M5 11h14l-2-7H7L5 11z" />
          <path d="M12 4V2" />
        </svg>
      ),
      colour: "from-primary/5 to-sage/10",
    },
    {
      name: "Therapeutic Vapes",
      description:
        "TGA-approved therapeutic vaping products. Consultation required for access.",
      href: "/products?category=vape",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M8 21h8M12 21V11" />
          <path d="M7 11h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v2a2 2 0 002 2z" />
          <path d="M10 4V2M14 4V2" />
          <path d="M9 1v1M15 1v1" />
        </svg>
      ),
      colour: "from-sage/10 to-primary/5",
      badge: "Consultation Required",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal">
            Our Products
          </h2>
          <p className="mt-4 text-charcoal/60 text-lg max-w-2xl mx-auto">
            Pharmacist-recommended nicotine replacement therapy and cessation
            products delivered Australia-wide.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <Link
              key={i}
              href={cat.href}
              className="group relative bg-white rounded-2xl p-6 hover:shadow-xl hover:shadow-sage/15 transition-all duration-300 border border-sage/10 hover:-translate-y-1"
            >
              {cat.badge && (
                <span className="absolute top-4 right-4 bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full">
                  {cat.badge}
                </span>
              )}
              <div
                className={`w-16 h-16 bg-gradient-to-br ${cat.colour} rounded-2xl flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                {cat.icon}
              </div>
              <h3 className="text-lg font-semibold text-charcoal mb-2">
                {cat.name}
              </h3>
              <p className="text-charcoal/60 text-sm leading-relaxed">
                {cat.description}
              </p>
              <div className="mt-4 flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
                Browse
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-1">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "After 15 years of smoking, Exhale helped me quit in 8 weeks. The pharmacist was incredibly supportive.",
      name: "Michael R.",
      location: "Perth",
      rating: 5,
    },
    {
      quote:
        "I switched from illegal vapes to a proper quit plan. Having a real pharmacist guide me made all the difference.",
      name: "Jess L.",
      location: "Sydney",
      rating: 5,
    },
    {
      quote:
        "The NRT subscription was so convenient. Products at my door every month, plus check-in calls to keep me on track.",
      name: "David W.",
      location: "Brisbane",
      rating: 5,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal">
            Real Stories, Real Results
          </h2>
          <p className="mt-4 text-charcoal/60 text-lg max-w-2xl mx-auto">
            Hear from Australians who&apos;ve taken control of their health with
            Exhale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-warm-white rounded-2xl p-8 border border-sage/10 hover:shadow-lg hover:shadow-sage/10 transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <svg
                    key={j}
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="#0D6B5E"
                    className="text-primary"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-charcoal/80 leading-relaxed mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-semibold text-sm">
                    {t.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-charcoal text-sm">
                    {t.name}
                  </p>
                  <p className="text-charcoal/50 text-xs">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    {
      question: "What is a pharmacist consultation?",
      answer:
        "A pharmacist consultation is a private phone call with our AHPRA-registered pharmacist. During the 15–20 minute session, we'll discuss your smoking or vaping history, assess your health needs, and create a personalised quit plan with recommended NRT products.",
    },
    {
      question: "Do I need a consultation to buy NRT products?",
      answer:
        "Standard NRT products like patches, gum, and lozenges can be purchased without a consultation. However, therapeutic vaping products require a pharmacist consultation as per TGA regulations. We always recommend a consultation for the best results.",
    },
    {
      question: "Are therapeutic vapes legal in Australia?",
      answer:
        "Yes, therapeutic vaping products are legal in Australia when supplied through a pharmacy with appropriate oversight. Since October 2024, pharmacists can supply therapeutic vapes to help smokers quit. All our products comply with TGA regulations.",
    },
    {
      question: "How much does a consultation cost?",
      answer:
        "Our initial pharmacist consultation is $29.95. This includes a comprehensive assessment, personalised quit plan, and product recommendations. Follow-up check-in calls are included at no extra charge as part of your quit journey.",
    },
    {
      question: "How fast is delivery?",
      answer:
        "We offer same-day dispatch for orders placed before 2pm AEST. Standard delivery is 2–5 business days Australia-wide. Express shipping is available at checkout. Orders over $50 ship free.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-warm-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-charcoal/60 text-lg">
            Everything you need to know about our service.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="group bg-white rounded-xl border border-sage/10 overflow-hidden"
            >
              <summary className="flex items-center justify-between cursor-pointer p-6 hover:bg-sage/5 transition-colors">
                <span className="font-semibold text-charcoal pr-4">
                  {faq.question}
                </span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="shrink-0 text-primary transition-transform group-open:rotate-180"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </summary>
              <div className="px-6 pb-6 text-charcoal/70 leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-primary to-primary-dark relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-20 w-64 h-64 bg-sage/10 rounded-full blur-3xl animate-breathe" />
        <div className="absolute bottom-10 left-20 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-float" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Ready to Start Breathing Freely?
        </h2>
        <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
          Book your pharmacist consultation today and take the first step
          towards a smoke-free, vape-free life. We&apos;re here to support you every
          step of the way.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/book"
            className="inline-flex items-center justify-center bg-white text-primary font-semibold px-8 py-4 rounded-full hover:bg-sage-light transition-all hover:shadow-xl active:scale-95 text-lg"
          >
            Book Your Consultation — $29.95
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center justify-center text-white font-medium px-6 py-4 rounded-full hover:bg-white/10 transition-all border border-white/20"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <HowItWorksSection />
      <ProductCategoriesSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
