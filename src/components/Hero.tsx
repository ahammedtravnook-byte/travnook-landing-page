import { useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Plane, MoveRight, Cloud, CalendarCheck } from 'lucide-react';
import { getCountryConfig, getImagePath } from '../data/countryConfig';

interface HeroProps {
  lang?: 'en' | 'ar';
}

const Hero = ({ lang = 'en' }: HeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const config = useMemo(() => getCountryConfig(), []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-text',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power4.out', delay: 0.2 }
      );

      gsap.fromTo('.hero-image',
        { scale: 0.9, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: 'power3.out' }
      );

      // Special animations for China collage elements
      if (config.countryName === 'China') {
        gsap.fromTo('.hero-china-portal',
          { scale: 0.8, opacity: 0, rotate: -5 },
          { scale: 1, opacity: 1, rotate: 0, duration: 1.2, delay: 0.6, ease: 'expo.out' }
        );
        gsap.to('.hero-china-accents', { y: 20, duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      }

      gsap.to('.hero-cloud-1', { x: 30, y: -10, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('.hero-cloud-2', { x: -40, y: 15, duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('.hero-cloud-3', { x: 20, y: 20, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut' });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Determine accent color for the main background
  const bgClass = config.countryName === 'Schengen' ? 'bg-brand-yellow'
    : config.countryName === 'Indonesia' ? 'bg-emerald-500'
      : 'bg-teal-600';

  const overlayClass = config.countryName === 'Schengen' ? 'bg-brand-teal'
    : config.countryName === 'Indonesia' ? 'bg-emerald-900'
      : 'bg-teal-900';

  // Determine button color
  const btnClass = config.countryName === 'Schengen' ? 'bg-brand-green hover:bg-brand-yellow text-white'
    : config.countryName === 'Indonesia' ? 'bg-emerald-400 hover:bg-emerald-300 text-emerald-950'
      : 'bg-[#FF8000] hover:bg-[#FF9933] text-white';

  const badgeIconClass = config.countryName === 'Schengen' ? 'text-brand-green'
    : config.countryName === 'Indonesia' ? 'text-emerald-300'
      : 'text-[#FF8000]';

  const badgeTextClass = config.countryName === 'Schengen' ? 'text-brand-yellow'
    : config.countryName === 'Indonesia' ? 'text-emerald-100'
      : 'text-[#FF9933]';

  return (
    <div ref={containerRef} className={`relative z-10 w-full min-h-[90vh] lg:min-h-[110vh] ${bgClass} overflow-hidden flex items-center pt-20 lg:pt-0 pb-10 lg:pb-0`} id="home">

      {/* Distinct Background Splits */}
      {config.countryName === 'Japan' && (
        <div
          className={`absolute top-0 left-0 w-full h-full bg-slate-900 z-0 pointer-events-none`}
          style={{
            clipPath: window.innerWidth > 1024
              ? 'polygon(0 0, 80% 0, 30% 100%, 0% 100%)' // Sweeping vertical slice
              : 'polygon(0 0, 100% 0, 100% 60%, 0% 100%)',
          }}
        >
          <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-cover bg-center" style={{ backgroundImage: `url('${getImagePath(config.hero.image)}')` }}></div>
          {/* Subtle gradient overlay to soften edges for Japan */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-900/50"></div>
        </div>
      )}

      {config.countryName === 'Indonesia' && (
        <>
          {/* Immersive background image with very dark overlay for contrast */}
          <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
            <div className="absolute inset-0 bg-cover bg-center brightness-[0.4] filter blur-[2px]" style={{ backgroundImage: `url('${getImagePath(config.hero.image)}')` }}></div>
            <div className="absolute inset-0 bg-emerald-950/70 mix-blend-multiply"></div>
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-emerald-900 to-transparent"></div>
          </div>
          {/* Decorative sweeping light ray */}
          <div className="absolute top-0 right-0 w-[80%] h-full bg-gradient-to-l from-emerald-400/20 to-transparent z-0 pointer-events-none transform skew-x-[-20deg] translate-x-20"></div>
        </>
      )}

      {config.countryName === 'China' && (
        <div
          className={`absolute top-0 left-0 w-full h-full ${overlayClass} z-0 pointer-events-none`}
          style={{
            clipPath: window.innerWidth > 1024
              ? 'polygon(0 0, 60% 0, 40% 100%, 0% 100%)' // Tighter angle
              : 'polygon(0 0, 100% 0, 100% 50%, 0% 100%)',
            boxShadow: '10px 0 30px rgba(0,0,0,0.4)'
          }}
        >
          <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-cover bg-center" style={{ backgroundImage: `url('${getImagePath(config.hero.image)}')` }}></div>
        </div>
      )}

      {config.countryName === 'Schengen' && (
        <div
          className={`absolute top-0 left-0 w-full h-full ${overlayClass} z-0 pointer-events-none`}
          style={{
            clipPath: window.innerWidth > 1024
              ? 'polygon(0 0, 75% 0, 45% 100%, 0% 100%)'
              : 'polygon(0 0, 100% 0, 100% 55%, 0% 100%)',
            boxShadow: '10px 0 20px rgba(0,0,0,0.5)'
          }}
        >
          <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-cover bg-center" style={{ backgroundImage: `url('${getImagePath(config.hero.image)}')` }}></div>
        </div>
      )}

      {/* Wavy/Ripped edge illusion */}
      <svg className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none opacity-20 lg:opacity-100" preserveAspectRatio="none" viewBox="0 0 1000 1000">
        <path d="M750,0 Q730,100 710,200 T650,400 T580,600 T520,800 T450,1000 L440,1000 L740,0 Z" fill="#ffffff" />
      </svg>

      {/* Floating Clouds */}
      <Cloud className="hero-cloud-1 absolute top-[15%] left-[10%] lg:left-[60%] text-white/50 lg:text-white/80 w-16 h-16 lg:w-32 lg:h-32 z-10" fill="currentColor" />
      <Cloud className="hero-cloud-2 absolute top-[25%] left-[80%] text-white/30 lg:text-white/50 w-12 h-12 lg:w-20 lg:h-20 z-10" fill="currentColor" />
      <Cloud className="hero-cloud-3 absolute top-[60%] lg:top-[70%] left-[5%] lg:left-[40%] text-white/10 w-24 h-24 lg:w-40 lg:h-40 z-10" fill="currentColor" />

      {/* Dotted Airplane Path */}
      <svg className="hidden lg:block absolute top-0 left-0 w-full h-full z-10 pointer-events-none" viewBox="0 0 1000 1000" preserveAspectRatio="none">
        <path d="M 200 400 Q 500 200 850 500" fill="transparent" stroke="white" strokeWidth="4" strokeDasharray="15 20" strokeLinecap="round" opacity="0.4" />
      </svg>
      <Plane className={`absolute top-[6%] right-[5%] md:right-auto md:left-[10%] lg:top-[14%] lg:left-[25%] text-white w-8 h-8 md:w-6 md:h-6 lg:w-12 lg:h-12 -rotate-45 z-[40] drop-shadow-xl opacity-60 md:opacity-100 ${lang === 'ar' ? 'md:left-auto md:right-[10%] lg:right-[25%]' : ''}`} fill="currentColor" />

      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-12 items-center">

        {/* Content */}
        <div className={`lg:col-span-6 text-center lg:text-left relative z-30 pt-4 pb-2 lg:pt-10 lg:pb-20 mt-0 ${lang === 'ar' ? 'lg:text-right' : ''}`}>
          {/* ========== MOBILE HERO LAYOUT ========== */}
          {/* Badge: "JAPAN VISA SERVICE" with accent bar */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="hero-text md:hidden flex flex-col items-center mb-5"
          >
            <span className={`font-outfit font-black text-[11px] tracking-[0.25em] uppercase text-white/90 px-6 py-2 rounded-sm ${lang === 'ar' ? 'font-arabic' : ''}`}
              style={{ background: config.countryName === 'Schengen'
                ? 'linear-gradient(90deg, transparent, #C8A200, #E6B800, #C8A200, transparent)'
                : config.countryName === 'Indonesia'
                  ? 'linear-gradient(90deg, transparent, #059669, #10B981, #059669, transparent)'
                  : 'linear-gradient(90deg, transparent, #E06800, #FF8000, #E06800, transparent)' }}
            >
              {lang === 'ar'
                ? `خدمة تأشيرة ${config.countryName === 'Schengen' ? 'شنغن' : config.countryName === 'Japan' ? 'اليابان' : config.countryName === 'China' ? 'الصين' : 'إندونيسيا'}`
                : `${config.countryName === 'Schengen' ? 'SCHENGEN' : config.countryName.toUpperCase()} VISA SERVICE`}
            </span>
          </motion.div>

          {/* Heading: "Japan Visa Assistance" + flag */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className={`hero-text md:hidden text-white font-outfit font-black text-[2rem] leading-[1.15] mb-5 drop-shadow-2xl tracking-tight flex items-center justify-center gap-3 ${lang === 'ar' ? 'font-arabic flex-row-reverse' : ''}`}
          >
            <span>
              {lang === 'ar'
                ? `مساعدة تأشيرة ${config.countryName === 'Schengen' ? 'شنغن' : config.countryName === 'Japan' ? 'اليابان' : config.countryName === 'China' ? 'الصين' : 'إندونيسيا'}`
                : `${config.countryName} Visa Assistance`}
            </span>
            <span className="w-10 h-10 rounded-full border-[2px] border-white/60 bg-white shadow-[0_0_20px_rgba(255,255,255,0.3)] overflow-hidden flex items-center justify-center shrink-0">
              {config.countryName === 'Japan' && (
                <svg viewBox="0 0 900 600" className="w-full h-full"><rect fill="#fff" width="900" height="600"/><circle fill="#bc002d" cx="450" cy="300" r="180"/></svg>
              )}
              {config.countryName === 'China' && (
                <svg viewBox="0 0 900 600" className="w-full h-full"><rect fill="#de2910" width="900" height="600"/><g fill="#ffde00" transform="translate(150,200)"><polygon points="0,-60 17,-18 57,-23 27,7 35,48 0,25 -35,48 -27,7 -57,-23 -17,-18"/></g></svg>
              )}
              {config.countryName === 'Indonesia' && (
                <svg viewBox="0 0 900 600" className="w-full h-full"><rect fill="#ff0000" width="900" height="300"/><rect fill="#fff" y="300" width="900" height="300"/></svg>
              )}
              {config.countryName === 'Schengen' && (
                <svg viewBox="0 0 810 540" className="w-full h-full"><rect fill="#003399" width="810" height="540"/><g fill="#ffcc00" transform="translate(405,270)">{[...Array(12)].map((_,i)=><polygon key={i} points="0,-175 7,-155 20,-155 10,-143 14,-125 0,-135 -14,-125 -10,-143 -20,-155 -7,-155" transform={`rotate(${i*30})`}/>)}</g></svg>
              )}
            </span>
          </motion.h1>

          {/* Three service pills */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.4 }}
            className={`hero-text md:hidden flex flex-wrap justify-center gap-2 mb-2 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}
          >
            {(config.countryName === 'Indonesia' ? [
              { en: 'Submission Handling', ar: 'معالجة التقديم' },
              { en: 'Document Review', ar: 'مراجعة المستندات' },
              { en: 'End-to-End Support', ar: 'دعم شامل' },
            ] : [
              { en: 'Appointment Booking', ar: 'حجز المواعيد' },
              { en: 'Document Review', ar: 'مراجعة المستندات' },
              { en: 'End-to-End Support', ar: 'دعم شامل' },
            ]).map((tag, i) => (
              <span
                key={i}
                className={`bg-white/[0.08] backdrop-blur-sm border border-white/[0.15] text-white/80 font-outfit font-bold text-[10px] tracking-wider uppercase px-3.5 py-2 rounded-xl ${lang === 'ar' ? 'font-arabic' : ''}`}
              >
                {lang === 'ar' ? tag.ar : tag.en}
              </span>
            ))}
          </motion.div>

          {/* ========== DESKTOP HERO LAYOUT (unchanged) ========== */}
          {/* Desktop badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`hero-text hidden md:inline-flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-3 md:mb-6 ${badgeTextClass} font-outfit font-black text-[10px] md:text-xs tracking-widest uppercase italic`}
          >
            <CalendarCheck className={`w-3.5 h-3.5 md:w-5 md:h-5 ${badgeIconClass}`} />
            <span>{lang === 'ar' ? 'مساعدة خبراء التأشيرات' : 'EXPERT VISA ASSISTANCE'}</span>
          </motion.div>

          {/* Desktop Main Heading */}
          <h1 className={`hero-text hidden md:block text-white font-outfit font-black text-6xl lg:text-8xl leading-[1.1] mb-6 drop-shadow-2xl tracking-tighter ${lang === 'ar' ? 'font-arabic' : ''}`}>
            <span className="text-[1em] block opacity-90 tracking-wide">
              {(lang === 'ar' ? config.hero.ar?.titlePrefix : config.hero.titlePrefix)?.toUpperCase()}
            </span>
            <span className={`${(config.countryName === 'China' || config.countryName === 'Japan') ? 'inline-block' : 'block'} [text-shadow:_0_4px_30px_rgba(0,0,0,0.4)]`}>
              {(lang === 'ar' ? config.hero.ar?.titleHighlight : config.hero.titleHighlight)?.toUpperCase()}
            </span>
            <span className={`inline-flex items-center gap-4 mt-4 ${(config.countryName === 'China' || config.countryName === 'Japan') ? 'inline-flex' : 'flex'}`}>
              <span className={`${badgeTextClass} font-script text-[1.25em] font-normal drop-shadow-xl`}>
                {lang === 'ar' ? config.hero.ar?.titleSuffix : config.hero.titleSuffix}
              </span>
              <span className="w-16 h-16 rounded-full border-[3px] border-white/60 bg-white shadow-[0_0_25px_rgba(255,255,255,0.35)] overflow-hidden flex items-center justify-center shrink-0">
                {config.countryName === 'Japan' && (
                  <svg viewBox="0 0 900 600" className="w-full h-full"><rect fill="#fff" width="900" height="600"/><circle fill="#bc002d" cx="450" cy="300" r="180"/></svg>
                )}
                {config.countryName === 'China' && (
                  <svg viewBox="0 0 900 600" className="w-full h-full"><rect fill="#de2910" width="900" height="600"/><g fill="#ffde00" transform="translate(150,200)"><polygon points="0,-60 17,-18 57,-23 27,7 35,48 0,25 -35,48 -27,7 -57,-23 -17,-18"/></g></svg>
                )}
                {config.countryName === 'Indonesia' && (
                  <svg viewBox="0 0 900 600" className="w-full h-full"><rect fill="#ff0000" width="900" height="300"/><rect fill="#fff" y="300" width="900" height="300"/></svg>
                )}
                {config.countryName === 'Schengen' && (
                  <svg viewBox="0 0 810 540" className="w-full h-full"><rect fill="#003399" width="810" height="540"/><g fill="#ffcc00" transform="translate(405,270)">{[...Array(12)].map((_,i)=><polygon key={i} points="0,-175 7,-155 20,-155 10,-143 14,-125 0,-135 -14,-125 -10,-143 -20,-155 -7,-155" transform={`rotate(${i*30})`}/>)}</g></svg>
                )}
              </span>
            </span>
          </h1>

          {/* Desktop subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className={`hero-text hidden md:block text-white/60 font-outfit text-base max-w-md lg:mx-0 mb-8 leading-relaxed tracking-wide ${lang === 'ar' ? 'font-arabic' : ''}`}
          >
            {lang === 'ar' ? 'نساعدك في كل خطوة من عملية التأشيرة بسهولة واحترافية' : 'We handle your entire visa process with expertise & care'}
          </motion.p>

          {/* CTA Buttons — hidden on mobile, shown on desktop */}
          <div className="hero-text hidden lg:flex flex-row gap-3 md:gap-4 justify-start">
            <a
              href="https://wa.me/971544388038"
              target="_blank"
              rel="noopener noreferrer"
              className={`${btnClass} font-outfit font-black py-3.5 px-10 md:py-5 md:px-10 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.2)] transition-all hover:scale-105 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] flex items-center justify-center gap-2 text-sm md:text-lg uppercase tracking-widest cursor-pointer md:flex-none`}
            >
              {lang === 'ar' ? 'ابدأ الآن' : 'Get Started'}
              <MoveRight className={`w-5 h-5 md:w-6 h-6 ${lang === 'ar' ? 'rotate-180' : ''}`} />
            </a>
            <a
              href="#appointments"
              className="hidden md:flex bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 text-white font-outfit font-black py-3 px-4 md:py-5 md:px-8 rounded-2xl transition-all items-center justify-center text-sm md:text-lg uppercase tracking-widest cursor-pointer flex-1 md:flex-none"
            >
              {lang === 'ar' ? 'خدماتنا' : 'Services'}
            </a>
          </div>
        </div>

        {/* Character/Image Container */}
        <div className={`lg:col-span-6 relative flex items-center justify-center mt-4 lg:mt-0 ${config.countryName === 'Japan' ? 'h-[250px] sm:h-[400px] md:h-[650px]' :
          config.countryName === 'China' ? 'h-[320px] sm:h-[450px] md:h-[600px]' :
            'h-[300px] sm:h-[400px] md:h-[600px]'
          }`}>
          <div className={`relative w-full h-full mx-auto ${config.countryName === 'China' ? 'max-w-xs sm:max-w-sm md:max-w-md lg:mr-0 lg:ml-auto' :
            config.countryName === 'Japan' ? 'max-w-xs sm:max-w-sm md:max-w-lg' :
              config.countryName === 'Indonesia' ? 'max-w-[300px] sm:max-w-sm md:max-w-md lg:mr-0 lg:ml-auto' :
                'max-w-[280px] sm:max-w-xs md:max-w-none'
            }`}>

            {/* Indonesia Specific Enhanced UI */}
            {config.countryName === 'Indonesia' && (
              <div className="relative w-full h-full flex items-center justify-center p-4">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-emerald-400/5 rounded-full blur-3xl pointer-events-none"></div>
                <div className="relative z-20 group">
                  <div className="absolute -inset-4 bg-white/5 backdrop-blur-sm rounded-[3rem] border border-white/20 -z-10 transform -rotate-3"></div>
                  <img
                    src={getImagePath(config.hero.image)}
                    alt="Explore Indonesia"
                    className="hero-image w-full h-[300px] sm:h-[380px] md:h-[480px] object-cover rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.5)] border-4 border-white/10"
                  />
                  <div className="absolute -bottom-4 right-10 w-40 h-3 bg-emerald-400/20 rounded-full blur-md"></div>
                </div>
              </div>
            )}

            {/* China Specific Enhanced UI - The Forbidden Gate */}
            {config.countryName === 'China' && (
              <div className="relative w-full h-full flex items-center justify-center p-4">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-red-600/10 rounded-full blur-[120px] pointer-events-none"></div>

                {/* Outermost Modern Portal Frame */}
                <div className="hero-china-portal absolute inset-0 border-[1px] border-white/20 bg-white/5 backdrop-blur-[2px] rounded-[3rem] transform rotate-3 z-0 shadow-2xl scale-105"></div>

                {/* Secondary Offset Frame (Modern Gold accent) */}
                <div className="hero-china-portal absolute inset-0 border-2 border-[#FF8000]/20 bg-transparent rounded-[2.5rem] transform -rotate-2 z-10 translate-x-2 translate-y-2"></div>

                {/* Primary Image Container (Geometric Octagon-ish) */}
                <div className="hero-china-portal relative z-20 w-full h-[320px] sm:h-[450px] md:h-[550px] overflow-hidden rounded-[4rem] border-4 border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.7)] group">
                  <img
                    src={getImagePath(config.hero.image)}
                    alt="Explore China"
                    className="hero-image w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  {/* Artistic Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-red-900/40 opacity-70 group-hover:opacity-50 transition-opacity duration-700"></div>
                </div>

                {/* Modern Geometric Accents */}
                <div className="hero-china-accents absolute -top-8 -left-8 w-20 h-20 border-l border-t border-white/40 rounded-tl-[2rem] z-30 opacity-60"></div>
                <div className="hero-china-accents absolute -bottom-8 -right-8 w-32 h-32 border-r border-b border-[#FF8000]/40 rounded-br-[3rem] z-30 opacity-60"></div>

                {/* Subtle Floating Orbs */}
                <div className="hero-china-accents absolute top-[10%] right-[-10%] w-12 h-12 bg-[#FF8000]/10 rounded-full blur-xl z-30 animate-pulse"></div>
              </div>
            )}

            {/* Default/Japan UI */}
            {(config.countryName !== 'Indonesia' && config.countryName !== 'China') && (
              <img
                src={getImagePath(config.countryName === 'Schengen' ? "/images/traveler_girl_suitcase_1773825084497.png" : config.hero.image)}
                alt={`${config.countryName} Traveler`}
                className={`hero-image absolute inset-0 w-full h-full filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)] z-20 ${config.countryName === 'Schengen' ? 'object-contain mix-blend-multiply' :
                  config.countryName === 'Japan' ? 'object-cover rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.4)] border shadow-white/10 border-white/20 transform rotate-2' :
                    'object-cover rounded-full lg:rounded-[3rem] shadow-2xl border-4 border-white/20'
                  }`}
              />
            )}

            {/* Japan Offset Glass Frame Effect */}
            {config.countryName === 'Japan' && (
              <div className="absolute inset-0 w-full h-full border border-white/40 bg-white/10 backdrop-blur-sm rounded-2xl transform -rotate-3 z-10 translate-x-4 translate-y-4 shadow-xl pointer-events-none"></div>
            )}
          </div>
        </div>

        {/* Mobile-only CTA below image */}
        <div className="hero-text lg:hidden flex justify-center mt-12">
          <a
            href="https://wa.me/971544388038"
            target="_blank"
            rel="noopener noreferrer"
            className={`${btnClass} font-outfit font-black py-3.5 px-12 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.2)] transition-all hover:scale-105 flex items-center justify-center gap-2 text-sm uppercase tracking-widest cursor-pointer`}
          >
            {lang === 'ar' ? 'ابدأ الآن' : 'Get Started'}
            <MoveRight className={`w-5 h-5 ${lang === 'ar' ? 'rotate-180' : ''}`} />
          </a>
        </div>

      </div>

      {/* Bottom transition */}
      <div className="absolute -bottom-1 left-0 w-full z-30">
        <svg viewBox="0 0 1440 120" className="w-full h-auto block" preserveAspectRatio="none">
          <path fill="#F8F9F9" d="M0,60 C320,160 420,-60 1440,60 L1440,121 L0,121 Z"></path>
        </svg>
      </div>

    </div>
  );
};

export default Hero;
