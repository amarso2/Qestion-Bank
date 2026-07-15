import { z } from 'zod';

export const signupSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number'),
  password: z
    .string()
    .min(8, 'Password must contain at least 8 characters')
    .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])/, 'Password must include a number and a symbol'),
  examCategory: z.string().min(1, 'Please choose a target exam category'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const requestPasswordResetSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  password: z
    .string()
    .min(8, 'Password must contain at least 8 characters')
    .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])/, 'Password must include a number and a symbol'),
});

export const verifyTokenSchema = z.object({
  token: z.string().min(1, 'Verification token is required'),
});
