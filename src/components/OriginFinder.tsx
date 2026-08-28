import React, { useState } from 'react';
import { Compass, Video, FileText, Share2, Sparkles, ExternalLink, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { mockOriginItems } from '../data/mockData';
import { trackBetaDownload } from '../lib/analytics';

export const OriginFinder: React.FC = () => {
  const [selectedOriginId, setSelectedOriginId] = useState<string>('origin-oauth');

  const activeOrigin = mockOriginItems.find((o) => o.id === selectedOriginId) || mockOriginItems[0];

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-mono uppercase tracking-widest mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>FIND WHERE YOU LEARNED IT</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            Remember the idea. <br className="hidden sm:inline" />
            <span className="text-cyan-600 dark:text-cyan-400">Find the source.</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Ever had a great idea at work, but couldn't remember which article or video taught it to you? MemShift tracks where each thought first entered your life.
          </p>
        </div>

        {/* Origin Selector Pills */}
        <div className="flex justify-center gap-3 mb-10">
          {mockOriginItems.map((item) => {
            const isSelected = selectedOriginId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedOriginId(item.id)}
                className={`px-5 py-2.5 rounded-2xl text-xs font-mono font-bold transition-all border ${
                  isSelected
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                    : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/10 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Topic: {item.concept}
              </button>
            );
          })}
        </div>

        {/* Interactive source finder */}
        <div className="max-w-4xl mx-auto p-6 sm:p-10 rounded-3xl bg-slate-950 dark:bg-[#0c0e18] border-2 border-cyan-500/40 text-white shadow-2xl backdrop-blur-xl relative overflow-hidden">
          
          {/* User Query Simulation */}
          <div className="p-4 rounded-2xl bg-cyan-950/60 border border-cyan-500/30 mb-8 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-cyan-300">
              <span>You ask:</span>
              <strong className="text-white">"Where did I learn about {activeOrigin.concept}?"</strong>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-200">
              Found in your memories
            </span>
          </div>

          {/* First Encounter Anchor */}
          <div className="mb-8 p-6 rounded-2xl bg-slate-900/90 border border-cyan-500/30 shadow-lg">
            <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-2">
              <span className="flex items-center gap-1.5 font-bold uppercase">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                FIRST ENCOUNTERED
              </span>
              <span>{activeOrigin.firstFound.date}</span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
              {activeOrigin.firstFound.title}
            </h3>

            <p className="text-xs text-slate-400 font-mono mb-4">
              Platform: <strong className="text-slate-200">{activeOrigin.firstFound.platform}</strong> • {activeOrigin.firstFound.format}
            </p>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400">Related tags:</span>
                {activeOrigin.relatedConcepts.map((c, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-cyan-300"
                  >
                    #{c}
                  </span>
                ))}
              </div>

              <a
                href="/downloads/MemShift-Beta-v1.0.0.zip"
                download
                onClick={() => trackBetaDownload('origin_finder')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-bold font-mono transition-all shadow-sm"
              >
                <span>Open source</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Subsequent Encounters Trail */}
          <div>
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
              LATER ENCOUNTERS WITH THIS IDEA:
            </div>

            <div className="space-y-2.5">
              {activeOrigin.encounters.slice(1).map((enc, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2 font-mono text-cyan-400 mb-0.5">
                      <span className="font-bold">{enc.date}</span>
                      <span className="text-slate-500">•</span>
                      <span className="text-slate-300">{enc.platform}</span>
                    </div>
                    <div className="font-semibold text-white">
                      {enc.title}
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono italic sm:text-right">
                    "{enc.note}"
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
