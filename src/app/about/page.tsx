import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Exhale — Australia's trusted online pharmacy for smoking and vaping cessation. Meet our AHPRA-registered pharmacist Mohammad Jaber.",
  openGraph: {
    title: "About Exhale | Quit Smoking & Vaping",
    description:
      "Learn about our mission, our pharmacist, and why pharmacy-led cessation works.",
  },
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/5 to-sage/10 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal">
              About Exhale
            </h1>
            <p className="mt-4 text-charcoal/60 text-lg">
              Helping Australians quit smoking and vaping through professional
              pharmacy care, personalised support, and evidence-based products.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="text-primary font-semibold text-sm uppercase tracking-wide">
                Our Mission
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-charcoal">
                Helping Australians Breathe Freely
              </h2>
              <div className="mt-6 space-y-4 text-charcoal/70 leading-relaxed">
                <p>
                  Smoking kills over 20,000 Australians every year. Vaping has
                  become an epidemic among young people. We believe everyone
                  deserves access to professional support on their quit journey —
                  not just those who can visit a pharmacy during business hours.
                </p>
                <p>
                  Exhale was founded to bridge this gap. We combine the
                  expertise of AHPRA-registered pharmacists with the
                  convenience of telehealth, making it easier than ever for
                  Australians to access evidence-based smoking and vaping
                  cessation support.
                </p>
                <p>
                  Whether you&apos;ve been smoking for decades or started vaping
                  recently, our pharmacist works with you to create a
                  personalised quit plan using proven NRT products and, where
                  appropriate, TGA-approved therapeutic vapes.
                </p>
              </div>
            </div>

            {/* Decorative visual */}
            <div className="relative">
              <div className="bg-gradient-to-br from-sage/20 to-primary/10 rounded-3xl p-12 sm:p-16 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <svg
                    width="300"
                    height="200"
                    viewBox="0 0 300 200"
                    fill="none"
                    className="text-primary"
                  >
                    <path
                      d="M10 100 C50 50 100 150 150 100 C200 50 250 150 290 100"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <path
                      d="M10 120 C50 70 100 170 150 120 C200 70 250 170 290 120"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      opacity="0.5"
                    />
                  </svg>
                </div>
                <div className="relative text-center">
                  <div className="text-6xl sm:text-7xl font-bold text-primary/20 mb-2">
                    20,000+
                  </div>
                  <p className="text-primary font-semibold text-lg">
                    Australians die from smoking yearly
                  </p>
                  <p className="text-charcoal/60 mt-2 text-sm">
                    We&apos;re here to change that, one patient at a time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pharmacist */}
      <section className="py-16 sm:py-24 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Photo placeholder */}
            <div className="order-2 lg:order-1">
              <div className="bg-gradient-to-br from-primary/10 to-sage/20 rounded-3xl aspect-square max-w-md mx-auto flex items-center justify-center relative overflow-hidden">
                <div className="text-center">
                  <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      width="64"
                      height="64"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#0D6B5E"
                      strokeWidth="1.5"
                    >
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <p className="text-primary font-semibold">Mohammad Jaber</p>
                  <p className="text-charcoal/50 text-sm">
                    AHPRA-Registered Pharmacist
                  </p>
                </div>
                {/* Decorative badge */}
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                  <div className="flex items-center gap-2 text-sm">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#0D6B5E"
                      strokeWidth="2"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    <span className="font-semibold text-charcoal">
                      AHPRA Verified
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <span className="text-primary font-semibold text-sm uppercase tracking-wide">
                Your Pharmacist
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-charcoal">
                Mohammad Jaber
              </h2>
              <p className="mt-2 text-primary font-medium">
                AHPRA Registration: PHA0002147134
              </p>

              <div className="mt-6 space-y-4 text-charcoal/70 leading-relaxed">
                <p>
                  Mohammad is an AHPRA-registered pharmacist with extensive
                  experience in smoking cessation and community pharmacy. He is
                  passionate about helping patients quit smoking and vaping through
                  evidence-based approaches.
                </p>
                <p>
                  With a deep understanding of nicotine dependence and the
                  challenges of quitting, Mohammad provides compassionate,
                  non-judgemental consultations tailored to each patient&apos;s
                  unique circumstances and goals.
                </p>
                <p>
                  Mohammad stays at the forefront of cessation research and TGA
                  regulatory changes, ensuring every patient receives the most
                  current and effective treatment options available.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 border border-sage/10">
                  <div className="text-2xl font-bold text-primary">500+</div>
                  <div className="text-charcoal/60 text-sm">
                    Patients Supported
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-sage/10">
                  <div className="text-2xl font-bold text-primary">AHPRA</div>
                  <div className="text-charcoal/60 text-sm">
                    Fully Registered
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Pharmacy-Led */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal">
              Why Pharmacy-Led Cessation Works
            </h2>
            <p className="mt-4 text-charcoal/60 text-lg max-w-2xl mx-auto">
              Research consistently shows that pharmacist-supported quit
              attempts are more successful than going it alone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Expert Knowledge",
                description:
                  "Pharmacists are medication experts. We understand how NRT products work, potential interactions, and which products suit your specific needs.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
                  </svg>
                ),
              },
              {
                title: "Personalised Plans",
                description:
                  "No two quit journeys are the same. Your pharmacist creates a step-down plan tailored to your smoking or vaping history and health profile.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
                  </svg>
                ),
              },
              {
                title: "Ongoing Support",
                description:
                  "Quitting isn't a one-off event. We provide follow-up calls and check-ins to keep you on track and adjust your plan as needed.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                ),
              },
              {
                title: "TGA Compliance",
                description:
                  "All our products are TGA-approved. Therapeutic vapes are dispensed only through proper pharmaceutical channels with pharmacist oversight.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                ),
              },
              {
                title: "Evidence-Based",
                description:
                  "Our quit plans are based on the latest clinical evidence and best practice guidelines from the RACGP and NHMRC.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 12l2 2 4-4" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                ),
              },
              {
                title: "Accessible & Private",
                description:
                  "Consult from the privacy of your own home. No waiting rooms, no judgement — just professional, compassionate care.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                ),
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-warm-white rounded-2xl p-6 border border-sage/10 hover:shadow-lg hover:shadow-sage/10 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-charcoal mb-2">
                  {item.title}
                </h3>
                <p className="text-charcoal/60 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-16 sm:py-24 bg-warm-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal">
              Regulatory Compliance
            </h2>
            <p className="mt-4 text-charcoal/60 text-lg">
              We operate within Australia&apos;s strict regulatory framework for
              pharmacy and therapeutic goods.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                title: "AHPRA Registered",
                description:
                  "Our pharmacist is fully registered with the Australian Health Practitioner Regulation Agency (AHPRA). Registration number: PHA0002147134.",
              },
              {
                title: "TGA Compliant",
                description:
                  "All therapeutic goods are supplied in compliance with the Therapeutic Goods Administration regulations, including the October 2024 vaping reforms.",
              },
              {
                title: "Privacy Protected",
                description:
                  "Your health information is handled in accordance with the Privacy Act 1988 and the Australian Privacy Principles. All data is encrypted and stored securely.",
              },
              {
                title: "Fair Work Compliant",
                description:
                  "Exhale operates in full compliance with the Fair Work Act 2009 and all applicable employment laws in Australia.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 border border-sage/10"
              >
                <div className="flex items-center gap-3 mb-3">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#0D6B5E"
                    strokeWidth="2"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <h3 className="font-semibold text-charcoal">{item.title}</h3>
                </div>
                <p className="text-charcoal/60 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-primary to-primary-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-20 w-64 h-64 bg-sage/10 rounded-full blur-3xl animate-breathe" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Quit?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Take the first step today. Our pharmacist is here to support you
            every step of the way.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center bg-white text-primary font-semibold px-8 py-4 rounded-full hover:bg-sage-light transition-all hover:shadow-xl active:scale-95 text-lg"
          >
            Book Your Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
