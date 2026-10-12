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
        'Send Message'
      )}
    </button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useActionState<EnquiryState, FormData>(
    submitEnquiry,
    null
  );

  if (state && 'success' in state && state.success) {
    return (
      <div className="text-center py-10">
        <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center mb-5 mx-auto">
          <svg
            className="w-6 h-6 text-blue-600"
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
        <h3 className="text-lg font-semibold text-slate-900 mb-2">Message sent.</h3>
        <p className="text-sm text-slate-500">We&apos;ll be in touch shortly.</p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="space-y-4">
      <input type="hidden" name="formType" value="Contact Page Form" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          label="Name"
          id="name"
          name="name"
          required
          placeholder="Jane Smith"
        />
        <FormField
          label="Email"
          id="email"
          name="email"
          type="email"
          required
          placeholder="jane@company.com"
        />
      </div>

      <FormField
        label="Company"
        id="company"
        name="company"
        placeholder="Acme Corp (optional)"
      />

      <FormField
        as="textarea"
        label="Message"
        id="message"
        name="message"
        required
        rows={5}
        placeholder="How can we help?"
      />

      {state && 'error' in state && (
        <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {state.error}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}
