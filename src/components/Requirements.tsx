import { motion } from 'framer-motion';
import { getCountryConfig } from '../data/countryConfig';
import { Clock, CreditCard, ChevronRight, FileText } from 'lucide-react';

interface Props {
  lang?: 'en' | 'ar';
}

const Requirements = ({ lang = 'en' }: Props) => {
  const config = getCountryConfig();
  
  if (!config.requirements) return null;

  const isJapan = config.countryName === 'Japan';
  const isIndo = config.countryName === 'Indonesia';
  
  const bgMain = isJapan ? 'bg-slate-50' : isIndo ? 'bg-emerald-50/30' : 'bg-teal-50/30';
  const highlightText = isJapan ? 'text-sky-600' : isIndo ? 'text-emerald-600' : 'text-teal-600';
  const cardHover = isJapan ? 'hover:border-sky-200 hover:shadow-sky-100/50' : isIndo ? 'hover:border-emerald-200 hover:shadow-emerald-100/50' : 'hover:border-teal-200 hover:shadow-teal-100/50';

  const t = {
    preparation: lang === 'ar' ? 'التجهيزات' : 'Preparation',
    essential: lang === 'ar' ? 'المتطلبات' : 'Essential',
    requirements: lang === 'ar' ? 'الأساسية' : 'Requirements',
    processingTime: lang === 'ar' ? 'وقت المعالجة' : 'Processing Time',
    visaFees: lang === 'ar' ? 'رسوم الفيزا' : 'Visa Fees',
    subtitle: lang === 'ar' 
      ? `تأكد من سلاسة إجراءات فيزا ${config.countryName === 'Schengen' ? 'شنغن' : config.countryName === 'Japan' ? 'اليابان' : config.countryName === 'Indonesia' ? 'إندونيسيا' : 'الصين'} من خلال تجهيز الأوراق المطلوبة مسبقاً.`
      : `Ensure a smooth ${config.countryName} visa application process by preparing the correct documents ahead of time.`,
    defaultDesc: lang === 'ar' ? 'يرجى التأكد من أن هذه الوثيقة تستوفي الإرشادات الرسمية للقنصلية.' : 'Please ensure this document meets the official consulate guidelines.'
  };

  return (
    <section className={`py-16 md:py-28 relative overflow-hidden ${bgMain} font-outfit`} id="requirements">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Mobile Header (Only visible on small screens) */}
        <div className="lg:hidden text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`inline-flex items-center gap-2 px-4 py-1.5 bg-white shadow-sm rounded-full ${config.themeColor.primary} font-black text-[10px] tracking-[0.2em] mb-4 border border-gray-100 uppercase`}
          >
            <FileText className={`w-3.5 h-3.5 ${config.themeColor.accent}`} />
            <span>{t.preparation}</span>
          </motion.div>
          <h2 className={`text-4xl font-black ${config.themeColor.primary} mb-4 font-sora tracking-tighter`}>
            {t.essential} <span className={`${config.themeColor.accent} italic`}>{t.requirements}</span>
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            {t.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
             <div className="bg-white border border-gray-100 p-5 rounded-2xl flex items-center gap-4 shadow-sm w-full">
                <div className={`p-3 rounded-xl bg-gray-50 ${config.themeColor.secondary}`}>
                  <Clock className="w-6 h-6" />
                </div>
                <div className={`${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                   <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{t.processingTime}</h3>
                   <p className={`text-lg font-black ${config.themeColor.primary} font-sora leading-tight`}>{(lang === 'ar' && config.requirements.ar) ? config.requirements.ar.processingTime : config.requirements.processingTime}</p>
                </div>
             </div>
             <div className="bg-white border border-gray-100 p-5 rounded-2xl flex items-center gap-4 shadow-sm w-full">
                <div className={`p-3 rounded-xl bg-gray-50 ${config.themeColor.secondary}`}>
                  <CreditCard className="w-6 h-6" />
                </div>
                <div className={`${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                   <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{t.visaFees}</h3>
                   <p className={`text-lg font-black ${config.themeColor.primary} font-sora leading-tight`}>{(lang === 'ar' && config.requirements.ar) ? config.requirements.ar.fees : config.requirements.fees}</p>
                </div>
             </div>
          </div>
        </div>

        {/* Desktop Split Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Sticky Info */}
          <div className="hidden lg:block lg:w-5/12 sticky top-32">
            <motion.div
              initial={{ opacity: 0, x: lang === 'ar' ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`inline-flex items-center gap-2 px-4 py-1.5 bg-white shadow-sm rounded-full ${config.themeColor.primary} font-black text-xs tracking-[0.2em] mb-6 border border-gray-100 uppercase`}
            >
              <FileText className={`w-3.5 h-3.5 ${config.themeColor.accent}`} />
              <span>{t.preparation}</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, x: lang === 'ar' ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`text-5xl xl:text-7xl font-black ${config.themeColor.primary} mb-6 tracking-tighter font-sora`}
            >
              {t.essential} <br/> <span className={`${config.themeColor.accent} italic`}>{t.requirements}</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: lang === 'ar' ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className={`text-gray-500 text-lg leading-relaxed ${lang === 'ar' ? 'pl-10' : 'pr-10'} mb-10`}
            >
              {t.subtitle}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
               <div className="bg-white/80 backdrop-blur-xl border border-gray-100 p-6 rounded-[2rem] flex items-center gap-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-transform">
                  <div className={`w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center shadow-inner ${config.themeColor.secondary}`}>
                    <Clock className="w-7 h-7" />
                  </div>
                  <div>
                     <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1.5">{t.processingTime}</h3>
                     <p className={`text-xl font-black ${config.themeColor.primary} font-sora`}>{(lang === 'ar' && config.requirements.ar) ? config.requirements.ar.processingTime : config.requirements.processingTime}</p>
                  </div>
               </div>
               <div className="bg-white/80 backdrop-blur-xl border border-gray-100 p-6 rounded-[2rem] flex items-center gap-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-transform">
                  <div className={`w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center shadow-inner ${config.themeColor.secondary}`}>
                    <CreditCard className="w-7 h-7" />
                  </div>
                  <div>
                     <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1.5">{t.visaFees}</h3>
                     <p className={`text-xl font-black ${config.themeColor.primary} font-sora`}>{(lang === 'ar' && config.requirements.ar) ? config.requirements.ar.fees : config.requirements.fees}</p>
                  </div>
               </div>
            </motion.div>
          </div>

          {/* Right Column: Interactive Document List */}
          <div className="w-full lg:w-7/12">
            <div className="flex flex-col gap-4 relative">
              
              {/* Vertical connector line (desktop only) */}
              <div className="hidden lg:block absolute left-[2.25rem] top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent z-0"></div>

              {(lang === 'ar' && config.requirements.ar ? config.requirements.ar.items : config.requirements.items).map((item, idx) => {
                const parts = item.split(':');
                const hasTitle = parts.length > 1;
                const title = hasTitle ? parts[0] : item;
                const desc = hasTitle ? parts[1] : '';

                return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: lang === 'ar' ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className={`relative z-10 bg-white border border-gray-100 p-5 md:p-6 rounded-2xl md:rounded-[2rem] shadow-sm ${cardHover} transition-all duration-300 group flex ${lang === 'ar' ? 'flex-row-reverse' : 'flex-row'} items-start gap-4 md:gap-6 cursor-default`}
                  >
                    <div className={`shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-gray-100 bg-white flex items-center justify-center font-black text-gray-300 text-sm md:text-base group-hover:border-transparent group-hover:bg-gray-900 group-hover:text-white transition-all`}>
                      {idx + 1}
                    </div>
                    
                    <div className={`flex-1 pt-1 md:pt-2 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                       <h4 className={`text-base md:text-xl font-black ${config.themeColor.primary} font-sora mb-1 md:mb-2 group-hover:${highlightText} transition-colors flex items-center ${lang === 'ar' ? 'flex-row-reverse' : ''} gap-2`}>
                         {title}
                         <ChevronRight className={`w-4 h-4 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all text-gray-400 ${lang === 'ar' ? 'rotate-180' : ''}`} />
                       </h4>
                       {desc && <p className="text-gray-500 text-sm md:text-base leading-relaxed font-medium">{desc}</p>}
                       {!hasTitle && <p className="text-gray-500 text-sm md:text-base leading-relaxed font-medium">{t.defaultDesc}</p>}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Requirements;
