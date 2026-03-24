import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, CalendarCheck, Zap, ArrowRight, Globe } from 'lucide-react';
import { getCountryConfig, getImagePath } from '../data/countryConfig';

interface AboutProps {
  lang?: 'en' | 'ar';
}

const About = ({ lang = 'en' }: AboutProps) => {
  const config = useMemo(() => getCountryConfig(), []);
  
  const stats = [
    { label: lang === 'ar' ? 'مواعيد محجوزة' : "Slots Found", value: "5k+", icon: <CalendarCheck className="w-4 h-4 md:w-5 md:h-5" /> },
    { label: lang === 'ar' ? 'دعم فني' : "Expert Support", value: lang === 'ar' ? '24/7' : "24/7", icon: <Zap className="w-4 h-4 md:w-5 md:h-5" /> },
    { label: lang === 'ar' ? 'نسبة الخصوصية' : "Privacy Rate", value: "100%", icon: <ShieldCheck className="w-4 h-4 md:w-5 md:h-5" /> }
  ];

  const bgColorDecor1 = config.countryName === 'Schengen' ? 'bg-brand-teal/5' : config.countryName === 'Indonesia' ? 'bg-emerald-800/5' : config.countryName === 'Japan' ? 'bg-sky-800/5' : 'bg-teal-800/5';
  const bgColorDecor2 = config.countryName === 'Schengen' ? 'bg-brand-green/5' : config.countryName === 'Indonesia' ? 'bg-emerald-500/5' : config.countryName === 'Japan' ? 'bg-cyan-500/5' : 'bg-orange-500/5';
  
  const btnBg = config.countryName === 'Schengen' ? 'bg-brand-green hover:bg-brand-yellow text-white' : 
                config.countryName === 'Indonesia' ? 'bg-emerald-500 hover:bg-emerald-400 text-emerald-950' : 
                config.countryName === 'Japan' ? 'bg-[#FF8000] hover:bg-[#FF9933] text-white' : 
                'bg-teal-500 hover:bg-teal-400 text-teal-950';

  const badgeIconClass = config.countryName === 'Schengen' ? 'text-brand-green' : config.countryName === 'Indonesia' ? 'text-emerald-500' : config.countryName === 'Japan' ? 'text-[#FF8000]' : 'text-teal-500';

  return (
    <section className="py-16 md:py-28 bg-[#F8F9F9] relative overflow-hidden" id="about-us">
      {/* Dynamic Background Blurs */}
      <div className={`absolute top-0 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] ${bgColorDecor1} rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none`}></div>
      <div className={`absolute bottom-0 left-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] ${bgColorDecor2} rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none`}></div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Side: Images & Shapes (Hidden on mobile) */}
          <div className="lg:col-span-5 relative hidden lg:block group">
             {/* Abstract background decorative shape */}
             <div className={`absolute -inset-4 bg-white rounded-[3rem] md:rounded-[4rem] shadow-[0_20px_40px_rgba(0,0,0,0.03)] -rotate-3 transition-transform duration-700 ease-out`}></div>
             
             <motion.div
               initial={{ opacity: 0, scale: 0.95, rotate: 2 }}
               whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, ease: "easeOut" }}
               className="relative z-10 w-full aspect-[4/5] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] ring-1 ring-black/5"
             >
                <img src={getImagePath(config.hero.image)} alt="Landscape" className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-1000" />
             </motion.div>
             <div className={`absolute -z-10 bottom-10 ${lang === 'ar' ? '-left-10' : '-right-10'} text-[8rem] md:text-[14rem] font-black font-outfit select-none ${config.themeColor.primary} opacity-[0.02] tracking-tighter`}>
                {lang === 'ar' ? 'عنا' : 'ABOUT'}
              </div>
          </div>

          {/* Right Side: Content */}
          <div className={`lg:col-span-7 relative order-1 lg:order-2 flex flex-col items-center lg:items-start text-center lg:text-left ${lang === 'ar' ? 'lg:text-right lg:items-end' : ''}`}>
             <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className={`inline-flex items-center gap-2 px-5 py-2 bg-white shadow-sm rounded-full ${config.themeColor.primary} font-outfit font-black text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] mb-6 md:mb-8 border border-gray-100 uppercase`}
             >
                <Globe className={`w-4 h-4 ${badgeIconClass}`} />
                <span>{lang === 'ar' ? 'عن ترافرنوك' : 'ABOUT TRAVNOOK'}</span>
             </motion.div>

             <h2 className={`text-4xl md:text-5xl lg:text-7xl font-sora font-black ${config.themeColor.primary} leading-[1.1] tracking-tighter mb-6 md:mb-8 ${lang === 'ar' ? 'font-arabic' : ''}`}>
                {lang === 'ar' ? (
                   <>
                     {config.ar?.metaTitle.split('|')[0]} <br />
                     <span className={`${config.themeColor.secondary} italic`}>من دبي</span>
                   </>
                 ) : (
                   <>
                     {config.about.title.split(' ').slice(0, 2).join(' ')} <br />
                     <span className={`${config.themeColor.secondary} italic`}>{config.about.title.split(' ').slice(2).join(' ')}</span>
                   </>
                 )}
             </h2>

             <div className="space-y-6 md:space-y-8 font-outfit text-gray-50">
                <p className={`text-base md:text-xl font-bold leading-relaxed tracking-tight ${config.countryName === 'Indonesia' ? 'text-emerald-700' : 'text-gray-950'} ${lang === 'ar' ? 'font-arabic' : ''}`}>
                   {lang === 'ar' ? config.about.ar?.desc1 : config.about.desc1}
                 </p>
                
                <div className="flex gap-4 md:gap-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-50">
                   <div className={`w-1.5 ${config.countryName === 'Schengen' ? 'bg-brand-green' : config.countryName === 'Indonesia' ? 'bg-emerald-500' : config.countryName === 'Japan' ? 'bg-sky-700' : 'bg-teal-500'} bg-opacity-30 rounded-full shrink-0`}></div>
                   <p className={`text-sm md:text-lg font-medium leading-relaxed italic ${config.themeColor.primary} opacity-80 ${lang === 'ar' ? 'font-arabic' : ''}`}>
                      "{lang === 'ar' ? config.about.ar?.desc2 : config.about.desc2}"
                    </p>
                </div>

                {/* Enhanced Single-Line Stats Row */}
                {config.countryName === 'Japan' && (
                  <div className="pt-6 w-full">
                     <div className="bg-white/60 backdrop-blur-md border border-white/40 p-3 sm:p-5 rounded-3xl shadow-xl flex items-center justify-between gap-2 sm:gap-4 md:gap-8 max-w-2xl lg:mx-0 mx-auto">
                        {stats.map((stat, i) => (
                          <div key={i} className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-3 flex-1 px-1">
                             <div className={`p-2 bg-white rounded-xl shadow-sm ${badgeIconClass}`}>
                                {stat.icon}
                             </div>
                             <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                                <span className={`text-base sm:text-xl md:text-2xl font-black font-sora tracking-tighter ${config.themeColor.primary} leading-none`}>
                                   {stat.value}
                                </span>
                                <p className={`text-[7px] sm:text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-400 mt-0.5 ${lang === 'ar' ? 'font-arabic' : ''}`}>
                                   {stat.label}
                                </p>
                             </div>
                             {/* Divider (hidden on last item) */}
                             {i < stats.length - 1 && (
                               <div className="hidden sm:block h-8 w-[1px] bg-gray-200 ml-auto mr-0"></div>
                             )}
                          </div>
                        ))}
                     </div>
                  </div>
                )}
             </div>

              <div className="mt-8 md:mt-12 flex justify-center lg:justify-start w-full">
                 <a
                   href="https://wa.me/971544388038"
                   target="_blank"
                   rel="noopener noreferrer"
                   className={`group ${btnBg} font-outfit font-black py-4 px-10 md:py-5 md:px-12 rounded-xl md:rounded-2xl shadow-xl transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 uppercase tracking-widest cursor-pointer w-full md:w-auto text-sm ${lang === 'ar' ? 'font-arabic' : ''}`}
                 >
                   {lang === 'ar' ? 'تحدث مع خبير' : 'Talk to an Expert'}
                   <ArrowRight className={`w-5 h-5 group-hover:translate-x-2 transition-transform ${lang === 'ar' ? 'rotate-180' : ''}`} strokeWidth={3} />
                 </a>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
