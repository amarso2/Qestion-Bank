import React from 'react';
import LoginForm from '../sign-up-login-screen/components/LoginForm';
import AuthBrandPanel from '../sign-up-login-screen/components/AuthBrandPanel';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.2),_transparent_60%)] bg-slate-50">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-12 lg:px-8">
        <div className="w-full overflow-hidden rounded-[2rem] border border-slate-200 bg-white/90 shadow-2xl shadow-slate-900/10 backdrop-blur">
          <div className="grid gap-10 p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-12">
            <AuthBrandPanel />
            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-8">
              <LoginForm onSwitchToSignup={() => {}} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
