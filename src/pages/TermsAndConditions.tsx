import { useMemo, useEffect, useState } from 'react';
import { getCountryConfig } from '../data/countryConfig';
import { FileText, ArrowLeft, ShieldCheck, BadgeCheck, CheckCircle2, AlertTriangle, Scale, Contact, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  navigate: (path: string) => void;
  lang?: 'en' | 'ar';
}

export default function TermsAndConditions({ navigate, lang = 'en' }: Props) {
  const config = useMemo(() => getCountryConfig(), []);
  const [activeSection, setActiveSection] = useState<string | null>('acceptance');

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
          id: "acceptance", 
          icon: <BadgeCheck className={`w-5 h-5 md:w-6 md:h-6 ${accentColor}`} />, 
          title: "١. قبول الشروط",
          content: (
            <div className="space-y-4 text-sm md:text-base text-gray-600 leading-relaxed text-right font-arabic">
              <p className="flex gap-4 items-start bg-gray-50 p-4 rounded-xl border border-gray-100/50">
                <span className={`font-black ${accentColor} mt-0.5`}>١.١</span> 
                <span>بمجرد طلبك أو استلامك لأي خدمة من ترافنوك للسفر والسياحة، سواء عبر واتساب، الهاتف، البريد الإلكتروني، أو شخصياً، فأنت تؤكد أنك قرأت وفهمت ووافقت على الالتزام قانونياً بهذه الشروط والأحكام.</span>
              </p>
              <p className="flex gap-4 items-start bg-gray-50 p-4 rounded-xl border border-gray-100/50">
                <span className={`font-black ${accentColor} mt-0.5`}>١.٢</span> 
                <span>إذا ما وافقت على كل البنود، يجب عليك عدم استخدام خدماتنا.</span>
              </p>
            </div>
          )
        },
        {
          id: "definitions", 
          icon: <FileText className={`w-5 h-5 md:w-6 md:h-6 ${accentColor}`} />, 
          title: "٢. التعريفات",
          content: (
            <div className="grid gap-3 text-sm md:text-base text-gray-600 text-right font-arabic">
               <div className={`p-5 rounded-xl border border-gray-100 ${bgAccentLight}`}>
                 <p><strong className={`${config.themeColor.primary} block mb-2 text-base`}>“الخدمات”</strong> تعني المساعدة في التأشيرات، الطيران، الفنادق، البكجات السياحية، أو أي استشارات وخدمات نقدمها كأصيل أو وكيل.</p>
               </div>
               <div className={`p-5 rounded-xl border border-gray-100 ${bgAccentLight}`}>
                 <p><strong className={`${config.themeColor.primary} block mb-2 text-base`}>“المورد”</strong> تعني أي طرف ثالث (طيران، فندق، سفارة، مركز تأشيرات) يتم ترتيب منتجه أو خدمته عبر ترافنوك.</p>
               </div>
            </div>
          )
        },
        {
          id: "scope", 
          icon: <CheckCircle2 className={`w-5 h-5 md:w-6 md:h-6 ${accentColor}`} />, 
          title: "٣. نطاق الخدمات ودورنا",
          content: (
            <div className="space-y-5 text-sm md:text-base text-gray-600 text-right font-arabic">
              <div className="border-[1.5px] border-gray-100 p-5 rounded-2xl relative overflow-hidden group hover:border-gray-200 transition-colors">
                <strong className={`${config.themeColor.primary} block mb-2 md:text-lg`}>٣.١ وكيل/وسيط</strong>
                <p>نحن نعمل كوكيل للموردين. عقدك بخصوص منتج السفر يكون مع المورد المعني.</p>
                <div className={`absolute top-0 left-0 w-24 h-24 ${bgAccentLight} rounded-br-full -ml-12 -mt-12 transition-transform group-hover:scale-110`}></div>
              </div>
              <div className="border-[1.5px] border-gray-100 p-5 rounded-2xl relative overflow-hidden group hover:border-gray-200 transition-colors">
                <strong className={`${config.themeColor.primary} block mb-2 md:text-lg`}>٣.٢ لا تبعية حكومية</strong>
                <p>ترافنوك شركة مستقلة وليس لها علاقة بأي سفارة أو جهة حكومية؛ كل القرارات النهائية تعود لهذه الجهات.</p>
              </div>
              <div className="border-[1.5px] border-gray-100 p-5 rounded-2xl">
                <strong className={`${config.themeColor.primary} block mb-3 md:text-lg`}>٣.٣ وصف الخدمة</strong>
                <ul className="grid gap-2">
                  {['تعبئة نماذج التأشيرة وتحديد المواعيد وتجهيز الأوراق', 'تسهيل حجوزات الطيران والفنادق والسيارات', 'دعم استشاري قبل وخلال وبعد السفر'].map((item, i) => (
                    <li key={i} className="flex gap-3 items-start bg-gray-50/50 p-3 rounded-lg">
                      <div className={`w-1.5 h-1.5 rounded-full ${isJapan ? 'bg-[#FF8000]' : isIndo ? 'bg-emerald-500' : 'bg-[#f4a31a]'} mt-2 shrink-0`}></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        },
        {
          id: "eligibility", 
          icon: <ShieldCheck className={`w-5 h-5 md:w-6 md:h-6 ${accentColor}`} />, 
          title: "٤. أهلية العميل ومسؤولياته",
          content: (
            <div className="space-y-4 text-sm md:text-base text-gray-600 text-right font-arabic">
              {[
                { tag: "٤.١ العمر والأهلية", text: "الخدمات متوفرة فقط للأفراد البالغين ١٨ سنة فأكثر ولهم الأهلية القانونية للتعاقد بموجب قانون الإمارات." },
                { tag: "٤.٢ دقة المعلومات", text: "أنت تضمن أن كل المعلومات والوثائق المقدمة صحيحة وكاملة. ترافنوك ليست مسؤولة عن أي رفض أو تأخير بسبب معلومات ناقصة أو خطأ." },
                { tag: "٤.٣ التحقق من الوثائق", text: "يجب عليك التحقق من كل الموافقات قبل الالتزام بخطط سفر غير قابلة للاسترداد." }
              ].map((item, i) => (
                <div key={i} className="bg-white border border-gray-100 shadow-sm p-4 md:p-5 rounded-xl border-r-4" style={{ borderRightColor: isJapan ? '#FF8000' : isIndo ? '#10b981' : '#f4a31a' }}>
                  <strong className={`${config.themeColor.primary} block mb-1.5`}>{item.tag}</strong>
                  <p className="text-gray-500">{item.text}</p>
                </div>
              ))}
            </div>
          )
        },
        {
          id: "immigration", 
          icon: <Scale className={`w-5 h-5 md:w-6 md:h-6 ${accentColor}`} />, 
          title: "٥. التأشيرات والهجرة",
          content: (
            <div className="space-y-6 text-sm md:text-base text-gray-600 text-right font-arabic">
              <div className="flex gap-4 p-5 bg-orange-50/50 border border-orange-100 rounded-2xl">
                 <AlertTriangle className="w-6 h-6 text-orange-500 shrink-0" />
                 <div>
                    <strong className={`${config.themeColor.primary} block mb-1`}>٥.١ لا ضمان للقرار</strong>
                    <p>كل قرارات التأشيرة تعود للسلطات المختصة فقط. ترافنوك لا تضمن الموافقة أو وقت الإجراءات.</p>
                 </div>
              </div>
              <div className="px-5">
                <strong className={`${config.themeColor.primary} block mb-1`}>٥.٢ إعادة التقديم</strong>
                <p>في حال رفض التأشيرة، تُطبق رسوم مهنية جديدة لأي إعادة تقديم.</p>
              </div>
            </div>
          )
        },
        {
          id: "liability", 
          icon: <AlertTriangle className={`w-5 h-5 md:w-6 md:h-6 ${accentColor}`} />, 
          title: "٦. حدود المسؤولية",
          content: (
            <div className="space-y-6 text-sm md:text-base text-gray-600 text-right font-arabic">
              <p className="p-5 border border-gray-100 rounded-2xl bg-white shadow-sm">
                <strong className={`${config.themeColor.primary}`}>٦.١</strong> بموجب قانون الإمارات، مسؤولية ترافنوك لا تتجاوز الرسوم المهنية المستلمة بخصوص المعاملة المعنية.
              </p>
              <div>
                <strong className={`${config.themeColor.primary} block mb-4 px-2`}>٦.٢ ترافنوك ليست مسؤولة عن:</strong>
                <ul className="grid gap-3">
                   {[
                     'الأضرار غير المباشرة أو التبعية', 
                     'خسارة الأرباح أو الإيرادات أو البيانات', 
                     'التكاليف الناجمة عن فوات الرحلات أو رفض التأشيرة'
                   ].map((item, idx) => (
                     <li key={idx} className="flex gap-3 items-center bg-red-50/40 p-3 md:p-4 rounded-xl border border-red-100/50">
                        <div className="w-2 h-2 rounded-full bg-red-400 shrink-0"></div>
                        <span className="text-red-900/70 font-medium">{item}</span>
                     </li>
                   ))}
                </ul>
              </div>
            </div>
          )
        },
        {
          id: "contact", 
          icon: <Contact className={`w-5 h-5 md:w-6 md:h-6 ${accentColor}`} />, 
          title: "٧. تواصل معنا",
          content: (
            <div className={`bg-gradient-to-br ${isJapan ? 'from-slate-50 to-slate-100 border-slate-200' : isIndo ? 'from-emerald-50 to-emerald-100/50 border-emerald-100' : 'from-teal-50 to-teal-100/50 border-teal-100'} rounded-2xl p-6 md:p-10 border shadow-inner text-right font-arabic`}>
              <h3 className={`text-xl font-black font-sora ${config.themeColor.primary} mb-3`}>تواصل مع قسم الامتثال</h3>
              <p className="mb-6 text-gray-500 text-sm md:text-base">لأي استفسارات أو شكاوى، تواصل مع فريق الامتثال مباشرة.</p>
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-white/50 mb-6">
                 <p className="font-black text-gray-800 uppercase tracking-widest text-[10px] md:text-[11px] mb-2 opacity-60">المقر الرئيسي</p>
                 <p className="font-bold text-gray-700 text-sm md:text-base">ترافنوك للسفر والسياحة LLC-FZ<br/>برج الكونفنش، مركز دبي التجاري العالمي<br/>مكتب ٥٧، الدور الثالث، دبي، الإمارات.</p>
              </div>
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
        id: "acceptance", 
        icon: <BadgeCheck className={`w-5 h-5 md:w-6 md:h-6 ${accentColor}`} />, 
        title: "1. Acceptance of Terms",
        content: (
          <div className="space-y-4 text-sm md:text-base text-gray-600 leading-relaxed">
            <p className="flex gap-4 items-start bg-gray-50 p-4 rounded-xl border border-gray-100/50">
              <span className={`font-black ${accentColor} mt-0.5`}>1.1</span> 
              <span>By requesting or receiving any service from Travnook Travel and Tourism LLC-FZ, whether through WhatsApp, telephone, e-mail, in person or online, you confirm that you have read, understood, and agree to be legally bound by these Terms & Conditions.</span>
            </p>
            <p className="flex gap-4 items-start bg-gray-50 p-4 rounded-xl border border-gray-100/50">
              <span className={`font-black ${accentColor} mt-0.5`}>1.2</span> 
              <span>If you do not accept all provisions, you must not use our Services.</span>
            </p>
          </div>
        )
      },
      {
        id: "definitions", 
        icon: <FileText className={`w-5 h-5 md:w-6 md:h-6 ${accentColor}`} />, 
        title: "2. Definitions",
        content: (
          <div className="grid gap-3 text-sm md:text-base text-gray-600">
             <div className={`p-5 rounded-xl border border-gray-100 ${bgAccentLight}`}>
               <p><strong className={`${config.themeColor.primary} block mb-2 text-base`}>“Services”</strong> means visa-assistance, flight, hotel, holiday package, car-rental or other travel-related arrangement, documentation, consultancy and any ancillary offering we provide, whether as principal or agent.</p>
             </div>
             <div className={`p-5 rounded-xl border border-gray-100 ${bgAccentLight}`}>
               <p><strong className={`${config.themeColor.primary} block mb-2 text-base`}>“Supplier”</strong> means any third party (airline, hotel, embassy, visa centre, car-hire company, insurance provider, tour operator, payment processor or other service provider) whose product or service is arranged by Travnook.</p>
             </div>
          </div>
        )
      },
      {
        id: "scope", 
        icon: <CheckCircle2 className={`w-5 h-5 md:w-6 md:h-6 ${accentColor}`} />, 
        title: "3. Scope of Services & Role",
        content: (
          <div className="space-y-5 text-sm md:text-base text-gray-600">
            <div className="border-[1.5px] border-gray-100 p-5 rounded-2xl relative overflow-hidden group hover:border-gray-200 transition-colors">
              <strong className={`${config.themeColor.primary} block mb-2 md:text-lg`}>3.1 Agent/Intermediary</strong>
              <p>Except where we expressly state in writing that Travnook is the principal, we act solely as agent for Suppliers. Your contract for the underlying travel product is with the relevant Supplier.</p>
              <div className={`absolute top-0 right-0 w-24 h-24 ${bgAccentLight} rounded-bl-full -mr-12 -mt-12 transition-transform group-hover:scale-110`}></div>
            </div>
            <div className="border-[1.5px] border-gray-100 p-5 rounded-2xl relative overflow-hidden group hover:border-gray-200 transition-colors">
              <strong className={`${config.themeColor.primary} block mb-2 md:text-lg`}>3.2 No Government Affiliation</strong>
              <p>Travnook is independent and not affiliated with any embassy, consulate, immigration authority, or any government entity; all final determinations rest with such authorities.</p>
              <div className={`absolute top-0 right-0 w-24 h-24 ${bgAccentLight} rounded-bl-full -mr-12 -mt-12 transition-transform group-hover:scale-110`}></div>
            </div>
            <div className="border-[1.5px] border-gray-100 p-5 rounded-2xl">
              <strong className={`${config.themeColor.primary} block mb-3 md:text-lg`}>3.3 Service Description</strong>
              <p className="mb-3">We provide, inter alia:</p>
              <ul className="grid gap-2">
                {['Visa form completion, appointment scheduling and supporting-document preparation', 'Reservation and booking facilitation for flights, accommodation, car hire', 'Advisory and concierge support before, during and after travel'].map((item, i) => (
                  <li key={i} className="flex gap-3 items-start bg-gray-50/50 p-3 rounded-lg">
                    <div className={`w-1.5 h-1.5 rounded-full ${isJapan ? 'bg-[#FF8000]' : isIndo ? 'bg-emerald-500' : 'bg-[#f4a31a]'} mt-2 shrink-0`}></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )
      },
      {
        id: "eligibility", 
        icon: <ShieldCheck className={`w-5 h-5 md:w-6 md:h-6 ${accentColor}`} />, 
        title: "4. Client Eligibility & Responsibilities",
        content: (
          <div className="space-y-4 text-sm md:text-base text-gray-600">
            {[
              { tag: "4.1 Age & Capacity", text: "Services are offered only to individuals aged 18 years or older with legal capacity to contract under UAE law." },
              { tag: "4.2 Complete & Accurate Info", text: "You warrant that all information and documentation supplied are true, complete and up-to-date. Travnook is not liable for any delay, rejection, loss, penalty or additional cost arising from inaccuracies." },
              { tag: "4.3 Document Verification", text: "You must verify all approvals before committing to non-refundable travel plans. Support itineraries issued by Travnook are illustrative only until full confirmation." }
            ].map((item, i) => (
              <div key={i} className="bg-white border border-gray-100 shadow-sm p-4 md:p-5 rounded-xl border-l-4" style={{ borderLeftColor: isJapan ? '#FF8000' : isIndo ? '#10b981' : '#f4a31a' }}>
                <strong className={`${config.themeColor.primary} block mb-1.5`}>{item.tag}</strong>
                <p className="text-gray-500">{item.text}</p>
              </div>
            ))}
          </div>
        )
      },
      {
        id: "immigration", 
        icon: <Scale className={`w-5 h-5 md:w-6 md:h-6 ${accentColor}`} />, 
        title: "5. Visas, Immigration & Entry",
        content: (
          <div className="space-y-6 text-sm md:text-base text-gray-600">
            <div className="flex gap-4 p-5 bg-orange-50/50 border border-orange-100 rounded-2xl">
               <AlertTriangle className="w-6 h-6 text-orange-500 shrink-0" />
               <div>
                  <strong className={`${config.themeColor.primary} block mb-1`}>5.1 No Guarantee</strong>
                  <p>All visa and immigration outcomes are solely determined by the issuing authority. Travnook does not guarantee approval, processing time or entry at the border, even with valid documentation.</p>
               </div>
            </div>
            <div className="px-5">
              <strong className={`${config.themeColor.primary} block mb-1`}>5.2 Reapplication</strong>
              <p>Where a visa is refused, fresh professional fees apply for any re-submission.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-inner">
              <strong className={`${config.themeColor.primary} block mb-4 text-center md:text-left`}>5.3 Client Obligations — You must:</strong>
              <div className="grid sm:grid-cols-3 gap-4">
                 {['Attend appointments on time', 'Provide biometrics or additional documents', 'Comply with destination health or security requirements'].map((item, idx) => (
                   <div key={idx} className="bg-white p-4 rounded-xl shadow-sm text-center border border-gray-100 flex flex-col items-center justify-center gap-2">
                      <div className={`w-8 h-8 rounded-full ${bgAccentLight} flex items-center justify-center font-black ${accentColor}`}>{idx+1}</div>
                      <span className="text-xs md:text-sm font-bold text-gray-600 leading-tight">{item}</span>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        )
      },
      {
        id: "liability", 
        icon: <AlertTriangle className={`w-5 h-5 md:w-6 md:h-6 ${accentColor}`} />, 
        title: "6. Limitation of Liability",
        content: (
          <div className="space-y-6 text-sm md:text-base text-gray-600">
            <p className="p-5 border border-gray-100 rounded-2xl bg-white shadow-sm">
              <strong className={`${config.themeColor.primary}`}>6.1</strong> To the maximum extent permitted by UAE law, Travnook’s aggregate liability shall not exceed the service fees actually received by Travnook for the transaction giving rise to the claim.
            </p>
            <div>
              <strong className={`${config.themeColor.primary} block mb-4 px-2`}>6.2 Travnook is not liable for:</strong>
              <ul className="grid gap-3">
                 {[
                   'Indirect, consequential, special, punitive or exemplary damages', 
                   'Loss of profits, revenue, goodwill or data', 
                   'Costs arising from missed flights, denied boarding or visa refusals'
                 ].map((item, idx) => (
                   <li key={idx} className="flex gap-3 items-center bg-red-50/40 p-3 md:p-4 rounded-xl border border-red-100/50">
                      <div className="w-2 h-2 rounded-full bg-red-400 shrink-0"></div>
                      <span className="text-red-900/70 font-medium">{item}</span>
                   </li>
                 ))}
              </ul>
            </div>
          </div>
        )
      },
      {
        id: "contact", 
        icon: <Contact className={`w-5 h-5 md:w-6 md:h-6 ${accentColor}`} />, 
        title: "7. Contact",
        content: (
          <div className={`bg-gradient-to-br ${isJapan ? 'from-slate-50 to-slate-100 border-slate-200' : isIndo ? 'from-emerald-50 to-emerald-100/50 border-emerald-100' : 'from-teal-50 to-teal-100/50 border-teal-100'} rounded-2xl p-6 md:p-10 border shadow-inner`}>
            <h3 className={`text-xl font-black font-sora ${config.themeColor.primary} mb-3`}>Reach Out to Compliance</h3>
            <p className="mb-6 text-gray-500 text-sm md:text-base">For queries, complaints or exercising your rights, contact our compliance team directly.</p>
            
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-white/50 mb-6">
               <p className="font-black text-gray-800 uppercase tracking-widest text-[10px] md:text-[11px] mb-2 opacity-60">Corporate HQ</p>
               <p className="font-bold text-gray-700 text-sm md:text-base">Travnook Travel & Tourism LLC-FZ<br/>Convention Tower, Dubai World Trade Center<br/>Office 57, 3rd Floor, Dubai, UAE.</p>
            </div>
  
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="mailto:contact@travnook.com" className="bg-white p-4 rounded-xl shadow-sm border border-white/50 w-full hover:-translate-y-1 transition-transform cursor-pointer group">
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Email</p>
                <span className={`font-black text-sm md:text-base ${accentColor} group-hover:opacity-80`}>contact@travnook.com</span>
              </a>
              <a href="tel:+971544388038" className="bg-white p-4 rounded-xl shadow-sm border border-white/50 w-full hover:-translate-y-1 transition-transform cursor-pointer group">
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Phone Number</p>
                <span className={`font-black text-sm md:text-base ${accentColor} group-hover:opacity-80`} dir="ltr">+971 54 438 80 38</span>
              </a>
            </div>
          </div>
        )
      }
    ];
  }, [lang, accentColor, config.themeColor.primary, isIndo, isJapan, bgAccentLight]);

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
              <Scale className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'اتفاقية قانونية' : 'Legal Agreement'}</span>
            </motion.div>
            <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className={`text-4xl md:text-6xl lg:text-7xl font-black font-sora text-white tracking-tighter mb-4 ${lang === 'ar' ? 'font-arabic' : ''}`}>
               <span className="opacity-90">{lang === 'ar' ? 'الشروط و ' : 'Terms & '} </span>
               <span className={`${accentColor} brightness-150 drop-shadow-lg`}>{lang === 'ar' ? 'الأحكام' : 'Conditions'}</span>
            </motion.h1>
            <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-white/60 text-xs md:text-base max-w-xl font-medium tracking-wide">
              {lang === 'ar' ? 'تاريخ النفاذ: ٣ يونيو ٢٠٢٥' : 'Effective Date: June 03, 2025'}
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

         <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100 mb-10 text-center">
            <p className={`text-sm md:text-base font-bold text-gray-600 leading-relaxed max-w-2xl mx-auto ${lang === 'ar' ? 'font-arabic' : ''}`}>
              {lang === 'ar' 
                ? 'هذه الشروط والأحكام توضح كيف تقدم ترافنوك للسفر والسياحة LLC-FZ الاستشارات والمساعدة لعملائنا في الإمارات. باستخدامك لخدماتنا، أنت توافق على هذه الشروط. يرجى قراءتها بعناية.'
                : 'These Terms and Conditions explain how Travnook Travel and Tourism LLC-FZ offers consultation and travel-related assistance to clients in the United Arab Emirates (UAE). By using our services, you agree to these Terms. Please read them carefully.'}
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
