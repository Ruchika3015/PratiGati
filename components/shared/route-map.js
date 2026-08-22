'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { CITIES, CITY_MAP } from '@/lib/cities';

function getCityById(id) {
  return CITY_MAP[id] || CITIES[0];
}

export function RouteMap({
  routes = [],
  highlightedRoute = null,
  showAllCities = true,
  showHeatmap = false,
  predictions = [],
  className,
  animated = true,
  height = 320,
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const width = 100;
  const mapHeight = 100;

  return (
    <div
      className={cn('relative overflow-hidden rounded-lg route-grid-bg bg-card border border-border', className)}
      style={{ height }}
    >
      <svg
        viewBox={`0 0 ${width} ${mapHeight}`}
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="route-line" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--secondary))" />
          </linearGradient>
          <linearGradient id="route-highlight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="1" />
            <stop offset="50%" stopColor="hsl(35, 95%, 60%)" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="1" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background corridor lines */}
        {routes.map((route, i) => {
          const from = getCityById(route.from);
          const to = getCityById(route.to);
          if (!from || !to) return null;
          const isHighlighted =
            highlightedRoute &&
            highlightedRoute.from === route.from &&
            highlightedRoute.to === route.to;
          return (
            <g key={`route-${i}`}>
              <line
                x1={from.gridX}
                y1={from.gridY}
                x2={to.gridX}
                y2={to.gridY}
                stroke={isHighlighted ? 'url(#route-highlight)' : 'hsl(var(--muted-foreground) / 0.25)'}
                strokeWidth={isHighlighted ? 1.2 : 0.5}
                strokeLinecap="round"
                className={cn(isHighlighted && animated && 'animate-route-dash')}
                filter={isHighlighted ? 'url(#glow)' : undefined}
              />
            </g>
          );
        })}

        {/* Prediction heatmap circles */}
        {showHeatmap &&
          predictions.map((pred, i) => {
            const from = getCityById(pred.route.from);
            const to = getCityById(pred.route.to);
            if (!from || !to) return null;
            const midX = (from.gridX + to.gridX) / 2;
            const midY = (from.gridY + to.gridY) / 2;
            const radius = 4 + (pred.predictedCapacity / 68) * 8;
            const color =
              pred.demandLevel === 'high'
                ? 'hsl(var(--destructive) / 0.25)'
                : pred.demandLevel === 'medium'
                ? 'hsl(35, 80%, 50% / 0.2)'
                : 'hsl(var(--secondary) / 0.2)';
            const strokeColor =
              pred.demandLevel === 'high'
                ? 'hsl(var(--destructive) / 0.5)'
                : pred.demandLevel === 'medium'
                ? 'hsl(35, 80%, 50% / 0.5)'
                : 'hsl(var(--secondary) / 0.5)';
            return (
              <g key={`pred-${i}`}>
                <circle
                  cx={midX}
                  cy={midY}
                  r={radius}
                  fill={color}
                  stroke={strokeColor}
                  strokeWidth="0.3"
                  className={cn(mounted && 'animate-pulse-soft')}
                />
              </g>
            );
          })}

        {/* City markers */}
        {showAllCities &&
          CITIES.map((city) => {
            const isRouteEndpoint =
              routes.some((r) => r.from === city.id || r.to === city.id) ||
              (highlightedRoute &&
                (highlightedRoute.from === city.id || highlightedRoute.to === city.id));
            return (
              <g key={city.id}>
                {isRouteEndpoint && (
                  <circle
                    cx={city.gridX}
                    cy={city.gridY}
                    r="2.5"
                    fill="hsl(var(--primary) / 0.2)"
                    className="animate-pulse-ring"
                  />
                )}
                <circle
                  cx={city.gridX}
                  cy={city.gridY}
                  r={isRouteEndpoint ? 1.2 : 0.8}
                  fill={isRouteEndpoint ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground) / 0.5)'}
                  stroke="hsl(var(--background))"
                  strokeWidth="0.3"
                />
                <text
                  x={city.gridX}
                  y={city.gridY - 2}
                  textAnchor="middle"
                  fontSize="2"
                  fill={isRouteEndpoint ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground) / 0.7)'}
                  fontWeight={isRouteEndpoint ? '600' : '400'}
                  className="select-none"
                >
                  {city.name}
                </text>
              </g>
            );
          })}
      </svg>

      {/* Legend overlay */}
      {showHeatmap && (
        <div className="absolute bottom-2 right-2 flex items-center gap-3 rounded-md border border-border bg-card/90 px-2.5 py-1.5 text-[10px] backdrop-blur">
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-secondary/50" />
            <span className="text-muted-foreground">Low</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-amber-500/50" />
            <span className="text-muted-foreground">Med</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-destructive/50" />
            <span className="text-muted-foreground">High</span>
          </div>
        </div>
      )}
    </div>
  );
}

export function RouteLine({ from, to, animated = true, className, showTruck = true }) {
  const fromCity = getCityById(from);
  const toCity = getCityById(to);

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className="font-medium">{fromCity?.name || from}</span>
      <div className="relative flex-1 h-px min-w-[24px]">
        <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 100 4" preserveAspectRatio="none">
          <line
            x1="0"
            y1="2"
            x2="100"
            y2="2"
            stroke="hsl(var(--primary))"
            strokeWidth="1.5"
            strokeLinecap="round"
            className={cn(animated && 'animate-route-dash')}
          />
        </svg>
        {showTruck && (
          <svg
            className="absolute top-1/2 -translate-y-1/2 text-primary"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{ left: 'calc(50% - 7px)' }}
          >
            <path d="M1 3h15v13H1z" fill="currentColor" fillOpacity="0.2" />
            <path d="M16 8h4l3 3v5h-7V8z" />
            <circle cx="5.5" cy="18.5" r="2.5" fill="currentColor" />
            <circle cx="18.5" cy="18.5" r="2.5" fill="currentColor" />
          </svg>
        )}
      </div>
      <span className="font-medium">{toCity?.name || to}</span>
    </div>
  );
}
