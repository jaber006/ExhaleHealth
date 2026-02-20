"use client";

import { useState } from "react";

type Step = "details" | "history" | "review" | "confirmed";

export function BookingForm() {
  const [step, setStep] = useState<Step>("details");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    preferredCallTime: "",
    smokingStatus: "",
    yearsUsing: "",
    dailyUsage: "",
    previousQuitAttempts: "",
    currentNRT: "",
    medicalConditions: "",
  });

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // In production, this would create a Stripe checkout session
    setStep("confirmed");
  };

  if (step === "confirmed") {
    return (
      <div className="bg-white rounded-2xl border border-sage/10 p-8 sm:p-12 text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#0D6B5E"
            strokeWidth="2"
          >
            <path d="M9 12l2 2 4-4" />
            <circle cx="12" cy="12" r="10" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-charcoal mb-3">
          Booking Confirmed!
        </h2>
        <p className="text-charcoal/60 mb-6 max-w-md mx-auto">
          Thank you, {formData.firstName}. We&apos;ve received your consultation
          request. Our pharmacist will call you at your preferred time.
        </p>

        <div className="bg-warm-white rounded-xl p-6 text-left max-w-sm mx-auto mb-8">
          <h3 className="font-semibold text-charcoal mb-3">Booking Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-charcoal/60">Name</span>
              <span className="font-medium">
                {formData.firstName} {formData.lastName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-charcoal/60">Email</span>
              <span className="font-medium">{formData.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-charcoal/60">Phone</span>
              <span className="font-medium">{formData.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-charcoal/60">Preferred Time</span>
              <span className="font-medium">
                {formData.preferredCallTime
                  ? new Date(formData.preferredCallTime).toLocaleString("en-AU", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })
                  : "—"}
              </span>
            </div>
            <div className="border-t border-sage/10 pt-2 mt-2 flex justify-between font-semibold">
              <span>Consultation Fee</span>
              <span className="text-primary">$29.95</span>
            </div>
          </div>
        </div>

        <p className="text-charcoal/50 text-sm">
          A confirmation email has been sent to {formData.email}. If you need to
          reschedule, please contact us at{" "}
          <a
            href="mailto:hello@exhale.health"
            className="text-primary hover:underline"
          >
            hello@exhale.health
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-sage/10 overflow-hidden">
      {/* Progress */}
      <div className="px-6 sm:px-8 pt-6 sm:pt-8">
        <div className="flex items-center gap-2 mb-8">
          {(["details", "history", "review"] as Step[]).map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                  step === s
                    ? "bg-primary text-white"
                    : (["details", "history", "review"] as Step[]).indexOf(step) > i
                    ? "bg-primary/20 text-primary"
                    : "bg-sage/10 text-charcoal/40"
                }`}
              >
                {(["details", "history", "review"] as Step[]).indexOf(step) > i ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              {i < 2 && (
                <div
                  className={`flex-1 h-0.5 rounded ${
                    (["details", "history", "review"] as Step[]).indexOf(step) > i
                      ? "bg-primary/30"
                      : "bg-sage/10"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 sm:px-8 pb-6 sm:pb-8">
        {/* Step 1: Personal Details */}
        {step === "details" && (
          <div className="space-y-5">
            <h2 className="text-xl font-bold text-charcoal mb-1">
              Your Details
            </h2>
            <p className="text-charcoal/60 text-sm mb-6">
              We need some basic information to set up your consultation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1.5">
                  First Name *
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => updateField("firstName", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-sage/20 bg-warm-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  placeholder="First name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1.5">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => updateField("lastName", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-sage/20 bg-warm-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  placeholder="Last name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-sage/20 bg-warm-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">
                Phone Number *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-sage/20 bg-warm-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                placeholder="04XX XXX XXX"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1.5">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => updateField("dateOfBirth", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-sage/20 bg-warm-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1.5">
                  Preferred Call Time *
                </label>
                <input
                  type="datetime-local"
                  value={formData.preferredCallTime}
                  onChange={(e) =>
                    updateField("preferredCallTime", e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-xl border border-sage/20 bg-warm-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => setStep("history")}
                disabled={
                  !formData.firstName ||
                  !formData.lastName ||
                  !formData.email ||
                  !formData.phone
                }
                className="w-full bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3.5 rounded-full transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Smoking/Vaping History */}
        {step === "history" && (
          <div className="space-y-5">
            <h2 className="text-xl font-bold text-charcoal mb-1">
              Smoking & Vaping History
            </h2>
            <p className="text-charcoal/60 text-sm mb-6">
              This helps our pharmacist prepare a personalised quit plan for you.
            </p>

            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Do you currently smoke, vape, or both? *
              </label>
              <div className="grid grid-cols-3 gap-3">
                {["Smoke", "Vape", "Both"].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() =>
                      updateField("smokingStatus", opt.toLowerCase())
                    }
                    className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                      formData.smokingStatus === opt.toLowerCase()
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-sage/20 bg-warm-white text-charcoal/70 hover:border-sage/40"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">
                How long have you been smoking/vaping? *
              </label>
              <select
                value={formData.yearsUsing}
                onChange={(e) => updateField("yearsUsing", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-sage/20 bg-warm-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              >
                <option value="">Select duration</option>
                <option value="less-than-1">Less than 1 year</option>
                <option value="1-5">1–5 years</option>
                <option value="5-10">5–10 years</option>
                <option value="10-20">10–20 years</option>
                <option value="20+">20+ years</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">
                How many cigarettes/vape sessions per day? *
              </label>
              <select
                value={formData.dailyUsage}
                onChange={(e) => updateField("dailyUsage", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-sage/20 bg-warm-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              >
                <option value="">Select usage</option>
                <option value="1-5">1–5 per day</option>
                <option value="5-10">5–10 per day</option>
                <option value="10-20">10–20 per day</option>
                <option value="20-30">20–30 per day</option>
                <option value="30+">30+ per day</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">
                Have you tried quitting before? What methods?
              </label>
              <textarea
                value={formData.previousQuitAttempts}
                onChange={(e) =>
                  updateField("previousQuitAttempts", e.target.value)
                }
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-sage/20 bg-warm-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                placeholder="e.g., Tried patches 2 years ago, cold turkey once..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">
                Are you currently using any NRT products?
              </label>
              <input
                type="text"
                value={formData.currentNRT}
                onChange={(e) => updateField("currentNRT", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-sage/20 bg-warm-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                placeholder="e.g., Nicorette patches 21mg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">
                Any medical conditions or medications?
              </label>
              <textarea
                value={formData.medicalConditions}
                onChange={(e) =>
                  updateField("medicalConditions", e.target.value)
                }
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-sage/20 bg-warm-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                placeholder="e.g., Asthma, blood pressure medication..."
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setStep("details")}
                className="px-6 py-3.5 rounded-full border border-sage/20 text-charcoal/70 font-medium hover:bg-sage/10 transition-all"
              >
                Back
              </button>
              <button
                onClick={() => setStep("review")}
                disabled={
                  !formData.smokingStatus ||
                  !formData.yearsUsing ||
                  !formData.dailyUsage
                }
                className="flex-1 bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3.5 rounded-full transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Review & Pay */}
        {step === "review" && (
          <div className="space-y-5">
            <h2 className="text-xl font-bold text-charcoal mb-1">
              Review & Pay
            </h2>
            <p className="text-charcoal/60 text-sm mb-6">
              Please review your information before proceeding to payment.
            </p>

            <div className="bg-warm-white rounded-xl p-5 space-y-3">
              <h3 className="font-semibold text-charcoal text-sm uppercase tracking-wide">
                Personal Details
              </h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-charcoal/60">Name</span>
                <span className="font-medium">
                  {formData.firstName} {formData.lastName}
                </span>
                <span className="text-charcoal/60">Email</span>
                <span className="font-medium">{formData.email}</span>
                <span className="text-charcoal/60">Phone</span>
                <span className="font-medium">{formData.phone}</span>
                <span className="text-charcoal/60">Date of Birth</span>
                <span className="font-medium">
                  {formData.dateOfBirth
                    ? new Date(formData.dateOfBirth).toLocaleDateString("en-AU")
                    : "—"}
                </span>
                <span className="text-charcoal/60">Preferred Time</span>
                <span className="font-medium">
                  {formData.preferredCallTime
                    ? new Date(formData.preferredCallTime).toLocaleString(
                        "en-AU",
                        { dateStyle: "medium", timeStyle: "short" }
                      )
                    : "—"}
                </span>
              </div>
            </div>

            <div className="bg-warm-white rounded-xl p-5 space-y-3">
              <h3 className="font-semibold text-charcoal text-sm uppercase tracking-wide">
                Smoking & Vaping History
              </h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-charcoal/60">Status</span>
                <span className="font-medium capitalize">
                  {formData.smokingStatus}
                </span>
                <span className="text-charcoal/60">Duration</span>
                <span className="font-medium">
                  {formData.yearsUsing} years
                </span>
                <span className="text-charcoal/60">Daily Usage</span>
                <span className="font-medium">
                  {formData.dailyUsage} per day
                </span>
                {formData.previousQuitAttempts && (
                  <>
                    <span className="text-charcoal/60">
                      Previous Attempts
                    </span>
                    <span className="font-medium">
                      {formData.previousQuitAttempts}
                    </span>
                  </>
                )}
                {formData.currentNRT && (
                  <>
                    <span className="text-charcoal/60">Current NRT</span>
                    <span className="font-medium">{formData.currentNRT}</span>
                  </>
                )}
                {formData.medicalConditions && (
                  <>
                    <span className="text-charcoal/60">
                      Medical Conditions
                    </span>
                    <span className="font-medium">
                      {formData.medicalConditions}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Payment Summary */}
            <div className="bg-primary/5 rounded-xl p-5 border border-primary/10">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-charcoal">
                  Pharmacist Consultation
                </span>
                <span className="text-2xl font-bold text-primary">$29.95</span>
              </div>
              <p className="text-charcoal/60 text-sm">
                Includes personalised quit plan and follow-up support calls.
              </p>
            </div>

            {/* Payment Notice */}
            <div className="flex items-start gap-3 text-sm text-charcoal/60">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="shrink-0 mt-0.5"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
              <p>
                Secure payment processed by Stripe. Your card details are never
                stored on our servers.
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setStep("history")}
                className="px-6 py-3.5 rounded-full border border-sage/20 text-charcoal/70 font-medium hover:bg-sage/10 transition-all"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3.5 rounded-full transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98]"
              >
                Pay $29.95 & Book
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
