import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved) return saved;
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "light";
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", theme);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  const navLinks = [
    { label: t("nav_org"), href: "#douleurs" },
    { label: t("nav_feat"), href: "#promesse" },
    { label: t("nav_tarifs"), href: "#tarifs" },
    { label: t("nav_faq"), href: "#faq" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 sm:px-6">
        <div
          className={`container mx-auto px-4 lg:px-6 py-3 bg-white dark:bg-slate-900 rounded-[24px] border border-slate-100 dark:border-slate-800 transition-all duration-300 flex items-center justify-between ${isScrolled ? "shadow-md shadow-slate-200/50 dark:shadow-none" : "shadow-sm"}`}
        >
          {/* Logo - Link removed, using div for static branding */}
          <div className="flex items-center gap-2 shrink-0 select-none">
            <img
              src="/ecosystem/risemanager.png"
              alt="RiseManager Logo"
              className="w-8 h-8 object-contain"
            />
            <span
              className={`text-lg sm:text-xl font-black tracking-tighter ${theme === "dark" ? "text-white" : "text-slate-900"}`}
            >
              Rise<span className="text-primary">Manager</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] font-bold text-slate-400 dark:text-slate-500 hover:text-primary dark:hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 sm:p-2.5 border border-slate-100 dark:border-slate-800 rounded-full bg-slate-50/50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all active:scale-95 group"
              aria-label="Toggle theme"
            >
              <svg
                className="w-4 h-4 text-amber-500 hidden dark:block"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  clipRule="evenodd"
                />
              </svg>
              <svg
                className="w-4 h-4 text-primary block dark:hidden group-hover:rotate-12 transition-transform"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            </button>

            {/* Lang Switcher */}
            <div className="hidden md:block relative group">
              <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-100 dark:border-slate-800 rounded-full bg-slate-50/50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                <span className="text-[10px] font-black text-primary uppercase">
                  {(i18n.language || "fr").substring(0, 2)}
                </span>
                <svg
                  className="w-3 h-3 text-slate-400 group-hover:rotate-180 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl rounded-2xl py-2 flex flex-col min-w-[120px]">
                  {[
                    ["fr", "Français"],
                    ["en", "English"],
                    ["ar", "العربية"],
                  ].map(([code, label]) => (
                    <button
                      key={code}
                      onClick={() => i18n.changeLanguage(code)}
                      className={`px-4 py-2.5 text-xs font-bold text-left rtl:text-right w-full transition-colors flex items-center justify-between ${i18n.language?.startsWith(code) ? "text-primary bg-blue-50/50 dark:bg-blue-900/20" : "text-slate-500 hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-800"}`}
                    >
                      {label}
                      {i18n.language?.startsWith(code) && (
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Demo CTA */}
            <a
              href="#dashboard"
              className="hidden lg:block text-sm font-bold text-heading dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors border border-slate-100 dark:border-slate-800 px-5 py-2.5 rounded-full"
            >
              {t("nav_demo")}
            </a>

            {/* Primary CTA */}
            <a
              href="#lead-form"
              className="hidden sm:flex px-5 py-2.5 lg:px-6 lg:py-3 bg-primary hover:bg-primary-hover text-white text-xs lg:text-sm font-extrabold rounded-full transition-all active:scale-95 whitespace-nowrap shadow-lg shadow-primary/20 items-center justify-center"
            >
              {t("nav_cta")}
            </a>

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden p-2 text-heading dark:text-white"
              onClick={() => setIsMenuOpen(true)}
            >
              <div className="flex flex-col gap-1.5 border-l rtl:border-l-0 rtl:border-r pl-3 rtl:pl-0 rtl:pr-3 border-slate-100 dark:border-slate-800">
                <div className="w-6 h-0.5 bg-heading dark:bg-white rounded-full" />
                <div className="w-4 h-0.5 bg-heading dark:bg-white rounded-full self-end" />
                <div className="w-5 h-0.5 bg-heading dark:bg-white rounded-full self-end" />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-heading/20 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-[32px] p-8 shadow-2xl border border-slate-50 dark:border-slate-800 animate-scale-in text-center">
            <button
              className="absolute top-6 right-6 rtl:right-auto rtl:left-6 p-2 text-slate-400 hover:text-heading bg-slate-50 dark:bg-slate-800 rounded-full"
              onClick={() => setIsMenuOpen(false)}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="flex flex-col items-center gap-2 mb-10">
              <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-lg">
                <img
                  src="/ecosystem/risemanager.png"
                  alt="RiseManager Logo"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <span className="text-xl font-black text-heading dark:text-white">
                RiseManager
              </span>
            </div>
            <nav className="flex flex-col gap-5 mb-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm font-bold text-slate-500 hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="flex flex-col gap-2 mb-6 bg-slate-50/50 dark:bg-slate-800/50 p-2 rounded-2xl border border-slate-100 dark:border-slate-800">
              {[
                ["fr", "Français"],
                ["en", "English"],
                ["ar", "العربية"],
              ].map(([code, label]) => (
                <button
                  key={code}
                  onClick={() => {
                    i18n.changeLanguage(code);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full py-2.5 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors ${i18n.language?.startsWith(code) ? "text-primary bg-white dark:bg-slate-900 shadow-sm" : "text-slate-500 hover:text-primary"}`}
                >
                  {label}
                  {i18n.language?.startsWith(code) && (
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  )}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <button
                onClick={toggleTheme}
                className="w-full py-3 text-sm font-bold text-heading dark:text-white border border-slate-100 dark:border-slate-800 rounded-2xl flex items-center justify-center gap-2"
              >
                {theme === "dark" ? t("light_mode") : t("dark_mode")}
              </button>
              <a
                href="#lead-form"
                onClick={() => setIsMenuOpen(false)}
                className="w-full py-4 bg-primary text-white text-sm font-bold rounded-2xl shadow-lg shadow-primary/20 flex items-center justify-center"
              >
                {t("nav_cta")}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;