'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface PulseLogoProps {
  className?: string;
  size?: number;
  animated?: boolean;
}

export function PulseLogo({ className, size = 32, animated = true }: PulseLogoProps) {
  return (
    <div
      className={cn('relative inline-flex items-center justify-center shrink-0 select-none', className)}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <defs>
          {/* Subtle gradient for radar pulse glow */}
          <linearGradient id="pulseGlow" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffe17c" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#171e19" stopOpacity="0.05" />
          </linearGradient>

          {/* Golden highlight stroke */}
          <linearGradient id="ekgGradient" x1="0" y1="20" x2="40" y2="20" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#171e19" />
            <stop offset="45%" stopColor="#ffe17c" />
            <stop offset="55%" stopColor="#ffe17c" />
            <stop offset="100%" stopColor="#171e19" />
          </linearGradient>

          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Squircle Container */}
        <rect
          x="2"
          y="2"
          width="36"
          height="36"
          rx="10"
          fill="#171e19"
          stroke="#ffe17c"
          strokeWidth="1.5"
          className="transition-colors"
        />

        {/* Ambient subtle radar ring */}
        {animated && (
          <circle
            cx="20"
            cy="20"
            r="14"
            stroke="#ffe17c"
            strokeWidth="0.75"
            strokeDasharray="2 4"
            className="opacity-30 origin-center animate-[spin_20s_linear_infinite]"
          />
        )}

        {/* Baseline EKG grid line */}
        <line
          x1="6"
          y1="20"
          x2="34"
          y2="20"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="1"
          strokeDasharray="1 2"
        />

        {/* The Signature Heartbeat EKG Pulse Wave Path */}
        <path
          d="M 6 20 L 12 20 L 15 14 L 18 27 L 22 7 L 25 29 L 28 17 L 31 20 L 34 20"
          stroke="url(#ekgGradient)"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={animated ? 'ekg-line-anim' : ''}
          filter="url(#glow)"
        />

        {/* Leading telemetry ping particle */}
        {animated && (
          <circle
            cx="22"
            cy="7"
            r="2"
            fill="#ffe17c"
            className="animate-ping origin-center"
            style={{ transformOrigin: '22px 7px', animationDuration: '2s' }}
          />
        )}
      </svg>
    </div>
  );
}

export default PulseLogo;

