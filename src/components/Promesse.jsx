import React, { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
// Import professional icons from lucide-react
import { 
  ClipboardCheck, 
  Zap, 
  Package, 
  Users2, 
  Layers, 
  PieChart 
} from 'lucide-react';

const promiseItems = [
  { key: '1', icon: ClipboardCheck, bg: 'bg-blue-50 dark:bg-blue-500/10', iconColor: 'text-blue-600 dark:text-blue-400', border: 'border-blue-100 dark:border-blue-500/20' },
  { key: '2', icon: Zap, bg: 'bg-amber-50 dark:bg-amber-500/10', iconColor: 'text-amber-600 dark:text-amber-400', border: 'border-amber-100 dark:border-amber-500/20' },
  { key: '3', icon: Package, bg: 'bg-emerald-50 dark:bg-emerald-500/10', iconColor: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-100 dark:border-emerald-500/20' },
  { key: '4', icon: Users2, bg: 'bg-purple-50 dark:bg-purple-500/10', iconColor: 'text-purple-600 dark:text-purple-400', border: 'border-purple-100 dark:border-purple-500/20' },
  { key: '5', icon: Layers, bg: 'bg-cyan-50 dark:bg-cyan-500/10', iconColor: 'text-cyan-600 dark:text-cyan-400', border: 'border-cyan-100 dark:border-cyan-500/20' },
  { key: '6', icon: PieChart, bg: 'bg-rose-50 dark:bg-rose-500/10', iconColor: 'text-rose-600 dark:text-rose-400', border: 'border-rose-100 dark:border-rose-500/20' },
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
    <section id="promesse" className="relative py-24 lg:py-36 bg-white dark:bg-slate-950 transition-colors duration-500" ref={ref}>
      <div className="container relative mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 rounded-full text-blue-600 dark:text-blue-400 font-bold text-[10px] uppercase tracking-widest mb-6">
            <Zap size={12} className="fill-current" />
            La Solution
          </div>
          <h2 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
            {t('promise_title')}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
            Si tout passe par toi, ce n'est pas une entreprise. C'est un emploi auto-géré.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {promiseItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.key}
                className={`group relative bg-white dark:bg-slate-900/40 rounded-[32px] border border-slate-100 dark:border-white/5 p-8 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Icon Container */}
                <div className={`w-14 h-14 ${item.bg} border ${item.border} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                  <Icon className={`${item.iconColor}`} size={28} strokeWidth={1.5} />
                </div>

                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3 uppercase tracking-tight">
                  {t(`promise_${item.key}_title`)}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8">
                  {t(`promise_${item.key}_desc`)}
                </p>

                {/* Status Indicator */}
                <div className="pt-6 border-t border-slate-50 dark:border-white/5 flex items-center gap-3">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Standard Pack</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modernized CTA banner */}
        <div className="mt-20 relative overflow-hidden dark:bg-slate-900 bg-white border-2 rounded-[40px] p-10 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Subtle background pattern for CTA */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
             <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px]" />
          </div>
          
          <div className="relative z-10 text-center lg:text-left">
            <h3 className="text-3xl lg:text-4xl font-black dark:text-white text-slate-900 mb-2 tracking-tighter">
              Tu n'as pas besoin de plus de ventes.
            </h3>
            <p className="dark:text-slate-400 text-slate-500 font-bold text-lg uppercase tracking-widest">
              Tu as besoin d'ordre.
            </p>
          </div>

          <a href="#lead-form" className="relative z-10 shrink-0 px-10 py-5 bg-blue-600 hover:bg-blue-500 dark:bg-blue-600 dark:hover:bg-blue-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-blue-500/20 transition-all hover:scale-105 active:scale-95">
            {t('nav_cta')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Promesse;