import React from 'react';
import { Eye, Brain, GitMerge, Search, Sparkles, ArrowRight } from 'lucide-react';

export const HowItWorksSimple: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'You watch & read',
      subtitle: 'You find something useful online.',
      description: 'Whether it is a YouTube video, a technical blog, or a research paper, you simply consume the content normally.',
      icon: <Eye className="w-5 h-5 text-cyan-400" />,
      color: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400'
    },
    {
      num: '02',
      title: 'MemShift remembers the key parts',
      subtitle: 'It figures out the ideas inside.',
      description: 'It notices the topics and takeaways—without asking you to create tags, save links into folders, or take manual notes.',
      icon: <Brain className="w-5 h-5 text-emerald-400" />,
      color: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
    },
    {
      num: '03',
      title: 'It connects the dots',
      subtitle: 'MemShift links related ideas.',
      description: 'When you see something related next week or next month, MemShift automatically notices the connection.',
      icon: <GitMerge className="w-5 h-5 text-indigo-400" />,
      color: 'border-indigo-500/30 bg-indigo-500/10 text-indigo-400'
    },
    {
      num: '04',
      title: 'You can find it again',
      subtitle: 'Even if you forget the title.',
      description: 'Ask by the concept you remember in plain words, and MemShift surfaces the exact source and timestamp instantly.',
      icon: <Search className="w-5 h-5 text-amber-400" />,
      color: 'border-amber-500/30 bg-amber-500/10 text-amber-400'
    }
  ];

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-mono uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>HOW IT WORKS // 4 SIMPLE STEPS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
            How MemShift works.
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            No jargon. No complex setup. Just a simple layer that makes your memory persistent.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#0c0e18] border border-slate-200 dark:border-white/10 shadow-lg dark:shadow-none hover:border-cyan-500/50 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-2xl border flex items-center justify-center ${s.color}`}>
                    {s.icon}
                  </div>
                  <span className="text-sm font-mono font-bold text-slate-400 dark:text-slate-500">
                    {s.num}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-cyan-500 dark:group-hover:text-cyan-300 transition-colors">
                  {s.title}
                </h3>

                <p className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 font-mono mb-2">
                  {s.subtitle}
                </p>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {s.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Step {s.num}</span>
                <ArrowRight className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
