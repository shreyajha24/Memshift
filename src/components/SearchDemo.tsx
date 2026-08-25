import React, { useState, useMemo } from 'react';
import { Search, Sparkles, Clock, Link2, ArrowUpRight, CheckCircle2, CornerDownLeft } from 'lucide-react';
import { mockMemories, mockSearchPresets } from '../data/mockData';
import { MemoryItem } from '../types';

export const SearchDemo: React.FC = () => {
  const [query, setQuery] = useState<string>('That article I saw about AI agents');
  const [selectedMemory, setSelectedMemory] = useState<MemoryItem>(mockMemories[0]);

  // Compute matched memories based on query or active preset
  const matchedMemories = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return mockMemories.slice(0, 3);

    // Check presets first
    const matchedPreset = mockSearchPresets.find(
      (p) => p.query.toLowerCase() === trimmed || trimmed.includes(p.label.toLowerCase())
    );

    if (matchedPreset) {
      return mockMemories.filter((m) => matchedPreset.matchedMemoryIds.includes(m.id));
    }

    // Otherwise do fuzzy substring search across title, tags, excerpt
    const filtered = mockMemories.filter((m) => {
      const matchTitle = m.title.toLowerCase().includes(trimmed);
      const matchExcerpt = m.excerpt.toLowerCase().includes(trimmed);
      const matchTags = m.tags.some((t) => t.toLowerCase().includes(trimmed));
      const matchSource = m.source.toLowerCase().includes(trimmed);
      return matchTitle || matchExcerpt || matchTags || matchSource;
    });

    return filtered.length > 0 ? filtered : [mockMemories[0], mockMemories[2]];
  }, [query]);

  // Keep selected memory in sync with search results
  const activeMemory = useMemo(() => {
    if (matchedMemories.some((m) => m.id === selectedMemory?.id)) {
      return selectedMemory;
    }
    return matchedMemories[0] || mockMemories[0];
  }, [matchedMemories, selectedMemory]);

  const relatedMemories = useMemo(() => {
    if (!activeMemory) return [];
    return mockMemories.filter((m) => activeMemory.connections.includes(m.id));
  }, [activeMemory]);

  const handleSelectPreset = (presetQuery: string) => {
    setQuery(presetQuery);
  };

  return (
    <section className="relative py-24 sm:py-32 bg-slate-50/50 dark:bg-[#080a11]/80 border-y border-slate-200/80 dark:border-white/5 overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] glow-radial-cyan pointer-events-none blur-3xl" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] glow-radial-indigo pointer-events-none blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-mono uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>NATURAL LANGUAGE RECALL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            Ask how you think. MemShift understands.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            You don't need exact keywords, folder names, or dates. Search by vague sensations, partial thoughts, or conceptual questions.
          </p>
        </div>

        {/* Interactive Search Container */}
        <div className="max-w-4xl mx-auto">
          
          {/* Main Search Input Box */}
          <div className="relative rounded-2xl bg-white dark:bg-[#0e111d] border-2 border-cyan-500/50 focus-within:border-cyan-400 shadow-lg dark:shadow-[0_0_40px_rgba(6,182,212,0.2)] transition-all p-2 sm:p-3 mb-6">
            <div className="flex items-center gap-3 px-3">
              <Search className="w-5 h-5 text-cyan-500 dark:text-cyan-400 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What are you trying to remember?"
                className="w-full bg-transparent text-sm sm:text-base text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none py-2 font-medium"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="text-xs font-mono px-2 py-1 rounded bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Clear
                </button>
              )}
              <div className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-2 py-1 rounded-md">
                <span>Recall</span>
                <CornerDownLeft className="w-3 h-3 text-cyan-500 dark:text-cyan-400" />
              </div>
            </div>
          </div>

          {/* Preset Clickable Query Chips */}
          <div className="flex flex-wrap items-center gap-2 mb-8 justify-center sm:justify-start">
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400 mr-1">
              Try asking:
            </span>
            {mockSearchPresets.map((preset) => {
              const isSelected = query.toLowerCase() === preset.query.toLowerCase();
              return (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset.query)}
                  className={`text-xs font-mono px-3 py-1.5 rounded-lg border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                    isSelected
                      ? 'bg-cyan-500/15 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border-cyan-500/50 shadow-sm font-semibold'
                      : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
                  }`}
                >
                  "{preset.query}"
                </button>
              );
            })}
          </div>

          {/* Search Result Visual Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Primary Matched Memory Result */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 px-1">
                <span className="flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  PRIMARY MEMORY IDENTIFIED
                </span>
                <span>
                  Match confidence: <strong className="text-emerald-600 dark:text-emerald-400">{activeMemory.confidenceScore || 95}%</strong>
                </span>
              </div>

              {/* Memory Card */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#121524] border border-slate-200 dark:border-cyan-500/30 shadow-md dark:shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
                
                {/* Meta tags */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-700 dark:text-cyan-400 uppercase tracking-wider font-semibold">
                      {activeMemory.sourceType}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {activeMemory.savedAgo}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <Link2 className="w-3 h-3" />
                    {activeMemory.source}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                  {activeMemory.title}
                </h3>

                {/* Excerpt */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {activeMemory.excerpt}
                </p>

                {/* Highlighted Quote / Context Anchor */}
                {activeMemory.highlightedPhrase && (
                  <div className="p-3.5 rounded-xl bg-cyan-500/10 dark:bg-cyan-950/40 border border-cyan-500/20 dark:border-cyan-500/30 text-xs text-cyan-900 dark:text-cyan-200 font-mono mb-4">
                    <span className="text-cyan-600 dark:text-cyan-400 font-bold mr-1">"</span>
                    {activeMemory.highlightedPhrase}
                    <span className="text-cyan-600 dark:text-cyan-400 font-bold ml-1">"</span>
                  </div>
                )}

                {/* Contextual footprint */}
                {activeMemory.contextNote && (
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-start gap-1.5 font-mono pt-3 border-t border-slate-100 dark:border-white/5">
                    <strong className="text-slate-700 dark:text-slate-300 shrink-0">Captured context:</strong>
                    <span>{activeMemory.contextNote}</span>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {activeMemory.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

              </div>
            </div>

            {/* Right: Associated Context & Related Synaptic Nodes */}
            <div className="lg:col-span-5 space-y-4">
              <div className="text-xs font-mono text-slate-500 dark:text-slate-400 px-1 flex items-center justify-between">
                <span className="text-slate-700 dark:text-slate-300 font-medium">RELATED MEMORIES</span>
                <span className="text-cyan-600 dark:text-cyan-400 text-[11px]">{relatedMemories.length} linked nodes</span>
              </div>

              <div className="space-y-3">
                {relatedMemories.map((related) => (
                  <button
                    key={related.id}
                    onClick={() => setSelectedMemory(related)}
                    className="w-full text-left p-4 rounded-xl bg-white dark:bg-[#0f121e]/80 border border-slate-200 dark:border-white/10 hover:border-cyan-500/40 hover:shadow-md dark:hover:bg-slate-900 transition-all duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400 mb-1.5">
                      <span className="uppercase text-cyan-600 dark:text-cyan-400 font-semibold">{related.sourceType}</span>
                      <span>{related.savedAgo}</span>
                    </div>

                    <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors line-clamp-1 mb-1">
                      {related.title}
                    </h4>

                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                      {related.excerpt}
                    </p>

                    <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-slate-400 dark:text-slate-500 pt-2 border-t border-slate-100 dark:border-white/5">
                      <span>{related.tags.join(' • ')}</span>
                      <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </button>
                ))}
              </div>

              <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-950/60 border border-slate-200 dark:border-white/5 text-[11px] text-slate-600 dark:text-slate-400 font-mono">
                💡 <strong className="text-slate-800 dark:text-slate-200">Associative insight:</strong> MemShift continuously builds cross-document bridges so one query pulls the entire conceptual cluster.
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
