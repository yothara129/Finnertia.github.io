import React, { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => (
  <div className={cn("bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden", className)}>
    {children}
  </div>
);

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

export const Input = ({ label, className, ...props }: InputProps) => (
  <div className="space-y-1.5">
    {label && <label className="text-sm font-medium text-slate-700 block">{label}</label>}
    <input
      className={cn(
        "w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all",
        className
      )}
      {...props}
    />
  </div>
);

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  suffix?: string;
  prefix?: string;
}

export const Slider = ({ label, value, min, max, step = 1, onChange, suffix = '', prefix = '' }: SliderProps) => (
  <div className="space-y-3">
    <div className="flex justify-between items-center">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
        {prefix}{value}{suffix}
      </span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
    />
  </div>
);

export const Button = ({ children, className, variant = 'primary', ...props }: { children: ReactNode, className?: string, variant?: 'primary' | 'secondary' | 'outline' } & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const variants = {
    primary: "bg-emerald-600 text-white hover:bg-emerald-700",
    secondary: "bg-slate-900 text-white hover:bg-slate-800",
    outline: "bg-transparent border border-slate-300 text-slate-700 hover:bg-slate-50"
  };
  
  return (
    <button 
      className={cn(
        "px-4 py-2.5 rounded-lg font-medium transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
