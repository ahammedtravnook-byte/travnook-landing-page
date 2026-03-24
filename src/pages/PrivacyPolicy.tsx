import { useMemo, useEffect, useState } from 'react';
import { getCountryConfig } from '../data/countryConfig';
import { ShieldCheck, ArrowLeft, Cookie, Contact, Shield, FileLock2, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  navigate: (path: string) => void;
  lang?: 'en' | 'ar';
}

export default function PrivacyPolicy({ navigate, lang = 'en' }: Props) {
  const config = useMemo(() => getCountryConfig(), []);
  const [activeSection, setActiveSection] = useState<string | null>('info');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isJapan = config.countryName === 'Japan';
  const isIndo = config.countryName === 'Indonesia';
  
  const bgHeader = isJapan ? 'bg-slate-900' : isIndo ? 'bg-emerald-950' : 'bg-[#0d4a41]';
  const accentColor = isJapan ? 'text-[#FF8000]' : isIndo ? 'text-emerald-400' : 'text-[#f4a31a]';
  const bgAccentLight = isJapan ? 'bg-[#FF8000]/10' : isIndo ? 'bg-emerald-500/10' : 'bg-[#f4a31a]/10';

  const sections = useMemo(() => {
    if (lang === 'ar') {
      return [
        {
          id: "info", 
          icon: <FileLock2 className={`w-5 h-5 md:w-6 md:h-6 ${accentColor}`} />, 
          title: "١. البيانات اللي نجمعها",
          content: (
            <div className="space-y-6 text-sm md:text-base text-gray-600 text-right font-arabic">
               <div>
                   <strong className={`${config.themeColor.primary} block mb-3 text-lg`}>البيانات الشخصية</strong>
                   <p className="mb-4">ممكن نجمع بياناتك اللي تعطينا إياها برضاك، مثل:</p>
                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {["الاسم الكامل", "البريد الإلكتروني", "رقم الهاتف", "الجنسية", "تفاصيل الجواز (عند الحاجة)", "معلومات تعريفية أخرى"].map((item, i) => (
                         <div key={i} className="flex items-center gap-3 bg-gray-50/80 p-3 rounded-xl border border-gray-100 shadow-sm">
                            <div className={`w-2 h-2 rounded-full ${isJapan ? 'bg-[#FF8000]' : isIndo ? 'bg-emerald-500' : 'bg-[#f4a31a]'}`}></div>
                            <span className="text-gray-700 font-bold text-sm leading-tight">{item}</span>
                         </div>
                      ))}
                   </div>
               </div>
               <hr className="border-gray-100" />
               <div>
                   <strong className={`${config.themeColor.primary} block mb-3 text-lg`}>بيانات الاستخدام</strong>
                   <p className="mb-4">نجمع معلومات غير شخصية تلقائياً، تشمل:</p>
                   <ul className="grid gap-3 mb-6">
                     {['عنوان IP', 'نوع المتصفح وإصداره', 'نوع الجهاز ونظام التشغيل', 'الصفحات اللي زرتها ووقت الزيارة'].map((item, i) => (
                       <li key={i} className="flex gap-3 items-center bg-gray-50/50 p-2.5 rounded-lg border border-gray-50">
                         <span className={`w-1.5 h-1.5 rounded-full ${isJapan ? 'bg-[#FF8000]' : isIndo ? 'bg-emerald-500' : 'bg-[#f4a31a]'}`}></span>
                         <span>{item}</span>
                       </li>
                     ))}
                   </ul>
                   <p className="p-5 bg-blue-50/50 rounded-xl border border-blue-100 text-sm font-medium text-blue-900/80 shadow-inner">
                     الهدف الوحيد من هالمعلومات هو تحليل التوجهات وإدارة الموقع وتحسين تجربة المستخدم.
                   </p>
               </div>
            </div>
          )
        },
        {
          id: "cookies", 
          icon: <Cookie className={`w-5 h-5 md:w-6 md:h-6 ${accentColor}`} />, 
          title: "٢. ملفات تعريف الارتباط",
          content: (
            <div className="p-5 border border-gray-100 rounded-2xl bg-gray-50/50 shadow-sm text-sm md:text-base text-gray-600 text-right font-arabic">
              <p>نستخدم ملفات تعريف الارتباط (Cookies) عشان نحسن تجربتك ونعرف كيف تستخدم موقعنا. تقدر تتحكم في إعدادات الكوكيز من متصفحك.</p>
            </div>
          )
        },
        {
          id: "usage", 
          icon: <Shield className={`w-5 h-5 md:w-6 md:h-6 ${accentColor}`} />, 
          title: "٣. كيف نستخدم البيانات",
          content: (
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100/50 shadow-inner text-sm md:text-base text-right font-arabic">
               <ul className="space-y-4">
                 {[
                   "توفير وتحسين خدماتنا",
                   "إدارة طلبات خدمات السفر",
                   "التواصل معك بخصوص استفساراتك",
                   "إرسال رسائل ترويجية (إذا وافقت)",
                   "كشف ومنع المشاكل التقنية",
                   "الالتزام بالواجبات القانونية"
                 ].map((item, i) => (
                   <li key={i} className="flex gap-3 items-center">
                      <CheckIcon className={`w-5 h-5 shrink-0 ${isJapan ? 'text-[#FF8000]' : isIndo ? 'text-emerald-500' : 'text-[#f4a31a]'}`} />
                      <span className="text-gray-700 font-bold leading-tight">{item}</span>
                   </li>
                 ))}
               </ul>
            </div>
          )
        },
        {
          id: "whatsapp", 
          icon: <span className={`text-xl md:text-2xl pt-1 ${accentColor}`}><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg></span>, 
          title: "٤. تسويق واتساب",
          content: (
            <div className="space-y-4 text-sm md:text-base text-gray-600 text-right font-arabic">
              <p>شركة ترافنوك للسفر ممكن تعالج بياناتك الشخصية (الاسم ورقم الهاتف) عشان ترسل لك رسائل تسويقية عن خدماتنا وعروضنا عبر الواتساب.</p>
              <p>أول رسالة نرسلها لك فيها طلب موافقة صريحة. وتقدر دائماً تنسحب من القائمة البريدية في أي وقت.</p>
              <div className="bg-[#25D366]/10 p-5 md:p-6 rounded-2xl border border-[#25D366]/30 shadow-sm relative overflow-hidden group">
                <p className="relative z-10 text-[#075E54] font-medium leading-relaxed indent-0">تقدر تلغي الاشتراك في أي وقت بإرسال كلمة <strong>"إلغاء الاشتراك"</strong> أو <strong>“Unsubscribe”</strong> في الواتساب أو عبر البريد الإلكتروني.</p>
              </div>
            </div>
          )
        },
        {
          id: "contact", 
          icon: <Contact className={`w-5 h-5 md:w-6 md:h-6 ${accentColor}`} />, 
          title: "٥. تواصل معنا",
          content: (
            <div className={`bg-gradient-to-br ${isJapan ? 'from-slate-50 to-slate-100 border-slate-200' : isIndo ? 'from-emerald-50 to-emerald-100/50 border-emerald-100' : 'from-teal-50 to-teal-100/50 border-teal-100'} rounded-2xl p-6 md:p-10 border shadow-inner text-right font-arabic`}>
              <h3 className={`text-xl font-black font-sora ${config.themeColor.primary} mb-3`}>تواصل مع حماية البيانات</h3>
              <p className="mb-6 text-gray-500 text-sm md:text-base">لأي استفسارات أو شكاوى بخصوص بياناتك، تواصل معنا مباشرة.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="mailto:contact@travnook.com" className="bg-white p-4 rounded-xl shadow-sm border border-white/50 w-full hover:-translate-y-1 transition-transform cursor-pointer group">
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">البريد الإلكتروني</p>
                  <span className={`font-black text-sm md:text-base ${accentColor} group-hover:opacity-80`}>contact@travnook.com</span>
                </a>
                <a href="tel:+971544388038" className="bg-white p-4 rounded-xl shadow-sm border border-white/50 w-full hover:-translate-y-1 transition-transform cursor-pointer group">
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">رقم الهاتف</p>
                  <span className={`font-black text-sm md:text-base ${accentColor} group-hover:opacity-80`} dir="ltr">+971 54 438 80 38</span>
                </a>
              </div>
            </div>
          )
        }
      ];
    }
    return [
      {
        id: "info", 
        icon: <FileLock2 className={`w-5 h-5 md:w-6 md:h-6 ${accentColor}`} />, 
        title: "1. Information We Collect",
        content: (
          <div className="space-y-6 text-sm md:text-base text-gray-600">
             <div>
                 <strong className={`${config.themeColor.primary} block mb-3 text-lg`}>Personal Data</strong>
                 <p className="mb-4">We may collect personal information that you voluntarily provide to us, such as:</p>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {["Full name", "Email address", "Phone number", "Nationality", "Passport details (if required)", "Other identifying info"].map((item, i) => (
                       <div key={i} className="flex items-center gap-3 bg-gray-50/80 p-3 rounded-xl border border-gray-100 shadow-sm">
                          <div className={`w-2 h-2 rounded-full ${isJapan ? 'bg-[#FF8000]' : isIndo ? 'bg-emerald-500' : 'bg-[#f4a31a]'}`}></div>
                          <span className="text-gray-700 font-bold text-sm leading-tight">{item}</span>
                       </div>
                    ))}
                 </div>
             </div>
             
             <hr className="border-gray-100" />
  
             <div>
                 <strong className={`${config.themeColor.primary} block mb-3 text-lg`}>Usage Data</strong>
                 <p className="mb-4">We collect non-personal information automatically, including:</p>
                 <ul className="grid gap-3 mb-6">
                   {['IP address', 'Browser type and version', 'Device type and Operating system', 'Pages visited, time and date of visit'].map((item, i) => (
                     <li key={i} className="flex gap-3 items-center bg-gray-50/50 p-2.5 rounded-lg border border-gray-50">
                       <span className={`w-1.5 h-1.5 rounded-full ${isJapan ? 'bg-[#FF8000]' : isIndo ? 'bg-emerald-500' : 'bg-[#f4a31a]'}`}></span>
                       <span>{item}</span>
                     </li>
                   ))}
                 </ul>
                 <p className="p-5 bg-blue-50/50 rounded-xl border border-blue-100 text-sm font-medium text-blue-900/80 shadow-inner">
                   Sole purpose of this information is for analyzing trends, administering the site, tracking users’ movement on the website, and gathering demographic information.
                 </p>
             </div>
          </div>
        )
      },
      {
        id: "cookies", 
        icon: <Cookie className={`w-5 h-5 md:w-6 md:h-6 ${accentColor}`} />, 
        title: "2. Cookies & Tracking",
        content: (
          <div className="p-5 border border-gray-100 rounded-2xl bg-gray-50/50 shadow-sm text-sm md:text-base text-gray-600">
            <p>We use cookies and similar technologies to enhance your experience, analyze usage patterns, and serve targeted advertisements. You can control cookie settings through your browser.</p>
          </div>
        )
      },
      {
        id: "usage", 
        icon: <Shield className={`w-5 h-5 md:w-6 md:h-6 ${accentColor}`} />, 
        title: "3. How We Use Data",
        content: (
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100/50 shadow-inner text-sm md:text-base">
             <ul className="space-y-4">
               {[
                 "To provide and improve our services",
                 "To process travel service requests",
                 "To contact you about your inquiries or bookings",
                 "To send promotional emails (if opted in)",
                 "To detect, prevent, and address technical issues",
                 "To comply with legal obligations"
               ].map((item, i) => (
                 <li key={i} className="flex gap-3 items-center">
                    <CheckIcon className={`w-5 h-5 shrink-0 ${isJapan ? 'text-[#FF8000]' : isIndo ? 'text-emerald-500' : 'text-[#f4a31a]'}`} />
                    <span className="text-gray-700 font-bold leading-tight">{item}</span>
                 </li>
               ))}
             </ul>
          </div>
        )
      },
      {
        id: "whatsapp", 
        icon: <span className={`text-xl md:text-2xl pt-1 ${accentColor}`}><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg></span>, 
        title: "4. WhatsApp Marketing",
        content: (
          <div className="space-y-4 text-sm md:text-base text-gray-600">
            <p>The Company Travnook Travels may process personal data of clients, including name and phone number, to send marketing and informational messages about the company’s products, services, promotions, and events via messengers, including WhatsApp.</p>
            <p>The first message sent to the client contains a request for explicit and informed consent to receive such messages. The client always has the opportunity to express consent or unsubscribe from the mailing list.</p>
            <div className="bg-[#25D366]/10 p-5 md:p-6 rounded-2xl border border-[#25D366]/30 shadow-sm relative overflow-hidden group">
              <div className="absolute top-[-20px] right-[-20px] opacity-10 blur-sm scale-150 rotate-12 transition-transform group-hover:scale-[2] duration-700">
                 <svg viewBox="0 0 24 24" width="100" height="100" stroke="#25D366" strokeWidth="1" fill="none"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              </div>
              <p className="relative z-10 text-[#075E54] font-medium leading-relaxed indent-0">The client can unsubscribe from receiving messages at any time by writing the word <strong>“Unsubscribe”</strong> in the messenger or by sending an email to contact@travnook.com with the subject <em>“Unsubscribe from WhatsApp Messages.”</em></p>
            </div>
          </div>
        )
      },
      {
        id: "contact", 
        icon: <Contact className={`w-5 h-5 md:w-6 md:h-6 ${accentColor}`} />, 
        title: "5. Contact",
        content: (
          <div className={`bg-gradient-to-br ${isJapan ? 'from-slate-50 to-slate-100 border-slate-200' : isIndo ? 'from-emerald-50 to-emerald-100/50 border-emerald-100' : 'from-teal-50 to-teal-100/50 border-teal-100'} rounded-2xl p-6 md:p-10 border shadow-inner`}>
            <h3 className={`text-xl font-black font-sora ${config.themeColor.primary} mb-3`}>Reach Out to Data Protection</h3>
            <p className="mb-6 text-gray-500 text-sm md:text-base">For queries, complaints or exercising your rights regarding your data, contact us directly.</p>
  
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="mailto:contact@travnook.com" className="bg-white p-4 rounded-xl shadow-sm border border-white/50 w-full hover:-translate-y-1 transition-transform cursor-pointer group">
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Email</p>
                <span className={`font-black text-sm md:text-base ${accentColor} group-hover:opacity-80`}>contact@travnook.com</span>
              </a>
              <a href="tel:+971544388038" className="bg-white p-4 rounded-xl shadow-sm border border-white/50 w-full hover:-translate-y-1 transition-transform cursor-pointer group">
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Phone Number</p>
                <span className={`font-black text-sm md:text-base ${accentColor} group-hover:opacity-80`}>+971 54 438 80 38</span>
              </a>
            </div>
          </div>
        )
      }
    ];
  }, [lang, accentColor, config.themeColor.primary, isIndo, isJapan]);

  const handleToggle = (id: string) => {
    setActiveSection(activeSection === id ? null : id);
  };

  return (
    <main className="bg-gray-50 min-h-screen font-outfit pb-20">
      
      {/* Dynamic Curved Header */}
      <div className={`relative pt-32 pb-32 md:pb-48 ${bgHeader} overflow-hidden`}>
         {/* Decorative meshes */}
         <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full mix-blend-overlay opacity-20 blur-[80px]" style={{ backgroundColor: isJapan ? '#FF8000' : isIndo ? '#10b981' : '#f4a31a' }}></div>
         <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] rounded-full mix-blend-overlay opacity-20 blur-[60px]" style={{ backgroundColor: '#ffffff' }}></div>
         
         {/* Curved SVG Bottom Divider */}
         <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
            <svg className="relative block w-[calc(110%+1.3px)] h-[60px] md:h-[120px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,123.63,200,105.7,243.62,94.39,282.72,73.5,321.39,56.44Z" fill="#f9fafb"></path>
            </svg>
         </div>

         <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white font-outfit font-black text-[10px] md:text-xs tracking-[0.2em] mb-6 uppercase">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'حماية البيانات' : 'Data Protection'}</span>
            </motion.div>
            <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className={`text-4xl md:text-6xl lg:text-7xl font-black font-sora text-white tracking-tighter mb-4 ${lang === 'ar' ? 'font-arabic' : ''}`}>
               <span className="opacity-90">{lang === 'ar' ? 'سياسة ' : 'Privacy '} </span>
               <span className={`${accentColor} brightness-150 drop-shadow-lg`}>{lang === 'ar' ? 'الخصوصية' : 'Policy'}</span>
            </motion.h1>
            <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-white/60 text-xs md:text-base max-w-xl font-medium tracking-wide">
              {lang === 'ar' ? 'آخر تحديث: ١٠ أكتوبر ٢٠٢٥' : 'Last updated: Oct 10, 2025'}
            </motion.p>
         </div>
      </div>
      
      {/* Content Area */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-20 -mt-10 md:-mt-20">
         
         <button 
            onClick={() => navigate('/')} 
            className={`group flex items-center gap-2 text-gray-500 hover:text-gray-900 font-bold mb-6 md:mb-10 transition-colors text-sm w-fit px-5 py-2.5 bg-white rounded-full shadow-sm hover:shadow-md border border-gray-100 ${lang === 'ar' ? 'font-arabic' : ''}`}
         >
            <ArrowLeft className={`w-4 h-4 group-hover:-translate-x-1 transition-transform ${lang === 'ar' ? 'rotate-180' : ''}`} /> 
            <span>{lang === 'ar' ? 'الرجوع للرئيسية' : 'Back to Home'}</span>
         </button>

         <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100 mb-10 text-center relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-32 h-32 ${bgAccentLight} rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-125 duration-700`}></div>
            <p className={`text-sm md:text-base font-bold text-gray-600 leading-relaxed max-w-2xl mx-auto relative z-10 ${lang === 'ar' ? 'font-arabic' : ''}`}>
              {lang === 'ar' 
                ? 'في ترافنوك للسفر والسياحة، نقدّر خصوصيتك ونلتزم بحماية بياناتك الشخصية. هذه السياسة توضح كيف نجمع ونستخدم ونحمي بياناتك الشخصية لما تزور موقعنا أو تستخدم خدماتنا.'
                : 'At Travnook Travel and Tourism, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you visit our website or use our services.'}
            </p>
         </div>

         <div className="p-5 md:p-6 bg-red-50/80 border border-red-200/60 rounded-2xl mb-10 shadow-sm relative overflow-hidden group hover:bg-red-50 transition-colors">
             <div className="absolute top-[-10px] right-[-10px] text-[100px] opacity-[0.03] select-none">⚠️</div>
             <p className={`text-red-700/80 font-bold flex gap-4 text-sm md:text-base relative z-10 leading-relaxed ${lang === 'ar' ? 'font-arabic text-right' : ''}`}>
                <span className="text-xl md:text-2xl mt-0.5">⚠️</span>
                <span>{lang === 'ar' 
                  ? 'إخلاء مسؤولية: نحن مستشارو تأشيرات ولسنا سفارة. قرارات التأشيرة تتخذها السفارة أو القنصلية المعنية فقط.'
                  : 'Disclaimer: We are visa consultants, not an embassy. Visa decisions are made solely by the respective embassy or consulate.'}</span>
             </p>
         </div>

         {/* Premium Accordion Layout */}
         <div className="space-y-4">
            {sections.map((section) => (
               <div key={section.id} className={`bg-white rounded-2xl border ${activeSection === section.id ? 'border-gray-300 shadow-md ring-4 ring-gray-50/50' : 'border-gray-100 shadow-sm hover:border-gray-200'} transition-all overflow-hidden`}>
                  <button 
                     onClick={() => handleToggle(section.id)}
                     className="w-full flex items-center justify-between p-5 md:p-6 bg-white outline-none cursor-pointer"
                  >
                     <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center shadow-sm shrink-0 ${activeSection === section.id ? bgAccentLight : 'bg-gray-50'}`}>
                           {section.icon}
                        </div>
                         <h2 className={`text-lg md:text-xl font-black font-sora ${activeSection === section.id ? config.themeColor.primary : 'text-gray-700'} ${lang === 'ar' ? 'text-right font-arabic' : 'text-left'}`}>
                            {section.title}
                         </h2>
                     </div>
                     <ChevronDown className={`w-5 h-5 md:w-6 md:h-6 text-gray-400 shrink-0 transition-transform duration-300 ${activeSection === section.id ? 'rotate-180' : 'rotate-0'}`} />
                  </button>
                  
                  <AnimatePresence>
                     {activeSection === section.id && (
                        <motion.div
                           initial={{ height: 0, opacity: 0 }}
                           animate={{ height: 'auto', opacity: 1 }}
                           exit={{ height: 0, opacity: 0 }}
                           transition={{ duration: 0.3, ease: 'easeInOut' }}
                           className="overflow-hidden"
                        >
                           <div className="p-5 md:p-8 pt-0 border-t border-gray-50 mt-2">
                             {section.content}
                           </div>
                        </motion.div>
                     )}
                  </AnimatePresence>
               </div>
            ))}
         </div>

      </div>
    </main>
  );
}

function CheckIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
}
