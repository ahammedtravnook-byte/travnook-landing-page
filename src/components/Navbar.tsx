import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, MessageCircle, ArrowRight, Plane, ShieldCheck, Star, Award } from 'lucide-react';
import { getCountryConfig, getImagePath } from '../data/countryConfig';

interface NavbarProps {
  forceSolidMode?: boolean;
  lang?: 'en' | 'ar';
  toggleLang?: () => void;
}

const Navbar = ({ forceSolidMode = false, lang = 'en', toggleLang }: NavbarProps) => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [brandPhase, setBrandPhase] = useState(0); // 0 = Travnook, 1 = Reviews
  const config = useMemo(() => getCountryConfig(), []);

  useEffect(() => {
    const timer = setInterval(() => {
      setBrandPhase((p) => (p === 0 ? 1 : 0));
    }, 3000);
    return () => clearInterval(timer);
  }, []);
  const isAlt = config.countryName !== 'Schengen';

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const navLinks = [
    { name: lang === 'ar' ? 'الرئيسة' : 'Home', href: '#home' },
    { name: lang === 'ar' ? 'من نحن' : 'About Us', href: '#about-us' },
    { name: lang === 'ar' ? 'المواعيد' : 'Appointments', href: '#appointments' },
    { name: lang === 'ar' ? 'الإجراءات' : 'Process', href: '#process' },
    { name: lang === 'ar' ? 'تواصل معنا' : 'Contact', href: '#contact' }
  ];

  // Dynamic colors
  const hoverClass = config.countryName === 'Schengen' ? 'hover:text-brand-yellow'
                    : config.countryName === 'Indonesia' ? 'hover:text-emerald-400'
                    : 'hover:text-orange-400';

  const scrolledHoverClass = config.countryName === 'Schengen' ? 'hover:text-brand-teal'
                            : config.countryName === 'Indonesia' ? 'hover:text-emerald-700'
                            : 'hover:text-teal-700';

  const menuBgPrimary = config.countryName === 'Schengen' ? 'bg-brand-teal'
                       : config.countryName === 'Indonesia' ? 'bg-emerald-900'
                       : 'bg-teal-900';

  const menuBtnBg = config.countryName === 'Schengen' ? 'bg-brand-green hover:bg-brand-yellow'
                   : config.countryName === 'Indonesia' ? 'bg-emerald-500 hover:bg-emerald-400'
                   : 'bg-teal-500 hover:bg-teal-400';

  const menuTextHover = config.countryName === 'Schengen' ? 'group-hover:text-brand-green'
                       : config.countryName === 'Indonesia' ? 'group-hover:text-emerald-500'
                       : 'group-hover:text-teal-500';

  const menuDotColor = config.countryName === 'Schengen' ? 'bg-brand-green'
                      : config.countryName === 'Indonesia' ? 'bg-emerald-500'
                      : 'bg-teal-500';

  const badgeColor = config.countryName === 'Schengen' ? 'text-brand-green'
                    : config.countryName === 'Indonesia' ? 'text-emerald-400'
                    : 'text-teal-400';

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-in-out ${
          isScrolled ? "py-3 md:py-4" : "py-4 md:py-6"
        }`}
      >
        <div
          className={`mx-auto transition-all duration-500 ease-in-out px-4 md:px-8 ${
            isScrolled
              ? "max-w-[1100px] bg-white/95 backdrop-blur-xl rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.2)] py-2 md:py-2.5 border border-white/40"
              : "max-w-7xl bg-transparent py-2"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-3 group cursor-pointer">
              <img
                src={getImagePath("/images/logo.png")}
                alt="Travnook"
                className={`h-7 md:h-12 w-auto transition-all ${isScrolled || forceSolidMode ? 'brightness-100' : 'brightness-0 invert'}`}
              />
              
              <div className={`relative overflow-hidden pl-2 md:pl-3 border-l pr-1 h-8 md:h-11 flex items-center w-[80px] md:w-[115px] shrink-0 ${isScrolled || forceSolidMode ? 'border-gray-200' : 'border-white/30'}`}>
                <AnimatePresence mode="wait">
                  {brandPhase === 0 ? (
                    <motion.span
                      key="brand"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className={`block text-sm md:text-xl font-black tracking-tighter ${isScrolled || forceSolidMode ? config.themeColor.primary : 'text-white'} font-sora`}
                    >
                      {lang === 'ar' ? 'ترافنوك' : 'Travnook'}
                    </motion.span>
                  ) : (
                    <motion.div
                      key="stats"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="flex flex-col justify-center"
                    >
                      <div className="flex items-center gap-1 mb-0.5">
                        <div className="flex -space-x-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-2.5 h-2.5 md:w-3 md:h-3 ${i === 4 ? (isScrolled || forceSolidMode ? 'text-gray-300 fill-gray-300' : 'text-white/30 fill-white/30') : 'text-[#FFB800] fill-[#FFB800]'}`} />
                          ))}
                        </div>
                        <span className={`text-[9px] md:text-[11px] font-black leading-none ${isScrolled || forceSolidMode ? 'text-gray-900' : 'text-white'}`}>4.6</span>
                      </div>
                      <div className={`flex items-center gap-1 text-[7px] md:text-[9px] font-bold uppercase tracking-widest ${isScrolled || forceSolidMode ? 'text-gray-500' : 'text-white/80'}`}>
                        <Award className="w-2.5 h-2.5 md:w-3 md:h-3" />
                        {lang === 'ar' ? '10 سنوات خبرة' : '10 YRS EXP.'}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
              {navLinks.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className={`transition-all relative text-xs xl:text-sm font-outfit uppercase tracking-[0.15em] xl:tracking-[0.2em] font-black ${
                    isScrolled || forceSolidMode ? `${config.themeColor.primary} opacity-80 ${scrolledHoverClass}` : `text-white/80 ${hoverClass}`
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </nav>

            <div className="flex gap-2 md:gap-4 items-center">
              {/* Language Switcher */}
              <button
                onClick={toggleLang}
                className={`flex items-center justify-center w-9 h-9 md:w-11 md:h-11 rounded-full border transition-all font-outfit font-black text-[10px] md:text-xs tracking-wider ${
                  isScrolled || forceSolidMode 
                    ? 'border-gray-200 text-brand-teal hover:bg-gray-50' 
                    : 'border-white/20 text-white hover:bg-white/10'
                }`}
              >
                {lang === 'en' ? 'AR' : 'EN'}
              </button>

              <a
                href="https://wa.me/971544388038?text=Hi%20Travnook!%20I'm%20interested%20in%20your%20visa%20assistance%20service.%20Please%20guide%20me."
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 md:w-12 md:h-12 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg group"
              >
                <MessageCircle className="w-4 h-4 md:w-6 md:h-6 fill-current group-hover:rotate-12 transition-transform" />
              </a>
              <button
                onClick={() => setIsMenuOpen(true)}
                className={`w-9 h-9 md:w-12 md:h-12 flex items-center justify-center lg:hidden rounded-full ${isScrolled || forceSolidMode ? 'bg-gray-100' : 'bg-white/10'} ${isScrolled || forceSolidMode ? config.themeColor.primary : 'text-white'}`}
              >
                <Menu className="w-4 h-4 md:w-6 md:h-6" strokeWidth={3} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={isAlt ? { x: '100%' } : { opacity: 0, clipPath: 'circle(0% at 90% 10%)' }}
            animate={isAlt ? { x: 0 } : { opacity: 1, clipPath: 'circle(150% at 90% 10%)' }}
            exit={isAlt ? { x: '100%' } : { opacity: 0, clipPath: 'circle(0% at 90% 10%)' }}
            transition={isAlt ? { duration: 0.4, ease: [0.32, 0.72, 0, 1] } : { duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[110] bg-white lg:hidden flex flex-col overflow-hidden"
          >
            {/* Background Decorations */}
            <div className={`absolute top-[-5%] right-[-5%] w-[250px] h-[250px] ${menuBgPrimary} opacity-5 rounded-full blur-[60px]`}></div>
            <div className={`absolute bottom-[-10%] left-[-10%] w-[350px] h-[350px] ${menuDotColor} opacity-5 rounded-full blur-[80px]`}></div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] select-none pointer-events-none scale-125">
               <img src={getImagePath("/images/logo.png")} className="w-[70vw]" alt="logo-watermark" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between p-5 md:p-8 relative z-20">
              <div className="flex items-center gap-2">
                <img src={getImagePath("/images/logo.png")} className="h-8 md:h-10" alt="logo" />
                <span className={`text-xl md:text-2xl font-black ${config.themeColor.primary} font-outfit tracking-tighter`}>
                  {lang === 'ar' ? 'ترافنوك' : 'Travnook'}
                </span>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className={`w-11 h-11 md:w-14 md:h-14 ${menuBgPrimary} rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform`}
              >
                <X className="w-6 h-6 md:w-8 md:h-8" strokeWidth={3} />
              </button>
            </div>

            {/* Links */}
            <nav className="flex flex-col gap-3 md:gap-6 p-6 md:p-12 mt-1 md:mt-4 relative z-20">
              {navLinks.map((item, i) => (
                <motion.a
                  initial={isAlt ? { opacity: 0, x: 40 } : { opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.4 }}
                  key={i}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="group flex items-center gap-4"
                >
                  <span className={`text-[10px] md:text-xs font-outfit font-black ${badgeColor} tracking-widest opacity-40 group-hover:opacity-100 transition-opacity`}>0{i + 1}</span>
                  <span className={`text-2xl md:text-5xl font-black ${config.themeColor.primary} ${lang === 'ar' ? 'font-arabic' : 'font-sora'} tracking-tighter ${menuTextHover} transition-all group-hover:translate-x-2`}>
                    {item.name}
                  </span>
                </motion.a>
              ))}
            </nav>

            {/* Action Card */}
            <div className="mt-auto p-5 md:p-8 relative z-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className={`${menuBgPrimary} p-5 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl relative overflow-hidden group`}
              >
                 <div className="absolute top-[-10px] right-[-10px] animate-spin-slow opacity-10">
                    <Plane className="w-16 h-16 md:w-20 md:h-20 text-white rotate-45" />
                 </div>
                 <div className="relative z-10">
                     <div className="flex items-center gap-2 mb-2 md:mb-4">
                        <ShieldCheck className={`w-4 h-4 md:w-5 md:h-5 ${badgeColor}`} />
                        <span className="text-[9px] md:text-xs font-outfit font-black text-white/50 tracking-[0.2em] uppercase">
                           {lang === 'ar' ? 'مساعدة خاصة' : 'Private Assistance'}
                        </span>
                     </div>
                     <h4 className={`text-lg md:text-2xl font-black text-white ${lang === 'ar' ? 'font-arabic' : 'font-sora'} leading-tight mb-4 md:mb-8`}>
                        {lang === 'ar' ? (
                           <>جاهز لحجز موعدك <br />لـ {config.ar?.metaTitle.split('|')[0] || config.countryName}؟</>
                        ) : (
                           <>Ready for your <br />{config.countryName} Slot?</>
                        )}
                     </h4>
                     <a
                        href="https://wa.me/971544388038?text=Hi%20Travnook!%20I'm%20interested%20in%20your%20visa%20assistance%20service.%20Please%20guide%20me."
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full ${menuBtnBg} text-white font-outfit font-black py-3.5 md:py-5 rounded-xl md:rounded-2xl flex items-center justify-center gap-3 shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-sm md:text-base`}
                     >
                        {lang === 'ar' ? 'احجز موعدك الحين' : 'BOOK APPOINTMENT'}
                        <ArrowRight className={`w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1.5 transition-transform ${lang === 'ar' ? 'rotate-180' : ''}`} />
                     </a>
                 </div>
              </motion.div>
            </div>

            {/* Footer */}
            <div className="p-5 md:p-8 flex items-center justify-between text-gray-400 font-outfit font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] relative z-20">
               <a href="mailto:contact@travnook.com" className="transition-colors">contact@travnook.com</a>
                <div className="flex gap-2 items-center">
                   <div className={`w-1.5 h-1.5 rounded-full ${menuDotColor} animate-pulse`}></div>
                   <span className="opacity-60">{lang === 'ar' ? 'موظفينا متاحين' : 'Agents Online'}</span>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
