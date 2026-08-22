'use client';

import { User, Building2, Mail, Phone, MapPin, Star, Shield, Calendar, Package, IndianRupee } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { useAuth } from '@/lib/auth-context';
import { getCityName } from '@/lib/mock-data';
import { useI18n } from '@/lib/i18n';

export default function ShipperProfilePage() {
  const { user } = useAuth();
  const { t, formatCurrency } = useI18n();
  const p = user?.profile || {};

  return (
    <DashboardLayout role="shipper" title={t('profile')} subtitle={t('shipperProfileSubtitle')}>
      <div className="p-4 lg:p-6">
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 text-xl font-bold text-primary">
              {user?.avatar || user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="font-display text-xl font-bold">{user?.name}</h2>
              <p className="text-sm text-muted-foreground">{p.companyName || user?.email}</p>
              <div className="mt-1 flex items-center gap-2 text-xs">
                <Star className="h-3.5 w-3.5 text-amber-500" />
                <span className="font-semibold">{p.rating || '—'}</span>
                <span className="text-muted-foreground">· {p.completedShipments || 0} {t('shipmentsCount')}</span>
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
            <h3 className="mb-3 font-display text-sm font-bold">{t('companyInformation')}</h3>
            <div className="space-y-2.5 text-sm">
              <InfoRow icon={Building2} label={t('company')} value={p.companyName} />
              <InfoRow icon={Building2} label={t('businessType')} value={p.businessType} />
              <InfoRow icon={Shield} label={t('gst')} value={p.gst} />
              <InfoRow icon={MapPin} label={t('address')} value={p.address} />
              <InfoRow icon={Calendar} label={t('memberSince')} value={p.memberSince} />
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="mb-3 font-display text-sm font-bold">{t('contact')}</h3>
            <div className="space-y-2.5 text-sm">
              <InfoRow icon={Mail} label={t('email')} value={user?.email} />
              <InfoRow icon={Phone} label={t('phone')} value={p.phone} />
              <InfoRow icon={MapPin} label={t('commonPickupsLabel')} value={(p.commonPickups || []).map((c) => getCityName(c)).join(', ') || '—'} />
              <InfoRow icon={MapPin} label={t('commonDeliveriesLabel')} value={(p.commonDeliveries || []).map((c) => getCityName(c)).join(', ') || '—'} />
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-border bg-card p-4">
          <h3 className="mb-3 font-display text-sm font-bold">{t('shipmentMetrics')}</h3>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <MetricBox label={t('activeShipments')} value={p.activeShipments || '—'} />
            <MetricBox label={t('completedLabel')} value={p.completedShipments || '—'} />
            <MetricBox label={t('totalSpent')} value={p.totalSpent ? formatCurrency(p.totalSpent) : '—'} />
            <MetricBox label={t('costSaved')} value={p.costSaved ? formatCurrency(p.costSaved) : '—'} />
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
