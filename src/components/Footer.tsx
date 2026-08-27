import React from 'react';
import { Sparkles, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-slate-950 dark:bg-[#06070a] border-t border-slate-200/20 dark:border-white/10 py-14 overflow-hidden text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-white/10">
          
          {/* Brand & Tagline */}
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-md bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-cyan-400" />
              </div>
              <span className="font-bold text-sm tracking-widest text-white uppercase font-mono">
                MEMSHIFT
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm">
              Your internet memory. Save less. Remember more.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-xs font-mono">
            <button
              onClick={() => scrollToSection('product')}
              className="hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              Product
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              How it works
            </button>
            <button
              onClick={() => scrollToSection('connections')}
              className="hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              Connections
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              FAQ
            </button>
            <button
              onClick={() => scrollToSection('waitlist')}
              className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              Waitlist
            </button>
            <a
              href="/privacy"
              className="hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              Privacy Policy
            </a>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 shrink-0"
            aria-label="Scroll to top of page"
          >
            <ArrowUp className="w-4 h-4" />
          </button>

        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>MemShift Network 0.1 • All Systems Operational</span>
          </div>

          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} MemShift Labs. All rights reserved.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
