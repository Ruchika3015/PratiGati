'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Logo } from './logo';
import { useTheme } from '@/components/shared/theme-provider';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/benefits', label: 'Benefits & Impact' },
];

export function PublicNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => { setMounted(true); }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/">
          <Logo size="md" />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-all hover:border-primary/30 hover:text-foreground"
            aria-label="Toggle theme"
          >
            {mounted && theme === 'dark' ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
          </button>
          <Link
            href="/login"
            className="rounded-md px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="btn-gradient-primary rounded-md px-4 py-2 text-sm font-semibold text-primary-foreground"
          >
            Sign Up
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground"
            aria-label="Toggle theme"
          >
            {mounted && theme === 'dark' ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
          </button>
          <button
            className="rounded-md p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="space-y-1 px-4 py-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-2">
              <Link
                href="/login"
                className="flex-1 rounded-md border border-border px-4 py-2 text-center text-sm font-semibold"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="btn-gradient-primary flex-1 rounded-md px-4 py-2 text-center text-sm font-semibold text-primary-foreground"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export function PublicFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Logo size="sm" />
          <p className="text-xs text-muted-foreground">
            Smart India Hackathon 2026 — Transportation & Logistics
          </p>
          <p className="text-xs text-muted-foreground">
            Predict. Match. Optimize. Save.
          </p>
        </div>
      </div>
    </footer>
  );
}
