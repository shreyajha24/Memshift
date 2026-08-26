import React from 'react';
import { XCircle, CheckCircle2, Sparkles, ArrowRight, ShieldCheck, Zap, Layers } from 'lucide-react';

export const Comparison: React.FC = () => {
  return (
    <section className="relative py-24 sm:py-32 bg-slate-50/60 dark:bg-[#070910]/70 border-y border-slate-200/80 dark:border-white/5 overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] glow-radial-cyan pointer-events-none blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Headline */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-mono uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE REAL DIFFERENCE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
            Bookmarks remember links. <br className="hidden sm:block" />
            <span className="text-cyan-600 dark:text-cyan-400">MemShift remembers ideas.</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Traditional bookmarks are just lists of web addresses that get lost and forgotten. MemShift understands what you watched and read so you can find ideas naturally.
          </p>
        </div>

        {/* Side by Side Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          
          {/* Traditional Way */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0d0f1a]/80 border border-rose-500/30 dark:border-rose-500/20 shadow-md dark:shadow-none backdrop-blur-md relative">
            <div className="flex items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-100 dark:border-white/5">
              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
                <XCircle className="w-5 h-5" />
                <span className="font-mono text-xs uppercase tracking-widest font-bold">TRADITIONAL BOOKMARKING</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/20 font-semibold">
                Forgotten
              </span>
            </div>

            {/* Loop Diagram */}
            <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-slate-950/60 border border-rose-200 dark:border-white/5 font-mono text-xs text-rose-800 dark:text-rose-300 flex items-center justify-center gap-2 mb-6 flex-wrap">
              <span>SAVE</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              <span>FORGET</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              <span>SEARCH AGAIN</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-rose-600 dark:text-rose-400 font-bold">GIVE UP</span>
            </div>

            <ul className="space-y-3.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold shrink-0">✕</span>
                <span>Stores dead web links that you never open again.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold shrink-0">✕</span>
                <span>Forces you to create manual folders and tags that you abandon in a week.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold shrink-0">✕</span>
                <span>Doesn't remember <em>why</em> you saved something or what problem you were solving.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold shrink-0">✕</span>
                <span>Browser bookmarks, YouTube likes, and Reddit saves never connect with each other.</span>
              </li>
            </ul>
          </div>

          {/* MemShift Way */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#111422] border-2 border-cyan-500/60 dark:border-cyan-500/50 shadow-xl dark:shadow-[0_0_30px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/30 backdrop-blur-md relative">
            <div className="flex items-center justify-between gap-2 mb-6 pb-4 border-b border-cyan-500/20">
              <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-mono text-xs uppercase tracking-widest font-bold">THE MEMSHIFT WAY</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 border border-cyan-500/30 font-semibold">
                Connected
              </span>
            </div>

            {/* Loop Diagram */}
            <div className="p-4 rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-500/30 font-mono text-xs text-cyan-900 dark:text-cyan-200 flex items-center justify-center gap-2 mb-6 flex-wrap">
              <span className="text-cyan-700 dark:text-cyan-300 font-semibold">WATCH & READ</span>
              <ArrowRight className="w-3.5 h-3.5 text-cyan-500" />
              <span className="text-cyan-700 dark:text-cyan-300 font-semibold">UNDERSTAND</span>
              <ArrowRight className="w-3.5 h-3.5 text-cyan-500" />
              <span className="text-cyan-700 dark:text-cyan-300 font-semibold">CONNECT</span>
              <ArrowRight className="w-3.5 h-3.5 text-cyan-500" />
              <span className="text-emerald-600 dark:text-emerald-300 font-bold">REMEMBER</span>
            </div>

            <ul className="space-y-3.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
              <li className="flex items-start gap-2.5">
                <span className="text-cyan-500 font-bold shrink-0">✓</span>
                <span>Figures out the important ideas inside the content automatically.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-cyan-500 font-bold shrink-0">✓</span>
                <span>Zero organizing needed: connects related ideas across videos, articles, and notes.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-cyan-500 font-bold shrink-0">✓</span>
                <span>Search the way you think: ask about the concept, not the exact webpage URL.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-cyan-500 font-bold shrink-0">✓</span>
                <span>Find where you first learned something weeks or months later with 1 click.</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
};
