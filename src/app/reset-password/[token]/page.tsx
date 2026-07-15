'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface ResetFormValues {
  password: string;
  confirmPassword: string;
}

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetFormValues>();

  const passwordValue = watch('password');

  const onSubmit = async (data: ResetFormValues) => {
    if (!token) {
      toast.error('Reset token missing');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password: data.password }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(typeof result.error === 'string' ? result.error : 'Unable to reset password');
      }
      toast.success('Password reset successfully. Please log in.');
      router.push('/sign-up-login-screen');
    } catch (error) {
      toast.error('Unable to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-xl">
        <div className="space-y-4 text-center">
          <h1 className="text-2xl font-semibold text-foreground">Reset your password</h1>
          <p className="text-sm text-muted-foreground">
            Enter a new password to regain access to your account.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4" noValidate>
          <div>
            <label htmlFor="reset-password" className="block text-sm font-semibold text-foreground mb-1.5">
              New Password
            </label>
            <input
              id="reset-password"
              type="password"
              placeholder="Create a strong password"
              className={`form-input w-full ${errors.password ? 'form-input-error' : ''}`}
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 8, message: 'Minimum 8 characters' },
                pattern: {
                  value: /^(?=.*[0-9])(?=.*[!@#$%^&*])/, 
                  message: 'Password must include a number and a special character',
                },
              })}
            />
            {errors.password && (
              <p className="text-danger text-xs mt-1.5">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="reset-confirm" className="block text-sm font-semibold text-foreground mb-1.5">
              Confirm Password
            </label>
            <input
              id="reset-confirm"
              type="password"
              placeholder="Repeat your new password"
              className={`form-input w-full ${errors.confirmPassword ? 'form-input-error' : ''}`}
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) => value === passwordValue || 'Passwords do not match',
              })}
            />
            {errors.confirmPassword && (
              <p className="text-danger text-xs mt-1.5">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button type="submit" disabled={isLoading} className="btn-primary w-full py-3 text-base">
            {isLoading ? 'Updating password...' : 'Reset password'}
          </button>
        </form>
      </div>
    </div>
  );
}
