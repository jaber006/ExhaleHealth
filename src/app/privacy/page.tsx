import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Exhale privacy policy. How we collect, use, and protect your personal and health information.",
};

export default function PrivacyPage() {
  return (
    <section className="py-16 sm:py-20 bg-warm-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-charcoal mb-2">Privacy Policy</h1>
        <p className="text-charcoal/50 text-sm mb-10">Last updated: February 2026</p>

        <div className="prose prose-lg max-w-none text-charcoal/80">
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-charcoal mb-3">1. Information We Collect</h2>
              <p className="leading-relaxed">
                We collect personal information that you provide when booking a consultation, purchasing products,
                or contacting us. This includes your name, email, phone number, date of birth, health information
                (smoking/vaping history, medical conditions), and payment details (processed securely via Stripe).
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-charcoal mb-3">2. How We Use Your Information</h2>
              <p className="leading-relaxed">
                We use your information to provide pharmacy services including consultations, dispensing products,
                creating personalised quit plans, and communicating about your care. We may also use de-identified
                data for service improvement.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-charcoal mb-3">3. Health Information</h2>
              <p className="leading-relaxed">
                Your health information is handled in accordance with the Privacy Act 1988 (Cth) and the Australian
                Privacy Principles. We treat all health information with the highest level of confidentiality and
                only share it with healthcare providers involved in your care.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-charcoal mb-3">4. Data Security</h2>
              <p className="leading-relaxed">
                We implement appropriate technical and organisational measures to protect your personal information.
                Payment processing is handled by Stripe, which is PCI-DSS compliant. We do not store your card
                details on our servers.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-charcoal mb-3">5. Your Rights</h2>
              <p className="leading-relaxed">
                You have the right to access, correct, or delete your personal information. To make a request,
                contact us at{" "}
                <a href="mailto:privacy@exhale.health" className="text-primary hover:underline">
                  privacy@exhale.health
                </a>.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-charcoal mb-3">6. Contact</h2>
              <p className="leading-relaxed">
                For privacy-related enquiries, contact our Privacy Officer at{" "}
                <a href="mailto:privacy@exhale.health" className="text-primary hover:underline">
                  privacy@exhale.health
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
