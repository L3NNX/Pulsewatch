'use client';

import React, { useState } from 'react';
import {
  Bell,
  Plus,
  Mail,
  MessageSquare,
  Hash,
  Webhook,
  ToggleLeft,
  ToggleRight,
  Trash2,
  Edit,
  CheckCircle2,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

type ChannelType = 'EMAIL' | 'DISCORD' | 'SLACK' | 'WEBHOOK';

interface AlertChannel {
  id: string;
  name: string;
  type: ChannelType;
  target: string;
  isEnabled: boolean;
}

const channelIcons: Record<ChannelType, React.ElementType> = {
  EMAIL: Mail,
  DISCORD: MessageSquare,
  SLACK: Hash,
  WEBHOOK: Webhook,
};

const channelColors: Record<ChannelType, string> = {
  EMAIL: 'bg-blue-50 border-blue-200 text-blue-600',
  DISCORD: 'bg-indigo-50 border-indigo-200 text-indigo-600',
  SLACK: 'bg-purple-50 border-purple-200 text-purple-600',
  WEBHOOK: 'bg-orange-50 border-orange-200 text-orange-600',
};

// Demo data
const demoChannels: AlertChannel[] = [
  { id: '1', name: 'Team Email', type: 'EMAIL', target: 'alerts@acme.dev', isEnabled: true },
  { id: '2', name: 'Ops Discord', type: 'DISCORD', target: '#incident-alerts', isEnabled: true },
  { id: '3', name: 'Slack Eng', type: 'SLACK', target: '#engineering', isEnabled: false },
  { id: '4', name: 'PagerDuty Hook', type: 'WEBHOOK', target: 'https://hooks.pagerduty.com/...', isEnabled: true },
];

export default function AlertsPage() {
  const [channels, setChannels] = useState(demoChannels);
  const [showAddModal, setShowAddModal] = useState(false);

  const toggleChannel = (id: string) => {
    setChannels((prev) =>
      prev.map((ch) => (ch.id === id ? { ...ch, isEnabled: !ch.isEnabled } : ch))
    );
  };

  const deleteChannel = (id: string) => {
    setChannels((prev) => prev.filter((ch) => ch.id !== id));
  };

  const enabledCount = channels.filter((c) => c.isEnabled).length;

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 pb-6 border-b border-[#171e19]/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f8f9fa] border border-[#171e19]/10 font-anton text-xs uppercase text-[#171e19] mb-2">
            <span className="h-2 w-2 rounded-full bg-[#ffe17c]" />
            NOTIFICATIONS
          </div>
          <h1 className="font-anton text-4xl sm:text-5xl uppercase tracking-normal text-[#171e19]">
            ALERT CHANNELS
          </h1>
          <p className="font-satoshi text-sm text-[#171e19]/60 mt-1">
            Configure where incident notifications are delivered.
          </p>
        </div>
        <Button
          variant="primary"
          size="md"
          onClick={() => setShowAddModal(true)}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          ADD CHANNEL
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {(['EMAIL', 'DISCORD', 'SLACK', 'WEBHOOK'] as ChannelType[]).map((type) => {
          const Icon = channelIcons[type];
          const count = channels.filter((c) => c.type === type).length;
          return (
            <div key={type} className="rounded-2xl border border-[#171e19]/10 bg-white p-4 flex items-center gap-3">
              <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${channelColors[type]} border`}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-anton text-xs uppercase text-[#171e19]/50">{type}</p>
                <p className="font-anton text-xl text-[#171e19]">{count}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Alert routing info */}
      <div className="rounded-2xl border border-[#ffe17c]/40 bg-[#ffe17c]/10 p-5 flex items-start gap-4">
        <Zap className="h-5 w-5 text-[#171e19] shrink-0 mt-0.5" />
        <div>
          <p className="font-satoshi text-sm font-bold text-[#171e19]">Alert Routing</p>
          <p className="font-satoshi text-xs text-[#171e19]/70 mt-0.5">
            When a monitor goes DOWN, all <strong className="text-[#171e19]">{enabledCount} enabled</strong> channels receive
            an instant notification. Alerts are also sent when incidents are auto-resolved.
          </p>
        </div>
      </div>

      {/* Channels list */}
      <div className="space-y-3">
        {channels.length === 0 ? (
          <div className="rounded-2xl border border-[#171e19]/10 bg-[#f8f9fa] p-12 text-center">
            <Bell className="h-10 w-10 text-[#171e19]/20 mx-auto mb-3" />
            <p className="font-anton text-xl uppercase text-[#171e19]">No channels configured</p>
            <p className="font-satoshi text-sm text-[#171e19]/50 mt-1">
              Add a notification channel to receive incident alerts.
            </p>
          </div>
        ) : (
          channels.map((ch) => {
            const Icon = channelIcons[ch.type];
            return (
              <div
                key={ch.id}
                className={`rounded-2xl border bg-white p-5 flex items-center justify-between gap-4 transition-all ${
                  ch.isEnabled ? 'border-[#171e19]/10' : 'border-[#171e19]/5 opacity-60'
                }`}
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className={`h-11 w-11 rounded-xl flex items-center justify-center ${channelColors[ch.type]} border shrink-0`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-anton text-base uppercase text-[#171e19]">{ch.name}</p>
                    <p className="font-satoshi text-xs text-[#171e19]/50 truncate">{ch.target}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {/* Toggle */}
                  <button
                    onClick={() => toggleChannel(ch.id)}
                    className="p-2 rounded-lg hover:bg-[#f8f9fa] transition-colors"
                    title={ch.isEnabled ? 'Disable' : 'Enable'}
                  >
                    {ch.isEnabled ? (
                      <ToggleRight className="h-6 w-6 text-green-500" />
                    ) : (
                      <ToggleLeft className="h-6 w-6 text-[#171e19]/30" />
                    )}
                  </button>
                  <button
                    className="p-2 rounded-lg border border-[#171e19]/10 hover:bg-neutral-100 transition-colors"
                    title="Edit"
                  >
                    <Edit className="h-3.5 w-3.5 text-[#171e19]/60" />
                  </button>
                  <button
                    onClick={() => deleteChannel(ch.id)}
                    className="p-2 rounded-lg border border-[#171e19]/10 hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

