'use server';

import nodemailer from 'nodemailer';

export type EnquiryState =
  | { success: true; message: string }
  | { error: string }
  | null;

export async function submitEnquiry(
  prevState: EnquiryState,
  formData: FormData
): Promise<EnquiryState> {
  // Extract known fields with fallbacks
  const formType =
    formData.get('formType')?.toString().trim() || 'General Enquiry';
  const name =
    formData.get('name')?.toString().trim() ||
    formData.get('fullName')?.toString().trim() ||
    '';
  const email =
    formData.get('email')?.toString().trim() ||
    formData.get('workEmail')?.toString().trim() ||
    '';
  const company =
    formData.get('company')?.toString().trim() ||
    formData.get('organization')?.toString().trim() ||
    '';
  const phone = formData.get('phone')?.toString().trim() || '';
  const message =
    formData.get('message')?.toString().trim() ||
    formData.get('requirements')?.toString().trim() ||
    formData.get('useCase')?.toString().trim() ||
    '';

  // Light validation — forms do client-side work; just need an email to reply to
  if (!email) {
    return { error: 'Failed to send message. Please try again.' };
  }

  // Collect any extra fields beyond the known set
  const knownKeys = new Set([
    'formType', 'name', 'fullName', 'email', 'workEmail',
    'company', 'organization', 'phone', 'message', 'requirements', 'useCase',
  ]);
  const extraRows: { label: string; value: string }[] = [];
  formData.forEach((val, key) => {
    if (!knownKeys.has(key)) {
      const v = val?.toString().trim();
      if (v) extraRows.push({ label: key, value: v });
    }
  });

  // Build the HTML table body
  const rowStyle = 'padding:8px 12px;border-bottom:1px solid #e5e7eb;';
  const labelStyle = 'font-weight:600;color:#374151;white-space:nowrap;width:140px;';
  const valueStyle = 'color:#111827;';

  function makeRow(label: string, value: string) {
    if (!value) return '';
    return `
      <tr>
        <td style="${rowStyle}${labelStyle}">${label}</td>
        <td style="${rowStyle}${valueStyle}">${value.replace(/\n/g, '<br/>')}</td>
      </tr>`;
  }

  const tableRows = [
    makeRow('Form Type', formType),
    makeRow('Name', name),
    makeRow('Email', email),
    makeRow('Company', company),
    makeRow('Phone', phone),
    makeRow('Message', message),
    ...extraRows.map((r) => makeRow(r.label, r.value)),
  ].join('');

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      <h2 style="color:#1d4ed8;margin-bottom:16px;">[${formType}] New Submission</h2>
      <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
        <tbody>${tableRows}</tbody>
      </table>
      <p style="color:#6b7280;font-size:12px;margin-top:16px;">
        This email was sent automatically by SoloBuildAI.
      </p>
    </div>`;

  // ── SMTP credential guard ────────────────────────────────────────────────
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpHost = process.env.SMTP_HOST || 'smtp.hostinger.com';
  const smtpPort = Number(process.env.SMTP_PORT) || 465;

  if (!smtpUser || !smtpPass) {
    console.error('--- CRITICAL SMTP ERROR ---');
    console.error('SMTP_USER or SMTP_PASS is undefined in process.env!');
    console.error('SMTP_USER loaded:', !!smtpUser);
    console.error('SMTP_PASS loaded:', !!smtpPass);
    console.error('---------------------------');
    return { error: 'Server configuration error: Email credentials missing.' };
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465, // true for SSL/465, false for STARTTLS/587
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
    connectionTimeout: 10000,
  });

  try {
    await transporter.sendMail({
      from: `"SoloBuildAI Form Alerts" <${smtpUser}>`,
      to: process.env.CONTACT_EMAIL || 'contact@solobuildai.com',
      replyTo: email,
      subject: `[${formType}] Submission from ${name || email}`,
      html,
    });
    return { success: true, message: 'Thank you! Your submission has been received.' };
  } catch (error) {
    console.error('--- SMTP ERROR DETAILS ---');
    console.error('Message:', (error as any)?.message);
    console.error('Code:',    (error as any)?.code);
    console.error('Response:',(error as any)?.response);
    console.error('---------------------------');
    return { error: (error as any)?.message || 'Failed to send message. Please try again.' };
  }
}
