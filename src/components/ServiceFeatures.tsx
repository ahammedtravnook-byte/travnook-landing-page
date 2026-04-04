import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { FileCheck, CalendarCheck, FileBadge, Eye, ShieldCheck, HeartHandshake } from 'lucide-react';
import { getCountryConfig } from '../data/countryConfig';

const ServiceFeatures = () => {
  const config = useMemo(() => getCountryConfig(), []);
  const isAlt = config.countryName !== 'Schengen';

  const iconColor = config.countryName === 'Schengen' ? {
    a: 'text-brand-yellow', b: 'text-brand-green', c: 'text-brand-teal', d: 'text-brand-yellow'
  } : config.countryName === 'Japan' ? {
    a: 'text-sky-500', b: 'text-cyan-500', c: 'text-sky-800', d: 'text-sky-500'
  } : config.countryName === 'Indonesia' ? {
    a: 'text-orange-500', b: 'text-emerald-500', c: 'text-emerald-800', d: 'text-orange-500'
  } : {
    a: 'text-orange-500', b: 'text-teal-500', c: 'text-teal-800', d: 'text-orange-500'
  };

  const isIndo = config.countryName === 'Indonesia';

  const worksList = isIndo ? [
    { icon: <FileCheck className={`${iconColor.a} w-5 h-5 md:w-6 md:h-6`} />, title: "Submit Your Details", desc: "Share your basic travel and personal information to get started." },
    { icon: <FileBadge className={`${iconColor.b} w-5 h-5 md:w-6 md:h-6`} />, title: "Document Review", desc: "Receive guidance on required documents and get them reviewed." },
    { icon: <CalendarCheck className={`${iconColor.c} w-5 h-5 md:w-6 md:h-6`} />, title: "Application Support", desc: "We assist you in accurately filling out your visa application." },
    { icon: <Eye className={`${iconColor.d} w-5 h-5 md:w-6 md:h-6`} />, title: "Submission & Processing", desc: "Attend your appointment and proceed with visa processing." }
  ] : [
    { icon: <FileCheck className={`${iconColor.a} w-5 h-5 md:w-6 md:h-6`} />, title: "Contact Us", desc: "Share details and travel date. We provide a checklist." },
    { icon: <FileBadge className={`${iconColor.b} w-5 h-5 md:w-6 md:h-6`} />, title: "Document Review", desc: "Assist with organizing required paperwork." },
    { icon: <CalendarCheck className={`${iconColor.c} w-5 h-5 md:w-6 md:h-6`} />, title: "Appointment Booking", desc: "Search and book the earliest available slot." },
    { icon: <Eye className={`${iconColor.d} w-5 h-5 md:w-6 md:h-6`} />, title: "Submission & Assistance", desc: "Prepare and organize documents for submission." }
  ];

  const whyChooseItems = isIndo ? [
    { title: "Application Guidance", desc: "Step-by-step support to understand and complete your visa application correctly.", icon: <CalendarCheck /> },
    { title: "Document Accuracy Support", desc: "We review your documents to help ensure they meet the required guidelines.", icon: <HeartHandshake /> },
    { title: "Secure & Confidential Process", desc: "Your personal information is handled with strict privacy and data protection.", icon: <ShieldCheck /> }
  ] : [
    { title: "Expedited Search", desc: "Diligently search for earliest available slots. Refund policy applies.", icon: <CalendarCheck /> },
    { title: "Personalised Assistance", desc: "Efficient and accurate processing from booking to document review.", icon: <HeartHandshake /> },
    { title: "Total Privacy", desc: "Information handled with highest discretion and confidentiality.", icon: <ShieldCheck /> }
  ];

  /* ──────────────────────────────────────────────
     ALT LAYOUT — Indonesia / China
     Horizontal scrollable cards with glassmorphic bg
     ────────────────────────────────────────────── */
  if (isAlt) {
    const isJapan = config.countryName === 'Japan';
    const isIndo = config.countryName === 'Indonesia';
    const cardBg = isJapan ? 'from-slate-900 to-sky-900' : isIndo ? 'from-emerald-900 to-emerald-800' : 'from-teal-900 to-teal-800';
    const cardDot = isJapan ? 'bg-sky-400' : isIndo ? 'bg-emerald-400' : 'bg-teal-400';
    const btnBg = isJapan ? 'bg-sky-600 hover:bg-sky-500' : isIndo ? 'bg-emerald-500 hover:bg-emerald-400' : 'bg-teal-500 hover:bg-teal-400';

    return (
      <section className="py-12 md:py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8">

          {/* How it works - Horizontal scroll cards */}
          <div className="mb-16 md:mb-28">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 md:mb-12">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`inline-flex items-center gap-2 px-4 py-1.5 bg-gray-50 rounded-full ${config.themeColor.primary} font-outfit font-black text-[10px] tracking-[0.2em] mb-4 border border-gray-100 uppercase`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${cardDot}`}></span>
                  <span>OUR PROCESS</span>
                </motion.div>
                <h2 className={`text-3xl md:text-5xl font-sora font-black ${config.themeColor.primary} tracking-tighter`}>
                  How Our Service <span className={`${config.themeColor.secondary} italic`}>Works</span>
                </h2>
              </div>
              <p className="text-gray-400 font-outfit text-sm md:text-base max-w-sm mt-3 md:mt-0">Straightforward and stress-free for your convenience.</p>
            </div>

            <div className="flex overflow-x-auto gap-4 md:gap-6 pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
              {worksList.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`snap-center shrink-0 w-[70vw] md:w-[calc(25%-1rem)] bg-gradient-to-br ${cardBg} p-5 md:p-7 rounded-2xl md:rounded-[2rem] text-white relative overflow-hidden group cursor-default`}
                >
                  {/* Step number watermark */}
                  <span className="absolute top-3 right-4 text-7xl md:text-8xl font-black font-outfit text-white/5 select-none leading-none">0{idx + 1}</span>

                  <div className="relative z-10">
                    <div className="w-11 h-11 md:w-14 md:h-14 bg-white/10 backdrop-blur-md rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:bg-white/20 transition-colors shadow-lg border border-white/10">
                      {item.icon}
                    </div>
                    <h4 className="font-sora font-black text-base md:text-lg mb-2 tracking-tight">{item.title}</h4>
                    <p className="text-white/60 text-xs md:text-sm font-outfit leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Why Choose Us - Stacked with icon animations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`inline-flex items-center gap-2 px-4 py-1.5 bg-gray-50 rounded-full ${config.themeColor.primary} font-outfit font-black text-[10px] tracking-[0.2em] mb-5 border border-gray-100 uppercase`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${cardDot}`}></span>
                <span>OUR GUARANTEES</span>
              </motion.div>
              <h2 className={`text-3xl md:text-5xl font-sora font-black ${config.themeColor.primary} tracking-tighter mb-4`}>
                Why Choose <span className={`${config.themeColor.secondary} italic`}>Our Service?</span>
              </h2>
              <p className="text-gray-400 font-outfit text-sm md:text-base mb-8 max-w-md">
                Let us streamline your {config.countryName} appointment process with efficient and accurate handling.
              </p>

              <div className="space-y-4 md:space-y-6">
                {whyChooseItems.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.12 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 8 }}
                    className={`flex gap-4 md:gap-5 items-start p-4 md:p-5 rounded-xl md:rounded-2xl border border-transparent hover:border-gray-100 hover:shadow-lg transition-all cursor-default group`}
                  >
                    <div className={`w-11 h-11 md:w-14 md:h-14 shrink-0 rounded-xl md:rounded-2xl flex items-center justify-center ${config.themeColor.secondary.replace('text-', 'bg-')} text-white shadow-md group-hover:scale-110 transition-transform`}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 className={`font-sora font-black text-base md:text-lg ${config.themeColor.primary} mb-1`}>{item.title}</h4>
                      <p className="text-xs md:text-sm text-gray-400 font-outfit leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <a
                href="https://wa.me/971544388038?text=Hi%20Travnook!%20I'm%20interested%20in%20your%20visa%20assistance%20service.%20Please%20guide%20me."
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-8 inline-flex items-center gap-3 ${btnBg} text-white font-outfit font-black py-3 px-7 md:py-4 md:px-10 rounded-xl md:rounded-2xl shadow-lg transition-all hover:-translate-y-1 cursor-pointer uppercase tracking-widest text-sm`}
              >
                Discover More
              </a>
            </div>

            {/* Image collage */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative h-[350px] md:h-[500px] hidden md:flex items-center justify-center"
            >
              <div className={`absolute w-[120%] h-[120%] ${config.countryName === 'Japan' ? 'bg-sky-500/5' : config.countryName === 'Indonesia' ? 'bg-emerald-500/5' : 'bg-teal-500/5'} rounded-full blur-3xl -z-10`}></div>
              <div className="relative w-72 h-72 md:w-80 md:h-80 bg-white rounded-[3rem] border-[8px] border-white shadow-[0_25px_60px_rgba(0,0,0,0.1)] overflow-hidden z-20">
                <img src={config.hero.image} alt={config.countryName} className="w-full h-full object-cover" />
              </div>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-4 left-4 w-40 h-40 bg-white rounded-2xl border-[6px] border-white shadow-xl overflow-hidden z-30"
              >
                <img src="/images/passport_illustration_1773825157044.png" alt="Passport" className="w-full h-full object-cover" />
              </motion.div>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-4 right-4 w-28 h-28 bg-white rounded-full border-4 border-white shadow-lg overflow-hidden z-10"
              >
                <img src="/images/calendar_booking_illustration_1773825172614.png" alt="Calendar" className="w-full h-full object-cover" />
              </motion.div>
            </motion.div>
          </div>
        </div>

        <style dangerouslySetInnerHTML={{__html: `
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        `}} />
      </section>
    );
  }

  /* ──────────────────────────────────────────────
     SCHENGEN LAYOUT — Original (unchanged)
     ────────────────────────────────────────────── */
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-8">

        <div className="flex flex-col md:flex-row items-center gap-16 mb-32">
          <div className="w-full md:w-1/2">
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-brand-teal mb-4"
            >
              How Our Service <span className="text-brand-yellow font-script text-5xl font-normal">Works</span>
            </motion.h2>
            <p className="text-gray-500 mb-8 max-w-md">Our process is designed to be straightforward and stress-free for your convenience.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {worksList.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-brand-offwhite p-6 rounded-3xl shadow-sm hover:shadow-card transition-all"
                >
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4">{item.icon}</div>
                  <h4 className="font-bold text-brand-teal mb-2">{item.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 flex gap-4">
              <button className="bg-brand-teal text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">←</button>
              <button className="bg-brand-yellow text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">→</button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 relative h-[600px]"
          >
            <div className="absolute inset-0 bg-brand-lightTeal rounded-[3rem] transform rotate-3"></div>
            <img src="/images/swiss_alps_scene_1773825101838.png" alt="Travel" className="absolute inset-0 w-full h-full object-cover rounded-[3rem] shadow-float" />
          </motion.div>
        </div>

        <div className="flex flex-col md:flex-row-reverse items-center gap-16">
          <div className="w-full md:w-1/2">
            <motion.h2
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-brand-teal mb-4"
            >
              Why Choose <span className="text-brand-green">Our Service?</span>
            </motion.h2>
            <p className="text-gray-500 mb-8 max-w-md">Let us streamline your Schengen appointment process for your European visit from Dubai.</p>

            <div className="space-y-6">
              {whyChooseItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.15 }}
                  viewport={{ once: true }}
                  className="flex gap-4 items-start"
                >
                  <div className="w-12 h-12 shrink-0 bg-brand-offwhite rounded-2xl flex items-center justify-center text-brand-teal">{item.icon}</div>
                  <div>
                    <h4 className="font-bold text-brand-teal text-lg">{item.title}</h4>
                    <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <a
              href="https://wa.me/971544388038?text=Hi%20Travnook!%20I'm%20interested%20in%20your%20visa%20assistance%20service.%20Please%20guide%20me."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block bg-brand-green hover:bg-brand-teal text-white font-bold py-3 px-8 rounded-full shadow-lg transition-colors cursor-pointer"
            >
              Discover More
            </a>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 relative h-[500px] flex items-center justify-center"
          >
            <div className="absolute w-[120%] h-[120%] bg-brand-yellow/10 rounded-full blur-3xl -z-10"></div>
            <div className="relative w-80 h-80 bg-white rounded-full border-8 border-brand-offwhite shadow-float overflow-hidden z-20">
              <img src="/images/rome_colosseum_scene_1773825118794.png" alt="Rome" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-10 left-0 w-48 h-48 bg-white rounded-[2rem] border-8 border-brand-offwhite shadow-card overflow-hidden z-30">
              <img src="/images/passport_illustration_1773825157044.png" alt="Passport" className="w-full h-full object-cover" />
            </div>
            <div className="absolute top-10 right-0 w-32 h-32 bg-white rounded-full border-4 border-brand-offwhite shadow-card overflow-hidden z-10">
              <img src="/images/calendar_booking_illustration_1773825172614.png" alt="Calendar" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default ServiceFeatures;
