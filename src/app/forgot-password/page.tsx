'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface FormValues {
  email: string;
}

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/request-password-reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(typeof result.error === 'string' ? result.error : 'Unable to process request');
      }
      toast.success('Password reset instructions sent to your email');
      setSubmitted(true);
    } catch (error) {
      toast.error('Unable to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-xl">
        <div className="space-y-4 text-center">
          <h1 className="text-2xl font-semibold text-foreground">Forgot your password?</h1>
          <p className="text-sm text-muted-foreground">
            Enter the email linked to your account and we&apos;ll send password reset instructions.
          </p>
        </div>

        {submitted ? (
          <div className="mt-8 rounded-3xl bg-slate-50 dark:bg-slate-900 p-6 text-center">
            <p className="text-sm text-foreground">Check your inbox for a password reset link.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4" noValidate>
            <div>
              <label htmlFor="forgot-email" className="block text-sm font-semibold text-foreground mb-1.5">
                Email Address
              </label>
              <input
                id="forgot-email"
                type="email"
                placeholder="you@example.com"
                className={`form-input w-full ${errors.email ? 'form-input-error' : ''}`}
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address' },
                })}
              />
              {errors.email && (
                <p className="text-danger text-xs mt-1.5">{errors.email.message}</p>
              )}
            </div>

            <button type="submit" disabled={isLoading} className="btn-primary w-full py-3 text-base">
              {isLoading ? 'Sending...' : 'Send reset link'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
