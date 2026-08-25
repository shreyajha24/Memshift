import React, { useState } from 'react';
import { Compass, BookmarkCheck, Cpu, GitMerge, BrainCircuit, ArrowRight, Sparkles, Check } from 'lucide-react';

interface StageData {
  id: string;
  stepName: string;
  title: string;
  subtitle: string;
  color: string;
  icon: React.ReactNode;
  cards: {
    title: string;
    source: string;
    connectionHint?: string;
    state: string;
  }[];
  explanation: string;
}

export const MemoryFlow: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(3); // Default to 'CONNECT' to showcase relationships

  const stages: StageData[] = [
    {
      id: 'discover',
      stepName: 'DISCOVER',
      title: 'Encounter ideas across the wild internet',
      subtitle: 'You stumble upon high-signal insights while reading, watching, or exploring.',
      color: '#06b6d4',
      icon: <Compass className="w-4 h-4 text-cyan-400" />,
      explanation: 'Unstructured content across disparate domains: blog posts, research papers, GitHub repos, and fleeting thoughts.',
      cards: [
        { title: 'That article about agents', source: 'arXiv paper on autonomous loops', state: 'Raw page' },
        { title: 'How vector databases work', source: 'Latent Space deep dive', state: 'Podcast clip' },
        { title: 'Someone mentioned RAG', source: 'Engineering blog post', state: 'Highlighted text' },
        { title: 'Startup idea from yesterday', source: 'Quick scratchpad note', state: 'Voice snippet' }
      ]
    },
    {
      id: 'save',
      stepName: 'SAVE',
      title: 'Capture instantly with zero taxonomic friction',
      subtitle: 'No manual folders. No tedious tagging. One keystroke or ambient capture.',
      color: '#3b82f6',
      icon: <BookmarkCheck className="w-4 h-4 text-blue-400" />,
      explanation: 'MemShift preserves original context, timestamp, reading session headspace, and key quote excerpts.',
      cards: [
        { title: 'That article about agents', source: 'Captured with 1-click shortcut', state: 'Ingested ⚡' },
        { title: 'How vector databases work', source: 'Audio timestamp 24:18 bookmarked', state: 'Ingested ⚡' },
        { title: 'Someone mentioned RAG', source: 'Captured during late night session', state: 'Ingested ⚡' },
        { title: 'Startup idea from yesterday', source: 'Ambient note synced via mobile', state: 'Ingested ⚡' }
      ]
    },
    {
      id: 'memshift',
      stepName: 'MEMSHIFT',
      title: 'Context extraction & latent embedding',
      subtitle: 'MemShift distills the core insight and maps it into high-dimensional semantic space.',
      color: '#8b5cf6',
      icon: <Cpu className="w-4 h-4 text-purple-400" />,
      explanation: 'Our local semantic model extracts entities, implicit concepts, and semantic embeddings on-device.',
      cards: [
        { title: 'That article about agents', source: 'Concepts: Long-term memory, multi-agent state', state: 'Embedded 🧠' },
        { title: 'How vector databases work', source: 'Concepts: High-dimensional indexing, HNSW, cosine', state: 'Embedded 🧠' },
        { title: 'Someone mentioned RAG', source: 'Concepts: Context injection, parent-child chunking', state: 'Embedded 🧠' },
        { title: 'Startup idea from yesterday', source: 'Concepts: Frictionless capture, cognitive tooling', state: 'Embedded 🧠' }
      ]
    },
    {
      id: 'connect',
      stepName: 'CONNECT',
      title: 'Autonomous relationship synthesis',
      subtitle: 'MemShift discovers implicit relationships between items saved weeks apart.',
      color: '#10b981',
      icon: <GitMerge className="w-4 h-4 text-emerald-400" />,
      explanation: 'Identifies non-obvious bridges: how the agent paper directly solves the RAG retrieval challenge from your startup note.',
      cards: [
        {
          title: 'That article about agents',
          source: 'Related: RAG architecture & Vector DB',
          connectionHint: '→ Powers episodic memory for tool-calling agents',
          state: 'Synapse Connected ✨'
        },
        {
          title: 'How vector databases work',
          source: 'Related: Local Wasm engines & Agent memory',
          connectionHint: '→ Acts as associative store for the agent loops',
          state: 'Synapse Connected ✨'
        },
        {
          title: 'Someone mentioned RAG',
          source: 'Related: Hierarchical indexing strategies',
          connectionHint: '→ Grounds agent decisions with verified knowledge',
          state: 'Synapse Connected ✨'
        },
        {
          title: 'Startup idea from yesterday',
          source: 'Related: Memory tooling & Human cognition',
          connectionHint: '→ Unifies all three pieces into a viable thesis',
          state: 'Synapse Connected ✨'
        }
      ]
    },
    {
      id: 'remember',
      stepName: 'REMEMBER',
      title: 'Instant recall by natural thought association',
      subtitle: 'Ask in plain human language. Surface the exact memory cluster instantly.',
      color: '#f59e0b',
      icon: <BrainCircuit className="w-4 h-4 text-amber-400" />,
      explanation: 'You never have to remember exact filenames or folder paths. Query by fuzzy concept, feeling, or temporal proximity.',
      cards: [
        {
          title: '"What was that agent architecture paper?"',
          source: 'Returned in 14ms with all 3 related concepts & original quote',
          state: 'Recalled 🎯'
        },
        {
          title: '"Where did I read about vector DBs?"',
          source: 'Returned Latent Space podcast snippet with linked RAG docs',
          state: 'Recalled 🎯'
        },
        {
          title: '"My thoughts on internet memory"',
          source: 'Returned startup note with synthesized cross-references',
          state: 'Recalled 🎯'
        },
        {
          title: 'Total context reconstructed',
          source: 'Everything you needed is instantly in your active mental buffer',
          state: 'Recalled 🎯'
        }
      ]
    }
  ];

  const current = stages[activeStage];

  return (
    <section id="how-it-works" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-mono uppercase tracking-widest text-slate-600 dark:text-slate-400 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
            <span>THE LIFECYCLE OF A MEMORY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            From scattered tabs to connected thoughts.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Traditional tools store dead URLs. MemShift is a living synthesis engine that continuously learns how your discoveries relate.
          </p>
        </div>

        {/* Five Stage Step Indicator Pipeline */}
        <div className="mb-12">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 p-2 rounded-2xl bg-slate-100/90 dark:bg-[#0c0e17] border border-slate-200/80 dark:border-white/10 backdrop-blur-md shadow-sm">
            {stages.map((stage, idx) => {
              const isSelected = activeStage === idx;
              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStage(idx)}
                  className={`relative flex items-center justify-center sm:justify-start gap-2.5 p-3 rounded-xl font-mono text-xs transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                    isSelected
                      ? 'bg-white dark:bg-white/10 text-slate-900 dark:text-white border border-cyan-400/50 shadow-md'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/50 dark:hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="p-1 rounded-md bg-slate-100 dark:bg-white/5">
                    {stage.icon}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-bold tracking-wider">{stage.stepName}</span>
                    <span className="text-[10px] text-slate-400 hidden sm:inline">0{idx + 1}</span>
                  </div>
                  {isSelected && (
                    <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-4 h-1 rounded-full bg-cyan-400 hidden sm:block" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Interactive Stage Viewer */}
        <div className="p-6 sm:p-10 rounded-2xl bg-slate-950 dark:bg-[#0c0e17] border border-slate-200/40 dark:border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden text-white">
          
          {/* Ambient Glow */}
          <div
            className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none transition-colors duration-500"
            style={{ backgroundColor: current.color }}
          />

          {/* Top Stage Descriptor */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-slate-800 dark:border-white/10">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 mb-1">
                <span>STAGE 0{activeStage + 1} // {current.stepName}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {current.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
                {current.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-mono text-slate-400">Next Stage:</span>
              <button
                onClick={() => setActiveStage((prev) => (prev + 1) % stages.length)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium transition-all"
              >
                <span>{stages[(activeStage + 1) % stages.length].stepName}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            {current.cards.map((card, i) => (
              <div
                key={i}
                className="group p-5 rounded-xl bg-slate-900/90 dark:bg-[#121524]/80 border border-slate-800 dark:border-white/10 hover:border-cyan-500/40 transition-all duration-300 relative overflow-hidden shadow-sm"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wide">
                    Discovery #{i + 1}
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-cyan-300 flex items-center gap-1">
                    <Check className="w-3 h-3 text-cyan-400" />
                    {card.state}
                  </span>
                </div>

                <h4 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors mb-1">
                  "{card.title}"
                </h4>

                <p className="text-xs text-slate-400">
                  {card.source}
                </p>

                {card.connectionHint && (
                  <div className="mt-3 pt-3 border-t border-white/5 text-[11px] font-mono text-emerald-400 bg-emerald-500/5 -mx-5 -mb-5 p-3 rounded-b-xl">
                    {card.connectionHint}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Stage Deep-dive Bar */}
          <div className="mt-8 pt-6 border-t border-slate-800 dark:border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>MemShift associative reasoning engine</span>
            </span>
            <span className="text-cyan-400">Zero manual organization required</span>
          </div>

        </div>

      </div>
    </section>
  );
};
