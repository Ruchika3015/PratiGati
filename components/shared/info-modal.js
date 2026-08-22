'use client';

import { useEffect } from 'react';
import {
  Brain,
  Search,
  GitMerge,
  MapPin,
  Truck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Route,
  Leaf,
  IndianRupee,
  Activity,
  X,
  TrendingUp,
} from 'lucide-react';

const HOW_IT_WORKS_STEPS = [
  { num: '01', icon: Brain, title: 'Predict', desc: 'Unused return capacity is predicted using historical patterns and live signals.' },
  { num: '02', icon: Search, title: 'Discover', desc: 'Relevant shipment demand is identified along the return corridor.' },
  { num: '03', icon: GitMerge, title: 'Match', desc: 'Truck capacity and shipment requirements are matched based on route, time and load.' },
  { num: '04', icon: Route, title: 'Optimize', desc: 'Route and load are optimized for maximum utilization and minimum empty kilometers.' },
  { num: '05', icon: MapPin, title: 'Track', desc: 'Live GPS tracking monitors location, ETA and route status throughout the journey.' },
  { num: '06', icon: Truck, title: 'Return Loaded', desc: 'The truck returns with a compatible shipment instead of travelling empty.' },
];

const RESULT_METRICS = [
  { label: 'EMPTY KM', value: 'Reduced', direction: 'down', icon: Route },
  { label: 'FUEL', value: 'Saved', direction: 'down', icon: IndianRupee },
  { label: 'RETURN EARNINGS', value: 'Increased', direction: 'up', icon: TrendingUp },
];

const FEATURES = [
  { icon: GitMerge, title: 'Smart Return Matching', desc: 'Match unused truck capacity with nearby shipment demand automatically.', tag: 'Benefit', tagColor: 'primary' },
  { icon: Brain, title: 'Predictive Capacity Intelligence', desc: 'Predict where unused return capacity will be available before the truck is even empty.', tag: 'Innovation', tagColor: 'primary' },
  { icon: Route, title: 'Route & Load Optimization', desc: 'Improve utilization and reduce unnecessary empty kilometers with partial-load matching.', tag: 'Benefit', tagColor: 'primary' },
  { icon: MapPin, title: 'Live GPS Tracking', desc: 'Track active shipments and trucks in real time with location, ETA and route status.', tag: 'Benefit', tagColor: 'primary' },
  { icon: Activity, title: 'Real-Time Alerts & Insights', desc: 'Get intelligent alerts and actionable insights to make faster, smarter decisions.', tag: 'Innovation', tagColor: 'primary' },
  { icon: Leaf, title: 'Environmental Impact', desc: 'Reduce fuel waste and CO₂ emissions by reducing empty return trips.', tag: 'Impact', tagColor: 'secondary' },
];

const IMPACT_STATS = [
  { value: '₹3,180', label: 'Estimated savings', color: 'text-primary' },
  { value: '185 KM', label: 'Empty distance avoided', color: 'text-foreground' },
  { value: '82 KG', label: 'CO₂ reduced', color: 'text-secondary' },
  { value: '87%', label: 'Capacity utilization', color: 'text-foreground' },
];

export function InfoModal({ open, onClose, type }) {
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 animate-backdrop-in bg-black/70 backdrop-blur-md" onClick={onClose} />
      <div className="relative z-10 w-full max-w-4xl animate-modal-in overflow-hidden rounded-2xl border border-border bg-card shadow-[0_30px_120px_-20px_rgba(0,0,0,0.5)]">
        <div className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:linear-gradient(hsl(var(--grid-line)/0.5)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--grid-line)/0.5)_1px,transparent_1px)] [background-size:32px_32px]" />
        <div className="pointer-events-none absolute -top-20 left-1/2 h-60 w-96 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />

        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-muted/30 text-muted-foreground transition-all hover:border-primary/40 hover:text-foreground"
          aria-label="Close"
        >
          <X className="h-4.5 w-4.5" />
        </button>

        <div className="relative max-h-[88vh] overflow-y-auto scrollbar-thin px-6 py-8 sm:px-10 sm:py-10">
          {type === 'how' && <HowItWorksContent />}
          {type === 'features' && <FeaturesContent />}
          {type === 'impact' && <ImpactContent />}
        </div>
      </div>
    </div>
  );
}

function HowItWorksContent() {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
        <Sparkles className="h-3.5 w-3.5" /> The Process
      </div>
      <h2 className="font-display text-3xl font-bold tracking-[-0.03em] text-foreground sm:text-4xl">How PratiGati Works</h2>
      <p className="mt-2 max-w-xl text-sm text-muted-foreground">
        A predictive freight-capacity intelligence platform that follows five steps from empty capacity to a loaded, profitable return.
      </p>

      {/* Desktop: horizontal process timeline */}
      <div className="mt-10 hidden lg:block">
        <div className="flex items-stretch">
          {HOW_IT_WORKS_STEPS.map((step, i) => (
            <div key={step.num} className="flex flex-1 items-stretch">
              {/* Step block */}
              <div className="group flex flex-1 flex-col items-center text-center">
                {/* Number badge */}
                <span className="mb-3 flex h-6 w-6 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-[10px] font-bold text-primary">
                  {step.num}
                </span>
                {/* Icon with glow */}
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/25 bg-primary/[0.08] transition-all group-hover:border-primary/50 group-hover:bg-primary/[0.12]">
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-primary/20 opacity-0 blur-xl transition-opacity group-hover:opacity-100" />
                  <step.icon className="relative h-6 w-6 text-primary" />
                </div>
                {/* Title */}
                <h3 className="mt-4 font-display text-sm font-bold uppercase tracking-wide text-foreground">{step.title}</h3>
                {/* Description */}
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{step.desc}</p>
              </div>
              {/* Connector between steps */}
              {i < HOW_IT_WORKS_STEPS.length - 1 && (
                <div className="flex items-center px-1" style={{ marginTop: '2.25rem' }}>
                  <div className="relative h-[2px] w-12 overflow-hidden rounded-full bg-accent">
                    <div className="absolute inset-0 animate-flow-right bg-white/30" />
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-secondary/60" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile/tablet: vertical timeline */}
      <div className="mt-8 lg:hidden">
        <div className="flex flex-col">
          {HOW_IT_WORKS_STEPS.map((step, i) => (
            <div key={step.num} className="flex items-start gap-3">
              {/* Left: icon + connector */}
              <div className="flex flex-col items-center">
                <span className="mb-2 flex h-5 w-5 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-[9px] font-bold text-primary">
                  {step.num}
                </span>
                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-primary/25 bg-primary/[0.08]">
                  <step.icon className="h-5 w-5 text-primary" />
                </div>
                {i < HOW_IT_WORKS_STEPS.length - 1 && (
                  <div className="relative my-1 h-8 w-[2px] overflow-hidden rounded-full bg-accent">
                    <div className="absolute inset-0 animate-flow-down bg-white/30" />
                  </div>
                )}
              </div>
              {/* Right: text */}
              <div className="flex-1 pb-2 pt-1">
                <h3 className="font-display text-sm font-bold uppercase tracking-wide text-foreground">{step.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Result section */}
      <div className="mt-8 overflow-hidden rounded-xl border border-border bg-muted/20">
        <div className="border-b border-border bg-primary/[0.06] px-5 py-3">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-primary">
            <CheckCircle2 className="h-4 w-4 text-secondary" /> Result
          </div>
        </div>
        <div className="px-5 py-4">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Every loaded return journey saves fuel, reduces empty kilometers, cuts logistics costs, and lowers CO₂ emissions — turning wasted capacity into value.
          </p>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {RESULT_METRICS.map((metric, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg border border-border bg-card/50 px-4 py-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <metric.icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">{metric.label}</p>
                  <p className={`text-sm font-bold ${metric.direction === 'up' ? 'text-secondary' : 'text-primary'}`}>
                    {metric.direction === 'up' ? '↑' : '↓'} {metric.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FeaturesContent() {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
        <Sparkles className="h-3.5 w-3.5" /> Capabilities
      </div>
      <h2 className="font-display text-3xl font-bold tracking-[-0.03em] text-foreground sm:text-4xl">How PratiGati Creates Impact</h2>
      <p className="mt-2 max-w-xl text-sm text-muted-foreground">
        Six core capabilities that make PratiGati a complete predictive freight intelligence platform.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f, i) => (
          <div
            key={i}
            className="group flex h-full flex-col rounded-xl border border-border bg-muted/20 p-5 transition-all hover:border-primary/30 hover:bg-muted/40"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/[0.08]">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <span className={`rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${f.tagColor === 'primary' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'}`}>{f.tag}</span>
            </div>
            <h3 className="font-display text-base font-bold text-foreground">{f.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ImpactContent() {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
        <Leaf className="h-3.5 w-3.5" /> Measurable Impact
      </div>
      <h2 className="font-display text-3xl font-bold tracking-[-0.03em] text-foreground sm:text-4xl">The PratiGati Impact</h2>
      <p className="mt-2 max-w-xl text-sm text-muted-foreground">
        Every matched return trip creates economic and environmental value across the freight network.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {IMPACT_STATS.map((stat, i) => (
          <div key={i} className="rounded-xl border border-border bg-muted/20 p-5 text-center">
            <p className={`font-display text-3xl font-bold tracking-[-0.04em] sm:text-4xl ${stat.color}`}>{stat.value}</p>
            <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-destructive/20 bg-destructive/[0.04] p-5">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-destructive/80">Before PratiGati</p>
          <div className="flex items-center gap-3 text-sm">
            <span className="rounded-lg border border-border bg-muted/30 px-3 py-2 font-semibold text-muted-foreground">Delivery</span>
            <ArrowRight className="h-4 w-4 text-destructive/50" />
            <span className="rounded-lg border border-destructive/20 bg-destructive/[0.06] px-3 py-2 font-semibold text-destructive">Empty Return</span>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Trucks return empty. Revenue lost. Fuel wasted. Emissions increased.</p>
        </div>
        <div className="rounded-xl border border-primary/25 bg-primary/[0.06] p-5">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-primary">After PratiGati</p>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="rounded-lg border border-border bg-muted/30 px-3 py-2 font-semibold text-muted-foreground">Delivery</span>
            <ArrowRight className="h-4 w-4 text-primary/60" />
            <span className="rounded-lg border border-primary/20 bg-primary/[0.08] px-3 py-2 font-semibold text-primary">Predict</span>
            <ArrowRight className="h-4 w-4 text-primary/60" />
            <span className="rounded-lg border border-primary/20 bg-primary/[0.08] px-3 py-2 font-semibold text-primary">Match</span>
            <ArrowRight className="h-4 w-4 text-secondary/60" />
            <span className="rounded-lg border border-secondary/20 bg-secondary/[0.08] px-3 py-2 font-semibold text-secondary">Loaded Return</span>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Trucks return loaded. Revenue earned. Fuel saved. Emissions reduced.</p>
        </div>
      </div>
    </div>
  );
}
