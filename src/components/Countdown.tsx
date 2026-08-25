import React, { useState, useEffect } from 'react';
import { Clock, Sparkles } from 'lucide-react';

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

// Target Launch Date: August 29, 2026 00:00:00
const LAUNCH_DATE = new Date('2026-08-29T00:00:00+05:30').getTime();

export function useCountdown(targetDate: number = LAUNCH_DATE): CountdownTime {
  const calculateTimeLeft = (): CountdownTime => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, isExpired: false };
  };

  const [timeLeft, setTimeLeft] = useState<CountdownTime>(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}

interface CountdownProps {
  variant?: 'cards' | 'banner' | 'compact' | 'waitlist';
  className?: string;
}

export const Countdown: React.FC<CountdownProps> = ({ variant = 'cards', className = '' }) => {
  const { days, hours, minutes, seconds, isExpired } = useCountdown();

  const pad = (n: number) => n.toString().padStart(2, '0');

  if (isExpired) {
    return (
      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-sm font-bold ${className}`}>
        <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
        <span>MEMSHIFT IS OFFICIALLY LIVE!</span>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 dark:bg-white/5 border border-cyan-500/30 text-[11px] font-mono text-cyan-600 dark:text-cyan-400 ${className}`}>
        <Clock className="w-3 h-3 text-cyan-500 dark:text-cyan-400" />
        <span className="font-semibold text-slate-700 dark:text-slate-300">LAUNCH: AUG 29</span>
        <span className="text-slate-400">•</span>
        <span>
          {days}d {pad(hours)}h {pad(minutes)}m {pad(seconds)}s
        </span>
      </div>
    );
  }

  if (variant === 'banner') {
    return (
      <div className={`w-full bg-gradient-to-r from-cyan-950/80 via-slate-900/90 to-indigo-950/80 border-y border-cyan-500/30 py-2.5 px-4 backdrop-blur-md ${className}`}>
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 text-cyan-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-bold tracking-wider uppercase">PRIVATE ACCESS COHORT 01 OPENS AUGUST 29</span>
          </div>

          <div className="flex items-center gap-3 text-slate-300">
            <span className="text-slate-400 hidden sm:inline">COUNTDOWN:</span>
            <div className="flex items-center gap-1.5 font-bold">
              <span className="px-1.5 py-0.5 rounded bg-white/10 text-cyan-300">{days}d</span>
              <span>:</span>
              <span className="px-1.5 py-0.5 rounded bg-white/10 text-cyan-300">{pad(hours)}h</span>
              <span>:</span>
              <span className="px-1.5 py-0.5 rounded bg-white/10 text-cyan-300">{pad(minutes)}m</span>
              <span>:</span>
              <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">{pad(seconds)}s</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Variant: 'cards' or 'waitlist'
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="flex items-center gap-2 mb-3 text-xs font-mono uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-semibold">
        <Clock className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400 animate-pulse" />
        <span>OFFICIAL PRODUCT LAUNCH // AUGUST 29</span>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-sm w-full">
        {/* Days */}
        <div className="p-3 sm:p-4 rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 text-center shadow-sm">
          <span className="text-2xl sm:text-3xl font-mono font-extrabold text-slate-900 dark:text-white block">
            {pad(days)}
          </span>
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">
            DAYS
          </span>
        </div>

        {/* Hours */}
        <div className="p-3 sm:p-4 rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 text-center shadow-sm">
          <span className="text-2xl sm:text-3xl font-mono font-extrabold text-slate-900 dark:text-white block">
            {pad(hours)}
          </span>
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">
            HOURS
          </span>
        </div>

        {/* Minutes */}
        <div className="p-3 sm:p-4 rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 text-center shadow-sm">
          <span className="text-2xl sm:text-3xl font-mono font-extrabold text-slate-900 dark:text-white block">
            {pad(minutes)}
          </span>
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">
            MINS
          </span>
        </div>

        {/* Seconds */}
        <div className="p-3 sm:p-4 rounded-xl bg-cyan-500/10 dark:bg-cyan-950/40 border border-cyan-500/30 dark:border-cyan-500/40 text-center shadow-sm ring-1 ring-cyan-500/20">
          <span className="text-2xl sm:text-3xl font-mono font-extrabold text-cyan-600 dark:text-cyan-300 block">
            {pad(seconds)}
          </span>
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-cyan-700 dark:text-cyan-400 font-medium">
            SECS
          </span>
        </div>
      </div>
    </div>
  );
};
