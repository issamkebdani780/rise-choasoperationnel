import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/* ─── SVG Icon Library ─────────────────────────────────── */
const IconChat = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
  </svg>
);
const IconTable = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 6h18M3 14h18M3 18h18" />
  </svg>
);
const IconBox = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0v10l-8 4m0-14l-8 4m8 10V11m0 0L4 7" />
  </svg>
);
const IconPhone = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);
const IconClipboard = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
  </svg>
);
const IconCheck = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);
const IconBell = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);
const IconTrend = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);
const IconAlert = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

/* ─── Mini Sparkline ───────────────────────────────────── */
const Sparkline = ({ data, color }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 80, h = 28;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(' ');
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

/* ─── Mini Bar Chart ───────────────────────────────────── */
const BarChart = ({ data, color }) => {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-0.5 h-8">
      {data.map((v, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm opacity-80"
          style={{ height: `${(v / max) * 100}%`, background: color }}
        />
      ))}
    </div>
  );
};

/* ─── Component ────────────────────────────────────────── */
const Hero = () => {
  const { t } = useTranslation();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState('before');

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePos({
      x: (clientX / innerWidth - 0.5) * 20,
      y: (clientY / innerHeight - 0.5) * 20,
    });
  };

  const beforeItems = [
    { Icon: IconChat,  text: 'hero_b1', color: 'bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-800 text-red-600 dark:text-red-400', dot: 'bg-red-500' },
    { Icon: IconTable, text: 'hero_b2', color: 'bg-orange-50 dark:bg-orange-900/20 border-orange-100 dark:border-orange-800 text-orange-600 dark:text-orange-400', dot: 'bg-orange-500' },
    { Icon: IconBox,   text: 'hero_b3', color: 'bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-800 text-red-600 dark:text-red-400', dot: 'bg-red-500' },
    { Icon: IconPhone, text: 'hero_b4', color: 'bg-orange-50 dark:bg-orange-900/20 border-orange-100 dark:border-orange-800 text-orange-600 dark:text-orange-400', dot: 'bg-orange-500' },
  ];

  const afterItems = [
    { Icon: IconClipboard, text: 'hero_a1', color: 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-400', dot: 'bg-blue-500' },
    { Icon: IconCheck,     text: 'hero_a2', color: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400', dot: 'bg-emerald-500' },
    { Icon: IconBell,      text: 'hero_a3', color: 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-400', dot: 'bg-blue-500' },
    { Icon: IconTrend,     text: 'hero_a4', color: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400', dot: 'bg-emerald-500' },
  ];

  return (
    <section
      className="relative pt-32 pb-20 lg:pt-36 lg:pb-40 overflow-x-clip dark:bg-slate-950 transition-colors duration-500"
      onMouseMove={handleMouseMove}
    >
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-400/10 dark:bg-blue-400/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-primary/10 dark:bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 translate-y-1/2 w-[500px] h-[500px] bg-blue-400/10 dark:bg-blue-400/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

          {/* ── Left Content ── */}
          <div className="w-full lg:w-1/2 space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-full text-primary font-medium text-sm animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse-slow" />
              {t('hero_badge')}
            </div>

            {/* H1 */}
            <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight lg:leading-[1.1] text-heading dark:text-white">
                {t('hero_h1_1')} <br />
                <span className="text-primary">{t('hero_h1_2')}</span>
              </h1>
              <p className="text-lg lg:text-xl text-body dark:text-slate-400 max-w-xl leading-relaxed">
                {t('hero_sub')}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <a href="#lead-form" className="px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-2xl font-semibold shadow-lg shadow-primary/20 transition-all hover:-translate-y-1 active:scale-95">
                {t('hero_cta1')}
              </a>
              <a href="#dashboard" className="px-8 py-4 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-primary border border-slate-100 dark:border-slate-800 rounded-2xl font-semibold transition-all hover:-translate-y-1 flex items-center gap-2">
                {t('hero_cta2')} <span className="rtl:rotate-180 inline-block">→</span>
              </a>
            </div>

            {/* Trust */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              {['hero_trust_1', 'hero_trust_2', 'hero_trust_3'].map((key, i) => (
                <div key={i} className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                  <div className="w-5 h-5 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center border border-blue-100 dark:border-blue-800">
                    <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  {t(key)}
                </div>
              ))}
            </div>
          </div>

          {/* ── Right Visual — Dashboard ── */}
          <div
            className="w-full lg:w-1/2 relative"
            style={{ transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)` }}
          >
            {/* Toggle Tabs */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-2xl p-1 mb-4 w-fit mx-auto">
              <button
                onClick={() => setActiveTab('before')}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'before' ? 'bg-white dark:bg-slate-900 text-red-500 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
              >
                {t('hero_before')}
              </button>
              <button
                onClick={() => setActiveTab('after')}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'after' ? 'bg-white dark:bg-slate-900 text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
              >
                {t('hero_after')}
              </button>
            </div>

            {/* Dashboard Card */}
            <div className="relative bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 rounded-[28px] border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden animate-float mx-auto max-w-md">

              {/* ── Top Bar ── */}
              <div className={`px-5 py-3 flex items-center justify-between border-b ${activeTab === 'after' ? 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900' : 'border-red-100 dark:border-red-900/30 bg-red-50/60 dark:bg-red-900/10'}`}>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${activeTab === 'after' ? 'bg-emerald-500' : 'bg-red-500'} animate-pulse-slow`} />
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                    {activeTab === 'after' ? t('hero_risemanager') : t('hero_status_label')}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-200 dark:bg-slate-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-200 dark:bg-slate-700" />
                  <div className={`w-2.5 h-2.5 rounded-full ${activeTab === 'after' ? 'bg-emerald-400' : 'bg-red-400'}`} />
                </div>
              </div>

              <div className="p-5 space-y-4">

                {/* ── AFTER: Stats Row ── */}
                {activeTab === 'after' && (
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: t('hero_col_orders'), val: '1,247', delta: '+12%', color: 'text-primary', bg: 'bg-blue-50 dark:bg-blue-900/20', spark: [40,55,45,70,60,80,75], sparkColor: '#3b82f6' },
                      { label: t('hero_col_stock'),  val: '98%',   delta: '+2%',  color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20', spark: [60,65,70,68,75,80,78], sparkColor: '#10b981' },
                      { label: t('hero_col_agents'),    val: '12',    delta: t('hero_col_online'), color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20', spark: [4,6,5,8,7,10,12], sparkColor: '#a855f7' },
                    ].map((m, i) => (
                      <div key={i} className={`${m.bg} rounded-2xl p-3`}>
                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">{m.label}</div>
                        <div className={`text-lg font-black ${m.color}`}>{m.val}</div>
                        <div className="mt-1">
                          <Sparkline data={m.spark} color={m.sparkColor} />
                        </div>
                        <div className={`text-[9px] font-semibold mt-1 ${m.color}`}>{m.delta}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* ── BEFORE: Warning Banner ── */}
                {activeTab === 'before' && (
                  <div className="flex items-center gap-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-2xl p-3">
                    <div className="w-8 h-8 rounded-xl bg-red-100 dark:bg-red-900/40 flex items-center justify-center text-red-500 shrink-0">
                      <IconAlert />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-red-600 dark:text-red-400">{t('hero_mental_overload')}</div>
                      <div className="text-[10px] text-red-400 dark:text-red-500">{t('hero_no_visibility')}</div>
                    </div>
                    <div className="ml-auto text-[10px] font-bold text-red-300 dark:text-red-600 bg-red-100 dark:bg-red-900/40 px-2 py-0.5 rounded-full">{t('hero_critical')}</div>
                  </div>
                )}

                {/* ── Feature Grid ── */}
                <div className="grid grid-cols-2 gap-2.5">
                  {(activeTab === 'before' ? beforeItems : afterItems).map(({ Icon, text, color, dot }, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-3 p-3 rounded-xl border text-sm font-medium transition-all duration-300 ${color}`}
                    >
                      <div className="w-7 h-7 rounded-lg bg-current/10 flex items-center justify-center shrink-0 opacity-80">
                        <Icon />
                      </div>
                      <span className="leading-snug text-xs">{t(text)}</span>
                      <div className={`ml-auto w-1.5 h-1.5 rounded-full ${dot} shrink-0`} />
                    </div>
                  ))}
                </div>

                {/* ── AFTER: Activity Bar ── */}
                {activeTab === 'after' && (
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{t('hero_activity_label')}</span>
                      <span className="text-[9px] text-emerald-500 font-semibold">{t('hero_activity_stat')}</span>
                    </div>
                    <BarChart data={[42, 58, 51, 73, 65, 89, 94]} color="#3b82f6" />
                    <div className="flex justify-between mt-1">
                      {[t('hero_day_mon'), t('hero_day_tue'), t('hero_day_wed'), t('hero_day_thu'), t('hero_day_fri'), t('hero_day_sat'), t('hero_day_sun')].map((d, i) => (
                        <span key={i} className="flex-1 text-center text-[8px] text-slate-400">{d}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── BEFORE: Chaos Footer ── */}
                {activeTab === 'before' && (
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 dark:text-slate-600 border-t border-slate-100 dark:border-slate-800 pt-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                    {t('hero_chaos_footer')}
                  </div>
                )}
              </div>
            </div>

            {/* ── Floating Badge: Orders ── */}
            <div
              className="absolute -top-6 -left-4 lg:-left-10 rtl:left-auto rtl:-right-4 rtl:lg:-right-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-3 lg:p-4 rounded-2xl shadow-premium border border-white/50 dark:border-slate-800 animate-float-delayed flex items-center gap-3 z-20"
              style={{ transform: `translate(${mousePos.x * -0.8}px, ${mousePos.y * -0.8}px)` }}
            >
              <div className="w-9 h-9 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">{t('hero_orders')}</div>
                <div className="text-sm font-black text-heading dark:text-white">{t('hero_orders_confirmed')}</div>
              </div>
            </div>

            {/* ── Floating Badge: Productivity ── */}
            <div
              className="absolute -bottom-4 right-0 lg:-right-8 rtl:right-auto rtl:left-0 rtl:lg:-left-8 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-3 lg:p-4 rounded-2xl shadow-premium border border-white/50 dark:border-slate-800 animate-float flex items-center gap-3 z-20"
              style={{ transform: `translate(${mousePos.x * -1.2}px, ${mousePos.y * -1.2}px)` }}
            >
              <div className="w-9 h-9 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">{t('hero_productivity')}</div>
                <div className="text-sm font-black text-emerald-500">{t('hero_productivity_stat')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
