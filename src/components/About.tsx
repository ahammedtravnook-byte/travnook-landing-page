import { motion } from 'framer-motion';
import { ShieldCheck, CalendarCheck, Zap, ArrowRight, Sparkles } from 'lucide-react';

const About = () => {
  const stats = [
    { label: "Slots Found", value: "5k+", icon: <CalendarCheck className="w-5 h-5" /> },
    { label: "Expert Support", value: "24/7", icon: <Zap className="w-5 h-5" /> },
    { label: "Privacy Rate", value: "100%", icon: <ShieldCheck className="w-5 h-5" /> }
  ];

  return (
    <section className="py-24 md:py-40 bg-white relative overflow-hidden" id="about-us">
      {/* Immersive Background Blur Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-teal/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-green/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: CLEAN ALIGNED IMAGE */}
          <div className="lg:col-span-6 relative">
             <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, ease: "easeOut" }}
               className="relative z-10 w-full aspect-[4/5] md:aspect-square rounded-[3.5rem] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.2)] border-[12px] border-white ring-1 ring-black/5"
             >
                <img 
                  src="/images/swiss_alps_scene_1773825101838.png" 
                  alt="Landscape" 
                  className="w-full h-full object-cover" 
                />
                
                {/* Embedded Glass Badge - Perfectly Aligned */}
                <div className="absolute bottom-10 right-10 bg-white/40 backdrop-blur-2xl px-6 py-4 rounded-3xl border border-white/40 shadow-2xl flex items-center gap-4 group">
                   <div className="w-12 h-12 bg-brand-yellow rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                      <ShieldCheck className="w-7 h-7" />
                   </div>
                   <div>
                      <p className="text-[10px] font-outfit font-black text-white/70 uppercase tracking-widest leading-none mb-1">Authentic</p>
                      <p className="text-white font-sora font-black text-sm tracking-tight leading-none">Security Guaranteed</p>
                   </div>
                </div>
             </motion.div>

             {/* Decorative Elements */}
             <div className="absolute -z-10 -top-8 -left-8 w-44 h-44 border-[2px] border-dashed border-brand-teal/10 rounded-full animate-spin-slow"></div>
             <div className="absolute -z-10 -bottom-10 left-10 text-brand-teal/5 text-[15rem] font-black font-outfit select-none">
                ABOUT
             </div>
          </div>

          {/* Right Column: CLEAN ALIGNED CONTENT */}
          <div className="lg:col-span-6 relative">
             <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2.5 px-6 py-2 bg-brand-teal/5 rounded-full text-brand-teal font-outfit font-black text-xs tracking-[0.3em] mb-10 border border-brand-teal/10 uppercase"
             >
                <Sparkles className="w-4 h-4 text-brand-green" />
                <span>EXPERTISE • DEDICATION • SPEED</span>
             </motion.div>

             <h2 className="text-5xl md:text-7xl lg:text-8xl font-sora font-black text-brand-teal leading-[1] tracking-tighter mb-10">
                The Travnook <br />
                <span className="text-brand-green italic">Expertise</span>
             </h2>

             <div className="space-y-10 font-outfit text-gray-500">
                <p className="text-lg md:text-2xl font-bold leading-relaxed tracking-tight">
                  Planning a time-sensitive trip from Dubai? Our experts focus on securing available Schengen slots for overseas business, reunion, or health-related journeys.
                </p>

                {/* Vertical Divider Highlight */}
                <div className="flex gap-8 group">
                   <div className="w-1 bg-brand-yellow rounded-full transition-all group-hover:bg-brand-green"></div>
                   <p className="text-lg md:text-xl font-medium leading-relaxed italic text-brand-teal/70">
                     "Focus on your travel preparations while we assist with the complexities for a seamless booking experience."
                   </p>
                </div>

                {/* Professional Stats Bar */}
                <div className="pt-10 grid grid-cols-3 gap-6 md:gap-12">
                   {stats.map((stat, i) => (
                     <div key={i} className="text-center md:text-left">
                        <div className="flex items-center gap-2 text-brand-green mb-3 justify-center md:justify-start">
                           {stat.icon}
                           <span className="text-2xl md:text-3xl font-black font-sora tracking-tighter text-brand-teal">{stat.value}</span>
                        </div>
                        <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-gray-400 whitespace-nowrap">{stat.label}</p>
                     </div>
                   ))}
                </div>
             </div>

             <div className="mt-14 flex items-center gap-8 text-sm">
                <a 
                  href="https://wa.me/971544388038"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-brand-teal hover:bg-brand-green text-white font-outfit font-black py-6 px-12 rounded-2xl shadow-[0_20px_50px_rgba(13,74,65,0.2)] transition-all flex items-center gap-4 hover:-translate-y-2 uppercase tracking-widest cursor-pointer"
                >
                  Talk to an Expert
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" strokeWidth={3} />
                </a>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
