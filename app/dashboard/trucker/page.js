'use client';

import {
  IndianRupee,
  Gauge,
  Route,
  Leaf,
  Truck,
  Navigation,
  ArrowRight,
  CheckCircle2,
  Activity,
  AlertCircle,
  MapPin,
  TrendingUp,
} from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { useAuth } from '@/lib/auth-context';
import { useI18n } from '@/lib/i18n';
import { MATCHES, TRIPS, getCityName, formatCurrency } from '@/lib/mock-data';
import { toast } from 'sonner';

export default function TruckerDashboard() {
  const { user } = useAuth();
  const { t } = useI18n();
  const p = user?.profile || {};

  const topMatches = MATCHES.slice(0, 2);
  const upcomingTrips = TRIPS.filter((trip) => trip.status === 'upcoming').slice(0, 2);
  const recentTrips = TRIPS.filter((trip) => trip.status === 'completed').slice(0, 3);

  const handleAccept = (match) => {
    toast.success(`Match accepted: ${getCityName(match.route.from)} → ${getCityName(match.route.to)}`, {
      description: `Estimated earnings: ${formatCurrency(match.estimatedEarnings)}`,
    });
  };

  return (
    <DashboardLayout role="trucker" title={t('controlCenter')} subtitle={t('logisticsOverview')}>
      <div className="p-5 lg:p-8">
        {/* KPI Row */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <KpiCard icon={IndianRupee} label={t('earningsLabel')} value="₹2.8L" subtitle="₹89K from return trips" glow="violet" />
          <KpiCard icon={Gauge} label={t('capacityUtilization')} value="78%" subtitle="Target: 85%" glow="cyan" />
          <KpiCard icon={Route} label={t('emptyKmAvoided')} value="1,840" unit="km" subtitle="Last 30 days" glow="blue" />
          <KpiCard icon={Leaf} label={t('co2Saved')} value="642" unit="kg" subtitle="Environmental impact" glow="green" />
        </div>

        {/* Main 2-column area */}
        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {/* LEFT — Current Journey */}
          <div className="lg:col-span-2">
            <JourneyVisualization profile={p} topMatch={topMatches[0]} onAccept={handleAccept} />
          </div>

          {/* RIGHT — Recommended Matches */}
          <div className="space-y-4">
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display text-xl font-bold lg:text-[22px]">{t('recommendedMatches')}</h2>
                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-bold text-primary">{topMatches.length} NEW</span>
              </div>
              <div className="space-y-3">
                {topMatches.map((match) => (
                  <MatchCard key={match.id} match={match} onAccept={handleAccept} />
                ))}
              </div>
              <a
                href="/dashboard/trucker/matches"
                className="mt-4 flex items-center justify-center gap-1.5 text-sm font-semibold text-primary transition-opacity hover:opacity-80"
              >
                View All Matches <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom — compact upcoming + recent */}
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-display text-lg font-bold lg:text-xl">{t('upcomingTrips')}</h2>
              <a href="/dashboard/trucker/trips" className="text-sm font-semibold text-primary hover:opacity-80">View all</a>
            </div>
            <div className="space-y-2.5">
              {upcomingTrips.map((trip) => (
                <div key={trip.id} className="flex items-center gap-3 rounded-xl border border-border bg-card/50 p-3.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Navigation className="h-[18px] w-[18px]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[15px] font-semibold">{getCityName(trip.route.from)} → {getCityName(trip.route.to)}</p>
                    <p className="text-xs text-muted-foreground">{trip.shipmentType} · {trip.weight}T · {trip.date}</p>
                  </div>
                  <p className="text-[15px] font-bold text-primary">{formatCurrency(trip.earnings)}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-display text-lg font-bold lg:text-xl">{t('recentActivity')}</h2>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="space-y-2.5">
              {recentTrips.map((trip) => (
                <div key={trip.id} className="flex items-center gap-3 rounded-xl border border-border bg-card/50 p-3.5">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${trip.loadedReturn ? 'bg-secondary/10 text-secondary' : 'bg-destructive/10 text-destructive'}`}>
                    {trip.loadedReturn ? <CheckCircle2 className="h-[18px] w-[18px]" /> : <AlertCircle className="h-[18px] w-[18px]" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-[15px] font-semibold">{getCityName(trip.route.from)} → {getCityName(trip.route.to)}</p>
                    <p className="text-xs text-muted-foreground">{trip.date} · {trip.shipmentType}</p>
                  </div>
                  <p className="text-[15px] font-bold">{trip.loadedReturn ? formatCurrency(trip.earnings) : '₹0'}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function KpiCard({ icon: Icon, label, value, unit, subtitle, glow }) {
  const glowClass = {
    violet: 'kpi-glow-violet',
    cyan: 'kpi-glow-cyan',
    blue: 'kpi-glow-blue',
    green: 'kpi-glow-green',
  }[glow];
  const iconColor = {
    violet: 'text-primary',
    cyan: 'text-secondary',
    blue: 'text-blue-500',
    green: 'text-green-500',
  }[glow];
  const iconBg = {
    violet: 'bg-primary/10',
    cyan: 'bg-secondary/10',
    blue: 'bg-blue-500/10',
    green: 'bg-green-500/10',
  }[glow];

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-border bg-card p-5 ${glowClass}`}>
      <div className="relative z-10">
        <div className="mb-3 flex items-center gap-2.5">
          <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${iconBg}`}>
            <Icon className={`h-[18px] w-[18px] ${iconColor}`} />
          </div>
          <span className="text-[13px] font-medium uppercase tracking-wide text-muted-foreground">{label}</span>
        </div>
        <p className="font-display text-[32px] font-extrabold leading-tight lg:text-[36px]">
          {value}{unit && <span className="ml-1.5 text-lg font-medium text-muted-foreground">{unit}</span>}
        </p>
        {subtitle && <p className="mt-1 text-[13px] text-muted-foreground">{subtitle}</p>}
      </div>
    </div>
  );
}

function JourneyVisualization({ profile, topMatch, onAccept }) {
  const { t } = useI18n();
  return (
    <div>
      <h2 className="mb-1 font-display text-xl font-bold lg:text-[22px]">{t('currentJourney')}</h2>
      <p className="mb-5 text-sm text-muted-foreground">Delivery completed · Return capacity detected</p>

      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 lg:p-8">
        {/* Journey route SVG */}
        <div className="relative">
          <svg viewBox="0 0 600 120" className="w-full" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="journeyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="50%" stopColor="hsl(280 80% 60%)" />
                <stop offset="100%" stopColor="hsl(var(--secondary))" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Route line */}
            <path
              d="M 80 60 Q 300 20 520 60"
              stroke="url(#journeyGradient)"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              filter="url(#glow)"
              className="animate-draw-line"
            />

            {/* Animated dashes on route */}
            <path
              d="M 80 60 Q 300 20 520 60"
              stroke="url(#journeyGradient)"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              className="animate-route-dash"
              opacity="0.5"
            />

            {/* Origin node — Delhi */}
            <circle cx="80" cy="60" r="6" fill="hsl(var(--primary))" />
            <circle cx="80" cy="60" r="12" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" opacity="0.3" className="animate-pulse-soft" />

            {/* Destination node — Jaipur */}
            <circle cx="520" cy="60" r="6" fill="hsl(var(--secondary))" />
            <circle cx="520" cy="60" r="12" fill="none" stroke="hsl(var(--secondary))" strokeWidth="1.5" opacity="0.3" className="animate-pulse-soft" />

            {/* Moving truck */}
            <g>
              <circle r="4" fill="hsl(var(--primary))" opacity="0.8">
                <animateMotion dur="5s" repeatCount="indefinite" path="M 80 60 Q 300 20 520 60" />
              </circle>
            </g>
          </svg>

          {/* City labels */}
          <div className="mt-2 flex items-center justify-between px-2">
            <div className="text-center">
              <p className="font-display text-xl font-bold lg:text-2xl">Delhi</p>
              <p className="text-xs font-medium text-secondary">Delivery completed</p>
            </div>
            <div className="text-center">
              <p className="font-display text-xl font-bold lg:text-2xl">Jaipur</p>
              <p className="text-xs font-medium text-primary">Return opportunity</p>
            </div>
          </div>
        </div>

        {/* Return capacity */}
        <div className="mt-6 flex items-center gap-4 rounded-xl border border-border bg-muted/20 p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <Truck className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Return Capacity Available</p>
            <p className="font-display text-2xl font-bold text-primary">7.2 Tons</p>
          </div>
          <div className="hidden text-right sm:block">
            <p className="text-sm text-muted-foreground">{profile.vehicleNumber || 'Vehicle Number'}</p>
            <p className="text-xs text-muted-foreground">{profile.truckModel || 'Vehicle Model'}</p>
          </div>
        </div>

        {/* Connected match */}
        {topMatch && (
          <div className="mt-4 rounded-xl border border-accent/20 bg-accent/[0.06] p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-xs font-bold uppercase tracking-wide text-primary">Predicted Match</span>
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-display text-lg font-bold">{getCityName(topMatch.route.from)} → {getCityName(topMatch.route.to)}</p>
                <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <span>{topMatch.capacity}T capacity</span>
                  <span className="font-semibold text-foreground">{formatCurrency(topMatch.estimatedEarnings)} est. earnings</span>
                  <span className="font-bold text-secondary">{topMatch.matchScore}% match</span>
                </div>
              </div>
              <button
                onClick={() => onAccept(topMatch)}
                className="btn-gradient-primary rounded-lg px-5 py-2.5 text-sm font-semibold text-primary-foreground"
              >
                View Match →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MatchCard({ match, onAccept }) {
  const scoreColor = match.matchScore >= 90 ? 'text-secondary' : 'text-primary';
  const ringColor = match.matchScore >= 90 ? 'hsl(var(--secondary))' : 'hsl(var(--primary))';

  return (
    <div className="rounded-2xl border border-border bg-card p-4 transition-all hover:border-primary/20">
      <div className="flex items-center gap-3">
        {/* Circular match indicator */}
        <div className="relative h-14 w-14 shrink-0">
          <svg width="56" height="56" className="-rotate-90">
            <circle cx="28" cy="28" r="24" fill="none" strokeWidth="3" stroke="hsl(var(--muted))" opacity="0.3" />
            <circle
              cx="28"
              cy="28"
              r="24"
              fill="none"
              strokeWidth="3"
              strokeLinecap="round"
              stroke={ringColor}
              strokeDasharray={2 * Math.PI * 24}
              strokeDashoffset={2 * Math.PI * 24 - (match.matchScore / 100) * 2 * Math.PI * 24}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`font-display text-sm font-bold ${scoreColor}`}>{match.matchScore}%</span>
          </div>
        </div>

        <div className="flex-1">
          <p className="font-display text-lg font-bold">{getCityName(match.route.from)} → {getCityName(match.route.to)}</p>
          <p className="text-sm text-muted-foreground">{match.capacity}T · {formatCurrency(match.estimatedEarnings)}</p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
        {match.reasons?.slice(0, 2).map((r, i) => (
          <span key={i} className="flex items-center gap-1 text-[12px] text-muted-foreground">
            <CheckCircle2 className="h-3.5 w-3.5 text-secondary" /> {r.label}
          </span>
        ))}
      </div>

      <button
        onClick={() => onAccept(match)}
        className="btn-gradient-primary mt-3 w-full rounded-lg py-2 text-sm font-semibold text-primary-foreground"
      >
        View Match
      </button>
    </div>
  );
}
