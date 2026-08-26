import React, { useState } from 'react';
import { Clock, Calendar, Video, FileText, Sparkles, ArrowRight, GitBranch, Compass, Layers } from 'lucide-react';
import { mockTimelineEvents } from '../data/mockData';

export const KnowledgeTimeline: React.FC = () => {
  const [selectedEventId, setSelectedEventId] = useState<string>('tl-1');
  const [showNetworkView, setShowNetworkView] = useState<boolean>(false);

  const activeEvent = mockTimelineEvents.find((e) => e.id === selectedEventId) || mockTimelineEvents[0];

  return (
    <section className="relative py-24 sm:py-32 bg-slate-50/50 dark:bg-[#070911]/80 border-y border-slate-200/80 dark:border-white/5 overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] glow-radial-cyan pointer-events-none blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-mono uppercase tracking-widest mb-4">
            <Clock className="w-3.5 h-3.5" />
            <span>SEE YOUR LEARNING TIMELINE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            Your knowledge has a history.
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            MemShift remembers not just what you saved, but <strong className="text-slate-900 dark:text-white">when the ideas appeared in your life</strong> and how they evolved together.
          </p>
        </div>

        {/* View Switcher: Timeline vs Connected Network */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 rounded-xl bg-slate-200/80 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-xs font-mono">
            <button
              onClick={() => setShowNetworkView(false)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                !showNetworkView
                  ? 'bg-white dark:bg-[#121524] text-slate-900 dark:text-white shadow-sm font-bold border border-cyan-500/30'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              📅 Chronological Timeline
            </button>
            <button
              onClick={() => setShowNetworkView(true)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                showNetworkView
                  ? 'bg-white dark:bg-[#121524] text-slate-900 dark:text-white shadow-sm font-bold border border-cyan-500/30'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              ✨ Connected Web View
            </button>
          </div>
        </div>

        {/* --- DESKTOP HORIZONTAL / MOBILE VERTICAL TIMELINE --- */}
        {!showNetworkView ? (
          <div className="max-w-5xl mx-auto space-y-8">
            
            {/* Desktop Horizontal Line */}
            <div className="hidden md:block relative pt-10 pb-6">
              {/* Central Axis Bar */}
              <div className="absolute top-[52px] left-[5%] right-[5%] h-1 bg-slate-200 dark:bg-white/10 rounded-full" />
              
              <div className="grid grid-cols-4 gap-4 relative z-10">
                {mockTimelineEvents.map((evt, idx) => {
                  const isSelected = selectedEventId === evt.id;
                  return (
                    <button
                      key={evt.id}
                      onClick={() => setSelectedEventId(evt.id)}
                      className="group flex flex-col items-center text-center focus:outline-none"
                    >
                      {/* Date Badge */}
                      <span className={`text-xs font-mono font-bold mb-3 transition-colors ${
                        isSelected ? 'text-cyan-600 dark:text-cyan-400 scale-105' : 'text-slate-500'
                      }`}>
                        {evt.displayDate}
                      </span>

                      {/* Milestone Node */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                        isSelected
                          ? 'bg-cyan-400 border-cyan-300 text-slate-950 scale-125 shadow-[0_0_20px_rgba(6,182,212,0.6)] font-bold'
                          : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-white/20 text-slate-400 group-hover:border-cyan-400'
                      }`}>
                        <span className="text-xs font-mono">0{idx + 1}</span>
                      </div>

                      {/* Title & Concept */}
                      <div className="mt-4">
                        <span className="text-xs font-mono font-semibold text-cyan-600 dark:text-cyan-300 block">
                          {evt.concept}
                        </span>
                        <span className="text-xs text-slate-700 dark:text-slate-300 line-clamp-1 mt-0.5">
                          {evt.title}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile Vertical Timeline */}
            <div className="md:hidden space-y-3">
              {mockTimelineEvents.map((evt, idx) => {
                const isSelected = selectedEventId === evt.id;
                return (
                  <button
                    key={evt.id}
                    onClick={() => setSelectedEventId(evt.id)}
                    className={`w-full p-4 rounded-2xl text-left border transition-all ${
                      isSelected
                        ? 'bg-white dark:bg-[#121524] border-cyan-500/50 shadow-md ring-1 ring-cyan-500/30'
                        : 'bg-white/60 dark:bg-[#0c0e17]/60 border-slate-200 dark:border-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono mb-1">
                      <span className="text-cyan-600 dark:text-cyan-400 font-bold">{evt.displayDate}</span>
                      <span className="text-slate-400">{evt.sourceName}</span>
                    </div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">
                      {evt.title}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Detailed Selected Event Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 dark:bg-[#0c0e18] border-2 border-cyan-500/30 text-white shadow-2xl relative overflow-hidden backdrop-blur-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono font-bold">
                    {activeEvent.displayDate.split(' ')[0]}
                  </div>
                  <div>
                    <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                      {activeEvent.displayDate} // {activeEvent.sourceType.toUpperCase()} ENCOUNTER
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      {activeEvent.title}
                    </h3>
                  </div>
                </div>

                <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/10 border border-white/10 text-slate-300 self-start sm:self-auto">
                  {activeEvent.durationOrLength}
                </span>
              </div>

              <div className="py-4">
                <p className="text-sm text-slate-300 leading-relaxed">
                  {activeEvent.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Connected ideas:</span>
                  {activeEvent.connectedTo.map((c, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-300"
                    >
                      {c}
                    </span>
                  ))}
                </div>

                <span className="text-cyan-400 font-medium">
                  Recorded in your personal memory
                </span>
              </div>
            </div>

          </div>
        ) : (
          /* --- NETWORK SYNTHESIS VIEW (Redis <-> Caching <-> Performance) --- */
          <div className="max-w-4xl mx-auto p-8 rounded-3xl bg-slate-950 dark:bg-[#0c0e18] border-2 border-emerald-500/40 text-white shadow-2xl backdrop-blur-xl animate-in zoom-in-95 duration-300">
            <div className="text-center max-w-lg mx-auto mb-8">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-bold block mb-1">
                SYNTHESIS ESTABLISHED
              </span>
              <h3 className="text-xl font-bold text-white">
                How 4 weeks of browsing connected in your head:
              </h3>
            </div>

            {/* Visual Connected Chain */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-2 my-8 font-mono text-sm">
              <div className="p-4 rounded-2xl bg-cyan-950/80 border border-cyan-400 text-center min-w-[140px]">
                <span className="text-[10px] text-cyan-400 block">AUG 03 (YouTube)</span>
                <strong className="text-white">Redis</strong>
              </div>

              <div className="text-emerald-400 font-bold rotate-90 sm:rotate-0 text-lg">
                ←→
              </div>

              <div className="p-4 rounded-2xl bg-emerald-950/90 border-2 border-emerald-400 text-center min-w-[150px] shadow-[0_0_25px_rgba(16,185,129,0.4)] scale-105">
                <span className="text-[10px] text-emerald-300 block font-bold">CENTRAL BRIDGE</span>
                <strong className="text-emerald-200 text-base">Caching</strong>
              </div>

              <div className="text-emerald-400 font-bold rotate-90 sm:rotate-0 text-lg">
                ←→
              </div>

              <div className="p-4 rounded-2xl bg-amber-950/80 border border-amber-400 text-center min-w-[140px]">
                <span className="text-[10px] text-amber-400 block">AUG 16 (Blog)</span>
                <strong className="text-white">Performance</strong>
              </div>
            </div>

            <p className="text-xs text-slate-300 text-center max-w-md mx-auto pt-4 border-t border-white/10 font-mono">
              💡 Even though you read these weeks apart across 3 different websites, MemShift unified them into one connected mental model.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};
