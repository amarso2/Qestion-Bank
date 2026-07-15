import { NextResponse } from 'next/server';
import { resetPasswordSchema } from '@/lib/validators';
import { findUserByPasswordResetToken, hashPassword, updatePasswordReset } from '@/lib/auth';

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = resetPasswordSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 422 });
  }

  const user = await findUserByPasswordResetToken(parsed.data.token);
  if (!user) {
    return NextResponse.json({ error: 'Password reset token is invalid or expired' }, { status: 400 });
  }

  const passwordHash = await hashPassword(parsed.data.password);
  await updatePasswordReset(user._id.toString(), passwordHash);

  return NextResponse.json({ ok: true });
}
