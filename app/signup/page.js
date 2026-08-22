'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, User, Phone, Truck, Package, ArrowRight, ArrowLeft, MapPin, Building2, CheckCircle2 } from 'lucide-react';
import { Logo } from '@/components/shared/logo';
import { useAuth } from '@/lib/auth-context';
import { VEHICLE_TYPES, BUSINESS_TYPES } from '@/lib/mock-data';
import { CITIES } from '@/lib/cities';
import { toast } from 'sonner';

function SignupForm() {
  const searchParams = useSearchParams();
  const initialRole = searchParams.get('role') || 'trucker';
  const [role, setRole] = useState(initialRole);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const router = useRouter();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    // Trucker fields
    vehicleNumber: '',
    vehicleType: 'heavy-truck',
    vehicleCapacity: '',
    currentLocation: 'delhi',
    preferredRoutes: [],
    // Shipper fields
    companyName: '',
    businessType: 'Manufacturing',
    commonPickups: [],
    commonDeliveries: [],
  });

  const update = (key, val) => setFormData((p) => ({ ...p, [key]: val }));

  const toggleArray = (key, val) => {
    setFormData((p) => {
      const arr = p[key] || [];
      return {
        ...p,
        [key]: arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val],
      };
    });
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      toast.error('Please fill all required fields');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      try {
        const user = register(formData, role);
        toast.success(`Account created! Welcome, ${user.name}!`);
        if (role === 'trucker') router.push('/dashboard/trucker');
        else if (role === 'shipper') router.push('/dashboard/shipper');
      } catch (err) {
        toast.error(err.message || 'Failed to create account');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-12">
      <div className="absolute inset-0 route-grid-bg opacity-30" />
      <div className="absolute left-0 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />

      <div className="relative w-full max-w-lg">
        <Link href="/role-selection" className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to role selection
        </Link>

        <div className="rounded-xl border border-border bg-card/80 p-6 shadow-xl backdrop-blur sm:p-8">
          <div className="mb-6 flex justify-center">
            <Logo size="lg" showText={false} />
          </div>
          <h1 className="text-center font-display text-2xl font-bold">
            Sign Up as {role === 'trucker' ? 'Trucker' : role === 'shipper' ? 'Shipper' : 'Admin'}
          </h1>
          <p className="mt-1 text-center text-sm text-muted-foreground">
            Create your PratiGati account
          </p>

          {/* Role tabs */}
          <div className="mt-5 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setRole('trucker')}
              className={`flex items-center justify-center gap-2 rounded-lg border p-2.5 text-sm font-semibold transition-all ${
                role === 'trucker' ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground hover:border-primary/30'
              }`}
            >
              <Truck className="h-4 w-4" /> Trucker
            </button>
            <button
              type="button"
              onClick={() => setRole('shipper')}
              className={`flex items-center justify-center gap-2 rounded-lg border p-2.5 text-sm font-semibold transition-all ${
                role === 'shipper' ? 'border-secondary bg-secondary/10 text-secondary' : 'border-border text-muted-foreground hover:border-secondary/30'
              }`}
            >
              <Package className="h-4 w-4" /> Shipper
            </button>
          </div>

          {/* Step indicator */}
          <div className="mt-5 flex items-center justify-center gap-2">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                  step >= s ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {step > s ? <CheckCircle2 className="h-3.5 w-3.5" /> : s}
                </div>
                {s < 2 && <div className={`h-px w-12 ${step > s ? 'bg-primary' : 'bg-border'}`} />}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            {step === 1 && (
              <>
                <FormField icon={User} label="Full Name" value={formData.name} onChange={(v) => update('name', v)} placeholder="Your name" />
                <FormField icon={Mail} label="Email" type="email" value={formData.email} onChange={(v) => update('email', v)} placeholder="you@example.com" />
                <FormField icon={Phone} label="Phone" value={formData.phone} onChange={(v) => update('phone', v)} placeholder="+91 98765 43210" />
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => update('password', e.target.value)}
                      placeholder="••••••••"
                      className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-10 text-sm outline-none focus:border-primary"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  Continue <ArrowRight className="h-4 w-4" />
                </button>
              </>
            )}

            {step === 2 && role === 'trucker' && (
              <>
                <FormField icon={Truck} label="Vehicle Number" value={formData.vehicleNumber} onChange={(v) => update('vehicleNumber', v)} placeholder="e.g. RJ14 CA 1234" />
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Vehicle Type</label>
                  <select
                    value={formData.vehicleType}
                    onChange={(e) => update('vehicleType', e.target.value)}
                    className="w-full rounded-lg border border-border bg-background py-2.5 px-3 text-sm outline-none focus:border-primary"
                  >
                    {VEHICLE_TYPES.map((v) => (
                      <option key={v.id} value={v.id}>{v.label} ({v.capacityRange})</option>
                    ))}
                  </select>
                </div>
                <FormField icon={Package} label="Vehicle Capacity (Tons)" type="number" value={formData.vehicleCapacity} onChange={(v) => update('vehicleCapacity', v)} placeholder="20" />
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Current Location</label>
                  <select
                    value={formData.currentLocation}
                    onChange={(e) => update('currentLocation', e.target.value)}
                    className="w-full rounded-lg border border-border bg-background py-2.5 px-3 text-sm outline-none focus:border-primary"
                  >
                    {CITIES.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Preferred Routes (select multiple)</label>
                  <div className="grid grid-cols-2 gap-2">
                    {CITIES.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => toggleArray('preferredRoutes', c.id)}
                        className={`flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-all ${
                          formData.preferredRoutes?.includes(c.id)
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border text-muted-foreground hover:border-primary/30'
                        }`}
                      >
                        <MapPin className="h-3 w-3" /> {c.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => setStep(1)} className="rounded-lg border border-border px-4 py-2.5 text-sm font-semibold hover:bg-muted">
                    Back
                  </button>
                  <button type="submit" disabled={loading} className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
                    {loading ? 'Creating account...' : <>Create Account <ArrowRight className="h-4 w-4" /></>}
                  </button>
                </div>
              </>
            )}

            {step === 2 && role === 'shipper' && (
              <>
                <FormField icon={Building2} label="Company / Business Name" value={formData.companyName} onChange={(v) => update('companyName', v)} placeholder="Reliance Retail Logistics" />
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Business Type</label>
                  <select
                    value={formData.businessType}
                    onChange={(e) => update('businessType', e.target.value)}
                    className="w-full rounded-lg border border-border bg-background py-2.5 px-3 text-sm outline-none focus:border-primary"
                  >
                    {BUSINESS_TYPES.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Common Pickup Locations</label>
                  <div className="grid grid-cols-2 gap-2">
                    {CITIES.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => toggleArray('commonPickups', c.id)}
                        className={`flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-all ${
                          formData.commonPickups?.includes(c.id) ? 'border-secondary bg-secondary/10 text-secondary' : 'border-border text-muted-foreground hover:border-secondary/30'
                        }`}
                      >
                        <MapPin className="h-3 w-3" /> {c.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Common Delivery Locations</label>
                  <div className="grid grid-cols-2 gap-2">
                    {CITIES.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => toggleArray('commonDeliveries', c.id)}
                        className={`flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-all ${
                          formData.commonDeliveries?.includes(c.id) ? 'border-secondary bg-secondary/10 text-secondary' : 'border-border text-muted-foreground hover:border-secondary/30'
                        }`}
                      >
                        <MapPin className="h-3 w-3" /> {c.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => setStep(1)} className="rounded-lg border border-border px-4 py-2.5 text-sm font-semibold hover:bg-muted">
                    Back
                  </button>
                  <button type="submit" disabled={loading} className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
                    {loading ? 'Creating account...' : <>Create Account <ArrowRight className="h-4 w-4" /></>}
                  </button>
                </div>
              </>
            )}
          </form>

          <p className="mt-5 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-primary hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function FormField({ icon: Icon, label, value, onChange, placeholder, type = 'text' }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-3 text-sm outline-none focus:border-primary"
        />
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <SignupForm />
    </Suspense>
  );
}
