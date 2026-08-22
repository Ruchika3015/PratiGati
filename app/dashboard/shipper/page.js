'use client';

import {
  IndianRupee,
  Package,
  Truck,
  Clock,
  MapPin,
  ArrowRight,
  Plus,
  CheckCircle2,
  TrendingUp,
  Activity,
  Navigation,
} from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { useAuth } from '@/lib/auth-context';
import { useI18n } from '@/lib/i18n';
import {
  TRUCKERS,
  getCityName,
  formatCurrency,
  formatDateTime,
} from '@/lib/mock-data';
import { toast } from 'sonner';
import { useState } from 'react';
import { useShipments } from '@/lib/use-shipments';
import { PostShipmentModal } from '@/components/shared/post-shipment-modal';

export default function ShipperDashboard() {
  const { user } = useAuth();
  const { t } = useI18n();
  const [showPostShipment, setShowPostShipment] = useState(false);
  const { shipments, addShipment } = useShipments(user?.profile?.id);

  const openShipments = shipments.filter((s) => s.status === 'open' || s.status === 'unmatched');
  const activeShipments = openShipments.slice(0, 3);
  const recommendedTrucks = TRUCKERS.slice(0, 2);
  const activeCount = openShipments.length;
  const totalShipments = shipments.length;

  const handlePostShipment = (formData) => {
    addShipment(formData);
    toast.success('Shipment posted successfully! Matching in progress...');
    setShowPostShipment(false);
  };

  return (
    <DashboardLayout role="shipper" title={t('shipperControlCenter')} subtitle={t('manageShipments')}>
      <div className="p-5 lg:p-8">
        {/* KPI Row */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <KpiCard icon={Package} label={t('activeShipments')} value={String(activeCount)} subtitle={`${Math.max(activeCount - 1, 0)} awaiting match`} glow="violet" />
          <KpiCard icon={Truck} label={t('recommendedTrucks')} value="12" subtitle="Available now" glow="cyan" />
          <KpiCard icon={IndianRupee} label={t('estTransportCost')} value="₹1.15L" subtitle={`${totalShipments} shipments`} glow="blue" />
          <KpiCard icon={IndianRupee} label={t('costSaved')} value="₹3.12L" subtitle="Via PratiGati" glow="green" />
        </div>

        {/* Main 2-column area */}
        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {/* LEFT — Active Shipment Journey */}
          <div className="lg:col-span-2">
            <div>
              <div className="mb-1 flex items-center justify-between">
                <h2 className="font-display text-xl font-bold lg:text-[22px]">{t('shipmentJourney')}</h2>
                <button
                  onClick={() => setShowPostShipment(true)}
                  className="btn-gradient-primary flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold text-primary-foreground"
                >
                  <Plus className="h-4 w-4" /> {t('postNewShipment')}
                </button>
              </div>
              <p className="mb-5 text-sm text-muted-foreground">Mumbai → Delhi · In transit</p>

              <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 lg:p-8">
                {/* Journey route SVG */}
                <div className="relative">
                  <svg viewBox="0 0 600 120" className="w-full" preserveAspectRatio="xMidYMid meet">
                    <defs>
                      <linearGradient id="shipJourneyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="hsl(var(--primary))" />
                        <stop offset="50%" stopColor="hsl(280 80% 60%)" />
                        <stop offset="100%" stopColor="hsl(var(--secondary))" />
                      </linearGradient>
                      <filter id="shipGlow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    <path d="M 80 60 Q 300 100 520 60" stroke="url(#shipJourneyGradient)" strokeWidth="2.5" fill="none" strokeLinecap="round" filter="url(#shipGlow)" className="animate-draw-line" />
                    <path d="M 80 60 Q 300 100 520 60" stroke="url(#shipJourneyGradient)" strokeWidth="2.5" fill="none" strokeLinecap="round" className="animate-route-dash" opacity="0.5" />

                    <circle cx="80" cy="60" r="6" fill="hsl(var(--primary))" />
                    <circle cx="80" cy="60" r="12" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" opacity="0.3" className="animate-pulse-soft" />
                    <circle cx="520" cy="60" r="6" fill="hsl(var(--secondary))" />
                    <circle cx="520" cy="60" r="12" fill="none" stroke="hsl(var(--secondary))" strokeWidth="1.5" opacity="0.3" className="animate-pulse-soft" />

                    <g>
                      <circle r="4" fill="hsl(var(--primary))" opacity="0.8">
                        <animateMotion dur="5s" repeatCount="indefinite" path="M 80 60 Q 300 100 520 60" />
                      </circle>
                    </g>
                  </svg>

                  <div className="mt-2 flex items-center justify-between px-2">
                    <div className="text-center">
                      <p className="font-display text-xl font-bold lg:text-2xl">Mumbai</p>
                      <p className="text-xs font-medium text-primary">{t('origin')}</p>
                    </div>
                    <div className="text-center">
                      <p className="font-display text-xl font-bold lg:text-2xl">Delhi</p>
                      <p className="text-xs font-medium text-secondary">{t('destination')}</p>
                    </div>
                  </div>
                </div>

                {/* Shipment details */}
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="rounded-xl border border-border bg-muted/20 p-4">
                    <p className="text-xs text-muted-foreground">{t('shipmentStatus')}</p>
                    <p className="font-display text-lg font-bold text-primary">{t('inTransit')}</p>
                  </div>
                  <div className="rounded-xl border border-border bg-muted/20 p-4">
                    <p className="text-xs text-muted-foreground">{t('eta')}</p>
                    <p className="font-display text-lg font-bold">4h 20m</p>
                  </div>
                  <div className="rounded-xl border border-border bg-muted/20 p-4">
                    <p className="text-xs text-muted-foreground">{t('carrier')}</p>
                    <p className="font-display text-lg font-bold">{recommendedTrucks[0]?.vehicleNumber || '—'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Active shipments list */}
            <div className="mt-5">
              <h2 className="mb-3 font-display text-lg font-bold lg:text-xl">{t('activeShipments')}</h2>
              <div className="space-y-2.5">
                {activeShipments.map((ship) => (
                  <div key={ship.id} className="flex items-center gap-3 rounded-xl border border-border bg-card/50 p-3.5">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${ship.status === 'unmatched' ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'}`}>
                      <Package className="h-[18px] w-[18px]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-[15px] font-semibold">{getCityName(ship.pickupLocation)} → {getCityName(ship.deliveryLocation)}</p>
                        {ship.status === 'unmatched' && (
                          <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-[10px] font-bold uppercase text-destructive">Unmatched</span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{ship.shipmentType} · {ship.weight}T · Due {formatDateTime(ship.deliveryDeadline)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[15px] font-bold">{formatCurrency(ship.estimatedCost)}</p>
                      <p className="text-[10px] text-muted-foreground">{ship.distance} km</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Recommended Trucks */}
          <div className="space-y-4">
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display text-xl font-bold lg:text-[22px]">{t('recommendedTrucks')}</h2>
                <span className="rounded-full bg-secondary/10 px-2.5 py-1 text-[11px] font-bold text-secondary">{recommendedTrucks.length} AVAILABLE</span>
              </div>
              <div className="space-y-3">
                {recommendedTrucks.map((trucker, i) => {
                  const score = 96 - i * 4;
                  return (
                    <div key={trucker.id} className="rounded-2xl border border-border bg-card p-4 transition-all hover:border-primary/20">
                      <div className="flex items-center gap-3">
                        <div className="relative h-14 w-14 shrink-0">
                          <svg width="56" height="56" className="-rotate-90">
                            <circle cx="28" cy="28" r="24" fill="none" strokeWidth="3" stroke="hsl(var(--muted))" opacity="0.3" />
                            <circle cx="28" cy="28" r="24" fill="none" strokeWidth="3" strokeLinecap="round" stroke="hsl(var(--primary))" strokeDasharray={2 * Math.PI * 24} strokeDashoffset={2 * Math.PI * 24 - (score / 100) * 2 * Math.PI * 24} />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="font-display text-sm font-bold text-primary">{score}%</span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="font-display text-lg font-bold">{trucker.name}</p>
                          <p className="text-sm text-muted-foreground">{trucker.vehicleNumber} · {trucker.vehicleCapacity}T</p>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[12px] text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5 text-secondary" /> Reliability {trucker.reliabilityScore}/100
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" /> {getCityName(trucker.currentLocation)}
                        </span>
                      </div>
                      <button
                        onClick={() => toast.success(`Truck request sent to ${trucker.name}`)}
                        className="btn-gradient-primary mt-3 w-full rounded-lg py-2 text-sm font-semibold text-primary-foreground"
                      >
                        {t('requestTruck')}
                      </button>
                    </div>
                  );
                })}
              </div>
              <a href="/dashboard/shipper/matches" className="mt-4 flex items-center justify-center gap-1.5 text-sm font-semibold text-primary hover:opacity-80">
                {t('viewAllTrucks')} <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Recent activity */}
        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-lg font-bold lg:text-xl">{t('recentActivity')}</h2>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: 'Shipment matched', detail: 'Mumbai → Delhi · ₹45,000', time: '2 min ago', icon: CheckCircle2, color: 'text-secondary' },
              { label: 'New truck available', detail: 'Suresh Patel · Ahmedabad', time: '15 min ago', icon: Truck, color: 'text-primary' },
              { label: 'Shipment delivered', detail: 'Pune → Mumbai · On time', time: '1 hour ago', icon: CheckCircle2, color: 'text-secondary' },
              { label: 'Cost saving achieved', detail: '₹12,400 saved on last trip', time: '3 hours ago', icon: IndianRupee, color: 'text-primary' },
              { label: 'Shipment posted', detail: 'Ahmedabad → Jaipur · 4T', time: '5 hours ago', icon: Package, color: 'text-muted-foreground' },
              { label: 'Better match found', detail: '92% match for Mumbai → Delhi', time: '6 hours ago', icon: TrendingUp, color: 'text-primary' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2.5 rounded-xl border border-border bg-card/50 p-3.5">
                <item.icon className={`mt-0.5 h-4 w-4 shrink-0 ${item.color}`} />
                <div className="flex-1">
                  <p className="text-sm font-semibold">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.detail}</p>
                  <p className="text-[10px] text-muted-foreground/60">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showPostShipment && <PostShipmentModal onClose={() => setShowPostShipment(false)} onSubmit={handlePostShipment} />}
    </DashboardLayout>
  );
}

function KpiCard({ icon: Icon, label, value, subtitle, glow }) {
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
        <p className="font-display text-[32px] font-extrabold leading-tight lg:text-[36px]">{value}</p>
        {subtitle && <p className="mt-1 text-[13px] text-muted-foreground">{subtitle}</p>}
      </div>
    </div>
  );
}


