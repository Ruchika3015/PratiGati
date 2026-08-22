'use client';

import { cn } from '@/lib/utils';

export function KpiCard({ icon: Icon, label, value, unit, trend, trendUp = true, accent = 'primary', subtitle }) {
  const accentClasses = {
    primary: 'bg-primary/15 text-primary',
    secondary: 'bg-secondary/15 text-secondary',
    amber: 'bg-amber-500/15 text-amber-500',
    destructive: 'bg-destructive/15 text-destructive',
    blue: 'bg-primary/15 text-primary',
  };

  return (
    <div className="group relative overflow-hidden rounded-lg border border-border bg-card p-3.5 transition-all hover:border-primary/30 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            {label}
          </p>
          <div className="mt-1.5 flex items-baseline gap-1">
            <span className="font-display text-2xl font-bold tabular-nums">{value}</span>
            {unit && <span className="text-xs font-medium text-muted-foreground">{unit}</span>}
          </div>
          {subtitle && (
            <p className="mt-0.5 text-[11px] text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {Icon && (
          <div className={cn('flex h-9 w-9 items-center justify-center rounded-md', accentClasses[accent])}>
            <Icon className="h-4.5 w-4.5" />
          </div>
        )}
      </div>
      {trend && (
        <div className="mt-2 flex items-center gap-1 text-[11px]">
          <span className={cn('font-semibold', trendUp ? 'text-secondary' : 'text-destructive')}>
            {trendUp ? '↑' : '↓'} {trend}
          </span>
          <span className="text-muted-foreground">vs last week</span>
        </div>
      )}
    </div>
  );
}

export function StatCard({ icon: Icon, label, value, unit, color = 'primary' }) {
  const colorMap = {
    primary: 'text-primary bg-primary/10',
    secondary: 'text-secondary bg-secondary/10',
    amber: 'text-amber-500 bg-amber-500/10',
    destructive: 'text-destructive bg-destructive/10',
    blue: 'text-blue-500 bg-blue-500/10',
  };

  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
      {Icon && (
        <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg', colorMap[color])}>
          <Icon className="h-5 w-5" />
        </div>
      )}
      <div>
        <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
        <div className="flex items-baseline gap-1">
          <span className="font-display text-lg font-bold tabular-nums">{value}</span>
          {unit && <span className="text-xs text-muted-foreground">{unit}</span>}
        </div>
      </div>
    </div>
  );
}
