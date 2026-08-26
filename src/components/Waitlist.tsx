import React, { useEffect, useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  Copy,
  Check,
  Shield,
  Users,
  Info,
} from 'lucide-react';
import { Countdown } from './Countdown';
import {
  registerWaitlistUser,
  fetchWaitlistStats,
  resendVerification,
  verifyWaitlistCallback,
  WaitlistStats,
} from '../services/waitlistService';
import { createBrowserSupabaseClient } from '../lib/supabaseClient';

type ViewState = 'idle' | 'loading' | 'pending' | 'success' | 'error' | 'verifying';

export const Waitlist: React.FC = () => {
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<ViewState>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [spotNumber, setSpotNumber] = useState<number | null>(null);
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [registrationDate, setRegistrationDate] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [stats, setStats] = useState<WaitlistStats>({ verifiedCount: 0, latestSpot: 100, recentMembers: [] });
  const [statsError, setStatsError] = useState<string | null>(null);
  const [showRecent, setShowRecent] = useState(false);

  useEffect(() => {
    void loadStats();
    void processVerificationCallback();
  }, []);

  const loadStats = async () => {
    try {
      const liveStats = await fetchWaitlistStats();
      setStats(liveStats);
      setStatsError(null);
    } catch (error) {
      console.error('Failed to load waitlist stats', error);
      setStatsError('Live waitlist stats are temporarily unavailable.');
    }
  };

  const processVerificationCallback = async () => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');
    const isWaitlistVerify = url.searchParams.get('waitlist') === 'verify';

    if (!code || !isWaitlistVerify) {
      return;
    }

    setStatus('verifying');
    setStatusMessage('Confirming your email...');

    try {
      const supabase = createBrowserSupabaseClient();
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);
      if (error || !data.session?.access_token) {
        throw error || new Error('Unable to confirm your verification link.');
      }

      const result = await verifyWaitlistCallback(data.session.access_token);
      if (!result.success) {
        throw new Error(result.message || 'Unable to finalize verification.');
      }

      setEmail(result.email || email);
      setSpotNumber(result.spot ?? null);
      setIsExistingUser(false);
      setRegistrationDate(result.verifiedAt || new Date().toISOString());
      setStatus('success');
      setStatusMessage(result.message || "You're already on the MemShift waitlist.");
      await loadStats();

      window.history.replaceState({}, document.title, window.location.pathname + window.location.hash);
    } catch (error: any) {
      console.error('Verification callback failed', error);
      setStatus('error');
      setStatusMessage(error?.message || 'Unable to verify your email right now.');
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatusMessage('');

    if (honeypot.trim()) {
      setStatus('error');
      setStatusMessage('Unable to process request.');
      return;
    }

    if (!email.trim()) {
      setStatus('error');
      setStatusMessage('Please enter an email address to join.');
      return;
    }

    setStatus('loading');

    try {
      const result = await registerWaitlistUser(email, honeypot);

      if (!result.success) {
        setStatus('error');
        setStatusMessage(result.message || 'Unable to join waitlist.');
        return;
      }

      if (result.status === 'verified') {
        setStatus('success');
        setIsExistingUser(!!result.isExisting);
        setSpotNumber(result.spot ?? null);
        setRegistrationDate(result.verifiedAt || new Date().toISOString());
        setStatusMessage(result.message || "You're already on the MemShift waitlist.");
        await loadStats();
        return;
      }

      setStatus('pending');
      setIsExistingUser(!!result.isExisting);
      setStatusMessage(result.message || 'Check your inbox to verify your email.');
      setSpotNumber(null);
      setRegistrationDate(null);
      await loadStats();
    } catch (error: any) {
      console.error('Waitlist submission failed', error);
      setStatus('error');
      setStatusMessage(error?.message || 'An unexpected error occurred. Please try again.');
    }
  };

  const handleResendVerification = async () => {
    setResendLoading(true);
    setStatusMessage('');

    try {
      const result = await resendVerification(email);
      if (!result.success) {
        setStatusMessage(result.message || 'Unable to resend verification email.');
        return;
      }

      setStatus('pending');
      setStatusMessage(result.message || 'Verification email sent. Check your inbox.');
    } catch (error: any) {
      setStatusMessage(error?.message || 'Unable to resend verification email.');
    } finally {
      setResendLoading(false);
    }
  };

  const handleCopyLink = async () => {
    if (!spotNumber) return;
    const textToCopy = `I just secured real early access spot #${spotNumber} for MemShift - the internet memory layer.`;
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setEmail('');
    setHoneypot('');
    setStatus('idle');
    setSpotNumber(null);
    setIsExistingUser(false);
    setRegistrationDate(null);
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
      <div className="absolute inset-0 bg-neural-grid pointer-events-none opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] glow-radial-cyan pointer-events-none blur-3xl" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-8 sm:p-14 rounded-3xl bg-slate-950 dark:bg-[#0c0e18] border-2 border-cyan-500/30 shadow-2xl dark:shadow-[0_20px_70px_rgba(6,182,212,0.2)] text-center relative overflow-hidden backdrop-blur-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>LIVE QUEUE: {stats.verifiedCount} VERIFIED MEMBERS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight mb-4">
            Stop losing the things <br className="hidden sm:inline" />
            worth remembering.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto mb-8">
            Your internet has a memory now. Reserve your verified spot in Cohort 01.
          </p>

          <div className="mb-10 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md max-w-lg mx-auto">
            <Countdown variant="cards" />
          </div>

          {statsError && (
            <div className="max-w-md mx-auto mb-4 px-3 py-2 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-200 text-xs font-mono flex items-center justify-center gap-2">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{statsError}</span>
            </div>
          )}

          {status === 'success' ? (
            <div className="max-w-md mx-auto p-6 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 text-left animate-in zoom-in-95 duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                    {isExistingUser ? 'ALREADY REGISTERED' : 'VERIFICATION CONFIRMED'}
                  </div>
                  <div className="text-sm font-semibold text-white">
                    {isExistingUser ? 'Welcome back! Your spot is secured.' : "You're on the verified waitlist!"}
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
                  <span className="text-[10px] font-mono text-slate-400 block">YOUR VERIFIED SPOT</span>
                  <span className="text-xl font-mono font-bold text-cyan-300">
                    {spotNumber ? `#${spotNumber}` : 'Confirmed'}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-slate-400 block">ENROLLED EMAIL</span>
                  <span className="text-xs font-mono text-slate-200">{email}</span>
                  {formattedDate && (
                    <span className="text-[9px] font-mono text-slate-500 block">Verified {formattedDate}</span>
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
          ) : status === 'pending' ? (
            <div className="max-w-md mx-auto p-6 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 text-left animate-in zoom-in-95 duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                    CHECK YOUR INBOX
                  </div>
                  <div className="text-sm font-semibold text-white">Verification email sent.</div>
                </div>
              </div>

              <p className="text-sm text-slate-300">
                {statusMessage || 'Click the verification link to mark this email as a verified waitlist member.'}
              </p>

              <div className="mt-4 p-3.5 rounded-xl bg-slate-900/90 border border-white/10">
                <span className="text-[10px] font-mono text-slate-400 block">PENDING EMAIL</span>
                <span className="text-xs font-mono text-slate-200 break-all">{email}</span>
              </div>

              <div className="flex items-center gap-2 pt-4">
                <button
                  type="button"
                  onClick={handleResendVerification}
                  disabled={resendLoading}
                  className="flex-1 py-2.5 px-3 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/20 border border-cyan-500/30 text-xs font-mono text-cyan-200 flex items-center justify-center gap-1.5 transition-colors disabled:opacity-60"
                >
                  {resendLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                  <span>Resend verification</span>
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="py-2.5 px-3 rounded-lg text-xs font-mono text-slate-400 hover:text-slate-200 transition-colors"
                >
                  Change email
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="sr-only" aria-hidden="true">
                <label>
                  Company
                  <input
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(event) => setHoneypot(event.target.value)}
                  />
                </label>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      if (status === 'error') setStatus('idle');
                    }}
                    placeholder="Enter your real email address"
                    disabled={status === 'loading' || status === 'verifying'}
                    className={`w-full px-4 py-3.5 rounded-xl bg-slate-900/90 border text-sm text-white placeholder:text-slate-500 focus:outline-none transition-all ${
                      status === 'error'
                        ? 'border-rose-500/80 focus:ring-2 focus:ring-rose-500/50'
                        : 'border-white/15 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading' || status === 'verifying'}
                  className="px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-900 bg-cyan-400 hover:bg-cyan-300 active:scale-[0.99] transition-all shadow-[0_0_20px_rgba(6,182,212,0.35)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] flex items-center justify-center gap-2 shrink-0 disabled:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                >
                  {status === 'loading' || status === 'verifying' ? (
                    <>
                      <Loader2 className="w-4 h-4 text-slate-900 animate-spin" />
                      <span>{status === 'verifying' ? 'Verifying...' : 'Sending email...'}</span>
                    </>
                  ) : (
                    <>
                      <span>Join MemShift</span>
                      <ArrowRight className="w-4 h-4 text-slate-900" />
                    </>
                  )}
                </button>
              </div>

              {status === 'error' && (
                <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-rose-400 font-mono animate-in fade-in duration-200">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{statusMessage}</span>
                </div>
              )}

              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 font-mono">
                <div className="flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Verified via email link</span>
                </div>
                <span>•</span>
                <span>
                  Next verified spot: <strong className="text-cyan-300 font-bold">#{stats.latestSpot + 1}</strong>
                </span>
              </div>
            </form>
          )}

          {stats.recentMembers.length > 0 && (
            <div className="mt-8 pt-6 border-t border-white/10">
              <button
                type="button"
                onClick={() => setShowRecent(!showRecent)}
                className="text-xs font-mono text-slate-400 hover:text-cyan-300 flex items-center justify-center gap-1.5 mx-auto transition-colors"
              >
                <Users className="w-3.5 h-3.5 text-cyan-400" />
                <span>{showRecent ? 'Hide recent entries' : `View recent verified entries (${stats.verifiedCount} total)`}</span>
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
