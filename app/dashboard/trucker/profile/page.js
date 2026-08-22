'use client';

import { User, Truck, Mail, Phone, MapPin, Star, Shield, Calendar, IndianRupee, Navigation } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { useAuth } from '@/lib/auth-context';
import { getCityName, getVehicleTypeLabel } from '@/lib/mock-data';
import { useI18n } from '@/lib/i18n';

export default function TruckerProfilePage() {
  const { user } = useAuth();
  const { t, formatCurrency } = useI18n();
  const p = user?.profile || {};

  return (
    <DashboardLayout role="trucker" title={t('profile')} subtitle={t('profileSubtitleTrucker')}>
      <div className="p-4 lg:p-6">
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 text-xl font-bold text-primary">
              {user?.avatar || user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="font-display text-xl font-bold">{user?.name}</h2>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
              <div className="mt-1 flex items-center gap-2 text-xs">
                <Star className="h-3.5 w-3.5 text-amber-500" />
                <span className="font-semibold">{p.rating || '—'}</span>
                <span className="text-muted-foreground">· {p.completedTrips || 0} {t('tripsCount')}</span>
                {p.verified && (
                  <span className="flex items-center gap-1 text-secondary">
                    <Shield className="h-3 w-3" /> {t('verified')}
                  </span>
                )}
              </div>
            </div>
          </div>
          {p.bio && <p className="mt-4 text-sm text-muted-foreground">{p.bio}</p>}
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="mb-3 font-display text-sm font-bold">{t('vehicleInfo')}</h3>
            <div className="space-y-2.5 text-sm">
              <InfoRow icon={Truck} label={t('vehicleNumber')} value={p.vehicleNumber} />
              <InfoRow icon={Truck} label={t('vehicleType')} value={getVehicleTypeLabel(p.vehicleType)} />
              <InfoRow icon={Truck} label={t('capacity')} value={`${p.vehicleCapacity || '—'} ${t('tons')}`} />
              <InfoRow icon={Truck} label={t('model')} value={p.truckModel} />
              <InfoRow icon={Truck} label={t('bodyType')} value={p.bodyType} />
              <InfoRow icon={Navigation} label={t('dimensions')} value={p.dimensions} />
              <InfoRow icon={IndianRupee} label={t('fuelEfficiency')} value={p.fuelEfficiency} />
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="mb-3 font-display text-sm font-bold">{t('contactLocation')}</h3>
            <div className="space-y-2.5 text-sm">
              <InfoRow icon={Phone} label={t('phone')} value={p.phone} />
              <InfoRow icon={MapPin} label={t('currentLocation')} value={getCityName(p.currentLocation)} />
              <InfoRow icon={MapPin} label={t('address')} value={p.address} />
              <InfoRow icon={Phone} label={t('emergencyContact')} value={p.emergencyContact} />
              <InfoRow icon={Calendar} label={t('memberSince')} value={p.memberSince} />
              <InfoRow icon={Shield} label={t('permitType')} value={p.permitType} />
              <InfoRow icon={Shield} label={t('licenseValid')} value={p.licenseValid} />
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-border bg-card p-4">
          <h3 className="mb-3 font-display text-sm font-bold">{t('performanceMetrics')}</h3>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <MetricBox label={t('reliabilityScore')} value={`${p.reliabilityScore || '—'}/100`} />
            <MetricBox label={t('onTimeRate')} value={`${p.onTimeRate || '—'}%`} />
            <MetricBox label={t('responseTime')} value={p.responseTime} />
            <MetricBox label={t('totalEarnings')} value={p.earnings ? formatCurrency(p.earnings) : '—'} />
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-border bg-card p-4">
          <h3 className="mb-3 font-display text-sm font-bold">{t('preferredRoutes')}</h3>
          <div className="flex flex-wrap gap-2">
            {(p.preferredRoutes || []).map((route, i) => (
              <span key={i} className="flex items-center gap-1 rounded-md border border-border bg-muted/30 px-2.5 py-1 text-xs font-medium">
                <Navigation className="h-3 w-3 text-primary" /> {route.replace('-', ' → ')}
              </span>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-3.5 w-3.5" /> {label}
      </span>
      <span className="font-medium">{value || '—'}</span>
    </div>
  );
}

function MetricBox({ label, value }) {
  return (
    <div className="rounded-lg border border-border p-3 text-center">
      <p className="font-display text-lg font-bold">{value}</p>
      <p className="mt-1 text-[10px] uppercase tracking-wide text-muted-foreground">{label}</p>
    </div>
  );
}
