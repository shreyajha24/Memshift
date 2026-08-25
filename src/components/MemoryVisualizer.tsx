import React, { useState, useEffect, useRef } from 'react';
import { FileText, Video, Sparkles, Lightbulb, Globe, ArrowRight, Share2, Compass } from 'lucide-react';

interface MemoryFragment {
  id: string;
  type: 'article' | 'video' | 'idea' | 'thread' | 'code' | 'note';
  title: string;
  source: string;
  timestamp: string;
  color: string;
  connectedTo: string[];
  insight: string;
  x: number; // percentage
  y: number; // percentage
}

const fragments: MemoryFragment[] = [
  {
    id: 'f-1',
    type: 'article',
    title: 'Autonomous Agent Memory Loops',
    source: 'arxiv.org/2403.0892',
    timestamp: 'Saved 12d ago',
    color: '#06b6d4',
    connectedTo: ['f-3', 'f-4', 'f-6'],
    insight: 'Synthesizes long-term context beyond episodic buffers.',
    x: 18,
    y: 20
  },
  {
    id: 'f-2',
    type: 'video',
    title: 'Vector Databases vs Graph RAG',
    source: 'youtube.com / 48m',
    timestamp: 'Saved 18d ago',
    color: '#3b82f6',
    connectedTo: ['f-1', 'f-5'],
    insight: 'Dense similarity fails without relational causal edges.',
    x: 75,
    y: 18
  },
  {
    id: 'f-3',
    type: 'idea',
    title: 'Ambient zero-taxonomy capture',
    source: 'Quick voice note',
    timestamp: 'Captured yesterday',
    color: '#10b981',
    connectedTo: ['f-1', 'f-6'],
    insight: 'Users hate manual folders; synthesis must happen passively.',
    x: 20,
    y: 72
  },
  {
    id: 'f-4',
    type: 'thread',
    title: 'Deterministic State Graphs in Agents',
    source: 'x.com/agent_builder',
    timestamp: 'Saved 5d ago',
    color: '#8b5cf6',
    connectedTo: ['f-1', 'f-5'],
    insight: 'Prevents looping hallucinations during tool invocation.',
    x: 82,
    y: 68
  },
  {
    id: 'f-5',
    type: 'code',
    title: 'Wasm On-Device Vector Index',
    source: 'github.com/fast-rag',
    timestamp: 'Saved 8d ago',
    color: '#f59e0b',
    connectedTo: ['f-2', 'f-4'],
    insight: 'Runs sub-10ms similarity queries locally in-browser.',
    x: 50,
    y: 84
  },
  {
    id: 'f-6',
    type: 'note',
    title: 'Thesis: The Rediscovery Crisis',
    source: 'MemShift Synthesis',
    timestamp: 'Active cluster',
    color: '#ec4899',
    connectedTo: ['f-1', 'f-3', 'f-2'],
    insight: 'Human memory needs associative cues, not static URLs.',
    x: 50,
    y: 44
  }
];

export const MemoryVisualizer: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('f-6');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const activeId = hoveredId || selectedId;
  const activeFragment = fragments.find((f) => f.id === activeId) || fragments[5];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 15;
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
    setHoveredId(null);
  };

  const getTypeIcon = (type: MemoryFragment['type']) => {
    switch (type) {
      case 'article':
        return <FileText className="w-3.5 h-3.5 text-cyan-400" />;
      case 'video':
        return <Video className="w-3.5 h-3.5 text-blue-400" />;
      case 'idea':
        return <Lightbulb className="w-3.5 h-3.5 text-emerald-400" />;
      case 'thread':
        return <Share2 className="w-3.5 h-3.5 text-purple-400" />;
      case 'code':
        return <Globe className="w-3.5 h-3.5 text-amber-400" />;
      case 'note':
        return <Sparkles className="w-3.5 h-3.5 text-pink-400" />;
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-5xl mx-auto min-h-[460px] sm:min-h-[520px] rounded-2xl bg-slate-950/70 dark:bg-[#0c0e17]/90 border border-slate-200/20 dark:border-white/10 p-4 sm:p-8 overflow-hidden backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] select-none"
    >
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top HUD / Status */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800/80 dark:border-white/5 text-xs">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="font-mono text-slate-400 dark:text-slate-400 font-medium">
            LIVE SYNAPSE GRAPH // 6 FRAGMENTS CONNECTED
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
          <span className="hidden sm:inline">Tap any node to view associative link</span>
          <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            AUTO-CLUSTER
          </span>
        </div>
      </div>

      {/* SVG Canvas for Synaptic Connections */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        style={{
          transform: `translate(${mouseOffset.x * 0.3}px, ${mouseOffset.y * 0.3}px)`,
          transition: 'transform 0.15s ease-out'
        }}
      >
        <defs>
          <linearGradient id="cyanLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="activeLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="1" />
            <stop offset="50%" stopColor="#a855f7" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Draw lines between connected fragments */}
        {fragments.map((source) => {
          return source.connectedTo.map((targetId) => {
            const target = fragments.find((f) => f.id === targetId);
            if (!target) return null;

            // Only draw in one direction to avoid duplicate DOM lines
            if (source.id > target.id) return null;

            const isConnectedToActive =
              activeFragment &&
              (source.id === activeFragment.id ||
                target.id === activeFragment.id ||
                (activeFragment.connectedTo.includes(source.id) &&
                  activeFragment.connectedTo.includes(target.id)));

            const isDirectActive =
              activeFragment &&
              ((source.id === activeFragment.id &&
                activeFragment.connectedTo.includes(target.id)) ||
                (target.id === activeFragment.id &&
                  activeFragment.connectedTo.includes(source.id)));

            return (
              <g key={`${source.id}-${target.id}`}>
                {/* Background ambient path */}
                <line
                  x1={`${source.x}%`}
                  y1={`${source.y}%`}
                  x2={`${target.x}%`}
                  y2={`${target.y}%`}
                  stroke={isDirectActive ? 'url(#activeLineGrad)' : isConnectedToActive ? 'rgba(6, 182, 212, 0.4)' : 'rgba(255, 255, 255, 0.07)'}
                  strokeWidth={isDirectActive ? 2.5 : 1.2}
                  strokeDasharray={isDirectActive ? 'none' : '4,4'}
                  className="transition-all duration-300"
                />

                {/* Animated pulse packet along direct active connections */}
                {isDirectActive && (
                  <line
                    x1={`${source.x}%`}
                    y1={`${source.y}%`}
                    x2={`${target.x}%`}
                    y2={`${target.y}%`}
                    stroke="#22d3ee"
                    strokeWidth={3}
                    strokeDasharray="6,24"
                    className="animate-flow-dash opacity-90"
                  />
                )}
              </g>
            );
          });
        })}
      </svg>

      {/* Floating Fragment DOM Elements */}
      <div
        className="relative w-full h-[320px] sm:h-[350px] mt-4 z-20"
        style={{
          transform: `translate(${mouseOffset.x}px, ${mouseOffset.y}px)`,
          transition: 'transform 0.15s ease-out'
        }}
      >
        {fragments.map((frag) => {
          const isSelected = selectedId === frag.id;
          const isHovered = hoveredId === frag.id;
          const isConnectedToActive =
            activeFragment &&
            (activeFragment.id === frag.id ||
              activeFragment.connectedTo.includes(frag.id));

          return (
            <button
              key={frag.id}
              onClick={() => setSelectedId(frag.id)}
              onMouseEnter={() => setHoveredId(frag.id)}
              onMouseLeave={() => setHoveredId(null)}
              onFocus={() => setSelectedId(frag.id)}
              style={{
                left: `${frag.x}%`,
                top: `${frag.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              className={`absolute group text-left transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-xl ${
                isSelected || isHovered
                  ? 'z-30 scale-105'
                  : isConnectedToActive
                  ? 'z-20 opacity-100 scale-100'
                  : 'z-10 opacity-60 hover:opacity-100 scale-95'
              }`}
            >
              <div
                className={`p-3 sm:p-3.5 rounded-xl border max-w-[200px] sm:max-w-[240px] transition-all backdrop-blur-md ${
                  isSelected || isHovered
                    ? 'bg-slate-900/95 dark:bg-[#131726]/95 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.35)]'
                    : isConnectedToActive
                    ? 'bg-slate-900/80 dark:bg-[#0f121d]/90 border-cyan-500/40 shadow-sm'
                    : 'bg-slate-950/60 dark:bg-[#090b12]/70 border-white/10 hover:border-white/25'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-1.5">
                    {getTypeIcon(frag.type)}
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-400">
                      {frag.type}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-slate-500 dark:text-slate-500">
                    {frag.timestamp}
                  </span>
                </div>

                <div className="text-xs font-semibold text-white line-clamp-1 mb-1 group-hover:text-cyan-300 transition-colors">
                  {frag.title}
                </div>

                <div className="text-[10px] text-slate-400 line-clamp-1 font-mono">
                  {frag.source}
                </div>

                {/* Micro highlight indicator if connected */}
                {(isSelected || isHovered) && (
                  <div className="mt-2 pt-2 border-t border-white/10 flex items-center gap-1 text-[10px] text-cyan-300 font-mono">
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                    <span>{frag.connectedTo.length} contextual links</span>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Fragment Context Inspector Footer */}
      <div className="relative z-20 mt-4 p-3.5 rounded-xl bg-slate-900/90 dark:bg-[#111420]/90 border border-slate-800 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
            <Compass className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white text-xs">
                {activeFragment.title}
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">
                {activeFragment.source}
              </span>
            </div>
            <p className="text-slate-400 text-[11px] mt-0.5">
              <strong className="text-cyan-400 font-medium font-mono">Insight:</strong> {activeFragment.insight}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
          <span className="text-[11px] font-mono text-slate-400">
            Bridge to: <strong className="text-white">{activeFragment.connectedTo.length} discoveries</strong>
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
        </div>
      </div>
    </div>
  );
};
