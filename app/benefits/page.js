import Link from 'next/link';
import { IndianRupee, Leaf, Route, TrendingUp, Truck, Package, Gauge, Fuel, Clock, Shield, Activity, BarChart3, ArrowRight } from 'lucide-react';
import { PublicNavbar, PublicFooter } from '@/components/shared/public-navbar';

export default function BenefitsPage() {
  const truckerBenefits = [
    { icon: IndianRupee, title: 'Earn from return trips', desc: 'Turn empty return journeys into revenue. Average ₹8,500 additional earnings per matched return trip.' },
    { icon: Route, title: 'Reduce empty kilometers', desc: 'Stop driving back empty. Our platform matches your return route with available shipments automatically.' },
    { icon: Gauge, title: 'Maximize capacity utilization', desc: 'Partial-load matching fills your truck with multiple compatible shipments, increasing utilization to 90%+.' },
    { icon: Shield, title: 'Reliable partnerships', desc: 'Connect with verified shippers. Carrier reliability scores ensure trustworthy business relationships.' },
    { icon: Clock, title: 'Save time', desc: 'No more searching for return loads. Predictive matching brings opportunities to you before you are even empty.' },
    { icon: TrendingUp, title: 'Grow your business', desc: 'Data-driven insights help you optimize routes, track earnings, and scale your fleet efficiently.' },
  ];

  const shipperBenefits = [
    { icon: IndianRupee, title: 'Lower transport costs', desc: 'Access available return-trip capacity at competitive rates. Save up to 30% on logistics costs.' },
    { icon: Truck, title: 'Find trucks faster', desc: 'Predictive matching shows available trucks before they are even empty. Get matched in minutes, not hours.' },
    { icon: Package, title: 'Flexible shipping', desc: 'Post full or partial shipments. Our engine handles everything from single loads to multi-stop consolidation.' },
    { icon: Shield, title: 'Verified carriers', desc: 'Every trucker is verified with reliability scores, on-time rates, and performance history.' },
    { icon: Activity, title: 'Real-time tracking', desc: 'Track shipments from pickup to delivery. Get notified at every milestone.' },
    { icon: BarChart3, title: 'Analytics & insights', desc: 'Understand your shipping patterns, cost savings, and corridor performance with detailed analytics.' },
  ];

  const envStats = [
    { icon: Route, label: 'Empty KM Avoided', value: '1,84,200', unit: 'kilometers', color: 'primary' },
    { icon: Fuel, label: 'Fuel Saved', value: '43,800', unit: 'liters', color: 'amber' },
    { icon: Leaf, label: 'CO₂ Reduced', value: '64,200', unit: 'kg', color: 'secondary' },
    { icon: IndianRupee, label: 'Cost Saved', value: '₹31.2L', unit: 'total', color: 'primary' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />

      <section className="relative overflow-hidden pt-24 pb-12">
        <div className="absolute inset-0 route-grid-bg opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">
              <Leaf className="h-3.5 w-3.5" /> Impact & Benefits
            </div>
            <h1 className="font-display text-4xl font-bold sm:text-5xl">Benefits & Impact</h1>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              PratiGati creates value for truckers, shippers, and the environment — turning waste into worth.
            </p>
          </div>
        </div>
      </section>

      {/* Environmental Impact Stats */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-center font-display text-2xl font-bold">Platform-Wide Environmental Impact</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {envStats.map((stat, i) => (
                <div key={i} className="rounded-lg border border-border bg-muted/30 p-5 text-center">
                  <stat.icon className={`mx-auto mb-2 h-7 w-7 text-${stat.color}`} />
                  <p className="font-display text-2xl font-bold tabular-nums">{stat.value}</p>
                  <p className="text-sm font-semibold">{stat.label}</p>
                  <p className="text-xs text-muted-foreground">{stat.unit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trucker Benefits */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-primary" />
              <h2 className="font-display text-2xl font-bold">For Truckers & Fleet Owners</h2>
            </div>
            <p className="mt-1 text-muted-foreground">Turn your empty return trips into earning opportunities.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {truckerBenefits.map((b, i) => (
              <div key={i} className="rounded-lg border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-md">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <b.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-bold">{b.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shipper Benefits */}
      <section className="border-t border-border bg-card/50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              <h2 className="font-display text-2xl font-bold">For Shippers & Businesses</h2>
            </div>
            <p className="mt-1 text-muted-foreground">Find reliable trucks faster and ship smarter.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {shipperBenefits.map((b, i) => (
              <div key={i} className="rounded-lg border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-md">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                  <b.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-bold">{b.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold">Start saving today</h2>
          <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
            Join the logistics intelligence platform that makes every journey count.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/signup?role=trucker" className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              <Truck className="h-4 w-4" /> Sign Up as Trucker
            </Link>
            <Link href="/signup?role=shipper" className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-semibold hover:border-primary/40">
              <Package className="h-4 w-4" /> Sign Up as Shipper
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
