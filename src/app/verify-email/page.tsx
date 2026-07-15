'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setStatus('error');
      setMessage('Verification token is missing.');
      return;
    }

    setStatus('loading');

    fetch(`/api/auth/verify-email?token=${encodeURIComponent(token)}`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(typeof data.error === 'string' ? data.error : 'Unable to verify email');
        }
        setStatus('success');
        setMessage('Your email has been verified successfully. You are now logged in.');
        toast.success('Email verified successfully');
      })
      .catch((error) => {
        setStatus('error');
        setMessage(error.message ?? 'Verification failed.');
      });
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-lg rounded-3xl border border-border bg-card p-8 shadow-xl">
        <div className="flex flex-col items-center gap-4 text-center">
          {status === 'loading' && (
            <div className="text-primary animate-pulse">
              <CheckCircle2 size={48} />
            </div>
          )}
          {status === 'success' && (
            <div className="text-emerald-500">
              <CheckCircle2 size={48} />
              <h1 className="mt-4 text-2xl font-semibold text-foreground">Email verified</h1>
            </div>
          )}
          {status === 'error' && (
            <div className="text-danger">
              <AlertTriangle size={48} />
              <h1 className="mt-4 text-2xl font-semibold text-foreground">Verification failed</h1>
            </div>
          )}
          <p className="text-sm text-muted-foreground">{message || 'Verifying your account...'}</p>
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              className="btn-primary rounded-full px-6 py-3"
              onClick={() => router.push('/sign-up-login-screen')}
            >
              Go to login
            </button>
            {status === 'success' && (
              <button
                type="button"
                className="btn-secondary rounded-full px-6 py-3"
                onClick={() => router.push('/dashboard')}
              >
                Go to dashboard
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
