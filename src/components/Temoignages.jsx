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
    { quote: t('testi_1_quote'), name: t('testi_1_name'), role: t('testi_1_role'), color: 'from-blue-500 to-indigo-500' },
    { quote: t('testi_2_quote'), name: t('testi_2_name'), role: t('testi_2_role'), color: 'from-emerald-500 to-teal-500' },
    { quote: t('testi_3_quote'), name: t('testi_3_name'), role: t('testi_3_role'), color: 'from-purple-500 to-pink-500' },
  ];

  return (
    <section className="relative py-24 lg:py-40 bg-white dark:bg-slate-950 overflow-hidden transition-colors duration-500" ref={ref}>
      
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-[-5%] left-[15%] w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-600/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[5%] right-[15%] w-[400px] h-[400px] bg-indigo-500/10 dark:bg-indigo-600/5 blur-[100px] rounded-full" />
      </div>

      <div className="container relative mx-auto px-6">
        
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full text-slate-600 dark:text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-6">
            <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
            Témoignages
          </div>
          <h2 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-tight tracking-tight">
            {t('testi_title')}
          </h2>
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tighter">
             Performance prouvée par +200 entreprises
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-20">
          {testimonials.map((testi, i) => (
            <div
              key={i}
              className={`
                relative transition-all duration-1000 
                ${i === 0 ? 'md:col-span-7' : i === 1 ? 'md:col-span-5' : 'md:col-span-12'}
                ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
              `}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="h-full p-8 lg:p-10 bg-white dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-white/5 rounded-[32px] shadow-xl shadow-slate-200/50 dark:shadow-none hover:border-blue-500/30 transition-all group">
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <div className="flex gap-0.5 mb-6 text-amber-400">
                      {[...Array(5)].map((_, j) => (
                        <svg key={j} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      ))}
                    </div>
                    <p className="text-xl lg:text-2xl font-bold text-slate-800 dark:text-slate-100 leading-relaxed mb-10">
                      "{testi.quote}"
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testi.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">{testi.name}</h4>
                      <p className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">{testi.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-12 border-t border-slate-200 dark:border-white/5">
          {[
            { val: '+200', label: 'Partenaires', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
            { val: '98%', label: 'Rétention', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
            { val: '-78%', label: 'Erreurs Flux', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
            { val: '+3h', label: 'Productivité', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col lg:flex-row items-center lg:items-start gap-4">
              <div className="p-3 bg-slate-100 dark:bg-white/5 rounded-2xl">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                </svg>
              </div>
              <div>
                <div className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">
                  {stat.val}
                </div>
                <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Temoignages;