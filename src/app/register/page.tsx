'use client'

import Link from 'next/link'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Shield, ChevronRight, ChevronLeft, Upload, CheckCircle } from 'lucide-react'

type Step = 1 | 2 | 3

export default function RegisterPage() {
  const [step, setStep] = useState<Step>(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  // Step 1
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // Step 2
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [dob, setDob] = useState('')
  const [phone, setPhone] = useState('')
  const [street, setStreet] = useState('')
  const [suburb, setSuburb] = useState('')
  const [state, setState] = useState('')
  const [postcode, setPostcode] = useState('')

  // Step 3
  const [idFile, setIdFile] = useState<File | null>(null)
  const [termsAccepted, setTermsAccepted] = useState(false)

  const validateAge = (dateStr: string): boolean => {
    const birthDate = new Date(dateStr)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age >= 18
  }

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    setStep(2)
  }

  const handleStep2 = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!validateAge(dob)) {
      setError('You must be 18 or older to register. This is a legal requirement for nicotine product supply.')
      return
    }
    if (!postcode.match(/^\d{4}$/)) {
      setError('Please enter a valid 4-digit Australian postcode')
      return
    }
    setStep(3)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!termsAccepted) {
      setError('You must accept the terms and conditions')
      return
    }

    setLoading(true)

    try {
      const supabase = createClient()

      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            date_of_birth: dob,
          },
        },
      })

      if (authError) throw authError
      if (!authData.user) throw new Error('Registration failed')

      // Update profile
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: authData.user.id,
          first_name: firstName,
          last_name: lastName,
          date_of_birth: dob,
          phone,
          email,
          shipping_street: street,
          shipping_suburb: suburb,
          shipping_state: state,
          shipping_postcode: postcode,
        })

      if (profileError) throw profileError

      // Upload ID document if provided
      if (idFile) {
        const ext = idFile.name.split('.').pop()
        const path = `id-documents/${authData.user.id}/licence.${ext}`
        const { error: uploadError } = await supabase.storage
          .from('documents')
          .upload(path, idFile)

        if (uploadError) {
          console.error('ID upload failed:', uploadError)
          // Non-blocking — they can upload later
        } else {
          await supabase
            .from('profiles')
            .update({ id_document_url: path })
            .eq('id', authData.user.id)
        }
      }

      router.push('/assessment')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <span className="text-3xl font-light tracking-tight text-[#0D6B5E]">exhale</span>
            <svg width="24" height="16" viewBox="0 0 24 16" fill="none" className="text-[#8FBC8F]">
              <path d="M1 8C4 3 8 13 12 8C16 3 20 13 23 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </Link>
          <h1 className="text-2xl font-semibold text-gray-900">Create your account</h1>
          <p className="text-gray-500 mt-1">Free registration — you only pay when you purchase products</p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-3 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                step >= s ? 'bg-[#0D6B5E] text-white' : 'bg-gray-100 text-gray-400'
              }`}>
                {step > s ? <CheckCircle className="w-5 h-5" /> : s}
              </div>
              {s < 3 && <div className={`w-12 h-0.5 ${step > s ? 'bg-[#0D6B5E]' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-16 text-xs text-gray-500 mb-8">
          <span>Account</span>
          <span>Details</span>
          <span>Verify</span>
        </div>

        {/* Step 1: Email + Password */}
        {step === 1 && (
          <form onSubmit={handleStep1} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <input
                id="email" type="email" required value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0D6B5E]/30 focus:border-[#0D6B5E] transition-all"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <input
                id="password" type="password" required value={password} minLength={8}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0D6B5E]/30 focus:border-[#0D6B5E] transition-all"
                placeholder="Minimum 8 characters"
              />
            </div>
            <div>
              <label htmlFor="confirm" className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password</label>
              <input
                id="confirm" type="password" required value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0D6B5E]/30 focus:border-[#0D6B5E] transition-all"
                placeholder="••••••••"
              />
            </div>
            {error && <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>}
            <button type="submit" className="w-full py-3 rounded-full bg-[#0D6B5E] text-white font-medium hover:bg-[#095C50] transition-all flex items-center justify-center gap-2">
              Continue <ChevronRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Step 2: Personal Details */}
        {step === 2 && (
          <form onSubmit={handleStep2} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1.5">First Name</label>
                <input id="firstName" type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0D6B5E]/30 focus:border-[#0D6B5E] transition-all" />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1.5">Last Name</label>
                <input id="lastName" type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0D6B5E]/30 focus:border-[#0D6B5E] transition-all" />
              </div>
            </div>
            <div>
              <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1.5">
                Date of Birth <span className="text-gray-400 font-normal">(must be 18+)</span>
              </label>
              <input id="dob" type="date" required value={dob} onChange={(e) => setDob(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0D6B5E]/30 focus:border-[#0D6B5E] transition-all" />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
              <input id="phone" type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0D6B5E]/30 focus:border-[#0D6B5E] transition-all"
                placeholder="04XX XXX XXX" />
            </div>
            <div>
              <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1.5">Street Address</label>
              <input id="street" type="text" required value={street} onChange={(e) => setStreet(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0D6B5E]/30 focus:border-[#0D6B5E] transition-all" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label htmlFor="suburb" className="block text-sm font-medium text-gray-700 mb-1.5">Suburb</label>
                <input id="suburb" type="text" required value={suburb} onChange={(e) => setSuburb(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0D6B5E]/30 focus:border-[#0D6B5E] transition-all" />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1.5">State</label>
                <select id="state" required value={state} onChange={(e) => setState(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0D6B5E]/30 focus:border-[#0D6B5E] transition-all">
                  <option value="">—</option>
                  <option value="NSW">NSW</option><option value="VIC">VIC</option><option value="QLD">QLD</option>
                  <option value="WA">WA</option><option value="SA">SA</option><option value="TAS">TAS</option>
                  <option value="NT">NT</option><option value="ACT">ACT</option>
                </select>
              </div>
              <div>
                <label htmlFor="postcode" className="block text-sm font-medium text-gray-700 mb-1.5">Postcode</label>
                <input id="postcode" type="text" required value={postcode} onChange={(e) => setPostcode(e.target.value)}
                  maxLength={4} pattern="\d{4}"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0D6B5E]/30 focus:border-[#0D6B5E] transition-all" />
              </div>
            </div>
            {error && <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>}
            <div className="flex gap-3">
              <button type="button" onClick={() => { setStep(1); setError('') }}
                className="px-6 py-3 rounded-full border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-all flex items-center gap-2">
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <button type="submit" className="flex-1 py-3 rounded-full bg-[#0D6B5E] text-white font-medium hover:bg-[#095C50] transition-all flex items-center justify-center gap-2">
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* Step 3: ID Verification */}
        {step === 3 && (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="p-4 rounded-xl bg-[#0D6B5E]/5 border border-[#0D6B5E]/10">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-[#0D6B5E] mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-gray-900 text-sm">ID Verification Required</p>
                  <p className="text-gray-500 text-xs mt-1">
                    Under SUSMP regulations, pharmacists must sight evidence of identity and age before supplying nicotine products.
                    Please upload a photo of your driver&apos;s licence.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Driver&apos;s Licence</label>
              <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-[#0D6B5E]/40 hover:bg-[#0D6B5E]/5 transition-all">
                {idFile ? (
                  <div className="flex items-center gap-2 text-[#0D6B5E]">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">{idFile.name}</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-gray-400">
                    <Upload className="w-8 h-8" />
                    <span className="text-sm">Click to upload or drag and drop</span>
                    <span className="text-xs">PNG, JPG up to 10MB</span>
                  </div>
                )}
                <input type="file" className="hidden" accept="image/*,.pdf"
                  onChange={(e) => setIdFile(e.target.files?.[0] || null)} />
              </label>
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-gray-300 text-[#0D6B5E] focus:ring-[#0D6B5E]"
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I confirm I am 18 years or older and agree to the{' '}
                <Link href="/terms" className="text-[#0D6B5E] hover:underline">Terms of Service</Link>
                {' '}and{' '}
                <Link href="/privacy" className="text-[#0D6B5E] hover:underline">Privacy Policy</Link>.
              </label>
            </div>

            {error && <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>}

            <div className="flex gap-3">
              <button type="button" onClick={() => { setStep(2); setError('') }}
                className="px-6 py-3 rounded-full border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-all flex items-center gap-2">
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <button type="submit" disabled={loading}
                className="flex-1 py-3 rounded-full bg-[#0D6B5E] text-white font-medium hover:bg-[#095C50] transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </div>
          </form>
        )}

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-[#0D6B5E] font-medium hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  )
}
