import React, { useState, useEffect, useRef } from 'react';
import { Video, FileText, Sparkles, Layers, ArrowRight, Play, CheckCircle2, RotateCcw, Link2, ExternalLink } from 'lucide-react';

export const MemoryVisualizer: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(2); // Default to Step 2 (Connect)
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);

  // Auto-step loop
  useEffect(() => {
    if (!isAutoPlaying) return;
    timerRef.current = window.setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 4500);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoPlaying]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 18;
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
    setHoveredNode(null);
  };

  const stepExplanations = [
    {
      title: 'You find something interesting online',
      detail: 'You watch a video explaining Redis. You don\'t need to take notes or create folders.',
      badge: 'Step 1: Discover'
    },
    {
      title: 'MemShift notices what matters inside',
      detail: 'MemShift notices the key ideas: Redis, Caching, and Performance—automatically.',
      badge: 'Step 2: Understand'
    },
    {
      title: 'You see something related later — dots connect',
      detail: 'Days later you read about databases. MemShift recognizes "Caching" connects both memories.',
      badge: 'Step 3: Connect'
    },
    {
      title: 'You can instantly find it again',
      detail: 'Ask "Where did I learn about Redis?" and MemShift surfaces the exact video and timestamp.',
      badge: 'Step 4: Recall'
    }
  ];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-5xl mx-auto rounded-3xl bg-slate-950/85 dark:bg-[#0b0e18]/90 border border-slate-200/20 dark:border-white/10 p-4 sm:p-8 overflow-hidden backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.35)] select-none perspective-1000"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Controls Bar */}
      <div className="relative z-30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800 dark:border-white/10">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500" />
          </span>
          <span className="text-xs font-mono text-white font-semibold tracking-wider uppercase">
            WATCH A MEMORY TAKE SHAPE
          </span>
        </div>

        {/* Step Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10 self-start sm:self-auto">
          {stepExplanations.map((step, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveStep(idx);
                setIsAutoPlaying(false);
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                activeStep === idx
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(6,182,212,0.5)]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              0{idx + 1}
            </button>
          ))}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`p-1 rounded-lg text-xs transition-colors ml-1 ${
              isAutoPlaying ? 'text-cyan-400 bg-cyan-500/10' : 'text-slate-400 hover:text-white'
            }`}
            title={isAutoPlaying ? 'Pause auto-play' : 'Resume auto-play'}
          >
            {isAutoPlaying ? <Sparkles className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* 3D Spatial Canvas Viewport */}
      <div
        className="relative w-full h-[360px] sm:h-[400px] my-4 z-20 preserve-3d transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(${-mouseOffset.y * 0.8}deg) rotateY(${mouseOffset.x * 0.8}deg)`
        }}
      >
        {/* SVG Connection Layer */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <defs>
            <linearGradient id="heroActiveBeam" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#10b981" stopOpacity="1" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="heroSubtleLine" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Links for Step 2+ (Concepts Emerge & Connect) */}
          {activeStep >= 1 && (
            <g className="transition-opacity duration-500">
              {/* Line from Video to Redis Node */}
              <line
                x1="26%"
                y1="38%"
                x2="32%"
                y2="70%"
                stroke="url(#heroSubtleLine)"
                strokeWidth="1.5"
                strokeDasharray="4,4"
              />
              {/* Line from Video to Caching Node */}
              <line
                x1="26%"
                y1="38%"
                x2="50%"
                y2="48%"
                stroke={activeStep >= 2 ? 'url(#heroActiveBeam)' : 'url(#heroSubtleLine)'}
                strokeWidth={activeStep >= 2 ? 2.5 : 1.5}
                className={activeStep >= 2 ? 'animate-pulse' : ''}
              />
              {/* Line from Video to Performance Node */}
              <line
                x1="26%"
                y1="38%"
                x2="48%"
                y2="20%"
                stroke="url(#heroSubtleLine)"
                strokeWidth="1.5"
                strokeDasharray="4,4"
              />
            </g>
          )}

          {/* Links for Step 3+ (Second Card Connects to Caching & Performance) */}
          {activeStep >= 2 && (
            <g className="transition-opacity duration-500">
              {/* Line from Article to Caching Node */}
              <line
                x1="74%"
                y1="38%"
                x2="50%"
                y2="48%"
                stroke="url(#heroActiveBeam)"
                strokeWidth="2.5"
                className="animate-pulse"
              />
              {/* Line from Article to Databases Node */}
              <line
                x1="74%"
                y1="38%"
                x2="68%"
                y2="70%"
                stroke="url(#heroSubtleLine)"
                strokeWidth="1.5"
                strokeDasharray="4,4"
              />
              {/* Line from Article to Performance Node */}
              <line
                x1="74%"
                y1="38%"
                x2="48%"
                y2="20%"
                stroke="url(#heroActiveBeam)"
                strokeWidth="2"
              />
              {/* Cross connection between Redis & Databases */}
              <line
                x1="32%"
                y1="70%"
                x2="68%"
                y2="70%"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1"
                strokeDasharray="3,3"
              />
            </g>
          )}
        </svg>

        {/* --- OBJECT 1: Video Card (Redis in 10 minutes) --- */}
        <div
          className={`absolute left-[6%] sm:left-[10%] top-[14%] sm:top-[16%] transition-all duration-700 ease-out ${
            activeStep === 0
              ? 'scale-105 z-30 shadow-[0_15px_35px_rgba(6,182,212,0.3)]'
              : 'scale-95 sm:scale-100 z-20 opacity-90'
          }`}
          style={{
            transform: `translateZ(${activeStep === 0 ? 30 : 10}px)`
          }}
        >
          <div className="w-[170px] sm:w-[220px] p-3 sm:p-4 rounded-2xl bg-slate-900/90 dark:bg-[#121626]/95 border border-cyan-500/40 shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400 mb-2">
              <span className="flex items-center gap-1">
                <Video className="w-3.5 h-3.5" />
                <span>YOUTUBE</span>
              </span>
              <span className="text-slate-400">Aug 3</span>
            </div>

            <div className="text-xs sm:text-sm font-bold text-white mb-1 line-clamp-1">
              Redis in 10 Minutes
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-400 line-clamp-2">
              Fireship • In-memory key-value data structures & fast lookups.
            </p>

            <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[9px] font-mono text-slate-400">
              <span>Duration: 47m</span>
              <span className="text-cyan-300">Encounter #1</span>
            </div>
          </div>
        </div>

        {/* --- OBJECT 2: Article Card (How caching improves performance) --- */}
        <div
          className={`absolute right-[6%] sm:right-[10%] top-[14%] sm:top-[16%] transition-all duration-700 ease-out ${
            activeStep >= 2
              ? 'opacity-100 scale-100 translate-y-0 z-20'
              : 'opacity-0 scale-90 translate-y-6 pointer-events-none'
          }`}
          style={{
            transform: `translateZ(${activeStep >= 2 ? 20 : 0}px)`
          }}
        >
          <div className="w-[170px] sm:w-[220px] p-3 sm:p-4 rounded-2xl bg-slate-900/90 dark:bg-[#121626]/95 border border-emerald-500/40 shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between text-[10px] font-mono text-emerald-400 mb-2">
              <span className="flex items-center gap-1">
                <FileText className="w-3.5 h-3.5" />
                <span>DEV ARTICLE</span>
              </span>
              <span className="text-slate-400">Aug 8</span>
            </div>

            <div className="text-xs sm:text-sm font-bold text-white mb-1 line-clamp-1">
              How Caching Works
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-400 line-clamp-2">
              Engineering Blog • Keeping hot data close to the CPU.
            </p>

            <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[9px] font-mono text-slate-400">
              <span>6 min read</span>
              <span className="text-emerald-300">Encounter #2</span>
            </div>
          </div>
        </div>

        {/* --- FLOATING CONCEPT NODES --- */}

        {/* Node: Redis */}
        <button
          onClick={() => setHoveredNode('redis')}
          onMouseEnter={() => setHoveredNode('redis')}
          className={`absolute left-[32%] top-[70%] -translate-x-1/2 -translate-y-1/2 transition-all duration-500 focus:outline-none ${
            activeStep >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'
          }`}
          style={{ transform: 'translate(-50%, -50%) translateZ(25px)' }}
        >
          <div className="px-3 py-1.5 rounded-full bg-slate-900/95 border border-cyan-400 text-white text-xs font-mono font-semibold flex items-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>Redis</span>
          </div>
        </button>

        {/* Node: Caching (THE CENTRAL BRIDGE) */}
        <button
          onClick={() => setHoveredNode('caching')}
          onMouseEnter={() => setHoveredNode('caching')}
          className={`absolute left-[50%] top-[48%] -translate-x-1/2 -translate-y-1/2 transition-all duration-500 focus:outline-none z-30 ${
            activeStep >= 1 ? 'opacity-100 scale-110' : 'opacity-0 scale-75 pointer-events-none'
          }`}
          style={{ transform: 'translate(-50%, -50%) translateZ(40px)' }}
        >
          <div className={`px-4 py-2 rounded-2xl border transition-all text-xs font-mono font-bold flex items-center gap-2 ${
            activeStep >= 2
              ? 'bg-emerald-950/90 border-emerald-400 text-emerald-200 shadow-[0_0_30px_rgba(16,185,129,0.5)] scale-110'
              : 'bg-slate-900/90 border-cyan-400/60 text-white shadow-md'
          }`}>
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
            <span>Caching</span>
            {activeStep >= 2 && (
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-400/20 text-emerald-300 font-normal">
                Bridge
              </span>
            )}
          </div>
        </button>

        {/* Node: Performance */}
        <button
          onClick={() => setHoveredNode('performance')}
          onMouseEnter={() => setHoveredNode('performance')}
          className={`absolute left-[48%] top-[20%] -translate-x-1/2 -translate-y-1/2 transition-all duration-500 focus:outline-none ${
            activeStep >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'
          }`}
          style={{ transform: 'translate(-50%, -50%) translateZ(25px)' }}
        >
          <div className="px-3 py-1.5 rounded-full bg-slate-900/95 border border-amber-400 text-white text-xs font-mono font-semibold flex items-center gap-1.5 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>Performance</span>
          </div>
        </button>

        {/* Node: Databases */}
        <button
          onClick={() => setHoveredNode('databases')}
          onMouseEnter={() => setHoveredNode('databases')}
          className={`absolute left-[68%] top-[70%] -translate-x-1/2 -translate-y-1/2 transition-all duration-500 focus:outline-none ${
            activeStep >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'
          }`}
          style={{ transform: 'translate(-50%, -50%) translateZ(25px)' }}
        >
          <div className="px-3 py-1.5 rounded-full bg-slate-900/95 border border-purple-400 text-white text-xs font-mono font-semibold flex items-center gap-1.5 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
            <span className="w-2 h-2 rounded-full bg-purple-400" />
            <span>Databases</span>
          </div>
        </button>

        {/* Step 4 Recall Result Overlay */}
        {activeStep === 3 && (
          <div
            className="absolute inset-x-4 sm:inset-x-20 top-[25%] p-5 rounded-2xl bg-slate-900/95 border-2 border-cyan-400 shadow-[0_0_40px_rgba(6,182,212,0.4)] z-40 backdrop-blur-xl animate-in zoom-in-95 duration-300"
            style={{ transform: 'translateZ(50px)' }}
          >
            <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-white/10 text-xs font-mono text-cyan-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>MEMSHIFT FOUND IT</span>
              </span>
              <span className="text-[10px] text-slate-400">Back in view</span>
            </div>

            <div className="text-sm font-semibold text-white mb-1">
              "You first encountered Redis on <strong className="text-cyan-300">August 3, 2026</strong> in a YouTube video."
            </div>

            <div className="text-xs text-slate-400 mb-3">
              Related ideas you learned later: <strong className="text-slate-200">Caching (Aug 8)</strong> and <strong className="text-slate-200">Database Optimization (Aug 16)</strong>.
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/10">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                <Link2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Source: youtube.com/watch?v=redis-explained</span>
              </div>
              <span className="text-xs font-mono text-cyan-300 font-semibold flex items-center gap-1">
                Open original video <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Step Explanation Card */}
      <div className="relative z-30 mt-2 p-4 rounded-2xl bg-slate-900/90 dark:bg-[#111524]/90 border border-slate-800 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 text-cyan-400 font-mono font-bold text-sm">
            0{activeStep + 1}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-sm">
                {stepExplanations[activeStep].title}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-cyan-300">
                {stepExplanations[activeStep].badge}
              </span>
            </div>
            <p className="text-slate-300 text-xs mt-0.5">
              {stepExplanations[activeStep].detail}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
          <button
            onClick={() => setActiveStep((prev) => (prev + 1) % 4)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-medium transition-all"
          >
            <span>{activeStep === 3 ? 'Restart story ↺' : 'Next moment →'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
