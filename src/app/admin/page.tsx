'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { formatPrice } from '@/lib/products'
import {
  ClipboardList,
  ShoppingBag,
  Users,
  PackageCheck,
  ChevronRight,
  Check,
  X,
  AlertTriangle,
  LogOut,
  Loader2,
  MessageSquare,
} from 'lucide-react'

type Tab = 'dashboard' | 'assessments' | 'orders' | 'products' | 'customers'

interface Assessment {
  id: string
  user_id: string
  smoking_years: string
  cigarettes_per_day: string
  previous_quit_attempts: string
  current_nicotine_use: string
  health_conditions: string[]
  medications: string
  pregnancy_status: string
  cardiovascular_conditions: boolean
  quit_motivation: string
  flavour_preference: string
  pharmacist_notes: string | null
  status: string
  decline_reason: string | null
  created_at: string
  profiles?: {
    first_name: string
    last_name: string
    date_of_birth: string
    phone: string
    email?: string
  }
}

interface Order {
  id: string
  user_id: string
  status: string
  subtotal: number
  shipping_cost: number
  total: number
  tracking_number: string | null
  pharmacist_notes: string | null
  created_at: string
  shipping_address: {
    street: string
    suburb: string
    state: string
    postcode: string
  }
  profiles?: {
    first_name: string
    last_name: string
    phone: string
  }
  order_items?: {
    id: string
    quantity: number
    unit_price: number
    products?: {
      name: string
      brand: string
    }
  }[]
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<Tab>('dashboard')
  const [assessments, setAssessments] = useState<Assessment[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [pharmacistNotes, setPharmacistNotes] = useState('')
  const [declineReason, setDeclineReason] = useState('')
  const [stats, setStats] = useState({ assessments: 0, pendingAssessments: 0, orders: 0, pendingOrders: 0 })

  useEffect(() => {
    checkAuth()
  }, [])

  async function checkAuth() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      setLoading(false)
      return
    }

    setIsAuthenticated(true)

    const { data: profile } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', user.id)
      .single()

    if (profile?.is_admin) {
      setIsAdmin(true)
      await loadData()
    }
    setLoading(false)
  }

  async function loadData() {
    const supabase = createClient()

    // Load assessments
    const { data: assessmentData } = await supabase
      .from('assessments')
      .select('*, profiles(first_name, last_name, date_of_birth, phone)')
      .order('created_at', { ascending: false })

    if (assessmentData) setAssessments(assessmentData as Assessment[])

    // Load orders
    const { data: orderData } = await supabase
      .from('orders')
      .select('*, profiles(first_name, last_name, phone), order_items(id, quantity, unit_price, products(name, brand))')
      .order('created_at', { ascending: false })

    if (orderData) setOrders(orderData as Order[])

    // Stats
    const pendingAssessments = assessmentData?.filter(a => a.status === 'submitted').length || 0
    const pendingOrders = orderData?.filter(o => o.status === 'pending' || o.status === 'pharmacist_review').length || 0

    setStats({
      assessments: assessmentData?.length || 0,
      pendingAssessments,
      orders: orderData?.length || 0,
      pendingOrders,
    })
  }

  async function updateAssessmentStatus(id: string, status: string) {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const updateData: Record<string, unknown> = {
      status,
      reviewed_by: user?.id,
      reviewed_at: new Date().toISOString(),
    }

    if (pharmacistNotes) updateData.pharmacist_notes = pharmacistNotes
    if (status === 'declined' && declineReason) updateData.decline_reason = declineReason

    await supabase.from('assessments').update(updateData).eq('id', id)
    
    setSelectedAssessment(null)
    setPharmacistNotes('')
    setDeclineReason('')
    await loadData()
  }

  async function updateOrderStatus(id: string, status: string, trackingNumber?: string) {
    const supabase = createClient()
    const updateData: Record<string, unknown> = { status }
    if (trackingNumber) updateData.tracking_number = trackingNumber
    if (status === 'shipped') updateData.shipped_at = new Date().toISOString()
    if (pharmacistNotes) updateData.pharmacist_notes = pharmacistNotes

    await supabase.from('orders').update(updateData).eq('id', id)
    
    setSelectedOrder(null)
    setPharmacistNotes('')
    await loadData()
  }

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    setIsAuthenticated(false)
    setIsAdmin(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#0D6B5E]" />
      </div>
    )
  }

  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-light text-gray-900 mb-4">Admin Access Required</h1>
          <p className="text-gray-500 mb-6">
            {!isAuthenticated
              ? 'Please sign in with your admin account to access this page.'
              : 'Your account does not have admin privileges.'}
          </p>
          <a
            href="/login?redirect=/admin"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0D6B5E] text-white font-medium hover:bg-[#095C50] transition-all"
          >
            Sign In <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-light text-[#0D6B5E]">exhale</span>
            <span className="text-gray-300">|</span>
            <span className="text-sm font-medium text-gray-500">Pharmacist Dashboard</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {([
            { id: 'dashboard' as Tab, label: 'Dashboard', icon: PackageCheck },
            { id: 'assessments' as Tab, label: `Assessments${stats.pendingAssessments ? ` (${stats.pendingAssessments})` : ''}`, icon: ClipboardList },
            { id: 'orders' as Tab, label: `Orders${stats.pendingOrders ? ` (${stats.pendingOrders})` : ''}`, icon: ShoppingBag },
            { id: 'customers' as Tab, label: 'Customers', icon: Users },
          ]).map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                tab === t.id
                  ? 'bg-[#0D6B5E] text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-[#0D6B5E]/40'
              }`}
            >
              <t.icon className="w-4 h-4" /> {t.label}
            </button>
          ))}
        </div>

        {/* Dashboard */}
        {tab === 'dashboard' && (
          <div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Pending Assessments', value: stats.pendingAssessments, color: 'bg-amber-50 text-amber-700' },
                { label: 'Total Assessments', value: stats.assessments, color: 'bg-blue-50 text-blue-700' },
                { label: 'Pending Orders', value: stats.pendingOrders, color: 'bg-orange-50 text-orange-700' },
                { label: 'Total Orders', value: stats.orders, color: 'bg-green-50 text-green-700' },
              ].map(s => (
                <div key={s.label} className={`${s.color} rounded-xl p-5`}>
                  <div className="text-3xl font-bold">{s.value}</div>
                  <div className="text-sm mt-1 opacity-80">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Recent activity */}
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <ClipboardList className="w-4 h-4 text-[#0D6B5E]" />
                  Recent Assessments
                </h3>
                {assessments.slice(0, 5).map(a => (
                  <div key={a.id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                    <div>
                      <p className="text-sm font-medium">{a.profiles?.first_name} {a.profiles?.last_name}</p>
                      <p className="text-xs text-gray-400">{new Date(a.created_at).toLocaleDateString('en-AU')}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      a.status === 'submitted' ? 'bg-amber-100 text-amber-700' :
                      a.status === 'approved' ? 'bg-green-100 text-green-700' :
                      a.status === 'declined' ? 'bg-red-100 text-red-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {a.status}
                    </span>
                  </div>
                ))}
                {assessments.length === 0 && <p className="text-gray-400 text-sm">No assessments yet</p>}
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-[#0D6B5E]" />
                  Recent Orders
                </h3>
                {orders.slice(0, 5).map(o => (
                  <div key={o.id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                    <div>
                      <p className="text-sm font-medium">{o.profiles?.first_name} {o.profiles?.last_name}</p>
                      <p className="text-xs text-gray-400">{formatPrice(o.total)}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      o.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                      o.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                      o.status === 'delivered' ? 'bg-green-100 text-green-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {o.status}
                    </span>
                  </div>
                ))}
                {orders.length === 0 && <p className="text-gray-400 text-sm">No orders yet</p>}
              </div>
            </div>
          </div>
        )}

        {/* Assessments Tab */}
        {tab === 'assessments' && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Patient</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Smoking</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Health Flags</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Date</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {assessments.map(a => (
                    <tr key={a.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium">{a.profiles?.first_name} {a.profiles?.last_name}</p>
                        <p className="text-xs text-gray-400">{a.profiles?.phone}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm">{a.cigarettes_per_day} cigs/day</p>
                        <p className="text-xs text-gray-400">{a.smoking_years} years</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1">
                          {a.pregnancy_status && a.pregnancy_status !== 'not_pregnant' && a.pregnancy_status !== 'na' && (
                            <span className="px-2 py-0.5 rounded text-xs bg-red-100 text-red-700">Pregnancy</span>
                          )}
                          {a.cardiovascular_conditions && (
                            <span className="px-2 py-0.5 rounded text-xs bg-orange-100 text-orange-700">CVD</span>
                          )}
                          {!a.pregnancy_status && !a.cardiovascular_conditions && (
                            <span className="text-xs text-gray-400">None flagged</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(a.created_at).toLocaleDateString('en-AU')}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          a.status === 'submitted' ? 'bg-amber-100 text-amber-700' :
                          a.status === 'approved' ? 'bg-green-100 text-green-700' :
                          a.status === 'declined' ? 'bg-red-100 text-red-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {a.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => { setSelectedAssessment(a); setPharmacistNotes(a.pharmacist_notes || '') }}
                          className="text-[#0D6B5E] hover:underline text-sm font-medium"
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {assessments.length === 0 && (
              <div className="text-center py-12 text-gray-400">No assessments found.</div>
            )}
          </div>
        )}

        {/* Orders Tab */}
        {tab === 'orders' && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Order</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Customer</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Total</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Date</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(o => (
                    <tr key={o.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-sm font-mono text-gray-500">{o.id.slice(0, 8)}...</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium">{o.profiles?.first_name} {o.profiles?.last_name}</p>
                        <p className="text-xs text-gray-400">{o.profiles?.phone}</p>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold">{formatPrice(o.total)}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(o.created_at).toLocaleDateString('en-AU')}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          o.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                          o.status === 'pharmacist_review' ? 'bg-blue-100 text-blue-700' :
                          o.status === 'dispensed' ? 'bg-purple-100 text-purple-700' :
                          o.status === 'shipped' ? 'bg-cyan-100 text-cyan-700' :
                          o.status === 'delivered' ? 'bg-green-100 text-green-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {o.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => { setSelectedOrder(o); setPharmacistNotes(o.pharmacist_notes || '') }}
                          className="text-[#0D6B5E] hover:underline text-sm font-medium"
                        >
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {orders.length === 0 && (
              <div className="text-center py-12 text-gray-400">No orders found.</div>
            )}
          </div>
        )}

        {/* Customers Tab */}
        {tab === 'customers' && (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-400">
            <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="font-medium text-gray-500">Customer Management</p>
            <p className="text-sm mt-1">View and manage customer profiles, assessment history, and orders.</p>
            <p className="text-xs mt-4">Coming soon — use Supabase dashboard for now.</p>
          </div>
        )}
      </div>

      {/* Assessment Review Modal */}
      {selectedAssessment && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Assessment Review</h2>
              <button onClick={() => setSelectedAssessment(null)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Patient info */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Patient</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><span className="text-gray-400">Name:</span> {selectedAssessment.profiles?.first_name} {selectedAssessment.profiles?.last_name}</div>
                  <div><span className="text-gray-400">Phone:</span> {selectedAssessment.profiles?.phone}</div>
                  <div><span className="text-gray-400">DOB:</span> {selectedAssessment.profiles?.date_of_birth}</div>
                </div>
              </div>

              {/* Smoking history */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Smoking History</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><span className="text-gray-400">Years smoking:</span> {selectedAssessment.smoking_years}</div>
                  <div><span className="text-gray-400">Cigarettes/day:</span> {selectedAssessment.cigarettes_per_day}</div>
                  <div className="col-span-2"><span className="text-gray-400">Previous attempts:</span> {selectedAssessment.previous_quit_attempts || 'None'}</div>
                  <div className="col-span-2"><span className="text-gray-400">Current NRT:</span> {selectedAssessment.current_nicotine_use || 'None'}</div>
                </div>
              </div>

              {/* Health */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Health</h3>
                <div className="text-sm space-y-2">
                  {selectedAssessment.pregnancy_status && selectedAssessment.pregnancy_status !== 'not_pregnant' && selectedAssessment.pregnancy_status !== 'na' && (
                    <div className="flex items-center gap-2 text-red-600">
                      <AlertTriangle className="w-4 h-4" /> {selectedAssessment.pregnancy_status === 'pregnant' ? 'Pregnant' : selectedAssessment.pregnancy_status === 'breastfeeding' ? 'Breastfeeding' : 'Planning pregnancy'}
                    </div>
                  )}
                  {selectedAssessment.cardiovascular_conditions && (
                    <div className="flex items-center gap-2 text-orange-600">
                      <AlertTriangle className="w-4 h-4" /> Cardiovascular conditions
                    </div>
                  )}
                  <div><span className="text-gray-400">Conditions:</span> {selectedAssessment.health_conditions?.join(', ') || 'None'}</div>
                  <div><span className="text-gray-400">Medications:</span> {selectedAssessment.medications || 'None'}</div>
                </div>
              </div>

              {/* Preferences */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Quit Plan</h3>
                <div className="text-sm space-y-1">
                  <div><span className="text-gray-400">Motivation:</span> {selectedAssessment.quit_motivation}</div>
                  <div><span className="text-gray-400">Flavour preference:</span> {selectedAssessment.flavour_preference}</div>
                </div>
              </div>

              {/* Pharmacist notes */}
              <div>
                <label className="text-sm font-semibold text-gray-500 uppercase block mb-2">
                  <MessageSquare className="w-4 h-4 inline mr-1" />
                  Pharmacist Notes
                </label>
                <textarea
                  value={pharmacistNotes}
                  onChange={e => setPharmacistNotes(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0D6B5E]/30 focus:border-[#0D6B5E] resize-none text-sm"
                  placeholder="Clinical notes, recommendations..."
                />
              </div>

              {selectedAssessment.status === 'submitted' && (
                <>
                  <div>
                    <label className="text-sm text-gray-500 block mb-2">Decline reason (if declining)</label>
                    <input
                      value={declineReason}
                      onChange={e => setDeclineReason(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0D6B5E]/30 focus:border-[#0D6B5E] text-sm"
                      placeholder="Reason for declining..."
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => updateAssessmentStatus(selectedAssessment.id, 'approved')}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition-all"
                    >
                      <Check className="w-4 h-4" /> Approve
                    </button>
                    <button
                      onClick={() => updateAssessmentStatus(selectedAssessment.id, 'needs_info')}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all"
                    >
                      <MessageSquare className="w-4 h-4" /> Request Info
                    </button>
                    <button
                      onClick={() => updateAssessmentStatus(selectedAssessment.id, 'declined')}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition-all"
                    >
                      <X className="w-4 h-4" /> Decline
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Order Management Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Order Details</h2>
              <button onClick={() => setSelectedOrder(null)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Customer</h3>
                <p className="text-sm">{selectedOrder.profiles?.first_name} {selectedOrder.profiles?.last_name}</p>
                <p className="text-sm text-gray-400">{selectedOrder.profiles?.phone}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Shipping Address</h3>
                <p className="text-sm">
                  {selectedOrder.shipping_address?.street}<br />
                  {selectedOrder.shipping_address?.suburb} {selectedOrder.shipping_address?.state} {selectedOrder.shipping_address?.postcode}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Items</h3>
                {selectedOrder.order_items?.map(item => (
                  <div key={item.id} className="flex justify-between py-2 border-b border-gray-50 text-sm">
                    <span>{item.products?.name} × {item.quantity}</span>
                    <span className="font-medium">{formatPrice(item.unit_price * item.quantity)}</span>
                  </div>
                ))}
                <div className="flex justify-between py-2 text-sm">
                  <span className="text-gray-400">Shipping</span>
                  <span>{selectedOrder.shipping_cost === 0 ? 'FREE' : formatPrice(selectedOrder.shipping_cost)}</span>
                </div>
                <div className="flex justify-between py-2 font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(selectedOrder.total)}</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-500 uppercase block mb-2">Pharmacist Notes</label>
                <textarea
                  value={pharmacistNotes}
                  onChange={e => setPharmacistNotes(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0D6B5E]/30 focus:border-[#0D6B5E] resize-none text-sm"
                  placeholder="Clinical check notes, dispensing notes..."
                />
              </div>

              {selectedOrder.tracking_number && (
                <div className="text-sm">
                  <span className="text-gray-400">Tracking:</span>{' '}
                  <span className="font-mono">{selectedOrder.tracking_number}</span>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {selectedOrder.status === 'pending' && (
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.id, 'pharmacist_review')}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
                  >
                    Start Review
                  </button>
                )}
                {(selectedOrder.status === 'pending' || selectedOrder.status === 'pharmacist_review') && (
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.id, 'dispensed')}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 text-white text-sm font-medium hover:bg-purple-700"
                  >
                    <PackageCheck className="w-4 h-4" /> Mark Dispensed
                  </button>
                )}
                {selectedOrder.status === 'dispensed' && (
                  <button
                    onClick={() => {
                      const tracking = prompt('Enter tracking number:')
                      if (tracking) updateOrderStatus(selectedOrder.id, 'shipped', tracking)
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 text-white text-sm font-medium hover:bg-cyan-700"
                  >
                    Mark Shipped
                  </button>
                )}
                {selectedOrder.status === 'shipped' && (
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.id, 'delivered')}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-600 text-white text-sm font-medium hover:bg-green-700"
                  >
                    Mark Delivered
                  </button>
                )}
                <button
                  onClick={() => updateOrderStatus(selectedOrder.id, 'cancelled')}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-100 text-red-700 text-sm font-medium hover:bg-red-200"
                >
                  Cancel Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
