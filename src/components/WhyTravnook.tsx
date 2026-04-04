import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Package, UserCheck, Clock, HeartHandshake, FileCheck, Award, CheckCircle2 } from 'lucide-react';
import { getCountryConfig } from '../data/countryConfig';

interface WhyTravnookProps {
  lang?: 'en' | 'ar';
}

const WhyTravnook = ({ lang = 'en' }: WhyTravnookProps) => {
  const config = useMemo(() => getCountryConfig(), []);

  const features = config.countryName === 'Indonesia' ? [
    { en: "Submission Handling", ar: "معالجة التقديم", icon: <FileCheck className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} /> },
    { en: "Visa Specialist", ar: "متخصص فيزا", icon: <UserCheck className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} /> },
    { en: "10 Years Experience", ar: "10 سنوات خبرة", icon: <Clock className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} /> },
    { en: "Dedicated Assistance", ar: "مساعدة مخصصة", icon: <HeartHandshake className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} /> },
  ] : (config.countryName === 'Japan' || config.countryName === 'China') ? [
    { en: "Passport Collection & Return", ar: "استلام وتسليم الجواز", icon: <Package className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} /> },
    { en: "Visa Specialist", ar: "متخصص فيزا", icon: <UserCheck className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} /> },
    { en: "10 Years Experience", ar: "10 سنوات خبرة", icon: <Clock className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} /> },
    { en: "Dedicated Assistance", ar: "مساعدة مخصصة", icon: <HeartHandshake className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} /> },
  ] : [
    { en: "Fast Processing", ar: "معالجة سريعة", icon: <FileCheck className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} /> },
    { en: "Proven Track Record", ar: "سجل موثوق ومُثبت", icon: <Award className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} /> },
    { en: "Expert Guidance", ar: "إرشاد الخبراء", icon: <UserCheck className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} /> },
    { en: "24/7 Support", ar: "دعم 24/7", icon: <HeartHandshake className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} /> },
  ];

  const accentBg = config.countryName === 'Schengen' ? 'bg-brand-green'
    : config.countryName === 'Indonesia' ? 'bg-emerald-500'
      : config.countryName === 'Japan' ? 'bg-[#FF8000]'
        : 'bg-teal-500';

  const accentText = config.countryName === 'Schengen' ? 'text-brand-green'
    : config.countryName === 'Indonesia' ? 'text-emerald-600'
      : config.countryName === 'Japan' ? 'text-[#FF8000]'
        : 'text-teal-600';


  const pillBorder = config.countryName === 'Schengen' ? 'border-brand-green/20 bg-brand-green/5'
    : config.countryName === 'Indonesia' ? 'border-emerald-200 bg-emerald-50'
      : config.countryName === 'Japan' ? 'border-orange-200 bg-orange-50'
        : 'border-teal-200 bg-teal-50';

  return (
    <section className="py-8 md:py-14 bg-[#F8F9F9]">
      <div className="max-w-5xl mx-auto px-4 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl md:rounded-[2rem] shadow-[0_4px_30px_rgba(0,0,0,0.05)] border border-gray-100 p-6 md:p-10"
        >
          {/* Centered Heading */}
          <div className="text-center mb-7 md:mb-9">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className={`inline-flex items-center gap-2 ${accentBg} text-white rounded-full px-4 py-1.5 mb-4 md:mb-5`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={3} />
              <span className="font-outfit font-black text-[10px] md:text-xs tracking-[0.2em] uppercase">
                {lang === 'ar' ? 'لماذا نحن' : 'WHY US'}
              </span>
            </motion.div>
            <h2 className={`font-sora font-black text-3xl md:text-4xl lg:text-5xl ${config.themeColor.primary} tracking-tighter leading-[1.1] ${lang === 'ar' ? 'font-arabic' : ''}`}>
              {lang === 'ar' ? 'لماذا' : 'Why'}{' '}
              <span className={`${accentText} italic`}>Travnook</span>
              <span className="text-gray-300">?!</span>
            </h2>
          </div>

          {/* 2x2 feature cards */}
          <div className={`grid grid-cols-2 gap-3 md:gap-4 ${lang === 'ar' ? 'dir-rtl' : ''}`}>
            {features.map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 * i, duration: 0.4 }}
                className={`flex flex-col items-center text-center gap-3 md:gap-4 rounded-2xl border ${pillBorder} px-4 py-5 md:px-6 md:py-7 cursor-default group transition-all duration-300 hover:shadow-md`}
              >
                <div className={`${accentBg} text-white w-11 h-11 md:w-13 md:h-13 rounded-xl md:rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:rotate-[-3deg] transition-all duration-300`}>
                  {feat.icon}
                </div>
                <span className={`font-outfit font-bold text-sm md:text-base ${config.themeColor.primary} leading-tight ${lang === 'ar' ? 'font-arabic' : ''}`}>
                  {lang === 'ar' ? feat.ar : feat.en}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyTravnook;
