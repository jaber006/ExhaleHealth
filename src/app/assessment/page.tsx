'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { ChevronRight, ChevronLeft, CheckCircle, Phone, AlertTriangle } from 'lucide-react'

const healthConditionOptions = [
  'Heart disease or cardiovascular conditions',
  'High blood pressure',
  'Diabetes',
  'Asthma or COPD',
  'Pregnancy or breastfeeding',
  'Depression or anxiety',
  'Kidney or liver disease',
  'Recent surgery',
  'None of the above',
]

export default function AssessmentPage() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  // Form data
  const [smokingYears, setSmokingYears] = useState('')
  const [cigarettesPerDay, setCigarettesPerDay] = useState('')
  const [previousAttempts, setPreviousAttempts] = useState('')
  const [currentNRT, setCurrentNRT] = useState('')
  const [healthConditions, setHealthConditions] = useState<string[]>([])
  const [medications, setMedications] = useState('')
  const [motivation, setMotivation] = useState('')
  const [preferredDelivery, setPreferredDelivery] = useState('')

  const totalSteps = 4

  const toggleCondition = (condition: string) => {
    if (condition === 'None of the above') {
      setHealthConditions(['None of the above'])
      return
    }
    setHealthConditions(prev => {
      const filtered = prev.filter(c => c !== 'None of the above')
      return filtered.includes(condition)
        ? filtered.filter(c => c !== condition)
        : [...filtered, condition]
    })
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError('')

    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { error: insertError } = await supabase.from('assessments').insert({
        user_id: user.id,
        smoking_years: parseInt(smokingYears) || null,
        cigarettes_per_day: parseInt(cigarettesPerDay) || null,
        previous_quit_attempts: previousAttempts || null,
        current_nicotine_use: currentNRT || null,
        health_conditions: healthConditions,
        medications: medications || null,
        quit_motivation: motivation || null,
        preferred_nicotine_delivery: preferredDelivery || null,
        pregnancy_status: healthConditions.includes('Pregnancy or breastfeeding'),
        cardiovascular_conditions: healthConditions.includes('Heart disease or cardiovascular conditions'),
        status: 'submitted',
      })

      if (insertError) throw insertError

      // Update profile assessment status
      await supabase
        .from('profiles')
        .update({ assessment_status: 'pending' })
        .eq('id', user.id)

      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit assessment')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-[#0D6B5E]/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-[#0D6B5E]" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-3">Assessment Submitted</h1>
          <p className="text-gray-500 mb-6">
            Your assessment is being reviewed by our pharmacist. We&apos;ll notify you by email when your account is approved and you can start shopping.
          </p>
          <p className="text-gray-500 text-sm mb-8">
            This usually takes less than 24 hours during business days.
          </p>

          <div className="p-4 rounded-xl bg-[#0D6B5E]/5 border border-[#0D6B5E]/10 mb-6">
            <div className="flex items-center gap-3 justify-center">
              <Phone className="w-5 h-5 text-[#0D6B5E]" />
              <div>
                <p className="text-sm text-gray-600">Need support now?</p>
                <a href="tel:137848" className="text-[#0D6B5E] font-semibold hover:underline">
                  Call Quitline: 13 78 48
                </a>
              </div>
            </div>
          </div>

          <button
            onClick={() => router.push('/')}
            className="text-[#0D6B5E] font-medium hover:underline text-sm"
          >
            Return to home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[80vh] py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Health Assessment</h1>
          <p className="text-gray-500 mt-1">
            Help our pharmacist understand your needs and create a personalised quit plan.
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>Step {step} of {totalSteps}</span>
            <span>{Math.round((step / totalSteps) * 100)}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#0D6B5E] rounded-full transition-all duration-500"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Quitline banner */}
        <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 mb-6 flex items-center gap-3">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <p className="text-xs text-amber-700">
            If you need immediate support, call <a href="tel:137848" className="font-semibold hover:underline">Quitline 13 78 48</a> — free, confidential support available 24/7.
          </p>
        </div>

        {/* Step 1: Smoking History */}
        {step === 1 && (
          <div className="space-y-5">
            <h2 className="text-lg font-medium text-gray-900">Smoking History</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">How long have you been smoking?</label>
              <select value={smokingYears} onChange={(e) => setSmokingYears(e.target.value)} required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0D6B5E]/30 focus:border-[#0D6B5E] transition-all">
                <option value="">Select...</option>
                <option value="1">Less than 1 year</option>
                <option value="3">1-5 years</option>
                <option value="8">5-10 years</option>
                <option value="15">10-20 years</option>
                <option value="25">20+ years</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">How many cigarettes do you smoke per day?</label>
              <select value={cigarettesPerDay} onChange={(e) => setCigarettesPerDay(e.target.value)} required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0D6B5E]/30 focus:border-[#0D6B5E] transition-all">
                <option value="">Select...</option>
                <option value="5">1-10</option>
                <option value="15">10-20</option>
                <option value="25">20-30</option>
                <option value="35">30+</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Have you tried quitting before? If so, what did you use?</label>
              <textarea value={previousAttempts} onChange={(e) => setPreviousAttempts(e.target.value)}
                rows={3} placeholder="E.g., patches, gum, cold turkey, Champix..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0D6B5E]/30 focus:border-[#0D6B5E] transition-all resize-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Are you currently using any NRT products?</label>
              <input type="text" value={currentNRT} onChange={(e) => setCurrentNRT(e.target.value)}
                placeholder="E.g., Nicotinell patches 21mg, or None"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0D6B5E]/30 focus:border-[#0D6B5E] transition-all" />
            </div>
            <button onClick={() => setStep(2)}
              disabled={!smokingYears || !cigarettesPerDay}
              className="w-full py-3 rounded-full bg-[#0D6B5E] text-white font-medium hover:bg-[#095C50] transition-all disabled:opacity-50 flex items-center justify-center gap-2">
              Continue <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: Health Conditions */}
        {step === 2 && (
          <div className="space-y-5">
            <h2 className="text-lg font-medium text-gray-900">Health Information</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Do you have any of the following health conditions?</label>
              <div className="space-y-2">
                {healthConditionOptions.map((condition) => (
                  <label key={condition} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    healthConditions.includes(condition)
                      ? 'border-[#0D6B5E] bg-[#0D6B5E]/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <input type="checkbox" checked={healthConditions.includes(condition)}
                      onChange={() => toggleCondition(condition)}
                      className="w-4 h-4 rounded border-gray-300 text-[#0D6B5E] focus:ring-[#0D6B5E]" />
                    <span className="text-sm text-gray-700">{condition}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Current medications (if any)</label>
              <textarea value={medications} onChange={(e) => setMedications(e.target.value)}
                rows={2} placeholder="List any medications you're currently taking..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0D6B5E]/30 focus:border-[#0D6B5E] transition-all resize-none" />
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(1)}
                className="px-6 py-3 rounded-full border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-all flex items-center gap-2">
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <button onClick={() => setStep(3)}
                disabled={healthConditions.length === 0}
                className="flex-1 py-3 rounded-full bg-[#0D6B5E] text-white font-medium hover:bg-[#095C50] transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Motivation + Preferences */}
        {step === 3 && (
          <div className="space-y-5">
            <h2 className="text-lg font-medium text-gray-900">Your Quit Goals</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">What motivates you to quit?</label>
              <textarea value={motivation} onChange={(e) => setMotivation(e.target.value)}
                rows={3} placeholder="E.g., health concerns, family, cost savings..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0D6B5E]/30 focus:border-[#0D6B5E] transition-all resize-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Preferred nicotine delivery method</label>
              <div className="grid grid-cols-2 gap-3">
                {['Therapeutic vape', 'Gum', 'Patches', 'Lozenges', 'Combination', 'Not sure — need advice'].map((method) => (
                  <label key={method} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    preferredDelivery === method
                      ? 'border-[#0D6B5E] bg-[#0D6B5E]/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <input type="radio" name="delivery" value={method}
                      checked={preferredDelivery === method}
                      onChange={(e) => setPreferredDelivery(e.target.value)}
                      className="w-4 h-4 border-gray-300 text-[#0D6B5E] focus:ring-[#0D6B5E]" />
                    <span className="text-sm text-gray-700">{method}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(2)}
                className="px-6 py-3 rounded-full border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-all flex items-center gap-2">
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <button onClick={() => setStep(4)}
                className="flex-1 py-3 rounded-full bg-[#0D6B5E] text-white font-medium hover:bg-[#095C50] transition-all flex items-center justify-center gap-2">
                Review <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Review + Submit */}
        {step === 4 && (
          <div className="space-y-5">
            <h2 className="text-lg font-medium text-gray-900">Review Your Assessment</h2>
            <div className="space-y-3">
              {[
                { label: 'Years smoking', value: `${smokingYears} years` },
                { label: 'Cigarettes/day', value: cigarettesPerDay },
                { label: 'Previous attempts', value: previousAttempts || 'None' },
                { label: 'Current NRT', value: currentNRT || 'None' },
                { label: 'Health conditions', value: healthConditions.join(', ') },
                { label: 'Medications', value: medications || 'None' },
                { label: 'Motivation', value: motivation || '—' },
                { label: 'Preferred method', value: preferredDelivery || '—' },
              ].map((item) => (
                <div key={item.label} className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-sm text-gray-500">{item.label}</span>
                  <span className="text-sm text-gray-900 font-medium text-right max-w-[60%]">{item.value}</span>
                </div>
              ))}
            </div>
            {error && <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>}
            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(3)}
                className="px-6 py-3 rounded-full border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-all flex items-center gap-2">
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <button onClick={handleSubmit} disabled={loading}
                className="flex-1 py-3 rounded-full bg-[#0D6B5E] text-white font-medium hover:bg-[#095C50] transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                {loading ? 'Submitting...' : 'Submit Assessment'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
