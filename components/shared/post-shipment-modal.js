'use client';

import { X } from 'lucide-react';
import { useState } from 'react';
import { VEHICLE_TYPES, SHIPMENT_TYPES } from '@/lib/mock-data';
import { CITIES } from '@/lib/cities';
import { validateShipmentForm } from '@/lib/use-shipments';

export function PostShipmentModal({ onClose, onSubmit }) {
  const [form, setForm] = useState({
    pickupLocation: 'mumbai',
    deliveryLocation: 'delhi',
    weight: '',
    volume: '',
    shipmentType: 'General Goods',
    requiredVehicleType: 'heavy-truck',
    pickupDateTime: '',
    deliveryDeadline: '',
    specialRequirements: '',
  });
  const [errors, setErrors] = useState({});

  const update = (k, v) => {
    setForm((p) => ({ ...p, [k]: v }));
    setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateShipmentForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl animate-modal-in max-h-[90vh] overflow-y-auto scrollbar-thin">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold">Post New Shipment</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Pickup Location</label>
              <select value={form.pickupLocation} onChange={(e) => update('pickupLocation', e.target.value)} className="w-full rounded-lg border border-border bg-background py-2.5 px-3 text-sm outline-none focus:border-primary">
                {CITIES.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              {errors.pickupLocation && <p className="mt-1 text-[11px] text-destructive">{errors.pickupLocation}</p>}
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Delivery Location</label>
              <select value={form.deliveryLocation} onChange={(e) => update('deliveryLocation', e.target.value)} className="w-full rounded-lg border border-border bg-background py-2.5 px-3 text-sm outline-none focus:border-primary">
                {CITIES.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              {errors.deliveryLocation && <p className="mt-1 text-[11px] text-destructive">{errors.deliveryLocation}</p>}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Weight (Tons)</label>
              <input type="number" value={form.weight} onChange={(e) => update('weight', e.target.value)} placeholder="8" className="w-full rounded-lg border border-border bg-background py-2.5 px-3 text-sm outline-none focus:border-primary" />
              {errors.weight && <p className="mt-1 text-[11px] text-destructive">{errors.weight}</p>}
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Volume (m³)</label>
              <input type="number" value={form.volume} onChange={(e) => update('volume', e.target.value)} placeholder="32" className="w-full rounded-lg border border-border bg-background py-2.5 px-3 text-sm outline-none focus:border-primary" />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Shipment Type</label>
            <select value={form.shipmentType} onChange={(e) => update('shipmentType', e.target.value)} className="w-full rounded-lg border border-border bg-background py-2.5 px-3 text-sm outline-none focus:border-primary">
              {SHIPMENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Required Vehicle Type</label>
            <select value={form.requiredVehicleType} onChange={(e) => update('requiredVehicleType', e.target.value)} className="w-full rounded-lg border border-border bg-background py-2.5 px-3 text-sm outline-none focus:border-primary">
              {VEHICLE_TYPES.map((v) => <option key={v.id} value={v.id}>{v.label} ({v.capacityRange})</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Pickup Date & Time</label>
              <input type="datetime-local" value={form.pickupDateTime} onChange={(e) => update('pickupDateTime', e.target.value)} className="w-full rounded-lg border border-border bg-background py-2.5 px-3 text-sm outline-none focus:border-primary" />
              {errors.pickupDateTime && <p className="mt-1 text-[11px] text-destructive">{errors.pickupDateTime}</p>}
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Delivery Deadline</label>
              <input type="datetime-local" value={form.deliveryDeadline} onChange={(e) => update('deliveryDeadline', e.target.value)} className="w-full rounded-lg border border-border bg-background py-2.5 px-3 text-sm outline-none focus:border-primary" />
              {errors.deliveryDeadline && <p className="mt-1 text-[11px] text-destructive">{errors.deliveryDeadline}</p>}
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Special Requirements</label>
            <textarea value={form.specialRequirements} onChange={(e) => update('specialRequirements', e.target.value)} placeholder="Fragile, temperature-controlled, etc." rows={2} className="w-full rounded-lg border border-border bg-background py-2.5 px-3 text-sm outline-none focus:border-primary resize-none" />
          </div>
          <div className="flex gap-2 pt-2">
            <button type="button" onClick={onClose} className="rounded-lg border border-border px-4 py-2.5 text-sm font-semibold hover:bg-muted">Cancel</button>
            <button type="submit" className="btn-gradient-primary flex-1 rounded-lg py-2.5 text-sm font-semibold text-primary-foreground">Post Shipment</button>
          </div>
        </form>
      </div>
    </div>
  );
}
