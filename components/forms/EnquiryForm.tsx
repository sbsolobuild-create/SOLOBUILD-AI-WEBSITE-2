'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { submitEnquiry, type EnquiryState } from '@/app/actions/submit-enquiry';
import FormField from '@/components/ui/FormField';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-3.5 bg-[#0066FF] hover:bg-[#0052CC] text-white text-sm font-semibold rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {pending ? (
        <>
          <svg
            className="w-4 h-4 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
          >
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
          Sending…
        </>
      ) : (
        'Send Message'
      )}
    </button>
  );
}

export default function EnquiryForm() {
  const [state, formAction] = useActionState<EnquiryState, FormData>(
    submitEnquiry,
    null
  );

  if (state && 'success' in state && state.success) {
    return (
      <div className="bg-[#0A0A0A] rounded-2xl p-8 flex flex-col items-center text-center gap-4">
        <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-emerald-400"
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
        <h3 className="text-lg font-semibold text-white">Message sent.</h3>
        <p className="text-sm text-slate-400">{state.message}</p>
      </div>
    );
  }

  return (
    <div className="bg-[#0A0A0A] rounded-2xl p-8">
      <h2 className="text-xl font-semibold text-white mb-1">Get in touch</h2>
      <p className="text-sm text-slate-400 mb-8">
        We aim to respond within one business day.
      </p>

      <form action={formAction} noValidate className="space-y-5">
        <input type="hidden" name="formType" value="Enquiry Modal / Section" />
        <div className="[&_label]:text-slate-300 [&_input]:bg-[#1A1A1A] [&_input]:border-white/10 [&_input]:text-white [&_input]:placeholder:text-slate-500 [&_textarea]:bg-[#1A1A1A] [&_textarea]:border-white/10 [&_textarea]:text-white [&_textarea]:placeholder:text-slate-500">
          <FormField
            label="Name"
            id="name"
            name="name"
            required
            placeholder="Jane Smith"
          />
        </div>
        <div className="[&_label]:text-slate-300 [&_input]:bg-[#1A1A1A] [&_input]:border-white/10 [&_input]:text-white [&_input]:placeholder:text-slate-500">
          <FormField
            label="Work Email"
            id="email"
            name="email"
            type="email"
            required
            placeholder="jane@company.com"
          />
        </div>
        <div className="[&_label]:text-slate-300 [&_textarea]:bg-[#1A1A1A] [&_textarea]:border-white/10 [&_textarea]:text-white [&_textarea]:placeholder:text-slate-500">
          <FormField
            as="textarea"
            label="How can we help?"
            id="message"
            name="message"
            required
            rows={5}
            placeholder="Tell us about your project or question…"
          />
        </div>

        {state && 'error' in state && (
          <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
            {state.error}
          </p>
        )}

        <SubmitButton />
      </form>
    </div>
  );
}
