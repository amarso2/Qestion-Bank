import { NextResponse } from 'next/server';
import { verifyTokenSchema } from '@/lib/validators';
import { findUserByVerificationToken, updateUserVerification, createJwtToken } from '@/lib/auth';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get('token');
  const parsed = verifyTokenSchema.safeParse({ token });

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 422 });
  }

  const user = await findUserByVerificationToken(token as string);
  if (!user) {
    return NextResponse.json({ error: 'Verification token is invalid or expired' }, { status: 400 });
  }

  await updateUserVerification(user._id.toString());

  const jwtToken = createJwtToken({
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
    isEmailVerified: true,
    fullName: user.fullName,
  });

  return NextResponse.json({ token: jwtToken, user: { email: user.email, fullName: user.fullName, role: user.role, isEmailVerified: true } });
}
