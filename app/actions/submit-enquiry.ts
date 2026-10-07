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
  const name = formData.get('name')?.toString().trim() ?? '';
  const email = formData.get('email')?.toString().trim() ?? '';
  const messageText = formData.get('message')?.toString().trim() ?? '';

  if (!name || !email || !messageText) {
    return { error: 'All fields are required.' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { error: 'Please enter a valid email address.' };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: Number(process.env.SMTP_PORT ?? 587) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"SoloBuildAI Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `New enquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${messageText}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p>${messageText.replace(/\n/g, '<br/>')}</p>`,
    });
    return { success: true, message: "Thank you — we'll be in touch within one business day." };
  } catch (err) {
    console.error('[submitEnquiry] SMTP error:', err);
    return { error: 'Failed to send your message. Please try again later.' };
  }
}
