'use client';

import Link from 'next/link';
import { Truck, Package, Shield, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Logo } from '@/components/shared/logo';

export default function RoleSelectionPage() {
  const roles = [
    {
      id: 'trucker',
      title: 'Trucker / Fleet Owner',
      desc: 'Post your available return-trip capacity and get matched with shipments on your route.',
      icon: Truck,
      features: ['Post truck availability', 'Get matched with shipments', 'Track earnings & impact', 'Manage trips'],
      href: '/signup?role=trucker',
      color: 'primary',
    },
    {
      id: 'shipper',
      title: 'Shipper / Business',
      desc: 'Post shipment requirements and get matched with available trucks instantly.',
      icon: Package,
      features: ['Post shipment requirements', 'Find available trucks', 'Track shipments', 'Analyze costs'],
      href: '/signup?role=shipper',
      color: 'secondary',
    },
    {
      id: 'admin',
      title: 'Platform Admin',
      desc: 'Monitor platform activity, manage users, and view system-wide analytics.',
      icon: Shield,
      features: ['Platform-wide analytics', 'User management', 'Corridor insights', 'Match monitoring'],
      href: '/login',
      color: 'amber',
    },
  ];

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-12">
      <div className="absolute inset-0 route-grid-bg opacity-30" />
      <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />

      <div className="relative w-full max-w-4xl">
        <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>

        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <Logo size="lg" showText={false} />
          </div>
          <h1 className="font-display text-3xl font-bold sm:text-4xl">Choose Your Role</h1>
          <p className="mt-2 text-muted-foreground">Select how you want to use PratiGati</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {roles.map((r) => (
            <Link
              key={r.id}
              href={r.href}
              className="group flex flex-col rounded-xl border border-border bg-card/80 p-6 backdrop-blur transition-all hover:border-primary/40 hover:shadow-xl"
            >
              <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-${r.color}/10 text-${r.color}`}>
                <r.icon className="h-7 w-7" />
              </div>
              <h2 className="font-display text-xl font-bold">{r.title}</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">{r.desc}</p>
              <div className="mt-4 flex-1 space-y-2">
                {r.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-secondary" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                Get Started <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-primary hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
