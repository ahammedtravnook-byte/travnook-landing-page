import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, MessageCircle, ArrowRight, Plane, ShieldCheck } from 'lucide-react';

const Navbar = () => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about-us' },
    { name: 'Appointments', href: '#appointments' },
    { name: 'Process', href: '#process' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-in-out ${
          isScrolled ? "py-4 md:py-4" : "py-6"
        }`}
      >
        <div 
          className={`mx-auto transition-all duration-500 ease-in-out px-6 md:px-8 ${
            isScrolled 
              ? "max-w-[1100px] bg-white/95 backdrop-blur-xl rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.2)] py-2.5 border border-white/40" 
              : "max-w-7xl bg-transparent py-2"
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2 group cursor-pointer">
              <img 
                src="/images/logo.png" 
                alt="Travnook" 
                className={`h-10 md:h-14 w-auto transition-all ${isScrolled ? 'brightness-100' : 'brightness-0 invert'}`} 
              />
              <span className={`text-xl md:text-3xl tracking-tighter transition-colors font-outfit font-black ${isScrolled ? 'text-brand-teal' : 'text-white'}`}>
                Travnook
              </span>
            </div>

            {/* Desktop Links */}
            <nav className="hidden lg:flex items-center gap-10">
              {navLinks.map((item, i) => (
                <a 
                  key={i} 
                  href={item.href} 
                  className={`transition-all relative text-sm font-outfit uppercase tracking-[0.2em] font-black ${
                    isScrolled ? 'text-brand-teal/80 hover:text-brand-teal' : 'text-white/80 hover:text-brand-yellow'
                  }`}
                >
                  {item.name}
                  <span className={`absolute -bottom-1.5 left-0 w-0 h-0.5 transition-all group-hover:w-full ${
                    isScrolled ? 'bg-brand-teal' : 'bg-brand-yellow'
                  }`}></span>
                </a>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex gap-2 md:gap-4 items-center">
              <a 
                href="https://wa.me/971544388038" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 md:w-12 md:h-12 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg group"
              >
                <MessageCircle className="w-5 h-5 md:w-6 md:h-6 fill-current group-hover:rotate-12 transition-transform" />
              </a>

              <button 
                onClick={() => setIsMenuOpen(true)}
                className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center lg:hidden rounded-full ${isScrolled ? 'bg-brand-offwhite text-brand-teal' : 'bg-white/10 text-white'}`}
              >
                <Menu className="w-5 h-5 md:w-6 md:h-6" strokeWidth={3} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* MOBILE MENU: REFINED SCALING */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at 90% 10%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 90% 10%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 90% 10%)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[110] bg-white lg:hidden flex flex-col overflow-hidden"
          >
            {/* Immersive Background Decorations */}
            <div className="absolute top-[-5%] right-[-5%] w-[250px] h-[250px] bg-brand-teal/5 rounded-full blur-[60px]"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[350px] h-[350px] bg-brand-green/5 rounded-full blur-[80px]"></div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] select-none pointer-events-none scale-125">
               <img src="/images/logo.png" className="w-[70vw]" alt="logo-watermark" />
            </div>

            {/* Header in Menu */}
            <div className="flex items-center justify-between p-6 md:p-8 relative z-20">
              <div className="flex items-center gap-2">
                <img src="/images/logo.png" className="h-8 md:h-10" alt="logo" />
                <span className="text-xl md:text-2xl font-black text-brand-teal font-outfit tracking-tighter">Travnook</span>
              </div>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="w-12 h-12 md:w-14 md:h-14 bg-brand-teal rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform"
              >
                <X className="w-7 h-7 md:w-8 md:h-8" strokeWidth={3} />
              </button>
            </div>

            {/* Links Section: REFINED FONT SIZES */}
            <nav className="flex flex-col gap-4 md:gap-6 p-8 md:p-12 mt-2 md:mt-4 relative z-20">
              {navLinks.map((item, i) => (
                <motion.a
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
                  key={i}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="group flex items-center gap-5"
                >
                  <span className="text-[10px] md:text-xs font-outfit font-black text-brand-green tracking-widest opacity-40 group-hover/link:opacity-100 transition-opacity">0{i + 1}</span>
                  <span className="text-3xl md:text-5xl font-black text-brand-teal font-sora tracking-tighter group-hover:text-brand-green transition-all group-hover:translate-x-2">
                    {item.name}
                  </span>
                </motion.a>
              ))}
            </nav>

            {/* Action Card at Bottom: TIGHTER FOR MOBILE */}
            <div className="mt-auto p-6 md:p-8 relative z-20">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-brand-teal p-6 md:p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group"
              >
                 <div className="absolute top-[-10px] right-[-10px] animate-spin-slow opacity-10">
                    <Plane className="w-20 h-20 text-white rotate-45" />
                 </div>

                 <div className="relative z-10">
                    <div className="flex items-center gap-2.5 mb-3 md:mb-4">
                       <ShieldCheck className="w-5 h-5 text-brand-green" />
                       <span className="text-[9px] md:text-xs font-outfit font-black text-white/50 tracking-[0.2em] uppercase">Private Assistance</span>
                    </div>
                    <h4 className="text-xl md:text-2xl font-black text-white font-sora leading-tight mb-6 md:mb-8">Ready for your <br />Schengen Slot?</h4>
                    <a 
                       href="https://wa.me/971544388038"
                       target="_blank"
                       rel="noopener noreferrer"
                       className="w-full bg-brand-green hover:bg-brand-yellow text-white font-outfit font-black py-4 md:py-5 rounded-2xl flex items-center justify-center gap-3 shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                    >
                       BOOK APPOINTMENT
                       <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1.5 transition-transform" />
                    </a>
                 </div>
              </motion.div>
            </div>

            {/* Contact quick links */}
            <div className="p-6 md:p-8 flex items-center justify-between text-gray-400 font-outfit font-black text-[9px] md:text-[10px] uppercase tracking-[0.3em] relative z-20">
               <a href="mailto:contact@travnook.com" className="hover:text-brand-teal transition-colors">contact@travnook.com</a>
               <div className="flex gap-2 items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse"></div>
                  <span className="opacity-60">Agents Online</span>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
