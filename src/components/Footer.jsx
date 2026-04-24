import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-8">
      <div className="container mx-auto px-6">
        {/* Top row */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 mb-12 pb-12 border-b border-slate-800">
          {/* Brand */}
          <div className="space-y-4 max-w-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30 shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                </svg>
              </div>
              <span className="text-xl font-black text-white">RiseManager</span>
            </div>
            <p className="text-sm leading-relaxed">{t('footer_tagline')}</p>
            {/* Lang switcher in footer */}
            <div className="flex items-center gap-2">
              {[['fr', 'FR'], ['en', 'EN'], ['ar', 'ع']].map(([code, label]) => (
                <button
                  key={code}
                  onClick={() => i18n.changeLanguage(code)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black transition-colors ${i18n.language?.startsWith(code) ? 'bg-primary text-white' : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10">
            <div>
              <div className="text-xs font-extrabold text-white uppercase tracking-widest mb-4">Produit</div>
              <ul className="space-y-3 text-sm">
                {[
                  ['Organisation', '#douleurs'],
                  ['Fonctionnalités', '#promesse'],
                  ['Dashboard', '#dashboard'],
                  ['Automatisations', '#'],
                ].map(([label, href]) => (
                  <li key={label}>
                    <a href={href} className="hover:text-primary transition-colors">{label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-xs font-extrabold text-white uppercase tracking-widest mb-4">Tarifs</div>
              <ul className="space-y-3 text-sm">
                {[
                  [`${t('plan1_name')} — ${t('plan1_price')} DZD`, '#tarifs'],
                  [`${t('plan2_name')} — ${t('plan2_price')} DZD`, '#tarifs'],
                  [`${t('plan3_name')} — ${t('plan3_price')} DZD`, '#tarifs'],
                  [t('nav_cta'), '#lead-form'],
                ].map(([label, href]) => (
                  <li key={label}>
                    <a href={href} className="hover:text-primary transition-colors">{label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-xs font-extrabold text-white uppercase tracking-widest mb-4">Support</div>
              <ul className="space-y-3 text-sm">
                {[
                  [t('nav_faq'), '#faq'],
                  ['Intégrations', '#'],
                  ['Contact', '#lead-form'],
                  ['Témoignages', '#'],
                ].map(([label, href]) => (
                  <li key={label}>
                    <a href={href} className="hover:text-primary transition-colors">{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* CTA banner */}
        <div className="bg-gradient-to-r from-primary/10 to-blue-900/20 rounded-[24px] border border-primary/20 p-8 flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">
          <div>
            <div className="text-lg font-extrabold text-white mb-1">Prêt à mettre de l'ordre ?</div>
            <div className="text-sm text-slate-400">Rejoignez +200 équipes qui ont choisi RiseManager.</div>
          </div>
          <a href="#lead-form" className="shrink-0 px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-2xl font-extrabold text-sm shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 active:scale-95">
            {t('nav_cta')}
          </a>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <div>© {year} RiseManager. {t('footer_rights')}</div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-400 transition-colors">Confidentialité</a>
            <a href="#" className="hover:text-slate-400 transition-colors">CGV</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Mentions légales</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
