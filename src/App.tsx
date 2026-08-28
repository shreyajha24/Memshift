import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProblemSection } from './components/ProblemSection';
import { MemoryFlow } from './components/MemoryFlow';
import { SarahStory } from './components/SarahStory';
import { HowItWorksSimple } from './components/HowItWorksSimple';
import { SearchDemo } from './components/SearchDemo';
import { Connections } from './components/Connections';
import { KnowledgeTimeline } from './components/KnowledgeTimeline';
import { OriginFinder } from './components/OriginFinder';
import { MemoryDecay } from './components/MemoryDecay';
import { PrivacySection } from './components/PrivacySection';
import { Comparison } from './components/Comparison';
import { FAQ } from './components/FAQ';
import { InstallBeta } from './components/InstallBeta';
import { Footer } from './components/Footer';
import { CommandPalette } from './components/CommandPalette';
import { PrivacyPolicy } from './components/PrivacyPolicy';

export function App() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const isPrivacyPage = window.location.pathname.replace(/\/+$/, '') === '/privacy';

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

  const scrollToExplore = () => {
    const el = document.getElementById('installation');
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
          {isPrivacyPage ? (
            <PrivacyPolicy />
          ) : <>
            {/* Section 1: Hero & Interactive 3D Memory World */}
            <Hero
              onExplore={scrollToExplore}
            />

          <InstallBeta />

          {/* Section 2: "You don't forget the idea. You forget where you found it." */}
          <ProblemSection />

          {/* Section 3: The 5-Step Story Journey (Encounter -> Move on -> Understand -> See related -> Connect) */}
          <MemoryFlow />

          {/* Section 4: Real-World Example — Sarah's Learning Story (Monday -> Wednesday -> Friday) */}
          <SarahStory />

          {/* Section 5: How It Works in 4 Simple Steps (01 Watch & Read -> 02 Remember -> 03 Connect -> 04 Find) */}
          <HowItWorksSimple />

          {/* Section 6: Interactive Recall Demo ("What do you remember?") */}
          <SearchDemo />

          {/* Section 7: Interactive Memory Map ("See how the things you learn connect") */}
          <Connections />

          {/* Section 8: Knowledge Timeline ("Your knowledge has a history") */}
          <KnowledgeTimeline />

          {/* Section 9: Origin & Provenance Finder ("Remember the idea. Find the source.") */}
          <OriginFinder />

          {/* Section 10: Memory Fade & Human Control ("Some things fade. You choose what stays.") */}
          <MemoryDecay />

          {/* Section 11: Privacy & Trust ("You decide what MemShift remembers.") */}
          <PrivacySection />

          {/* Section 12: Bookmarks vs MemShift Comparison */}
          <Comparison />

          {/* Section 13: FAQ Accordion */}
          <FAQ />

          </>}
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
