'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Truck,
  Package,
  Brain,
  Wallet,
  Leaf,
  User,
  Settings,
  LogOut,
  Bell,
  Menu,
  X,
  Sun,
  Moon,
  Route,
  MapPin,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/auth-context';
import { useI18n } from '@/lib/i18n';
import { useTheme } from '@/components/shared/theme-provider';
import { NOTIFICATIONS } from '@/lib/mock-data';
import { Globe } from 'lucide-react';

const NAV_CONFIG = {
  trucker: [
    { href: '/dashboard/trucker', tKey: 'dashboard', icon: LayoutDashboard, exact: true },
    { href: '/dashboard/trucker/matches', tKey: 'matches', icon: Truck },
    { href: '/dashboard/trucker/trips', tKey: 'trips', icon: Route },
    { href: '/dashboard/trucker/tracking', tKey: 'liveTrackingNav', icon: MapPin },
    { href: '/dashboard/trucker/predictions', tKey: 'predictions', icon: Brain },
    { href: '/dashboard/trucker/earnings', tKey: 'earnings', icon: Wallet },
    { href: '/dashboard/trucker/impact', tKey: 'impact', icon: Leaf },
  ],
  shipper: [
    { href: '/dashboard/shipper', tKey: 'dashboard', icon: LayoutDashboard, exact: true },
    { href: '/dashboard/shipper/shipments', tKey: 'shipments', icon: Package },
    { href: '/dashboard/shipper/matches', tKey: 'matches', icon: Truck },
    { href: '/dashboard/shipper/tracking', tKey: 'liveTrackingNav', icon: MapPin },
    { href: '/dashboard/shipper/predictions', tKey: 'predictions', icon: Brain },
    { href: '/dashboard/shipper/impact', tKey: 'impact', icon: Leaf },
  ],
  admin: [
    { href: '/dashboard/admin', tKey: 'dashboard', icon: LayoutDashboard, exact: true },
    { href: '/dashboard/admin/users', tKey: 'users', icon: User },
    { href: '/dashboard/admin/corridors', tKey: 'corridors', icon: Route },
    { href: '/dashboard/admin/impact', tKey: 'impact', icon: Leaf },
    { href: '/dashboard/admin/settings', tKey: 'settings', icon: Settings },
  ],
};

export function DashboardLayout({ children, role = 'trucker', title, subtitle }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { user, loading, logout } = useAuth();
  const { t, lang, setLang, currency, setCurrency } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
    if (!loading && user && user.role !== role) {
      if (user.role === 'admin' && role !== 'admin') {
        // admins can view all
      } else if (role !== 'admin') {
        router.push(`/dashboard/${user.role}`);
      }
    }
  }, [user, loading, role, router]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const navItems = NAV_CONFIG[role] || NAV_CONFIG.trucker;
  const unreadCount = NOTIFICATIONS.filter((n) => !n.read).length;

  const profileHref = `/dashboard/${role}/profile`;
  const settingsHref = `/dashboard/${role}/settings`;

  const isActive = (item) => {
    if (item.exact) return pathname === item.href;
    return pathname === item.href || pathname.startsWith(item.href + '/');
  };

  return (
    <div className="relative flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-sidebar-border bg-sidebar transition-transform duration-300 lg:static lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between px-5">
          <Link href="/">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17l4-4 4 2 6-6" />
                  <path d="M21 7l-4 4" />
                  <circle cx="3" cy="17" r="1.5" fill="currentColor" />
                  <circle cx="21" cy="7" r="1.5" fill="currentColor" />
                </svg>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display text-base font-extrabold tracking-tight text-sidebar-foreground">PRATIGATI</span>
                <span className="mt-0.5 text-[10px] uppercase tracking-[0.15em] text-sidebar-muted">{t('landingFreightIntel')}</span>
              </div>
            </div>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="text-sidebar-foreground lg:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto scrollbar-thin px-4 py-2">
          {navItems.map((item) => {
            const active = isActive(item);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[15px] font-medium transition-all duration-200',
                  active
                    ? 'nav-active-glow text-accent'
                    : 'text-sidebar-foreground hover:bg-muted hover:text-primary'
                )}
              >
                <item.icon className={cn('h-[18px] w-[18px] shrink-0 transition-colors', active ? 'text-accent' : 'text-sidebar-foreground group-hover:text-accent')} />
                {t(item.tKey)}
                {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_2px_hsl(var(--accent)/0.4)]" />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="space-y-1 border-t border-sidebar-border px-4 py-3">
          <Link
            href={profileHref}
            className={cn(
              'group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[15px] font-medium transition-all',
              pathname === profileHref
                ? 'nav-active-glow text-accent'
                : 'text-sidebar-foreground hover:bg-muted hover:text-primary'
            )}
          >
            <User className={cn('h-[18px] w-[18px] shrink-0', pathname === profileHref ? 'text-accent' : 'text-sidebar-foreground group-hover:text-accent')} />
            {t('profile')}
          </Link>
          <Link
            href={settingsHref}
            className={cn(
              'group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[15px] font-medium transition-all',
              pathname === settingsHref
                ? 'nav-active-glow text-accent'
                : 'text-sidebar-foreground hover:bg-muted hover:text-primary'
            )}
          >
            <Settings className={cn('h-[18px] w-[18px] shrink-0', pathname === settingsHref ? 'text-accent' : 'text-sidebar-foreground group-hover:text-accent')} />
            {t('settings')}
          </Link>
          <button
            onClick={logout}
            className="group flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-[15px] font-medium text-sidebar-foreground transition-all hover:bg-destructive/8 hover:text-destructive"
          >
            <LogOut className="h-[18px] w-[18px] shrink-0 text-sidebar-foreground group-hover:text-destructive" />
            {t('logout')}
          </button>
        </div>
      </aside>

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content area */}
      <div className="relative z-10 flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-20 items-center justify-between border-b border-border bg-background px-5 lg:px-8">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="text-foreground lg:hidden">
              <Menu className="h-5 w-5" />
            </button>
            <div>
              {title && <h1 className="font-display text-2xl font-extrabold tracking-tight lg:text-[32px]">{title}</h1>}
              {subtitle && <p className="mt-0.5 text-sm text-muted-foreground lg:text-[15px]">{subtitle}</p>}
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Language toggle */}
            <button
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              className="flex h-10 items-center gap-1 rounded-xl border border-border px-2.5 text-xs font-bold text-muted-foreground transition-all hover:border-primary/30 hover:text-foreground"
              aria-label="Toggle language"
            >
              <Globe className="h-4 w-4" />
              {lang === 'en' ? 'EN' : 'हिं'}
            </button>

            {/* Currency toggle */}
            <button
              onClick={() => setCurrency(currency === 'INR' ? 'USD' : 'INR')}
              className="flex h-10 items-center gap-1 rounded-xl border border-border px-2.5 text-xs font-bold text-muted-foreground transition-all hover:border-primary/30 hover:text-foreground"
              aria-label="Toggle currency"
            >
              {currency === 'INR' ? '₹ INR' : '$ USD'}
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-muted-foreground transition-all hover:border-primary/30 hover:text-foreground"
              aria-label="Toggle theme"
            >
              {mounted && theme === 'dark' ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
            </button>

            {/* Notifications */}
            <NotificationBell
              notifOpen={notifOpen}
              setNotifOpen={setNotifOpen}
              unreadCount={unreadCount}
              mounted={mounted}
              t={t}
            />

            {/* User profile */}
            <Link
              href={profileHref}
              className="flex items-center gap-3 rounded-xl border border-border px-3 py-2 transition-all hover:border-primary/30"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary">
                {user.avatar || user.name?.charAt(0).toUpperCase()}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold leading-none">{user.name}</p>
                <p className="mt-1 text-xs capitalize text-muted-foreground">{user.role}</p>
              </div>
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto scrollbar-thin">
          {children}
        </main>
      </div>
    </div>
  );
}

function NotificationBell({ notifOpen, setNotifOpen, unreadCount, mounted, t }) {
  return (
    <div className="relative">
      <button
        onClick={() => setNotifOpen(!notifOpen)}
        className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-border text-muted-foreground transition-all hover:border-primary/30 hover:text-foreground"
      >
        <Bell className="h-[18px] w-[18px]" />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground shadow-lg shadow-destructive/30">
            {unreadCount}
          </span>
        )}
      </button>

      {notifOpen && mounted && createPortal(
        <>
          <div className="fixed inset-0 z-[200]" onClick={() => setNotifOpen(false)} />
          <div
            className="fixed z-[201] w-[340px] overflow-hidden rounded-2xl border border-border bg-popover shadow-2xl animate-scale-in"
            style={{
              top: '80px',
              right: '20px',
            }}
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <span className="font-display text-base font-bold">{t('notificationsTitle')}</span>
              <span className="rounded-full bg-destructive/10 px-2.5 py-1 text-[11px] font-bold text-destructive">{unreadCount} {t('newLabel')}</span>
            </div>
            <div className="max-h-[400px] overflow-y-auto scrollbar-thin">
              {NOTIFICATIONS.map((n) => (
                <div key={n.id} className={cn('border-b border-border px-5 py-3.5 transition-colors hover:bg-muted/50', !n.read && 'bg-primary/5')}>
                  <div className="flex items-start gap-3">
                    <div className={cn('mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full', n.priority === 'high' ? 'bg-destructive' : n.priority === 'medium' ? 'bg-primary' : 'bg-muted-foreground/30')} />
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{n.title}</p>
                      <p className="mt-0.5 text-[13px] text-muted-foreground">{n.message}</p>
                      <p className="mt-1 text-[11px] text-muted-foreground/60">{n.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>,
        document.body
      )}
    </div>
  );
}
