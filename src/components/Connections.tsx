import React, { useState } from 'react';
import { mockConnectionNodes } from '../data/mockData';
import { Sparkles, Network, ArrowRight, Share2, Layers } from 'lucide-react';
import { ConnectionNode } from '../types';

export const Connections: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-agents');
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const activeId = hoveredNodeId || selectedNodeId;
  const activeNode = mockConnectionNodes.find((n) => n.id === activeId) || mockConnectionNodes[0];

  return (
    <section id="connections" className="relative py-24 sm:py-32 overflow-hidden">
      
      {/* Subtle background glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] glow-radial-cyan pointer-events-none blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-mono uppercase tracking-widest mb-4">
            <Network className="w-3.5 h-3.5" />
            <span>ASSOCIATIVE GRAPH ENGINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            Information isn't linear. Your memory shouldn't be either.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            MemShift builds a dynamic neural graph of your discoveries. Click or hover any node below to inspect how concepts bridge across time.
          </p>
        </div>

        {/* Interactive Network Graph Arena */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
          
          {/* Left: SVG + Interactive Constellation Canvas */}
          <div className="lg:col-span-7">
            <div className="relative w-full h-[400px] sm:h-[460px] rounded-2xl bg-slate-950 dark:bg-[#0b0d17] border border-slate-200/40 dark:border-white/10 p-6 overflow-hidden backdrop-blur-xl shadow-2xl">
              
              {/* Top Graph HUD */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 text-[11px] font-mono text-slate-400">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>INTERACTIVE MEMORY MESH</span>
              </div>

              <div className="absolute top-4 right-4 z-20 text-[11px] font-mono text-cyan-400">
                ACTIVE: {activeNode.label.toUpperCase()}
              </div>

              {/* SVG Link Layer */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                <defs>
                  <linearGradient id="activeSynapseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.9" />
                  </linearGradient>
                </defs>

                {mockConnectionNodes.map((node) => {
                  return node.connections.map((targetId) => {
                    const target = mockConnectionNodes.find((n) => n.id === targetId);
                    if (!target) return null;
                    if (node.id > target.id) return null;

                    const isDirectlyActive =
                      activeNode &&
                      ((node.id === activeNode.id && activeNode.connections.includes(target.id)) ||
                        (target.id === activeNode.id && activeNode.connections.includes(node.id)));

                    const isHighlighted =
                      isDirectlyActive ||
                      (activeNode &&
                        (node.id === activeNode.id || target.id === activeNode.id));

                    return (
                      <g key={`${node.id}-${target.id}`}>
                        <line
                          x1={`${node.x}%`}
                          y1={`${node.y}%`}
                          x2={`${target.x}%`}
                          y2={`${target.y}%`}
                          stroke={isDirectlyActive ? 'url(#activeSynapseGrad)' : isHighlighted ? 'rgba(6, 182, 212, 0.4)' : 'rgba(255, 255, 255, 0.08)'}
                          strokeWidth={isDirectlyActive ? 2.5 : 1}
                          strokeDasharray={isDirectlyActive ? 'none' : '3,3'}
                          className="transition-all duration-300"
                        />
                        {isDirectlyActive && (
                          <circle
                            r="3"
                            fill="#22d3ee"
                            className="animate-pulse"
                          >
                            <animate
                              attributeName="cx"
                              values={`${node.x}%;${target.x}%;${node.x}%`}
                              dur="4s"
                              repeatCount="indefinite"
                            />
                            <animate
                              attributeName="cy"
                              values={`${node.y}%;${target.y}%;${node.y}%`}
                              dur="4s"
                              repeatCount="indefinite"
                            />
                          </circle>
                        )}
                      </g>
                    );
                  });
                })}
              </svg>

              {/* DOM Interactive Nodes */}
              {mockConnectionNodes.map((node) => {
                const isActive = activeNode.id === node.id;
                const isDirectNeighbor =
                  activeNode &&
                  (activeNode.connections.includes(node.id) ||
                    node.connections.includes(activeNode.id));

                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNodeId(node.id)}
                    onMouseEnter={() => setHoveredNodeId(node.id)}
                    onMouseLeave={() => setHoveredNodeId(null)}
                    onFocus={() => setSelectedNodeId(node.id)}
                    style={{
                      left: `${node.x}%`,
                      top: `${node.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    className={`absolute z-20 group transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-full ${
                      isActive
                        ? 'scale-110 z-30'
                        : isDirectNeighbor
                        ? 'scale-100 opacity-100 z-25'
                        : 'scale-90 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <div
                      className={`px-3 py-2 rounded-xl border font-mono text-xs transition-all backdrop-blur-md flex items-center gap-2 ${
                        isActive
                          ? 'bg-slate-900 border-cyan-400 text-white shadow-[0_0_25px_rgba(6,182,212,0.4)]'
                          : isDirectNeighbor
                          ? 'bg-slate-900/90 border-cyan-500/40 text-slate-200 shadow-sm'
                          : 'bg-slate-950/70 border-white/10 text-slate-400 hover:border-white/30'
                      }`}
                    >
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: node.color || '#06b6d4' }}
                      />
                      <span className="font-semibold whitespace-nowrap">{node.label}</span>
                    </div>
                  </button>
                );
              })}

              <div className="absolute bottom-4 left-4 z-20 text-[10px] font-mono text-slate-500">
                ● Hover/Tap any concept node to navigate graph
              </div>
            </div>
          </div>

          {/* Right: Active Node Detail & Contextual Relationship Bridges */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Header info */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#121524] border border-slate-200 dark:border-white/10 backdrop-blur-xl shadow-md dark:shadow-xl">
              
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-500/20 font-semibold">
                  {activeNode.category} NODE
                </span>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  {activeNode.connections.length} Synaptic Bridges
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: activeNode.color || '#06b6d4' }}
                />
                {activeNode.label}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                {activeNode.description}
              </p>

              {/* Relationship Bridges list */}
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/10">
                <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5 font-semibold">
                  <Share2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span>SYNTHESIZED RELATIONSHIPS:</span>
                </div>

                <div className="space-y-2.5 max-h-[200px] overflow-y-auto pr-1">
                  {activeNode.connections.map((targetId) => {
                    const target = mockConnectionNodes.find((n) => n.id === targetId);
                    const bridgeText = activeNode.contextBridge[targetId] || 'Synthesized semantic connection across temporal captures.';
                    if (!target) return null;

                    return (
                      <div
                        key={targetId}
                        onClick={() => setSelectedNodeId(targetId)}
                        className="p-3 rounded-lg bg-slate-50 dark:bg-white/5 hover:bg-cyan-500/10 dark:hover:bg-white/10 border border-slate-200/80 dark:border-white/5 hover:border-cyan-500/40 transition-all cursor-pointer text-xs"
                      >
                        <div className="flex items-center justify-between text-[11px] font-semibold text-cyan-700 dark:text-cyan-300 mb-1">
                          <span className="flex items-center gap-1">
                            <span>→</span> {target.label}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">Inspect</span>
                        </div>
                        <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-normal">
                          {bridgeText}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
