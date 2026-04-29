import React from 'react';
import { useTranslation } from 'react-i18next';

/* ─── Animated Counter ──────────────────────────────────── */
const CountUp = ({ end, duration = 2000, decimals = 0 }) => {
    const [count, setCount] = React.useState(0);
    const [isVisible, setIsVisible] = React.useState(false);
    const countRef = React.useRef(null);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (countRef.current) {
            observer.observe(countRef.current);
        }

        return () => observer.disconnect();
    }, []);

    React.useEffect(() => {
        if (!isVisible) return;

        let startTime = null;
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const currentCount = progress * end;
            setCount(currentCount);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }, [isVisible, end, duration]);

    return <span ref={countRef}>{count.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}</span>;
};

/* ─── Component ─────────────────────────────────────────── */
const Temoignages = () => {
    const { t } = useTranslation();

    const testimonials = [
        {
            name: t('testi_1_name'),
            role: t('testi_1_role'),
            content: t('testi_1_quote'),
            result: t('testi_1_result'),
            avatar: t('testi_1_name').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(),
        },
        {
            name: t('testi_2_name'),
            role: t('testi_2_role'),
            content: t('testi_2_quote'),
            result: t('testi_2_result'),
            avatar: t('testi_2_name').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(),
        },
        {
            name: t('testi_3_name'),
            role: t('testi_3_role'),
            content: t('testi_3_quote'),
            result: t('testi_3_result'),
            avatar: t('testi_3_name').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(),
        },
    ];

    const stats = [
        { label: t('testi_stat_partners'), value: 200, suffix: '+', decimals: 0 },
        { label: t('testi_stat_orders'), value: 50, suffix: 'K+', decimals: 0 },
        { label: t('testi_stat_retention'), value: 98, suffix: '%', decimals: 0 },
        { label: t('testi_stat_productivity'), value: 3, suffix: 'h+', decimals: 0 },
    ];

    return (
        <section className="py-24 lg:py-32 bg-slate-50/50 dark:bg-slate-950 overflow-hidden relative transition-colors duration-500" id="temoignages">
            {/* Background Accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-50/50 dark:from-primary/10 via-transparent to-transparent opacity-50" />

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                {/* Header */}
                <div className="max-w-3xl mx-auto text-center mb-20 space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 rounded-full border border-slate-100 dark:border-slate-800 shadow-sm transition-colors">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-none">{t('testi_badge')}</span>
                    </div>
                    <h2 className="text-3xl lg:text-5xl font-extrabold text-heading dark:text-white leading-tight animate-slide-up">
                        {t('testi_title')}
                    </h2>
                </div>

                {/* Stats Bar */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto mb-24 px-6 py-10 bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    {stats.map((stat, i) => (
                        <div key={i} className="text-center space-y-2 relative">
                            {i < stats.length - 1 && <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-10 bg-slate-100 dark:bg-slate-800" />}
                            <div className="text-2xl lg:text-4xl font-black text-heading dark:text-white leading-none flex items-center justify-center">
                                <CountUp end={stat.value} decimals={stat.decimals} />
                                {stat.suffix && <span>{stat.suffix}</span>}
                            </div>
                            <div className="text-[10px] lg:text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Testimonials Grid */}
                <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch">
                    {testimonials.map((testi, i) => (
                        <div
                            key={i}
                            className="bg-white dark:bg-slate-900 p-10 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-lg shadow-slate-200/30 dark:shadow-none hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:border-primary/30 transition-all duration-500 group relative flex flex-col animate-slide-up"
                            style={{ animationDelay: `${0.2 + i * 0.1}s` }}
                        >
                            {/* Quote Icon */}
                            <div className="absolute top-8 right-10 text-slate-100 dark:text-slate-800 group-hover:text-primary/10 transition-colors">
                                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.8954 16 16.017 16H19.017C20.1216 16 21.017 15.1046 21.017 14V9C21.017 7.89543 20.1216 7 19.017 7H15.017C13.9124 7 13.017 7.89543 13.017 9V14M3.017 21L3.017 18C3.017 16.8954 3.89543 16 5.017 16H8.017C9.12157 16 10.017 15.1046 10.017 14V9C10.017 7.89543 9.12157 7 8.017 7H4.017C2.91243 7 2.017 7.89543 2.017 9V14" /></svg>
                            </div>

                            {/* Stars */}
                            <div className="flex gap-0.5 mb-6 text-amber-400">
                                {[...Array(5)].map((_, j) => (
                                    <svg key={j} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                ))}
                            </div>

                            <p className="text-lg text-slate-700 dark:text-slate-300 italic font-medium leading-relaxed mb-8 flex-1">
                                "{testi.content}"
                            </p>

                            <div className="flex items-center gap-4 mt-auto">
                                <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-2xl flex items-center justify-center text-primary dark:text-blue-300 font-bold text-sm">
                                    {testi.avatar}
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-heading dark:text-white">{testi.name}</div>
                                    <div className="text-[11px] font-medium text-slate-400 dark:text-slate-500">{testi.role}</div>
                                </div>
                                <div className="ml-auto">
                                    <div className="px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold rounded-lg border border-emerald-100 dark:border-emerald-800">
                                        {testi.result}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Temoignages;