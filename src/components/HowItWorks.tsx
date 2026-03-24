import { useMemo, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FileText, ClipboardCheck, UserCheck, CheckCircle2, Plane, Send, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getCountryConfig } from '../data/countryConfig';

gsap.registerPlugin(ScrollTrigger);

const getColorForIdx = (idx: number, country: string) => {
  if (country === 'Schengen') {
    return idx % 2 === 0 ? "bg-brand-teal" : "bg-brand-yellow";
  } else if (country === 'Indonesia') {
    return idx % 2 === 0 ? "bg-emerald-900" : "bg-emerald-500";
  } else if (country === 'Japan') {
    return idx % 2 === 0 ? "bg-slate-900" : "bg-sky-500";
  } else {
    return idx % 2 === 0 ? "bg-teal-900" : "bg-teal-500";
  }
};

interface HowItWorksProps {
  lang?: 'en' | 'ar';
}

const HowItWorks = ({ lang = 'en' }: HowItWorksProps) => {
  const config = useMemo(() => getCountryConfig(), []);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const isAlt = config.countryName !== 'Schengen';

  const howItWorksSteps = useMemo(() => {
    return (config.steps || []).map(step => ({
      title: lang === 'ar' ? step.ar?.title || step.title : step.title,
      desc: lang === 'ar' ? step.ar?.desc || step.desc : step.desc
    }));
  }, [lang, config.steps]);

  const icons = [
    <FileText className="w-6 h-6 md:w-8 md:h-8" />,
    <ClipboardCheck className="w-6 h-6 md:w-8 md:h-8" />,
    <UserCheck className="w-6 h-6 md:w-8 md:h-8" />,
    <Send className="w-6 h-6 md:w-8 md:h-8" />,
    <CheckCircle2 className="w-6 h-6 md:w-8 md:h-8" />
  ];

  useEffect(() => {
    if (!containerRef.current || isAlt) return;

    const ctx = gsap.context(() => {
      if (pathRef.current) {
        const length = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isAlt]);

  /* ──────────────────────────────────────────────
     ALT LAYOUT — Indonesia / China
     Horizontal step-progress bar (desktop)
     Vertical cards (mobile)
     ────────────────────────────────────────────── */
  if (isAlt) {
    const isJapan = config.countryName === 'Japan';
    const isIndo = config.countryName === 'Indonesia';
    const accentColor = isJapan ? 'text-[#FF8000]' : isIndo ? 'text-emerald-500' : 'text-teal-500';
    const dotColor = isJapan ? 'bg-[#FF8000]' : isIndo ? 'bg-emerald-500' : 'bg-teal-500';
    const lineBg = isJapan ? 'bg-[#FF9933]/50' : isIndo ? 'bg-emerald-200' : 'bg-teal-200';
    const cardHoverBorder = isJapan ? 'hover:border-[#FF8000]/50' : isIndo ? 'hover:border-emerald-200' : 'hover:border-teal-200';

    return (
      <section className="relative py-14 md:py-24 bg-[#F8F9F9] overflow-hidden" id="process">
        <div className="max-w-6xl mx-auto px-4 md:px-8">

          {/* Header */}
          <div className="text-center mb-10 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`inline-flex items-center gap-2 px-4 py-1.5 bg-white rounded-full ${config.themeColor.primary} shadow-sm font-outfit font-black text-[10px] tracking-[0.2em] mb-4 border border-gray-100 uppercase`}
            >
              <Sparkles className={`w-3.5 h-3.5 ${accentColor}`} />
              <span>{lang === 'ar' ? 'إجراءاتنا' : 'OUR PROCESS'}</span>
            </motion.div>

            <h2 className={`text-3xl md:text-5xl font-sora font-black ${config.themeColor.primary} tracking-tighter ${lang === 'ar' ? 'font-arabic' : ''}`}>
              {lang === 'ar' ? (
                <>ابدأ <span className={`${config.themeColor.accent} font-script font-normal text-[1.2em]`}>رحلتك</span> معانا</>
              ) : (config.countryName === 'Indonesia' || config.countryName === 'Japan' || config.countryName === 'China') ? (
                <>How the Visa <span className={`${config.themeColor.accent} font-script font-normal text-[1.2em]`}>Process Works</span></>
              ) : (
                <>The <span className={`${config.themeColor.accent} font-script font-normal text-[1.2em]`}>Journey</span></>
              )}
            </h2>
          </div>

          {/* Desktop: Horizontal step bar */}
          <div className="hidden md:block">
            {/* Progress line */}
            <div className="relative mb-12">
              <div className={`absolute top-6 left-[10%] right-[10%] h-0.5 ${lineBg}`}></div>
              <div className="flex justify-between relative z-10 px-[5%]">
                {howItWorksSteps.map((_, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.15, type: 'spring', stiffness: 150 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center"
                  >
                    <div className={`w-12 h-12 ${dotColor} rounded-full flex items-center justify-center text-white font-black text-lg shadow-lg`}>
                      {idx + 1}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Step cards */}
            <div className="grid grid-cols-5 gap-4">
              {howItWorksSteps.map((step: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -6 }}
                  className={`bg-white rounded-2xl p-5 text-center border border-gray-50 ${cardHoverBorder} hover:shadow-lg transition-all cursor-default group`}
                >
                  <div className={`w-11 h-11 mx-auto ${accentColor} bg-gray-50 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    {icons[idx]}
                  </div>
                  <h4 className={`text-sm font-sora font-black ${config.themeColor.primary} mb-1.5 tracking-tight ${lang === 'ar' ? 'font-arabic' : ''}`}>{step.title}</h4>
                  <p className={`text-gray-400 text-[11px] font-outfit leading-relaxed ${lang === 'ar' ? 'font-arabic opacity-80' : ''}`}>{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile: Vertical list */}
          <div className="md:hidden space-y-3">
            {howItWorksSteps.map((step: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-3 items-start bg-white rounded-xl p-4 shadow-sm border border-gray-50"
              >
                <div className={`w-9 h-9 shrink-0 ${dotColor} rounded-lg flex items-center justify-center text-white font-black text-sm shadow-md`}>
                  {idx + 1}
                </div>
                <div className={lang === 'ar' ? 'text-right' : ''}>
                  <h4 className={`text-sm font-sora font-black ${config.themeColor.primary} mb-1 ${lang === 'ar' ? 'font-arabic' : ''}`}>{step.title}</h4>
                  <p className={`text-gray-400 text-xs font-outfit leading-relaxed ${lang === 'ar' ? 'font-arabic opacity-80' : ''}`}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* ──────────────────────────────────────────────
     SCHENGEN LAYOUT — Original S-Curve (unchanged)
     ────────────────────────────────────────────── */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const pathOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative py-16 md:py-32 bg-[#F8F9F9] overflow-hidden" id="process">
      <div className={`absolute top-0 right-0 w-96 h-96 bg-brand-green/5 blur-[120px] rounded-full`}></div>
      <div className={`absolute bottom-0 left-0 w-96 h-96 bg-brand-yellow/5 blur-[120px] rounded-full`}></div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative">
        <div className="text-center mb-16 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-4xl md:text-7xl font-bold text-brand-teal mb-4 font-sora ${lang === 'ar' ? 'font-arabic' : ''}`}
          >
            {lang === 'ar' ? (
              <>خطوات <span className="text-brand-yellow font-script text-5xl md:text-8xl font-normal">الرحلة</span></>
            ) : (
              <>The <span className="text-brand-yellow font-script text-5xl md:text-8xl font-normal">Journey</span></>
            )}
          </motion.h2>
          <p className={`text-gray-500 text-sm md:text-xl max-w-xl mx-auto font-outfit ${lang === 'ar' ? 'font-arabic' : ''}`}>
            {lang === 'ar' ? 'خطواتك البسيطة للحصول على موعد شنغن.' : 'Your step-by-step guide to securing your Schengen appointment.'}
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-full z-0">
            <svg viewBox="0 0 400 1000" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
              <motion.path
                ref={pathRef}
                d="M 200 0 C 350 150, 50 350, 200 500 C 350 650, 50 850, 200 1000"
                stroke='#8ec436'
                strokeWidth="8"
                strokeLinecap="round"
                style={{ pathLength: scrollYProgress, opacity: pathOpacity }}
                fill="transparent"
                className='drop-shadow-[0_0_10px_rgba(142,196,54,0.5)]'
              />
            </svg>
          </div>

          <div className="relative z-10 space-y-8 md:space-y-20 max-w-5xl mx-auto">
            {howItWorksSteps.map((step: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50, x: idx % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-6 md:gap-12`}
              >
                <div className={`${getColorForIdx(idx, 'Schengen')} w-full lg:w-1/2 rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 lg:p-14 text-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative overflow-hidden group`}>
                  <div className="absolute top-0 right-0 opacity-5 group-hover:rotate-12 transition-transform duration-700 p-8">
                    <Plane className="w-24 h-24 md:w-40 md:h-40 rotate-45" />
                  </div>
                  <div className="relative z-10">
                    <div className="text-6xl md:text-[7rem] font-black text-white/10 leading-none font-outfit select-none mb-2 md:mb-4">0{idx + 1}</div>
                    <div className="inline-block p-3 md:p-4 bg-white/10 backdrop-blur-md rounded-xl md:rounded-2xl mb-4 md:mb-6 shadow-lg">{icons[idx]}</div>
                    <h3 className={`text-xl md:text-3xl font-black font-sora tracking-tight mb-3 md:mb-5 ${lang === 'ar' ? 'font-arabic' : ''}`}>{step.title}</h3>
                    <p className={`text-white/60 text-sm md:text-lg font-outfit leading-relaxed ${lang === 'ar' ? 'font-arabic' : ''}`}>{step.desc}</p>
                  </div>
                </div>
                <div className="hidden lg:block w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
