"use client";

import { useRef, useState } from "react";
import Link from "next/link";

const SIGN_IN_URL = "https://main.d3ataamm8hxei7.amplifyapp.com/";

/* ─── Types ─────────────────────────────────────────────────────────── */
type FormData = {
  fullName: string;
  email: string;
  password: string;
  company: string;
  industry: string;
  volume: string;
  services: string[];
  notes: string;
};

type Errors = Partial<Record<"fullName" | "email" | "password" | "company", string>>;

/* ─── Helpers ────────────────────────────────────────────────────────── */
function isValidEmail(e: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

/* ─── Eye icon ───────────────────────────────────────────────────────── */
function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg>
  ) : (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

const SERVICE_OPTIONS = [
  "AI Hiring & Voice Screening",
  "Sales Outreach & Voice AI",
  "Customer Support Automation",
  "Custom Workflow & MCP Integrations",
];

const inputClass =
  "w-full rounded-lg border border-white/10 bg-[#111111] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:border-transparent transition-all";

const labelClass = "text-sm font-medium text-white/70 mb-1.5 block";

const sectionHeadingClass =
  "text-xs font-semibold uppercase tracking-widest text-white/40 mb-4";

/* ─── Root ───────────────────────────────────────────────────────────── */
export default function SignupFlow() {
  const cardRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    company: "",
    industry: "",
    volume: "",
    services: [],
    notes: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [showPass, setShowPass] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleField(field: keyof FormData, value: string) {
    setForm((p) => ({ ...p, [field]: value }));
    if (field in errors) {
      setErrors((p) => ({ ...p, [field]: undefined }));
    }
  }

  function toggleService(service: string) {
    setForm((p) => ({
      ...p,
      services: p.services.includes(service)
        ? p.services.filter((s) => s !== service)
        : [...p.services, service],
    }));
  }

  function validate(): Errors {
    const e: Errors = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required.";
    if (!form.email.trim()) {
      e.email = "Work email is required.";
    } else if (!isValidEmail(form.email)) {
      e.email = "Enter a valid email address.";
    }
    if (!form.password) {
      e.password = "Password is required.";
    } else if (form.password.length < 8) {
      e.password = "Minimum 8 characters.";
    }
    if (!form.company.trim()) e.company = "Company name is required.";
    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      cardRef.current?.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    console.log("SignupFlow submission:", form);
    setSubmitted(true);
  }

  /* ── Success state ── */
  if (submitted) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl bg-[#0A0A0A] border border-white/10 rounded-xl shadow-2xl px-8 py-16 flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full bg-[#0066FF]/10 border border-[#0066FF]/20 flex items-center justify-center mb-6">
            <svg className="w-7 h-7 text-[#0066FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-white mb-2">You&apos;re on the list!</h2>
          <p className="text-sm text-white/50 mb-8">
            We&apos;ll be in touch within 1 business day.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-[#0066FF] hover:bg-[#0052CC] text-white text-sm font-semibold rounded-lg transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  /* ── Form ── */
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-[#0A0A0A] border border-white/10 rounded-xl shadow-2xl">
        <div
          ref={cardRef}
          className="px-8 py-10 max-h-[85vh] overflow-y-auto"
        >
          {/* Card header */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-white mb-1">
              Create your account
            </h1>
            <p className="text-sm text-white/50">
              Tell us about yourself and what you&apos;re building.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-8">

            {/* ── Section 1: Account Details ── */}
            <div>
              <p className={sectionHeadingClass}>Account Details</p>
              <div className="space-y-5">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className={labelClass}>
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    placeholder="Jane Smith"
                    autoComplete="name"
                    value={form.fullName}
                    onChange={(e) => handleField("fullName", e.target.value)}
                    className={`${inputClass} ${errors.fullName ? "border-red-500/50 focus:ring-red-500" : ""}`}
                  />
                  {errors.fullName && (
                    <p className="text-xs text-red-400 mt-1">{errors.fullName}</p>
                  )}
                </div>

                {/* Work Email */}
                <div>
                  <label htmlFor="email" className={labelClass}>
                    Work Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => handleField("email", e.target.value)}
                    className={`${inputClass} ${errors.email ? "border-red-500/50 focus:ring-red-500" : ""}`}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-400 mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className={labelClass}>
                    Password <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPass ? "text" : "password"}
                      placeholder="Minimum 8 characters"
                      autoComplete="new-password"
                      value={form.password}
                      onChange={(e) => handleField("password", e.target.value)}
                      className={`${inputClass} pr-11 ${errors.password ? "border-red-500/50 focus:ring-red-500" : ""}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                      tabIndex={-1}
                      aria-label={showPass ? "Hide password" : "Show password"}
                    >
                      <EyeIcon open={showPass} />
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-xs text-red-400 mt-1">{errors.password}</p>
                  )}
                </div>
              </div>
            </div>

            {/* ── Divider ── */}
            <div className="border-t border-white/10" />

            {/* ── Section 2: Company Context ── */}
            <div>
              <p className={sectionHeadingClass}>Company Context</p>
              <div className="space-y-5">
                {/* Company Name */}
                <div>
                  <label htmlFor="company" className={labelClass}>
                    Company / Organization Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="company"
                    type="text"
                    placeholder="Acme Corp"
                    autoComplete="organization"
                    value={form.company}
                    onChange={(e) => handleField("company", e.target.value)}
                    className={`${inputClass} ${errors.company ? "border-red-500/50 focus:ring-red-500" : ""}`}
                  />
                  {errors.company && (
                    <p className="text-xs text-red-400 mt-1">{errors.company}</p>
                  )}
                </div>

                {/* Industry */}
                <div>
                  <label htmlFor="industry" className={labelClass}>
                    Industry
                  </label>
                  <input
                    id="industry"
                    type="text"
                    placeholder="e.g. Technology, Healthcare, Finance"
                    value={form.industry}
                    onChange={(e) => handleField("industry", e.target.value)}
                    className={inputClass}
                  />
                </div>

                {/* Volume */}
                <div>
                  <label htmlFor="volume" className={labelClass}>
                    Expected Monthly Call / Screening Volume
                  </label>
                  <select
                    id="volume"
                    value={form.volume}
                    onChange={(e) => handleField("volume", e.target.value)}
                    className={inputClass}
                  >
                    <option value="" disabled>
                      Select volume range
                    </option>
                    <option value="1-500">1 – 500 calls/month</option>
                    <option value="500-2500">500 – 2,500 calls/month</option>
                    <option value="2500-10000">2,500 – 10,000 calls/month</option>
                    <option value="10000+">10,000+ calls/month</option>
                  </select>
                </div>
              </div>
            </div>

            {/* ── Divider ── */}
            <div className="border-t border-white/10" />

            {/* ── Section 3: AI Requirements ── */}
            <div>
              <p className={sectionHeadingClass}>AI Requirements &amp; Services Needed</p>
              <div className="space-y-5">
                {/* Checkboxes */}
                <div className="space-y-3">
                  {SERVICE_OPTIONS.map((service) => (
                    <label key={service} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.services.includes(service)}
                        onChange={() => toggleService(service)}
                        className="accent-[#0066FF] w-4 h-4 rounded"
                      />
                      <span className="text-sm text-white/80">{service}</span>
                    </label>
                  ))}
                </div>

                {/* Notes */}
                <div>
                  <label htmlFor="notes" className={labelClass}>
                    Additional Notes / Custom Requirements{" "}
                    <span className="text-white/30 font-normal">(optional)</span>
                  </label>
                  <textarea
                    id="notes"
                    rows={4}
                    placeholder="Any specific requirements or context..."
                    value={form.notes}
                    onChange={(e) => handleField("notes", e.target.value)}
                    className={`${inputClass} resize-none`}
                  />
                </div>
              </div>
            </div>

            {/* ── Submit ── */}
            <div className="pt-2 space-y-4">
              <button
                type="submit"
                className="w-full py-3 bg-[#0066FF] hover:bg-[#0052CC] text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                Complete Registration
              </button>
              <p className="text-sm text-center text-white/40">
                Already have an account?{" "}
                <a
                  href={SIGN_IN_URL}
                  className="text-[#0066FF] hover:underline"
                >
                  Sign in
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
