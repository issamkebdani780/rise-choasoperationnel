import React, { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Temoignages = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const testimonials = [
    { quote: t('testi_1_quote'), name: t('testi_1_name'), role: t('testi_1_role'), avatar: '👨‍💼', stars: 5, highlight: 'Excel' },
    { quote: t('testi_2_quote'), name: t('testi_2_name'), role: t('testi_2_role'), avatar: '👩‍💼', stars: 5, highlight: 'erreurs' },
    { quote: t('testi_3_quote'), name: t('testi_3_name'), role: t('testi_3_role'), avatar: '👨‍💻', stars: 5, highlight: 'mieux' },
  ];

  return (
    <section className="py-24 lg:py-32 bg-slate-50 dark:bg-slate-900/50 transition-colors duration-300" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 rounded-full text-amber-600 dark:text-amber-400 font-medium text-sm mb-6">
            <span>⭐</span> Témoignages
          </div>
          <h2 className="text-3xl lg:text-5xl font-extrabold text-heading dark:text-white mb-4">
            {t('testi_title')}
          </h2>
          <div className="flex items-center justify-center gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-sm font-bold text-slate-500 dark:text-slate-400 ml-2">4.9/5 — +200 équipes</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {testimonials.map((testi, i) => (
            <div
              key={i}
              className={`bg-white dark:bg-slate-900 rounded-[24px] border border-slate-100 dark:border-slate-800 p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-700 relative ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              {/* Quote mark */}
              <div className="text-5xl text-primary/20 dark:text-primary/10 font-serif leading-none mb-4">"</div>

              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testi.stars)].map((_, j) => (
                  <svg key={j} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-xl font-bold text-heading dark:text-white leading-snug mb-6">
                "{testi.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5 border-t border-slate-100 dark:border-slate-800">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center text-xl shrink-0">
                  {testi.avatar}
                </div>
                <div>
                  <div className="text-sm font-bold text-heading dark:text-white">{testi.name}</div>
                  <div className="text-xs text-slate-400">{testi.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social proof bar */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { val: '+200', label: 'Équipes actives', icon: '👥' },
            { val: '98%', label: 'Satisfaction client', icon: '⭐' },
            { val: '-78%', label: 'Erreurs commandes', icon: '📉' },
            { val: '+3h', label: 'Libérées par jour', icon: '⏰' },
          ].map((stat, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 text-center shadow-sm">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-black text-heading dark:text-white">{stat.val}</div>
              <div className="text-xs text-slate-400 font-medium mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Temoignages;
