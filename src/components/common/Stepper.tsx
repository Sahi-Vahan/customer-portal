import React from 'react';
import { Check } from 'lucide-react';

export interface Step {
  id: number;
  title: string;
  subtitle?: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export const Stepper: React.FC<StepperProps> = ({ steps, currentStep, onStepClick }) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {steps.map((step) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;
          const isClickable = onStepClick && step.id <= currentStep;

          return (
            <button
              key={step.id}
              type="button"
              disabled={!isClickable}
              onClick={() => isClickable && onStepClick(step.id)}
              className={`text-left group transition-all select-none ${
                isClickable ? 'cursor-pointer' : 'cursor-default'
              }`}
            >
              {/* Segmented Progress Line */}
              <div className="h-1.5 w-full rounded-full overflow-hidden bg-slate-200/90 dark:bg-slate-800 transition-colors">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    isCompleted
                      ? 'bg-emerald-600 dark:bg-emerald-500 w-full'
                      : isCurrent
                      ? 'bg-[#154D3F] dark:bg-emerald-400 w-full shadow-xs'
                      : 'w-0'
                  }`}
                />
              </div>

              {/* Step Label */}
              <div className="mt-1.5 flex items-center gap-1">
                {isCompleted ? (
                  <span className="w-3.5 h-3.5 rounded-full bg-emerald-600 dark:bg-emerald-500 text-white flex items-center justify-center flex-shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                ) : (
                  <span
                    className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[10px] font-black flex-shrink-0 ${
                      isCurrent
                        ? 'bg-[#154D3F] dark:bg-emerald-500 text-white'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                    }`}
                  >
                    {step.id}
                  </span>
                )}
                <span
                  className={`text-[11px] sm:text-xs truncate font-bold tracking-tight ${
                    isCurrent
                      ? 'text-[#154D3F] dark:text-emerald-400'
                      : isCompleted
                      ? 'text-slate-800 dark:text-slate-300'
                      : 'text-slate-400 dark:text-slate-500'
                  }`}
                >
                  {step.title}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
