'use client';

import { Brain, TrendingUp, Clock, MapPin, AlertCircle } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { PREDICTIONS, getCityName } from '@/lib/mock-data';
import { useI18n } from '@/lib/i18n';

export default function ShipperPredictionsPage() {
  const { t } = useI18n();

  return (
    <DashboardLayout role="shipper" title={t('predictions')} subtitle={t('demandCapacityPredictions')}>
      <div className="p-4 lg:p-6">
        <div className="mb-4 rounded-lg border border-primary/20 bg-primary/5 p-4">
          <div className="flex items-start gap-3">
            <Brain className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="text-sm font-bold">{t('demandCapacityPredictions')}</p>
              <p className="text-xs text-muted-foreground">{t('demandCapacityDesc')}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-3 lg:grid-cols-2">
          {PREDICTIONS.map((pred) => {
            const demandColor = pred.demandLevel === 'high' ? 'text-secondary' : pred.demandLevel === 'medium' ? 'text-primary' : 'text-muted-foreground';
            const demandBg = pred.demandLevel === 'high' ? 'bg-secondary/10' : pred.demandLevel === 'medium' ? 'bg-primary/10' : 'bg-muted';
            const demandKey = pred.demandLevel === 'high' ? 'highDemand' : pred.demandLevel === 'medium' ? 'mediumDemand' : 'lowDemand';
            return (
              <div key={pred.id} className="rounded-lg border border-border bg-card p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <p className="font-display text-base font-bold">{getCityName(pred.route.from)} → {getCityName(pred.route.to)}</p>
                  </div>
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${demandBg} ${demandColor}`}>
                    {t(demandKey)} {t('demand')}
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">{t('predictedCapacity')}</p>
                    <p className="font-bold">{pred.predictedCapacity}T</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{t('confidence')}</p>
                    <p className="font-bold text-primary">{pred.confidence}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{t('timeWindow')}</p>
                    <p className="font-bold">{pred.timeWindow}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{t('matchOpportunities')}</p>
                    <p className="font-bold text-secondary">{pred.matchOpportunities}</p>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2 rounded-lg border border-border bg-muted/30 p-2.5">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0 text-amber-500" />
                  <p className="text-xs text-muted-foreground">{pred.notes}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
