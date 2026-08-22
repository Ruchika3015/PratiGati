'use client';

import { useState } from 'react';
import {
  Filter,
  X,
  CheckCircle2,
  XCircle,
  Clock,
  MapPin,
  Truck,
  IndianRupee,
  Shield,
  Navigation,
  Layers,
  ArrowRight,
  TrendingUp,
  Package,
} from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { MatchCard } from '@/components/shared/match-card';
import { MatchScoreRing } from '@/components/shared/match-score-ring';
import { CapacityBar, CapacityBarMulti } from '@/components/shared/capacity-bar';
import { RouteMap } from '@/components/shared/route-map';
import { MATCHES, getCityName, formatCurrency, formatTime, formatDateTime } from '@/lib/mock-data';
import { toast } from 'sonner';

export default function TruckerMatchesPage() {
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [filter, setFilter] = useState('all');

  const filteredMatches = filter === 'partial'
    ? MATCHES.filter((m) => m.partialLoad)
    : filter === 'high'
    ? MATCHES.filter((m) => m.matchScore >= 90)
    : MATCHES;

  const handleAccept = (match) => {
    toast.success(`Match accepted: ${getCityName(match.route.from)} → ${getCityName(match.route.to)}`, {
      description: `Estimated earnings: ${formatCurrency(match.estimatedEarnings)}`,
    });
    setSelectedMatch(null);
  };

  const handleReject = (match) => {
    toast.info('Match rejected. Finding better options...');
    setSelectedMatch(null);
  };

  return (
    <DashboardLayout role="trucker" title="Available Matches" subtitle="Smart matching recommendations for your return trips">
      <div className="p-4 lg:p-6">
        {/* Filter bar */}
        <div className="mb-4 flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          {[
            { id: 'all', label: 'All Matches' },
            { id: 'high', label: 'High Score (90%+)' },
            { id: 'partial', label: 'Partial Load' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                filter === f.id ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground hover:bg-muted'
              }`}
            >
              {f.label}
            </button>
          ))}
          <span className="ml-auto text-xs text-muted-foreground">{filteredMatches.length} matches found</span>
        </div>

        {/* Match cards grid */}
        <div className="grid gap-4 lg:grid-cols-2">
          {filteredMatches.map((match) => (
            <MatchCard
              key={match.id}
              match={match}
              onAccept={handleAccept}
              onReject={handleReject}
              onView={(m) => setSelectedMatch(m)}
            />
          ))}
        </div>

        {/* Empty state */}
        {filteredMatches.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card p-12 text-center">
            <Truck className="mb-3 h-10 w-10 text-muted-foreground/50" />
            <p className="font-semibold">No matches found for this filter</p>
            <p className="text-sm text-muted-foreground">Try a different filter or check back later</p>
          </div>
        )}
      </div>

      {/* Match Details Drawer */}
      {selectedMatch && (
        <MatchDetailsDrawer match={selectedMatch} onClose={() => setSelectedMatch(null)} onAccept={handleAccept} onReject={handleReject} />
      )}
    </DashboardLayout>
  );
}

function MatchDetailsDrawer({ match, onClose, onAccept, onReject }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative h-full w-full max-w-md overflow-y-auto scrollbar-thin border-l border-border bg-card animate-slide-in-right">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card/90 px-5 py-4 backdrop-blur">
          <div className="flex items-center gap-3">
            <MatchScoreRing score={match.matchScore} size={52} stroke={5} showLabel={false} />
            <div>
              <h2 className="font-display text-lg font-bold">Match Details</h2>
              <p className="text-xs text-muted-foreground">{match.id.toUpperCase()}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Route */}
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="font-display text-lg font-bold">{getCityName(match.route.from)}</span>
              </div>
              <Navigation className="h-5 w-5 text-muted-foreground" />
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-secondary" />
                <span className="font-display text-lg font-bold">{getCityName(match.route.to)}</span>
              </div>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{match.distance} km · Estimated transit: ~{Math.ceil(match.distance / 40)} hours</p>
          </div>

          {/* Key info grid */}
          <div className="grid grid-cols-2 gap-3">
            <InfoTile icon={Package} label="Shipment Weight" value={`${match.capacity} Tons`} />
            <InfoTile icon={Truck} label="Truck Capacity" value={`${match.truckCapacity} Tons`} />
            <InfoTile icon={Clock} label="Pickup Time" value={formatTime(match.pickupTime)} />
            <InfoTile icon={Clock} label="Delivery Deadline" value={formatDateTime(match.deliveryDeadline)} />
            <InfoTile icon={IndianRupee} label="Est. Earnings" value={formatCurrency(match.estimatedEarnings)} highlight />
            <InfoTile icon={Shield} label="Reliability" value={`${match.reliabilityScore}/100`} />
          </div>

          {/* Capacity utilization */}
          <div className="rounded-lg border border-border p-4">
            <div className="mb-2 flex items-center gap-2">
              <Layers className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-bold">Capacity Utilization</h3>
            </div>
            {match.partialLoad ? (
              <CapacityBarMulti
                loads={[
                  { label: 'Shipment A', amount: 4 },
                  { label: 'Shipment B', amount: 3 },
                  { label: 'Shipment C', amount: 2 },
                ]}
                totalCapacity={match.truckCapacity}
              />
            ) : (
              <CapacityBar used={match.capacity} total={match.truckCapacity} unit="Tons" />
            )}
          </div>

          {/* Match reasons */}
          <div className="rounded-lg border border-border p-4">
            <h3 className="mb-3 text-sm font-bold">Match Analysis</h3>
            <div className="space-y-2">
              {match.reasons?.map((reason, i) => (
                <div key={i} className="flex items-start gap-2">
                  {reason.passed ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                  ) : (
                    <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                  )}
                  <div>
                    <p className="text-sm font-medium">{reason.label}</p>
                    <p className="text-xs text-muted-foreground">{reason.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Environmental impact */}
          <div className="rounded-lg border border-secondary/20 bg-secondary/5 p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-secondary" />
              <h3 className="text-sm font-bold">Environmental Impact</h3>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="font-bold text-secondary">{match.emptyKmAvoided} km</p>
                <p className="text-xs text-muted-foreground">Empty KM avoided</p>
              </div>
              <div>
                <p className="font-bold text-secondary">{match.co2Saved} kg</p>
                <p className="text-xs text-muted-foreground">CO₂ saved</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={() => onReject(match)}
              className="flex-1 rounded-lg border border-border py-2.5 text-sm font-semibold text-muted-foreground hover:bg-muted"
            >
              Reject
            </button>
            <button
              onClick={() => onAccept(match)}
              className="flex-1 rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Accept Match
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoTile({ icon: Icon, label, value, highlight }) {
  return (
    <div className={`rounded-lg border p-3 ${highlight ? 'border-primary/30 bg-primary/5' : 'border-border'}`}>
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Icon className="h-3.5 w-3.5" /> {label}
      </div>
      <p className={`mt-1 text-sm font-bold ${highlight ? 'text-primary' : ''}`}>{value}</p>
    </div>
  );
}

