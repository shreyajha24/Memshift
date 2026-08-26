import React, { useState } from 'react';
import { Clock, Archive, Sparkles, CheckCircle2, RotateCcw, AlertTriangle, ShieldCheck, Heart } from 'lucide-react';

export const MemoryDecay: React.FC = () => {
  const [topicStatus, setTopicStatus] = useState<'prompt' | 'kept' | 'reviewing' | 'archived'>('prompt');

  return (
    <section className="relative py-24 sm:py-32 bg-slate-50/50 dark:bg-[#080a11]/80 border-y border-slate-200/80 dark:border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-mono uppercase tracking-widest mb-4">
            <Clock className="w-3.5 h-3.5" />
            <span>KEEPING YOUR MEMORY FRESH</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            Some things fade. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-400 to-rose-400">
              You choose what stays.
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            When you stop using a topic, MemShift gently surfaces it so you can refresh it, keep it active, or tuck it away.
          </p>
        </div>

        {/* Interactive Human Decay Simulator Card */}
        <div className="max-w-3xl mx-auto p-6 sm:p-10 rounded-3xl bg-slate-950 dark:bg-[#0c0e18] border-2 border-amber-500/30 text-white shadow-2xl backdrop-blur-xl relative overflow-hidden">
          
          {/* Top Status */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10 text-xs font-mono">
            <span className="text-amber-400 uppercase tracking-wider flex items-center gap-1.5 font-bold">
              <Clock className="w-4 h-4 text-amber-400" />
              MEMORY CHECK-IN
            </span>
            <span className="text-slate-400">Last seen: 18 days ago</span>
          </div>

          {/* Topic Detail */}
          <div className="mb-6">
            <div className="text-xs font-mono text-cyan-400 mb-1">
              TOPIC: JAVA CONCURRENCY
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Java Concurrency & Threads
            </h3>
            <p className="text-sm text-slate-300">
              You encountered this idea <strong>4 times</strong> across articles and video tutorials last month, but haven't touched it in 18 days.
            </p>
          </div>

          {/* MemShift Gentle Prompt */}
          <div className="p-5 rounded-2xl bg-amber-950/40 border border-amber-500/30 mb-8">
            <div className="text-xs font-mono text-amber-300 font-bold mb-1">
              MemShift asks:
            </div>
            <p className="text-sm text-white font-medium mb-4">
              "Still important for your current goals?"
            </p>

            {/* Interactive Action Buttons */}
            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={() => setTopicStatus('kept')}
                className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                  topicStatus === 'kept'
                    ? 'bg-emerald-400 text-slate-950 shadow-[0_0_20px_rgba(52,211,153,0.5)]'
                    : 'bg-white/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                }`}
              >
                <Heart className="w-3.5 h-3.5" />
                <span>Keep Active</span>
              </button>

              <button
                onClick={() => setTopicStatus('reviewing')}
                className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                  topicStatus === 'reviewing'
                    ? 'bg-cyan-400 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.5)]'
                    : 'bg-white/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Review Key Points</span>
              </button>

              <button
                onClick={() => setTopicStatus('archived')}
                className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                  topicStatus === 'archived'
                    ? 'bg-slate-300 text-slate-950 shadow-md'
                    : 'bg-white/10 hover:bg-white/20 text-slate-300 border border-white/10'
                }`}
              >
                <Archive className="w-3.5 h-3.5" />
                <span>Archive Topic</span>
              </button>

              {topicStatus !== 'prompt' && (
                <button
                  onClick={() => setTopicStatus('prompt')}
                  className="px-3 py-2.5 rounded-xl text-xs font-mono text-slate-400 hover:text-white transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Dynamic Status Response */}
            {topicStatus === 'kept' && (
              <div className="mt-4 p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-xs font-mono text-emerald-200 animate-in fade-in duration-200">
                ✓ Kept active: MemShift will keep this concept prioritized in your active memory mesh.
              </div>
            )}
            {topicStatus === 'reviewing' && (
              <div className="mt-4 p-3 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-200 animate-in fade-in duration-200">
                ✓ 3 key takeaways surfaced: Virtual threads, thread-safety, and lock coordination.
              </div>
            )}
            {topicStatus === 'archived' && (
              <div className="mt-4 p-3 rounded-xl bg-slate-900 border border-white/10 text-xs font-mono text-slate-300 animate-in fade-in duration-200">
                ✓ Archived gracefully: Still 100% searchable anytime you query it in the future.
              </div>
            )}
          </div>

          {/* Reassurance Footer */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5 text-slate-200 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>MemShift doesn't decide what you should forget. You do.</span>
            </span>
            <span className="hidden sm:inline text-cyan-400">Complete human control</span>
          </div>

        </div>

      </div>
    </section>
  );
};
