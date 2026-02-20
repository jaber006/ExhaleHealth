import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Exhale terms of service. Terms and conditions for using our online pharmacy and consultation services.",
};

export default function TermsPage() {
  return (
    <section className="py-16 sm:py-20 bg-warm-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-charcoal mb-2">Terms of Service</h1>
        <p className="text-charcoal/50 text-sm mb-10">Last updated: February 2026</p>

        <div className="prose prose-lg max-w-none text-charcoal/80">
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-charcoal mb-3">1. Service Overview</h2>
              <p className="leading-relaxed">
                Exhale provides online pharmacist consultation services and smoking/vaping cessation products.
                Our services are available to Australian residents aged 18 years and over. All consultations
                are conducted by AHPRA-registered pharmacists.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-charcoal mb-3">2. Consultations</h2>
              <p className="leading-relaxed">
                Consultation fees are non-refundable once the consultation has been completed. If you need to
                reschedule, please contact us at least 24 hours before your appointment. We reserve the right
                to refuse service if we believe it is not in your best health interest.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-charcoal mb-3">3. Products</h2>
              <p className="leading-relaxed">
                All products are supplied in accordance with TGA regulations. Therapeutic vaping products
                require a valid pharmacist consultation before supply. We do not ship products outside Australia.
                Product prices are in Australian dollars and include GST.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-charcoal mb-3">4. Therapeutic Vapes</h2>
              <p className="leading-relaxed">
                Therapeutic vaping products are classified as therapeutic goods under the Therapeutic Goods Act
                1989. They are only available following a pharmacist consultation and assessment. Supply is at
                the pharmacist&apos;s professional discretion and in accordance with TGA requirements.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-charcoal mb-3">5. Medical Disclaimer</h2>
              <p className="leading-relaxed">
                Exhale is a pharmacy service, not a substitute for medical advice from a doctor. If you have
                serious health concerns, please consult your GP. Our pharmacist will refer you to a doctor
                when clinically appropriate.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-charcoal mb-3">6. Refunds & Returns</h2>
              <p className="leading-relaxed">
                Due to the nature of pharmaceutical products, we cannot accept returns of opened products.
                Unopened products may be returned within 14 days for a full refund. Contact us at{" "}
                <a href="mailto:hello@exhale.health" className="text-primary hover:underline">
                  hello@exhale.health
                </a>{" "}
                to arrange a return.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-charcoal mb-3">7. Contact</h2>
              <p className="leading-relaxed">
                For questions about these terms, contact us at{" "}
                <a href="mailto:hello@exhale.health" className="text-primary hover:underline">
                  hello@exhale.health
                </a>{" "}
                or call 1300 123 456.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
