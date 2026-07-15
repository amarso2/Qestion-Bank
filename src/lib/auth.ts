import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { getDatabase } from './mongodb';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '30d';

if (!JWT_SECRET) {
  throw new Error('Missing JWT_SECRET environment variable');
}

export interface UserRecord {
  _id: ObjectId;
  fullName: string;
  email: string;
  phone: string;
  examCategory: string;
  passwordHash: string;
  role: 'student' | 'admin';
  isEmailVerified: boolean;
  verificationToken?: string | null;
  verificationTokenExpires?: Date | null;
  passwordResetToken?: string | null;
  passwordResetTokenExpires?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface JwtPayload {
  userId: string;
  email: string;
  role: 'student' | 'admin';
  isEmailVerified: boolean;
  fullName: string;
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function comparePassword(password: string, passwordHash: string) {
  return bcrypt.compare(password, passwordHash);
}

export function createJwtToken(payload: JwtPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyJwtToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}

export function createRandomToken() {
  return crypto.randomBytes(32).toString('hex');
}

export async function getUserCollection() {
  const db = await getDatabase();
  return db.collection<UserRecord>('users');
}

export async function findUserByEmail(email: string) {
  const users = await getUserCollection();
  return users.findOne({ email: email.toLowerCase() });
}

export async function findUserByVerificationToken(token: string) {
  const users = await getUserCollection();
  return users.findOne({ verificationToken: token, verificationTokenExpires: { $gt: new Date() } });
}

export async function findUserByPasswordResetToken(token: string) {
  const users = await getUserCollection();
  return users.findOne({ passwordResetToken: token, passwordResetTokenExpires: { $gt: new Date() } });
}

export async function updateUserVerification(userId: string) {
  const users = await getUserCollection();
  await users.updateOne(
    { _id: new ObjectId(userId) },
    {
      $set: { isEmailVerified: true, updatedAt: new Date() },
      $unset: {
        verificationToken: '',
        verificationTokenExpires: '',
      },
    }
  );
}

export async function updatePasswordReset(userId: string, passwordHash: string) {
  const users = await getUserCollection();
  await users.updateOne(
    { _id: new ObjectId(userId) },
    {
      $set: { passwordHash, updatedAt: new Date() },
      $unset: {
        passwordResetToken: '',
        passwordResetTokenExpires: '',
      },
    }
  );
}
