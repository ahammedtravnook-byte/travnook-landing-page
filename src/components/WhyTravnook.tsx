import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Package, UserCheck, Clock, HeartHandshake, FileCheck, Sparkles } from 'lucide-react';
import { getCountryConfig } from '../data/countryConfig';

interface WhyTravnookProps {
  lang?: 'en' | 'ar';
}

const WhyTravnook = ({ lang = 'en' }: WhyTravnookProps) => {
  const config = useMemo(() => getCountryConfig(), []);

  const features = config.countryName === 'Indonesia' ? [
    { en: "Submission Handling", ar: "معالجة التقديم", icon: <FileCheck className="w-6 h-6 md:w-7 md:h-7" /> },
    { en: "Visa Specialist", ar: "متخصص فيزا", icon: <UserCheck className="w-6 h-6 md:w-7 md:h-7" /> },
    { en: "10 Years Experience", ar: "10 سنوات خبرة", icon: <Clock className="w-6 h-6 md:w-7 md:h-7" /> },
    { en: "Dedicated Assistance", ar: "مساعدة مخصصة", icon: <HeartHandshake className="w-6 h-6 md:w-7 md:h-7" /> },
  ] : (config.countryName === 'Japan' || config.countryName === 'China') ? [
    { en: "Passport Collection & Return", ar: "استلام وتسليم الجواز", icon: <Package className="w-6 h-6 md:w-7 md:h-7" /> },
    { en: "Visa Specialist", ar: "متخصص فيزا", icon: <UserCheck className="w-6 h-6 md:w-7 md:h-7" /> },
    { en: "10 Years Experience", ar: "10 سنوات خبرة", icon: <Clock className="w-6 h-6 md:w-7 md:h-7" /> },
    { en: "Dedicated Assistance", ar: "مساعدة مخصصة", icon: <HeartHandshake className="w-6 h-6 md:w-7 md:h-7" /> },
  ] : [
    { en: "Fast Processing", ar: "معالجة سريعة", icon: <FileCheck className="w-6 h-6 md:w-7 md:h-7" /> },
    { en: "High Success Rate", ar: "نسبة نجاح عالية", icon: <UserCheck className="w-6 h-6 md:w-7 md:h-7" /> },
    { en: "Expert Guidance", ar: "إرشاد الخبراء", icon: <Clock className="w-6 h-6 md:w-7 md:h-7" /> },
    { en: "24/7 Support", ar: "دعم 24/7", icon: <HeartHandshake className="w-6 h-6 md:w-7 md:h-7" /> },
  ];

  // Theme colors
  const accentColor = config.countryName === 'Schengen' ? 'text-brand-green'
    : config.countryName === 'Indonesia' ? 'text-emerald-500'
      : config.countryName === 'Japan' ? 'text-[#FF8000]'
        : 'text-teal-500';

  const accentBg = config.countryName === 'Schengen' ? 'bg-brand-green/10'
    : config.countryName === 'Indonesia' ? 'bg-emerald-500/10'
      : config.countryName === 'Japan' ? 'bg-[#FF8000]/10'
        : 'bg-teal-500/10';

  const glowColor = config.countryName === 'Schengen' ? 'shadow-brand-green/20'
    : config.countryName === 'Indonesia' ? 'shadow-emerald-500/20'
      : config.countryName === 'Japan' ? 'shadow-[#FF8000]/20'
        : 'shadow-teal-500/20';

  const borderHover = config.countryName === 'Schengen' ? 'hover:border-brand-green/30'
    : config.countryName === 'Indonesia' ? 'hover:border-emerald-500/30'
      : config.countryName === 'Japan' ? 'hover:border-[#FF8000]/30'
        : 'hover:border-teal-500/30';

  const dotBg = config.countryName === 'Schengen' ? 'bg-brand-green'
    : config.countryName === 'Indonesia' ? 'bg-emerald-500'
      : config.countryName === 'Japan' ? 'bg-[#FF8000]'
        : 'bg-teal-500';

  return (
    <section className="py-14 md:py-20 bg-[#F8F9F9] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] ${accentBg} rounded-full blur-[150px] opacity-50 pointer-events-none`}></div>

      <div className="max-w-5xl mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={`inline-flex items-center gap-2 px-5 py-2 bg-white shadow-sm rounded-full ${accentColor} font-outfit font-black text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] mb-5 md:mb-6 border border-gray-100 uppercase`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{lang === 'ar' ? 'لماذا نحن' : 'WHY US'}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`text-3xl md:text-5xl lg:text-6xl font-sora font-black ${config.themeColor.primary} leading-[1.1] tracking-tighter ${lang === 'ar' ? 'font-arabic' : ''}`}
          >
            {lang === 'ar' ? 'لماذا' : 'Why'}{' '}
            <span className={`${config.themeColor.secondary} italic`}>Travnook</span>
            <span className={accentColor}>?!</span>
          </motion.h2>
        </div>

        {/* Feature Cards Grid */}
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 ${lang === 'ar' ? 'dir-rtl' : ''}`}>
          {features.map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className={`group relative bg-white rounded-2xl md:rounded-3xl p-5 md:p-7 border border-gray-100 ${borderHover} transition-all duration-300 hover:shadow-xl hover:${glowColor} cursor-default`}
            >
              {/* Accent dot */}
              <div className={`absolute top-4 ${lang === 'ar' ? 'left-4' : 'right-4'} w-2 h-2 ${dotBg} rounded-full opacity-40 group-hover:opacity-100 group-hover:shadow-[0_0_12px_currentColor] transition-all`}></div>

              {/* Icon */}
              <div className={`${accentBg} ${accentColor} w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-5 group-hover:scale-110 transition-transform duration-300`}>
                {feat.icon}
              </div>

              {/* Text */}
              <h3 className={`font-outfit font-bold text-sm md:text-base ${config.themeColor.primary} leading-tight tracking-tight ${lang === 'ar' ? 'font-arabic' : ''}`}>
                {lang === 'ar' ? feat.ar : feat.en}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyTravnook;
