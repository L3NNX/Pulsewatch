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
          <linearGradient id="ekgGradient" x1="0" y1="20" x2="40" y2="20" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffe17c" stopOpacity="0.35" />
            <stop offset="25%" stopColor="#f5c518" />
            <stop offset="50%" stopColor="#ffe17c" />
            <stop offset="75%" stopColor="#f5c518" />
            <stop offset="100%" stopColor="#ffe17c" stopOpacity="0.35" />
          </linearGradient>

          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="1.2" floodColor="#f5c518" floodOpacity="0.5" />
          </filter>
        </defs>

        {/* The Signature Heartbeat EKG Pulse Wave */}
        <path
          d="M 2 20 L 8 20 L 12 14 L 16 27 L 20 6 L 24 30 L 28 16 L 32 20 L 38 20"
          stroke="url(#ekgGradient)"
          strokeWidth="2.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={animated ? 'ekg-line-anim' : ''}
          filter="url(#glow)"
        />

        {/* Peak glow dot */}
        {animated && (
          <circle
            cx="20"
            cy="6"
            r="2.2"
            fill="#f5c518"
            className="animate-ping origin-center"
            style={{ transformOrigin: '20px 6px', animationDuration: '2s' }}
          />
        )}
      </svg>
    </div>
  );
}

export default PulseLogo;
