import React, { useState } from 'react';
import { Bookmark, Search, Sparkles, CheckCircle2, Layers, SearchX, ArrowRight, Video, FileText, ExternalLink, HelpCircle } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'problem' | 'solution'>('problem');

  return (
    <section id="product" className="relative py-24 sm:py-32 bg-slate-50/70 dark:bg-[#07080d]/70 border-y border-slate-200/80 dark:border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-mono uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE CORE PROBLEM</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            You don't forget the idea. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-amber-500 to-cyan-500">
              You forget where you found it.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            You see a brilliant explanation online. Weeks later, the concept is still in your head—but the link is buried across 100 open tabs, 20 bookmark folders, and lost chat messages.
          </p>
        </div>

        {/* Side-by-Side Aha Moment Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
          
          {/* Left Column: What happens today (The Search Chaos) */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0c0e17] border border-rose-500/30 dark:border-rose-500/20 shadow-lg flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100 dark:border-white/5 text-xs font-mono">
                <span className="text-rose-600 dark:text-rose-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <SearchX className="w-4 h-4" />
                  THE BOOKMARK TRAP
                </span>
                <span className="text-slate-400">WITHOUT MEMSHIFT</span>
              </div>

              {/* User Thought Bubble */}
              <div className="p-4 rounded-2xl bg-rose-50/80 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-500/20 mb-6">
                <span className="text-xs font-mono text-rose-700 dark:text-rose-300 block mb-1">Your thought:</span>
                <p className="text-base font-semibold text-slate-900 dark:text-white italic">
                  "I remember watching a great video about Redis last week... what was the title?"
                </p>
              </div>

              {/* The Frustrating Hunt Step Ladder */}
              <div className="space-y-2.5 font-mono text-xs text-slate-600 dark:text-slate-400">
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-between">
                  <span>1. Check 94 open browser tabs</span>
                  <span className="text-rose-500 font-semibold">Not found</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-between">
                  <span>2. Search 20 nested bookmark folders</span>
                  <span className="text-rose-500 font-semibold">0 matches</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-between">
                  <span>3. Check YouTube history (400 videos)</span>
                  <span className="text-rose-500 font-semibold">Gave up</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs font-mono text-rose-600 dark:text-rose-400">
              <span>Result: Mental context lost</span>
              <span>15 minutes wasted</span>
            </div>
          </div>

          {/* Right Column: With MemShift (Instant Aha Moment) */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-slate-950 dark:bg-[#101424] border-2 border-cyan-500/50 shadow-2xl dark:shadow-[0_0_40px_rgba(6,182,212,0.2)] flex flex-col justify-between relative overflow-hidden text-white">
            
            {/* Subtle glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10 text-xs font-mono">
                <span className="text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  WITH MEMSHIFT
                </span>
                <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-semibold">
                  INSTANT RECALL
                </span>
              </div>

              {/* User Plain Thought Search */}
              <div className="p-4 rounded-2xl bg-cyan-950/50 border border-cyan-500/30 mb-6">
                <span className="text-xs font-mono text-cyan-400 block mb-1">You simply ask:</span>
                <p className="text-base font-semibold text-white">
                  "Where did I learn about Redis?"
                </p>
              </div>

              {/* MemShift Direct Answer Card */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-cyan-500/40 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
                  <span className="font-bold uppercase flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5" />
                    Redis Explained
                  </span>
                  <span className="text-slate-400">August 3, 2026</span>
                </div>

                <div className="text-sm font-semibold text-white">
                  First found on <strong className="text-cyan-300 font-bold">YouTube</strong> (47-minute video)
                </div>

                <div className="text-xs text-slate-300 font-mono">
                  Related things you've seen: <br />
                  <span className="text-cyan-300">Caching</span> • <span className="text-emerald-300">Performance</span> • <span className="text-purple-300">Databases</span>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">youtube.com/watch?v=redis-explained</span>
                  <a
                    href="#recall-demo"
                    className="inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-200 font-bold transition-colors"
                  >
                    <span>Open source</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-cyan-400">
              <span>Result: Exact memory found</span>
              <span>Retrieved in 12ms</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
