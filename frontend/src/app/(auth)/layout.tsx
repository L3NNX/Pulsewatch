import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const posterSteps = [
  { num: '01', text: 'Point a probe at any URL' },
  { num: '02', text: '3-strike consensus kills false alarms' },
  { num: '03', text: 'Alerts and an AI postmortem, instantly' },
];

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.12fr)] bg-white text-[#171e19] font-satoshi">
      {/* Left: Form Column */}
      <div className="flex flex-col justify-between gap-10 px-6 py-8 sm:px-12 sm:py-12 xl:px-16 bg-white">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 text-[#171e19] group focus-visible:outline-2 focus-visible:outline-[#171e19] focus-visible:outline-offset-4"
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#171e19"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:scale-105"
            >
              <path d="M2 12h4l3-8 4 16 3-8h6" />
            </svg>
            <span className="font-anton text-[28px] leading-none tracking-[0.01em] uppercase">
              PULSEWATCH
              <span className="inline-block w-2 h-2 bg-[#ffe17c] ml-0.5 align-baseline" />
            </span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.1em] text-[#5b635e] hover:text-[#171e19] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Home</span>
          </Link>
        </div>

        {/* Center form slot */}
        <div className="w-full max-w-[400px] mx-auto lg:mx-0 my-auto">
          {children}
        </div>

        {/* Bottom footer note */}
        <p className="text-xs text-[#5b635e] leading-relaxed">
          Protected by encrypted HttpOnly session cookies · Free tier includes 10 monitors with 60s checks.
        </p>
      </div>

      {/* Right: Yellow Poster Column */}
      <aside
        aria-label="PulseWatch highlights"
        className="relative overflow-hidden bg-[#ffe17c] px-6 py-10 sm:px-12 sm:py-14 xl:px-16 flex flex-col justify-between gap-10"
      >
        {/* Background watermark */}
        <div
          aria-hidden="true"
          className="pointer-events-none select-none absolute -right-6 -bottom-10 font-anton text-[200px] sm:text-[280px] xl:text-[340px] leading-none text-[#171e19]/[0.06] tracking-[0.01em] whitespace-nowrap"
        >
          60S
        </div>

        {/* Top pill */}
        <div className="relative flex justify-start lg:justify-end">
          <span className="inline-flex items-center gap-2 border-2 border-[#171e19] rounded-full px-3.5 py-1.5 text-[11px] font-bold tracking-[0.14em] uppercase text-[#171e19]">
            <span className="w-2 h-2 rounded-full bg-[#171e19] animate-pulse" />
            Free forever · No card
          </span>
        </div>

        {/* Poster Hero & Numbered Steps */}
        <div className="relative flex flex-col gap-7">
          <h2 className="font-anton font-normal text-5xl sm:text-7xl xl:text-[102px] leading-[0.94] uppercase tracking-[0.01em] text-[#171e19]">
            Start monitoring in
            <br />
            under 60 seconds.
          </h2>

          <ol className="max-w-[520px] border-t-2 border-[#171e19]">
            {posterSteps.map((step) => (
              <li
                key={step.num}
                className="flex items-baseline gap-5 py-3.5 border-b-2 border-[#171e19]"
              >
                <span className="font-anton text-[28px] leading-none w-10 shrink-0 text-[#171e19]">
                  {step.num}
                </span>
                <span className="text-base font-bold text-[#171e19]">
                  {step.text}
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* Dark AI Postmortem Sample Card */}
        <div className="relative self-start max-w-[520px] bg-[#171e19] text-white rounded-2xl p-5 sm:p-6 shadow-[8px_8px_0_rgba(23,30,25,0.18)]">
          <div className="flex items-center justify-between gap-4 mb-2.5 font-mono text-[11px]">
            <span className="text-[#ffe17c] font-bold tracking-wider">
              AI POSTMORTEM #8402
            </span>
            <span className="text-[#b7c6c2] tabular-nums">TTR: 2.1s</span>
          </div>
          <p className="text-sm leading-[1.55] text-[#d2deda]">
            Production gateway returned HTTP 504 due to upstream database connection pool exhaustion. 3 consecutive failed probes triggered a Discord alert. Auto-resolved after service restart.
          </p>
        </div>
      </aside>
    </div>
  );
}
