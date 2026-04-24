import React, { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const serenityItems = [
  { key: '1', icon: '🧘', color: 'text-primary', bg: 'bg-blue-50 dark:bg-blue-900/20' },
  { key: '2', icon: '🎯', color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
  { key: '3', icon: '👁️', color: 'text-teal-500', bg: 'bg-teal-50 dark:bg-teal-900/20' },
  { key: '4', icon: '⚡', color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20' },
  { key: '5', icon: '🚀', color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
];

const Serenite = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900/50 dark:to-slate-950 transition-colors duration-300" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Content */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 rounded-full text-emerald-600 dark:text-emerald-400 font-medium text-sm mb-6">
                <span>🌿</span> Sérénité dirigeant
              </div>
              <h2 className="text-3xl lg:text-5xl font-extrabold text-heading dark:text-white mb-4">
                {t('serenity_title')}
              </h2>
              <p className="text-lg text-body dark:text-slate-400">
                Un dirigeant reposé prend de meilleures décisions. RiseManager vous rend cette tranquillité.
              </p>
            </div>

            <div className="space-y-4">
              {serenityItems.map((item, i) => (
                <div
                  key={item.key}
                  className={`flex items-center gap-5 p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  <div className={`w-12 h-12 ${item.bg} rounded-2xl flex items-center justify-center text-2xl shrink-0`}>
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <span className={`text-base font-bold ${item.color}`}>{t(`serenity_${item.key}`)}</span>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center border border-blue-100 dark:border-blue-800 shrink-0">
                    <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className={`w-full lg:w-1/2 transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`} style={{ transitionDelay: '0.3s' }}>
            <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-xl p-8 space-y-6">
              {/* Status header */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tableau de bord</div>
                  <div className="text-lg font-black text-heading dark:text-white mt-0.5">Vue d'ensemble</div>
                </div>
                <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1.5 rounded-full border border-emerald-100 dark:border-emerald-800">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Tout est sous contrôle</span>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Urgences aujourd\'hui', val: '0', color: 'text-emerald-500', sub: 'vs 12 avant' },
                  { label: 'Décisions prises', val: '8', color: 'text-primary', sub: 'ce matin' },
                  { label: 'Équipe autonome', val: '92%', color: 'text-purple-500', sub: 'des tâches' },
                  { label: 'Temps libéré', val: '+3h', color: 'text-amber-500', sub: 'par jour' },
                ].map((m, i) => (
                  <div key={i} className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4">
                    <div className={`text-2xl font-black mb-1 ${m.color}`}>{m.val}</div>
                    <div className="text-xs font-bold text-heading dark:text-white">{m.label}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{m.sub}</div>
                  </div>
                ))}
              </div>

              {/* Quote */}
              <div className="bg-gradient-to-r from-blue-50 to-primary/5 dark:from-blue-900/10 dark:to-primary/10 rounded-2xl p-5 border border-blue-100 dark:border-blue-800/30">
                <p className="text-sm font-bold text-heading dark:text-white italic">
                  "Je dors mieux, tout simplement."
                </p>
                <p className="text-xs text-slate-400 mt-2">— Youssef T., CEO</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Serenite;
