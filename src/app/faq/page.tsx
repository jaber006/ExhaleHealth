import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about Exhale — quit smoking products, assessments, shipping, and more.',
}

const faqs = [
  {
    category: 'Getting Started',
    questions: [
      {
        q: 'How does Exhale work?',
        a: 'It\'s simple: create a free account, complete a short health assessment, and our AHPRA-registered pharmacist will review it. Once approved, you\'ll have access to our curated range of cessation products delivered to your door. The assessment is not a phone call — it\'s an online questionnaire you complete at your own pace.',
      },
      {
        q: 'How much does it cost to get started?',
        a: 'Getting started is completely free. Registration and your health assessment cost nothing. You only pay when you\'re ready to purchase products.',
      },
      {
        q: 'Do I need to be 18+ to use Exhale?',
        a: 'Yes. Under Australian law (SUSMP S3 conditions), nicotine products can only be supplied to persons aged 18 years and over. We verify your age during registration via date of birth and driver\'s licence.',
      },
    ],
  },
  {
    category: 'Products & Vapes',
    questions: [
      {
        q: 'Are therapeutic vapes legal in Australia?',
        a: 'Yes. Since 1 October 2024, pharmacists can supply therapeutic vapes with nicotine concentrations of 20mg/mL or less to adults 18+ without a prescription, for smoking cessation purposes. All products must be on the TGA notified vape list.',
      },
      {
        q: 'What\'s the difference between NRT and therapeutic vapes?',
        a: 'NRT (Nicotine Replacement Therapy) includes patches, gum, lozenges, and sprays — these are TGA-approved first-line treatments registered in the ARTG. Therapeutic vapes are unapproved goods on the TGA notified list, available through pharmacies as an alternative for people who haven\'t succeeded with NRT alone.',
      },
      {
        q: 'Why can\'t I see the vape products on the public website?',
        a: 'Under TGA advertising rules, therapeutic vaping product details (names, images, prices) cannot be displayed publicly. You\'ll see our full product range after registering, completing your assessment, and being approved by our pharmacist.',
      },
      {
        q: 'Do you sell refillable vapes or e-liquids?',
        a: 'No. We only supply closed pod systems. This ensures consistent dosing, quality control, and compliance with TGA requirements.',
      },
    ],
  },
  {
    category: 'Assessment & Approval',
    questions: [
      {
        q: 'What does the health assessment involve?',
        a: 'It\'s an online questionnaire covering your smoking history, current cigarette consumption, previous quit attempts, health conditions, medications, and quit goals. It takes about 5 minutes to complete. This is not a phone call or video consultation.',
      },
      {
        q: 'How long does approval take?',
        a: 'Our pharmacist typically reviews assessments within 24 hours during business days (Mon-Fri). You\'ll receive an email notification when your account is approved.',
      },
      {
        q: 'What if my assessment isn\'t approved?',
        a: 'If our pharmacist needs more information, we\'ll email you with specific questions. If we determine our products aren\'t suitable for you (e.g., due to a health condition), we\'ll explain why and suggest alternatives like speaking with your GP.',
      },
    ],
  },
  {
    category: 'Orders & Shipping',
    questions: [
      {
        q: 'Do you ship Australia-wide?',
        a: 'Yes! We ship to all Australian addresses via Australia Post. Orders over $100 qualify for free shipping. Standard shipping is $12.90.',
      },
      {
        q: 'How fast is delivery?',
        a: 'Orders are dispatched within 1-2 business days after pharmacist review. Standard delivery is typically 2-5 business days depending on your location.',
      },
      {
        q: 'Can I return products?',
        a: 'Due to the nature of pharmaceutical products, we cannot accept returns of opened products. Unopened products may be returned within 14 days for a full refund. Contact mohammad@exhale.health to arrange a return.',
      },
    ],
  },
  {
    category: 'Safety & Compliance',
    questions: [
      {
        q: 'Is Exhale a real pharmacy?',
        a: 'Exhale is an online pharmacy service operated by Mohammad Jaber, an AHPRA-registered pharmacist (registration number PHA0002147134). All products are supplied under pharmacist supervision in compliance with TGA regulations.',
      },
      {
        q: 'Is my health information secure?',
        a: 'Yes. All health information is encrypted and handled in accordance with the Privacy Act 1988 and Australian Privacy Principles. We use Supabase (enterprise-grade) for secure data storage and never share your information without consent.',
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <main>
      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#0D6B5E] text-sm font-medium mb-2">FAQ</p>
            <h1 className="text-4xl font-light text-gray-900">Frequently Asked Questions</h1>
          </div>

          <div className="space-y-10">
            {faqs.map((section) => (
              <div key={section.category}>
                <h2 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-100">
                  {section.category}
                </h2>
                <div className="space-y-3">
                  {section.questions.map((faq, i) => (
                    <details key={i} className="group bg-white rounded-xl border border-gray-100 overflow-hidden">
                      <summary className="px-6 py-4 cursor-pointer text-sm font-medium flex items-center justify-between list-none hover:bg-gray-50 transition-colors">
                        {faq.q}
                        <ChevronRight className="w-4 h-4 text-gray-400 transition-transform group-open:rotate-90 shrink-0 ml-4" />
                      </summary>
                      <div className="px-6 pb-4 text-sm text-gray-500 leading-relaxed">
                        {faq.a}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center p-8 rounded-2xl bg-[#0D6B5E]/5 border border-[#0D6B5E]/10">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Still have questions?</h3>
            <p className="text-gray-500 text-sm mb-4">
              Our pharmacist is happy to help with any questions about our service.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="mailto:mohammad@exhale.health"
                className="px-6 py-3 rounded-full bg-[#0D6B5E] text-white font-medium hover:bg-[#095C50] transition-all no-underline">
                Email Us
              </a>
              <Link href="/register"
                className="px-6 py-3 rounded-full border border-gray-200 text-gray-700 font-medium hover:border-[#0D6B5E] hover:text-[#0D6B5E] transition-colors no-underline">
                Get Started — Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.flatMap(section =>
              section.questions.map(faq => ({
                '@type': 'Question',
                name: faq.q,
                acceptedAnswer: { '@type': 'Answer', text: faq.a },
              }))
            ),
          }),
        }}
      />
    </main>
  )
}
