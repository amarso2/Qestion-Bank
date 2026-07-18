import { NextResponse } from 'next/server';
import { requestPasswordResetSchema } from '@/lib/validators';
import { findUserByEmail, createRandomToken, setPasswordResetToken } from '@/lib/auth';
import { sendPasswordResetEmail } from '@/lib/email';

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = requestPasswordResetSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 422 });
  }

  const user = await findUserByEmail(parsed.data.email);
  if (!user) {
    return NextResponse.json({ ok: true });
  }

  const resetToken = createRandomToken();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60);

  await setPasswordResetToken(user._id, resetToken, expiresAt);

  await sendPasswordResetEmail(parsed.data.email, resetToken);
  return NextResponse.json({ ok: true });
}
