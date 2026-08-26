import React, { useState } from 'react';
import { Calendar, Video, FileText, Search, Sparkles, CheckCircle2, ArrowRight, UserCheck } from 'lucide-react';

export const SarahStory: React.FC = () => {
  const [activeDay, setActiveDay] = useState<number>(0);

  const days = [
    {
      id: 'monday',
      dayLabel: 'MONDAY',
      dateStr: 'August 3',
      actionTitle: 'Sarah watches "Redis Explained"',
      actionType: 'video',
      actionDetail: 'She spends 20 minutes watching an introductory backend breakdown on YouTube.',
      whatMemshiftDid: [
        { label: 'Redis', note: 'Identified as the core subject' },
        { label: 'Caching', note: 'Extracted key concept' },
        { label: 'Performance', note: 'Noted topic relevance' }
      ],
      insightText: 'Sarah didn’t make any bookmarks or folders. MemShift noted what she watched in the background.',
      badgeColor: 'text-cyan-400 border-cyan-400/30 bg-cyan-500/10'
    },
    {
      id: 'wednesday',
      dayLabel: 'WEDNESDAY',
      dateStr: 'August 5',
      actionTitle: 'Sarah reads "Database Optimization"',
      actionType: 'article',
      actionDetail: 'She reads a blog post about making database queries run faster under high traffic.',
      whatMemshiftDid: [
        { label: 'Databases', note: 'New topic indexed' },
        { label: 'Performance', note: 'Connected to Monday’s video' },
        { label: 'Caching', note: 'Bridged Redis ↔ Databases' }
      ],
      insightText: 'MemShift noticed: "Performance" and "Caching" connect Monday’s Redis video to Wednesday’s Database article.',
      badgeColor: 'text-emerald-400 border-emerald-400/30 bg-emerald-500/10'
    },
    {
      id: 'friday',
      dayLabel: 'FRIDAY',
      dateStr: 'August 7',
      actionTitle: 'Sarah asks: "Where did I learn about Redis?"',
      actionType: 'search',
      actionDetail: 'During a team meeting, someone asks about caching strategies.',
      whatMemshiftDid: [
        { label: 'Instant Answer', note: 'Surfaced YouTube video from August 3' },
        { label: 'Full Context', note: 'Showed the linked Database optimization article' },
        { label: 'Direct Link', note: '1-click button to reopen original video' }
      ],
      insightText: 'MemShift instantly gave Sarah the exact video and timestamp, plus the connected articles she read after.',
      badgeColor: 'text-purple-400 border-purple-400/30 bg-purple-500/10'
    }
  ];

  const current = days[activeDay];

  return (
    <section className="relative py-24 sm:py-32 bg-slate-50/50 dark:bg-[#080a12]/80 border-y border-slate-200/80 dark:border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-mono uppercase tracking-widest mb-4">
            <UserCheck className="w-3.5 h-3.5" />
            <span>REAL-WORLD STORY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
            How Sarah learns backend development.
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Instead of explaining abstract features, here is what happens during a single week in the life of a MemShift user.
          </p>
        </div>

        {/* Story Stepper Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-5xl mx-auto">
          {days.map((day, idx) => {
            const isSelected = activeDay === idx;
            return (
              <button
                key={day.id}
                onClick={() => setActiveDay(idx)}
                className={`p-5 rounded-2xl text-left border transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                  isSelected
                    ? 'bg-white dark:bg-[#121524] border-cyan-500/60 shadow-lg ring-1 ring-cyan-500/30'
                    : 'bg-white/70 dark:bg-[#0c0e17]/60 border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${day.badgeColor}`}>
                    {day.dayLabel} • {day.dateStr}
                  </span>
                  <span className="text-xs font-mono text-slate-400">Day 0{idx + 1}</span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-1">
                  {day.actionTitle}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {day.actionDetail}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Day Spotlight Box */}
        <div className="max-w-5xl mx-auto p-6 sm:p-10 rounded-3xl bg-slate-950 dark:bg-[#0d101d] border-2 border-cyan-500/30 text-white relative overflow-hidden shadow-2xl backdrop-blur-xl">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left: What Sarah Did */}
            <div className="md:col-span-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <Calendar className="w-3.5 h-3.5" />
                <span>{current.dayLabel}, {current.dateStr} // WHAT SARAH EXPERIENCED</span>
              </div>

              <h3 className="text-2xl font-bold text-white">
                {current.actionTitle}
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed">
                {current.actionDetail}
              </p>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300 font-mono">
                💡 <strong className="text-white">Why this matters:</strong> {current.insightText}
              </div>
            </div>

            {/* Right: What MemShift Did Behind the Scenes */}
            <div className="md:col-span-6 space-y-3">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                WHAT MEMSHIFT DID AUTOMATICALLY:
              </div>

              <div className="space-y-2.5">
                {current.whatMemshiftDid.map((item, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-slate-900/90 border border-cyan-500/25 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span className="font-semibold text-white font-mono">{item.label}</span>
                    </div>
                    <span className="text-slate-400 text-[11px]">{item.note}</span>
                  </div>
                ))}
              </div>

              {activeDay === 2 ? (
                <div className="mt-4 p-4 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-xs text-cyan-300 font-mono flex items-center justify-between">
                  <span>Result: 0 search frustration</span>
                  <span className="text-white font-bold">100% confidence</span>
                </div>
              ) : (
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setActiveDay((prev) => (prev + 1) % 3)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-300 hover:text-cyan-200 transition-colors"
                  >
                    <span>Next day in Sarah's week</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
