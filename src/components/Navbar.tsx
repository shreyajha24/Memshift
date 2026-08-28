import React, { useState, useEffect } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { Menu, X, Sparkles, Command, Download } from 'lucide-react';
import { trackBetaDownload } from '../lib/analytics';

interface NavbarProps {
  onOpenSearch?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-memshift-bg-dark/85 dark:bg-memshift-bg-dark/85 bg-white/90 backdrop-blur-md border-b border-slate-200 dark:border-white/10 shadow-sm py-2.5'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg p-1"
            aria-label="MemShift Home"
          >
            <div className="relative w-8 h-8 rounded-lg bg-cyan-500/10 dark:bg-cyan-400/10 border border-cyan-500/30 flex items-center justify-center transition-all duration-300 group-hover:border-cyan-400 group-hover:bg-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-pulse" />
              <div className="absolute inset-0 rounded-lg border border-cyan-400/20 scale-110 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-widest text-slate-900 dark:text-white group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors uppercase font-mono">
                MEMSHIFT
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 tracking-wider -mt-1 font-mono">
                MEMORY LAYER
              </span>
            </div>
          </a>

        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 dark:bg-white/[0.04] p-1.5 rounded-full border border-slate-200/80 dark:border-white/10 backdrop-blur-md">
          <button
            onClick={() => scrollToSection('product')}
            className="px-4 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-full hover:bg-white dark:hover:bg-white/10 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            Product
          </button>
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="px-4 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-full hover:bg-white dark:hover:bg-white/10 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            How it works
          </button>
          <button
            onClick={() => scrollToSection('connections')}
            className="px-4 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-full hover:bg-white dark:hover:bg-white/10 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            Connections
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="px-4 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-full hover:bg-white dark:hover:bg-white/10 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            FAQ
          </button>
        </nav>

        {/* Right CTA / Actions */}
        <div className="hidden md:flex items-center gap-3">
          {onOpenSearch && (
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 rounded-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              title="Search Mock Memories (⌘K)"
            >
              <span className="text-slate-400 dark:text-slate-500 flex items-center gap-1 font-mono text-[11px]">
                <Command className="w-3 h-3" />K
              </span>
              <span>Search recall</span>
            </button>
          )}

          <ThemeToggle />

          <a
            href="/downloads/MemShift-Beta-v1.0.0.zip"
            download
            onClick={() => trackBetaDownload('navbar')}
            className="relative group overflow-hidden rounded-lg px-4 py-2 text-xs font-semibold text-slate-900 dark:text-black bg-cyan-400 hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5 text-slate-900" />
              Try MemShift
            </span>
          </a>
        </div>

        {/* Mobile menu toggle button */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="p-2 rounded-lg border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-3 pb-6 bg-white/95 dark:bg-memshift-bg-dark/95 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 animate-in slide-in-from-top-2 duration-200 shadow-xl">
          <div className="flex flex-col space-y-2 pt-2">
            <button
              onClick={() => scrollToSection('product')}
              className="text-left px-4 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
            >
              Product
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-left px-4 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
            >
              How it works
            </button>
            <button
              onClick={() => scrollToSection('connections')}
              className="text-left px-4 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
            >
              Connections
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-left px-4 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
            >
              FAQ
            </button>
            {onOpenSearch && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSearch();
                }}
                className="text-left px-4 py-2.5 rounded-lg text-sm font-medium text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-between"
              >
                <span>Interactive Memory Search</span>
                <Command className="w-4 h-4" />
              </button>
            )}
            <div className="pt-2">
              <a
                href="/downloads/MemShift-Beta-v1.0.0.zip"
                download
                onClick={() => {
                  setMobileMenuOpen(false);
                  trackBetaDownload('mobile_navbar');
                }}
                className="w-full text-center py-3 rounded-lg text-sm font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-md"
              >
                Try MemShift Beta
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
