'use client';

import { Leaf, IndianRupee, Package, TrendingUp } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { useAuth } from '@/lib/auth-context';
import { useI18n } from '@/lib/i18n';

export default function ShipperImpactPage() {
  const { user } = useAuth();
  const { t, formatCurrency } = useI18n();
  const p = user?.profile || {};

  return (
    <DashboardLayout role="shipper" title={t('impact')} subtitle={t('shipperImpactSubtitle')}>
      <div className="p-4 lg:p-6">
        <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <ImpactCard icon={IndianRupee} label={t('costSaved')} value={p.costSaved ? formatCurrency(p.costSaved) : '—'} accent="primary" />
          <ImpactCard icon={Package} label={t('completedShipments')} value={p.completedShipments || '—'} accent="secondary" />
          <ImpactCard icon={TrendingUp} label={t('activeShipments')} value={p.activeShipments || '—'} accent="primary" />
          <ImpactCard icon={IndianRupee} label={t('totalSpent')} value={p.totalSpent ? formatCurrency(p.totalSpent) : '—'} accent="secondary" />
        </div>

        <div className="rounded-lg border border-secondary/20 bg-secondary/5 p-5">
          <div className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-secondary" />
            <h2 className="font-display text-base font-bold">{t('environmentalImpact')}</h2>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {t('shipperImpactDesc')}
          </p>
          <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-3">
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="font-display text-2xl font-bold text-secondary">642 kg</p>
              <p className="mt-1 text-xs text-muted-foreground">{t('co2ReducedShipments')}</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="font-display text-2xl font-bold text-primary">1,840 km</p>
              <p className="mt-1 text-xs text-muted-foreground">{t('emptyTruckMilesAvoided')}</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="font-display text-2xl font-bold">438 L</p>
              <p className="mt-1 text-xs text-muted-foreground">{t('fuelSavedLabel')}</p>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-border bg-card p-4">
          <h2 className="mb-3 font-display text-base font-bold">{t('savingsSummary')}</h2>
          <div className="space-y-2.5 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">{t('totalTransportSpend')}</span>
              <span className="font-bold">{p.totalSpent ? formatCurrency(p.totalSpent) : '—'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">{t('totalSavedViaPratiGati')}</span>
              <span className="font-bold text-secondary">{p.costSaved ? formatCurrency(p.costSaved) : '—'}</span>
            </div>
            <div className="flex items-center justify-between border-t border-border pt-2.5">
              <span className="font-medium">{t('savingsRate')}</span>
              <span className="font-bold text-primary">
                {p.totalSpent && p.costSaved ? `${((p.costSaved / p.totalSpent) * 100).toFixed(0)}%` : '—'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function ImpactCard({ icon: Icon, label, value, accent }) {
  const color = accent === 'primary' ? 'text-primary' : 'text-secondary';
  const bg = accent === 'primary' ? 'bg-primary/10' : 'bg-secondary/10';
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${bg}`}>
        <Icon className={`h-5 w-5 ${color}`} />
      </div>
      <p className="font-display text-xl font-bold">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
