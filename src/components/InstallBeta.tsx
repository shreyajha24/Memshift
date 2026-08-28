import React from 'react';
import { Globe2, Download, FolderOpen, Settings2, Upload, Sparkles, Mail } from 'lucide-react';
import { trackBetaDownload } from '../lib/analytics';

const steps = [
  { number: '01', title: 'Download', description: 'Download the MemShift private beta ZIP.', icon: <Download className="w-5 h-5" /> },
  { number: '02', title: 'Unzip', description: 'Extract the downloaded ZIP to a folder on your computer.', icon: <FolderOpen className="w-5 h-5" /> },
  { number: '03', title: 'Open Chrome Extensions', description: 'Open chrome://extensions in a new Chrome tab.', icon: <Globe2 className="w-5 h-5" /> },
  { number: '04', title: 'Enable Developer Mode', description: 'Turn on Developer mode in the top-right corner.', icon: <Settings2 className="w-5 h-5" /> },
  { number: '05', title: 'Load MemShift', description: 'Click Load unpacked and select the extracted folder containing manifest.json.', icon: <Upload className="w-5 h-5" /> },
  { number: '06', title: 'Start remembering', description: 'Open MemShift and start collecting the useful things you find online.', icon: <Sparkles className="w-5 h-5" /> },
];

const downloadUrl = '/downloads/MemShift-Beta-v1.0.0.zip';

export const InstallBeta: React.FC = () => (
  <section id="install" className="relative py-24 sm:py-32 bg-slate-50/70 dark:bg-[#07080d]/70 border-y border-slate-200/80 dark:border-white/5 overflow-hidden">
    <div className="absolute inset-0 bg-neural-grid pointer-events-none opacity-20" />
    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-mono uppercase tracking-widest mb-4">
          <Globe2 className="w-3.5 h-3.5" /> PRIVATE BETA // INSTALL GUIDE
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">Start using MemShift in minutes.</h2>
        <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400">MemShift is currently available as a Chrome beta. Chrome Web Store listing coming soon.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-5xl mx-auto">
        {steps.map((step) => (
          <div key={step.number} className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0c0e18] border border-slate-200 dark:border-white/10 shadow-lg dark:shadow-none">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 flex items-center justify-center">{step.icon}</div>
              <span className="text-sm font-mono font-bold text-slate-400 dark:text-slate-500">{step.number}</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">{step.title}</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href={downloadUrl} download onClick={() => trackBetaDownload('install_section')} className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-900 bg-cyan-400 hover:bg-cyan-300 transition-all shadow-[0_0_25px_rgba(6,182,212,0.3)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400">
          <Download className="w-4 h-4" /> Try MemShift Beta
        </a>
        <a href="mailto:feedback@memshift.app?subject=MemShift%20beta%20feedback" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg px-3 py-2">
          <Mail className="w-4 h-4" /> Found a bug or have feedback?
        </a>
      </div>
    </div>
  </section>
);
