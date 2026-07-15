import { NextResponse } from 'next/server';
import { signupSchema } from '@/lib/validators';
import { findUserByEmail, getUserCollection, hashPassword, createRandomToken, createJwtToken } from '@/lib/auth';
import { sendVerificationEmail } from '@/lib/email';

export async function POST(request: Request) {
  const body = await request.json();

  const parsed = signupSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 422 });
  }

  const existing = await findUserByEmail(parsed.data.email);
  if (existing) {
    return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
  }

  const passwordHash = await hashPassword(parsed.data.password);
  const verificationToken = createRandomToken();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);

  const users = await getUserCollection();
  const result = await users.insertOne({
    fullName: parsed.data.fullName,
    email: parsed.data.email.toLowerCase(),
    phone: parsed.data.phone,
    examCategory: parsed.data.examCategory,
    passwordHash,
    role: 'student',
    isEmailVerified: false,
    verificationToken,
    verificationTokenExpires: expiresAt,
    passwordResetToken: null,
    passwordResetTokenExpires: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await sendVerificationEmail(parsed.data.email, verificationToken);

  const token = createJwtToken({
    userId: result.insertedId.toString(),
    email: parsed.data.email.toLowerCase(),
    role: 'student',
    isEmailVerified: false,
    fullName: parsed.data.fullName,
  });

  return NextResponse.json({ token, user: { email: parsed.data.email.toLowerCase(), fullName: parsed.data.fullName, role: 'student', isEmailVerified: false } });
}
