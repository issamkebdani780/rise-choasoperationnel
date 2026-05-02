import React, { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
// Import specific Lucide icons for serenity and control
import { 
  Sparkles, 
  Target, 
  Eye, 
  Zap, 
  Rocket, 
  ShieldCheck,
  LayoutDashboard
} from 'lucide-react';

const serenityItems = [
  { key: '1', icon: Sparkles, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-500/10' },
  { key: '2', icon: Target, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-500/10' },
  { key: '3', icon: Eye, color: 'text-cyan-600 dark:text-cyan-400', bg: 'bg-cyan-50 dark:bg-cyan-500/10' },
  { key: '4', icon: Zap, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-500/10' },
  { key: '5', icon: Rocket, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
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
    <section className="relative py-24 lg:py-40 bg-white dark:bg-slate-950 transition-colors duration-500 overflow-hidden" ref={ref}>
      
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container relative mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          
          {/* ── Left: Content ── */}
          <div className="w-full lg:w-1/2 space-y-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 rounded-full text-emerald-600 dark:text-emerald-400 font-bold text-[10px] uppercase tracking-widest mb-6">
                <ShieldCheck size={14} />
                {t('serenity_badge')}
              </div>
              <h2 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-tight tracking-tight">
                {t('serenity_title')}
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                {t('serenity_desc')}
              </p>
            </div>

            <div className="space-y-3">
              {serenityItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.key}
                    className={`flex items-center gap-5 p-4 bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm hover:border-blue-500/20 transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
                    style={{ transitionDelay: `${i * 100}ms` }}
                  >
                    <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center shrink-0`}>
                      <Icon className={item.color} size={22} strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <span className="text-sm font-black text-slate-800 dark:text-slate-200 uppercase tracking-tight">
                        {t(`serenity_${item.key}`)}
                      </span>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center border border-emerald-100 dark:border-emerald-500/20 shrink-0">
                      <svg className="w-3 h-3 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Right: Visual Dashboard ── */}
          <div className={`w-full lg:w-1/2 transition-all duration-1000 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{ transitionDelay: '0.4s' }}>
            <div className="relative group">
              {/* Card Decoration */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 blur-2xl rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-white/5 shadow-2xl p-8 lg:p-10 space-y-8">
                {/* Status header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-slate-100 dark:bg-white/5 rounded-xl">
                      <LayoutDashboard size={18} className="text-blue-600" />
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{t('serenity_live')}</div>
                      <div className="text-xl font-black text-slate-900 dark:text-white leading-none mt-1">{t('serenity_overview')}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-100 dark:border-emerald-500/20">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]" />
                    <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">{t('serenity_op')}</span>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: t('serenity_kpi_1'), val: '0', color: 'text-emerald-500', trend: '↓ 100%' },
                    { label: t('serenity_kpi_2'), val: '12', color: 'text-blue-600', trend: t('serenity_trend_1') },
                    { label: t('serenity_kpi_3'), val: '94%', color: 'text-purple-600', trend: t('serenity_trend_2') },
                    { label: t('serenity_kpi_4'), val: '+4.2h', color: 'text-amber-500', trend: t('serenity_trend_3') },
                  ].map((m, i) => (
                    <div key={i} className="bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/5 rounded-[24px] p-5 hover:bg-white dark:hover:bg-white/5 transition-colors group/metric">
                      <div className={`text-3xl font-black mb-1 tracking-tighter ${m.color}`}>{m.val}</div>
                      <div className="text-[10px] font-black text-slate-800 dark:text-slate-200 uppercase tracking-tight">{m.label}</div>
                      <div className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest group-hover/metric:text-blue-500 transition-colors">{m.trend}</div>
                    </div>
                  ))}
                </div>

                {/* Testimonial Snippet */}
                <div className="relative overflow-hidden bg-slate-900 rounded-[28px] p-6 border border-white/5">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Sparkles size={40} className="text-white" />
                  </div>
                  <p className="text-sm font-bold text-white italic leading-relaxed">
                    "{t('serenity_quote')}"
                  </p>
                  <div className="flex items-center gap-2 mt-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('serenity_quote_author')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Serenite;