'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { User, MapPin, Shield, LogOut, Loader2 } from 'lucide-react'

interface Profile {
  first_name: string
  last_name: string
  email: string
  phone: string
  date_of_birth: string
  shipping_street: string
  shipping_suburb: string
  shipping_state: string
  shipping_postcode: string
  assessment_status: string
  id_verified: boolean
}

export default function AccountPage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function loadProfile() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/login?redirect=/account')
        return
      }

      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (data) setProfile(data as Profile)
      setLoading(false)
    }
    loadProfile()
  }, [router])

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#0D6B5E]" />
      </div>
    )
  }

  if (!profile) return null

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-light text-gray-900">My Account</h1>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>

        {/* Assessment Status */}
        <div className={`p-5 rounded-xl mb-6 ${
          profile.assessment_status === 'approved' ? 'bg-green-50 border border-green-200' :
          profile.assessment_status === 'pending' ? 'bg-amber-50 border border-amber-200' :
          profile.assessment_status === 'declined' ? 'bg-red-50 border border-red-200' :
          'bg-blue-50 border border-blue-200'
        }`}>
          <div className="flex items-center gap-3">
            <Shield className={`w-5 h-5 ${
              profile.assessment_status === 'approved' ? 'text-green-600' :
              profile.assessment_status === 'pending' ? 'text-amber-600' :
              profile.assessment_status === 'declined' ? 'text-red-600' :
              'text-blue-600'
            }`} />
            <div>
              <p className="font-medium text-gray-900 text-sm">
                Assessment: {profile.assessment_status === 'approved' ? 'Approved ✓' :
                  profile.assessment_status === 'pending' ? 'Under Review' :
                  profile.assessment_status === 'declined' ? 'Declined' :
                  'Not Started'}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                {profile.assessment_status === 'approved' ? 'You have full access to the shop.' :
                  profile.assessment_status === 'pending' ? 'Our pharmacist is reviewing your assessment. You\'ll be notified by email.' :
                  profile.assessment_status === 'declined' ? 'Please contact support for more information.' :
                  'Complete your assessment to access our products.'}
              </p>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50">
          <div className="p-6">
            <h2 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-[#0D6B5E]" /> Personal Details
            </h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400 block text-xs mb-0.5">Name</span>
                {profile.first_name} {profile.last_name}
              </div>
              <div>
                <span className="text-gray-400 block text-xs mb-0.5">Email</span>
                {profile.email}
              </div>
              <div>
                <span className="text-gray-400 block text-xs mb-0.5">Phone</span>
                {profile.phone || '—'}
              </div>
              <div>
                <span className="text-gray-400 block text-xs mb-0.5">Date of Birth</span>
                {profile.date_of_birth ? new Date(profile.date_of_birth).toLocaleDateString('en-AU') : '—'}
              </div>
            </div>
          </div>

          <div className="p-6">
            <h2 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#0D6B5E]" /> Shipping Address
            </h2>
            <div className="text-sm">
              {profile.shipping_street ? (
                <>
                  <p>{profile.shipping_street}</p>
                  <p>{profile.shipping_suburb} {profile.shipping_state} {profile.shipping_postcode}</p>
                </>
              ) : (
                <p className="text-gray-400">No address on file</p>
              )}
            </div>
          </div>

          <div className="p-6">
            <h2 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#0D6B5E]" /> Verification
            </h2>
            <div className="text-sm">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                profile.id_verified ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
              }`}>
                {profile.id_verified ? '✓ ID Verified' : 'Pending Verification'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
