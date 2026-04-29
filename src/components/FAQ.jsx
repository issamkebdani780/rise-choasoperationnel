import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const faqData = [
  { qKey: 'faq_1_q', aKey: 'faq_1_a' },
  { qKey: 'faq_2_q', aKey: 'faq_2_a' },
  { qKey: 'faq_3_q', aKey: 'faq_3_a' },
  { qKey: 'faq_4_q', aKey: 'faq_4_a' },
  { qKey: 'faq_5_q', aKey: 'faq_5_a' },
  { qKey: 'faq_6_q', aKey: 'faq_6_a' },
];

const FAQ = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" className="py-24 lg:py-32 bg-slate-50 dark:bg-slate-900/50 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-full text-primary font-medium text-sm mb-6">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            FAQ
          </div>
          <h2 className="text-3xl lg:text-5xl font-extrabold text-heading dark:text-white">
            {t('faq_title')}
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqData.map((item, i) => (
            <div
              key={i}
              className={`bg-white dark:bg-slate-900 rounded-2xl border transition-all duration-300 overflow-hidden ${open === i ? 'border-primary/30 dark:border-primary/30 shadow-md' : 'border-slate-100 dark:border-slate-800 shadow-sm'}`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-6 text-left rtl:text-right"
              >
                <span className={`text-base font-bold transition-colors ${open === i ? 'text-primary' : 'text-heading dark:text-white'}`}>
                  {t(item.qKey)}
                </span>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all ${open === i ? 'bg-primary text-white rotate-45' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              </button>
              {open === i && (
                <div className="px-6 pb-6">
                  <div className="h-px bg-slate-100 dark:bg-slate-800 mb-4" />
                  <p className="text-body dark:text-slate-400 leading-relaxed text-sm">
                    {t(item.aKey)}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
