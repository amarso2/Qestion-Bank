import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET ?? 'dev-secret';
const JWT_EXPIRES_IN = '30d';

export interface UserRecord {
  _id: string;
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

const users: UserRecord[] = [];

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
  const decoded = jwt.verify(token, JWT_SECRET);
  if (typeof decoded === 'string') {
    throw new Error('Unexpected token payload');
  }
  return decoded as JwtPayload;
}

export function createRandomToken() {
  return crypto.randomBytes(32).toString('hex');
}

function findUserIndexById(userId: string) {
  return users.findIndex((user) => user._id === userId);
}

export async function createUser(user: Omit<UserRecord, '_id'>) {
  const newUser: UserRecord = {
    _id: crypto.randomUUID(),
    ...user,
  };
  users.push(newUser);
  return newUser;
}

export async function findUserByEmail(email: string) {
  return users.find((user) => user.email === email.toLowerCase()) ?? null;
}

export async function findUserByVerificationToken(token: string) {
  return (
    users.find(
      (user) =>
        user.verificationToken === token &&
        user.verificationTokenExpires instanceof Date &&
        user.verificationTokenExpires > new Date()
    ) ?? null
  );
}

export async function findUserByPasswordResetToken(token: string) {
  return (
    users.find(
      (user) =>
        user.passwordResetToken === token &&
        user.passwordResetTokenExpires instanceof Date &&
        user.passwordResetTokenExpires > new Date()
    ) ?? null
  );
}

export async function updateUserVerification(userId: string) {
  const index = findUserIndexById(userId);
  if (index === -1) return;

  users[index].isEmailVerified = true;
  users[index].verificationToken = null;
  users[index].verificationTokenExpires = null;
  users[index].updatedAt = new Date();
}

export async function updatePasswordReset(userId: string, passwordHash: string) {
  const index = findUserIndexById(userId);
  if (index === -1) return;

  users[index].passwordHash = passwordHash;
  users[index].passwordResetToken = null;
  users[index].passwordResetTokenExpires = null;
  users[index].updatedAt = new Date();
}

export async function setPasswordResetToken(userId: string, token: string, expiresAt: Date) {
  const index = findUserIndexById(userId);
  if (index === -1) return;

  users[index].passwordResetToken = token;
  users[index].passwordResetTokenExpires = expiresAt;
  users[index].updatedAt = new Date();
}
