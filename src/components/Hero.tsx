import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Plane, MoveRight, Cloud, CalendarCheck, ShieldCheck } from 'lucide-react';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-text', 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 0.5 }
      );
      
      gsap.fromTo('.hero-image',
        { scale: 0.8, opacity: 0, y: 50 },
        { scale: 1, opacity: 1, y: 0, duration: 1.2, delay: 0.8, ease: 'cubic-bezier(0.16, 1, 0.3, 1)' }
      );

      gsap.to('.hero-cloud-1', { x: 30, y: -10, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('.hero-cloud-2', { x: -40, y: 15, duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('.hero-cloud-3', { x: 20, y: 20, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut' });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative z-10 w-full min-h-screen lg:min-h-[110vh] bg-brand-yellow overflow-hidden flex items-center pt-24 lg:pt-0" id="home">
      
      {/* The Diagonal Ripped Paper Split */}
      <div 
        className="absolute top-0 left-0 w-full h-full bg-brand-teal z-0 pointer-events-none"
        style={{
          clipPath: window.innerWidth > 1024 
            ? 'polygon(0 0, 75% 0, 45% 100%, 0% 100%)' 
            : 'polygon(0 0, 100% 0, 100% 60%, 0% 100%)',
          boxShadow: '10px 0 20px rgba(0,0,0,0.5)'
        }}
      >
        <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-cover bg-center" 
             style={{ backgroundImage: "url('/images/schengen_hero_landscape_1773825066510.png')" }}></div>
      </div>
      
      {/* Wavy/Ripped edge illusion */}
      <svg className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none opacity-20 lg:opacity-100" preserveAspectRatio="none" viewBox="0 0 1000 1000">
        <path d="M750,0 Q730,100 710,200 T650,400 T580,600 T520,800 T450,1000 L440,1000 L740,0 Z" fill="#ffffff" />
      </svg>

      {/* Floating Clouds */}
      <Cloud className="hero-cloud-1 absolute top-[15%] left-[10%] lg:left-[60%] text-white/50 lg:text-white/80 w-24 h-24 lg:w-32 lg:h-32 z-10" fill="currentColor" />
      <Cloud className="hero-cloud-2 absolute top-[25%] left-[80%] text-white/30 lg:text-white/50 w-16 h-16 lg:w-20 lg:h-20 z-10" fill="currentColor" />
      <Cloud className="hero-cloud-3 absolute top-[70%] left-[5%] lg:left-[40%] text-white/10 w-32 h-32 lg:w-40 lg:h-40 z-10" fill="currentColor" />

      {/* Dotted Airplane Path */}
      <svg className="hidden lg:block absolute top-0 left-0 w-full h-full z-10 pointer-events-none" viewBox="0 0 1000 1000" preserveAspectRatio="none">
        <path d="M 200 400 Q 500 200 850 500" fill="transparent" stroke="white" strokeWidth="4" strokeDasharray="15 20" strokeLinecap="round" opacity="0.4" />
      </svg>
      <Plane className="absolute top-[16%] lg:top-[14%] left-[15%] lg:left-[25%] text-white w-8 h-8 lg:w-12 lg:h-12 -rotate-45 z-[40] drop-shadow-xl" fill="currentColor" />

      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Content */}
        <div className="lg:col-span-6 text-left relative z-30 pt-10 pb-10 lg:pb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hero-text inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6 text-brand-yellow font-outfit font-black text-xs tracking-widest uppercase italic"
          >
            <CalendarCheck className="w-5 h-5 text-brand-green" />
            <span>EXPERT VISA ASSISTANCE</span>
          </motion.div>
          <h1 className="hero-text text-white font-outfit font-black text-4xl md:text-6xl lg:text-8xl leading-[1] mb-6 drop-shadow-2xl tracking-tighter">
            BOOK YOUR <br className="hidden md:block" />
            SCHENGEN <br className="hidden md:block" />
            <span className="text-brand-yellow font-script text-[1.25em] font-normal inline-block mt-4 drop-shadow-xl">Appointment</span> 
          </h1>
          <p className="hero-text text-white/80 text-base md:text-xl font-outfit font-bold max-w-lg mb-10 leading-relaxed tracking-wide">
            Fast slot booking and expert document review for your European journey from Dubai.
          </p>
          <div className="hero-text flex flex-col sm:flex-row gap-4">
            <a 
              href="https://wa.me/971544388038"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-green hover:bg-brand-yellow text-white font-outfit font-black py-5 px-10 rounded-2xl shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-3 text-lg uppercase tracking-widest cursor-pointer"
            >
              Book Now
              <MoveRight className="w-6 h-6" />
            </a>
            <a 
              href="https://wa.me/971544388038"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 text-white font-outfit font-black py-5 px-8 rounded-2xl transition-all flex items-center justify-center text-lg uppercase tracking-widest cursor-pointer"
            >
              Services
            </a>
          </div>
        </div>

        {/* Character */}
        <div className="lg:col-span-6 relative h-[400px] md:h-[600px] flex items-center justify-center">
          <div className="relative w-full h-full">
            <img 
              src="/images/traveler_girl_suitcase_1773825084497.png" 
              alt="Traveler" 
              className="hero-image absolute inset-0 w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)] mix-blend-multiply z-20"
            />
            {/* High-visibility Trust Badge */}
            <motion.div 
              initial={{ scale: 0, rotate: -15 }}
              animate={{ scale: 1, rotate: 10 }}
              transition={{ delay: 1.2, type: "spring", stiffness: 100 }}
              className="absolute top-[-5%] right-[5%] md:right-[-5%] bg-white/20 backdrop-blur-3xl border-2 border-white/40 text-white w-32 h-32 md:w-52 md:h-52 rounded-full flex flex-col items-center justify-center shadow-[0_25px_60px_rgba(0,0,0,0.5)] z-[40] p-6 text-center group"
            >
              <ShieldCheck className="w-10 h-10 md:w-16 h-16 text-brand-yellow mb-2 group-hover:scale-125 transition-transform" />
              <span className="text-[10px] md:text-xs font-outfit font-black uppercase tracking-widest text-white/80 leading-tight">100% Trusted</span>
              <span className="text-xs md:text-lg font-bold text-brand-yellow font-script leading-none">Professional Guide</span>
              <div className="absolute inset-0 rounded-full border-4 border-brand-green/30 animate-pulse group-hover:animate-none"></div>
            </motion.div>
          </div>
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
