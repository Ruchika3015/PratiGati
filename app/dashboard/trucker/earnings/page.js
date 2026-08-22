'use client';

import { IndianRupee, TrendingUp, Wallet, BarChart3 } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { WEEKLY_EARNINGS, TRIPS } from '@/lib/mock-data';
import { useAuth } from '@/lib/auth-context';
import { useI18n } from '@/lib/i18n';

export default function TruckerEarningsPage() {
  const { user } = useAuth();
  const { t, formatCurrency } = useI18n();
  const myTrips = TRIPS.filter((tr) => tr.truckerId === user?.profile?.id || tr.truckerId === 'trk-001');
  const totalEarnings = myTrips.reduce((sum, tr) => sum + (tr.earnings || 0), 0);
  const returnEarnings = myTrips.filter((tr) => tr.loadedReturn).reduce((sum, tr) => sum + (tr.earnings || 0), 0);
  const maxWeekly = Math.max(...WEEKLY_EARNINGS.map((w) => w.earnings));

  return (
    <DashboardLayout role="trucker" title={t('earnings')} subtitle={t('earningsSubtitleFull')}>
      <div className="p-4 lg:p-6">
        <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <KpiBox icon={Wallet} label={t('totalEarnings')} value={formatCurrency(totalEarnings)} accent="primary" />
          <KpiBox icon={TrendingUp} label={t('returnTripEarnings')} value={formatCurrency(returnEarnings)} accent="secondary" />
          <KpiBox icon={IndianRupee} label={t('avgEarningsPerTrip')} value={formatCurrency(Math.round(totalEarnings / Math.max(myTrips.length, 1)))} accent="primary" />
          <KpiBox icon={BarChart3} label={t('activeWeeks')} value={WEEKLY_EARNINGS.length} accent="secondary" />
        </div>

        <div className="rounded-lg border border-border bg-card p-4">
          <h2 className="mb-4 font-display text-base font-bold">{t('weeklyEarnings')}</h2>
          <div className="space-y-3">
            {WEEKLY_EARNINGS.map((week) => (
              <div key={week.week}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="font-medium text-muted-foreground">{week.week}</span>
                  <span className="font-bold">{formatCurrency(week.earnings)}</span>
                </div>
                <div className="flex h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-accent"
                    style={{ width: `${(week.earnings / maxWeekly) * 100}%` }}
                  />
                </div>
                <div className="mt-1 flex items-center justify-between text-[10px] text-muted-foreground">
                  <span>{t('returnLabel')} {formatCurrency(week.returnEarnings)}</span>
                  <span>{t('emptyKmLabel')} {week.emptyKm}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-border bg-card p-4">
          <h2 className="mb-3 font-display text-base font-bold">{t('recentTripEarnings')}</h2>
          <div className="space-y-2">
            {myTrips.slice(0, 6).map((trip) => (
              <div key={trip.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <p className="text-sm font-semibold">{trip.route.from} → {trip.route.to}</p>
                  <p className="text-xs text-muted-foreground">{trip.date} · {trip.shipmentType}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-primary">{trip.earnings > 0 ? formatCurrency(trip.earnings) : '—'}</p>
                  <p className={`text-[10px] ${trip.loadedReturn ? 'text-secondary' : 'text-muted-foreground'}`}>
                    {trip.loadedReturn ? t('loadedReturn') : t('emptyReturn')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function KpiBox({ icon: Icon, label, value, accent }) {
  const color = accent === 'primary' ? 'text-primary' : 'text-secondary';
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="mb-2 flex items-center gap-2 text-muted-foreground">
        <Icon className={`h-4 w-4 ${color}`} />
        <span className="text-xs font-medium uppercase tracking-wide">{label}</span>
      </div>
      <p className="font-display text-xl font-bold">{value}</p>
    </div>
  );
}
