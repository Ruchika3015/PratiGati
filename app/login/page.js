'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, Truck, Package, Shield, ArrowRight, ArrowLeft } from 'lucide-react';
import { Logo } from '@/components/shared/logo';
import { useAuth } from '@/lib/auth-context';
import { useI18n } from '@/lib/i18n';
import { toast } from 'sonner';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('trucker');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();
  const { t } = useI18n();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter email and password');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const user = login(email, role);
      toast.success(`Welcome back, ${user.name}!`);
      if (user.role === 'trucker') router.push('/dashboard/trucker');
      else if (user.role === 'shipper') router.push('/dashboard/shipper');
      else if (user.role === 'admin') router.push('/dashboard/admin');
    }, 600);
  };

  const quickLogin = (selectedRole, email) => {
    setLoading(true);
    const defaultEmails = {
      trucker: 'rajesh.kumar@pratigati.in',
      shipper: 'priya.sharma@relianceretail.in',
      admin: 'admin@pratigati.in',
    };
    const loginEmail = email || defaultEmails[selectedRole];
    const user = login(loginEmail, selectedRole);
    toast.success(`Logged in as ${user.name}`);
    if (selectedRole === 'trucker') router.push('/dashboard/trucker');
    else if (selectedRole === 'shipper') router.push('/dashboard/shipper');
    else router.push('/dashboard/admin');
  };

  const truckerAccounts = [
    { email: 'rajesh.kumar@pratigati.in', name: 'Rajesh Kumar' },
    { email: 'irfan@pratigati.in', name: 'Mohammed Irfan' },
    { email: 'suresh.patel@pratigati.in', name: 'Suresh Patel' },
  ];
  const shipperAccounts = [
    { email: 'priya.sharma@relianceretail.in', name: 'Priya Sharma' },
    { email: 'vikram@constructionplus.in', name: 'Vikram Reddy' },
    { email: 'anjali@freshfarmlogistics.in', name: 'Anjali Mehta' },
  ];

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4">
      <div className="absolute inset-0 route-grid-bg opacity-30" />
      <div className="absolute left-0 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />

      <div className="relative w-full max-w-md">
        <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>

        <div className="rounded-xl border border-border bg-card/80 p-6 shadow-xl backdrop-blur sm:p-8">
          <div className="mb-6 flex justify-center">
            <Logo size="lg" showText={false} />
          </div>
          <h1 className="text-center font-display text-2xl font-bold">{t('welcomeBack')}</h1>
          <p className="mt-1 text-center text-sm text-muted-foreground">
            Sign in to your PratiGati account
          </p>

          {/* Role selector */}
          <div className="mt-6 grid grid-cols-3 gap-2">
            {[
              { id: 'trucker', label: 'Trucker', icon: Truck },
              { id: 'shipper', label: 'Shipper', icon: Package },
              { id: 'admin', label: 'Admin', icon: Shield },
            ].map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRole(r.id)}
                className={`flex flex-col items-center gap-1 rounded-lg border p-3 text-xs font-semibold transition-all ${
                  role === r.id
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border text-muted-foreground hover:border-primary/30'
                }`}
              >
                <r.icon className="h-4 w-4" />
                {r.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {t('email')}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-3 text-sm outline-none transition-colors focus:border-primary"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {t('password')}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-10 text-sm outline-none transition-colors focus:border-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-muted-foreground">
                <input type="checkbox" className="rounded border-border" defaultChecked />
                {t('rememberMe')}
              </label>
              <Link href="#" className="font-semibold text-primary hover:underline">
                {t('forgotPassword')}
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
            >
              {loading ? t('signingIn') : <>{t('signIn')} <ArrowRight className="h-4 w-4" /></>}
            </button>
          </form>

          {/* Quick demo login */}
          <div className="mt-5 border-t border-border pt-4">
            <p className="mb-2 text-center text-xs text-muted-foreground">{t('quickDemoLogin')}</p>
            <div className="space-y-2">
              <div>
                <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70">{t('truckers')}</p>
                <div className="grid grid-cols-1 gap-1.5">
                  {truckerAccounts.map((acc) => (
                    <button
                      key={acc.email}
                      onClick={() => quickLogin('trucker', acc.email)}
                      className="flex items-center justify-between rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:border-primary/30 hover:bg-muted"
                    >
                      <span>{acc.name}</span>
                      <span className="text-muted-foreground">{acc.email}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70">{t('shippers')}</p>
                <div className="grid grid-cols-1 gap-1.5">
                  {shipperAccounts.map((acc) => (
                    <button
                      key={acc.email}
                      onClick={() => quickLogin('shipper', acc.email)}
                      className="flex items-center justify-between rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:border-primary/30 hover:bg-muted"
                    >
                      <span>{acc.name}</span>
                      <span className="text-muted-foreground">{acc.email}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70">Admin</p>
                <button
                  onClick={() => quickLogin('admin')}
                  className="flex w-full items-center justify-center rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:border-primary/30 hover:bg-muted"
                >
                  {t('platformAdmin')}
                </button>
              </div>
            </div>
          </div>

          <p className="mt-5 text-center text-sm text-muted-foreground">
            {t('dontHaveAccount')}{' '}
            <Link href="/signup" className="font-semibold text-primary hover:underline">
              {t('signUp')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
