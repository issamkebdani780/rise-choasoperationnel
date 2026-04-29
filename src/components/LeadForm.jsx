import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LeadForm = () => {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    nom: '', tel: '', pays: '', employes: '', commandes: '', probleme: '',
  });

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const problems = [
    { val: 'organisation', label: t('form_prob_org') },
    { val: 'stock', label: t('form_prob_stock') },
    { val: 'equipe', label: t('form_prob_equipe') },
    { val: 'erreurs', label: t('form_prob_erreurs') },
    { val: 'retard', label: t('form_prob_retard') },
  ];

  return (
    <section id="lead-form" className="py-24 lg:py-32 bg-white dark:bg-slate-950 transition-colors duration-300 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/5 dark:bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-400/5 dark:bg-blue-400/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-full text-primary font-medium text-sm mb-6">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse-slow" />
              Démarrez maintenant
            </div>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-heading dark:text-white mb-4">
              {t('form_title')}
            </h2>
            <p className="text-body dark:text-slate-400">
              {t('form_sub')}
            </p>
          </div>

          {/* Hooks */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            {[
              'Tu n\'as pas besoin de plus de ventes. Tu as besoin d\'ordre.',
              'Le chaos interne ruine plus d\'entreprises que la concurrence.',
              'Si tout passe par toi, ce n\'est pas une entreprise.',
            ].map((hook, i) => (
              <div key={i} className="bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-4 text-center">
                <p className="text-xs font-bold text-primary leading-relaxed italic">"{hook}"</p>
              </div>
            ))}
          </div>

          {/* Form */}
          {submitted ? (
            <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 rounded-[28px] p-12 text-center animate-scale-in">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-2xl font-black text-heading dark:text-white mb-2">Demande reçue !</h3>
              <p className="text-body dark:text-slate-400">Notre équipe vous contacte dans les 24h. Préparez-vous à mettre de l'ordre dans votre business.</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white dark:bg-slate-900 rounded-[28px] border border-slate-100 dark:border-slate-800 shadow-xl p-8 space-y-5"
            >
              {/* Row 1: Nom + Tel */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    {t('form_lbl_nom')} *
                  </label>
                  <input
                    type="text"
                    name="nom"
                    required
                    value={form.nom}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-heading dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    placeholder="Ahmed Benali"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    {t('form_lbl_tel')} *
                  </label>
                  <input
                    type="tel"
                    name="tel"
                    required
                    value={form.tel}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-heading dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    placeholder="+213 6XX XXX XXX"
                  />
                </div>
              </div>

              {/* Row 2: Pays */}
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                  {t('form_lbl_pays')} *
                </label>
                <select
                  name="pays"
                  required
                  value={form.pays}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-heading dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all appearance-none"
                >
                  <option value="">{t('form_opt_sel')}</option>
                  {['Algérie', 'Maroc', 'Tunisie', 'Libye', 'Mauritanie', 'France', 'Sénégal', 'Côte d\'Ivoire', 'Autre'].map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              {/* Row 3: Employes + Commandes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    {t('form_lbl_employes')}
                  </label>
                  <select
                    name="employes"
                    value={form.employes}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-heading dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all appearance-none"
                  >
                    <option value="">{t('form_opt_sel')}</option>
                    {['1', '2–5', '6–10', '11–20', '20+'].map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    {t('form_lbl_commandes')}
                  </label>
                  <select
                    name="commandes"
                    value={form.commandes}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-heading dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all appearance-none"
                  >
                    <option value="">{t('form_opt_sel')}</option>
                    {['< 100', '100–500', '500–2000', '2000–5000', '5000+'].map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
              </div>

              {/* Problem chips */}
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                  {t('form_lbl_prob')} *
                </label>
                <div className="flex flex-wrap gap-2">
                  {problems.map(prob => (
                    <button
                      key={prob.val}
                      type="button"
                      onClick={() => setForm(f => ({ ...f, probleme: prob.val }))}
                      className={`px-4 py-2.5 rounded-xl text-sm font-bold border transition-all ${form.probleme === prob.val ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-primary hover:text-primary dark:hover:text-primary'}`}
                    >
                      {prob.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full p-5 bg-primary hover:bg-primary-hover text-white rounded-2xl font-extrabold text-base shadow-xl shadow-primary/25 transition-all hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-3"
              >
                {t('form_btn')}
                <svg className="w-5 h-5 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>

              <p className="text-center text-xs text-slate-400 pt-1">
                Vos données sont confidentielles. Aucun spam.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default LeadForm;
