import React from 'react';
import { useTranslation } from 'react-i18next';

const integrations = [
  { name: 'WhatsApp', icon: '💬', color: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800', text: 'text-emerald-600 dark:text-emerald-400', desc: 'Messages & confirmations' },
  { name: 'Google Sheets', icon: '📊', color: 'bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800', text: 'text-green-600 dark:text-green-400', desc: 'Export & import données' },
  { name: 'RiseConfirm', icon: '✅', color: 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800', text: 'text-primary', desc: 'Confirmation commandes' },
  { name: 'RiseCart', icon: '🛒', color: 'bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-800', text: 'text-purple-600 dark:text-purple-400', desc: 'Gestion panier' },
  { name: 'API Transporteurs', icon: '🚚', color: 'bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-800', text: 'text-amber-600 dark:text-amber-400', desc: 'Suivi livraisons' },
  { name: 'Facturation', icon: '🧾', color: 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700', text: 'text-slate-600 dark:text-slate-400', desc: 'Factures internes' },
];

const Integrations = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 lg:py-32 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-full text-primary font-medium text-sm mb-6">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
            Connecté
          </div>
          <h2 className="text-3xl lg:text-5xl font-extrabold text-heading dark:text-white mb-4">
            {t('integrations_title')}
          </h2>
          <p className="text-lg text-body dark:text-slate-400 max-w-xl mx-auto">
            {t('integrations_sub')}
          </p>
        </div>

        {/* Integration grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {integrations.map((integ, i) => (
            <div
              key={i}
              className={`flex flex-col items-center text-center gap-3 p-5 rounded-[20px] border ${integ.color} transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer group`}
            >
              <div className={`w-12 h-12 rounded-2xl ${integ.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                {integ.icon}
              </div>
              <div>
                <div className={`text-sm font-extrabold ${integ.text}`}>{integ.name}</div>
                <div className="text-xs text-slate-400 mt-0.5">{integ.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Center connector visual */}
        <div className="mt-12 flex justify-center">
          <div className="relative bg-gradient-to-r from-primary/5 to-blue-50 dark:from-primary/10 dark:to-blue-900/10 rounded-[24px] border border-blue-100 dark:border-blue-800/30 px-8 py-6 flex items-center gap-4 max-w-md">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30 shrink-0">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" /></svg>
            </div>
            <div>
              <div className="text-base font-black text-heading dark:text-white">RiseManager</div>
              <div className="text-sm text-body dark:text-slate-400">Hub central de votre écosystème</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Integrations;
