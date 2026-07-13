'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Loader2, Mail, Lock, User, Phone } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface SignUpFormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  examCategory: string;
  agreeTerms: boolean;
}

interface SignUpFormProps {
  onSwitchToLogin: () => void;
}

const examCategories = [
  { id: 'cat-ssc', value: 'SSC', label: 'SSC CGL / CHSL' },
  { id: 'cat-banking', value: 'Banking', label: 'Banking (IBPS/SBI)' },
  { id: 'cat-upsc', value: 'UPSC', label: 'UPSC Civil Services' },
  { id: 'cat-railways', value: 'Railways', label: 'Railways (RRB)' },
  { id: 'cat-gate', value: 'GATE', label: 'GATE / ESE' },
  { id: 'cat-cat', value: 'CAT', label: 'CAT / MBA Entrance' },
];

export default function SignUpForm({ onSwitchToLogin }: SignUpFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SignUpFormData>();

  const passwordValue = watch('password');

  const onSubmit = async (data: SignUpFormData) => {
    if (!selectedCategory) return;
    setIsLoading(true);
    // Backend integration point: POST /api/auth/register
    await new Promise((r) => setTimeout(r, 1400));
    toast.success('Account created! Welcome to ExamPeakAI 🎉');
    setIsLoading(false);
    router.push('/dashboard');
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Start your prep</h2>
        <p className="text-muted-foreground text-sm mt-1">
          Free account — no credit card required
        </p>
      </div>

      {/* Google auth */}
      <button
        type="button"
        className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg border border-border bg-card text-sm font-medium text-foreground hover:bg-muted transition-colors active:scale-95 duration-150"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
          <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
          <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
          <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
        </svg>
        Sign up with Google
      </button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-background px-3 text-muted-foreground font-medium">or fill in your details</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {/* Full name */}
        <div>
          <label htmlFor="signup-name" className="block text-sm font-semibold text-foreground mb-1.5">
            Full Name
          </label>
          <div className="relative">
            <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              id="signup-name"
              type="text"
              autoComplete="name"
              placeholder="Rohit Anand"
              className={`form-input pl-10 ${errors.fullName ? 'form-input-error' : ''}`}
              {...register('fullName', {
                required: 'Full name is required',
                minLength: { value: 2, message: 'Name must be at least 2 characters' },
              })}
            />
          </div>
          {errors.fullName && (
            <p className="text-danger text-xs mt-1.5 font-medium">{errors.fullName.message}</p>
          )}
        </div>

        {/* Email + Phone row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="signup-email" className="block text-sm font-semibold text-foreground mb-1.5">
              Email
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                id="signup-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className={`form-input pl-10 ${errors.email ? 'form-input-error' : ''}`}
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' },
                })}
              />
            </div>
            {errors.email && (
              <p className="text-danger text-xs mt-1.5 font-medium">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="signup-phone" className="block text-sm font-semibold text-foreground mb-1.5">
              Mobile
            </label>
            <div className="relative">
              <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                id="signup-phone"
                type="tel"
                autoComplete="tel"
                placeholder="+91 98765 43210"
                className={`form-input pl-10 ${errors.phone ? 'form-input-error' : ''}`}
                {...register('phone', {
                  required: 'Phone is required',
                  pattern: { value: /^[6-9]\d{9}$/, message: 'Enter valid 10-digit mobile' },
                })}
              />
            </div>
            {errors.phone && (
              <p className="text-danger text-xs mt-1.5 font-medium">{errors.phone.message}</p>
            )}
          </div>
        </div>

        {/* Exam category */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">
            Target Exam Category <span className="text-danger">*</span>
          </label>
          <p className="text-xs text-muted-foreground mb-2">
            We&apos;ll personalize your question bank and mock tests based on this
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {examCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.value);
                  setValue('examCategory', cat.value);
                }}
                className={`px-3 py-2.5 rounded-lg border text-sm font-medium transition-all duration-150 text-left ${
                  selectedCategory === cat.value
                    ? 'border-primary bg-primary/5 text-primary' :'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
          {!selectedCategory && (
            <input
              type="hidden"
              {...register('examCategory', { required: true })}
            />
          )}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="signup-password" className="block text-sm font-semibold text-foreground mb-1.5">
            Password
          </label>
          <p className="text-xs text-muted-foreground mb-1.5">Min 8 characters with a number and symbol</p>
          <div className="relative">
            <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              id="signup-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Create a strong password"
              className={`form-input pl-10 pr-10 ${errors.password ? 'form-input-error' : ''}`}
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 8, message: 'Minimum 8 characters' },
                pattern: {
                  value: /^(?=.*[0-9])(?=.*[!@#$%^&*])/,
                  message: 'Must include a number and a special character',
                },
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
          {errors.password && (
            <p className="text-danger text-xs mt-1.5 font-medium">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm password */}
        <div>
          <label htmlFor="signup-confirm" className="block text-sm font-semibold text-foreground mb-1.5">
            Confirm Password
          </label>
          <div className="relative">
            <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              id="signup-confirm"
              type={showConfirm ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Repeat your password"
              className={`form-input pl-10 pr-10 ${errors.confirmPassword ? 'form-input-error' : ''}`}
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (v) => v === passwordValue || 'Passwords do not match',
              })}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showConfirm ? 'Hide confirm password' : 'Show confirm password'}
            >
              {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-danger text-xs mt-1.5 font-medium">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Terms */}
        <div className="flex items-start gap-2.5">
          <input
            id="agree-terms"
            type="checkbox"
            className="w-4 h-4 mt-0.5 rounded border-input text-primary focus:ring-primary focus:ring-offset-0 cursor-pointer flex-shrink-0"
            {...register('agreeTerms', { required: 'You must accept terms to continue' })}
          />
          <label htmlFor="agree-terms" className="text-xs text-muted-foreground cursor-pointer leading-relaxed">
            I agree to ExamForge&apos;s{' '}
            <a href="#" className="text-primary hover:underline font-medium">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-primary hover:underline font-medium">Privacy Policy</a>
          </label>
        </div>
        {errors.agreeTerms && (
          <p className="text-danger text-xs font-medium -mt-2">{errors.agreeTerms.message}</p>
        )}

        <button
          type="submit"
          disabled={isLoading || !selectedCategory}
          className="btn-primary w-full py-3 text-base"
        >
          {isLoading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Creating your account...
            </>
          ) : (
            'Create Free Account'
          )}
        </button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <button onClick={onSwitchToLogin} className="text-primary font-semibold hover:underline">
          Sign in
        </button>
      </p>
    </div>
  );
}