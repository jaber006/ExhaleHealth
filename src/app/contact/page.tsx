import type { Metadata } from 'next'
import { Mail, Phone, Clock, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Contact Exhale — get in touch with our AHPRA-registered pharmacist for support with your quit journey.',
}

export default function ContactPage() {
  return (
    <main>
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-light text-gray-900">Get in Touch</h1>
            <p className="mt-4 text-gray-500">
              Have a question about our service? Our pharmacist is here to help.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact info */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#0D6B5E]/10 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-[#0D6B5E]" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Email</h3>
                  <a href="mailto:mohammad@exhale.health" className="text-[#0D6B5E] hover:underline">
                    mohammad@exhale.health
                  </a>
                  <p className="text-gray-400 text-sm mt-1">We aim to respond within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#0D6B5E]/10 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-[#0D6B5E]" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Phone</h3>
                  <a href="tel:+61429664266" className="text-[#0D6B5E] hover:underline">0429 664 266</a>
                  <p className="text-gray-400 text-sm mt-1">Mon-Fri, 9am-5pm AEST</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#0D6B5E]/10 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-[#0D6B5E]" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Business Hours</h3>
                  <p className="text-gray-600 text-sm">Monday – Friday: 9:00 AM – 5:00 PM AEST</p>
                  <p className="text-gray-400 text-sm mt-1">Closed weekends and public holidays</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#0D6B5E]/10 flex items-center justify-center shrink-0">
                  <Shield className="w-6 h-6 text-[#0D6B5E]" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Pharmacist</h3>
                  <p className="text-gray-600 text-sm">Mohammad Jaber</p>
                  <p className="text-gray-400 text-sm">AHPRA: PHA0002147134</p>
                </div>
              </div>

              {/* Quitline */}
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                <p className="text-sm text-amber-700">
                  <strong>Need urgent support?</strong> Call{' '}
                  <a href="tel:137848" className="font-semibold hover:underline">Quitline 13 78 48</a>
                  {' '}— free, confidential support available 24/7.
                </p>
              </div>
            </div>

            {/* Contact form */}
            <div>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
                    <input id="name" type="text" required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0D6B5E]/30 focus:border-[#0D6B5E] transition-all" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                    <input id="email" type="email" required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0D6B5E]/30 focus:border-[#0D6B5E] transition-all" />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
                  <select id="subject"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0D6B5E]/30 focus:border-[#0D6B5E] transition-all">
                    <option>General enquiry</option>
                    <option>Product question</option>
                    <option>Order support</option>
                    <option>Assessment question</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                  <textarea id="message" rows={5} required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0D6B5E]/30 focus:border-[#0D6B5E] transition-all resize-none" />
                </div>
                <button type="submit"
                  className="w-full py-3 rounded-full bg-[#0D6B5E] text-white font-medium hover:bg-[#095C50] transition-all">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
