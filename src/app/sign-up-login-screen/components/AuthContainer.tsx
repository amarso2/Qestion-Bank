'use client';

import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import AuthBrandPanel from './AuthBrandPanel';

export default function AuthContainer() {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left brand panel */}
      <AuthBrandPanel />

      {/* Right form panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 lg:px-16 min-h-screen overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Logo mobile */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
              <span className="text-white font-bold text-base">E</span>
            </div>
            <span className="font-bold text-xl text-foreground">ExamPeakAI</span>
          </div>

          {/* Tab switcher */}
          <div className="flex bg-muted rounded-xl p-1 mb-8">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                activeTab === 'login' ?'bg-card text-foreground shadow-card' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                activeTab === 'signup' ?'bg-card text-foreground shadow-card' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Form */}
          <div className="fade-in">
            {activeTab === 'login' ? (
              <LoginForm onSwitchToSignup={() => setActiveTab('signup')} />
            ) : (
              <SignUpForm onSwitchToLogin={() => setActiveTab('login')} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}