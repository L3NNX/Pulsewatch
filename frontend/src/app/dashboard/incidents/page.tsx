'use client';

import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Filter,
  Search,
  ArrowUpRight,
  XCircle,
} from 'lucide-react';

// Demo incident data (will connect to API when backend routes are ready)
const demoIncidents = [
  {
    id: '1',
    monitorName: 'Production API Gateway',
    status: 'RESOLVED' as const,
    cause: 'Connection timeout — upstream proxy returned 504 after 10s threshold',
    startedAt: '2026-10-28T14:23:00Z',
    resolvedAt: '2026-10-28T14:31:00Z',
    failedChecks: 3,
    duration: '8 min',
    aiSummary: 'Transient upstream timeout caused by brief load spike on proxy layer. Auto-resolved after traffic normalized.',
  },
  {
    id: '2',
    monitorName: 'Auth Service',
    status: 'RESOLVED' as const,
    cause: 'SSL certificate validation failure — CERT_HAS_EXPIRED',
    startedAt: '2026-10-15T09:00:00Z',
    resolvedAt: '2026-10-15T09:12:00Z',
    failedChecks: 4,
    duration: '12 min',
    aiSummary: 'SSL certificate expired and was auto-renewed by Let\'s Encrypt. Service restored after certificate propagation.',
  },
  {
    id: '3',
    monitorName: 'Payment Gateway',
    status: 'OPEN' as const,
    cause: 'HTTP 503 Service Unavailable — upstream maintenance window',
    startedAt: '2026-11-19T08:45:00Z',
    resolvedAt: null,
    failedChecks: 7,
    duration: 'Ongoing',
    aiSummary: null,
  },
];

export default function IncidentsPage() {
  const [filter, setFilter] = useState<'ALL' | 'OPEN' | 'RESOLVED'>('ALL');
  const [search, setSearch] = useState('');

  const filtered = demoIncidents.filter((inc) => {
    const matchesFilter = filter === 'ALL' || inc.status === filter;
    const matchesSearch = inc.monitorName.toLowerCase().includes(search.toLowerCase()) ||
      inc.cause.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const openCount = demoIncidents.filter((i) => i.status === 'OPEN').length;
  const resolvedCount = demoIncidents.filter((i) => i.status === 'RESOLVED').length;

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header */}
      <div className="pb-6 border-b border-[#171e19]/10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f8f9fa] border border-[#171e19]/10 font-anton text-xs uppercase text-[#171e19] mb-2">
          <span className="h-2 w-2 rounded-full bg-red-400" />
          INCIDENT LOG
        </div>
        <h1 className="font-anton text-4xl sm:text-5xl uppercase tracking-normal text-[#171e19]">
          INCIDENTS
        </h1>
        <p className="font-satoshi text-sm text-[#171e19]/60 mt-1">
          Automated incident tracking with AI-powered root cause analysis.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-2xl border border-[#171e19]/10 bg-white p-5">
          <p className="font-anton text-xs uppercase text-[#171e19]/50">Total Incidents</p>
          <p className="font-anton text-3xl text-[#171e19] mt-1">{demoIncidents.length}</p>
        </div>
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
          <p className="font-anton text-xs uppercase text-red-400">Open</p>
          <p className="font-anton text-3xl text-red-600 mt-1">{openCount}</p>
        </div>
        <div className="rounded-2xl border border-green-200 bg-green-50 p-5">
          <p className="font-anton text-xs uppercase text-green-500">Resolved</p>
          <p className="font-anton text-3xl text-green-600 mt-1">{resolvedCount}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#171e19]/40" />
          <input
            type="text"
            placeholder="Search incidents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-[#171e19]/15 bg-white pl-11 pr-4 py-3 text-sm font-satoshi text-[#171e19] placeholder:text-[#171e19]/40 focus:outline-none focus:border-[#171e19]"
          />
        </div>
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#f8f9fa] border border-[#171e19]/10">
          {(['ALL', 'OPEN', 'RESOLVED'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 text-xs font-satoshi font-bold rounded-lg transition-all ${
                filter === s
                  ? 'bg-[#171e19] text-[#ffe17c] shadow-xs'
                  : 'text-[#171e19]/70 hover:text-[#171e19] hover:bg-white'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Incidents List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-[#171e19]/10 bg-[#f8f9fa] p-12 text-center">
            <CheckCircle2 className="h-10 w-10 text-green-400 mx-auto mb-3" />
            <p className="font-anton text-xl uppercase text-[#171e19]">No incidents found</p>
            <p className="font-satoshi text-sm text-[#171e19]/50 mt-1">All systems operating normally.</p>
          </div>
        ) : (
          filtered.map((inc) => (
            <div
              key={inc.id}
              className={`rounded-2xl border bg-white p-6 transition-all hover:shadow-sm ${
                inc.status === 'OPEN' ? 'border-red-200' : 'border-[#171e19]/10'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1 min-w-0 space-y-3">
                  {/* Status + Monitor name */}
                  <div className="flex items-center gap-3">
                    {inc.status === 'OPEN' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-100 text-red-600 font-satoshi text-xs font-bold">
                        <XCircle className="h-3.5 w-3.5" />
                        OPEN
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-100 text-green-600 font-satoshi text-xs font-bold">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        RESOLVED
                      </span>
                    )}
                    <span className="font-anton text-lg uppercase text-[#171e19]">{inc.monitorName}</span>
                  </div>

                  {/* Cause */}
                  <p className="font-satoshi text-sm text-[#171e19]/70">
                    {inc.cause}
                  </p>

                  {/* AI Summary */}
                  {inc.aiSummary && (
                    <div className="rounded-lg bg-[#ffe17c]/10 border border-[#ffe17c]/30 px-4 py-3">
                      <p className="font-anton text-[10px] uppercase text-[#171e19]/50 mb-1">AI Summary</p>
                      <p className="font-satoshi text-xs text-[#171e19]/80">{inc.aiSummary}</p>
                    </div>
                  )}

                  {/* Meta row */}
                  <div className="flex items-center gap-6 text-xs font-satoshi text-[#171e19]/50">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      Duration: <strong className="text-[#171e19]">{inc.duration}</strong>
                    </span>
                    <span>
                      Failed checks: <strong className="text-[#171e19]">{inc.failedChecks}</strong>
                    </span>
                    <span>
                      Started: {new Date(inc.startedAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

