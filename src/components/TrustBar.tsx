import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, Clock, BadgeCheck } from 'lucide-react';
import { getCountryConfig } from '../data/countryConfig';

interface Props {
  lang?: 'en' | 'ar';
}

const TrustBar = ({ lang = 'en' }: Props) => {
  const config = useMemo(() => getCountryConfig(), []);
  const isAlt = config.countryName !== 'Schengen';

  const isJapan = config.countryName === 'Japan';
  const isIndo = config.countryName === 'Indonesia';

  const iconColor1 = config.countryName === 'Schengen' ? 'text-brand-yellow'
    : isJapan ? 'text-sky-500'
      : isIndo ? 'text-orange-500'
        : 'text-orange-500';
  const iconColor2 = config.countryName === 'Schengen' ? 'text-brand-green'
    : isJapan ? 'text-cyan-500'
      : isIndo ? 'text-emerald-500'
        : 'text-teal-500';
  const iconColor3 = config.countryName === 'Schengen' ? 'text-brand-teal'
    : isJapan ? 'text-sky-800'
      : isIndo ? 'text-emerald-800'
        : 'text-teal-800';

  const trustItems = lang === 'ar' ? [
    { icon: <Award className={`w-5 h-5 md:w-7 md:h-7 ${iconColor1}`} />, text: "فريق مساعدة تأشيرات خبير" },
    { icon: <Clock className={`w-5 h-5 md:w-7 md:h-7 ${iconColor2}`} />, text: "نخدم سكان الإمارات لأكثر من 10 سنوات" },
    { icon: <ShieldCheck className={`w-5 h-5 md:w-7 md:h-7 ${iconColor3}`} />, text: "عملية شفافة وتواصل واضح" },
    { icon: <BadgeCheck className={`w-5 h-5 md:w-7 md:h-7 ${iconColor1}`} />, text: "دعم شامل لطلب التأشيرة" }
  ] : [
    { icon: <Award className={`w-5 h-5 md:w-7 md:h-7 ${iconColor1}`} />, text: "Experienced Visa Assistance Team" },
    { icon: <Clock className={`w-5 h-5 md:w-7 md:h-7 ${iconColor2}`} />, text: "Serving UAE Residents for 10+ Years" },
    { icon: <ShieldCheck className={`w-5 h-5 md:w-7 md:h-7 ${iconColor3}`} />, text: "Transparent Process & Communication" },
    { icon: <BadgeCheck className={`w-5 h-5 md:w-7 md:h-7 ${iconColor1}`} />, text: "Comprehensive Application Support" }
  ];

  /* ──────────────────────────────────────────────
     ALT LAYOUT — Indonesia / China
     Marquee-style scrolling trust indicators
     ────────────────────────────────────────────── */
  if (isAlt) {
    return (
      <section className="relative z-40 -mt-8 md:-mt-14 pb-6 md:pb-10 w-full px-4 hidden md:block">


        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.33%); }
          }
          .animate-marquee {
            animation: marquee 20s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}} />
      </section>
    );
  }

  /* ──────────────────────────────────────────────
     SCHENGEN LAYOUT — Original (unchanged)
     ────────────────────────────────────────────── */
  const glowA = 'bg-brand-yellow/10';
  const glowB = 'bg-brand-teal/10';

  return (
    <section className="relative z-40 -mt-10 md:-mt-16 pb-8 md:pb-12 w-full px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/70 backdrop-blur-2xl border border-white rounded-2xl md:rounded-[2rem] p-4 md:p-6 shadow-float grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 relative overflow-hidden">
          <div className={`absolute top-0 right-0 w-64 h-64 ${glowA} rounded-full blur-3xl`}></div>
          <div className={`absolute bottom-0 left-0 w-64 h-64 ${glowB} rounded-full blur-3xl`}></div>
          {trustItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15, duration: 0.6, type: "spring" }}
              viewport={{ once: true, margin: "-50px" }}
              className="flex flex-col items-center justify-center text-center gap-2 md:gap-3 p-2 md:p-4 relative z-10 group"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:-translate-y-2 group-hover:shadow-glow transition-all duration-300">
                {item.icon}
              </div>
              <p className="font-bold text-[12px] md:text-[15px] leading-tight max-w-[130px] md:max-w-[150px] transition-colors text-brand-dark">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
