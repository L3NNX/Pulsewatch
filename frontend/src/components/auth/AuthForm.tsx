'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AlertTriangle, ArrowRight, Eye, EyeOff, Loader2 } from 'lucide-react';
import { api } from '@/lib/api';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

const registerSchema = z.object({
  name: z.string().min(2, 'Alias must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type AuthValues = {
  name?: string;
  email: string;
  password: string;
};

interface AuthFormProps {
  mode: 'login' | 'register';
}

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const isLogin = mode === 'login';
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthValues>({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: AuthValues) => {
    try {
      setServerError(null);
      if (isLogin) {
        await api.login({ email: values.email, password: values.password });
      } else {
        await api.register({
          name: values.name || '',
          email: values.email,
          password: values.password,
        });
      }

      const params = new URLSearchParams(window.location.search);
      const callbackUrl = params.get('callbackUrl');
      const nextRoute =
        callbackUrl && callbackUrl.startsWith('/') && !callbackUrl.startsWith('//')
          ? callbackUrl
          : '/dashboard';

      router.push(nextRoute);
      router.refresh();
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : isLogin
          ? 'Authentication rejected. Verify credentials.'
          : 'Registration rejected. Please verify your details.';
      setServerError(message);
    }
  };

  return (
    <div className="flex flex-col gap-7">
      {/* Headline + Subcopy */}
      <div className="flex flex-col gap-2.5">
        {isLogin ? (
          <h1 className="font-anton font-normal text-5xl sm:text-[64px] leading-[0.98] uppercase tracking-[0.01em] text-[#171e19]">
            Back on{' '}
            <span className="inline-block bg-[#ffe17c] px-2.5 -rotate-2">
              watch.
            </span>
          </h1>
        ) : (
          <h1 className="font-anton font-normal text-5xl sm:text-[64px] leading-[0.98] uppercase tracking-[0.01em] text-[#171e19]">
            Go{' '}
            <span className="inline-block bg-[#ffe17c] px-2.5 -rotate-2">
              live
            </span>{' '}
            free.
          </h1>
        )}
        <p className="text-[15px] leading-[1.5] text-[#5b635e]">
          {isLogin
            ? 'Sign in to your command center and see what your probes caught overnight.'
            : 'Create an operator account. 10 endpoints, 60-second checks, no credit card.'}
        </p>
      </div>

      {/* Mode Switcher Tabs */}
      <div
        role="tablist"
        aria-label="Account mode"
        className="flex gap-6 border-b border-[#171e19]/15"
      >
        <Link
          href="/login"
          role="tab"
          aria-selected={isLogin}
          className={`-mb-px pb-2.5 text-[13px] font-bold tracking-[0.1em] uppercase border-b-[3px] transition-colors ${
            isLogin
              ? 'border-[#171e19] text-[#171e19]'
              : 'border-transparent text-[#171e19]/55 hover:text-[#171e19]'
          }`}
        >
          Sign in
        </Link>
        <Link
          href="/register"
          role="tab"
          aria-selected={!isLogin}
          className={`-mb-px pb-2.5 text-[13px] font-bold tracking-[0.1em] uppercase border-b-[3px] transition-colors ${
            !isLogin
              ? 'border-[#171e19] text-[#171e19]'
              : 'border-transparent text-[#171e19]/55 hover:text-[#171e19]'
          }`}
        >
          Create account
        </Link>
      </div>

      {/* Server Error Alert */}
      {serverError && (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-xl border border-red-500/30 bg-red-50 p-3.5 text-xs font-medium text-red-700"
        >
          <AlertTriangle className="h-4 w-4 shrink-0 text-red-600 mt-0.5" />
          <span>{serverError}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
        {!isLogin && (
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="auth-name"
              className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#5b635e]"
            >
              Operator / team alias
            </label>
            <input
              id="auth-name"
              type="text"
              autoComplete="name"
              placeholder="e.g. Alex Rivera"
              aria-invalid={Boolean(errors.name)}
              className={`w-full border-0 border-b-2 rounded-none py-2.5 text-lg text-[#171e19] placeholder:text-[#171e19]/30 bg-transparent focus:outline-none transition-colors ${
                errors.name
                  ? 'border-red-500 focus:border-red-600'
                  : 'border-[#171e19]/30 focus:border-[#171e19]'
              }`}
              {...register('name')}
            />
            {errors.name && (
              <p className="text-xs font-medium text-red-600">{errors.name.message}</p>
            )}
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="auth-email"
            className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#5b635e]"
          >
            Work email
          </label>
          <input
            id="auth-email"
            type="email"
            autoComplete="email"
            placeholder="operator@organization.com"
            aria-invalid={Boolean(errors.email)}
            className={`w-full border-0 border-b-2 rounded-none py-2.5 text-lg text-[#171e19] placeholder:text-[#171e19]/30 bg-transparent focus:outline-none transition-colors ${
              errors.email
                ? 'border-red-500 focus:border-red-600'
                : 'border-[#171e19]/30 focus:border-[#171e19]'
            }`}
            {...register('email')}
          />
          {errors.email && (
            <p className="text-xs font-medium text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-baseline justify-between">
            <label
              htmlFor="auth-password"
              className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#5b635e]"
            >
              Password
            </label>
          </div>
          <div className="relative">
            <input
              id="auth-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete={isLogin ? 'current-password' : 'new-password'}
              placeholder={isLogin ? 'Enter your password' : 'Minimum 8 characters'}
              aria-invalid={Boolean(errors.password)}
              className={`w-full border-0 border-b-2 rounded-none py-2.5 pr-10 text-lg text-[#171e19] placeholder:text-[#171e19]/30 bg-transparent focus:outline-none transition-colors ${
                errors.password
                  ? 'border-red-500 focus:border-red-600'
                  : 'border-[#171e19]/30 focus:border-[#171e19]'
              }`}
              {...register('password')}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-1.5 text-[#5b635e] hover:text-[#171e19] transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Eye className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs font-medium text-red-600">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="group mt-2 flex items-center justify-between rounded-xl bg-[#171e19] hover:bg-[#242e27] disabled:opacity-60 disabled:cursor-not-allowed px-6 py-[18px] font-anton text-lg tracking-[0.04em] uppercase text-[#ffe17c] transition-colors cursor-pointer"
        >
          <span>
            {isSubmitting
              ? isLogin
                ? 'Signing in...'
                : 'Initializing...'
              : isLogin
              ? 'Sign in to console'
              : 'Initialize account'}
          </span>
          {isSubmitting ? (
            <Loader2 className="h-5 w-5 animate-spin text-[#ffe17c]" aria-hidden="true" />
          ) : (
            <ArrowRight
              className="h-5 w-5 text-[#ffe17c] transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          )}
        </button>
      </form>
    </div>
  );
}
