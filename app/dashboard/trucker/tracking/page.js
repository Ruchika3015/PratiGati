'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Truck, MapPin, Clock, Gauge, Navigation, User, Activity } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { useAuth } from '@/lib/auth-context';
import { useI18n } from '@/lib/i18n';
import { useTheme } from '@/components/shared/theme-provider';
import { TRIPS, getCityName, getVehicleTypeLabel } from '@/lib/mock-data';
import { getCity } from '@/lib/cities';

const LiveTrackingMap = dynamic(() => import('@/components/shared/live-tracking-map').then(m => m.LiveTrackingMap), { ssr: false });

export default function TruckerTrackingPage() {
  const { user } = useAuth();
  const { t } = useI18n();
  const { theme } = useTheme();
  const profile = user?.profile;

  const myTrips = TRIPS.filter((tr) => tr.truckerId === profile?.id);
  const activeTrip = myTrips.find((tr) => tr.status === 'upcoming') || myTrips[0];

  const fallbackRoute = profile?.preferredRoutes?.[0]?.split('-') || ['delhi', 'jaipur'];
  const route = activeTrip?.route || { from: profile?.currentLocation || fallbackRoute[0], to: fallbackRoute[1] || 'jaipur' };
  const totalDistance = activeTrip?.distance || 281;
  const originName = getCityName(route.from);
  const destName = getCityName(route.to);
  const originCity = getCity(route.from);
  const destCity = getCity(route.to);

  const [progress, setProgress] = useState(62);
  const [speed, setSpeed] = useState(64);
  const [lastUpdateSeconds, setLastUpdateSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => Math.min(p + 0.2, 95));
      setSpeed(() => Math.max(45, Math.min(78, Math.round(64 + (Math.random() * 12 - 6)))));
      setLastUpdateSeconds(0);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setLastUpdateSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const distanceRemaining = Math.round(totalDistance * (1 - progress / 100));
  const etaHours = distanceRemaining / speed;
  const etaH = Math.floor(etaHours);
  const etaM = Math.round((etaHours - etaH) * 60);
  const etaStr = `${etaH}h ${etaM}m`;

  const currentLocationName = progress > 50 ? `${t('nearCity')} ${destName}` : `${t('departedCity')} ${originName}`;
  const lastUpdatedStr = lastUpdateSeconds < 3 ? t('justNow') : `${lastUpdateSeconds}${t('secondsAgo')}`;

  const overlay = {
    vehicleNumber: profile?.vehicleNumber || '—',
    currentLocation: currentLocationName,
    currentLocationLabel: t('currentLocation'),
    eta: etaStr,
    etaLabel: t('eta'),
    speed,
    speedLabel: t('speed'),
  };

  return (
    <DashboardLayout role="trucker" title={t('liveTracking')} subtitle={t('trackingSubtitleTrucker')}>
      <div className="space-y-5 p-4 lg:p-6">
        {/* Route header */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Navigation className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{t('activeRoute')}</p>
              <p className="font-display text-lg font-bold">{originName} → {destName}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-green-500/25 bg-green-500/[0.08] px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-green-600 dark:text-green-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" /> {t('inTransit')}
          </div>
        </div>

        {/* Large map */}
        <LiveTrackingMap
          origin={originName}
          destination={destName}
          originCoords={originCity}
          destCoords={destCity}
          progress={progress}
          overlay={overlay}
          theme={theme}
        />

        {/* Live stats */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
          <StatCard icon={MapPin} label={t('currentLocation')} value={currentLocationName} accent />
          <StatCard icon={Clock} label={t('eta')} value={etaStr} />
          <StatCard icon={Navigation} label={t('distanceLeft')} value={`${distanceRemaining} km`} />
          <StatCard icon={Gauge} label={t('speed')} value={`${speed} km/h`} />
          <StatCard icon={Activity} label={t('lastUpdated')} value={lastUpdatedStr} />
        </div>

        {/* Progress bar */}
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t('routeProgress')}</span>
            <span className="font-display text-sm font-bold text-primary">{progress.toFixed(1)}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-accent transition-all duration-1000" style={{ width: `${progress}%` }} />
          </div>
          <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground">
            <span>{originName}</span>
            <span>{destName}</span>
          </div>
        </div>

        {/* Truck and Driver info */}
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="mb-4 flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wide text-foreground">
              <Truck className="h-4 w-4 text-primary" /> {t('truckInformation')}
            </h3>
            <div className="space-y-3">
              <InfoRow label={t('vehicleNumber')} value={profile?.vehicleNumber || '—'} />
              <InfoRow label={t('vehicleModel')} value={profile?.truckModel || '—'} />
              <InfoRow label={t('vehicleType')} value={getVehicleTypeLabel(profile?.vehicleType) || '—'} />
              <InfoRow label={t('capacity')} value={profile?.vehicleCapacity ? `${profile.vehicleCapacity} T` : '—'} />
              <InfoRow label={t('bodyType')} value={profile?.bodyType || '—'} />
              <InfoRow label={t('fuelEfficiency')} value={profile?.fuelEfficiency || '—'} />
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="mb-4 flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wide text-foreground">
              <User className="h-4 w-4 text-primary" /> {t('driverTripDetails')}
            </h3>
            <div className="space-y-3">
              <InfoRow label={t('driverName')} value={user?.name || '—'} />
              <InfoRow label={t('phone')} value={profile?.phone || '—'} />
              <InfoRow label={t('licenseNumber')} value={profile?.drivingLicense || '—'} />
              <InfoRow label={t('currentTrip')} value={activeTrip ? `${originName} → ${destName}` : '—'} />
              <InfoRow label={t('shipmentType')} value={activeTrip?.shipmentType || '—'} />
              <InfoRow label={t('loadWeight')} value={activeTrip?.weight ? `${activeTrip.weight} T` : '—'} />
              <InfoRow label={t('shipper')} value={activeTrip?.shipperName || '—'} />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatCard({ icon: Icon, label, value, accent }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="mb-2 flex items-center gap-2 text-muted-foreground">
        <Icon className={`h-4 w-4 ${accent ? 'text-primary' : ''}`} />
        <span className="text-[10px] font-medium uppercase tracking-wide">{label}</span>
      </div>
      <p className="font-display text-base font-bold">{value}</p>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-border/50 pb-2 last:border-0 last:pb-0">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm font-semibold">{value}</span>
    </div>
  );
}
