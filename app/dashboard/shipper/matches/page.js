'use client';

import { useState } from 'react';
import { Filter, X, CheckCircle2, MapPin, Truck, IndianRupee, Shield, Navigation, Star, Clock } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { MatchScoreRing } from '@/components/shared/match-score-ring';
import { RouteMap } from '@/components/shared/route-map';
import { TRUCKERS, getCityName, getVehicleTypeLabel, formatCurrency } from '@/lib/mock-data';
import { toast } from 'sonner';

export default function ShipperMatchesPage() {
  const [filter, setFilter] = useState('all');
  const [selectedTrucker, setSelectedTrucker] = useState(null);

  const filteredTruckers = filter === 'available'
    ? TRUCKERS.filter((t) => t.status === 'available')
    : filter === 'high'
    ? TRUCKERS.filter((t) => t.reliabilityScore >= 90)
    : TRUCKERS;

  const handleRequest = (trucker) => {
    toast.success(`Truck request sent to ${trucker.name}`, {
      description: `${trucker.vehicleNumber} · ${getCityName(trucker.currentLocation)}`,
    });
    setSelectedTrucker(null);
  };

  return (
    <DashboardLayout role="shipper" title="Recommended Trucks" subtitle="Available trucks matched to your shipment requirements">
      <div className="p-4 lg:p-6">
        <div className="mb-4 flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          {[
            { id: 'all', label: 'All Trucks' },
            { id: 'available', label: 'Available Now' },
            { id: 'high', label: 'High Reliability (90+)' },
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
          <span className="ml-auto text-xs text-muted-foreground">{filteredTruckers.length} trucks found</span>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {filteredTruckers.map((trucker, i) => {
            const score = 96 - i * 4;
            return (
              <div key={trucker.id} className="rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-md">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary">
                      {trucker.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{trucker.name}</p>
                      <p className="text-xs text-muted-foreground">{trucker.vehicleNumber} · {getVehicleTypeLabel(trucker.vehicleType)}</p>
                      <div className="mt-0.5 flex items-center gap-2 text-[10px] text-muted-foreground">
                        <span className="flex items-center gap-0.5"><Star className="h-3 w-3 text-amber-500" /> {trucker.rating}</span>
                        <span>·</span>
                        <span>{trucker.completedTrips} trips</span>
                      </div>
                    </div>
                  </div>
                  <MatchScoreRing score={score} size={56} stroke={5} showLabel={false} />
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                  <div className="rounded-md border border-border p-2">
                    <p className="text-muted-foreground">Capacity</p>
                    <p className="font-bold">{trucker.vehicleCapacity}T</p>
                  </div>
                  <div className="rounded-md border border-border p-2">
                    <p className="text-muted-foreground">Location</p>
                    <p className="font-bold">{getCityName(trucker.currentLocation)}</p>
                  </div>
                  <div className="rounded-md border border-border p-2">
                    <p className="text-muted-foreground">Reliability</p>
                    <p className="font-bold text-secondary">{trucker.reliabilityScore}/100</p>
                  </div>
                </div>

                <div className="mt-2 flex items-center gap-3 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-secondary" /> {trucker.onTimeRate}% on-time</span>
                  <span>·</span>
                  <span>Responds in {trucker.responseTime}</span>
                  <span className={`ml-auto rounded-full px-2 py-0.5 text-[9px] font-bold uppercase ${trucker.status === 'available' ? 'bg-secondary/15 text-secondary' : 'bg-amber-500/15 text-amber-500'}`}>
                    {trucker.status === 'available' ? 'Available' : 'On Trip'}
                  </span>
                </div>

                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => setSelectedTrucker(trucker)}
                    className="flex-1 rounded-md border border-border py-1.5 text-xs font-semibold hover:bg-muted"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleRequest(trucker)}
                    className="flex-1 rounded-md bg-primary py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
                  >
                    Request Truck
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trucker details drawer */}
      {selectedTrucker && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedTrucker(null)} />
          <div className="relative h-full w-full max-w-md overflow-y-auto scrollbar-thin border-l border-border bg-card animate-slide-in-right">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card/90 px-5 py-4 backdrop-blur">
              <h2 className="font-display text-lg font-bold">Trucker Profile</h2>
              <button onClick={() => setSelectedTrucker(null)} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 text-xl font-bold text-primary">
                  {selectedTrucker.avatar}
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold">{selectedTrucker.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedTrucker.truckModel}</p>
                  <div className="mt-1 flex items-center gap-2 text-xs">
                    <Star className="h-3.5 w-3.5 text-amber-500" />
                    <span className="font-semibold">{selectedTrucker.rating}</span>
                    <span className="text-muted-foreground">· {selectedTrucker.completedTrips} completed trips</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-border p-3">
                  <p className="text-xs text-muted-foreground">Vehicle Number</p>
                  <p className="font-bold text-sm">{selectedTrucker.vehicleNumber}</p>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <p className="text-xs text-muted-foreground">Vehicle Type</p>
                  <p className="font-bold text-sm">{getVehicleTypeLabel(selectedTrucker.vehicleType)}</p>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <p className="text-xs text-muted-foreground">Capacity</p>
                  <p className="font-bold text-sm">{selectedTrucker.vehicleCapacity} Tons</p>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <p className="text-xs text-muted-foreground">Current Location</p>
                  <p className="font-bold text-sm">{getCityName(selectedTrucker.currentLocation)}</p>
                </div>
              </div>

              {/* Reliability breakdown */}
              <div className="rounded-lg border border-border p-4">
                <h4 className="mb-3 text-sm font-bold">Reliability Score Breakdown</h4>
                <div className="flex items-center gap-4">
                  <MatchScoreRing score={selectedTrucker.reliabilityScore} size={80} stroke={6} showLabel={false} />
                  <div className="flex-1 space-y-1.5">
                    <ReliabilityBar label="On-time delivery" value={selectedTrucker.onTimeRate} />
                    <ReliabilityBar label="Completion rate" value={Math.round((selectedTrucker.completedTrips / (selectedTrucker.completedTrips + selectedTrucker.cancelledTrips)) * 100)} />
                    <ReliabilityBar label="Response speed" value={Math.max(60, 100 - parseInt(selectedTrucker.responseTime) * 4)} />
                  </div>
                </div>
              </div>

              {/* Preferred routes */}
              <div className="rounded-lg border border-border p-4">
                <h4 className="mb-2 text-sm font-bold">Preferred Routes</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedTrucker.preferredRoutes.map((route, i) => (
                    <span key={i} className="flex items-center gap-1 rounded-md border border-border bg-muted/30 px-2.5 py-1 text-xs font-medium">
                      <Navigation className="h-3 w-3 text-primary" /> {route.replace('-', ' → ')}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-border p-4">
                <h4 className="mb-2 text-sm font-bold">Additional Info</h4>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between"><span className="text-muted-foreground">Member since</span><span className="font-medium">{selectedTrucker.memberSince}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">GPS Enabled</span><span className="font-medium">{selectedTrucker.gpsEnabled ? 'Yes' : 'No'}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Verified</span><span className="font-medium text-secondary">{selectedTrucker.verified ? 'Yes' : 'No'}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Permit Type</span><span className="font-medium">{selectedTrucker.permitType}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Fuel Efficiency</span><span className="font-medium">{selectedTrucker.fuelEfficiency}</span></div>
                </div>
              </div>

              <button
                onClick={() => handleRequest(selectedTrucker)}
                className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Request This Truck
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

function ReliabilityBar({ label, value }) {
  return (
    <div>
      <div className="flex justify-between text-[10px]">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-bold">{value}%</span>
      </div>
      <div className="mt-0.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-secondary transition-all duration-700" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
