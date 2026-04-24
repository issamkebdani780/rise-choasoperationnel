import React, { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const autoItems = [
  { key: '1', icon: '🔄', delay: 0 },
  { key: '2', icon: '💬', delay: 0.1 },
  { key: '3', icon: '👤', delay: 0.2 },
  { key: '4', icon: '⏰', delay: 0.3 },
  { key: '5', icon: '🛒', delay: 0.4 },
  { key: '6', icon: '📊', delay: 0.5 },
];

const Automatisation = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => setActiveIndex(i => (i + 1) % autoItems.length), 2000);
    return () => clearInterval(interval);
  }, [visible]);

  return (
    <section className="py-24 lg:py-32 bg-white dark:bg-slate-950 transition-colors duration-300" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left visual */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 rounded-[32px] p-8 relative overflow-hidden border border-slate-700/50">
              {/* Animated background grid */}
              <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(#00a2ff 1px, transparent 1px), linear-gradient(90deg, #00a2ff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

              <div className="relative z-10">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-6">Automatisations actives</div>
                <div className="space-y-3">
                  {autoItems.map((item, i) => (
                    <div
                      key={item.key}
                      className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-500 ${activeIndex === i ? 'bg-primary/10 border-primary/30 shadow-lg shadow-primary/10' : 'bg-slate-800/50 dark:bg-slate-900/50 border-slate-700/30'}`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 transition-all ${activeIndex === i ? 'bg-primary/20 scale-110' : 'bg-slate-700/50'}`}>
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-white">{t(`auto_${item.key}`)}</div>
                        {activeIndex === i && (
                          <div className="flex items-center gap-1 mt-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-xs text-emerald-400">En cours...</span>
                          </div>
                        )}
                      </div>
                      <div className={`w-2 h-2 rounded-full shrink-0 ${activeIndex === i ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right content */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 rounded-full text-amber-600 dark:text-amber-400 font-medium text-sm mb-6">
                <span>⚡</span> Automatisation
              </div>
              <h2 className="text-3xl lg:text-5xl font-extrabold text-heading dark:text-white mb-4">
                {t('auto_title')}
              </h2>
              <p className="text-lg text-body dark:text-slate-400">
                Chaque heure gagnée grâce à l'automatisation est une heure investie dans la croissance.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {autoItems.map((item, i) => (
                <div
                  key={item.key}
                  className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-700 cursor-pointer ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'} ${activeIndex === i ? 'bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/30' : 'hover:bg-slate-50 dark:hover:bg-slate-800/30'}`}
                  style={{ transitionDelay: `${item.delay}s` }}
                  onClick={() => setActiveIndex(i)}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 transition-all ${activeIndex === i ? 'bg-primary/10 scale-110' : 'bg-slate-100 dark:bg-slate-800'}`}>
                    {item.icon}
                  </div>
                  <span className={`text-sm font-bold ${activeIndex === i ? 'text-primary' : 'text-heading dark:text-slate-300'}`}>
                    {t(`auto_${item.key}`)}
                  </span>
                  {activeIndex === i && (
                    <svg className="w-4 h-4 text-primary ml-auto shrink-0 rtl:ml-0 rtl:mr-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Automatisation;
