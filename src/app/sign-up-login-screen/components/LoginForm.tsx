'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import DemoCredentials from './DemoCredentials';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface LoginFormProps {
  onSwitchToSignup: () => void;
}

export default function LoginForm({ onSwitchToSignup }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    defaultValues: { rememberMe: false },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1200));

    const validCredentials = [
      { email: 'akpandit1211@gmail.com', password: 'Amar123', role: 'Student' },
      { email: 'amardipkumarpr172@gmail.com', password: 'Amar123', role: 'Admin' },
    ];

    const match = validCredentials.find(
      (c) => c.email === data.email && c.password === data.password
    );

    if (!match) {
      setIsLoading(false);
      setError('email', { message: '' });
      setError('password', {
        message: 'Invalid credentials — use the demo accounts below to sign in',
      });
      return;
    }

    toast.success(`Welcome back! Signed in as ${match.role}`);
    setIsLoading(false);
    router.push('/dashboard');
  };

  const handleAutofill = (email: string, password: string) => {
    setValue('email', email);
    setValue('password', password);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Welcome back</h2>
        <p className="text-muted-foreground text-sm mt-1">
          Sign in to continue your exam preparation
        </p>
      </div>

      <button
        type="button"
        className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg border border-border bg-card text-sm font-medium text-foreground hover:bg-muted transition-colors active:scale-95 duration-150"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" />
          <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853" />
          <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
          <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335" />
        </svg>
        Continue with Google
      </button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-background px-3 text-muted-foreground font-medium">or sign in with email</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div>
          <label htmlFor="login-email" className="block text-sm font-semibold text-foreground mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              placeholder="Amardip23@.com"
              className={`form-input pl-10 ${errors.email ? 'form-input-error' : ''}`}
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address' },
              })}
            />
          </div>
          {errors.email?.message && (
            <p className="text-danger text-xs mt-1.5 font-medium">{errors.email.message}</p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="login-password" className="block text-sm font-semibold text-foreground">
              Password
            </label>
            <a href="#" className="text-xs text-primary font-medium hover:underline">
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="Enter your password"
              className={`form-input pl-10 pr-10 ${errors.password ? 'form-input-error' : ''}`}
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password?.message && (
            <p className="text-danger text-xs mt-1.5 font-medium">{errors.password.message}</p>
          )}
        </div>

        <div className="flex items-center gap-2.5">
          <input
            id="remember-me"
            type="checkbox"
            className="w-4 h-4 rounded border-input text-primary focus:ring-primary focus:ring-offset-0 cursor-pointer"
            {...register('rememberMe')}
          />
          <label htmlFor="remember-me" className="text-sm text-muted-foreground cursor-pointer select-none">
            Remember me for 30 days
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full py-3 text-base"
        >
          {isLoading ? 'Signing in...' : 'Sign In to ExamPeakAI'}
        </button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{' '}
        <button onClick={onSwitchToSignup} className="text-primary font-semibold hover:underline">
          Create one free
        </button>
      </p>

      <DemoCredentials onAutofill={handleAutofill} />
    </div>
  );
}