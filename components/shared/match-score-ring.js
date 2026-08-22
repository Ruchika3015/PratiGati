'use client';

import { cn } from '@/lib/utils';

export function MatchScoreRing({ score, size = 80, stroke = 6, showLabel = true, animate = true }) {
  const radius = (size - stroke * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const colorClass =
    score >= 90
      ? 'text-secondary'
      : score >= 75
      ? 'text-primary'
      : score >= 60
      ? 'text-amber-500'
      : 'text-destructive';

  const label =
    score >= 90 ? 'Highly Recommended' : score >= 75 ? 'Good Match' : score >= 60 ? 'Fair Match' : 'Low Match';

  return (
    <div className="relative inline-flex flex-col items-center" style={{ width: size }}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className={cn('transform -rotate-90', animate && 'transition-all duration-700')}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth={stroke}
            className="text-muted"
            stroke="currentColor"
            opacity={0.15}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth={stroke}
            strokeLinecap="round"
            stroke="currentColor"
            className={colorClass}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={animate ? { transition: 'stroke-dashoffset 1s ease-out' } : {}}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn('font-display font-bold', colorClass)} style={{ fontSize: size * 0.28 }}>
            {score}
          </span>
          <span className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground">Match</span>
        </div>
      </div>
      {showLabel && (
        <span className={cn('mt-1 text-[10px] font-semibold uppercase tracking-wide', colorClass)}>
          {label}
        </span>
      )}
    </div>
  );
}

export function MatchScoreBadge({ score, className }) {
  const colorClass =
    score >= 90
      ? 'bg-secondary/15 text-secondary border-secondary/30'
      : score >= 75
      ? 'bg-primary/15 text-primary border-primary/30'
      : score >= 60
      ? 'bg-amber-500/15 text-amber-500 border-amber-500/30'
      : 'bg-destructive/15 text-destructive border-destructive/30';

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-bold',
        colorClass,
        className
      )}
    >
      {score}% MATCH
    </span>
  );
}
