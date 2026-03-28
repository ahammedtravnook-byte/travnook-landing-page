import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Plane, SendHorizonal, Globe, ShieldCheck, User, CheckCircle2, AlertCircle, Loader2, Clock, MessageCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { getCountryConfig } from '../data/countryConfig';

interface ContactProps {
  lang?: 'en' | 'ar';
}

const Contact = ({ lang = 'en' }: ContactProps) => {
  const config = useMemo(() => getCountryConfig(), []);
  const isAlt = config.countryName !== 'Schengen';

  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'duplicate' | 'error' | 'rate-limited'>('idle');
  const [cooldown, setCooldown] = useState(0);

  const _O = "aHR0cHM6Ly9jcm0udHJhdm5vb2suY29tL3Jlc3QvNjU2Ny8waXgzeW9mNXN0ajI3dzEwLw==";
  const getEP = () => atob(_O);

  useEffect(() => {
    const lastSub = localStorage.getItem('_tn_last_sub');
    if (lastSub) {
      const diff = Date.now() - parseInt(lastSub);
      const remaining = Math.max(0, 300000 - diff);
      if (remaining > 0) {
        setCooldown(Math.ceil(remaining / 1000));
        const timer = setInterval(() => {
          setCooldown((prev) => { if (prev <= 1) { clearInterval(timer); return 0; } return prev - 1; });
        }, 1000);
        return () => clearInterval(timer);
      }
    }
  }, []);

  const triggerConfettiBloom = () => {
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 40 : 100;
    const defaults = { spread: 360, ticks: 50, gravity: 0, decay: 0.94, startVelocity: 30, colors: ['#8ec436', '#0d4a41', '#f4a31a'], shapes: ['circle'] as confetti.Shape[] };
    const shoot = () => {
      confetti({ ...defaults, particleCount: count, origin: { x: 0.2, y: 0.2 } });
      confetti({ ...defaults, particleCount: count, origin: { x: 0.8, y: 0.2 } });
      if (!isMobile) {
        confetti({ ...defaults, particleCount: count, origin: { x: 0.2, y: 0.8 } });
        confetti({ ...defaults, particleCount: count, origin: { x: 0.8, y: 0.8 } });
      }
    };
    shoot(); setTimeout(shoot, 100); setTimeout(shoot, 200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const lastSub = localStorage.getItem('_tn_last_sub');
    if (lastSub && Date.now() - parseInt(lastSub) < 300000) { setSubmitStatus('rate-limited'); return; }
    setIsSubmitting(true); setSubmitStatus('idle');
    try {
      const endpoint = getEP();
      const checkResponse = await fetch(`${endpoint}crm.lead.list`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ filter: { "PHONE": formData.phone }, select: ["ID"] }) });
      const checkData = await checkResponse.json();
      if (checkData.result && checkData.result.length > 0) { setSubmitStatus('duplicate'); setIsSubmitting(false); return; }
      const addResponse = await fetch(`${endpoint}crm.lead.add`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ fields: { "TITLE": `Google ads : ${formData.name} + chatbot`, "NAME": formData.name, "PHONE": [{ "VALUE": formData.phone, "VALUE_TYPE": "WORK" }], "COMMENTS": formData.message, "SOURCE_ID": "UC_7B8N42", "UF_CRM_1765274714256": "google ads jic", "ASSIGNED_BY_ID": "4" } }) });
      if (addResponse.ok) { setSubmitStatus('success'); triggerConfettiBloom(); localStorage.setItem('_tn_last_sub', Date.now().toString()); setFormData({ name: '', phone: '', message: '' }); } else { setSubmitStatus('error'); }
    } catch (error) { console.error("CRM Error:", error); setSubmitStatus('error'); } finally { setIsSubmitting(false); }
  };

  // Shared form fields renderer
  const renderForm = (focusRing: string, formAccent: string, btnClass: string) => (
    <form onSubmit={handleSubmit} className="space-y-3 md:space-y-5">
      <AnimatePresence mode="wait">
        {submitStatus === 'success' && (<motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-3 md:p-4 bg-green-50 border border-green-100 rounded-xl flex items-center gap-3 text-green-600 font-bold text-sm"><CheckCircle2 className="w-5 h-5 shrink-0" /><span>{lang === 'ar' ? 'تم الإرسال! بيتصل بك خبيرنا قريب.' : 'Enquiry Sent! Our specialist will call you shortly.'}</span></motion.div>)}
        {submitStatus === 'duplicate' && (<motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-3 md:p-4 bg-amber-50 border border-amber-100 rounded-xl flex items-center gap-3 text-amber-600 font-bold text-sm"><AlertCircle className="w-5 h-5 shrink-0" /><span>{lang === 'ar' ? 'لقد تواصلت معنا بالفعل. يرجى الانتظار.' : 'You have already contacted us. Please wait.'}</span></motion.div>)}
        {submitStatus === 'rate-limited' && (<motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-3 md:p-4 bg-amber-50/50 border border-amber-100 rounded-xl flex items-center gap-3 text-amber-600 font-bold text-sm"><Clock className="w-5 h-5 shrink-0" /><span>{lang === 'ar' ? `يرجى الانتظار ${Math.floor(cooldown / 60)}د ${cooldown % 60}ث قبل المحاولة مرة أخرى.` : `Please wait ${Math.floor(cooldown / 60)}m ${cooldown % 60}s before submitting again.`}</span></motion.div>)}
        {submitStatus === 'error' && (<motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-3 md:p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-500 font-bold text-sm"><AlertCircle className="w-5 h-5 shrink-0" /><span>{lang === 'ar' ? 'حدث خطأ. يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة.' : 'Error. Please try again or call us directly.'}</span></motion.div>)}
      </AnimatePresence>

      <div className="space-y-1.5">
        <label className={`text-[9px] md:text-[11px] font-black ${config.themeColor.primary} uppercase tracking-[0.2em] ml-1 flex items-center gap-1.5 ${lang === 'ar' ? 'font-arabic' : ''}`}><User className={`w-3 h-3 ${formAccent}`} /> {lang === 'ar' ? 'الاسم بالكامل *' : 'Full Name *'}</label>
        <input type="text" className={`w-full bg-gray-50 border border-gray-100 ${focusRing} focus:bg-white rounded-lg md:rounded-xl px-4 py-3 md:px-5 md:py-3.5 ${config.themeColor.primary} font-black placeholder:text-gray-300 outline-none transition-all focus:ring-8 text-sm ${lang === 'ar' ? 'font-arabic' : ''}`} placeholder={lang === 'ar' ? 'الاسم' : "John Doe"} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required disabled={isSubmitting || !!cooldown} />
      </div>
      <div className="space-y-1.5">
        <label className={`text-[9px] md:text-[11px] font-black ${config.themeColor.primary} uppercase tracking-[0.2em] ml-1 flex items-center gap-1.5 ${lang === 'ar' ? 'font-arabic' : ''}`}><Phone className={`w-3 h-3 ${formAccent}`} /> {lang === 'ar' ? 'رقم الهاتف *' : 'Phone Number *'}</label>
        <input type="tel" className="w-full bg-gray-50 border border-gray-100 focus:border-brand-green focus:ring-brand-green/5 focus:bg-white rounded-lg md:rounded-xl px-4 py-3 md:px-5 md:py-3.5 text-brand-teal font-black placeholder:text-gray-300 outline-none transition-all focus:ring-8 text-sm" placeholder="+971 50 XXX XXXX" dir="ltr" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required disabled={isSubmitting || !!cooldown} />
      </div>
      <div className="space-y-1.5">
        <label className={`text-[9px] md:text-[11px] font-black ${config.themeColor.primary} uppercase tracking-[0.2em] ml-1 ${lang === 'ar' ? 'font-arabic' : ''}`}>{lang === 'ar' ? 'الرسالة' : 'Message'}</label>
        <textarea className={`w-full bg-gray-50 border border-gray-100 ${focusRing} focus:bg-white rounded-lg md:rounded-xl px-4 py-3 md:px-5 md:py-3.5 ${config.themeColor.primary} font-bold placeholder:text-gray-300 outline-none transition-all resize-none h-20 md:h-32 focus:ring-8 text-sm ${lang === 'ar' ? 'font-arabic' : ''}`} placeholder={lang === 'ar' ? 'اشرح لنا طلبك...' : "Please explain your situation..."} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} disabled={isSubmitting || !!cooldown}></textarea>
      </div>
      <button type="submit" disabled={isSubmitting || !!cooldown} className={`w-full ${btnClass} text-white font-black text-sm md:text-base py-3.5 md:py-4 rounded-lg md:rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 group uppercase tracking-widest disabled:opacity-50 ${lang === 'ar' ? 'font-arabic' : ''}`}>
        {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : cooldown > 0 ? (lang === 'ar' ? `حاول مرة أخرى خلال ${Math.floor(cooldown / 60)}د ${cooldown % 60}ث` : `Try again in ${Math.floor(cooldown / 60)}m ${cooldown % 60}s`) : (<>{lang === 'ar' ? 'إرسال الطلب' : 'Submit Request'} <SendHorizonal className={`w-5 h-5 group-hover:translate-x-2 transition-transform ${lang === 'ar' ? 'rotate-180' : ''}`} /></>)}
      </button>
    </form>
  );

  /* ──────────────────────────────────────────────
     ALT LAYOUT — Indonesia / China
     Split layout with gradient bg + floating icons
     ────────────────────────────────────────────── */
  if (isAlt) {
    const gradBg = config.countryName === 'Japan' ? 'from-slate-900 via-sky-950 to-slate-900' : config.countryName === 'Indonesia' ? 'from-emerald-900 via-emerald-800 to-emerald-950' : 'from-teal-900 via-teal-800 to-teal-950';
    const glowColor = config.countryName === 'Japan' ? 'bg-sky-500/20' : config.countryName === 'Indonesia' ? 'bg-emerald-500/20' : 'bg-teal-500/20';
    const accentColor = config.countryName === 'Japan' ? 'text-[#FF8000]' : config.countryName === 'Indonesia' ? 'text-emerald-400' : 'text-teal-400';
    const dotColor = config.countryName === 'Japan' ? 'bg-[#FF8000]' : config.countryName === 'Indonesia' ? 'bg-emerald-400' : 'bg-teal-400';
    const focusRing = config.countryName === 'Japan' ? 'focus:border-[#FF8000] focus:ring-[#FF8000]/10' : config.countryName === 'Indonesia' ? 'focus:border-emerald-500 focus:ring-emerald-500/5' : 'focus:border-teal-500 focus:ring-teal-500/5';
    const formAccent = config.countryName === 'Japan' ? 'text-[#FF8000]' : config.countryName === 'Indonesia' ? 'text-emerald-500' : 'text-teal-500';
    const btnBg = config.countryName === 'Japan' ? 'bg-[#FF8000] hover:bg-[#FF9933]' : config.countryName === 'Indonesia' ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-teal-600 hover:bg-teal-500';

    const contactItems = [
      { icon: <Phone className="w-4 h-4 md:w-5 md:h-5" />, title: lang === 'ar' ? "اتصل بنا" : "Call Us", desc: "+971 54 438 8038", link: "tel:+971544388038" },
      { icon: <Mail className="w-4 h-4 md:w-5 md:h-5" />, title: lang === 'ar' ? "البريد الإلكتروني" : "Email", desc: "contact@travnook.com", link: "mailto:contact@travnook.com" },
      { icon: <MapPin className="w-4 h-4 md:w-5 md:h-5" />, title: lang === 'ar' ? "المكتب" : "Office", desc: lang === 'ar' ? "دبي، الإمارات" : "Dubai, UAE", link: "#" }
    ];

    return (
      <section className={`relative py-12 md:py-24 bg-gradient-to-b ${gradBg} overflow-hidden`} id="contact">
        {/* Floating glow effects */}
        <div className={`absolute top-[-10%] right-[-10%] w-[400px] h-[400px] ${glowColor} rounded-full blur-[120px] pointer-events-none`}></div>
        <div className={`absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] ${glowColor} rounded-full blur-[100px] pointer-events-none`}></div>

        {/* Floating decorative icons */}
        <motion.div animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-[15%] right-[10%] text-white/5 pointer-events-none hidden md:block">
          <Plane className="w-20 h-20 rotate-45" />
        </motion.div>
        <motion.div animate={{ y: [0, 10, 0], rotate: [0, -3, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute bottom-[20%] left-[5%] text-white/5 pointer-events-none hidden md:block">
          <Globe className="w-16 h-16" />
        </motion.div>

        <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-14 items-center">

            {/* Left: Info */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-white">
              <div className={`inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 backdrop-blur-md rounded-full border border-white/10 ${accentColor} font-outfit font-black text-[10px] tracking-[0.2em] mb-5 uppercase`}>
                <MessageCircle className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'تواصل معنا' : 'REACH OUT'}</span>
              </div>

              <h2 className={`text-3xl md:text-5xl font-sora font-black tracking-tighter leading-[1.1] mb-4 ${lang === 'ar' ? 'font-arabic' : ''}`}>
                {lang === 'ar' ? (
                  <>احصل على إجابات <br /> <span className={`${accentColor} font-script font-normal text-[1.3em]`}>الخبراء!</span></>
                ) : (
                  <>Start Your {config.countryName} <br /> <span className={`${accentColor} font-script font-normal text-[1.3em]`}>Visa Application Today</span></>
                )}
              </h2>

              <p className={`text-white/50 text-sm md:text-base font-outfit mb-8 max-w-md leading-relaxed ${lang === 'ar' ? 'font-arabic opacity-80' : ''}`}>
                {lang === 'ar' 
                  ? 'موظفينا متاحين 24/7 للرد على استفساراتكم ومساعدتكم في طلبكم.'
                  : 'Get step-by-step assistance from our visa experts and simplify your application process.'}
              </p>

              <div className="space-y-3">
                {contactItems.map((item, idx) => (
                  <motion.a
                    key={idx}
                    href={item.link}
                    whileHover={{ x: 6 }}
                    className="flex items-center gap-3 md:gap-4 group p-3 rounded-xl hover:bg-white/5 transition-all border border-transparent hover:border-white/10"
                  >
                    <div className={`w-9 h-9 md:w-11 md:h-11 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ${accentColor} group-hover:scale-110 transition-all`}>
                      {item.icon}
                    </div>
                    <div className="font-outfit">
                      <p className={`text-white/30 text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] ${lang === 'ar' ? 'font-arabic' : ''}`}>{item.title}</p>
                      <p className={`text-white text-sm md:text-base font-black tracking-tight ${lang === 'ar' ? 'font-arabic' : ''}`} dir="ltr">{item.desc}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Right: Form glass card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-5 md:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-[0_30px_80px_rgba(0,0,0,0.3)] relative overflow-hidden"
            >
              <div className="relative z-10 font-outfit">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className={`w-5 h-5 ${formAccent}`} />
                  <h3 className={`text-lg md:text-xl font-black ${config.themeColor.primary} tracking-tight uppercase ${lang === 'ar' ? 'font-arabic' : ''}`}>
                    {lang === 'ar' ? 'أرسل استفسارك' : 'Send Your Enquiry'}
                  </h3>
                </div>
                <p className={`text-gray-400 mb-5 text-xs md:text-sm font-bold max-w-sm ${lang === 'ar' ? 'font-arabic opacity-80' : ''}`}>
                  {lang === 'ar' ? 'عادةً نرد خلال 15 دقيقة.' : 'We usually respond within 15 minutes.'}
                </p>

                {renderForm(focusRing, formAccent, btnBg)}

                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-[9px] font-black text-gray-400 uppercase tracking-widest">
                  <span className={lang === 'ar' ? 'font-arabic' : ''}>{lang === 'ar' ? 'الأمان مضمون' : 'Safety Guaranteed'}</span>
                  <div className="flex gap-2 items-center">
                    <div className={`w-1.5 h-1.5 rounded-full ${dotColor} animate-pulse`}></div>
                    <span className={`opacity-60 ${lang === 'ar' ? 'font-arabic' : ''}`}>{lang === 'ar' ? 'موظفينا متاحين' : 'Agents Online'}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  /* ──────────────────────────────────────────────
     SCHENGEN LAYOUT — Original (unchanged)
     ────────────────────────────────────────────── */
  return (
    <section className="relative py-12 md:py-32 bg-brand-teal overflow-hidden" id="contact">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[400px] md:w-[500px] h-[400px] md:h-[500px] bg-brand-green rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-brand-yellow/30 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-center">
          <div className="lg:col-span-5 text-white">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="inline-flex items-center gap-2 md:gap-3 px-3 py-1.5 md:px-5 md:py-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-4 md:mb-8 text-brand-yellow font-outfit font-black tracking-[0.15em] md:tracking-[0.2em] text-[9px] md:text-xs uppercase">
                <Globe className="w-3.5 h-3.5 md:w-4 md:h-4 text-brand-green" /><span>{lang === 'ar' ? 'مساعدة عالمية' : 'GLOBAL ASSISTANCE'}</span>
              </div>
              <h2 className={`text-3xl md:text-6xl lg:text-8xl font-black mb-4 md:mb-8 leading-[1.1] md:leading-[1] tracking-tighter font-sora ${lang === 'ar' ? 'font-arabic' : ''}`}>
                {lang === 'ar' ? (
                  <>احصل على إجابات <br /><span className="text-brand-yellow font-script font-normal text-[1.3em] md:text-[1.4em] drop-shadow-2xl translate-y-1 md:translate-y-2 inline-block">الخبراء!</span></>
                ) : (
                  <>Get Expert <br /><span className="text-brand-yellow font-script font-normal text-[1.3em] md:text-[1.4em] drop-shadow-2xl translate-y-1 md:translate-y-2 inline-block">Answers!</span></>
                )}
              </h2>
              <p className={`text-white/60 text-sm md:text-xl mb-6 md:mb-12 font-outfit leading-relaxed max-w-md font-medium tracking-wide ${lang === 'ar' ? 'font-arabic opacity-80' : ''}`}>
                {lang === 'ar' ? 'موظفينا متاحين 24/7 للرد على استفساراتكم.' : 'Our professional agents are available 24/7 to handle your inquiries.'}
              </p>
              <div className="space-y-3 md:space-y-6">
                {[
                  { icon: <Phone className="w-4 h-4 md:w-6 md:h-6" />, title: "Call Us Now", arTitle: "اتصل بنا الآن", desc: "+971 54 438 8038", link: "tel:+971544388038", color: 'text-brand-green' },
                  { icon: <Mail className="w-4 h-4 md:w-6 md:h-6" />, title: "Email Address", arTitle: "البريد الإلكتروني", desc: "contact@travnook.com", link: "mailto:contact@travnook.com", color: 'text-brand-yellow' },
                  { icon: <MapPin className="w-4 h-4 md:w-6 md:h-6" />, title: "Visit Office", arTitle: "الموقع", desc: (<>{lang === 'ar' ? 'مكتب M1, M2, M3, الدور الأول' : 'Office M1, M2, M3, 1st Floor'}<br className="hidden md:block" /><span className="text-base md:text-2xl mt-1 block">{lang === 'ar' ? 'دبي، الإمارات' : 'Dubai, UAE'}</span></>), link: "#", color: 'text-white' }
                ].map((item, idx) => (
                  <motion.a key={idx} href={item.link} whileHover={{ x: 10 }} className="flex items-center gap-3 md:gap-6 group p-2.5 md:p-4 rounded-xl md:rounded-3xl hover:bg-white/5 transition-all border border-transparent hover:border-white/10">
                    <div className={`w-10 h-10 md:w-14 md:h-14 shrink-0 rounded-lg md:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center ${item.color} group-hover:scale-110 transition-all duration-300 shadow-lg`}>{item.icon}</div>
                    <div className="font-outfit">
                      <h4 className={`text-white/30 text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] mb-0.5 md:mb-1 ${lang === 'ar' ? 'font-arabic' : ''}`}>{lang === 'ar' ? item.arTitle : item.title}</h4>
                      <p className={`text-white text-sm md:text-xl font-black transition-colors leading-tight tracking-tight ${lang === 'ar' ? 'font-arabic' : ''}`} dir="ltr">{item.desc}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-7">
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white p-5 md:p-14 rounded-[2rem] md:rounded-[3.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.4)] relative overflow-hidden ring-1 ring-black/5">
              <div className="absolute top-4 right-4 md:top-8 md:right-8 flex flex-col items-center">
                <div className="w-12 h-12 md:w-20 md:h-20 bg-brand-yellow rounded-full flex items-center justify-center shadow-lg animate-spin-slow" style={{ animationDuration: '20s' }}>
                  <Plane className="w-6 h-6 md:w-10 md:h-10 text-white rotate-45" />
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100"><path id="badgePath" d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" /><text className="text-[6px] font-black fill-white/50 tracking-[0.6em] font-outfit uppercase"><textPath href="#badgePath">Trusted Service • Priority • </textPath></text></svg>
                </div>
              </div>
              <div className="relative z-10 font-outfit">
                <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                  <ShieldCheck className="w-5 h-5 md:w-7 md:h-7 text-brand-green" />
                  <h3 className={`text-xl md:text-3xl font-black text-brand-teal tracking-tighter uppercase ${lang === 'ar' ? 'font-arabic' : ''}`}>{lang === 'ar' ? 'أرسل استفسارك' : 'Send Your Enquiry'}</h3>
                </div>
                <p className={`text-gray-400 mb-6 md:mb-10 text-xs md:text-lg font-bold leading-relaxed max-w-sm ${lang === 'ar' ? 'font-arabic opacity-80' : ''}`}>{lang === 'ar' ? 'عادةً نرد خلال 15 دقيقة. خبراؤنا مستعدون للمساعدة.' : 'We usually respond within 15 minutes. Our experts are ready to help.'}</p>
                {renderForm('focus:border-brand-green focus:ring-brand-green/5', 'text-brand-green', 'bg-brand-green hover:bg-brand-teal')}
                <div className="mt-6 md:mt-12 pt-4 md:pt-8 border-t border-gray-100 flex items-center justify-between text-[9px] md:text-[11px] font-black text-gray-400 uppercase tracking-widest">
                  <span className={lang === 'ar' ? 'font-arabic' : ''}>{lang === 'ar' ? 'الأمان مضمون' : 'Safety Guaranteed'}</span>
                  <div className="flex gap-2 items-center"><div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-brand-green animate-pulse"></div><span className={`opacity-60 uppercase ${lang === 'ar' ? 'font-arabic' : ''}`}>{lang === 'ar' ? 'موظفينا متاحين' : 'Agents Online'}</span></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="mt-10 md:mt-20"></div>
      </div>
    </section>
  );
};

export default Contact;
