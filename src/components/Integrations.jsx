import React, { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  MessageCircle,
  FileSpreadsheet,
  Truck,
  FileText,
  Zap,
  ArrowRight,
  Link2,
} from "lucide-react";

/* ─── Integration Data ──────────────────────────────────── */
const integrations = [
  {
    name: "WhatsApp",
    desc: "Messages & notifications automatiques",
    icon: MessageCircle,
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    border: "border-emerald-100 dark:border-emerald-500/20",
    glow: "group-hover:shadow-emerald-200/40 dark:group-hover:shadow-emerald-500/10",
    tag: "Messagerie",
  },
  {
    name: "Google Sheets",
    desc: "Sync bidirectionnelle en temps réel",
    icon: FileSpreadsheet,
    color: "text-green-500",
    bg: "bg-green-50 dark:bg-green-500/10",
    border: "border-green-100 dark:border-green-500/20",
    glow: "group-hover:shadow-green-200/40 dark:group-hover:shadow-green-500/10",
    tag: "Data",
  },
  {
    name: "RiseConfirm",
    desc: "Confirmation de commandes vocale IA",
    img: "/ecosystem/RiseConfirm.jpg",
    bg: "bg-blue-50 dark:bg-blue-500/10",
    border: "border-blue-100 dark:border-blue-500/20",
    glow: "group-hover:shadow-blue-200/40 dark:group-hover:shadow-blue-500/10",
    tag: "Rise Ecosystem",
  },
  {
    name: "RiseCart",
    desc: "Boutique e-commerce intégrée",
    img: "/ecosystem/risecart.jpg",
    bg: "bg-indigo-50 dark:bg-indigo-500/10",
    border: "border-indigo-100 dark:border-indigo-500/20",
    glow: "group-hover:shadow-indigo-200/40 dark:group-hover:shadow-indigo-500/10",
    tag: "Rise Ecosystem",
  },
  {
    name: "Logistics",
    desc: "Yalidine, ZR Express, Maystro",
    icon: Truck,
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-500/10",
    border: "border-amber-100 dark:border-amber-500/20",
    glow: "group-hover:shadow-amber-200/40 dark:group-hover:shadow-amber-500/10",
    tag: "Livraison",
  },
  {
    name: "Factures",
    desc: "Génération & export automatique",
    icon: FileText,
    color: "text-slate-500",
    bg: "bg-slate-100 dark:bg-slate-500/10",
    border: "border-slate-200 dark:border-slate-500/20",
    glow: "group-hover:shadow-slate-200/40 dark:group-hover:shadow-slate-500/10",
    tag: "Finance",
  },
];

const Integrations = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      className="relative py-24 lg:py-36 bg-white dark:bg-slate-950 overflow-hidden transition-colors duration-500"
      ref={ref}
      id="integrations"
    >
      {/* Background Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[10%] w-[500px] h-[500px] bg-primary/5 dark:bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[10%] w-[400px] h-[400px] bg-emerald-500/5 dark:bg-emerald-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6">

        {/* ── Header ── */}
        <div className="max-w-3xl mx-auto text-center mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 rounded-full border border-slate-100 dark:border-slate-800 shadow-sm transition-colors">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-slow" />
            <span className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-none">
              Ecosystem
            </span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-extrabold text-heading dark:text-white leading-tight animate-slide-up">
            {t("integrations_title")}
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto font-medium animate-slide-up" style={{ animationDelay: "0.1s" }}>
            {t("integrations_sub")}
          </p>
        </div>

        {/* ── Hub + Connections (Desktop) ── */}
        <div className="hidden lg:flex items-center justify-center mb-20">
          <div className="relative w-full max-w-5xl">

            {/* Central Hub */}
            <div className="flex justify-center mb-0">
              <div className="relative z-10 animate-slide-up" style={{ animationDelay: "0.15s" }}>
                {/* Pulse rings */}
                <div className="absolute inset-0 -m-4 rounded-[36px] border border-primary/20 animate-pulse-slow" />
                <div className="absolute inset-0 -m-8 rounded-[44px] border border-primary/10 animate-pulse-slow" style={{ animationDelay: "0.5s" }} />

                <div className="w-28 h-28 rounded-[32px] flex items-center justify-center">
                  <img
                    src="/ecosystem/risemanager.png"
                    alt="RiseManager"
                    className=" object-contain"
                  />
                </div>
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-center">
                  <div className="text-sm font-black text-heading dark:text-white tracking-tight">RiseManager</div>
                  <div className="flex items-center gap-1.5 justify-center mt-0.5">
                    <span className="w-1 h-1 rounded-full bg-primary" />
                    <span className="text-[9px] font-bold text-primary uppercase tracking-[0.15em]">Hub Central</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Connection Lines — SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ top: "56px" }}>
              {/* Radial lines from center to each card */}
              <line x1="50%" y1="0" x2="8%" y2="100%" className="stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" strokeDasharray="6 4" />
              <line x1="50%" y1="0" x2="33%" y2="100%" className="stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" strokeDasharray="6 4" />
              <line x1="50%" y1="0" x2="58%" y2="100%" className="stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" strokeDasharray="6 4" />
              <line x1="50%" y1="0" x2="8%" y2="100%" className="stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" strokeDasharray="6 4" opacity="0" />
              <line x1="50%" y1="0" x2="83%" y2="100%" className="stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" strokeDasharray="6 4" />
              <line x1="50%" y1="0" x2="100%" y2="100%" className="stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" strokeDasharray="6 4" opacity="0" />
            </svg>

            {/* Integration Cards Grid */}
            <div className="grid grid-cols-3 gap-6 mt-24 relative z-10">
              {integrations.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className={`
                      group relative bg-white dark:bg-slate-900/60 backdrop-blur-xl
                      rounded-[28px] border border-slate-100 dark:border-slate-800
                      p-6 shadow-lg shadow-slate-200/30 dark:shadow-none
                      hover:shadow-2xl ${item.glow}
                      hover:-translate-y-2 hover:border-primary/30
                      transition-all duration-500 cursor-pointer
                      ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
                    `}
                    style={{ transitionDelay: `${200 + i * 100}ms` }}
                  >
                    {/* Tag */}
                    <div className="absolute top-4 right-4">
                      <span className="text-[9px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest bg-slate-50 dark:bg-slate-800/60 px-2 py-1 rounded-md">
                        {item.tag}
                      </span>
                    </div>

                    {/* Icon / Image */}
                    <div className={`w-14 h-14 ${item.bg} border ${item.border} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 overflow-hidden`}>
                      {item.img ? (
                        <img src={item.img} alt={item.name} className="w-full h-full object-cover rounded-xl" />
                      ) : (
                        <Icon className={`${item.color} transition-transform`} size={26} strokeWidth={1.5} />
                      )}
                    </div>

                    {/* Text */}
                    <h4 className="text-base font-bold text-heading dark:text-white mb-1.5 tracking-tight">
                      {item.name}
                    </h4>
                    <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                      {item.desc}
                    </p>

                    {/* Status */}
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                        Connecté
                      </span>
                      <ArrowRight className="w-3 h-3 text-slate-300 dark:text-slate-700 ml-auto group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Mobile Layout ── */}
        <div className="lg:hidden space-y-8">
          {/* Mobile Hub */}
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="w-20 h-20 rounded-[24px] bg-slate-900 dark:bg-white shadow-xl flex items-center justify-center">
              <img src="/ecosystem/risemanager.png" alt="RiseManager" className="w-10 h-10 object-contain" />
            </div>
            <div className="text-center">
              <div className="text-sm font-black text-heading dark:text-white">RiseManager</div>
              <div className="flex items-center gap-1.5 justify-center mt-1">
                <span className="w-1 h-1 rounded-full bg-primary" />
                <span className="text-[9px] font-bold text-primary uppercase tracking-widest">Hub Central</span>
              </div>
            </div>
          </div>

          {/* Connection line */}
          <div className="flex justify-center">
            <div className="w-[1px] h-8 bg-slate-200 dark:bg-slate-800" />
          </div>

          {/* Mobile Cards */}
          <div className="grid grid-cols-2 gap-4">
            {integrations.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className={`
                    group bg-white dark:bg-slate-900 p-5 rounded-[24px]
                    border border-slate-100 dark:border-slate-800
                    shadow-sm hover:shadow-lg transition-all duration-500
                    ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
                  `}
                  style={{ transitionDelay: `${100 + i * 80}ms` }}
                >
                  <div className={`w-12 h-12 ${item.bg} border ${item.border} rounded-xl flex items-center justify-center mb-3 overflow-hidden`}>
                    {item.img ? (
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <Icon className={item.color} size={22} strokeWidth={1.5} />
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-heading dark:text-white mb-1">{item.name}</h4>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-snug">{item.desc}</p>

                  <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-slate-50 dark:border-slate-800">
                    <div className="w-1 h-1 rounded-full bg-emerald-500" />
                    <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Connecté</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <div
          className={`
            mt-20 relative overflow-hidden bg-white dark:bg-slate-900 
            border border-slate-100 dark:border-slate-800
            rounded-[40px] p-10 lg:p-16 
            flex flex-col lg:flex-row items-center justify-between gap-10
            shadow-xl shadow-slate-200/30 dark:shadow-none
            transition-all duration-1000
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
          `}
          style={{ transitionDelay: "800ms" }}
        >
          {/* Subtle dot pattern */}
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px]" />
          </div>

          <div className="relative z-10 text-center lg:text-left">
            <div className="flex items-center gap-2 justify-center lg:justify-start mb-3">
              <Link2 className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Plug & Play</span>
            </div>
            <h3 className="text-2xl lg:text-3xl font-extrabold text-heading dark:text-white mb-2 tracking-tight">
              {t("integrations_sub")}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              Configuration en moins de 5 minutes. Aucune compétence technique requise.
            </p>
          </div>

          <a
            href="#lead-form"
            className="relative z-10 shrink-0 px-10 py-5 bg-primary hover:bg-primary-hover text-white rounded-2xl font-bold text-sm shadow-xl shadow-primary/20 transition-all hover:-translate-y-1 hover:shadow-2xl active:scale-95 flex items-center gap-3"
          >
            {t("nav_cta")}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Integrations;
