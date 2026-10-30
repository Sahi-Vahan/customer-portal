import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'teal' | 'navy';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  icon,
  className = ''
}) => {
  const sizeStyles = {
    sm: 'text-[10px] px-2.5 py-0.5 gap-1 font-bold uppercase tracking-wider',
    md: 'text-xs px-3 py-1 gap-1.5 font-bold'
  };

  const variantStyles = {
    success: 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800',
    warning: 'bg-amber-50 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300 border border-amber-200 dark:border-amber-800',
    danger: 'bg-rose-50 text-rose-800 dark:bg-rose-950/50 dark:text-rose-300 border border-rose-200 dark:border-rose-800',
    info: 'bg-sky-50 text-sky-800 dark:bg-sky-950/50 dark:text-sky-300 border border-sky-200 dark:border-sky-800',
    neutral: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700',
    teal: 'bg-[#E8F5EE] text-[#154D3F] dark:bg-[#154D3F]/40 dark:text-emerald-300 border border-[#CBEAD8] dark:border-emerald-600/30',
    navy: 'bg-[#154D3F] text-white border border-[#0F382E]'
  };

  return (
    <span className={cn('inline-flex items-center rounded-full', sizeStyles[size], variantStyles[variant], className)}>
      {icon && <span className="flex-shrink-0 inline-flex items-center">{icon}</span>}
      <span className="inline-flex items-center">{children}</span>
    </span>
  );
};
