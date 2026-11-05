'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Activity,
  AlertTriangle,
  Bell,
  Globe,
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { PulseLogo } from '@/components/ui/PulseLogo';

export const sidebarLinks = [
  {
    href: '/dashboard',
    label: 'Monitors',
    icon: Activity,
    exact: true,
    badge: 'LIVE',
  },
  {
    href: '/dashboard/incidents',
    label: 'Incidents',
    icon: AlertTriangle,
    badge: 'AI',
  },
  {
    href: '/dashboard/alerts',
    label: 'Alert Channels',
    icon: Bell,
  },
  {
    href: '/dashboard/status-pages',
    label: 'Status Pages',
    icon: Globe,
  },
  {
    href: '/dashboard/settings',
    label: 'Settings',
    icon: Settings,
  },
];

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({ collapsed, onToggleCollapse }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={cn(
        'hidden lg:flex flex-col shrink-0 h-[calc(100vh-4rem)] border-r border-[#171e19]/10 bg-white select-none transition-[width] duration-300 ease-in-out relative z-30',
        collapsed ? 'w-[76px]' : 'w-64'
      )}
    >
      {/* ── Circular Collapsible Button Perched on the Border Line (Reference Image 2, 3, 4) ── */}
      <button
        type="button"
        onClick={onToggleCollapse}
        className="absolute -right-3.5 top-6 z-50 h-7 w-7 rounded-full bg-white border border-[#171e19]/20 shadow-sm flex items-center justify-center text-[#171e19]/80 hover:text-[#171e19] hover:border-[#171e19] hover:scale-110 active:scale-95 transition-all cursor-pointer focus:outline-none"
        title={collapsed ? 'Expand sidebar (Ctrl + B)' : 'Collapse sidebar (Ctrl + B)'}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? (
          <ChevronRight className="h-4 w-4 stroke-[2.5]" />
        ) : (
          <ChevronLeft className="h-4 w-4 stroke-[2.5]" />
        )}
      </button>

    

      {/* Navigation Section */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-1">
        {!collapsed && (
          <div className="px-3 pt-3 pb-1">
            <span className="font-anton text-[10px] uppercase tracking-[0.18em] text-[#171e19]/40">
              GENERAL
            </span>
          </div>
        )}

        {sidebarLinks.map((link) => {
          const active = isActive(link.href, link.exact);
          return (
            <Link
              key={link.href}
              href={link.href}
              title={collapsed ? link.label : undefined}
              className={cn(
                'group relative flex items-center rounded-xl transition-all duration-150',
                collapsed
                  ? 'h-11 w-11 mx-auto justify-center'
                  : 'px-3.5 py-2.5 text-sm font-medium gap-3',
                active
                  ? 'bg-[#171e19] text-white shadow-xs'
                  : 'text-[#171e19]/70 hover:text-[#171e19] hover:bg-[#171e19]/5'
              )}
            >
              <link.icon
                className={cn(
                  'h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-110',
                  active ? 'text-[#ffe17c]' : 'text-[#171e19]/50 group-hover:text-[#171e19]'
                )}
              />

              {!collapsed && (
                <div className="flex-1 flex items-center justify-between min-w-0">
                  <span className="font-satoshi font-semibold truncate text-[13px] tracking-tight">
                    {link.label}
                  </span>
                  {link.badge && (
                    <span
                      className={cn(
                        'text-[9px] font-anton px-1.5 py-0.5 rounded uppercase tracking-wider',
                        active
                          ? 'bg-[#ffe17c] text-[#171e19]'
                          : 'bg-[#171e19]/10 text-[#171e19]/60 group-hover:bg-[#171e19]/15'
                      )}
                    >
                      {link.badge}
                    </span>
                  )}
                </div>
              )}

              {/* Floating Tooltip Pill for Collapsed Mode */}
              {collapsed && (
                <div className="absolute left-full ml-3 px-2.5 py-1.5 rounded-lg bg-[#171e19] text-white font-satoshi text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 shadow-md z-50 flex items-center gap-1.5">
                  {link.label}
                  {link.badge && (
                    <span className="text-[9px] font-anton text-[#ffe17c] uppercase">
                      {link.badge}
                    </span>
                  )}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Quota & Info Section */}
      <div className="p-3 border-t border-[#171e19]/8 shrink-0 bg-white">
        {collapsed ? (
          <div className="flex flex-col items-center gap-2">
            <Link
              href="/status/demo"
              target="_blank"
              title="Public Status Page"
              className="h-10 w-10 flex items-center justify-center rounded-xl border border-[#171e19]/10 text-[#171e19]/60 hover:text-[#171e19] hover:bg-[#fafaf9] transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
            </Link>
            <button
              title="Free Plan (10 Probes)"
              className="h-10 w-10 flex items-center justify-center rounded-xl bg-[#ffe17c] text-[#171e19] hover:bg-[#ffd850] transition-colors shadow-xs cursor-pointer"
            >
              <Sparkles className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="rounded-xl bg-[#fafaf9] border border-[#171e19]/10 p-3.5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-[#171e19]" />
                <span className="font-anton text-xs uppercase text-[#171e19] tracking-wider">
                  FREE PLAN
                </span>
              </div>
              <span className="font-mono text-[11px] font-bold text-[#171e19]/60">
                10 PROBES
              </span>
            </div>

            {/* Quota Progress Bar */}
            <div className="h-1.5 w-full bg-white rounded-full border border-[#171e19]/10 overflow-hidden">
              <div className="h-full bg-[#171e19] rounded-full w-2/5" />
            </div>

            <button className="w-full py-2 px-3 rounded-lg bg-[#ffe17c] hover:bg-[#ffd850] text-[#171e19] font-anton text-xs uppercase tracking-wider transition-colors shadow-xs cursor-pointer">
              UPGRADE CAPACITY
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
