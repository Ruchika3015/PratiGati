'use client';

import { Navigation, Clock, MapPin, CheckCircle2, AlertCircle, Calendar, IndianRupee, Leaf, TrendingUp } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { TRIPS, getCityName, formatCurrency, formatDate } from '@/lib/mock-data';
import { useAuth } from '@/lib/auth-context';

export default function TruckerTripsPage() {
  const { user } = useAuth();
  const myTrips = TRIPS.filter((t) => t.truckerId === user?.profile?.id || t.truckerId === 'trk-001');
  const upcoming = myTrips.filter((t) => t.status === 'upcoming');
  const completed = myTrips.filter((t) => t.status === 'completed');
  const cancelled = myTrips.filter((t) => t.status === 'cancelled');

  const stats = {
    total: myTrips.length,
    completed: completed.length,
    loadedReturns: myTrips.filter((t) => t.loadedReturn).length,
    totalEarnings: myTrips.reduce((sum, t) => sum + (t.earnings || 0), 0),
  };

  return (
    <DashboardLayout role="trucker" title="My Trips" subtitle="Your trip history and upcoming journeys">
      <div className="p-4 lg:p-6">
        <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatCard label="Total Trips" value={stats.total} icon={Navigation} />
          <StatCard label="Completed" value={stats.completed} icon={CheckCircle2} />
          <StatCard label="Loaded Returns" value={stats.loadedReturns} icon={TrendingUp} />
          <StatCard label="Total Earnings" value={formatCurrency(stats.totalEarnings)} icon={IndianRupee} />
        </div>

        {upcoming.length > 0 && (
          <Section title="Upcoming Trips" count={upcoming.length}>
            {upcoming.map((trip) => (
              <TripRow key={trip.id} trip={trip} />
            ))}
          </Section>
        )}

        <Section title="Completed Trips" count={completed.length}>
          {completed.map((trip) => (
            <TripRow key={trip.id} trip={trip} />
          ))}
        </Section>

        {cancelled.length > 0 && (
          <Section title="Cancelled Trips" count={cancelled.length}>
            {cancelled.map((trip) => (
              <TripRow key={trip.id} trip={trip} />
            ))}
          </Section>
        )}
      </div>
    </DashboardLayout>
  );
}

function StatCard({ label, value, icon: Icon }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="mb-2 flex items-center gap-2 text-muted-foreground">
        <Icon className="h-4 w-4" />
        <span className="text-xs font-medium uppercase tracking-wide">{label}</span>
      </div>
      <p className="font-display text-xl font-bold">{value}</p>
    </div>
  );
}

function Section({ title, count, children }) {
  return (
    <div className="mb-5">
      <h2 className="mb-3 font-display text-base font-bold">{title} <span className="text-sm font-normal text-muted-foreground">({count})</span></h2>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function TripRow({ trip }) {
  const statusConfig = {
    completed: { color: 'text-secondary', bg: 'bg-secondary/10', icon: CheckCircle2, label: 'Completed' },
    upcoming: { color: 'text-primary', bg: 'bg-primary/10', icon: Clock, label: 'Upcoming' },
    cancelled: { color: 'text-destructive', bg: 'bg-destructive/10', icon: AlertCircle, label: 'Cancelled' },
  };
  const s = statusConfig[trip.status] || statusConfig.completed;
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${s.bg} ${s.color}`}>
        <s.icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold">{getCityName(trip.route.from)} → {getCityName(trip.route.to)}</p>
        <p className="text-xs text-muted-foreground">{trip.shipmentType} · {trip.weight}T · {formatDate(trip.date)}</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-bold">{trip.earnings > 0 ? formatCurrency(trip.earnings) : '—'}</p>
        <p className={`text-[10px] font-semibold ${s.color}`}>{s.label}</p>
      </div>
    </div>
  );
}
