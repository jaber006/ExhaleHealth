import type { Metadata } from 'next'
import Link from 'next/link'
import { UserPlus, ClipboardList, ShieldCheck, ShoppingBag, Truck, ChevronRight, Phone } from 'lucide-react'

export const metadata: Metadata = {
  title: 'How It Works',
  description: 'Learn how Exhale works — register, complete your assessment, get approved by our pharmacist, and access cessation products.',
}

const steps = [
  {
    icon: UserPlus,
    title: 'Create Your Free Account',
    description: 'Register with your email and verify your identity. We need your date of birth (must be 18+) and a photo of your driver\'s licence for age verification — this is required by law for nicotine product supply.',
    time: '2 minutes',
  },
  {
    icon: ClipboardList,
    title: 'Complete Your Health Assessment',
    description: 'Answer a short questionnaire about your smoking history, health conditions, medications, and quit goals. This helps our pharmacist create a personalised plan and ensure the products we recommend are safe for you.',
    time: '5 minutes',
  },
  {
    icon: ShieldCheck,
    title: 'Pharmacist Review & Approval',
    description: 'Our AHPRA-registered pharmacist (PHA0002147134) reviews your assessment within 24 hours. If approved, you\'ll receive an email confirming access to our product range. If we need more information, we\'ll reach out.',
    time: 'Within 24 hours',
  },
  {
    icon: ShoppingBag,
    title: 'Browse & Order Products',
    description: 'Access our curated range of pharmacist-recommended cessation products including NRT (patches, gum, lozenges) and therapeutic vaping products. Add to cart and checkout securely via Stripe.',
    time: 'Anytime',
  },
  {
    icon: Truck,
    title: 'Pharmacist Dispense & Delivery',
    description: 'Your pharmacist reviews each order for clinical appropriateness before dispatch. Products are shipped discreetly via Australia Post. Orders over $100 ship free.',
    time: '1-4 business days',
  },
]

export default function HowItWorksPage() {
  return (
    <main>
      {/* Hero */}
      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-[#0D6B5E] text-sm font-medium mb-3">HOW IT WORKS</p>
          <h1 className="text-4xl font-light text-gray-900">
            Five steps to a smoke-free life
          </h1>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto">
            Getting started is free. You only pay when you purchase products.
            The entire process can be done from the comfort of your home.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="space-y-0">
            {steps.map((step, i) => (
              <div key={i} className="relative flex gap-6">
                {/* Timeline */}
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-2xl bg-[#0D6B5E]/10 flex items-center justify-center shrink-0">
                    <step.icon className="w-7 h-7 text-[#0D6B5E]" />
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-px flex-1 bg-gradient-to-b from-[#0D6B5E]/20 to-transparent min-h-[60px]" />
                  )}
                </div>

                {/* Content */}
                <div className="pb-12">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-medium text-gray-900">{step.title}</h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-500 text-xs font-medium">
                      {step.time}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quitline */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-[#f0f9f7] to-[#e8f5f1] border border-[#0D6B5E]/10 text-center">
            <Phone className="w-8 h-8 text-[#0D6B5E] mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Need to talk to someone now?</h3>
            <p className="text-gray-500 text-sm mb-4">
              Quitline provides free, confidential support for quitting smoking.
            </p>
            <a href="tel:137848" className="text-[#0D6B5E] font-semibold text-lg hover:underline">
              📞 Call Quitline: 13 78 48
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="p-12 rounded-3xl bg-gradient-to-br from-[#0D6B5E] to-[#095C50] text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <h2 className="text-3xl font-light mb-4">Ready to get started?</h2>
              <p className="text-white/70 mb-8">
                Registration and your health assessment are completely free.
              </p>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-[#0D6B5E] font-medium hover:bg-gray-100 transition-colors no-underline"
              >
                Create Free Account <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
