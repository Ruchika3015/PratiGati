'use client';

import { Leaf, Route, TrendingUp, IndianRupee, Fuel } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { IMPACT_METRICS, MONTHLY_IMPACT } from '@/lib/mock-data';
import { useI18n } from '@/lib/i18n';

export default function TruckerImpactPage() {
  const { t, formatCurrency } = useI18n();
  const maxKm = Math.max(...MONTHLY_IMPACT.map((m) => m.emptyKm));
  const maxCo2 = Math.max(...MONTHLY_IMPACT.map((m) => m.co2));

  return (
    <DashboardLayout role="trucker" title={t('impact')} subtitle={t('impactSubtitle')}>
      <div className="p-4 lg:p-6">
        <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <ImpactCard icon={Route} label={t('emptyKmAvoided')} value={`${IMPACT_METRICS.totalEmptyKmAvoided} km`} accent="primary" />
          <ImpactCard icon={Leaf} label={t('co2Saved')} value={`${IMPACT_METRICS.totalCo2Saved} kg`} accent="secondary" />
          <ImpactCard icon={IndianRupee} label={t('costSaved')} value={formatCurrency(IMPACT_METRICS.totalCostSaved)} accent="primary" />
          <ImpactCard icon={Fuel} label={t('fuelSaved')} value={`${IMPACT_METRICS.totalFuelSaved} L`} accent="secondary" />
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-lg border border-border bg-card p-4">
            <h2 className="mb-4 font-display text-base font-bold">{t('emptyKmAvoidedMonthly')}</h2>
            <div className="space-y-3">
              {MONTHLY_IMPACT.map((m) => (
                <div key={m.month}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="font-medium text-muted-foreground">{m.month}</span>
                    <span className="font-bold">{m.emptyKm} km</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${(m.emptyKm / maxKm) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-4">
            <h2 className="mb-4 font-display text-base font-bold">{t('co2ReducedMonthly')}</h2>
            <div className="space-y-3">
              {MONTHLY_IMPACT.map((m) => (
                <div key={m.month}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="font-medium text-muted-foreground">{m.month}</span>
                    <span className="font-bold">{m.co2} kg</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-secondary" style={{ width: `${(m.co2 / maxCo2) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <MiniStat label={t('loadedReturns')} value={IMPACT_METRICS.loadedReturns} />
          <MiniStat label={t('emptyReturns')} value={IMPACT_METRICS.emptyReturns} />
          <MiniStat label={t('successfulMatches')} value={IMPACT_METRICS.successfulMatches} />
          <MiniStat label={t('partialLoadMatches')} value={IMPACT_METRICS.partialLoadMatches} />
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

function MiniStat({ label, value }) {
  return (
    <div className="rounded-lg border border-border bg-card p-3 text-center">
      <p className="font-display text-lg font-bold">{value}</p>
      <p className="mt-1 text-[10px] uppercase tracking-wide text-muted-foreground">{label}</p>
    </div>
  );
}
