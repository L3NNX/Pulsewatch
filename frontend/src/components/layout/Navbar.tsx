'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api, User } from '@/lib/api';
import { PulseLogo } from '@/components/ui/PulseLogo';
import {
  Menu,
  X,
  LogOut,
  ChevronDown,
} from 'lucide-react';

interface NavbarProps {
  user?: User | null;
}

export function Navbar({ user: propUser }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Automatically check session if propUser is not explicitly provided
  const { data: userData, isLoading: isUserLoading } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => api.getMe(),
    retry: false,
    staleTime: 60 * 1000,
  });

  const user = propUser !== undefined ? propUser : userData?.user;
  const isVerifyingSession = propUser === undefined && isUserLoading;

  const isLandingPage = pathname === '/';
  const isDashboard = pathname.startsWith('/dashboard');

  const handleLogout = async () => {
    try {
      await api.logout();
      queryClient.setQueryData(['currentUser'], null);
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      setUserMenuOpen(false);
      router.push('/login');
      router.refresh();
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  // Landing page anchor links — only shown on "/"
  const landingLinks = [
    { href: '#features', label: 'Features' },
    { href: '#problem-solution', label: 'Why PulseWatch' },
    { href: '#how-it-works', label: 'How It Works' },
    { href: '#testimonials', label: 'Reviews' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/90 backdrop-blur-md border-b border-[#171e19]/10">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Left: Brand Logo (Always links to Landing Page "/") */}
        <Link href="/" className="flex items-center group shrink-0" title="Go to PulseWatch Home">
          <PulseLogo size={28} animated={true} className="mr-2.5 transition-transform group-hover:scale-105" />
          <span className="font-anton text-2xl uppercase tracking-normal text-[#171e19]">
            PULSEWATCH<span className="text-[#ffe17c]">.</span>
          </span>
        </Link>

        {/* Center: Context-aware nav links */}
        <nav className="hidden md:flex items-center gap-8">
          {isLandingPage && landingLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-satoshi text-sm font-medium text-[#171e19]/60 hover:text-[#171e19] transition-colors"
            >
              {link.label}
            </a>
          ))}
          {isDashboard && (
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#f8f9fa] border border-[#171e19]/10 text-xs font-anton uppercase text-[#171e19]">
                <span className="h-2 w-2 rounded-full bg-[#27c93f] animate-pulse" />
                SYSTEM LIVE
              </span>
            </div>
          )}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {isVerifyingSession ? (
            <div className="h-9 w-28 rounded-full bg-[#171e19]/5 animate-pulse" />
          ) : user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/status/demo"
                target="_blank"
                className="hidden sm:inline-flex items-center gap-1 text-xs font-satoshi font-semibold text-[#171e19]/60 hover:text-[#171e19] px-3 py-1.5 rounded-lg hover:bg-[#f8f9fa] transition-colors"
              >
                Public Status ↗
              </Link>
              {!isDashboard && (
                <Link
                  href="/dashboard"
                  className="bg-[#171e19] text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-[#272727] transition-all duration-200"
                >
                  Dashboard
                </Link>
              )}

              {/* User dropdown */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-[#f8f9fa] transition-colors"
                >
                  <div className="h-8 w-8 rounded-full bg-[#171e19] text-[#ffe17c] flex items-center justify-center font-anton text-sm">
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="hidden sm:inline font-satoshi text-sm font-medium text-[#171e19]">
                    {user.name}
                  </span>
                  <ChevronDown className="h-3.5 w-3.5 text-[#171e19]/50" />
                </button>

                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-[#171e19]/10 rounded-xl shadow-lg py-2 z-50">
                      <div className="px-4 py-2 border-b border-[#171e19]/5">
                        <p className="font-satoshi text-sm font-bold text-[#171e19]">{user.name}</p>
                        <p className="font-satoshi text-xs text-[#171e19]/50 truncate">{user.email}</p>
                      </div>
                      <Link
                        href="/dashboard/settings"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 font-satoshi text-sm text-[#171e19]/70 hover:bg-[#f8f9fa] hover:text-[#171e19] transition-colors"
                      >
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2.5 font-satoshi text-sm text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign out
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="font-satoshi text-sm font-medium text-[#171e19]/80 hover:text-[#171e19] transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-[#171e19] text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-[#272727] hover:scale-105 active:scale-95 transition-all duration-200 shadow-sm"
              >
                Get Started Free
              </Link>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-[#f8f9fa] transition-colors"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-[#171e19]/10 shadow-lg">
          <div className="px-6 py-4 space-y-3">
            {isLandingPage && landingLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block font-satoshi text-sm font-medium text-[#171e19]/70 hover:text-[#171e19] py-2"
              >
                {link.label}
              </a>
            ))}

            {user ? (
              <div className="pt-3 border-t border-[#171e19]/10 space-y-2">
                <div className="flex items-center gap-2.5 py-1">
                  <div className="h-8 w-8 rounded-full bg-[#171e19] text-[#ffe17c] flex items-center justify-center font-anton text-sm">
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div className="min-w-0">
                    <p className="font-satoshi text-sm font-bold text-[#171e19] truncate">{user.name}</p>
                    <p className="font-satoshi text-xs text-[#171e19]/50 truncate">{user.email}</p>
                  </div>
                </div>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="block bg-[#171e19] text-white text-center py-2.5 rounded-lg text-sm font-medium"
                >
                  Open Dashboard →
                </Link>
                <Link
                  href="/dashboard/settings"
                  onClick={() => setMobileOpen(false)}
                  className="block font-satoshi text-sm text-[#171e19]/70 hover:text-[#171e19] py-1.5"
                >
                  Settings
                </Link>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    handleLogout();
                  }}
                  className="w-full text-left font-satoshi text-sm text-red-500 py-1.5 flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </div>
            ) : !isVerifyingSession ? (
              <div className="pt-3 border-t border-[#171e19]/10 space-y-2">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block font-satoshi text-sm font-medium text-[#171e19] py-2"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileOpen(false)}
                  className="block bg-[#171e19] text-white text-center py-2.5 rounded-lg text-sm font-medium"
                >
                  Get Started Free
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
