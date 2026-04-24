import React, { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const promiseItems = [
  { key: '1', icon: '📋', bg: 'bg-blue-50 dark:bg-blue-900/20', iconColor: 'text-primary', border: 'border-blue-100 dark:border-blue-800/30' },
  { key: '2', icon: '⚡', bg: 'bg-amber-50 dark:bg-amber-900/20', iconColor: 'text-amber-500', border: 'border-amber-100 dark:border-amber-800/30' },
  { key: '3', icon: '📦', bg: 'bg-emerald-50 dark:bg-emerald-900/20', iconColor: 'text-emerald-500', border: 'border-emerald-100 dark:border-emerald-800/30' },
  { key: '4', icon: '👥', bg: 'bg-purple-50 dark:bg-purple-900/20', iconColor: 'text-purple-500', border: 'border-purple-100 dark:border-purple-800/30' },
  { key: '5', icon: '🗂️', bg: 'bg-blue-50 dark:bg-blue-900/20', iconColor: 'text-primary', border: 'border-blue-100 dark:border-blue-800/30' },
  { key: '6', icon: '📊', bg: 'bg-teal-50 dark:bg-teal-900/20', iconColor: 'text-teal-500', border: 'border-teal-100 dark:border-teal-800/30' },
];

const Promesse = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="promesse" className="py-24 lg:py-32 bg-white dark:bg-slate-950 transition-colors duration-300" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-full text-primary font-medium text-sm mb-6">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            La solution
          </div>
          <h2 className="text-3xl lg:text-5xl font-extrabold text-heading dark:text-white mb-4">
            {t('promise_title')}
          </h2>
          <p className="text-lg text-body dark:text-slate-400 max-w-2xl mx-auto">
            Si tout passe par toi, ce n'est pas une entreprise. C'est un emploi auto-géré.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {promiseItems.map((item, i) => (
            <div
              key={item.key}
              className={`bg-white dark:bg-slate-900 rounded-[24px] border border-slate-100 dark:border-slate-800 p-6 lg:p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-700 group ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className={`w-12 h-12 ${item.bg} border ${item.border} rounded-2xl flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <h3 className="text-lg font-extrabold text-heading dark:text-white mb-2">
                {t(`promise_${item.key}_title`)}
              </h3>
              <p className="text-sm text-body dark:text-slate-400 leading-relaxed">
                {t(`promise_${item.key}_desc`)}
              </p>
              {/* Check indicator */}
              <div className="mt-5 flex items-center gap-2">
                <div className="w-5 h-5 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center border border-blue-100 dark:border-blue-800">
                  <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-xs font-bold text-slate-400">Inclus dans tous les plans</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-16 bg-gradient-to-r from-primary/5 via-blue-50 to-primary/5 dark:from-primary/10 dark:via-blue-900/10 dark:to-primary/10 rounded-[24px] border border-blue-100 dark:border-blue-800/30 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-extrabold text-heading dark:text-white mb-1">Tu n'as pas besoin de plus de ventes.</h3>
            <p className="text-body dark:text-slate-400">Tu as besoin d'ordre.</p>
          </div>
          <a href="#lead-form" className="shrink-0 px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-2xl font-bold shadow-lg shadow-primary/20 transition-all hover:-translate-y-1 active:scale-95">
            {t('nav_cta')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Promesse;
