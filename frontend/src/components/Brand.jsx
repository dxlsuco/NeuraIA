import { ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '../utils/cn';
import { BRAND } from './brandTokens';

export function BrandLogo({ className, markClassName, textClassName, onClick, light = false }) {
  const Comp = onClick ? 'button' : 'div';

  return (
    <Comp
      onClick={onClick}
      className={cn('flex items-center gap-2.5 transition-opacity hover:opacity-85', className)}
    >
      <span
        className={cn(
          'flex h-9 w-9 items-center justify-center rounded-2xl text-white shadow-lg shadow-blue-500/20',
          markClassName,
        )}
        style={{ background: BRAND.gradient }}
      >
        <Sparkles size={17} strokeWidth={2.4} />
      </span>
      <span className={cn('text-xl font-extrabold tracking-tight', light ? 'text-white' : 'text-slate-950', textClassName)}>
        Neura
      </span>
    </Comp>
  );
}

const badgeTones = {
  blue: 'bg-blue-50 text-blue-700 border-blue-100',
  violet: 'bg-violet-50 text-violet-700 border-violet-100',
  teal: 'bg-teal-50 text-teal-700 border-teal-100',
  sage: 'bg-sage-50 text-sage-700 border-sage-100',
};

export function SectionBadge({ children, icon: Icon = Sparkles, tone = 'blue', className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium',
        badgeTones[tone] ?? badgeTones.blue,
        className,
      )}
    >
      <Icon size={15} />
      {children}
    </span>
  );
}

export function PrimaryButton({ children, className, showArrow = true, ...props }) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-xl transition-all duration-200 hover:scale-105 hover:shadow-blue-500/30 active:scale-95 disabled:pointer-events-none disabled:opacity-60',
        className,
      )}
      style={{ background: BRAND.gradient }}
      {...props}
    >
      {children}
      {showArrow && <ArrowRight size={16} />}
    </button>
  );
}

export function SecondaryButton({ children, className, ...props }) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-all duration-200 hover:border-violet-300 hover:bg-violet-50 hover:text-violet-600 active:scale-95',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
