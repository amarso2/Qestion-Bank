'use client';

import React from 'react';
import { Copy, LogIn } from 'lucide-react';
import { toast } from 'sonner';

interface DemoCredential {
  id: string;
  role: string;
  email: string;
  password: string;
  badge: string;
}

const demoCredentials: DemoCredential[] = [
  {
    id: 'cred-student',
    role: 'Student',
    email: 'akpandit1211@gmail.com',
    password: 'Amar123',
    badge: 'SSC CGL',
  },
  {
    id: 'cred-admin',
    role: 'Admin',
    email: 'amardipkumarpr172@gmail.com',
    password: 'Amar123',
    badge: 'Educator',
  },
];

interface DemoCredentialsProps {
  onAutofill: (email: string, password: string) => void;
}

export default function DemoCredentials({ onAutofill }: DemoCredentialsProps) {
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success(`${label} copied to clipboard`);
    });
  };

  return (
    <div className="border border-border rounded-xl p-4 bg-muted/40">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-5 h-5 rounded-full bg-info/20 flex items-center justify-center">
          <span className="text-info text-[10px] font-bold">i</span>
        </div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Demo Accounts
        </p>
      </div>

      <div className="space-y-2.5">
        {demoCredentials.map((cred) => (
          <div key={cred.id} className="bg-card rounded-lg border border-border p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-foreground">{cred.role}</span>
                <span className="status-badge bg-primary/10 text-primary text-[10px]">
                  {cred.badge}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  onAutofill(cred.email, cred.password);
                  toast.success(`${cred.role} credentials filled`);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-semibold hover:bg-primary/20 transition-colors active:scale-95 duration-150"
              >
                <LogIn size={11} />
                Use
              </button>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wide">Email</span>
                  <p className="text-xs font-medium text-foreground truncate font-mono">{cred.email}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(cred.email, 'Email')}
                  className="flex-shrink-0 p-1 rounded text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Copy email"
                >
                  <Copy size={11} />
                </button>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wide">Password</span>
                  <p className="text-xs font-medium text-foreground font-mono">{cred.password}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(cred.password, 'Password')}
                  className="flex-shrink-0 p-1 rounded text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Copy password"
                >
                  <Copy size={11} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}