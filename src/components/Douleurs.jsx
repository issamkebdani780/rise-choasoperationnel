import React, { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

/* ── SVG Icons ──────────────────────────────────────────── */
const IconBox = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0v10l-8 4m0-14l-8 4m8 10V11m0 0L4 7" />
  </svg>
);
const IconUsers = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-5.916-3.516M9 20H4v-2a4 4 0 015.916-3.516M15 7a4 4 0 11-8 0 4 4 0 018 0zm6 4a3 3 0 11-6 0 3 3 0 016 0zM3 11a3 3 0 116 0 3 3 0 01-6 0z" />
  </svg>
);
const IconMap = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
  </svg>
);
const IconTrendDown = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
  </svg>
);
const IconShuffle = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
  </svg>
);
const IconBurn = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
  </svg>
);
const IconAlert = () => (
  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
  </svg>
);

const painItems = [
  { key: '1', Icon: IconBox },
  { key: '2', Icon: IconUsers },
  { key: '3', Icon: IconMap },
  { key: '4', Icon: IconTrendDown },
  { key: '5', Icon: IconShuffle },
  { key: '6', Icon: IconBurn },
];

const Douleurs = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="douleurs" className="py-24 lg:py-32 bg-slate-50 dark:bg-slate-900/50 transition-colors duration-300" ref={ref}>
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-full text-red-600 dark:text-red-400 font-medium text-sm mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            {t('pain_badge')}
          </div>
          <h2 className="text-3xl lg:text-5xl font-extrabold text-heading dark:text-white mb-4">
            {t('pain_title')}
          </h2>
          <p className="text-lg text-body dark:text-slate-400 max-w-2xl mx-auto">
            {t('pain_subtitle')}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {painItems.map(({ key, Icon }, i) => (
            <div
              key={key}
              className={`relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 lg:p-7 transition-all duration-700 hover:-translate-y-1 hover:shadow-md hover:border-red-100 dark:hover:border-red-900/50 group ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              {/* Icon */}
              <div className="w-11 h-11 bg-red-50 dark:bg-red-900/20 rounded-xl flex items-center justify-center mb-5 text-red-500 dark:text-red-400 group-hover:scale-110 transition-transform">
                <Icon />
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-slate-800 dark:text-white mb-2">
                {t(`pain_${key}_title`)}
              </h3>

              {/* Description */}
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {t(`pain_${key}_desc`)}
              </p>

              {/* Corner badge */}
              <div className="absolute top-5 right-5 rtl:right-auto rtl:left-5 w-6 h-6 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-400 dark:text-red-500 opacity-60">
                <IconAlert />
              </div>
            </div>
          ))}
        </div>

        {/* Hook quote */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl px-8 py-5 shadow-sm">
            <p className="text-lg font-bold text-heading dark:text-white italic">
              "{t('pain_hook')}"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Douleurs;
