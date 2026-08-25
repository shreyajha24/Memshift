import React, { useState, useEffect } from 'react';
import { Search, Sparkles, X, Clock, Link2, ArrowRight } from 'lucide-react';
import { mockMemories, mockSearchPresets } from '../data/mockData';
import { MemoryItem } from '../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMemory?: (mem: MemoryItem) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onSelectMemory }) => {
  const [searchTerm, setSearchTerm] = useState('');

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

  if (!isOpen) return null;

  const filteredMemories = mockMemories.filter((mem) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      mem.title.toLowerCase().includes(term) ||
      mem.excerpt.toLowerCase().includes(term) ||
      mem.tags.some((t) => t.toLowerCase().includes(term))
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      
      {/* Backdrop blur overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl rounded-2xl bg-slate-950 dark:bg-[#0c0e18] border border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.25)] overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        
        {/* Search header bar */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Type a thought, concept, or memory query..."
            className="w-full bg-transparent text-white text-sm sm:text-base placeholder:text-slate-500 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            aria-label="Close command palette"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick query chips */}
        <div className="p-3 bg-white/5 border-b border-white/5 flex flex-wrap gap-2 text-xs font-mono">
          <span className="text-slate-400 py-1">Try:</span>
          {mockSearchPresets.slice(0, 3).map((p) => (
            <button
              key={p.id}
              onClick={() => setSearchTerm(p.label)}
              className="px-2.5 py-1 rounded bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-white/10 transition-colors"
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Search Results list */}
        <div className="p-3 max-h-[360px] overflow-y-auto space-y-2">
          {filteredMemories.length > 0 ? (
            filteredMemories.map((mem) => (
              <div
                key={mem.id}
                onClick={() => {
                  if (onSelectMemory) onSelectMemory(mem);
                  onClose();
                }}
                className="p-3.5 rounded-xl bg-slate-900/80 hover:bg-cyan-950/30 border border-white/5 hover:border-cyan-500/40 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                  <span className="text-cyan-400 uppercase">{mem.sourceType}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {mem.savedAgo}
                  </span>
                </div>

                <h4 className="text-xs sm:text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors mb-1">
                  {mem.title}
                </h4>

                <p className="text-xs text-slate-400 line-clamp-1">
                  {mem.excerpt}
                </p>

                <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span className="flex items-center gap-1">
                    <Link2 className="w-3 h-3" />
                    {mem.source}
                  </span>
                  <span className="text-cyan-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Recall <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-slate-400 text-xs font-mono">
              No matching memories found in active session index.
            </div>
          )}
        </div>

        {/* Footer command prompt hint */}
        <div className="p-3 bg-slate-950 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span>MemShift Ambient Memory Index</span>
          <div className="flex items-center gap-2">
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-slate-300">ESC</kbd> to close</span>
          </div>
        </div>

      </div>

    </div>
  );
};
