import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, AlertCircle, Loader2, ArrowRight, Copy, Check, Shield, Users, Info } from 'lucide-react';
import { Countdown } from './Countdown';
import {
  registerWaitlistUser,
  fetchWaitlistStats,
  getStoredWaitlistUser,
  clearStoredWaitlistUser,
  WaitlistStats
} from '../services/waitlistService';

export const Waitlist: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [spotNumber, setSpotNumber] = useState<number | null>(null);
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [registrationDate, setRegistrationDate] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState<WaitlistStats>({ totalCount: 0, latestSpot: 100, recentMembers: [] });
  const [showRecent, setShowRecent] = useState(false);

  // Load existing session and server stats on mount
  useEffect(() => {
    // Check local session
    const stored = getStoredWaitlistUser();
    if (stored) {
      setEmail(stored.email);
      setSpotNumber(stored.spot);
      setRegistrationDate(stored.registeredAt);
      setStatus('success');
      setIsExistingUser(true);
    }

    // Fetch real live stats
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const liveStats = await fetchWaitlistStats();
      setStats(liveStats);
    } catch (e) {
      console.warn('Failed to load waitlist stats', e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage('');

    if (!email || !email.trim()) {
      setStatus('error');
      setStatusMessage('Please enter an email address to join.');
      return;
    }

    setStatus('loading');

    try {
      const result = await registerWaitlistUser(email);

      if (result.success && result.spot) {
        setSpotNumber(result.spot);
        setIsExistingUser(!!result.isExisting);
        setRegistrationDate(result.registeredAt || new Date().toISOString());
        setStatus('success');
        setStatusMessage(result.message || '');
        // Refresh live stats
        await loadStats();
      } else {
        setStatus('error');
        setStatusMessage(result.message || 'Unable to register email.');
      }
    } catch (err: any) {
      setStatus('error');
      setStatusMessage(err.message || 'An unexpected error occurred. Please try again.');
    }
  };

  const handleCopyLink = () => {
    const textToCopy = `I just secured real early access spot #${spotNumber} for MemShift — the internet memory layer.`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    clearStoredWaitlistUser();
    setEmail('');
    setStatus('idle');
    setSpotNumber(null);
    setIsExistingUser(false);
    setStatusMessage('');
  };

  const formattedDate = registrationDate
    ? new Date(registrationDate).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : null;

  return (
    <section id="waitlist" className="relative py-28 sm:py-36 overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-neural-grid pointer-events-none opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] glow-radial-cyan pointer-events-none blur-3xl" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main CTA Card */}
        <div className="p-8 sm:p-14 rounded-3xl bg-slate-950 dark:bg-[#0c0e18] border-2 border-cyan-500/30 shadow-2xl dark:shadow-[0_20px_70px_rgba(6,182,212,0.2)] text-center relative overflow-hidden backdrop-blur-2xl">
          
          {/* Top Live Real Counter Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>LIVE QUEUE: {stats.totalCount} THINKERS REGISTERED</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight mb-4">
            Stop losing the things <br className="hidden sm:inline" />
            worth remembering.
          </h2>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto mb-8">
            Your internet has a memory now. Reserve your verified spot in Cohort 01.
          </p>

          {/* Real-time Launch Countdown Widget */}
          <div className="mb-10 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md max-w-lg mx-auto">
            <Countdown variant="cards" />
          </div>

          {/* Form & States */}
          {status === 'success' ? (
            /* Success State */
            <div className="max-w-md mx-auto p-6 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 text-left animate-in zoom-in-95 duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                    {isExistingUser ? 'ALREADY REGISTERED' : 'RESERVATION CONFIRMED'}
                  </div>
                  <div className="text-sm font-semibold text-white">
                    {isExistingUser ? 'Welcome back! Your spot is secured.' : "You're on the live waitlist!"}
                  </div>
                </div>
              </div>

              {statusMessage && (
                <div className="text-xs text-cyan-300/90 font-mono mb-2 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 shrink-0" />
                  <span>{statusMessage}</span>
                </div>
              )}

              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-white/10 flex items-center justify-between my-3">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block">YOUR RECORDED SPOT</span>
                  <span className="text-xl font-mono font-bold text-cyan-300">#{spotNumber}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-slate-400 block">ENROLLED EMAIL</span>
                  <span className="text-xs font-mono text-slate-200">{email}</span>
                  {formattedDate && (
                    <span className="text-[9px] font-mono text-slate-500 block">Joined {formattedDate}</span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="flex-1 py-2.5 px-3 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-mono text-slate-200 flex items-center justify-center gap-1.5 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied spot pass!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Share access pass</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="py-2.5 px-3 rounded-lg text-xs font-mono text-slate-400 hover:text-slate-200 transition-colors"
                >
                  Use another email
                </button>
              </div>
            </div>
          ) : (
            /* Input Form State */
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === 'error') setStatus('idle');
                    }}
                    placeholder="Enter your real email address"
                    disabled={status === 'loading'}
                    className={`w-full px-4 py-3.5 rounded-xl bg-slate-900/90 border text-sm text-white placeholder:text-slate-500 focus:outline-none transition-all ${
                      status === 'error'
                        ? 'border-rose-500/80 focus:ring-2 focus:ring-rose-500/50'
                        : 'border-white/15 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-900 bg-cyan-400 hover:bg-cyan-300 active:scale-[0.99] transition-all shadow-[0_0_20px_rgba(6,182,212,0.35)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] flex items-center justify-center gap-2 shrink-0 disabled:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 text-slate-900 animate-spin" />
                      <span>Saving to live DB...</span>
                    </>
                  ) : (
                    <>
                      <span>Join MemShift</span>
                      <ArrowRight className="w-4 h-4 text-slate-900" />
                    </>
                  )}
                </button>
              </div>

              {/* Error Message */}
              {status === 'error' && (
                <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-rose-400 font-mono animate-in fade-in duration-200">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{statusMessage}</span>
                </div>
              )}

              {/* Trust Indicators */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 font-mono">
                <div className="flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Real persistent registration</span>
                </div>
                <span>•</span>
                <span>Next available spot: <strong className="text-cyan-300 font-bold">#{stats.latestSpot + 1}</strong></span>
              </div>
            </form>
          )}

          {/* Toggle Live Recent Registrations */}
          {stats.recentMembers && stats.recentMembers.length > 0 && (
            <div className="mt-8 pt-6 border-t border-white/10">
              <button
                type="button"
                onClick={() => setShowRecent(!showRecent)}
                className="text-xs font-mono text-slate-400 hover:text-cyan-300 flex items-center justify-center gap-1.5 mx-auto transition-colors"
              >
                <Users className="w-3.5 h-3.5 text-cyan-400" />
                <span>{showRecent ? 'Hide recent entries' : `View recent live waitlist entries (${stats.totalCount} total)`}</span>
              </button>

              {showRecent && (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-left max-w-2xl mx-auto animate-in fade-in duration-200">
                  {stats.recentMembers.map((member) => (
                    <div
                      key={member.id}
                      className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-[11px] font-mono text-slate-300 flex items-center justify-between"
                    >
                      <span className="truncate mr-2">{member.maskedEmail}</span>
                      <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px] shrink-0 font-bold">
                        #{member.spot}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
