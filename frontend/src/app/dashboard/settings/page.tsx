'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  User as UserIcon,
  Mail,
  Shield,
  Key,
  Bell,
  Save,
  CheckCircle2,
  Lock,
  Copy,
  Terminal,
} from 'lucide-react';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/Button';

export default function SettingsPage() {
  const { data: userData } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => api.getMe(),
    retry: false,
  });

  const user = userData?.user;

  // Form states
  const [name, setName] = useState(user?.name || 'PulseWatch Operator');
  const [email] = useState(user?.email || 'demo@pulsewatch.dev');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);

  // Notification toggles
  const [notifyOutages, setNotifyOutages] = useState(true);
  const [notifyRecovery, setNotifyRecovery] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(false);

  const demoApiKey = 'pw_live_99f8e4381b99a0224d075ebf118';

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const copyApiKey = () => {
    navigator.clipboard.writeText(demoApiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="space-y-10 max-w-4xl">
      {/* Header */}
      <div className="pb-6 border-b border-[#171e19]/10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f8f9fa] border border-[#171e19]/10 font-anton text-xs uppercase text-[#171e19] mb-2">
          <span className="h-2 w-2 rounded-full bg-[#ffe17c]" />
          PREFERENCES &amp; SECURITY
        </div>
        <h1 className="font-anton text-4xl sm:text-5xl uppercase tracking-normal text-[#171e19]">
          ACCOUNT SETTINGS
        </h1>
        <p className="font-satoshi text-sm text-[#171e19]/60 mt-1">
          Manage your operator profile, security credentials, and alert preferences.
        </p>
      </div>

      {savedSuccess && (
        <div className="rounded-xl border border-green-200 bg-green-50 p-4 flex items-center gap-3 text-sm text-green-700 font-satoshi font-medium animate-in fade-in">
          <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
          Settings updated successfully.
        </div>
      )}

      {/* Section 1: Profile Info */}
      <section className="rounded-2xl border border-[#171e19]/10 bg-white p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-[#171e19]/5">
          <div className="h-10 w-10 rounded-xl bg-[#171e19] text-[#ffe17c] flex items-center justify-center font-anton text-base">
            <UserIcon className="h-5 w-5 text-[#ffe17c]" />
          </div>
          <div>
            <h2 className="font-anton text-xl uppercase text-[#171e19]">Profile Details</h2>
            <p className="font-satoshi text-xs text-[#171e19]/50">Your identity within the incident console.</p>
          </div>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block font-satoshi text-xs font-bold uppercase tracking-wider text-[#171e19]/70 mb-2">
                Operator Display Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-[#171e19]/15 bg-white px-4 py-3 text-sm font-satoshi text-[#171e19] focus:outline-none focus:border-[#171e19]"
                />
              </div>
            </div>

            <div>
              <label className="block font-satoshi text-xs font-bold uppercase tracking-wider text-[#171e19]/70 mb-2">
                Email Address (Primary Contact)
              </label>
              <div className="relative">
                <input
                  type="email"
                  disabled
                  value={email}
                  className="w-full rounded-xl border border-[#171e19]/10 bg-[#f8f9fa] px-4 py-3 text-sm font-satoshi text-[#171e19]/50 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Button variant="primary" size="md" className="gap-2">
              <Save className="h-4 w-4" />
              SAVE PROFILE
            </Button>
          </div>
        </form>
      </section>

      {/* Section 2: Password / Security */}
      <section className="rounded-2xl border border-[#171e19]/10 bg-white p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-[#171e19]/5">
          <div className="h-10 w-10 rounded-xl bg-[#171e19] text-[#ffe17c] flex items-center justify-center font-anton text-base">
            <Lock className="h-5 w-5 text-[#ffe17c]" />
          </div>
          <div>
            <h2 className="font-anton text-xl uppercase text-[#171e19]">Security &amp; Password</h2>
            <p className="font-satoshi text-xs text-[#171e19]/50">Keep your account guarded with a strong password.</p>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSavedSuccess(true);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setTimeout(() => setSavedSuccess(false), 3000);
          }}
          className="space-y-4"
        >
          <div>
            <label className="block font-satoshi text-xs font-bold uppercase tracking-wider text-[#171e19]/70 mb-2">
              Current Password
            </label>
            <input
              type="password"
              placeholder="••••••••••••"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full rounded-xl border border-[#171e19]/15 bg-white px-4 py-3 text-sm font-satoshi text-[#171e19] focus:outline-none focus:border-[#171e19]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-satoshi text-xs font-bold uppercase tracking-wider text-[#171e19]/70 mb-2">
                New Password
              </label>
              <input
                type="password"
                placeholder="At least 8 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full rounded-xl border border-[#171e19]/15 bg-white px-4 py-3 text-sm font-satoshi text-[#171e19] focus:outline-none focus:border-[#171e19]"
              />
            </div>
            <div>
              <label className="block font-satoshi text-xs font-bold uppercase tracking-wider text-[#171e19]/70 mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                placeholder="Repeat new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-xl border border-[#171e19]/15 bg-white px-4 py-3 text-sm font-satoshi text-[#171e19] focus:outline-none focus:border-[#171e19]"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Button variant="secondary" size="md">
              UPDATE PASSWORD
            </Button>
          </div>
        </form>
      </section>

      {/* Section 3: API Keys */}
      <section className="rounded-2xl border border-[#171e19]/10 bg-white p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-[#171e19]/5">
          <div className="h-10 w-10 rounded-xl bg-[#171e19] text-[#ffe17c] flex items-center justify-center font-anton text-base">
            <Terminal className="h-5 w-5 text-[#ffe17c]" />
          </div>
          <div>
            <h2 className="font-anton text-xl uppercase text-[#171e19]">Developer API Access</h2>
            <p className="font-satoshi text-xs text-[#171e19]/50">Use this token to query probe metrics and trigger checks via CLI / CI/CD.</p>
          </div>
        </div>

        <div className="space-y-3">
          <label className="block font-satoshi text-xs font-bold uppercase tracking-wider text-[#171e19]/70">
            Active Read/Write Token
          </label>
          <div className="flex items-center gap-2 rounded-xl bg-[#f8f9fa] border border-[#171e19]/10 px-4 py-3">
            <Key className="h-4 w-4 text-[#171e19]/40 shrink-0" />
            <code className="flex-1 font-mono text-sm text-[#171e19] truncate">{demoApiKey}</code>
            <button
              onClick={copyApiKey}
              className="p-1.5 rounded-lg hover:bg-white border border-transparent hover:border-[#171e19]/10 text-xs font-satoshi font-bold text-[#171e19]/70 hover:text-[#171e19] transition-all flex items-center gap-1.5"
            >
              {copiedKey ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <p className="font-satoshi text-xs text-[#171e19]/50">
            Never expose this key in public client repositories. Pass as <code>Authorization: Bearer &lt;token&gt;</code>.
          </p>
        </div>
      </section>

      {/* Section 4: Notification Preferences */}
      <section className="rounded-2xl border border-[#171e19]/10 bg-white p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-[#171e19]/5">
          <div className="h-10 w-10 rounded-xl bg-[#171e19] text-[#ffe17c] flex items-center justify-center font-anton text-base">
            <Bell className="h-5 w-5 text-[#ffe17c]" />
          </div>
          <div>
            <h2 className="font-anton text-xl uppercase text-[#171e19]">Notification Preferences</h2>
            <p className="font-satoshi text-xs text-[#171e19]/50">Choose when PulseWatch sends operational email digests.</p>
          </div>
        </div>

        <div className="space-y-4">
          <label className="flex items-center justify-between p-4 rounded-xl border border-[#171e19]/10 hover:bg-[#f8f9fa] transition-colors cursor-pointer">
            <div>
              <p className="font-satoshi text-sm font-bold text-[#171e19]">Instant Outage Alerts</p>
              <p className="font-satoshi text-xs text-[#171e19]/60">Trigger email when any monitor fails 3 consecutive health probes.</p>
            </div>
            <input
              type="checkbox"
              checked={notifyOutages}
              onChange={(e) => setNotifyOutages(e.target.checked)}
              className="h-5 w-5 accent-[#171e19] rounded cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-4 rounded-xl border border-[#171e19]/10 hover:bg-[#f8f9fa] transition-colors cursor-pointer">
            <div>
              <p className="font-satoshi text-sm font-bold text-[#171e19]">Auto-Recovery Notifications</p>
              <p className="font-satoshi text-xs text-[#171e19]/60">Notify me as soon as a downed endpoint recovers and is marked UP.</p>
            </div>
            <input
              type="checkbox"
              checked={notifyRecovery}
              onChange={(e) => setNotifyRecovery(e.target.checked)}
              className="h-5 w-5 accent-[#171e19] rounded cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-4 rounded-xl border border-[#171e19]/10 hover:bg-[#f8f9fa] transition-colors cursor-pointer">
            <div>
              <p className="font-satoshi text-sm font-bold text-[#171e19]">Weekly Uptime Summary</p>
              <p className="font-satoshi text-xs text-[#171e19]/60">Every Monday morning overview of 7-day latency percentiles and downtime.</p>
            </div>
            <input
              type="checkbox"
              checked={weeklyReport}
              onChange={(e) => setWeeklyReport(e.target.checked)}
              className="h-5 w-5 accent-[#171e19] rounded cursor-pointer"
            />
          </label>
        </div>
      </section>
    </div>
  );
}

