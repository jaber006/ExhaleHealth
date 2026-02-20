"use client";

import { useState } from "react";

interface Consultation {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredCallTime: string;
  smokingStatus: string;
  yearsUsing: string;
  dailyUsage: string;
  previousQuitAttempts: string;
  currentNRT: string;
  medicalConditions: string;
  status: string;
  paymentStatus: string;
  createdAt: string;
}

// Placeholder data
const mockConsultations: Consultation[] = [
  {
    id: "cons_001",
    firstName: "Michael",
    lastName: "Roberts",
    email: "michael.r@example.com",
    phone: "0412 345 678",
    preferredCallTime: "2026-02-22T10:00:00",
    smokingStatus: "smoker",
    yearsUsing: "10-20",
    dailyUsage: "20-30",
    previousQuitAttempts: "Tried patches 3 years ago",
    currentNRT: "None",
    medicalConditions: "None",
    status: "pending",
    paymentStatus: "paid",
    createdAt: "2026-02-21T08:30:00",
  },
  {
    id: "cons_002",
    firstName: "Jessica",
    lastName: "Liu",
    email: "jess.l@example.com",
    phone: "0423 456 789",
    preferredCallTime: "2026-02-22T14:00:00",
    smokingStatus: "vape",
    yearsUsing: "1-5",
    dailyUsage: "10-20",
    previousQuitAttempts: "Cold turkey once, lasted 2 weeks",
    currentNRT: "None",
    medicalConditions: "Mild asthma",
    status: "scheduled",
    paymentStatus: "paid",
    createdAt: "2026-02-20T15:45:00",
  },
  {
    id: "cons_003",
    firstName: "David",
    lastName: "Williams",
    email: "david.w@example.com",
    phone: "0434 567 890",
    preferredCallTime: "2026-02-23T09:00:00",
    smokingStatus: "both",
    yearsUsing: "5-10",
    dailyUsage: "10-20",
    previousQuitAttempts: "Nicorette gum, Champix",
    currentNRT: "Nicorette patches 21mg",
    medicalConditions: "High blood pressure, on amlodipine",
    status: "completed",
    paymentStatus: "paid",
    createdAt: "2026-02-18T11:20:00",
  },
];

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [selectedConsultation, setSelectedConsultation] =
    useState<Consultation | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would verify against ADMIN_PASSWORD env var via API
    if (password === "admin") {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid password. Try 'admin' for demo.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-warm-white flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-sage/10 p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-2xl font-light tracking-tight text-primary">
                exhale
              </span>
              <svg
                width="20"
                height="14"
                viewBox="0 0 24 16"
                fill="none"
                className="text-sage"
              >
                <path
                  d="M1 8C4 3 8 13 12 8C16 3 20 13 23 8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-charcoal">Admin Portal</h1>
            <p className="text-charcoal/60 text-sm mt-1">
              Enter your admin password to continue
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-sage/20 bg-warm-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                placeholder="Enter admin password"
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-full transition-all hover:shadow-lg hover:shadow-primary/20"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  const filteredConsultations =
    statusFilter === "all"
      ? mockConsultations
      : mockConsultations.filter((c) => c.status === statusFilter);

  const stats = {
    total: mockConsultations.length,
    pending: mockConsultations.filter((c) => c.status === "pending").length,
    scheduled: mockConsultations.filter((c) => c.status === "scheduled").length,
    completed: mockConsultations.filter((c) => c.status === "completed").length,
  };

  return (
    <div className="min-h-screen bg-warm-white">
      {/* Admin Header */}
      <div className="bg-white border-b border-sage/10 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-light tracking-tight text-primary">
              exhale
            </span>
            <span className="text-charcoal/40">|</span>
            <span className="text-sm font-medium text-charcoal/60">
              Admin Portal
            </span>
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="text-sm text-charcoal/60 hover:text-primary transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total", value: stats.total, colour: "bg-charcoal/5" },
            {
              label: "Pending",
              value: stats.pending,
              colour: "bg-amber-50",
            },
            {
              label: "Scheduled",
              value: stats.scheduled,
              colour: "bg-blue-50",
            },
            {
              label: "Completed",
              value: stats.completed,
              colour: "bg-primary/5",
            },
          ].map((s) => (
            <div
              key={s.label}
              className={`${s.colour} rounded-xl p-5 border border-sage/10`}
            >
              <div className="text-3xl font-bold text-charcoal">{s.value}</div>
              <div className="text-charcoal/60 text-sm">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6">
          {["all", "pending", "scheduled", "completed"].map((f) => (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all capitalize ${
                statusFilter === f
                  ? "bg-primary text-white"
                  : "bg-white text-charcoal/60 border border-sage/20 hover:bg-sage/10"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Consultations list */}
        <div className="bg-white rounded-2xl border border-sage/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-sage/10">
                  <th className="text-left px-6 py-4 text-sm font-semibold text-charcoal/60">
                    Patient
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-charcoal/60">
                    Contact
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-charcoal/60">
                    Type
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-charcoal/60">
                    Call Time
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-charcoal/60">
                    Status
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-charcoal/60">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredConsultations.map((c) => (
                  <tr
                    key={c.id}
                    className="border-b border-sage/5 hover:bg-sage/5 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-charcoal">
                        {c.firstName} {c.lastName}
                      </div>
                      <div className="text-xs text-charcoal/50">{c.id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-charcoal">{c.email}</div>
                      <div className="text-xs text-charcoal/50">{c.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="capitalize text-sm text-charcoal/70">
                        {c.smokingStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-charcoal/70">
                      {new Date(c.preferredCallTime).toLocaleString("en-AU", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                          c.status === "pending"
                            ? "bg-amber-100 text-amber-800"
                            : c.status === "scheduled"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-primary/10 text-primary"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedConsultation(c)}
                        className="text-primary hover:text-primary-dark text-sm font-medium"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredConsultations.length === 0 && (
            <div className="text-center py-12 text-charcoal/40">
              No consultations found.
            </div>
          )}
        </div>
      </div>

      {/* Consultation Detail Modal */}
      {selectedConsultation && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-charcoal">
                Consultation Details
              </h2>
              <button
                onClick={() => setSelectedConsultation(null)}
                className="w-8 h-8 rounded-full bg-sage/10 flex items-center justify-center hover:bg-sage/20 transition-colors"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-charcoal/50">Name</span>
                  <p className="font-medium">
                    {selectedConsultation.firstName}{" "}
                    {selectedConsultation.lastName}
                  </p>
                </div>
                <div>
                  <span className="text-charcoal/50">Email</span>
                  <p className="font-medium">{selectedConsultation.email}</p>
                </div>
                <div>
                  <span className="text-charcoal/50">Phone</span>
                  <p className="font-medium">{selectedConsultation.phone}</p>
                </div>
                <div>
                  <span className="text-charcoal/50">Status</span>
                  <p className="font-medium capitalize">
                    {selectedConsultation.smokingStatus}
                  </p>
                </div>
                <div>
                  <span className="text-charcoal/50">Duration</span>
                  <p className="font-medium">
                    {selectedConsultation.yearsUsing} years
                  </p>
                </div>
                <div>
                  <span className="text-charcoal/50">Daily Usage</span>
                  <p className="font-medium">
                    {selectedConsultation.dailyUsage}/day
                  </p>
                </div>
              </div>

              {selectedConsultation.previousQuitAttempts && (
                <div className="text-sm">
                  <span className="text-charcoal/50">
                    Previous Quit Attempts
                  </span>
                  <p className="font-medium">
                    {selectedConsultation.previousQuitAttempts}
                  </p>
                </div>
              )}

              {selectedConsultation.medicalConditions && (
                <div className="text-sm">
                  <span className="text-charcoal/50">
                    Medical Conditions
                  </span>
                  <p className="font-medium">
                    {selectedConsultation.medicalConditions}
                  </p>
                </div>
              )}

              <div className="pt-4 border-t border-sage/10">
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Update Status
                </label>
                <div className="flex gap-2">
                  {["pending", "scheduled", "completed"].map((s) => (
                    <button
                      key={s}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all capitalize ${
                        selectedConsultation.status === s
                          ? "bg-primary text-white"
                          : "bg-sage/10 text-charcoal/60 hover:bg-sage/20"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
