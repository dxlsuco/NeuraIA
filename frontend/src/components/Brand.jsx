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
          'flex h-9 w-9 items-center justify-center rounded-2xl text-white shadow-lg shadow-teal-400/25 ring-1 ring-white/40',
          markClassName,
        )}
        style={{ background: BRAND.gradient }}
      >
        <Sparkles size={17} strokeWidth={2.4} />
      </span>
      <span className={cn('font-display text-xl font-extrabold tracking-normal', light ? 'text-white' : 'text-neura-text', textClassName)}>
        Neura
      </span>
    </Comp>
  );
}

const badgeTones = {
  blue: 'bg-neura-primary/15 text-teal-700 border-neura-primary/25',
  violet: 'bg-neura-secondary/10 text-blue-600 border-neura-secondary/25',
  teal: 'bg-neura-accent/15 text-violet-500 border-neura-accent/30',
  sage: 'bg-neura-accent2/20 text-orange-600 border-neura-accent2/40',
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
        'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-teal-400/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-teal-400/30 active:scale-95 disabled:pointer-events-none disabled:opacity-60',
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
        'inline-flex items-center justify-center gap-2 rounded-full border border-neura-line bg-white/85 px-6 py-3 text-sm font-semibold text-neura-text shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-neura-secondary hover:bg-sky-50 hover:text-teal-700 active:scale-95',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
