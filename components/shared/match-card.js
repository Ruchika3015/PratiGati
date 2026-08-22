'use client';

import { CheckCircle2, XCircle, Clock, MapPin, Truck, IndianRupee, Shield, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MatchScoreRing, MatchScoreBadge } from './match-score-ring';
import { getCityName } from '@/lib/cities';
import { formatTime } from '@/lib/mock-data';
import { useI18n } from '@/lib/i18n';

const REASON_KEY_MAP = {
  'Route aligned': 'reasonRouteAligned',
  'Capacity available': 'reasonCapacityAvailable',
  'Time compatible': 'reasonTimeCompatible',
  'Vehicle compatible': 'reasonVehicleCompatible',
  'Reliable carrier': 'reasonReliableCarrier',
};

export function MatchCard({ match, onAccept, onReject, onView, compact = false }) {
  const { t, formatCurrency } = useI18n();
  if (!match) return null;

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-lg',
        match.status === 'recommended' && 'border-primary/20'
      )}
    >
      {/* Top section */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <MatchScoreBadge score={match.matchScore} />
            {match.partialLoad && (
              <span className="rounded-full border border-secondary/30 bg-secondary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-secondary">
                {t('partialLoad')}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{getCityName(match.route.from)}</span>
            <svg className="h-3.5 w-3.5 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>{getCityName(match.route.to)}</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Truck className="h-3.5 w-3.5" /> {match.capacity}T / {match.truckCapacity}T
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {formatTime(match.pickupTime)}
            </span>
            <span className="flex items-center gap-1">
              <IndianRupee className="h-3.5 w-3.5" />
              {formatCurrency(match.estimatedEarnings)}
            </span>
            <span className="flex items-center gap-1">
              <Shield className="h-3.5 w-3.5" /> {match.reliabilityScore}/100
            </span>
          </div>
        </div>
        {!compact && <MatchScoreRing score={match.matchScore} size={64} stroke={5} showLabel={false} />}
      </div>

      {/* Match reasons */}
      {!compact && match.reasons && (
        <div className="mt-3 grid grid-cols-1 gap-1 border-t border-border pt-3 sm:grid-cols-2">
          {match.reasons.map((reason, i) => (
            <div key={i} className="flex items-start gap-1.5 text-xs">
              {reason.passed ? (
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-secondary" />
              ) : (
                <XCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />
              )}
              <span className={reason.passed ? 'text-foreground' : 'text-muted-foreground'}>
                {REASON_KEY_MAP[reason.label] ? t(REASON_KEY_MAP[reason.label]) : reason.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="mt-3 flex items-center gap-2">
        {onAccept && (
          <button
            onClick={() => onAccept(match)}
            className="flex-1 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t('acceptMatch')}
          </button>
        )}
        {onReject && (
          <button
            onClick={() => onReject(match)}
            className="rounded-md border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:bg-muted"
          >
            {t('reject')}
          </button>
        )}
        {onView && (
          <button
            onClick={() => onView(match)}
            className="ml-auto flex items-center gap-1 text-xs font-semibold text-primary transition-colors hover:text-primary/80"
          >
            {t('viewDetails')} <ChevronRight className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
