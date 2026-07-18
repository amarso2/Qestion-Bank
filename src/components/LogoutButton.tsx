'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

interface LogoutButtonProps {
  collapsed?: boolean;
  className?: string;
}

export default function LogoutButton({ collapsed = false, className = '' }: LogoutButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        toast.error('Failed to logout');
        setIsLoading(false);
        return;
      }

      toast.success('Logged out successfully');
      setIsLoading(false);
      router.push('/login');
    } catch (error) {
      toast.error('Unable to logout. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className={`nav-item ${collapsed ? 'justify-center px-2' : ''} ${className}`}
      aria-label="Logout"
    >
      <LogOut size={18} />
      {!collapsed && <span className="flex-1">Logout</span>}
    </button>
  );
}
