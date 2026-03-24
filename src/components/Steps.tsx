import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, CreditCard, Luggage, ArrowRight, SearchCheck, CheckCircle2, MessageCircle, Plane } from 'lucide-react';
import { getCountryConfig } from '../data/countryConfig';

const Steps = ({ lang = 'en' }: { lang?: 'en' | 'ar' }) => {
  const config = useMemo(() => getCountryConfig(), []);
  const isAlt = config.countryName !== 'Schengen';

  const getIcon = (idx: number) => {
    const icons = [
      <Calendar className="w-5 h-5 md:w-6 md:h-6" />,
      <SearchCheck className="w-5 h-5 md:w-6 md:h-6" />,
      <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6" />,
      <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />,
      <Plane className="w-5 h-5 md:w-6 md:h-6" />
    ];
    return icons[idx] || icons[0];
  };

  const steps = useMemo(() => {
    return (config.steps || []).map((s, idx) => ({
      icon: getIcon(idx),
      num: s.number,
      title: s.title,
      desc: s.desc
    }));
  }, [config.steps]);

  /* ──────────────────────────────────────────────
     ALT LAYOUT — Indonesia / China
     Compact vertical timeline with connecting line
     ────────────────────────────────────────────── */
  if (isAlt) {
    const accentColor = config.countryName === 'Indonesia' ? 'text-emerald-500' : 'text-teal-500';
    const numBg = config.countryName === 'Indonesia' ? 'bg-emerald-900' : 'bg-teal-900';
    const lineBg = config.countryName === 'Indonesia' ? 'bg-emerald-200' : 'bg-teal-200';
    const bannerGrad = config.countryName === 'Indonesia' ? 'from-emerald-700 to-emerald-900' : 'from-teal-700 to-teal-900';
    const btnBg = config.countryName === 'Indonesia' ? 'bg-emerald-500 hover:bg-emerald-400' : 'bg-teal-500 hover:bg-teal-400';

    return (
      <section className="py-10 md:py-20 bg-brand-offwhite relative z-10">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          {/* Header */}
          <div className="text-center mb-8 md:mb-14">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`text-3xl md:text-5xl font-sora font-black ${config.themeColor.primary} tracking-tighter`}
            >
              {lang === 'ar' ? 'كيفية عمل' : 'How the Visa'} <span className={`${config.themeColor.accent} font-script font-normal text-[1.2em]`}>{lang === 'ar' ? 'عملية الفيزا' : 'Process Works'}</span>
            </motion.h2>
          </div>

          {/* Vertical timeline */}
          <div className="relative">
            {/* Connecting line */}
            <div className={`absolute left-6 md:left-8 top-0 bottom-0 w-0.5 ${lineBg}`}></div>

            <div className="space-y-6 md:space-y-8">
              {steps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                  className="flex gap-4 md:gap-6 items-start relative group"
                >
                  {/* Timeline node */}
                  <div className={`relative z-10 w-12 h-12 md:w-16 md:h-16 shrink-0 ${numBg} rounded-xl md:rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                    <span className="font-black text-lg md:text-xl font-sora">{step.num}</span>
                  </div>

                  {/* Card */}
                  <div className="flex-1 bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-50 group-hover:shadow-lg group-hover:-translate-y-1 transition-all">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={accentColor}>{step.icon}</span>
                      <h3 className={`text-base md:text-lg font-sora font-black ${config.themeColor.primary} tracking-tight`}>{step.title}</h3>
                    </div>
                    <p className="text-gray-400 text-xs md:text-sm font-outfit leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={`mt-10 md:mt-16 bg-gradient-to-r ${bannerGrad} rounded-2xl md:rounded-3xl p-5 md:p-8 flex flex-col md:flex-row items-center justify-between shadow-xl relative overflow-hidden`}
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
            <div className="flex items-center gap-4 md:gap-6 relative z-10">
              <span className="text-white font-black text-5xl md:text-7xl font-sora">48</span>
              <div className="text-white">
                <span className="text-xs font-bold uppercase tracking-wider opacity-70">Get Special Offer</span>
                <span className="block text-lg md:text-2xl font-black font-script">% Off Tours & Trip Packages</span>
              </div>
            </div>
            <a
              href="https://wa.me/971544388038"
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-4 md:mt-0 relative z-10 ${btnBg} text-white font-outfit font-black py-3 px-6 md:py-3.5 md:px-8 rounded-xl shadow-lg transition-all hover:-translate-y-1 cursor-pointer text-sm flex items-center gap-2 uppercase tracking-widest`}
            >
              Discover More <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>
    );
  }

  /* ──────────────────────────────────────────────
     SCHENGEN LAYOUT — Original (unchanged)
     ────────────────────────────────────────────── */
  const iconColor1 = 'text-brand-green';
  const iconColor2 = 'text-brand-yellow';
  const iconColor3 = 'text-brand-teal';
  const numBg = 'bg-brand-teal';
  const bannerBg = 'bg-brand-yellow';
  const bannerBtnHover = 'text-brand-yellow hover:bg-brand-teal hover:text-white';
  const dividerBg = 'bg-brand-green/30';

  const schengenSteps = [
    { ...steps[0], icon: <Calendar className={`w-5 h-5 md:w-6 md:h-6 ${iconColor1}`} /> },
    { ...steps[1], icon: <CreditCard className={`w-5 h-5 md:w-6 md:h-6 ${iconColor2}`} /> },
    { ...steps[2], icon: <Luggage className={`w-5 h-5 md:w-6 md:h-6 ${iconColor3}`} /> }
  ];

  return (
    <section className="py-12 md:py-24 bg-brand-offwhite relative z-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-8 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-brand-teal font-sora"
          >
            Easy Steps <span className="text-brand-yellow font-script text-4xl md:text-5xl font-normal">For Bookings</span>
          </motion.h2>
          <div className={`w-20 md:w-24 h-1 ${dividerBg} mx-auto mt-3 md:mt-4 rounded-full`}></div>
        </div>

        <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-4 md:gap-8 pb-4 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          {schengenSteps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="snap-center shrink-0 w-[75vw] md:w-auto bg-white rounded-2xl md:rounded-[2rem] p-5 md:p-8 shadow-card hover:shadow-float transition-all relative overflow-hidden group"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-brand-offwhite rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-sm group-hover:scale-110 transition-transform">
                {step.icon}
              </div>
              <div className={`absolute top-5 right-5 md:top-8 md:right-8 w-8 h-8 md:w-10 md:h-10 ${numBg} rounded-lg md:rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                {step.num}
              </div>
              <h3 className="text-lg md:text-xl font-bold text-brand-teal mb-2 md:mb-3 font-sora">{step.title}</h3>
              <p className="text-gray-500 text-xs md:text-sm leading-relaxed font-outfit">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className={`mt-10 md:mt-20 w-full ${bannerBg} rounded-2xl md:rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between shadow-float relative overflow-hidden`}
        >
          <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-white/20 rounded-full blur-3xl"></div>
          <div className="flex items-center gap-4 md:gap-6 relative z-10">
            <span className="text-white font-bold text-5xl md:text-7xl">48</span>
            <div className="flex flex-col text-white">
              <span className="text-xs md:text-sm font-semibold uppercase tracking-wider">Get Special Offer</span>
              <span className="text-lg md:text-2xl font-bold font-script tracking-wide">% Off Tours and Trip Packages, Globally</span>
            </div>
          </div>
          <a
            href="https://wa.me/971544388038"
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-4 md:mt-0 relative z-10 bg-white ${bannerBtnHover} font-bold py-2.5 px-6 md:py-3 md:px-8 rounded-full shadow-lg transition-colors cursor-pointer text-sm md:text-base`}
          >
            Discover More
          </a>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </section>
  );
};

export default Steps;
