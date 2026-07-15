import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
}

const hasEmailConfig =
  Boolean(process.env.EMAIL_SERVER) &&
  Boolean(process.env.EMAIL_USER) &&
  Boolean(process.env.EMAIL_PASS) &&
  Boolean(process.env.EMAIL_FROM);

const transporter = hasEmailConfig
  ? nodemailer.createTransport({
      host: process.env.EMAIL_SERVER,
      port: Number(process.env.EMAIL_PORT ?? 587),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })
  : null;

export function getAppUrl() {
  return process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:4028';
}

export async function sendEmail(options: EmailOptions) {
  if (!transporter) {
    console.log('[EMAIL STUB] sending email:', {
      to: options.to,
      subject: options.subject,
      text: options.text,
    });
    return;
  }

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  });
}

export async function sendVerificationEmail(to: string, token: string) {
  const url = `${getAppUrl()}/verify-email?token=${token}`;
  await sendEmail({
    to,
    subject: 'Verify your ExamPeakAI email address',
    text: `Welcome to ExamPeakAI! Verify your email by visiting: ${url}`,
    html: `<p>Welcome to ExamPeakAI!</p><p>Please verify your email by clicking the link below:</p><p><a href="${url}">${url}</a></p>`,
  });
}

export async function sendPasswordResetEmail(to: string, token: string) {
  const url = `${getAppUrl()}/reset-password/${token}`;
  await sendEmail({
    to,
    subject: 'Reset your ExamPeakAI password',
    text: `Reset your password by visiting: ${url}`,
    html: `<p>Click the link below to reset your password:</p><p><a href="${url}">${url}</a></p>`,
  });
}
