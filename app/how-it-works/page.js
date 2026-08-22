import Link from 'next/link';
import { Brain, Zap, Layers, Leaf, Route, MapPin, Truck, Package, Navigation, Activity, Shield, Gauge, ArrowRight, CheckCircle2, IndianRupee } from 'lucide-react';
import { PublicNavbar, PublicFooter } from '@/components/shared/public-navbar';
import { RouteMap } from '@/components/shared/route-map';
import { MatchScoreRing } from '@/components/shared/match-score-ring';
import { CapacityBar } from '@/components/shared/capacity-bar';

export default function HowItWorksPage() {
  const steps = [
    {
      icon: Brain,
      title: '1. Predict',
      desc: 'Our system analyzes historical trip data, route patterns, and demand signals to forecast where empty truck capacity will appear — before the truck is even empty.',
      points: ['Historical route analysis', 'Time-window predictions', 'Corridor-level forecasting', 'Confidence scoring'],
    },
    {
      icon: Zap,
      title: '2. Match',
      desc: 'The smart matching engine connects available return-trip capacity with shipment demand using route, time, capacity, and vehicle compatibility signals.',
      points: ['Route alignment scoring', 'Time-window compatibility', 'Capacity matching', 'Vehicle type filtering'],
    },
    {
      icon: Layers,
      title: '3. Optimize',
      desc: 'Partial-load matching combines multiple compatible shipments into a single truck, maximizing capacity utilization and earnings per trip.',
      points: ['Multi-shipment consolidation', 'Capacity utilization bars', 'Route optimization', 'Cost minimization'],
    },
    {
      icon: Leaf,
      title: '4. Save',
      desc: 'Every loaded return journey saves fuel, reduces empty kilometers, cuts logistics costs, and lowers CO₂ emissions across the network.',
      points: ['Empty KM reduction', 'Fuel savings', 'CO₂ emission cuts', 'Cost savings tracking'],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />

      <section className="relative overflow-hidden pt-24 pb-12">
        <div className="absolute inset-0 route-grid-bg opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Activity className="h-3.5 w-3.5" /> The Process
            </div>
            <h1 className="font-display text-4xl font-bold sm:text-5xl">How PratiGati Works</h1>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              A predictive freight-capacity intelligence platform that follows four steps:
              Predict, Match, Optimize, Save.
            </p>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
          {steps.map((step, i) => (
            <div key={i} className="grid items-center gap-6 rounded-xl border border-border bg-card p-6 lg:grid-cols-2">
              <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <h2 className="font-display text-2xl font-bold">{step.title}</h2>
                </div>
                <p className="text-muted-foreground">{step.desc}</p>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {step.points.map((point, j) => (
                    <div key={j} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-secondary" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                {i === 0 && (
                  <RouteMap
                    height={260}
                    showHeatmap
                    predictions={[
                      { route: { from: 'delhi', to: 'jaipur' }, predictedCapacity: 42, demandLevel: 'high' },
                      { route: { from: 'mumbai', to: 'ahmedabad' }, predictedCapacity: 52, demandLevel: 'high' },
                      { route: { from: 'pune', to: 'mumbai' }, predictedCapacity: 38, demandLevel: 'medium' },
                    ]}
                    routes={[
                      { from: 'delhi', to: 'jaipur' },
                      { from: 'mumbai', to: 'ahmedabad' },
                      { from: 'pune', to: 'mumbai' },
                    ]}
                  />
                )}
                {i === 1 && (
                  <div className="flex items-center justify-center rounded-lg border border-border bg-muted/30 p-6" style={{ height: 260 }}>
                    <div className="text-center">
                      <MatchScoreRing score={96} size={120} stroke={8} />
                      <p className="mt-3 text-sm font-semibold">Jaipur → Delhi</p>
                      <p className="text-xs text-muted-foreground">Route, time, capacity & vehicle aligned</p>
                    </div>
                  </div>
                )}
                {i === 2 && (
                  <div className="flex flex-col justify-center rounded-lg border border-border bg-muted/30 p-6" style={{ height: 260 }}>
                    <p className="mb-4 text-sm font-semibold">Truck Capacity: 10 Tons</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-sm bg-primary" /> Shipment A</span>
                        <span className="font-bold">4 Tons</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-sm bg-secondary" /> Shipment B</span>
                        <span className="font-bold">3 Tons</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-sm bg-chart-3" /> Shipment C</span>
                        <span className="font-bold">2 Tons</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <CapacityBar used={9} total={10} unit="Tons" />
                    </div>
                  </div>
                )}
                {i === 3 && (
                  <div className="grid grid-cols-2 gap-3" style={{ height: 260 }}>
                    {[
                      { icon: IndianRupee, label: 'Cost Saved', value: '₹3,180', color: 'primary' },
                      { icon: Route, label: 'Empty KM Avoided', value: '185', color: 'amber' },
                      { icon: Leaf, label: 'CO₂ Saved', value: '82 KG', color: 'secondary' },
                      { icon: Gauge, label: 'Utilization', value: '90%', color: 'secondary' },
                    ].map((s, j) => (
                      <div key={j} className="flex flex-col items-center justify-center rounded-lg border border-border bg-card p-4 text-center">
                        <s.icon className={`mb-2 h-6 w-6 text-${s.color}`} />
                        <p className="font-display text-xl font-bold">{s.value}</p>
                        <p className="text-xs text-muted-foreground">{s.label}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-card/50 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold">Ready to make every return journey count?</h2>
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
