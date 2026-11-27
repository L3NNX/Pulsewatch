'use client';

import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar, sidebarLinks } from '@/components/layout/Sidebar';
import { RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  // Collapsible sidebar state with local storage persistence
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('pulsewatch_sidebar_collapsed');
      if (saved !== null) {
        setCollapsed(saved === 'true');
      }
    } catch {
      // ignore storage access issues
    }
  }, []);

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('pulsewatch_sidebar_collapsed', String(next));
      } catch {
        // ignore storage access issues
      }
      return next;
    });
  };


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        toggleCollapsed();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const { data: userData, isLoading: isUserLoading } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => api.getMe(),
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes — single call per session window
  });

  const user = userData?.user;

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [isUserLoading, user, router]);

  if (isUserLoading) {
    return (
      <div className="h-screen w-screen bg-white flex items-center justify-center font-satoshi">
        <div className="rounded-2xl border border-[#171e19]/10 p-8 flex items-center gap-3 text-sm font-bold text-[#171e19] shadow-sm">
          <RefreshCw className="h-5 w-5 animate-spin text-[#ffe17c]" />
          <span>INITIALIZING CONSOLE...</span>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-white text-[#171e19] font-satoshi selection:bg-[#ffe17c] selection:text-[#171e19]">
      {/* Top Navbar */}
      <Navbar user={user} />

      {/* Main App Body: Sidebar (pinned screen height) + Main Scroll Area */}
      <div className="flex flex-1 pt-16 h-[calc(100vh-4rem)] overflow-hidden">
        {/* Desktop Sidebar (fixed height, collapsible, non-scrolling with content) */}
        <Sidebar
          collapsed={collapsed}
          onToggleCollapse={toggleCollapsed}
        />

        {/* Scrollable Content Viewport */}
        <main className="flex-1 min-w-0 h-full overflow-y-auto overflow-x-hidden bg-white flex flex-col">
          {/* Mobile Navigation Strip (visible only on small screens) */}
          <div className="lg:hidden border-b border-[#171e19]/8 bg-[#fafaf9] overflow-x-auto shrink-0">
            <div className="flex items-center gap-1.5 px-4 py-2.5 min-w-max">
              {sidebarLinks.map((link) => {
                const active = isActive(link.href, link.exact);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all',
                      active
                        ? 'bg-[#171e19] text-white shadow-xs'
                        : 'text-[#171e19]/70 hover:text-[#171e19] hover:bg-[#171e19]/5'
                    )}
                  >
                    <link.icon className={cn('h-3.5 w-3.5', active ? 'text-[#ffe17c]' : '')} />
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Page Container */}
          <div className="flex-1 px-6 lg:px-10 py-8 max-w-7xl w-full mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
