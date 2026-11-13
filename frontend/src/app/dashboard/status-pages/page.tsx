'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Globe,
  Plus,
  ExternalLink,
  Copy,
  CheckCircle2,
  Eye,
  EyeOff,
  Edit,
  Trash2,
  Activity,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface StatusPageConfig {
  id: string;
  slug: string;
  title: string;
  description: string;
  isPublic: boolean;
  monitors: string[];
  createdAt: string;
}

// Demo data
const demoPages: StatusPageConfig[] = [
  {
    id: '1',
    slug: 'acme',
    title: 'Acme Corp Status',
    description: 'Real-time system status for all Acme services',
    isPublic: true,
    monitors: ['Production API', 'Auth Service', 'Payment Gateway', 'CDN'],
    createdAt: '2026-08-15',
  },
];

export default function StatusPagesPage() {
  const [pages, setPages] = useState(demoPages);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const copyUrl = (slug: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/status/${slug}`);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 pb-6 border-b border-[#171e19]/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f8f9fa] border border-[#171e19]/10 font-anton text-xs uppercase text-[#171e19] mb-2">
            <span className="h-2 w-2 rounded-full bg-green-400" />
            PUBLIC PAGES
          </div>
          <h1 className="font-anton text-4xl sm:text-5xl uppercase tracking-normal text-[#171e19]">
            STATUS PAGES
          </h1>
          <p className="font-satoshi text-sm text-[#171e19]/60 mt-1">
            Branded public status pages for your users. Share your uptime transparently.
          </p>
        </div>
        <Button variant="primary" size="md" className="gap-2">
          <Plus className="h-4 w-4" />
          CREATE PAGE
        </Button>
      </div>

      {/* Pages list */}
      {pages.length === 0 ? (
        <div className="rounded-2xl border border-[#171e19]/10 bg-[#f8f9fa] p-16 text-center">
          <Globe className="h-12 w-12 text-[#171e19]/15 mx-auto mb-4" />
          <p className="font-anton text-xl uppercase text-[#171e19]">No status pages yet</p>
          <p className="font-satoshi text-sm text-[#171e19]/50 mt-1 max-w-sm mx-auto">
            Create a public status page to share your system&apos;s health with customers.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {pages.map((page) => (
            <div
              key={page.id}
              className="rounded-2xl border border-[#171e19]/10 bg-white overflow-hidden"
            >
              {/* Page header */}
              <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-[#171e19] flex items-center justify-center shrink-0">
                    <Globe className="h-6 w-6 text-[#ffe17c]" />
                  </div>
                  <div>
                    <h3 className="font-anton text-2xl uppercase text-[#171e19]">{page.title}</h3>
                    <p className="font-satoshi text-sm text-[#171e19]/60 mt-0.5">{page.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${
                    page.isPublic
                      ? 'bg-green-50 text-green-600 border border-green-200'
                      : 'bg-neutral-100 text-[#171e19]/50 border border-[#171e19]/10'
                  }`}>
                    {page.isPublic ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                    {page.isPublic ? 'PUBLIC' : 'PRIVATE'}
                  </span>
                  <button className="p-2 rounded-lg border border-[#171e19]/10 hover:bg-neutral-100 transition-colors" title="Edit">
                    <Edit className="h-4 w-4 text-[#171e19]/60" />
                  </button>
                  <button className="p-2 rounded-lg border border-[#171e19]/10 hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors" title="Delete">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* URL bar */}
              <div className="mx-6 mb-4 flex items-center gap-2 rounded-xl bg-[#f8f9fa] border border-[#171e19]/10 px-4 py-3">
                <Globe className="h-4 w-4 text-[#171e19]/30 shrink-0" />
                <code className="flex-1 font-mono text-sm text-[#171e19]/70 truncate">
                  {typeof window !== 'undefined' ? window.location.origin : 'https://pulsewatch.dev'}/status/{page.slug}
                </code>
                <button
                  onClick={() => copyUrl(page.slug)}
                  className="p-1.5 rounded-md hover:bg-[#171e19]/5 transition-colors shrink-0"
                  title="Copy URL"
                >
                  {copiedSlug === page.slug ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4 text-[#171e19]/40" />
                  )}
                </button>
                <Link
                  href={`/status/${page.slug}`}
                  target="_blank"
                  className="p-1.5 rounded-md hover:bg-[#171e19]/5 transition-colors shrink-0"
                  title="Open"
                >
                  <ExternalLink className="h-4 w-4 text-[#171e19]/40" />
                </Link>
              </div>

              {/* Linked monitors */}
              <div className="mx-6 mb-6">
                <p className="font-anton text-xs uppercase text-[#171e19]/40 mb-2">Linked Monitors</p>
                <div className="flex flex-wrap gap-2">
                  {page.monitors.map((mon) => (
                    <span
                      key={mon}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f8f9fa] border border-[#171e19]/10 text-xs font-satoshi font-medium text-[#171e19]"
                    >
                      <Activity className="h-3 w-3 text-green-500" />
                      {mon}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer meta */}
              <div className="border-t border-[#171e19]/5 px-6 py-3 bg-[#f8f9fa]/50 flex items-center justify-between">
                <span className="font-satoshi text-xs text-[#171e19]/40">
                  Created {page.createdAt}
                </span>
                <span className="font-satoshi text-xs text-[#171e19]/40">
                  {page.monitors.length} monitors linked
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

