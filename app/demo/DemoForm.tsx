'use client';

import { useState } from 'react';
import FormField from '@/components/ui/FormField';

const INTEREST_OPTIONS = [
  { value: 'hr-solution', label: 'HR Solution' },
  { value: 'sales-solution', label: 'Sales Solution' },
  { value: 'customer-support-solution', label: 'Customer Support Solution' },
  { value: 'operations-solution', label: 'Operations Solution' },
  { value: 'custom-ai-solution', label: 'Custom AI Solution' },
  { value: 'other', label: 'Other' },
];

const TEAM_SIZE_OPTIONS = [
  { value: '1-10', label: '1–10 employees' },
  { value: '11-50', label: '11–50 employees' },
  { value: '51-200', label: '51–200 employees' },
  { value: '201-1000', label: '201–1,000 employees' },
  { value: '1000+', label: '1,000+ employees' },
];

type FormState =
  | { status: 'idle' }
  | { status: 'pending' }
  | { status: 'success' }
  | { status: 'error'; message: string };

export default function DemoForm() {
  const [formState, setFormState] = useState<FormState>({ status: 'idle' });

  const pending = formState.status === 'pending';

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (pending) return; // prevent duplicate submissions

    const form = e.currentTarget;
    const data = new FormData(form);

    // Basic client-side presence check for required fields
    const workEmail = (data.get('workEmail') as string | null)?.trim() ?? '';
    if (!workEmail) {
      setFormState({ status: 'error', message: 'Work email is required.' });
      return;
    }

    setFormState({ status: 'pending' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        // Send as JSON so the route receives a typed object
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType:     'Request Demo Form',
          fullName:     (data.get('fullName') as string | null)?.trim() ?? '',
          workEmail,
          company:      (data.get('company') as string | null)?.trim() ?? '',
          jobTitle:     (data.get('jobTitle') as string | null)?.trim() ?? '',
          phone:        (data.get('phone') as string | null)?.trim() ?? '',
          teamSize:     (data.get('teamSize') as string | null)?.trim() ?? '',
          interest:     (data.get('interest') as string | null)?.trim() ?? '',
          requirements: (data.get('requirements') as string | null)?.trim() ?? '',
          message:      (data.get('message') as string | null)?.trim() ?? '',
          // Honeypot — value must remain empty; populated only by bots
          _hp:          (data.get('_hp') as string | null) ?? '',
        }),
      });

      if (res.ok) {
        setFormState({ status: 'success' });
      } else {
        let message = 'Something went wrong. Please try again.';
        try {
          const body = await res.json();
          if (typeof body?.error === 'string') message = body.error;
        } catch { /* ignore parse errors */ }
        setFormState({ status: 'error', message });
      }
    } catch {
      setFormState({
        status: 'error',
        message: 'Unable to reach the server. Please check your connection and try again.',
      });
    }
  }

  if (formState.status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-14 text-center">
        <div className="w-14 h-14 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center mb-6">
          <svg
            className="w-7 h-7 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-slate-900 mb-3">
          Demo request received.
        </h2>
        <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
          Someone from the SoloBuildAI team will be in touch within one business
          day to confirm your demo.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Honeypot — hidden from real users; bots fill it automatically */}
      <input
        type="text"
        name="_hp"
        defaultValue=""
        tabIndex={-1}
        aria-hidden="true"
        autoComplete="off"
        style={{ display: 'none' }}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField
          label="Full Name"
          id="fullName"
          name="fullName"
          required
          placeholder="Jane Smith"
        />
        <FormField
          label="Work Email"
          id="workEmail"
          name="workEmail"
          type="email"
          required
          placeholder="jane@company.com"
        />
        <FormField
          label="Company"
          id="company"
          name="company"
          required
          placeholder="Acme Corp"
        />
        <FormField
          label="Job Title"
          id="jobTitle"
          name="jobTitle"
          placeholder="Head of Talent"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField
          label="Phone Number"
          id="phone"
          name="phone"
          type="tel"
          placeholder="+1 555 000 0000 (optional)"
        />
        <FormField
          as="select"
          label="Team Size"
          id="teamSize"
          name="teamSize"
          placeholder="Select team size"
          options={TEAM_SIZE_OPTIONS}
        />
      </div>

      <FormField
        as="select"
        label="Area of Interest"
        id="interest"
        name="interest"
        required
        placeholder="What are you interested in?"
        options={INTEREST_OPTIONS}
      />

      <FormField
        as="textarea"
        label="Tell us more about your requirements"
        id="requirements"
        name="requirements"
        rows={3}
        placeholder="Describe what you would like to automate, improve, or build…"
      />

      <FormField
        as="textarea"
        label="Anything you'd like us to know?"
        id="message"
        name="message"
        rows={3}
        placeholder="Optional — tell us about your current hiring process, challenges, or goals."
      />

      {formState.status === 'error' && (
        <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {formState.message}
        </p>
      )}

      <div className="pt-1">
        <button
          type="submit"
          disabled={pending}
          className="w-full py-3.5 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-sm flex items-center justify-center gap-2"
        >
          {pending ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Sending...
            </>
          ) : (
            'Request a Demo'
          )}
        </button>
      </div>
    </form>
  );
}
