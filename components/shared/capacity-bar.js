'use client';

import { cn } from '@/lib/utils';

export function CapacityBar({ used, total, unit = 'Tons', label, className, showValues = true }) {
  const percentage = total > 0 ? Math.round((used / total) * 100) : 0;
  const colorClass =
    percentage >= 90
      ? 'bg-secondary'
      : percentage >= 60
      ? 'bg-accent'
      : percentage >= 30
      ? 'bg-amber-500'
      : 'bg-destructive';

  return (
    <div className={cn('w-full', className)}>
      {(label || showValues) && (
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">
            {label || 'Capacity Utilization'}
          </span>
          {showValues && (
            <span className="text-xs font-bold tabular-nums">
              {used} / {total} {unit}
            </span>
          )}
        </div>
      )}
      <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={cn('absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out', colorClass)}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showValues && (
        <div className="mt-1 text-right">
          <span className="text-xs font-bold text-primary">{percentage}% UTILIZED</span>
        </div>
      )}
    </div>
  );
}

export function CapacityBarMulti({ loads, totalCapacity, unit = 'Tons' }) {
  const total = loads.reduce((sum, l) => sum + l.amount, 0);
  const percentage = totalCapacity > 0 ? Math.round((total / totalCapacity) * 100) : 0;
  const colors = ['bg-primary', 'bg-secondary', 'bg-chart-3', 'bg-chart-4'];

  let cumulative = 0;

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">Partial Load Breakdown</span>
        <span className="text-xs font-bold tabular-nums">
          {total} / {totalCapacity} {unit}
        </span>
      </div>
      <div className="relative h-4 w-full overflow-hidden rounded-md bg-muted">
        {loads.map((load, i) => {
          const width = (load.amount / totalCapacity) * 100;
          const left = (cumulative / totalCapacity) * 100;
          cumulative += load.amount;
          return (
            <div
              key={i}
              className={cn('absolute inset-y-0 transition-all duration-500', colors[i % colors.length])}
              style={{
                left: `${left}%`,
                width: `${width}%`,
                borderRight: i < loads.length - 1 ? '1px solid hsl(var(--background))' : 'none',
              }}
            />
          );
        })}
      </div>
      <div className="mt-1 text-right">
        <span className="text-xs font-bold text-primary">{percentage}% CAPACITY UTILIZED</span>
      </div>
      <div className="mt-2 space-y-1">
        {loads.map((load, i) => (
          <div key={i} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className={cn('h-2.5 w-2.5 rounded-sm', colors[i % colors.length])} />
              <span className="font-medium">{load.label}</span>
            </div>
            <span className="font-bold tabular-nums">{load.amount} {unit}</span>
          </div>
        ))}
        <div className="flex items-center justify-between border-t border-border pt-1 text-xs font-bold">
          <span>Total Used</span>
          <span className="tabular-nums">{total} / {totalCapacity} {unit}</span>
        </div>
      </div>
    </div>
  );
}
