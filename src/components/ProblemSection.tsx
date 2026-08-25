import React, { useState } from 'react';
import { Bookmark, Send, FolderGit2, AlertCircle, Sparkles, CheckCircle2, Layers, SearchX } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      id: 'discover',
      badge: 'THE INTAKE',
      title: 'You discover hundreds of useful things every week.',
      detail: 'Articles on breakthrough frameworks, deep-dive YouTube essays, GitHub repos, insightful Twitter threads, and raw ideas during late-night rabbit holes.',
      icon: <Layers className="w-5 h-5 text-cyan-400" />,
      tag: '100+ discoveries/wk'
    },
    {
      id: 'save',
      badge: 'THE ILLUSION',
      title: 'You save them. You bookmark them. You send them to yourself.',
      detail: 'You dump links into browser bookmarks, message links to your own Telegram, add 80 tabs to a "Read Later" tab group, or screenshot diagrams to your camera roll.',
      icon: <Bookmark className="w-5 h-5 text-amber-400" />,
      tag: 'Fragmented across 6 apps'
    },
    {
      id: 'forget',
      badge: 'THE ROT',
      title: 'And eventually... you forget where they went.',
      detail: 'When you actually need the insight 3 weeks later, you only remember a vague sensation of having read it. Searching keywords in 400 nested folders yields nothing.',
      icon: <SearchX className="w-5 h-5 text-rose-400" />,
      tag: '87% never reopened'
    },
    {
      id: 'memshift',
      badge: 'THE SHIFT',
      title: 'MemShift remembers.',
      detail: 'MemShift captures ambient context, binds fragments to your associative cognitive graph, and surfaces the exact insight the moment you think about the concept.',
      icon: <Sparkles className="w-5 h-5 text-emerald-400" />,
      tag: 'Instant semantic recall'
    }
  ];

  return (
    <section id="product" className="relative py-24 sm:py-32 bg-slate-50/70 dark:bg-[#07080d]/60 border-y border-slate-200/80 dark:border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-widest mb-3">
            <span>THE REALITY OF DIGITAL CONSUMPTION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
            You don’t forget because you don’t care.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400">
            The modern internet generates more high-signal information in a day than human working memory can index in a lifetime. The problem isn’t your attention—it’s the storage paradigm.
          </p>
        </div>

        {/* Interactive Story Progression */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Progression Step Selector / Cards */}
          <div className="lg:col-span-6 space-y-4">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              const isPast = activeStep > idx;

              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(idx)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                    isActive
                      ? 'bg-white dark:bg-[#121522] border-cyan-500/60 dark:border-cyan-500/50 shadow-md dark:shadow-[0_10px_30px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/30'
                      : isPast
                      ? 'bg-white/80 dark:bg-[#0c0e17]/60 border-slate-200 dark:border-white/10 opacity-80 hover:opacity-100 hover:border-slate-300 dark:hover:border-white/20'
                      : 'bg-white/40 dark:bg-[#090b12]/40 border-slate-200/50 dark:border-white/5 opacity-55 hover:opacity-85'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-lg ${isActive ? 'bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400' : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400'}`}>
                        {step.icon}
                      </div>
                      <span className="text-[11px] font-mono tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                        {step.badge}
                      </span>
                    </div>

                    <span className={`text-[11px] font-mono px-2 py-0.5 rounded ${
                      idx === 3 
                        ? 'bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30' 
                        : idx === 2 
                        ? 'bg-rose-500/10 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-500/30' 
                        : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10'
                    }`}>
                      {step.tag}
                    </span>
                  </div>

                  <h3 className={`text-base sm:text-lg font-semibold mb-1 transition-colors ${
                    isActive ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'
                  }`}>
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {step.detail}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right: Visceral Interactive Simulation Container */}
          <div className="lg:col-span-6 sticky top-28">
            <div className="p-6 rounded-2xl bg-slate-950/80 dark:bg-[#0c0e17] border border-slate-800 dark:border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden min-h-[420px] flex flex-col justify-between">
              
              {/* Top simulation toolbar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-mono text-slate-400 ml-2">
                    {activeStep < 3 ? 'BROWSER CONTEXT ROT' : 'MEMSHIFT COGNITIVE GRAPH'}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-cyan-400">
                  STAGE {activeStep + 1}/4
                </span>
              </div>

              {/* Stage Visual States */}
              <div className="py-6 flex-1 flex flex-col justify-center">
                {activeStep === 0 && (
                  <div className="space-y-3 animate-in fade-in duration-300">
                    <div className="text-xs font-mono text-slate-400 mb-2">● High velocity discovery stream:</div>
                    <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-xs flex items-center justify-between text-slate-300">
                      <span>📄 arXiv:2403.0892v1 [cs.AI]</span>
                      <span className="text-[10px] font-mono text-cyan-400">10:14 AM</span>
                    </div>
                    <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-xs flex items-center justify-between text-slate-300">
                      <span>🎥 48m Talk on Graph RAG vs Vector DB</span>
                      <span className="text-[10px] font-mono text-cyan-400">1:42 PM</span>
                    </div>
                    <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-xs flex items-center justify-between text-slate-300">
                      <span>🧵 12-post breakdown on deterministic agent state machines</span>
                      <span className="text-[10px] font-mono text-cyan-400">4:20 PM</span>
                    </div>
                    <p className="text-[11px] text-slate-500 italic mt-2 text-center">
                      Every day brings dozens of high-value insights you genuinely want to retain.
                    </p>
                  </div>
                )}

                {activeStep === 1 && (
                  <div className="space-y-3 animate-in fade-in duration-300">
                    <div className="text-xs font-mono text-amber-400 mb-2">⚠ Fragmented across disconnected silos:</div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-slate-200">
                        <div className="font-mono text-[10px] text-amber-400 uppercase">Chrome Tabs</div>
                        <div className="font-bold text-lg text-white">93 open tabs</div>
                        <div className="text-[10px] text-slate-400">Hidden in tab groups</div>
                      </div>
                      <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-slate-200">
                        <div className="font-mono text-[10px] text-blue-400 uppercase">Self DMs</div>
                        <div className="font-bold text-lg text-white">142 raw links</div>
                        <div className="text-[10px] text-slate-400">Lost in Slack/Telegram</div>
                      </div>
                      <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20 text-slate-200">
                        <div className="font-mono text-[10px] text-purple-400 uppercase">Bookmarks Bar</div>
                        <div className="font-bold text-lg text-white">438 items</div>
                        <div className="text-[10px] text-slate-400">In "To Read (2024)"</div>
                      </div>
                      <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-slate-200">
                        <div className="font-mono text-[10px] text-rose-400 uppercase">Screenshots</div>
                        <div className="font-bold text-lg text-white">84 images</div>
                        <div className="text-[10px] text-slate-400">No searchable text</div>
                      </div>
                    </div>
                  </div>
                )}

                {activeStep === 2 && (
                  <div className="space-y-4 animate-in fade-in duration-300 text-center py-4">
                    <div className="w-12 h-12 mx-auto rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                      <AlertCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-white">The Memory Black Hole</h4>
                      <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1 leading-relaxed">
                        You remember <em>that</em> you found something revolutionary, but exact keywords are gone. The tab crashed, the bookmark folder is unsearchable, and the mental thread is severed.
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/20 text-[11px] text-rose-300 font-mono">
                      Query: "that agent framework paper" → Result: 0 matches in bookmarks
                    </div>
                  </div>
                )}

                {activeStep === 3 && (
                  <div className="space-y-3 animate-in fade-in duration-300">
                    <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                          <span className="text-xs font-semibold text-cyan-300">MemShift Semantic Graph Active</span>
                        </div>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-400/20 text-cyan-200">
                          100% Retrievable
                        </span>
                      </div>
                      <p className="text-xs text-slate-300">
                        Query: <span className="text-cyan-300 italic">"What did I read about persistent agent loops?"</span>
                      </p>
                      <div className="mt-3 pt-3 border-t border-cyan-500/20 space-y-1.5 text-[11px] text-slate-300 font-mono">
                        <div className="text-cyan-400">✓ Retrieved: Autonomous Agent Loops (arXiv)</div>
                        <div className="text-slate-400">↳ Linked to: Podcast on Latent Space + LangChain guide</div>
                        <div className="text-slate-400">↳ Context: Saved while reading about persistent context windows</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Quick Navigation Indicator */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex gap-1.5">
                  {steps.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveStep(i)}
                      className={`h-1.5 rounded-full transition-all ${
                        activeStep === i ? 'w-8 bg-cyan-400' : 'w-2 bg-white/20 hover:bg-white/40'
                      }`}
                      aria-label={`Go to stage ${i + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
                  className="text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  {activeStep === 3 ? 'Restart loop ↺' : 'Next stage →'}
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
