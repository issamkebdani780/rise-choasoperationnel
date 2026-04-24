import React, { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
// Import specific icons for a professional SaaS feel
import { 
  RefreshCcw, 
  MessageSquare, 
  UserCheck, 
  Clock, 
  ShoppingCart, 
  BarChart3 
} from 'lucide-react';

const autoItems = [
  { key: '1', icon: RefreshCcw, color: 'text-blue-500', border: 'border-blue-500', bg: 'bg-blue-500' },
  { key: '2', icon: MessageSquare, color: 'text-purple-500', border: 'border-purple-500', bg: 'bg-purple-500' },
  { key: '3', icon: UserCheck, color: 'text-cyan-500', border: 'border-cyan-500', bg: 'bg-cyan-500' },
  { key: '4', icon: Clock, color: 'text-amber-500', border: 'border-amber-500', bg: 'bg-amber-500' },
  { key: '5', icon: ShoppingCart, color: 'text-emerald-500', border: 'border-emerald-500', bg: 'bg-emerald-500' },
  { key: '6', icon: BarChart3, color: 'text-pink-500', border: 'border-pink-500', bg: 'bg-pink-500' },
];

const CYCLE_MS = 2600;

export default function Automatisation() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const ref = useRef(null);
  const startRef = useRef(null);
  const rafRef = useRef(null);
  const activeRef = useRef(0);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const tick = (now) => {
      if (!startRef.current) startRef.current = now;
      const elapsed = now - startRef.current;
      setProgress((elapsed % CYCLE_MS) / CYCLE_MS);
      const idx = Math.floor(elapsed / CYCLE_MS) % autoItems.length;
      if (idx !== activeRef.current) {
        activeRef.current = idx;
        setActiveIndex(idx);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [visible]);

  const resetTo = (i) => {
    setActiveIndex(i);
    activeRef.current = i;
    startRef.current = null;
    setProgress(0);
  };

  const active = autoItems[activeIndex];
  // Helper to render the active icon component
  const ActiveIcon = active.icon;

  return (
    <section
      ref={ref}
      className="relative py-24 lg:py-36 overflow-hidden transition-colors duration-500 bg-slate-50 dark:bg-slate-950"
    >
      {/* Ambient orbs */}
      <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-blue-500/5 dark:bg-blue-500/10 blur-[100px] pointer-events-none" />

      <div className="relative container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

          {/* ── Left: Bento grid ── */}
          <div className={`w-full lg:w-1/2 order-2 lg:order-1 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

            {/* Hero card */}
            <div 
              className={`p-8 mb-3 rounded-[28px] backdrop-blur-xl border transition-all duration-700 shadow-xl
                bg-white/80 dark:bg-white/5 
                ${active.border.replace('border-', 'border-')}/40`}
              style={{ boxShadow: `0 20px 50px -12px rgba(0,0,0,0.1)` }}
            >
              <div className="flex items-start justify-between mb-7">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
                  <span className="text-[11px] font-bold tracking-widest uppercase text-emerald-500">Live</span>
                </div>
                <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">
                  System Phase {String(activeIndex + 1).padStart(2, '0')}
                </span>
              </div>

              <div className={`mb-6 p-4 w-fit rounded-2xl bg-white dark:bg-white/5 shadow-sm ${active.color}`}>
                <ActiveIcon size={48} strokeWidth={1.5} />
              </div>

              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tight">
                {t(`auto_${active.key}`)}
              </h3>

              <div className="mt-6 h-[4px] bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-[80ms] linear ${active.bg}`}
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
            </div>

            {/* Mini cards grid */}
            <div className="grid grid-cols-3 gap-3">
              {autoItems.map((item, i) => {
                const ItemIcon = item.icon;
                return (
                  <button
                    key={item.key}
                    onClick={() => resetTo(i)}
                    className={`p-4 text-left rounded-[18px] transition-all duration-300 border flex flex-col gap-3
                      ${i === activeIndex 
                        ? `bg-white dark:bg-white/10 scale-[1.02] ${item.border}` 
                        : 'bg-white/40 dark:bg-white/[0.02] border-slate-200 dark:border-white/5 opacity-60 hover:opacity-100'
                      }`}
                  >
                    <div className={i === activeIndex ? item.color : 'text-slate-400'}>
                      <ItemIcon size={20} strokeWidth={2} />
                    </div>
                    <div className={`text-[10px] font-bold uppercase tracking-tight ${i === activeIndex ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
                      {t(`auto_${item.key}`)}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Right: Text ── */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <div className="inline-flex bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 mb-8">
              <span className="text-[11px] font-bold text-amber-600 dark:text-amber-500 uppercase tracking-widest">Automatisation</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 dark:text-white mb-6 leading-[1.05] tracking-tight">
              {t('auto_title')}
            </h2>

            <p className="text-lg text-slate-600 dark:text-slate-400 mb-12 max-w-lg">
              Transformez vos tâches répétitives en flux invisibles. Chaque heure gagnée est une opportunité de croissance.
            </p>

            <div className="flex gap-0 mb-12 border-t border-slate-200 dark:border-white/5 pt-8">
              {[
                { val: '6', label: 'Nodes', color: 'text-blue-500' },
                { val: '24/7', label: 'Uptime', color: 'text-purple-500' },
                { val: '+40%', label: 'Efficiency', color: 'text-emerald-500' },
              ].map((s, i) => (
                <div key={i} className={`flex-1 ${i < 2 ? 'border-r border-slate-200 dark:border-white/5' : ''} ${i > 0 ? 'pl-6' : 'pr-6'}`}>
                  <div className={`text-3xl font-black tracking-tighter ${s.color}`}>{s.val}</div>
                  <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:scale-105 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all">
                Démarrer
              </button>
              <button className="border border-slate-200 dark:border-white/10 hover:bg-white dark:hover:bg-white/5 px-8 py-4 rounded-2xl text-slate-900 dark:text-white font-black text-sm uppercase tracking-widest transition-all">
                Voir Démo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}