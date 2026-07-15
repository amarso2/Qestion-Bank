import { NextResponse } from 'next/server';
import { loginSchema } from '@/lib/validators';
import { findUserByEmail, comparePassword, createJwtToken } from '@/lib/auth';

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 422 });
  }

  const user = await findUserByEmail(parsed.data.email);
  if (!user) {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
  }

  const isMatch = await comparePassword(parsed.data.password, user.passwordHash);
  if (!isMatch) {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
  }

  const token = createJwtToken({
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
    isEmailVerified: user.isEmailVerified,
    fullName: user.fullName,
  });

  return NextResponse.json({ token, user: { email: user.email, fullName: user.fullName, role: user.role, isEmailVerified: user.isEmailVerified } });
}
