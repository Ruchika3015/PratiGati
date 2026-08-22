'use client';

import { useState } from 'react';
import { Bell, Shield, Globe, Package } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { toast } from 'sonner';
import { useI18n } from '@/lib/i18n';

export default function ShipperSettingsPage() {
  const { t, lang, setLang } = useI18n();
  const [settings, setSettings] = useState({
    notifMatches: true,
    notifShipments: true,
    notifTrips: false,
    autoAccept: false,
    currency: 'INR',
  });

  const toggle = (key) => setSettings((p) => ({ ...p, [key]: !p[key] }));

  const handleSave = () => {
    toast.success('Settings saved successfully');
  };

  return (
    <DashboardLayout role="shipper" title={t('settings')} subtitle="Manage your preferences and account settings">
      <div className="p-5 lg:p-8">
        <div className="grid gap-5 lg:grid-cols-2">
          <SettingsGroup title={t('notifications')} icon={Bell}>
            <ToggleRow label={t('matchRecommendations')} desc="Get notified when trucks are matched" value={settings.notifMatches} onChange={() => toggle('notifMatches')} />
            <ToggleRow label={t('capacityPredictions')} desc="Status changes and delivery notifications" value={settings.notifShipments} onChange={() => toggle('notifShipments')} />
            <ToggleRow label={t('tripUpdates')} desc="Pickup and delivery reminders" value={settings.notifTrips} onChange={() => toggle('notifTrips')} />
          </SettingsGroup>

          <SettingsGroup title={t('matching')} icon={Package}>
            <ToggleRow label="Auto-accept high-score trucks" desc="Automatically accept trucks above 90% reliability" value={settings.autoAccept} onChange={() => toggle('autoAccept')} />
          </SettingsGroup>

          <SettingsGroup title={t('preferences')} icon={Globe}>
            <SelectRow label={t('language')} value={lang} options={[{ value: 'en', label: 'English' }, { value: 'hi', label: 'हिंदी' }]} onChange={(v) => setLang(v)} />
            <SelectRow label={t('currency')} value={settings.currency} options={[{ value: 'INR', label: 'INR (₹)' }, { value: 'USD', label: 'USD ($)' }]} onChange={(v) => setSettings((p) => ({ ...p, currency: v }))} />
          </SettingsGroup>

          <SettingsGroup title={t('security')} icon={Shield}>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-[15px] font-medium">{t('changePassword')}</p>
                <p className="text-xs text-muted-foreground">Last changed 3 months ago</p>
              </div>
              <button className="rounded-lg border border-border px-3.5 py-2 text-xs font-semibold hover:bg-muted">Change</button>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-[15px] font-medium">{t('twoFactor')}</p>
                <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
              </div>
              <button className="rounded-lg border border-border px-3.5 py-2 text-xs font-semibold hover:bg-muted">Enable</button>
            </div>
          </SettingsGroup>
        </div>

        <div className="mt-6">
          <button
            onClick={handleSave}
            className="btn-gradient-primary rounded-xl px-6 py-3 text-[15px] font-semibold text-primary-foreground"
          >
            {t('saveChanges')}
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}

function SettingsGroup({ title, icon: Icon, children }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-[18px] w-[18px] text-primary" />
        </div>
        <h2 className="font-display text-lg font-bold">{title}</h2>
      </div>
      <div className="divide-y divide-border">{children}</div>
    </div>
  );
}

function ToggleRow({ label, desc, value, onChange }) {
  return (
    <div className="flex items-center justify-between py-3.5">
      <div>
        <p className="text-[15px] font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
      <button
        onClick={onChange}
        className={`relative h-7 w-12 rounded-full transition-all duration-300 ${value ? 'bg-accent shadow-[0_0_12px_-2px_hsl(var(--accent)/0.4)]' : 'bg-muted'}`}
      >
        <span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-md transition-all duration-300 ${value ? 'left-6' : 'left-1'}`} />
      </button>
    </div>
  );
}

function SelectRow({ label, value, options, onChange }) {
  return (
    <div className="flex items-center justify-between py-3.5">
      <p className="text-[15px] font-medium">{label}</p>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-border bg-background px-3.5 py-2 text-sm font-medium outline-none transition-colors focus:border-primary"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}
