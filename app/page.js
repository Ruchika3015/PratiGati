'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Check,
  Menu,
  Sparkles,
  Truck,
  X,
  Sun,
  Moon,
  Leaf,
  Clock,
  Gauge,
  Navigation,
  Route,
  TrendingUp,
  IndianRupee,
} from 'lucide-react';
import { LogoMark } from '@/components/shared/logo';
import { InfoModal } from '@/components/shared/info-modal';
import { useTheme } from '@/components/shared/theme-provider';
import { useI18n } from '@/lib/i18n';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { t } = useI18n();

  useEffect(() => { setMounted(true); }, []);

  const openModal = (type) => setModalType(type);
  const closeModal = () => setModalType(null);

  const metrics = [
    { value: '25K+', label: t('landingMetric1'), icon: TrendingUp },
    { value: '₹12Cr+', label: t('landingMetric2'), icon: IndianRupee },
    { value: '18K+', label: t('landingMetric3'), icon: Leaf },
  ];

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground selection:bg-primary/30">
      <BackgroundField />
      <LandingNav
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        openModal={openModal}
        theme={theme}
        toggleTheme={toggleTheme}
        mounted={mounted}
        t={t}
      />

      {/* ─── Hero ─── */}
      <section className="relative mx-auto flex min-h-screen max-w-[1440px] flex-col justify-center px-5 pb-12 pt-28 sm:px-8 lg:px-12 lg:pt-32">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Left: copy */}
          <div className="relative z-10 max-w-[600px]">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/[0.06] px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              {t('landingTag')}
              <span className="h-1 w-1 rounded-full bg-secondary" />
              {t('landingTrack')}
            </div>

            <h1 className="font-display text-[clamp(2.25rem,5vw,3.75rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-foreground">
              {t('landingHeroTitle1')}
              <br />
              <span className="text-accent">
                {t('landingHeroTitle2')}
              </span>
            </h1>

            <p className="mt-6 max-w-[520px] text-base leading-7 text-muted-foreground sm:text-[17px]">
              {t('landingHeroText')}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/signup?role=trucker"
                className="btn-gradient-primary group inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-primary-foreground"
              >
                {t('landingCtaShipment')}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/signup?role=shipper"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-5 py-3 text-sm font-semibold text-foreground transition-all hover:border-primary/50 hover:bg-card"
              >
                {t('landingCtaTruck')}
              </Link>
            </div>
          </div>

          {/* Right: logistics tracking card */}
          <TrackingCard t={t} />
        </div>

        {/* Metric cards */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:mt-16">
          {metrics.map((m, i) => (
            <div key={i} className="flex h-full flex-col items-center justify-center rounded-2xl border border-border bg-card/50 px-5 py-6 text-center">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg border border-primary/20 bg-primary/[0.08]">
                <m.icon className="h-5 w-5 text-primary" />
              </div>
              <p className="font-display text-3xl font-bold tracking-[-0.03em] text-foreground sm:text-4xl">{m.value}</p>
              <p className="mt-1.5 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA strip ─── */}
      <section className="relative border-t border-border px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <Truck className="h-4 w-4" /> Predictive freight intelligence
          </div>
          <h2 className="max-w-2xl font-display text-3xl font-bold tracking-[-0.04em] text-foreground sm:text-4xl">
            Less Empty.
            <br />
            <span className="text-accent">More Loaded. More Profitable.</span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
            PratiGati forecasts where unused return capacity will appear and connects it with real shipment demand — building a more profitable and sustainable freight network.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/signup?role=trucker" className="btn-gradient-primary inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-primary-foreground">
              {t('landingCta2Trucker')} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/signup?role=shipper" className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-6 py-3 text-sm font-semibold text-foreground transition hover:border-primary/50 hover:bg-card">
              {t('landingCta2Shipper')}
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-border px-5 py-7 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-xs text-muted-foreground sm:flex-row">
          <Link href="/" className="flex items-center gap-2 text-foreground">
            <LogoMark size={26} />
            <span className="font-display font-bold tracking-wide">PRATIGATI</span>
          </Link>
          <span>{t('landingFooterTag')}</span>
          <span>{t('landingFooterMotto')}</span>
        </div>
      </footer>

      <InfoModal open={!!modalType} onClose={closeModal} type={modalType} />
    </main>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────
function LandingNav({ mobileMenuOpen, setMobileMenuOpen, openModal, theme, toggleTheme, mounted, t }) {
  const navItems = [
    { label: t('landingNavHome'), href: '/', type: null },
    { label: t('landingNavHow'), href: null, type: 'how' },
    { label: t('landingNavFeatures'), href: null, type: 'features' },
    { label: t('landingNavImpact'), href: null, type: 'impact' },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link href="/" className="flex items-center gap-3">
          <LogoMark size={32} />
          <div className="leading-none">
            <div className="font-display text-sm font-bold tracking-[0.1em] text-foreground">PRATIGATI</div>
            <div className="mt-1 text-[8px] uppercase tracking-[0.2em] text-muted-foreground">Predictive Freight Intelligence</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) =>
            item.href ? (
              <Link key={item.label} href={item.href} className="rounded-full px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:text-primary">
                {item.label}
              </Link>
            ) : (
              <button
                key={item.label}
                onClick={() => openModal(item.type)}
                className="rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
              >
                {item.label}
              </button>
            )
          )}
        </nav>

        <div className="hidden items-center gap-2 sm:flex">
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-primary/30 hover:text-foreground"
            aria-label="Toggle theme"
          >
            {mounted && theme === 'dark' ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
          </button>
          <Link href="/login" className="rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground transition hover:text-foreground">{t('landingNavLogin')}</Link>
          <Link href="/signup" className="btn-gradient-primary rounded-full px-4 py-2 text-sm font-bold text-primary-foreground">{t('landingNavSignup')}</Link>
        </div>

        <div className="flex items-center gap-2 sm:hidden">
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-primary/30 hover:text-foreground"
            aria-label="Toggle theme"
          >
            {mounted && theme === 'dark' ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
          </button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="rounded-full border border-border p-2 text-foreground" aria-label="Toggle navigation">
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="border-t border-border bg-background px-5 py-4 sm:hidden">
          <div className="space-y-1">
            {navItems.map((item) =>
              item.href ? (
                <Link key={item.label} href={item.href} onClick={() => setMobileMenuOpen(false)} className="block rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground">{item.label}</Link>
              ) : (
                <button key={item.label} onClick={() => { setMobileMenuOpen(false); openModal(item.type); }} className="block w-full rounded-lg px-3 py-2.5 text-left text-sm text-muted-foreground hover:bg-muted hover:text-foreground">{item.label}</button>
              )
            )}
            <div className="flex gap-2 pt-2">
              <Link href="/login" className="flex-1 rounded-full border border-border px-4 py-2 text-center text-sm font-semibold">{t('landingNavLogin')}</Link>
              <Link href="/signup" className="btn-gradient-primary flex-1 rounded-full px-4 py-2 text-center text-sm font-bold text-primary-foreground">{t('landingNavSignup')}</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

// ─── Background ───────────────────────────────────────────────────
function BackgroundField() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_28%,hsl(var(--accent)/0.14),transparent_32%),radial-gradient(circle_at_18%_68%,hsl(var(--secondary)/0.08),transparent_30%)]" />
      <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.05] [background-image:linear-gradient(hsl(var(--grid-line)/0.5)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--grid-line)/0.5)_1px,transparent_1px)] [background-size:72px_72px]" />
      {[
        { left: '15%', top: '22%' },
        { left: '38%', top: '64%' },
        { left: '62%', top: '38%' },
        { left: '82%', top: '72%' },
        { left: '48%', top: '14%' },
      ].map((d, i) => (
        <span key={i} className="absolute h-1 w-1 animate-pulse rounded-full bg-accent/70" style={{ left: d.left, top: d.top, animationDelay: `${i * 600}ms` }} />
      ))}
    </div>
  );
}

// ─── Tracking Card (Hero Right) ───────────────────────────────────
function TrackingCard({ t }) {
  return (
    <div className="relative">
      <div className="absolute -inset-4 rounded-[40px] bg-[radial-gradient(circle_at_60%_40%,hsl(var(--accent)/0.18),transparent_60%)] blur-2xl" />

      <div className="relative overflow-hidden rounded-2xl border border-border bg-card/90 shadow-[0_30px_120px_-20px_rgba(0,0,0,0.4)] backdrop-blur-xl">
        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
            </div>
            <div className="ml-2 flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary">
                <Truck className="h-3.5 w-3.5 text-primary-foreground" />
              </div>
              <span className="font-display text-[13px] font-bold tracking-wide text-foreground">PRATIGATI</span>
              <span className="hidden text-[10px] text-muted-foreground sm:inline">{t('landingFreightIntel')}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-green-500/25 bg-success/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-success">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" /> {t('landingLiveBadge')}
          </div>
        </div>

        {/* Map area */}
        <div className="relative h-44 overflow-hidden bg-[#0a0e1a] dark:bg-[#060810]">
          {/* Map grid */}
          <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(120,140,200,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(120,140,200,0.4)_1px,transparent_1px)] [background-size:28px_28px]" />
          {/* Subtle road lines */}
          <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 600 180">
            <path d="M0 40 L200 40 L260 90 L420 90 L480 50 L600 50" fill="none" stroke="rgba(100,120,180,0.12)" strokeWidth="1.5" />
            <path d="M0 130 L160 130 L220 100 L380 100 L440 140 L600 140" fill="none" stroke="rgba(100,120,180,0.08)" strokeWidth="1.5" />
            <path d="M100 0 L100 60 L140 100 L140 180" fill="none" stroke="rgba(100,120,180,0.06)" strokeWidth="1" />
            <path d="M380 0 L380 70 L340 110 L340 180" fill="none" stroke="rgba(100,120,180,0.06)" strokeWidth="1" />
          </svg>
          {/* Route line */}
          <svg className="absolute inset-0 h-full w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 600 180">
            <defs>
              <filter id="routeGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path d="M50 130 C160 100 200 50 300 60 S480 120 550 40" fill="none" stroke="rgba(120,130,160,0.2)" strokeWidth="2" strokeDasharray="4 6" />
            <path d="M50 130 C160 100 200 50 300 60 S480 120 550 40" fill="none" stroke="hsl(var(--accent))" strokeWidth="3" strokeLinecap="round" filter="url(#routeGlow)" className="animate-route-dash" />
            {/* Delhi marker */}
            <circle cx="50" cy="130" r="7" fill="hsl(var(--primary))" />
            <circle cx="50" cy="130" r="7" fill="none" stroke="hsl(var(--primary))" strokeOpacity="0.3" strokeWidth="6" className="animate-pulse-soft" />
            <circle cx="50" cy="130" r="3" fill="white" />
            {/* Jaipur marker */}
            <circle cx="550" cy="40" r="7" fill="hsl(var(--accent))" />
            <circle cx="550" cy="40" r="3" fill="white" />
            {/* Truck marker along route */}
            <g style={{ offsetPath: "path('M50 130 C160 100 200 50 300 60 S480 120 550 40')", offsetRotate: "0deg" }} className="animate-truck-along">
              <circle r="10" fill="hsl(var(--accent))" fillOpacity="0.2" />
              <circle r="6" fill="hsl(var(--accent))" />
              <foreignObject x="-7" y="-7" width="14" height="14">
                <div className="flex h-full w-full items-center justify-center">
                  <Truck className="h-3 w-3 text-primary-foreground" />
                </div>
              </foreignObject>
            </g>
          </svg>
          {/* City labels */}
          <span className="absolute bottom-3 left-3 rounded-md bg-black/50 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-sm">DELHI</span>
          <span className="absolute right-3 top-3 rounded-md bg-black/50 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-sm">JAIPUR</span>
          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10">
            <div className="h-full w-[68%] bg-accent" />
          </div>
        </div>

        {/* Trip info row */}
        <div className="grid grid-cols-4 divide-x divide-border border-b border-border">
          <TripStat icon={Navigation} label={t('landingTripStatus')} value={t('landingTripEta')} />
          <TripStat icon={Route} label="Distance" value={t('landingTripDistance')} />
          <TripStat icon={Gauge} label={t('speed')} value={t('landingTripSpeed')} />
          <TripStat icon={Clock} label={t('lastUpdated')} value={t('landingTripUpdated')} />
        </div>

        {/* Vehicle + Return capacity */}
        <div className="grid grid-cols-2 gap-0 divide-x divide-border border-b border-border">
          <div className="px-5 py-4">
            <p className="text-[9px] uppercase tracking-[0.18em] text-muted-foreground">{t('landingVehicle')}</p>
            <p className="mt-1 text-[13px] font-bold text-foreground">{t('landingVehicleModel')}</p>
            <p className="text-[11px] text-muted-foreground">{t('landingVehicleNum')}</p>
          </div>
          <div className="px-5 py-4">
            <p className="text-[9px] uppercase tracking-[0.18em] text-muted-foreground">{t('landingReturnCap')}</p>
            <p className="mt-1 text-[13px] font-bold text-foreground">{t('landingReturnCapValue')}</p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
              <div className="h-full w-[72%] rounded-full bg-accent" />
            </div>
          </div>
        </div>

        {/* Recommended match */}
        <div className="px-5 py-4">
          <div className="rounded-xl border border-accent/25 bg-accent/[0.06] p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-accent">{t('landingMatchTitle')}</p>
                <p className="mt-1 font-display text-base font-bold text-foreground">{t('landingMatchRoute')}</p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">{t('landingMatchDetails')}</p>
              </div>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-accent text-accent">
                <span className="font-display text-sm font-bold">{t('landingMatchScore')}</span>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1"><Check className="h-3 w-3 text-success" /> {t('landingMatchRouteCompat')}</span>
              <span className="flex items-center gap-1"><Check className="h-3 w-3 text-success" /> {t('landingMatchCapCompat')}</span>
              <span className="flex items-center gap-1"><Check className="h-3 w-3 text-success" /> {t('landingMatchTimeCompat')}</span>
            </div>
            <button className="btn-gradient-primary mt-3.5 w-full rounded-lg py-2 text-xs font-bold text-primary-foreground transition hover:opacity-90">
              {t('landingViewMatch')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TripStat({ icon: Icon, label, value }) {
  return (
    <div className="px-3 py-3 text-center">
      <Icon className="mx-auto mb-1 h-3.5 w-3.5 text-muted-foreground" />
      <p className="text-[8px] uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
      <p className="mt-0.5 text-[12px] font-bold text-foreground">{value}</p>
    </div>
  );
}
