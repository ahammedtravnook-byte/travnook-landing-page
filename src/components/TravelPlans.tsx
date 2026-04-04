import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, CalendarDays, CalendarCheck2, Sparkles, ArrowRight } from 'lucide-react';
import { getCountryConfig, getImagePath, type Plan } from '../data/countryConfig';

const getIconForPlan = (code: string) => {
  if (code.includes('03')) return <Clock className="w-6 h-6 md:w-8 md:h-8 text-brand-yellow" />;
  if (code.includes('02')) return <CalendarCheck2 className="w-6 h-6 md:w-8 md:h-8 text-white" />;
  if (code.includes('01')) return <CalendarDays className="w-6 h-6 md:w-8 md:h-8 text-brand-green" />;
  return <CalendarCheck2 className="w-6 h-6 md:w-8 md:h-8 text-white" />;
};

interface TravelPlansProps {
  lang?: 'en' | 'ar';
}

const TravelPlans = ({ lang = 'en' }: TravelPlansProps) => {
  const config = useMemo(() => getCountryConfig(), []);
  const isAlt = config.countryName !== 'Schengen';

  /* ──────────────────────────────────────────────
     ALT LAYOUT — Indonesia / China
     Single plan → Featured Spotlight Card
     ────────────────────────────────────────────── */
  if (isAlt) {
    const plan = config.plans[0];
    const gradientBg = config.countryName === 'Japan' ? 'from-slate-900 via-sky-950 to-slate-900' : config.countryName === 'Indonesia' ? 'from-emerald-900 via-emerald-800 to-emerald-950' : 'from-teal-900 via-teal-800 to-teal-950';
    const accentColor = config.countryName === 'Japan' ? 'text-[#FF8000]' : config.countryName === 'Indonesia' ? 'text-emerald-400' : 'text-teal-400';
    const dotColor = config.countryName === 'Japan' ? 'bg-[#FF8000]' : config.countryName === 'Indonesia' ? 'bg-emerald-400' : 'bg-teal-400';
    const btnBg = config.countryName === 'Japan' ? 'bg-[#FF8000] hover:bg-[#FF9933] text-white' : config.countryName === 'Indonesia' ? 'bg-emerald-500 hover:bg-emerald-400 text-emerald-950' : 'bg-teal-500 hover:bg-teal-400 text-teal-950';
    const glowColor = config.countryName === 'Japan' ? 'bg-sky-500/20' : config.countryName === 'Indonesia' ? 'bg-emerald-500/20' : 'bg-teal-500/20';

    return (
      <section className="py-12 md:py-24 bg-brand-offwhite relative overflow-hidden" id="appointments">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          {/* Header */}
          <div className="text-center mb-8 md:mb-14">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`inline-flex items-center gap-2 px-4 py-1.5 bg-white rounded-full ${config.themeColor.primary} shadow-sm font-outfit font-black text-[10px] tracking-[0.2em] mb-4 border border-gray-100 uppercase`}
            >
              <Sparkles className={`w-3.5 h-3.5 ${accentColor}`} />
              <span>{lang === 'ar' ? 'خطة الخدمة' : 'SERVICE PLAN'}</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`text-3xl md:text-5xl font-sora font-black ${config.themeColor.primary} tracking-tighter ${lang === 'ar' ? 'font-arabic' : ''}`}
            >
              {lang === 'ar' ? (
                <>خطة فيزا <span className={`${config.themeColor.accent} font-script font-normal text-[1.2em]`}>{config.ar?.metaTitle.split('|')[0]}</span></>
              ) : (
                <>{config.countryName} <span className={`${config.themeColor.accent} font-script font-normal text-[1.2em]`}>Visa</span> Plan</>
              )}
            </motion.h2>
          </div>

          {/* Spotlight Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`relative bg-gradient-to-br ${gradientBg} rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.15)]`}
          >
            {/* Glow effects */}
            <div className={`absolute top-[-20%] right-[-10%] w-[300px] h-[300px] ${glowColor} rounded-full blur-[80px] pointer-events-none`}></div>
            <div className={`absolute bottom-[-20%] left-[-10%] w-[300px] h-[300px] ${glowColor} rounded-full blur-[80px] pointer-events-none`}></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Image side */}
              <div className="relative h-[200px] md:h-auto overflow-hidden">
                <img src={getImagePath(plan.image)} alt={plan.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30 md:block hidden"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 md:hidden"></div>
                {/* Code badge */}
                <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-white/10 backdrop-blur-xl border border-white/20 px-3 py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-xl text-white font-mono font-bold text-xs md:text-sm tracking-wider shadow-lg">
                  {plan.code}
                </div>
              </div>

              {/* Content side */}
              <div className="p-6 md:p-10 lg:p-14 relative z-10 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4 md:mb-6">
                  <div className={`w-2 h-2 rounded-full ${dotColor} animate-pulse`}></div>
                  <span className={`text-[10px] md:text-xs font-outfit font-black tracking-[0.25em] uppercase ${accentColor}`}>
                    {lang === 'ar' ? 'نظام المواعيد' : 'APPOINTMENTS MODE'}
                  </span>
                </div>

                <h3 className={`text-2xl md:text-4xl font-sora font-black text-white tracking-tight mb-3 md:mb-5 ${lang === 'ar' ? 'font-arabic' : ''}`}>
                  {lang === 'ar' ? plan.ar?.title : plan.title}
                </h3>
                <p className={`text-white/60 text-sm md:text-base font-outfit leading-relaxed mb-6 md:mb-8 ${lang === 'ar' ? 'font-arabic' : ''}`}>
                  {lang === 'ar' ? plan.ar?.desc : plan.desc}
                </p>

                <div className="space-y-2.5 md:space-y-3 mb-8 md:mb-10">
                  {(lang === 'ar' ? plan.ar?.features : plan.features)?.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 text-white/80 font-outfit font-medium text-sm">
                      <CheckCircle2 className={`w-4 h-4 md:w-5 md:h-5 shrink-0 ${accentColor}`} />
                      <span className={lang === 'ar' ? 'font-arabic' : ''}>{feature}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="https://wa.me/971544388038?text=Hi%20Travnook!%20I'm%20interested%20in%20your%20visa%20assistance%20service.%20Please%20guide%20me."
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${btnBg} text-white font-outfit font-black py-3.5 px-8 md:py-4 md:px-10 rounded-xl md:rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 hover:-translate-y-1 uppercase tracking-widest cursor-pointer text-sm md:text-base w-full md:w-auto ${lang === 'ar' ? 'font-arabic' : ''}`}
                >
                  {lang === 'ar' ? 'ابدأ الحين' : 'Get Started'}
                  <ArrowRight className={`w-5 h-5 ${lang === 'ar' ? 'rotate-180' : ''}`} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  /* ──────────────────────────────────────────────
     SCHENGEN LAYOUT — Original (unchanged)
     ────────────────────────────────────────────── */
  return (
    <section className="py-16 md:py-24 bg-brand-offwhite relative px-4 md:px-8 overflow-hidden" id="appointments">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-20 px-4">
          <div className={`inline-flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-white rounded-full ${config.themeColor.primary} shadow-sm font-bold text-xs md:text-sm tracking-wide mb-4 md:mb-6`}>
            <CalendarCheck2 className="w-4 h-4 md:w-5 md:h-5" /> {lang === 'ar' ? 'نظام المواعيد' : 'Appointments Mode'}
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-4xl md:text-5xl lg:text-6xl font-extrabold ${config.themeColor.primary} mb-3 md:mb-4 leading-tight font-sora ${lang === 'ar' ? 'font-arabic' : ''}`}
          >
            {lang === 'ar' ? (
              <>خطط مواعيد <span className={`${config.themeColor.accent} font-script font-normal text-5xl md:text-7xl lg:text-8xl`}>شنغن</span></>
            ) : (
              <>{config.countryName} <span className={`${config.themeColor.accent} font-script font-normal text-5xl md:text-7xl lg:text-8xl`}>Appointment</span> Plans</>
            )}
          </motion.h2>
          <p className={`text-gray-500 max-w-2xl mx-auto text-sm md:text-lg font-outfit px-4 ${lang === 'ar' ? 'font-arabic' : ''}`}>
            {lang === 'ar' 
              ? 'اختار الوقت اللي يناسبك لسفرك. نحن متخصصين في حجز المواعيد بسرعة وكفاءة.'
              : 'Choose the timeline that best fits your travel needs. We specialize in securing slots efficiently.'}
          </p>
        </div>

        <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-6 md:gap-4 lg:gap-8 items-stretch pb-10 md:pb-0 px-4 md:px-0 snap-x snap-mandatory -mx-4 md:mx-0 scrollbar-hide">
          {config.plans.map((plan: Plan, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -10 }}
              className={`snap-center shrink-0 w-[85vw] md:w-auto bg-white rounded-[2rem] md:rounded-[2.5rem] p-5 md:p-6 shadow-[0_15px_40px_rgba(0,0,0,0.04)] transition-all duration-300 flex flex-col group ${
                plan.featured ? `md:scale-105 border-[2px] md:border-[3px] border-brand-green relative z-10 shadow-xl bg-gradient-to-b from-white to-gray-50/50` : 'relative z-0'
              }`}
            >
              {plan.featured && (
                <div className={`absolute -top-4 md:-top-5 left-1/2 -translate-x-1/2 bg-brand-green text-white text-[10px] md:text-sm font-bold py-1 md:py-1.5 px-4 md:px-6 rounded-full shadow-lg flex items-center gap-2 tracking-widest whitespace-nowrap ${lang === 'ar' ? 'font-arabic' : ''}`}>
                   {lang === 'ar' ? 'الأكثر طلباً' : 'MOST POPULAR'}
                </div>
              )}

              <div className="w-full h-40 md:h-56 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden mb-6 md:mb-8 relative">
                <img src={getImagePath(plan.image)} alt={plan.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6 flex justify-between items-end">
                  <div className={`w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20 shadow-lg ${plan.featured ? 'bg-brand-teal' : 'bg-white/80'}`}>
                    {getIconForPlan(plan.code)}
                  </div>
                  <div className="bg-white/20 backdrop-blur-md px-3 py-1 md:px-4 md:py-1.5 rounded-lg md:rounded-xl border border-white/30 text-white font-mono font-bold text-xs md:text-sm tracking-widest shadow-lg">
                    {plan.code}
                  </div>
                </div>
              </div>

              <h3 className={`text-xl md:text-2xl font-bold ${config.themeColor.primary} mb-3 md:mb-4 min-h-[56px] md:min-h-[64px] font-sora ${lang === 'ar' ? 'font-arabic' : ''}`}>
                {lang === 'ar' ? plan.ar?.title : plan.title}
              </h3>
              <p className={`text-sm md:text-[15px] text-gray-500 mb-6 md:mb-8 min-h-[60px] md:min-h-[80px] leading-relaxed border-b border-gray-100 pb-6 md:pb-8 font-outfit ${lang === 'ar' ? 'font-arabic' : ''}`}>
                {lang === 'ar' ? plan.ar?.desc : plan.desc}
              </p>

              <div className="space-y-3 md:space-y-4 mb-8 md:mb-10 flex-1 font-outfit">
                {(lang === 'ar' ? plan.ar?.features : plan.features)?.map((feature, i) => (
                  <div key={i} className="flex items-start md:items-center gap-3 md:gap-4 text-gray-700 font-medium text-sm md:text-base">
                    <CheckCircle2 className={`w-5 h-5 md:w-6 md:h-6 shrink-0 mt-0.5 md:mt-0 ${plan.featured ? config.themeColor.secondary : config.themeColor.accent}`} />
                    <span className={lang === 'ar' ? 'font-arabic' : ''}>{feature}</span>
                  </div>
                ))}
              </div>

              <a
                href="https://wa.me/971544388038?text=Hi%20Travnook!%20I'm%20interested%20in%20your%20visa%20assistance%20service.%20Please%20guide%20me."
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-3.5 md:py-4 text-base md:text-lg rounded-xl md:rounded-2xl font-bold transition-all flex items-center justify-center gap-2 cursor-pointer font-outfit ${
                plan.featured
                ? `${config.themeColor.secondary.replace('text-', 'bg-')} text-white shadow-lg hover:brightness-110 hover:-translate-y-1`
                : `bg-gray-100 ${config.themeColor.primary} hover:bg-gray-200 hover:-translate-y-1`
              } ${lang === 'ar' ? 'font-arabic' : ''}`}>
                {lang === 'ar' ? 'تحدث معانا' : 'Chat With Us'}
              </a>
            </motion.div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </section>
  );
};

export default TravelPlans;
