import type { Metadata } from "next";
import { BookingForm } from "@/components/BookingForm";

export const metadata: Metadata = {
  title: "Book a Pharmacist Consultation",
  description:
    "Book a phone consultation with our AHPRA-registered pharmacist. Receive a personalised quit plan for smoking or vaping cessation. Only $29.95.",
  openGraph: {
    title: "Book a Pharmacist Consultation | Exhale",
    description:
      "Speak to an AHPRA-registered pharmacist about quitting smoking or vaping. Personalised quit plan included.",
  },
};

export default function BookPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/5 to-sage/10 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal">
              Book Your Consultation
            </h1>
            <p className="mt-4 text-charcoal/60 text-lg">
              Speak with our AHPRA-registered pharmacist for a personalised quit
              plan. 15–20 minute phone consultation for just{" "}
              <span className="font-semibold text-primary">$29.95</span>.
            </p>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-10 bg-white border-b border-sage/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0D6B5E"
                  strokeWidth="2"
                >
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-charcoal">Phone Consultation</p>
                <p className="text-charcoal/60 text-sm">
                  15–20 min private call with our pharmacist
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0D6B5E"
                  strokeWidth="2"
                >
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-charcoal">
                  Personalised Quit Plan
                </p>
                <p className="text-charcoal/60 text-sm">
                  Tailored to your smoking/vaping history
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0D6B5E"
                  strokeWidth="2"
                >
                  <path d="M9 12l2 2 4-4" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-charcoal">
                  Free Follow-Up Calls
                </p>
                <p className="text-charcoal/60 text-sm">
                  Ongoing support throughout your quit journey
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-12 sm:py-16 bg-warm-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <BookingForm />
        </div>
      </section>
    </>
  );
}
