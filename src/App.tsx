import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProblemSection } from './components/ProblemSection';
import { MemoryFlow } from './components/MemoryFlow';
import { SearchDemo } from './components/SearchDemo';
import { Connections } from './components/Connections';
import { Comparison } from './components/Comparison';
import { FAQ } from './components/FAQ';
import { Waitlist } from './components/Waitlist';
import { Footer } from './components/Footer';
import { CommandPalette } from './components/CommandPalette';

export function App() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Global key listener for ⌘K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scrollToWaitlist = () => {
    const el = document.getElementById('waitlist');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToExplore = () => {
    const el = document.getElementById('product');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-memshift-bg-light dark:bg-memshift-bg-dark text-slate-900 dark:text-slate-100 transition-colors duration-300 relative selection:bg-cyan-500/20 selection:text-cyan-600 dark:selection:text-cyan-300">
        
        {/* Sticky Minimal Navbar */}
        <Navbar onOpenSearch={() => setCommandPaletteOpen(true)} />

        <main>
          {/* Section 1: Hero & Interactive Memory Visualizer */}
          <Hero
            onJoinWaitlist={scrollToWaitlist}
            onExplore={scrollToExplore}
          />

          {/* Section 2: "The Internet Has a Memory Problem" */}
          <ProblemSection />

          {/* Section 3: The Core Experience User Journey (Discover -> Save -> MemShift -> Connect -> Remember) */}
          <MemoryFlow />

          {/* Section 4: Mock Interactive Search / Recall Interface */}
          <SearchDemo />

          {/* Section 5: Interactive Connections Network Graph */}
          <Connections />

          {/* Section 6: Why MemShift Comparison */}
          <Comparison />

          {/* Section 7: FAQ Accordion */}
          <FAQ />

          {/* Section 8: Waitlist CTA */}
          <Waitlist />
        </main>

        {/* Minimal Footer */}
        <Footer />

        {/* ⌘K Command Search Modal */}
        <CommandPalette
          isOpen={commandPaletteOpen}
          onClose={() => setCommandPaletteOpen(false)}
        />

      </div>
    </ThemeProvider>
  );
}

export default App;
