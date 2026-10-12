'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { submitEnquiry, type EnquiryState } from '@/app/actions/submit-enquiry';
import FormField from '@/components/ui/FormField';

const AREA_OPTIONS = [
  { value: 'hiring', label: 'Hiring' },
  { value: 'sales', label: 'Sales' },
  { value: 'customer-support', label: 'Customer Support' },
  { value: 'operations', label: 'Operations' },
  { value: 'other', label: 'Other' },
];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-sm flex items-center gap-2"
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
        'Discuss Your Solution'
      )}
    </button>
  );
}

export default function CustomForm() {
  const [state, formAction] = useActionState<EnquiryState, FormData>(
    submitEnquiry,
    null
  );

  if (state && 'success' in state && state.success) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
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
          We&apos;ve received your enquiry.
        </h2>
        <p className="text-slate-500 text-base leading-relaxed max-w-md">
          Thank you for reaching out. Someone from the SoloBuildAI team will
          review your submission and be in touch shortly to discuss your
          solution.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="space-y-6">
      <input type="hidden" name="formType" value="Custom Solution Request" />

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
          label="Job Title / Role"
          id="jobTitle"
          name="jobTitle"
          required
          placeholder="Head of Operations"
        />
      </div>

      <FormField
        label="Phone Number"
        id="phone"
        name="phone"
        type="tel"
        placeholder="+1 555 000 0000 (optional)"
        hint="Optional — for a faster conversation."
      />

      <FormField
        as="select"
        label="What area does this solution relate to?"
        id="area"
        name="area"
        required
        placeholder="Select an area"
        options={AREA_OPTIONS}
      />

      <FormField
        as="textarea"
        label="Describe the problem or workflow"
        id="requirements"
        name="requirements"
        required
        rows={4}
        placeholder="Describe the operational problem you're trying to solve. The more specific, the better."
      />

      <FormField
        as="textarea"
        label="What would you like the AI system to do?"
        id="aiGoal"
        name="aiGoal"
        required
        rows={4}
        placeholder="What outcome are you looking for? What tasks should the AI perform or assist with?"
      />

      <FormField
        as="textarea"
        label="Additional information"
        id="additional"
        name="additional"
        rows={3}
        placeholder="Anything else you'd like us to know — tools you use, team size, timeline, constraints, etc."
      />

      {state && 'error' in state && (
        <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {state.error}
        </p>
      )}

      <div className="pt-2">
        <SubmitButton />
      </div>
    </form>
  );
}
