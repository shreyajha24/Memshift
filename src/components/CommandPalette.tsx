import React, { useState, useEffect } from 'react';
import { Search, Sparkles, X, Clock, Link2, ArrowRight, Video, ExternalLink, CheckCircle2 } from 'lucide-react';
import { mockMemories, mockSearchPresets } from '../data/mockData';
import { MemoryItem } from '../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMemory?: (mem: MemoryItem) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onSelectMemory }) => {
  const [searchTerm, setSearchTerm] = useState('Where did I watch that video about Redis?');
  const [isSearching, setIsSearching] = useState(false);

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Simulate search effect when term changes
  useEffect(() => {
    if (!isOpen) return;
    setIsSearching(true);
    const t = setTimeout(() => setIsSearching(false), 300);
    return () => clearTimeout(t);
  }, [searchTerm, isOpen]);

  if (!isOpen) return null;

  const filteredMemories = mockMemories.filter((mem) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      mem.title.toLowerCase().includes(term) ||
      mem.excerpt.toLowerCase().includes(term) ||
      mem.tags.some((t) => t.toLowerCase().includes(term)) ||
      term.includes('redis') && mem.id === 'mem-redis' ||
      term.includes('caching') && mem.id === 'mem-caching' ||
      term.includes('oauth') && mem.id === 'mem-oauth'
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      
      {/* Backdrop blur overlay */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl rounded-3xl bg-slate-950 dark:bg-[#0c0e18] border-2 border-cyan-500/50 shadow-[0_0_60px_rgba(6,182,212,0.3)] overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
              What do you remember?
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search input bar */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-white/5">
          <Search className={`w-5 h-5 ${isSearching ? 'text-cyan-400 animate-spin' : 'text-cyan-500'} shrink-0`} />
          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Ask what you remember in natural language..."
            className="w-full bg-transparent text-white text-sm sm:text-base placeholder:text-slate-500 focus:outline-none font-medium"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-xs font-mono text-slate-400 hover:text-white px-2 py-1 rounded bg-white/10"
            >
              Clear
            </button>
          )}
        </div>

        {/* Quick query chips */}
        <div className="px-4 py-3 bg-slate-900/80 border-b border-white/5 flex flex-wrap items-center gap-2 text-xs font-mono">
          <span className="text-slate-400">Try asking:</span>
          {mockSearchPresets.map((p) => (
            <button
              key={p.id}
              onClick={() => setSearchTerm(p.query)}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-white/10 transition-colors"
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Searching Status Indicator */}
        {isSearching && (
          <div className="px-4 py-2 bg-cyan-950/40 border-b border-cyan-500/20 text-xs font-mono text-cyan-300 flex items-center gap-2 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>Searching your memories...</span>
          </div>
        )}

        {/* Search Results list */}
        <div className="p-4 max-h-[380px] overflow-y-auto space-y-3">
          {filteredMemories.length > 0 ? (
            filteredMemories.map((mem) => (
              <div
                key={mem.id}
                className="p-5 rounded-2xl bg-slate-900/90 border border-cyan-500/30 hover:border-cyan-500/60 transition-all shadow-md group"
              >
                <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-1.5">
                  <span className="uppercase font-bold flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5" />
                    {mem.title}
                  </span>
                  <span className="text-slate-400">{mem.dateStr}</span>
                </div>

                <div className="text-xs text-slate-300 font-mono mb-2">
                  First found on <strong className="text-cyan-300">{mem.source}</strong>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 mb-3">
                  {mem.excerpt}
                </p>

                <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                  <div className="flex items-center gap-1 text-slate-400">
                    <span>Related:</span>
                    {mem.tags.map((t, i) => (
                      <span key={i} className="px-1.5 py-0.5 rounded bg-white/10 text-slate-300 text-[10px]">
                        {t}
                      </span>
                    ))}
                  </div>

                  <a
                    href={mem.url || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-bold font-mono transition-colors shadow-sm"
                  >
                    <span>Open source</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-slate-400 text-xs font-mono">
              No matching memories found for this search.
            </div>
          )}
        </div>

        {/* Footer command prompt hint */}
        <div className="p-3 bg-slate-950 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span>MemShift Instant Recall Modal</span>
          <div className="flex items-center gap-2">
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-slate-300">ESC</kbd> to close</span>
          </div>
        </div>

      </div>

    </div>
  );
};
