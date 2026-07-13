import React from 'react';

type BadgeVariant = 'success' | 'danger' | 'warning' | 'info' | 'neutral' | 'primary';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

const variantClasses: Record<BadgeVariant, string> = {
  success: 'bg-success/10 text-success',
  danger: 'bg-danger/10 text-danger',
  warning: 'bg-warning/10 text-warning',
  info: 'bg-info/10 text-info',
  neutral: 'bg-muted text-muted-foreground',
  primary: 'bg-primary/10 text-primary',
};

const dotClasses: Record<BadgeVariant, string> = {
  success: 'bg-success',
  danger: 'bg-danger',
  warning: 'bg-warning',
  info: 'bg-info',
  neutral: 'bg-muted-foreground',
  primary: 'bg-primary',
};

export default function Badge({ variant = 'neutral', children, className = '', dot = false }: BadgeProps) {
  return (
    <span className={`status-badge ${variantClasses[variant]} ${className}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotClasses[variant]}`} />}
      {children}
    </span>
  );
}