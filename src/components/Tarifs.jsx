import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const plans = [
  { nameKey: 'plan1_name', descKey: 'plan1_desc', priceKey: 'plan1_price', features: ['plan1_f1', 'plan1_f2', 'plan1_f3', 'plan1_f4'], ctaKey: 'plan1_cta', popular: false, gradient: 'from-slate-50 to-white dark:from-slate-900 dark:to-slate-900', border: 'border-slate-100 dark:border-slate-800' },
  { nameKey: 'plan2_name', descKey: 'plan2_desc', priceKey: 'plan2_price', features: ['plan2_f1', 'plan2_f2', 'plan2_f3', 'plan2_f4', 'plan2_f5'], ctaKey: 'plan2_cta', popular: true, gradient: 'from-primary/5 to-blue-50 dark:from-primary/10 dark:to-blue-900/10', border: 'border-primary/20 dark:border-primary/30' },
  { nameKey: 'plan3_name', descKey: 'plan3_desc', priceKey: 'plan3_price', features: ['plan3_f1', 'plan3_f2', 'plan3_f3', 'plan3_f4', 'plan3_f5'], ctaKey: 'plan3_cta', popular: false, gradient: 'from-slate-50 to-white dark:from-slate-900 dark:to-slate-900', border: 'border-slate-100 dark:border-slate-800' },
];

const Tarifs = () => {
  const { t } = useTranslation();
  const [hovered, setHovered] = useState(null);

  return (
    <section id="tarifs" className="py-24 lg:py-32 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-full text-primary font-medium text-sm mb-6">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {t('pricing_badge')}
          </div>
          <h2 className="text-3xl lg:text-5xl font-extrabold text-heading dark:text-white mb-4">
            {t('pricing_title')}
          </h2>
          <p className="text-lg text-body dark:text-slate-400 max-w-xl mx-auto">
            {t('pricing_sub')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative bg-gradient-to-br ${plan.gradient} rounded-[28px] border ${plan.border} p-8 transition-all duration-300 ${hovered === i ? '-translate-y-2 shadow-2xl' : 'shadow-sm'} cursor-pointer`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-primary text-white text-xs font-extrabold px-5 py-2 rounded-full shadow-lg shadow-primary/30">
                    ✦ {t('pricing_popular')}
                  </div>
                </div>
              )}

              {/* Plan header */}
              <div className="mb-8">
                <div className={`text-lg font-extrabold mb-1 ${plan.dark ? 'text-white' : 'text-heading dark:text-white'}`}>
                  {t(plan.nameKey)}
                </div>
                <div className={`text-sm ${plan.dark ? 'text-slate-400' : 'text-body dark:text-slate-400'}`}>
                  {t(plan.descKey)}
                </div>
              </div>

              {/* Price */}
              <div className="mb-8">
                <div className="flex items-end gap-2">
                  <span className={`text-5xl font-black ${plan.popular ? 'text-primary' : plan.dark ? 'text-white' : 'text-heading dark:text-white'}`}>
                    {t(plan.priceKey)}
                  </span>
                  <span className={`text-sm font-bold mb-2 ${plan.dark ? 'text-slate-400' : 'text-slate-400'}`}>
                    {t('currency')} {t('per_month')}
                  </span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-8">
                {plan.features.map((feat, j) => (
                  <div key={j} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${plan.popular ? 'bg-primary/10 border border-primary/20' : plan.dark ? 'bg-slate-700 border border-slate-600' : 'bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800'}`}>
                      <svg className={`w-3 h-3 ${plan.popular ? 'text-primary' : plan.dark ? 'text-slate-400' : 'text-primary'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className={`text-sm font-medium ${plan.dark ? 'text-slate-300' : 'text-body dark:text-slate-300'}`}>
                      {t(feat)}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <a
                href="#lead-form"
                className={`block w-full py-4 rounded-2xl text-sm font-extrabold text-center transition-all active:scale-95 ${plan.popular ? 'bg-primary hover:bg-primary-hover text-white shadow-lg shadow-primary/20' : plan.dark ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20' : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-heading dark:text-white'}`}
              >
                {t(plan.ctaKey)}
              </a>
            </div>
          ))}
        </div>

        {/* Guarantee */}
        <div className="mt-10 flex items-center justify-center gap-3 text-sm text-slate-400">
          <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
          {t('pricing_guarantee')}
        </div>
      </div>
    </section>
  );
};

export default Tarifs;
