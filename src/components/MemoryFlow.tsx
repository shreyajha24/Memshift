import React, { useState } from 'react';
import { Video, FileText, Share2, Sparkles, ArrowRight, CheckCircle2, Compass, Layers, GitMerge, RotateCcw } from 'lucide-react';

interface JourneyStep {
  id: number;
  stepNumber: string;
  badge: string;
  title: string;
  subtitle: string;
  visualState: {
    cards: {
      type: 'video' | 'article' | 'reddit' | 'reel';
      title: string;
      source: string;
      date: string;
      isDimmed?: boolean;
      highlightConcepts?: string[];
      badgeText?: string;
    }[];
    activeConcepts: {
      name: string;
      color: string;
      status: string;
    }[];
    connectionMessage?: string;
  };
  explanation: string;
}

export const MemoryFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const steps: JourneyStep[] = [
    {
      id: 0,
      stepNumber: '01',
      badge: 'DISCOVERY',
      title: 'You find something interesting.',
      subtitle: 'You are browsing YouTube and find an explanation of Redis.',
      explanation: 'You don\'t need to take manual notes, create new folders, or organize tags. You just enjoy watching the content.',
      visualState: {
        cards: [
          {
            type: 'video',
            title: 'Redis in 10 Minutes',
            source: 'YouTube • 47m video',
            date: 'Aug 3',
            badgeText: 'New Discovery ⚡'
          }
        ],
        activeConcepts: []
      }
    },
    {
      id: 1,
      stepNumber: '02',
      badge: 'LIFE CONTINUES',
      title: 'You move on with your day.',
      subtitle: 'You read an article, watch a reel, and check a Reddit thread.',
      explanation: 'Normally, content you saw earlier gets pushed down your browser history and forgotten. With MemShift, the useful ideas stay easy to find.',
      visualState: {
        cards: [
          {
            type: 'video',
            title: 'Redis in 10 Minutes',
            source: 'YouTube',
            date: 'Aug 3',
            isDimmed: true,
            badgeText: 'Saved in background'
          },
          {
            type: 'article',
            title: 'Async Python Basics',
            source: 'Medium • 5m read',
            date: 'Aug 5',
            badgeText: 'New tab'
          },
          {
            type: 'reddit',
            title: 'r/webdev: Best DB for 2026',
            source: 'Reddit • Discussion',
            date: 'Aug 6',
            badgeText: 'Saved link'
          }
        ],
        activeConcepts: []
      }
    },
    {
      id: 2,
      stepNumber: '03',
      badge: 'UNDERSTANDING',
      title: 'MemShift remembers what mattered.',
      subtitle: 'Concepts naturally emerge from the content you consumed.',
      explanation: 'MemShift figures out the topic and the key takeaways without asking you to organize anything.',
      visualState: {
        cards: [
          {
            type: 'video',
            title: 'Redis in 10 Minutes',
            source: 'YouTube',
            date: 'Aug 3',
            badgeText: 'Analyzed'
          }
        ],
        activeConcepts: [
          { name: 'Redis', color: '#06b6d4', status: 'Core Topic' },
          { name: 'Caching', color: '#10b981', status: 'Key Idea' },
          { name: 'Performance', color: '#f59e0b', status: 'Key Idea' }
        ],
        connectionMessage: 'MemShift extracted 3 central concepts from this video.'
      }
    },
    {
      id: 3,
      stepNumber: '04',
      badge: 'NEW ENCOUNTER',
      title: 'Then you see something related.',
      subtitle: 'Days later, you read an article: "How Caching Improves Performance".',
      explanation: 'MemShift immediately recognizes that "Caching" connects this new article directly to the Redis video from last week.',
      visualState: {
        cards: [
          {
            type: 'video',
            title: 'Redis in 10 Minutes',
            source: 'YouTube',
            date: 'Aug 3',
            badgeText: 'Past Memory'
          },
          {
            type: 'article',
            title: 'How Caching Improves Performance',
            source: 'Dev Article',
            date: 'Aug 8',
            badgeText: 'New Article ⚡'
          }
        ],
        activeConcepts: [
          { name: 'Caching', color: '#10b981', status: 'Shared Bridge ✨' },
          { name: 'Databases', color: '#8b5cf6', status: 'New Idea' }
        ],
        connectionMessage: 'MemShift noticed: "You\'ve seen the idea of Caching before in your Redis video."'
      }
    },
    {
      id: 4,
      stepNumber: '05',
      badge: 'COMPLETE MEMORY',
      title: 'Now MemShift understands the connection.',
      subtitle: 'Your memories form a living web: Redis ↔ Caching ↔ Performance.',
      explanation: 'You now have an interconnected memory map. Whenever you search for any of these ideas, you get the entire context.',
      visualState: {
        cards: [
          {
            type: 'video',
            title: 'Redis in 10 Minutes',
            source: 'YouTube (Aug 3)',
            date: 'Aug 3',
            badgeText: 'Connected'
          },
          {
            type: 'article',
            title: 'How Caching Improves Performance',
            source: 'Dev Article (Aug 8)',
            date: 'Aug 8',
            badgeText: 'Connected'
          }
        ],
        activeConcepts: [
          { name: 'Redis', color: '#06b6d4', status: 'Source 1' },
          { name: 'Caching', color: '#10b981', status: 'Central Link' },
          { name: 'Performance', color: '#f59e0b', status: 'Source 1 & 2' },
          { name: 'Databases', color: '#8b5cf6', status: 'Source 2' }
        ],
        connectionMessage: 'The full connection is clear: Redis ↔ Caching ↔ Performance ↔ Databases.'
      }
    }
  ];

  const active = steps[currentStep];

  return (
    <section id="how-it-works" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-mono uppercase tracking-widest mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>HOW MEMSHIFT WORKS // STEP BY STEP</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
            How something you saw becomes <br className="hidden sm:inline" />
            <span className="text-cyan-600 dark:text-cyan-400">something you can find again.</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Experience what happens in MemShift as you browse, read, and learn over days and weeks.
          </p>
        </div>

        {/* 5-Step Progress Tracker */}
        <div className="mb-10">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 p-2 rounded-2xl bg-slate-100 dark:bg-[#0d101d] border border-slate-200 dark:border-white/10 backdrop-blur-md">
            {steps.map((step, idx) => {
              const isSelected = currentStep === idx;
              return (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(idx)}
                  className={`p-3 rounded-xl text-left transition-all font-mono focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                    isSelected
                      ? 'bg-white dark:bg-[#14192b] text-slate-900 dark:text-white border border-cyan-500/50 shadow-md ring-1 ring-cyan-500/30'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/50 dark:hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1 text-[10px]">
                    <span className="font-bold text-cyan-600 dark:text-cyan-400">{step.stepNumber}</span>
                    <span className="uppercase text-slate-400">{step.badge}</span>
                  </div>
                  <div className="text-xs font-semibold truncate">
                    {step.title}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Interactive Stage Simulation Box */}
        <div className="p-6 sm:p-10 rounded-3xl bg-slate-950 dark:bg-[#0b0e18] border-2 border-slate-800 dark:border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden text-white min-h-[440px] flex flex-col justify-between">
          
          {/* Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Stage Descriptor */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 mb-1">
                <span>STEP {active.stepNumber} OF 05 // {active.badge}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {active.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
                {active.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setCurrentStep((prev) => (prev + 1) % steps.length)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)]"
              >
                <span>{currentStep === 4 ? 'Start from beginning ↺' : 'See next step →'}</span>
              </button>
            </div>
          </div>

          {/* Center Visual Canvas for Current Step */}
          <div className="py-8 my-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              {/* Content Cards Column */}
              <div className="md:col-span-6 space-y-3">
                <div className="text-[11px] font-mono text-slate-400 mb-2">
                  CONTENT IN YOUR BROWSING STREAM:
                </div>
                {active.visualState.cards.map((card, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-2xl border transition-all duration-300 ${
                      card.isDimmed
                        ? 'bg-white/5 border-white/5 opacity-50'
                        : 'bg-slate-900/90 border-cyan-500/30 shadow-md'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                      <span className="text-cyan-400 uppercase flex items-center gap-1">
                        {card.type === 'video' ? <Video className="w-3 h-3" /> : <FileText className="w-3 h-3" />}
                        {card.source}
                      </span>
                      {card.badgeText && (
                        <span className="px-2 py-0.5 rounded bg-white/10 text-slate-200">
                          {card.badgeText}
                        </span>
                      )}
                    </div>
                    <div className="text-sm font-semibold text-white">
                      "{card.title}"
                    </div>
                  </div>
                ))}
              </div>

              {/* Emergent Concepts / Connections Column */}
              <div className="md:col-span-6 space-y-4">
                <div className="text-[11px] font-mono text-cyan-400 mb-2">
                  WHAT MEMSHIFT UNDERSTANDS:
                </div>

                {active.visualState.activeConcepts.length > 0 ? (
                  <div className="p-5 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {active.visualState.activeConcepts.map((concept, idx) => (
                        <div
                          key={idx}
                          className="px-3 py-1.5 rounded-xl border font-mono text-xs flex items-center gap-1.5 shadow-sm"
                          style={{
                            borderColor: concept.color,
                            backgroundColor: `${concept.color}15`,
                            color: concept.color
                          }}
                        >
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: concept.color }}
                          />
                          <span className="font-bold">{concept.name}</span>
                          <span className="text-[9px] opacity-75">({concept.status})</span>
                        </div>
                      ))}
                    </div>

                    {active.visualState.connectionMessage && (
                      <p className="text-xs text-slate-300 pt-2 border-t border-cyan-500/20 font-mono">
                        💡 {active.visualState.connectionMessage}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/5 text-center text-xs font-mono text-slate-400">
                    Watching content... MemShift prepares to extract key ideas without interrupting you.
                  </div>
                )}

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300">
                  <strong className="text-white block mb-1">Plain English Rule:</strong>
                  {active.explanation}
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Step Indicator Bar */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>MemShift continuous synthesis</span>
            </span>
            <span className="text-cyan-400">No manual tagging required</span>
          </div>

        </div>

      </div>
    </section>
  );
};
