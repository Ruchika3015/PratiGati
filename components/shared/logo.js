import { cn } from '@/lib/utils';

export function Logo({ className, showText = true, size = 'md' }) {
  const sizes = {
    sm: { box: 'h-8 w-8', text: 'text-lg', icon: 18 },
    md: { box: 'h-10 w-10', text: 'text-xl', icon: 22 },
    lg: { box: 'h-14 w-14', text: 'text-3xl', icon: 30 },
  };
  const s = sizes[size] || sizes.md;

  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <div
        className={cn(
          'relative flex items-center justify-center rounded-lg bg-primary text-primary-foreground',
          s.box
        )}
      >
        <svg
          width={s.icon}
          height={s.icon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 17l4-4 4 2 6-6" />
          <path d="M21 7l-4 4" />
          <circle cx="3" cy="17" r="1.5" fill="currentColor" />
          <circle cx="21" cy="7" r="1.5" fill="currentColor" />
          <path d="M14 3l3 0l0 3" />
          <path d="M17 3l-4 4" />
        </svg>
      </div>
      {showText && (
        <div className="flex flex-col leading-none">
          <span className={cn('font-display font-bold tracking-tight', s.text)}>
            PRATIGATI
          </span>
          {size !== 'sm' && (
            <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground mt-0.5">
              Predictive Freight Intelligence
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export function LogoMark({ className, size = 40 }) {
  return (
    <div
      className={cn(
        'relative flex items-center justify-center rounded-lg bg-primary text-primary-foreground',
        className
      )}
      style={{ height: size, width: size }}
    >
      <svg
        width={size * 0.55}
        height={size * 0.55}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 17l4-4 4 2 6-6" />
        <path d="M21 7l-4 4" />
        <circle cx="3" cy="17" r="1.5" fill="currentColor" />
        <circle cx="21" cy="7" r="1.5" fill="currentColor" />
      </svg>
    </div>
  );
}
