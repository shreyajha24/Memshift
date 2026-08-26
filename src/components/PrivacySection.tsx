import React from 'react';
import { Shield, Lock, EyeOff, Sliders, CheckCircle2, Sparkles, HeartHandshake } from 'lucide-react';

export const PrivacySection: React.FC = () => {
  const pillars = [
    {
      icon: <EyeOff className="w-5 h-5 text-cyan-400" />,
      title: 'Nothing hidden',
      description: 'MemShift is being designed to make it clear what it can see and when it is working.',
      badge: 'Clear by design'
    },
    {
      icon: <Lock className="w-5 h-5 text-emerald-400" />,
      title: 'You control access',
      description: 'You will decide which sources to connect and what you want MemShift to remember.',
      badge: 'Your choice'
    },
    {
      icon: <Shield className="w-5 h-5 text-indigo-400" />,
      title: 'Your memories are yours',
      description: 'You will be able to review what MemShift has remembered and remove what you no longer want to keep.',
      badge: 'In your hands'
    },
    {
      icon: <Sliders className="w-5 h-5 text-amber-400" />,
      title: 'You choose what\'s important',
      description: 'Tell MemShift which topics matter most to you, so it can bring those ideas forward.',
      badge: 'Your priorities'
    }
  ];

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-mono uppercase tracking-widest mb-4">
            <Shield className="w-3.5 h-3.5" />
            <span>PRIVACY & HUMAN TRUST</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
            You decide what MemShift remembers.
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            What you read and learn is personal. MemShift is being designed around clear choices and respectful access.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
          {pillars.map((p, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white dark:bg-[#0c0e18] border border-slate-200 dark:border-white/10 shadow-lg dark:shadow-none hover:border-cyan-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center mb-4">
                  {p.icon}
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {p.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {p.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/5">
                <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 font-semibold uppercase">
                  {p.badge}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Honest product direction */}
        <div className="max-w-3xl mx-auto p-6 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-center font-mono text-xs text-slate-600 dark:text-slate-400">
          🔒 <strong className="text-slate-800 dark:text-slate-200">Our direction:</strong> MemShift is being designed with a local-first approach. Before launch, we’ll clearly explain what is stored, where it lives, and the controls available to you.
        </div>

      </div>
    </section>
  );
};
