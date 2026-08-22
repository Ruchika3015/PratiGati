'use client';

import { Package, Clock, CheckCircle2, Plus } from 'lucide-react';
import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { getCityName, formatCurrency, formatDateTime } from '@/lib/mock-data';
import { useAuth } from '@/lib/auth-context';
import { useShipments } from '@/lib/use-shipments';
import { PostShipmentModal } from '@/components/shared/post-shipment-modal';
import { toast } from 'sonner';

export default function ShipperShipmentsPage() {
  const { user } = useAuth();
  const [showPost, setShowPost] = useState(false);
  const { myShipments, addShipment } = useShipments(user?.profile?.id);

  const active = myShipments.filter((s) => s.status === 'open' || s.status === 'unmatched');
  const matched = myShipments.filter((s) => s.status === 'matched');

  const handlePost = (formData) => {
    addShipment(formData);
    toast.success('Shipment posted successfully! Matching in progress...');
    setShowPost(false);
  };

  return (
    <DashboardLayout role="shipper" title="My Shipments" subtitle="Manage your active and completed shipments">
      <div className="p-4 lg:p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="grid flex-1 grid-cols-2 gap-3 lg:grid-cols-3">
            <StatCard label="Active" value={active.length} icon={Clock} />
            <StatCard label="Matched" value={matched.length} icon={CheckCircle2} />
            <StatCard label="Total" value={myShipments.length} icon={Package} />
          </div>
          <button
            onClick={() => setShowPost(true)}
            className="ml-3 flex shrink-0 items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="h-3.5 w-3.5" /> Post Shipment
          </button>
        </div>

        <div className="space-y-2">
          {myShipments.map((ship) => {
            const isUnmatched = ship.status === 'unmatched';
            return (
              <div key={ship.id} className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${isUnmatched ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'}`}>
                  <Package className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold">{getCityName(ship.pickupLocation)} → {getCityName(ship.deliveryLocation)}</p>
                    {isUnmatched && (
                      <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-[10px] font-bold uppercase text-destructive">Unmatched</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{ship.shipmentType} · {ship.weight}T · Due {formatDateTime(ship.deliveryDeadline)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">{formatCurrency(ship.estimatedCost)}</p>
                  <p className="text-[10px] text-muted-foreground">{ship.distance} km</p>
                </div>
              </div>
            );
          })}
        </div>

        {myShipments.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card p-12 text-center">
            <Package className="mb-3 h-10 w-10 text-muted-foreground/50" />
            <p className="font-semibold">No shipments yet</p>
            <p className="text-sm text-muted-foreground">Post your first shipment to get matched with trucks</p>
          </div>
        )}
      </div>

      {showPost && <PostShipmentModal onClose={() => setShowPost(false)} onSubmit={handlePost} />}
    </DashboardLayout>
  );
}

function StatCard({ label, value, icon: Icon }) {
  return (
    <div className="rounded-lg border border-border bg-card p-3">
      <div className="mb-1 flex items-center gap-2 text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        <span className="text-[10px] font-medium uppercase tracking-wide">{label}</span>
      </div>
      <p className="font-display text-lg font-bold">{value}</p>
    </div>
  );
}
