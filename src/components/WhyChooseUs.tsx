import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { SearchCheck, Users, Zap, LockKeyhole, Plane, CheckCircle2, ArrowRight } from 'lucide-react';
import { getCountryConfig } from '../data/countryConfig';

interface WhyChooseUsProps {
  lang?: 'en' | 'ar';
}

const WhyChooseUs = ({ lang = 'en' }: WhyChooseUsProps) => {
  const config = useMemo(() => getCountryConfig(), []);
  const isAlt = config.countryName !== 'Schengen';

  const countryWord = lang === 'ar' 
    ? (config.ar?.metaTitle.split('|')[0] || config.countryName)
    : (config.countryName === 'Schengen' ? 'Schengen' : config.countryName);

  const guarantees = useMemo(() => {
    if (lang === 'ar') {
      return [
        { icon: <SearchCheck className="w-7 h-7 md:w-9 md:h-9" />, title: "إرشاد التقديم", desc: "احصل على دعم خطوة بخطوة لفهم وإكمال طلب الفيزا بشكل صحيح." },
        { icon: <Users className="w-7 h-7 md:w-9 md:h-9" />, title: "دقة الأوراق", desc: "نراجع أوراقك للتأكد من مطابقتها للمتطلبات وتقليل الأخطاء." },
        { icon: <Zap className="w-7 h-7 md:w-9 md:h-9" />, title: "مساعدة سريعة", desc: "ابقَ على اطلاع بردود سريعة ودعم طوال عملية التقديم." },
        { icon: <LockKeyhole className="w-7 h-7 md:w-9 md:h-9" />, title: "عملية آمنة وسرية", desc: "معلوماتك الشخصية تُعامل بأعلى معايير الخصوصية وحماية البيانات." }
      ];
    }
    return [
      { icon: <SearchCheck className="w-7 h-7 md:w-9 md:h-9" />, title: "Application Guidance", desc: "Get step-by-step support to understand and complete your visa application correctly." },
      { icon: <Users className="w-7 h-7 md:w-9 md:h-9" />, title: "Document Accuracy Support", desc: "We review your documents to help ensure they meet the required guidelines and reduce errors." },
      { icon: <Zap className="w-7 h-7 md:w-9 md:h-9" />, title: "Responsive Assistance", desc: "Stay updated with timely responses and support throughout your application process." },
      { icon: <LockKeyhole className="w-7 h-7 md:w-9 md:h-9" />, title: "Secure & Confidential Process", desc: "Your personal information is handled with strict privacy and data protection standards." }
    ];
  }, [lang]);

  /* ──────────────────────────────────────────────
     ALT LAYOUT — Indonesia / China
     Horizontally-scrollable glassmorphic cards
     ────────────────────────────────────────────── */
  if (isAlt) {
    const isJapan = config.countryName === 'Japan';
    const isIndo = config.countryName === 'Indonesia';
    
    const gradientBg = isJapan ? 'from-slate-900 to-slate-950' : isIndo ? 'from-emerald-900 to-emerald-950' : 'from-teal-900 to-teal-950';
    const accentColor = isJapan ? 'text-[#FF8000]' : isIndo ? 'text-emerald-400' : 'text-teal-400';
    const dotColor = isJapan ? 'bg-[#FF8000]' : isIndo ? 'bg-emerald-400' : 'bg-teal-400';
    const glowColor = isJapan ? 'bg-slate-500/15' : isIndo ? 'bg-emerald-500/15' : 'bg-teal-500/15';
    const cardBorder = isJapan ? 'border-slate-500/10' : isIndo ? 'border-emerald-500/10' : 'border-teal-500/10';
    const btnBg = isJapan ? 'bg-[#FF8000] hover:bg-[#FF9933] text-white' : isIndo ? 'bg-emerald-500 hover:bg-emerald-400 text-emerald-950' : 'bg-teal-500 hover:bg-teal-400 text-teal-950';

    const headText = 'text-white';
    const subText = 'text-white/40';
    const cardBgClass = 'bg-white/5 backdrop-blur-xl';
    const iconBgClass = 'bg-white/5 border-white/10';
    const dividerClass = 'bg-white/5';

    return (
      <section className={`relative py-14 md:py-28 bg-gradient-to-b ${gradientBg} overflow-hidden`} id="why-us">
        {/* Glow effects */}
        <div className={`absolute top-[-10%] right-[-5%] w-[400px] h-[400px] ${glowColor} rounded-full blur-[100px] pointer-events-none`}></div>
        <div className={`absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] ${glowColor} rounded-full blur-[100px] pointer-events-none`}></div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-10 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-full ${accentColor} font-outfit font-black text-[10px] md:text-xs tracking-[0.2em] mb-4 md:mb-6 uppercase`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'امتياز مضمون' : 'GUARANTEED EXCELLENCE'}</span>
            </motion.div>
            <h2 className={`text-3xl md:text-6xl font-sora font-black ${headText} tracking-tighter leading-none mb-3 md:mb-5 ${lang === 'ar' ? 'font-arabic' : ''}`}>
              {lang === 'ar' ? (
                <>لماذا تختار <span className={`${accentColor} italic`}>ترافنوك لمساعدة التأشيرات؟</span></>
              ) : (
                <>Why Choose <span className={`${accentColor} italic`}>Travnook Visa Assistance?</span></>
              )}
            </h2>
            <p className={`${subText} font-outfit text-sm md:text-lg max-w-xl mx-auto ${lang === 'ar' ? 'font-arabic opacity-80' : ''}`}>
              {lang === 'ar' ? 'سرعة، وضوح، وخصوصية تامة.' : 'Speed, clarity, and total privacy — in one seamless process.'}
            </p>
          </div>

          {/* Horizontal scroll cards */}
          <div className="flex overflow-x-auto gap-4 md:gap-6 pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            {guarantees.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`snap-center shrink-0 w-[70vw] md:w-[calc(20%-1rem)] ${cardBgClass} border ${cardBorder} rounded-2xl md:rounded-[2rem] p-5 md:p-7 group cursor-default relative overflow-hidden`}
              >
                {/* Gradient accent bar */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 ${dotColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl ${iconBgClass} border flex items-center justify-center ${accentColor} mb-5 md:mb-6 group-hover:scale-110 group-hover:bg-white/10 transition-all shadow-lg`}>
                  {item.icon}
                </div>

                <h3 className={`font-sora font-black ${headText} text-base md:text-lg mb-2 md:mb-3 tracking-tight group-hover:${accentColor} transition-colors ${lang === 'ar' ? 'font-arabic' : ''}`}>{item.title}</h3>
                <p className={`${subText} text-xs md:text-sm font-outfit leading-relaxed ${lang === 'ar' ? 'font-arabic opacity-80' : ''}`}>{item.desc}</p>

                <div className="mt-4 md:mt-6 flex items-center gap-2">
                  <div className={`h-px flex-1 ${dividerClass} group-hover:${dotColor} transition-colors`}></div>
                  <span className={`text-[9px] font-outfit font-black uppercase tracking-[0.3em] ${subText} group-hover:${accentColor} transition-colors`}>0{idx + 1}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-8 md:mt-14">
            <a
              href="https://wa.me/971544388038"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-3 ${btnBg} font-outfit font-black py-3.5 px-8 md:py-4 md:px-10 rounded-xl md:rounded-2xl shadow-xl transition-all hover:-translate-y-1 uppercase tracking-widest cursor-pointer text-sm ${lang === 'ar' ? 'font-arabic' : ''}`}
            >
              {lang === 'ar' ? 'ابدأ رحلتك الحين' : 'Start Your Journey'}
              <ArrowRight className={`w-5 h-5 ${lang === 'ar' ? 'rotate-180' : ''}`} />
            </a>
          </div>
        </div>

        <style dangerouslySetInnerHTML={{__html: `
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        `}} />
      </section>
    );
  }

  /* ──────────────────────────────────────────────
     SCHENGEN LAYOUT — Original bento grid (unchanged)
     ────────────────────────────────────────────── */
  const primaryBg = 'bg-brand-teal';
  const darkBg = 'bg-brand-dark';
  const accentText = 'text-brand-green';
  const badgeBg = 'bg-brand-teal/5';
  const badgeBorder = 'border-brand-teal/10';

  const bentoItems = [
    { ...guarantees[0], color: primaryBg, span: "md:col-span-2 md:row-span-2" },
    { ...guarantees[1], color: darkBg, span: "md:col-span-1" },
    { ...guarantees[2], color: primaryBg, span: "md:col-span-1" },
    { ...guarantees[3], color: primaryBg, span: "md:col-span-1" },
    { ...guarantees[4], color: darkBg, span: "md:col-span-1" }
  ];

  return (
    <section className="relative bg-[#F8F9F9] py-16 md:py-32" id="why-us">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-10 md:mb-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`inline-flex items-center gap-2 px-4 py-1.5 md:px-6 md:py-2 ${badgeBg} rounded-full text-brand-teal font-outfit font-black text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] mb-4 md:mb-8 border ${badgeBorder} uppercase`}
          >
            <CheckCircle2 className={`w-4 h-4 md:w-5 md:h-5 ${accentText}`} />
            <span>{lang === 'ar' ? 'امتياز مضمون' : 'GUARANTEED EXCELLENCE'}</span>
          </motion.div>
          <h2 className={`text-4xl md:text-7xl lg:text-8xl font-outfit font-black text-brand-teal tracking-tighter leading-none mb-4 md:mb-6 ${lang === 'ar' ? 'font-arabic' : ''}`}>
            {lang === 'ar' ? (
              <>حلول <span className="text-[#8EC436] italic font-sora">ذكية واحترافية</span></>
            ) : (
              <>Smart & <span className="text-[#8EC436] italic font-sora">Professional</span> Solutions</>
            )}
          </h2>
          <p className={`text-gray-400 font-outfit text-sm md:text-xl font-bold max-w-2xl mx-auto leading-relaxed px-4 ${lang === 'ar' ? 'font-arabic opacity-80' : ''}`}>
            {lang === 'ar' 
              ? `حجز مواعيد السفر لـ ${countryWord} بسرعة، وضوح، وخصوصية تامة.`
              : `Securing your ${countryWord} travel appointments with speed, clarity, and total privacy.`}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 font-outfit">
          {bentoItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              className={`relative p-6 md:p-8 lg:p-12 rounded-[2rem] md:rounded-[3rem] lg:rounded-[3.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden transition-all hover:scale-[1.02] ${item.color} ${item.span} text-white group`}
            >
              <div className="absolute top-0 right-0 p-6 md:p-10 opacity-5 group-hover:rotate-12 transition-transform">
                <Plane className="w-20 h-20 md:w-32 md:h-32 rotate-45" />
              </div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="mb-6 md:mb-10 lg:mb-16">
                  <div className={`inline-block p-4 md:p-6 bg-white/10 backdrop-blur-md rounded-2xl md:rounded-3xl ${accentText} transition-all shadow-xl mb-6 md:mb-10`}>
                    {item.icon}
                  </div>
                  <h3 className={`font-black tracking-tighter leading-none mb-3 md:mb-6 ${idx === 0 ? 'text-3xl md:text-6xl lg:text-7xl' : 'text-xl md:text-2xl lg:text-4xl'} ${lang === 'ar' ? 'font-arabic' : ''}`}>
                    {item.title}
                  </h3>
                  <p className={`text-white/60 leading-relaxed font-bold tracking-wide ${idx === 0 ? 'text-sm md:text-2xl max-w-xl' : 'text-xs md:text-base lg:text-xl'} ${lang === 'ar' ? 'font-arabic' : ''}`}>
                    {item.desc}
                  </p>
                </div>
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="h-0.5 flex-1 bg-white/10"></div>
                  <div className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-white/30">SUCCESS 0{idx + 1}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
