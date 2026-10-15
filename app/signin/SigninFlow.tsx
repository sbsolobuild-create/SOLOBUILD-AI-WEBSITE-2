"use client";

import { useState } from "react";
import { DASHBOARD_PATHS } from "@/lib/config";

function isValidEmail(e: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

/**
 * Sign-in handoff component.
 *
 * Authentication is fully owned by the external dashboard application.
 * This page's role is to validate the email format locally, then redirect the
 * user to the dashboard's sign-in page — which handles credentials, sessions,
 * OAuth, and MFA. No authentication happens here.
 *
 * Google / Microsoft buttons redirect to the same dashboard entry-point rather
 * than initiating OAuth directly, because this landing page has no OAuth client
 * configuration. The dashboard handles provider selection after arrival.
 */
export default function SigninFlow() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [navigating, setNavigating] = useState(false);

  const dashboardSignIn = DASHBOARD_PATHS.signIn();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) {
      setError("Enter your work email to continue.");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Enter a valid email address.");
      return;
    }

    // Navigate to the dashboard — no fake delay, no auth performed here.
    setNavigating(true);
    window.location.href = dashboardSignIn;
  }

  function handleSSOClick() {
    // The dashboard owns OAuth configuration. Redirect there for provider selection.
    window.location.href = dashboardSignIn;
  }

  return (
    <div className="w-full">
      <h1 className="text-2xl font-semibold text-white mb-1.5 tracking-tight text-center">
        Sign in to SoloBuildAI
      </h1>
      <p className="text-sm text-slate-400 mb-8 text-center">
        Don&apos;t have an account?{" "}
        <a href="/signup" className="text-[#0066FF] hover:underline font-medium">
          Sign up
        </a>
      </p>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="signin-email" className="text-sm font-medium text-slate-300">
            Work email
          </label>
          <input
            id="signin-email"
            type="email"
            placeholder="you@company.com"
            autoFocus
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            className={`w-full rounded-lg border px-4 py-3 text-sm text-white placeholder:text-slate-500 bg-white/5 outline-none transition-all
              focus:ring-2 focus:ring-[#0066FF] focus:border-transparent
              ${error ? "border-red-400 focus:ring-red-400" : "border-white/15 hover:border-white/25"}`}
          />
          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>

        <button
          type="submit"
          disabled={navigating}
          className="w-full py-3 bg-[#0066FF] text-white text-sm font-medium rounded-lg hover:bg-[#0052cc] disabled:opacity-60 transition-colors flex items-center justify-center gap-2"
        >
          {navigating ? (
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : null}
          Continue to sign in
        </button>
      </form>

      <div className="mt-6">
        <div className="relative flex items-center gap-3">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-xs text-slate-500 flex-shrink-0">or continue with</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {/* Both SSO buttons send the user to the dashboard, which owns OAuth config */}
          <button
            type="button"
            onClick={handleSSOClick}
            className="flex items-center justify-center gap-2.5 px-4 py-2.5 border border-white/15 rounded-lg text-sm font-medium text-white/80 hover:bg-white/5 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </button>
          <button
            type="button"
            onClick={handleSSOClick}
            className="flex items-center justify-center gap-2.5 px-4 py-2.5 border border-white/15 rounded-lg text-sm font-medium text-white/80 hover:bg-white/5 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#F25022" d="M1 1h10v10H1z"/>
              <path fill="#7FBA00" d="M13 1h10v10H13z"/>
              <path fill="#00A4EF" d="M1 13h10v10H1z"/>
              <path fill="#FFB900" d="M13 13h10v10H13z"/>
            </svg>
            Microsoft
          </button>
        </div>
      </div>

      <p className="text-xs text-slate-500 mt-6 text-center">
        You&apos;ll be taken to the SoloBuildAI platform to complete sign in.
      </p>
    </div>
  );
}
