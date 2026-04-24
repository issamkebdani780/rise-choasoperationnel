import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import Hero from './components/Hero';
import Douleurs from './components/Douleurs';
import Promesse from './components/Promesse';
import Dashboard from './components/Dashboard';
import Automatisation from './components/Automatisation';
import Serenite from './components/Serenite';
import Integrations from './components/Integrations';
import Temoignages from './components/Temoignages';
import Tarifs from './components/Tarifs';
import FAQ from './components/FAQ';
import LeadForm from './components/LeadForm';
import Footer from './components/Footer';

const App = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = i18n.language?.startsWith('ar') ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language || 'fr';
  }, [i18n.language]);

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300">
      <Header />
      <main>
        <Hero />
        <Douleurs />
        <Promesse />
        <Dashboard />
        <Automatisation />
        <Serenite />
        <Integrations />
        <Temoignages />
        <Tarifs />
        <FAQ />
        <LeadForm />
      </main>
      <Footer />
    </div>
  );
};

export default App;
