import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverEffect = false,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-white dark:bg-[#12181E] rounded-3xl border border-[#E5E9EB] dark:border-[#1E262E] shadow-donezo p-6 transition-all duration-300',
        hoverEffect && 'hover:shadow-donezo-hover hover:border-[#154D3F]/40 dark:hover:border-emerald-500/40 cursor-pointer hover:-translate-y-0.5',
        className
      )}
    >
      {children}
    </div>
  );
};
