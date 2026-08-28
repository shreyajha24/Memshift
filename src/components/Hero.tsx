import React from 'react';
import { MemoryVisualizer } from './MemoryVisualizer';
import { ArrowDown, Sparkles, ShieldCheck, Zap, Download } from 'lucide-react';
import { trackBetaDownload } from '../lib/analytics';

interface HeroProps {
  onExplore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  return (
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden">
      {/* Background glow and subtle dot grid */}
      <div className="absolute inset-0 bg-neural-grid pointer-events-none opacity-40" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] glow-radial-cyan pointer-events-none blur-2xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Text Content */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          
          {/* Product status */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 dark:bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-mono tracking-widest uppercase shadow-[0_0_15px_rgba(6,182,212,0.15)]">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-ping" />
              <span>PRIVATE BETA IS LIVE</span>
              <span className="text-slate-400 dark:text-slate-600">/</span>
              <span className="text-slate-500 dark:text-slate-400">CHROME EXTENSION</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.12] mb-5">
            Don't just browse. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-teal-400 to-indigo-500 dark:from-cyan-400 dark:via-teal-300 dark:to-indigo-400">
              Remember.
            </span>
          </h1>

          {/* Extended Supporting Explanation */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
            You see hundreds of useful things online. MemShift helps you remember what they were, how they connect, and where you found them. Try the Chrome beta today.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8">
            <a
              href="/downloads/MemShift-Beta-v1.0.0.zip"
              download
              onClick={() => trackBetaDownload('hero')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-900 bg-cyan-400 hover:bg-cyan-300 active:scale-[0.99] transition-all shadow-[0_0_25px_rgba(6,182,212,0.35)] hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <Download className="w-4 h-4 text-slate-900" />
              <span>Try MemShift Beta</span>
            </a>

            <button
              onClick={onExplore}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 active:scale-[0.99] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <span>See how it works</span>
              <ArrowDown className="w-4 h-4 text-slate-400 animate-bounce" />
            </button>
          </div>

          {/* Feature Highlights Pills */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-500 dark:text-slate-400 font-mono">
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
              <span>Figures out what ideas matter</span>
            </div>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
              <span>Connects related thoughts</span>
            </div>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
              <span>Finds your original source</span>
            </div>
          </div>
        </div>

        {/* Interactive Visualizer Canvas */}
        <div className="mt-6 sm:mt-10">
          <MemoryVisualizer />
        </div>
      </div>
    </section>
  );
};
