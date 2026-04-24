import React from "react";
import { useTranslation } from "react-i18next";
import {
  MessageCircle,
  FileSpreadsheet,
  Truck,
  FileText,
  Zap,
} from "lucide-react";

const integrations = [
  {
    name: "WhatsApp",
    icon: MessageCircle,
    color: "text-emerald-500",
    pos: "top-[5%] left-[20%]",
    delay: "0s",
  },
  {
    name: "Sheets",
    icon: FileSpreadsheet,
    color: "text-green-500",
    pos: "top-[35%] left-[5%]",
    delay: "0.2s",
  },
  {
    name: "RiseConfirm",
    img: "public/ecosystem/RiseConfirm.jpg", // Ensure extension is correct (.png/.svg)
    pos: "bottom-[10%] left-[20%]",
    delay: "0.4s",
  },
  {
    name: "RiseCart",
    img: "/ecosystem/risecart.jpg",
    pos: "top-[5%] right-[20%]",
    delay: "0.1s",
  },
  {
    name: "Logistics",
    icon: Truck,
    color: "text-amber-500",
    pos: "top-[35%] right-[5%]",
    delay: "0.3s",
  },
  {
    name: "Invoices",
    icon: FileText,
    color: "text-slate-500",
    pos: "bottom-[10%] right-[20%]",
    delay: "0.5s",
  },
];

const Integrations = () => {
  const { t } = useTranslation();

  return (
    <section className="relative py-24 lg:py-36 bg-slate-50 dark:bg-slate-950 overflow-hidden transition-colors duration-500">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 dark:bg-blue-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="container relative mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center px-3 py-1 mb-4 bg-blue-100 dark:bg-blue-500/10 rounded-full">
              <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em]">
                Ecosystem
              </span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tighter">
              {t("integrations_title")}
            </h2>
          </div>

          {/* orbital Hub */}
          <div className="relative h-[500px] w-full max-w-[700px] mx-auto flex items-center justify-center">
            <div className="absolute w-[240px] h-[240px] border border-blue-500/20 dark:border-blue-400/10 rounded-full animate-[ping_4s_linear_infinite]" />
            <div className="absolute w-[400px] h-[400px] border border-slate-200 dark:border-white/5 rounded-full hidden md:block" />

            {/* Floating Nodes */}
            {integrations.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className={`absolute ${item.pos} animate-bounce transition-all duration-1000 hidden md:flex flex-col items-center gap-3 group`}
                  style={{
                    animationDuration: "4s",
                    animationDelay: item.delay,
                  }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div
                      className="
                      relative w-16 h-16 rounded-[22px] bg-white dark:bg-slate-900 
                      border border-slate-200 dark:border-white/10
                      shadow-xl shadow-slate-200/50 dark:shadow-none flex items-center justify-center
                      group-hover:scale-110 group-hover:border-blue-500 group-hover:-rotate-3 transition-all cursor-pointer
                      overflow-hidden
                    "
                    >
                      {item.img ? (
                        <img
                          src={item.img}
                          alt={item.name}
                          className=" object-contain"
                        />
                      ) : (
                        <Icon
                          className={`${item.color} group-hover:scale-110 transition-transform`}
                          size={24}
                          strokeWidth={1.5}
                        />
                      )}
                    </div>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.name}
                  </span>
                </div>
              );
            })}

            {/* Core Center Piece */}
            <div className="relative z-10 text-center">
              <div className="group cursor-pointer">
                <div
                  className="
    w-32 h-32 rounded-[40px] bg-slate-900 dark:bg-white 
    shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_50px_rgba(255,255,255,0.1)]
    flex items-center justify-center transition-transform group-hover:scale-105 duration-500
  "
                >
                  <img
                    src="/ecosystem/risemanager.png"
                    alt="RiseManager Core"
                    className="w-16 h-16 object-contain"
                  />
                </div>
              </div>

              <div className="absolute top-full mt-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-center">
                <div className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">
                  RiseManager
                </div>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em]">
                    Unified Ecosystem
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="grid grid-cols-2 gap-4 mt-10 md:hidden">
            {integrations.map((item, i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-white/5 flex flex-col items-center gap-3 shadow-sm"
              >
                <div
                  className={`p-3 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center w-14 h-14`}
                >
                  {item.img ? (
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-8 h-8 object-contain"
                    />
                  ) : (
                    <item.icon className={item.color} size={24} />
                  )}
                </div>
                <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Integrations;
