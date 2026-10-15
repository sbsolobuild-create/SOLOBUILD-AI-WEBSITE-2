/**
 * POST /api/contact
 *
 * Accepts JSON or FormData submissions from inquiry forms, validates the
 * payload server-side, and sends a notification email via Nodemailer.
 *
 * Security guarantees:
 *  - SMTP credentials are read from process.env only; never returned to the client.
 *  - Internal error details (SMTP responses, stack traces) are logged server-side
 *    and never exposed in the HTTP response body.
 *  - A honeypot field (`_hp`) silently discards bot submissions.
 *  - Field values are HTML-escaped before being inserted into the email body.
 *  - Submitted email addresses are validated before use as replyTo.
 *  - Personal data is not logged.
 */

import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// ─── Types ──────────────────────────────────────────────────────────────────

interface ContactPayload {
  formType?: string;
  // Name variants accepted from different forms
  fullName?: string;
  name?: string;
  // Email variants
  workEmail?: string;
  email?: string;
  // Optional fields
  company?: string;
  jobTitle?: string;
  phone?: string;
  teamSize?: string;
  interest?: string;
  area?: string;
  requirements?: string;
  aiGoal?: string;
  message?: string;
  additional?: string;
  // Honeypot — must be empty/absent for real submissions
  _hp?: string;
  // Allow extra fields to be included in the email
  [key: string]: string | undefined;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Simple email format check — not exhaustive, just a sanity guard. */
function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/** Escape HTML special characters to prevent injection in the email body. */
function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Truncate a field value to a safe maximum length. */
function truncate(value: string, max = 2000): string {
  return value.length > max ? value.slice(0, max) + ' [truncated]' : value;
}

/** Sanitize and truncate a single string field from the payload. */
function field(raw: string | undefined, max = 2000): string {
  if (!raw) return '';
  return truncate(raw.trim(), max);
}

// ─── Known fields and their display labels ──────────────────────────────────

const KNOWN_FIELDS: Record<string, string> = {
  formType:     'Form Type',
  fullName:     'Full Name',
  name:         'Name',
  workEmail:    'Work Email',
  email:        'Email',
  company:      'Company',
  jobTitle:     'Job Title',
  phone:        'Phone',
  teamSize:     'Team Size',
  interest:     'Area of Interest',
  area:         'Solution Area',
  requirements: 'Requirements',
  aiGoal:       'AI Goal',
  message:      'Message',
  additional:   'Additional Info',
};

// ─── Email builder ──────────────────────────────────────────────────────────

function buildEmail(payload: ContactPayload): { subject: string; html: string; text: string } {
  const formType = field(payload.formType) || 'General Enquiry';
  const name     = field(payload.fullName) || field(payload.name) || '';
  const email    = field(payload.workEmail) || field(payload.email) || '';

  const subject = `[${formType}] Submission from ${name || email}`;

  // ── HTML version ─────────────────────────────────────────────────────────
  const rowStyle  = 'padding:10px 14px;border-bottom:1px solid #e5e7eb;vertical-align:top;';
  const labelStyle = 'font-weight:600;color:#374151;white-space:nowrap;width:160px;';
  const valueStyle = 'color:#111827;';

  function htmlRow(label: string, value: string): string {
    if (!value) return '';
    const safeVal = esc(value).replace(/\n/g, '<br/>');
    return `<tr>
      <td style="${rowStyle}${labelStyle}">${esc(label)}</td>
      <td style="${rowStyle}${valueStyle}">${safeVal}</td>
    </tr>`;
  }

  const rows: string[] = [];
  // Render known fields in a predictable order
  for (const [key, label] of Object.entries(KNOWN_FIELDS)) {
    const val = field(payload[key]);
    if (val) rows.push(htmlRow(label, val));
  }
  // Append any unknown extra fields (skip honeypot)
  for (const [key, val] of Object.entries(payload)) {
    if (key === '_hp' || KNOWN_FIELDS[key] !== undefined) continue;
    const v = field(val);
    if (v) rows.push(htmlRow(key, v));
  }

  const html = `
<div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;">
  <h2 style="color:#1d4ed8;margin-bottom:20px;">[${esc(formType)}] New Submission</h2>
  <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
    <tbody>${rows.join('')}</tbody>
  </table>
  <p style="color:#6b7280;font-size:12px;margin-top:20px;">
    This email was sent automatically by SoloBuildAI.
  </p>
</div>`;

  // ── Plain-text version ────────────────────────────────────────────────────
  const lines: string[] = [`[${formType}] New Submission`, ''];
  for (const [key, label] of Object.entries(KNOWN_FIELDS)) {
    const val = field(payload[key]);
    if (val) lines.push(`${label}: ${val}`);
  }
  for (const [key, val] of Object.entries(payload)) {
    if (key === '_hp' || KNOWN_FIELDS[key] !== undefined) continue;
    const v = field(val);
    if (v) lines.push(`${key}: ${v}`);
  }
  lines.push('', '---', 'Sent automatically by SoloBuildAI.');
  const text = lines.join('\n');

  return { subject, html, text };
}

// ─── Route handler ──────────────────────────────────────────────────────────

export async function POST(req: NextRequest): Promise<NextResponse> {
  // ── Parse body (JSON or FormData) ─────────────────────────────────────────
  let payload: ContactPayload;
  const contentType = req.headers.get('content-type') ?? '';

  try {
    if (contentType.includes('application/json')) {
      payload = (await req.json()) as ContactPayload;
    } else if (contentType.includes('multipart/form-data') || contentType.includes('application/x-www-form-urlencoded')) {
      const fd = await req.formData();
      payload = {} as ContactPayload;
      fd.forEach((val, key) => {
        (payload as Record<string, string>)[key] = val.toString();
      });
    } else {
      // Attempt JSON parse as a fallback for clients that omit Content-Type
      payload = (await req.json()) as ContactPayload;
    }
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  // ── Honeypot check ────────────────────────────────────────────────────────
  // Real users never fill the hidden _hp field. Bots usually do.
  if (payload._hp && payload._hp.trim() !== '') {
    // Respond with 200 to avoid giving bots feedback that they were caught.
    return NextResponse.json({ success: true });
  }

  // ── Server-side validation ────────────────────────────────────────────────
  const email = field(payload.workEmail) || field(payload.email);
  if (!email) {
    return NextResponse.json(
      { error: 'A valid email address is required.' },
      { status: 422 }
    );
  }
  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: 'Please provide a valid email address.' },
      { status: 422 }
    );
  }

  // ── SMTP configuration guard ─────────────────────────────────────────────
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpPort = Number(process.env.SMTP_PORT) || 465;
  const contactEmail = process.env.CONTACT_EMAIL || 'contact@solobuildai.com';

  if (!smtpHost || !smtpUser || !smtpPass) {
    // Log which variable is missing — names only, never values.
    const missing = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS'].filter(
      (k) => !process.env[k]
    );
    console.error(`[/api/contact] Missing environment variables: ${missing.join(', ')}`);
    return NextResponse.json(
      { error: 'Unable to send your message right now. Please email us at contact@solobuildai.com.' },
      { status: 503 }
    );
  }

  // ── Build and send email ──────────────────────────────────────────────────
  const { subject, html, text } = buildEmail(payload);

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: { user: smtpUser, pass: smtpPass },
    connectionTimeout: 10_000,
  });

  try {
    await transporter.sendMail({
      from: `"SoloBuildAI Form Alerts" <${smtpUser}>`,
      to: contactEmail,
      replyTo: email,
      subject,
      text,
      html,
    });
  } catch (err) {
    // Log the SMTP error code server-side only — never forward to the browser.
    const e = err as { code?: string; message?: string };
    console.error('[/api/contact] SMTP send failed — code:', e?.code);
    return NextResponse.json(
      { error: 'Failed to send your message. Please try again or email us directly.' },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true });
}
