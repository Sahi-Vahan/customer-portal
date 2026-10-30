import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'white' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold transition-all duration-200 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none active:scale-[0.98] hover:scale-[1.01]';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-xs px-5 py-2.5 gap-2',
    lg: 'text-sm px-7 py-3.5 gap-2.5 shadow-md'
  };

  const variantStyles = {
    primary: 'bg-[#154D3F] hover:bg-[#0F382E] text-white shadow-sm focus:ring-[#154D3F]/40 shadow-[#154D3F]/20',
    secondary: 'bg-slate-900 hover:bg-slate-950 dark:bg-slate-800 dark:hover:bg-slate-700 text-white focus:ring-slate-800',
    outline: 'border border-[#E5E9EB] dark:border-[#1E262E] hover:border-[#154D3F] dark:hover:border-emerald-500 text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/80 bg-white dark:bg-[#12181E] focus:ring-[#154D3F]',
    ghost: 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 focus:ring-slate-400',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white focus:ring-rose-500 shadow-sm',
    white: 'bg-white hover:bg-emerald-50 text-[#154D3F] border border-white/80 shadow-md focus:ring-white/50',
    glass: 'bg-white/10 hover:bg-white/20 text-white border border-white/25 backdrop-blur-md focus:ring-white/30'
  };

  return (
    <button
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : leftIcon ? (
        <span className="flex-shrink-0 inline-flex items-center">{leftIcon}</span>
      ) : null}
      <span className="inline-flex items-center">{children}</span>
      {!isLoading && rightIcon ? <span className="flex-shrink-0 inline-flex items-center">{rightIcon}</span> : null}
    </button>
  );
};
