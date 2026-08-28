import React from 'react';

const sections = [
  {
    title: 'Information MemShift may collect',
    paragraphs: [
      'MemShift may collect information you choose to provide, such as feedback. We may also receive basic technical information needed to operate and protect the website, such as browser, device, and request information.',
      'If you use a future MemShift account or product, we may handle account details and the content or sources you choose to connect. We will explain the relevant controls before those features are introduced.',
    ],
  },
  {
    title: 'How we use information',
    paragraphs: [
      'Feedback is used to understand requests and improve the product. We do not sell personal information.',
    ],
  },
  {
    title: 'Accounts and product information',
    paragraphs: [
      'When account or product features become available, information associated with those features may be used to authenticate you, provide the requested experience, keep the service secure, and respond to support requests. MemShift is being designed around clear choices about what it can access and remember.',
    ],
  },
  {
    title: 'Cookies and analytics',
    paragraphs: [
      'The website may use essential browser storage, including a preference used to remember your light or dark theme. MemShift also uses Google Analytics 4 to understand general website usage, such as visits and interactions. Google Analytics may use cookies or similar technologies. You can control cookies through your browser settings and use available privacy or tracking controls in your browser.',
    ],
  },
  {
    title: 'Third-party services',
    paragraphs: [
      'The website uses third-party services to support its operation, including Google Analytics for website analytics, Google Tag infrastructure to deliver the analytics tag, and Google Fonts for typography. These services process information according to their own terms and privacy policies.',
    ],
  },
  {
    title: 'Data retention',
    paragraphs: [
      'We retain information only for as long as it is reasonably needed for the purpose it was collected, such as providing the service, resolving disputes, or meeting legal and security needs. Retention periods may vary by type of information and feature.',
    ],
  },
  {
    title: 'Data security',
    paragraphs: [
      'MemShift uses reasonable technical and organizational measures to protect information against unauthorized access, loss, misuse, or alteration. No internet service can guarantee absolute security, so please avoid sending sensitive information through forms that do not request it.',
    ],
  },
  {
    title: 'Your rights and choices',
    paragraphs: [
      'Depending on where you live, you may have rights to request access to, correction of, deletion of, or information about the personal data we hold about you. You may also be able to object to or limit certain processing. You can manage cookies in your browser and choose not to provide optional information, although some features may then be unavailable.',
    ],
  },
  {
    title: "Children's privacy",
    paragraphs: [
      'MemShift is not directed to children under 13, and we do not knowingly collect personal information from children under 13. If you believe a child has provided information to us, please contact the MemShift team so it can be reviewed and removed where appropriate.',
    ],
  },
  {
    title: 'Changes to this policy',
    paragraphs: [
      'We may update this Privacy Policy as MemShift and its features evolve. When we make changes, we will update this page and its effective date. Your continued use of the website after an update means the revised policy applies to your use of the website.',
    ],
  },
];

export const PrivacyPolicy: React.FC = () => {
  return (
    <article className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 bg-neural-grid pointer-events-none opacity-20" />
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[620px] h-[360px] glow-radial-cyan pointer-events-none blur-3xl opacity-30" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-500 dark:text-cyan-400 text-xs font-mono uppercase tracking-widest mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            PRIVACY & TRUST
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
            Privacy Policy
          </h1>
          <p className="mt-5 max-w-2xl text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            MemShift is being built to help you remember what matters while keeping you in control of your information.
          </p>
          <p className="mt-4 text-xs font-mono text-slate-500 dark:text-slate-400">Effective date: August 28, 2026</p>
        </header>

        <div className="space-y-8">
          {sections.map((section) => (
            <section key={section.title} className="p-6 sm:p-8 rounded-2xl bg-white/70 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 backdrop-blur-md">
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white">{section.title}</h2>
              <div className="mt-4 space-y-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </section>
          ))}

          <section className="p-6 sm:p-8 rounded-2xl bg-cyan-950/10 dark:bg-cyan-950/30 border border-cyan-500/25">
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white">Privacy questions</h2>
            <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              If you have a privacy question or want to ask about information associated with your MemShift use, please contact the MemShift team through the contact channel associated with this website or product. No separate privacy email address is currently listed here.
            </p>
          </section>
        </div>
      </div>
    </article>
  );
};
