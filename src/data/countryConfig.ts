// Common images can go here or we can specify exact ones
export type Plan = {
  title: string;
  desc: string;
  image: string;
  code: string;
  features: string[];
  featured?: boolean;
  ar?: {
    title: string;
    desc: string;
    features: string[];
  };
};

export type RequirementsList = {
  title: string;
  items: string[];
  ar?: {
    title: string;
    items: string[];
  };
};

export type FAQ = {
  question: string;
  answer: string;
  ar?: {
    question: string;
    answer: string;
  };
};

export type CountryConfig = {
  countryName: string;
  metaTitle: string;
  metaDesc: string;
  ar?: {
    metaTitle: string;
    metaDesc: string;
  };
  themeColor: {
    primary: string; // Used for text, main elements
    secondary: string; // Used for highlights, accents
    accent: string; // Used for badges, special items
  };
  hero: {
    titlePrefix: string;
    titleHighlight: string;
    titleSuffix: string;
    subtitle: string;
    image: string;
    ar?: {
      titlePrefix: string;
      titleHighlight: string;
      titleSuffix: string;
      subtitle: string;
    };
  };
  about: {
    title: string;
    desc1: string;
    desc2: string;
    ar?: {
      title: string;
      desc1: string;
      desc2: string;
    };
  };
  plans: Plan[];
  steps: {
    number: string;
    title: string;
    desc: string;
    ar?: {
      title: string;
      desc: string;
    };
  }[];
  requirements?: {
    processingTime: string;
    fees: string;
    items: string[];
    ar?: {
      processingTime: string;
      fees: string;
      items: string[];
    };
  };
  faqs?: FAQ[];
};

const schengenConfig: CountryConfig = {
  countryName: "Schengen",
  metaTitle: "Schengen Appointment Assistant | Travnook",
  metaDesc: "Your Schengen appointment made easy. Find available dates quickly from Dubai.",
  ar: {
    metaTitle: "مواعيد فيزا شنغن | ترافنوك",
    metaDesc: "سهّلنا عليك حجز موعد الشنغن. تلاقي مواعيد قريبة من دبي وبسرعة.",
  },
  themeColor: {
    primary: "text-brand-teal",
    secondary: "text-[#8EC436]", // brand-green
    accent: "text-[#F4A31A]" // brand-yellow
  },
  hero: {
    titlePrefix: "Book Your",
    titleHighlight: "Schengen",
    titleSuffix: "Appointment",
    subtitle: "Planning a time-sensitive trip to Europe from Dubai? We offer dedicated support to help you book an available Schengen appointment slot.",
    image: "/images/schengen_hero_landscape_1773825066510.png",
    ar: {
      titlePrefix: "احجز موعد",
      titleHighlight: "شنغن",
      titleSuffix: "الحين",
      subtitle: "مخطط تسافر أوروبا قريب ومستعجل؟ نحن بنساعدك تلاقي وتحجز أقرب موعد متاح للشنغن بكل سهولة.",
    }
  },
  about: {
    title: "Expert Schengen Appointment Assistance",
    desc1: "Planning a time-sensitive trip to Europe from Dubai? We offer dedicated support to help you book an available Schengen appointment slot. Focus on your travel preparations while we assist with the booking process.",
    desc2: "Whether for last-minute travel plans, overseas business meetings, family reunions, or health-related journeys, we aim to simplify the Schengen appointment process, saving you time and effort for a more seamless booking experience.",
    ar: {
      title: "خبراء في حجز مواعيد الشنغن",
      desc1: "تبغي تسافر أوروبا ومحتاج موعد وايد قريب؟ نحن بنساعدك تلاقي الموعد وتخلصه بسرعة. ركز في تجهيز أغراضك وخل الحجز علينا.",
      desc2: "سواء كانت السفرة بزنس، أو بتشوف الأهل، أو حتى لظرف صحي.. هدفنا هو نسهل عليك الموضوع ونوفر وقتك وجهدك.",
    }
  },
  plans: [
    {
      title: "Short-Term Travel Plan",
      desc: "We help find and book earliest available Schengen appointment dates within 15 days approx for your time-sensitive travel.",
      image: "/images/rome_colosseum_scene_1773825118794.png",
      code: "sp03 1",
      features: ["Within 15 days approx", "Time-sensitive travel", "Earliest availability", "Priority handling"],
      ar: {
        title: "خطة السفر المستعجل",
        desc: "نساعدك تلاقي وتحجز أقرب موعد شنغن خلال 15 يوم تقريباً لسفرك الضروري.",
        features: ["خلال 15 يوم تقريباً", "للسفر المستعجل", "أقرب المواعيد المتاحة", "أولوية في التعامل"]
      }
    },
    {
      title: "Intermediate Travel Plan",
      desc: "We support convenient booking of Schengen appointments within 30 days approx for your upcoming trips.",
      image: "/images/swiss_alps_scene_1773825101838.png",
      code: "sp02 1",
      features: ["Within 30 days approx", "Upcoming trips", "Convenient booking", "Dedicated agent"],
      featured: true,
      ar: {
        title: "الخطة المتوسطة",
        desc: "نساعدك تحجز موعد سفرك الجاي خلال 30 يوم بكل راحة بال.",
        features: ["خلال 30 يوم تقريباً", "للسفر القريب", "حجز سهل ومريح", "موظف مخصص لخدمتك"]
      }
    },
    {
      title: "Future Travel Plans",
      desc: "We help find and arrange Schengen appointment dates beyond 30 days approx for your flexible travel planning.",
      image: "/images/schengen_hero_landscape_1773825066510.png",
      code: "sp01 1",
      features: ["Beyond 30 days approx", "Flexible planning", "Advance arrangement", "Standard review"],
      ar: {
        title: "خطط السفر المستقبلية",
        desc: "نجهز لك موعد شنغن لأكثر من 30 يوم إذا عندك وقت وتخطط على راحتك.",
        features: ["أكثر من 30 يوم", "تخطيط مرن", "ترتيب مسبق", "مراجعة شاملة"]
      }
    }
  ],
  steps: [
    { number: "01", title: "Contact Us", desc: "Share your details and travel date with us. Our team will provide a checklist based on your specific travel plans.", ar: { title: "تواصل معانا", desc: "عطنا تفاصيل سفرك وموعدك.. وفريقنا بيجهز لك كل اللي تحتاجه حسب خطتك." } },
    { number: "02", title: "Document Collection & Review", desc: "We’ll review your documents and assist with organizing the required paperwork. If any supporting documents are missing, we’ll guide you.", ar: { title: "تجهيز الأوراق", desc: "بنراجع أوراقك ونساعدك ترتبها.. وإذا في أي شي ناقص بنخبرك شو تسوي." } },
    { number: "03", title: "Appointment Booking", desc: "Once all your details are prepared, we will diligently search for and book the earliest available Schengen appointment slot.", ar: { title: "حجز الموعد", desc: "بعد ما نجهز كل شي، بنبدأ ندور لك على أقرب موعد متاح ونحجزه لك فوراً." } },
    { number: "04", title: "Submission & Assistance", desc: "We help you prepare and organize your application documents for submission at the consulate with precision.", ar: { title: "التقديم والمتابعة", desc: "نساعدك ترتب ملفك كامل عشان تقدمه في القنصلية بكل دقة واحترافية." } }
  ]
};

const indonesiaConfig: CountryConfig = {
  countryName: "Indonesia",
  metaTitle: "Indonesia Appointment Assistant | Travnook",
  metaDesc: "Apply for an Indonesia visa from Dubai with expert assistance. Get guidance on documents and application process for UAE residents.",
  ar: {
    metaTitle: "فيزا إندونيسيا من دبي | تراف نوك",
    metaDesc: "احصل على مساعدة احترافية للتقديم على فيزا إندونيسيا من دبي. فريق خبراء يدعمك في كل خطوة.",
  },
  themeColor: {
    primary: "text-emerald-900",
    secondary: "text-emerald-600",
    accent: "text-orange-500"
  },
  hero: {
    titlePrefix: "Apply for",
    titleHighlight: "Indonesia",
    titleSuffix: "Visa",
    subtitle: "Get professional visa assistance with your Indonesia visa application. Our expert team helps to simplify the process for UAE residents.",
    image: "/images/indonesia_hero.png",
    ar: {
      titlePrefix: "قدم على",
      titleHighlight: "إندونيسيا",
      titleSuffix: "فيزا",
      subtitle: "احصل على فيزا إندونيسيا خلال ساعات مع تراف نوك.",
    }
  },
  about: {
    title: "Professional Indonesia Visa Assistance from Dubai",
    desc1: "Applying for an Indonesia visa from Dubai involves multiple steps, including documentation and form submission. Our team provides structured support to help you navigate the process smoothly.",
    desc2: "We have 10+ years of experience in handling visa applications for UAE residents. We focus on accuracy and clarity at every stage and support you throughout the application journey.",
    ar: {
      title: "فيزا إندونيسيا من دبي",
      desc1: "لن تحتاج إلى القلق بشأن الوقت وخطط السفر!",
      desc2: "فريقنا يأخذ خطوات سريعة في عملية التقديم على فيزا إندونيسيا من دبي؛ للحصول على التأشيرة في وقت لا يُذكر",
    }
  },
  plans: [
    {
      title: "Complete Visa Assistance Service",
      desc: "End-to-end guidance for your Indonesia visa application in Dubai. From document review to final submission support, we are here to assist.",
      image: "/images/indonesia_plan.png",
      code: "IDN 1",
      features: ["Document Review & Checklist Guidance", "Application Form Assistance", "Ongoing Application Updates", "Dedicated Support Team"],
      featured: true,
      ar: {
        title: "نظام المواعيد",
        desc: "معالجة كاملة، تجهيز الأوراق، وإرشاد من الخبراء للخطوات المناسبة.",
        features: ["مساعدة احترافية", "معالجة سريعة", "تعامل آمن", "دعم من البداية للنهاية"]
      }
    }
  ],
  steps: [
    { number: "01", title: "Submit Your Details", desc: "Share your basic travel and personal information to get started with the process.", ar: { title: "أرسل بياناتك", desc: "شاركنا معلومات سفرك وبياناتك الشخصية الأساسية لبدء العملية." } },
    { number: "02", title: "Document Review", desc: "Receive guidance on required documents and get them reviewed for completeness.", ar: { title: "مراجعة الأوراق", desc: "احصل على إرشاد بالأوراق المطلوبة ومراجعتها للتأكد من اكتمالها." } },
    { number: "03", title: "Application Support", desc: "We assist you in accurately filling out and preparing your visa application.", ar: { title: "دعم التقديم", desc: "نساعدك في تعبئة وتجهيز طلب الفيزا بدقة." } },
    { number: "04", title: "Appointment Assistance", desc: "Get support in understanding the appointment process and next steps based on availability.", ar: { title: "مساعدة المواعيد", desc: "احصل على دعم في فهم عملية المواعيد والخطوات التالية حسب التوفر." } },
    { number: "05", title: "Submission & Processing", desc: "Attend your appointment and proceed with visa processing as per official guidelines.", ar: { title: "التقديم والمعالجة", desc: "احضر موعدك وتابع معالجة الفيزا حسب التعليمات الرسمية." } }
  ],
  requirements: {
    processingTime: "Approx. 5-7 working days",
    fees: "Varies by duration (Contact for details)",
    items: [
      "Valid UAE Residence Visa (min 3 months validity)",
      "Completed Visa Application Form",
      "Original Passport (min 6 months validity, 2 blank pages)",
      "Passport-Sized Photographs (recent, per specs)",
      "Proof of Travel Arrangements (flights & hotel)",
      "Bank Statements (last 3-6 months)",
      "Employment Certificate or Trade License",
      "No Objection Certificate (NOC) from employer",
      "Additional Supporting Documents depending on visa type"
    ],
    ar: {
      processingTime: "تقريباً 5-7 أيام عمل",
      fees: "تعتمد على المدة (تواصل معانا للتفاصيل)",
      items: [
        "إقامة إماراتية سارية (3 شهور على الأقل)",
        "نموذج طلب الفيزا معبأ",
        "جواز السفر الأصلي (ساري لـ 6 شهور على الأقل، صفحتين فاضية)",
        "صور شخصية (حديثة حسب المواصفات)",
        "إثبات ترتيبات السفر (طيران وفندق)",
        "كشف حساب بنكي (آخر 3-6 شهور)",
        "شهادة عمل أو رخصة تجارية",
        "خطاب لا مانع من جهة العمل (NOC)",
        "أوراق داعمة إضافية حسب نوع الفيزا"
      ]
    }
  }
};

const chinaConfig: CountryConfig = {
  countryName: "China",
  metaTitle: "Apply China Visa from Dubai | Expert Assistance by Travnook",
  metaDesc: "Apply for a China visa from Dubai with experts. Get support with documents, applications, and the appointment process for UAE residents.",
  ar: {
    metaTitle: "فيزا الصين من دبي | تراف نوك",
    metaDesc: "قدم على فيزا الصين من دبي مع فريق متخصص. نساعدك في تجهيز الأوراق وإتمام الطلب بدقة واحترافية.",
  },
  themeColor: {
    primary: "text-teal-900",
    secondary: "text-teal-600",
    accent: "text-orange-500"
  },
  hero: {
    titlePrefix: "Apply for",
    titleHighlight: "China",
    titleSuffix: "Visa",
    subtitle: "China visa applications can involve detailed documentation and strict requirements. Our team provides structured assistance to help UAE residents complete the process accurately.",
    image: "/images/china_hero.png",
    ar: {
      titlePrefix: "قدم على",
      titleHighlight: "الصين",
      titleSuffix: "تاشيرة",
      subtitle: "عملية التقديم على فيزا الصين لن تصبح معقدة مع فريق تراف نوك.",
    }
  },
  about: {
    title: "Trusted China Visa Assistance in Dubai",
    desc1: "Applying for a China visa from Dubai requires careful preparation, including accurate documentation and correct application submission. Our team supports you at each step to help simplify the process.",
    desc2: "We help UAE residents understand China visa requirements clearly and prepare their application with attention to every detail.",
    ar: {
      title: "فيزا الصين من دبي",
      desc1: "التقديم على طلب فيزا الصين يحتاج إلى الدقة العالية في تجهيز الأوراق، وذلك ما يتبعه فريقنا في كل خطوة.",
      desc2: "في تراف نوك ستجد خبراء لديهم كامل المعرفة بالإجراءات السليمة، ويقدمون إرشاداً واضحاً في كل مراحل التقديم.",
    }
  },
  plans: [
    {
      title: "Complete China Visa Assistance Service",
      desc: "We provide end-to-end assistance for your China visa application. We help you from document guidance to application preparation and submission support.",
      image: "/images/china_plan.png",
      code: "CHN 1",
      features: ["Document Review & Checklist Guidance", "Application Form Assistance", "Application Review & Error Check", "Ongoing Application Updates", "Dedicated Support Team"],
      featured: true,
      ar: {
        title: "نظام المواعيد",
        desc: "إرشاد كامل للتقديم ومعالجة فيزا الصين (سياحة، بزنس، أو زيارة عائلية).",
        features: ["أوراق سليمة وكاملة", "إرشاد احترافي", "مستشارين خبراء", "دعم مخصص لك"]
      }
    }
  ],
  steps: [
    { number: "01", title: "Submit Your Details", desc: "Share your basic travel and personal information to get started with the process.", ar: { title: "أرسل بياناتك", desc: "شاركنا معلومات سفرك وبياناتك الشخصية الأساسية لبدء العملية." } },
    { number: "02", title: "Document Review", desc: "Receive guidance on required documents and get them reviewed for completeness.", ar: { title: "مراجعة الأوراق", desc: "احصل على إرشاد بالأوراق المطلوبة ومراجعتها للتأكد من اكتمالها." } },
    { number: "03", title: "Application Support", desc: "We assist you in accurately filling out and preparing your visa application.", ar: { title: "دعم التقديم", desc: "نساعدك في تعبئة وتجهيز طلب الفيزا بدقة." } },
    { number: "04", title: "Appointment Assistance", desc: "Get support in understanding the appointment process and next steps based on availability.", ar: { title: "مساعدة المواعيد", desc: "احصل على دعم في فهم عملية المواعيد والخطوات التالية حسب التوفر." } },
    { number: "05", title: "Submission & Processing", desc: "Attend your appointment and proceed with visa processing as per official guidelines.", ar: { title: "التقديم والمعالجة", desc: "احضر موعدك وتابع معالجة الفيزا حسب التعليمات الرسمية." } }
  ],
  requirements: {
    processingTime: "Approx. 4-7 working days",
    fees: "Varies by duration (Contact for details)",
    items: [
      "Valid UAE Residence Visa (min 6 months validity)",
      "Passport (min 6 months validity, 2 blank pages)",
      "Passport-Sized Photographs (color, white background)",
      "Completed Visa Application Form",
      "Visa Appointment Confirmation (for CVAC)",
      "Travel Itinerary (flights & hotel)",
      "Proof of Financial Means (bank statements 3-6 months)",
      "Travel Insurance (strongly recommended)",
      "Cover Letter (outlining purpose & itinerary)",
      "Employment Verification (Stamped NOC or Trade License)"
    ],
    ar: {
      processingTime: "تقريباً 4-7 أيام عمل",
      fees: "تعتمد على المدة (تواصل معانا للتفاصيل)",
      items: [
        "إقامة إماراتية سارية (6 شهور على الأقل)",
        "جواز سفر ساري (6 شهور على الأقل، صفحتين فاضية)",
        "صور شخصية (ملونة، خلفية بيضاء)",
        "نموذج طلب الفيزا معبأ",
        "تأكيد موعد الفيزا (لمركز CVAC)",
        "خط سير الرحلة (طيران وفندق)",
        "إثبات الملاءة المالية (كشف حساب 3-6 شهور)",
        "تأمين سفر (ينصح به بشدة)",
        "رسالة تغطية (توضح الغرض وخط سير السفر)",
        "شهادة عمل (NOC مختوم أو رخصة تجارية)"
      ]
    }
  }
};

const japanConfig: CountryConfig = {
  countryName: "Japan",
  metaTitle: "Apply Japan Visa from Dubai | Expert Assistance by Travnook",
  metaDesc: "Apply for a Japan visa from Dubai with our expert assistance. We help you with documents, application preparation, and understanding the process clearly.",
  ar: {
    metaTitle: "فيزا اليابان من دبي | تراف نوك",
    metaDesc: "قدم على فيزا اليابان من دبي مع فريق متخصص. نساعدك في فهم المتطلبات وتجهيز ملفك بشكل صحيح.",
  },
  themeColor: {
    primary: "text-sky-950",
    secondary: "text-sky-700",
    accent: "text-orange-500"
  },
  hero: {
    titlePrefix: "Apply for",
    titleHighlight: "Japan",
    titleSuffix: "Visa",
    subtitle: "Applying for a Japan visa from Dubai is complex and involves multiple steps. Our proficient team helps you understand the process and requirements clearly. We support UAE residents with trusted assistance.",
    image: "/images/japan_hero.png",
    ar: {
      titlePrefix: "قدم على",
      titleHighlight: "اليابان",
      titleSuffix: "فيزا",
      subtitle: "قدم طلبك الآن مع تراف نوك واحصل على فيزا اليابان بدون تأخير. بفضل خبرتنا العميقة نساعدك في معالجة طلبك بكل كفاءة وسرعة.",
    }
  },
  about: {
    title: "Reliable Japan Visa Assistance in Dubai",
    desc1: "Applying for a Japan visa from Dubai is complex and involves multiple steps. Our proficient team helps you understand the process and requirements clearly.",
    desc2: "We support UAE residents with trusted assistance to help ensure their application is complete and properly prepared before submission.",
    ar: {
      title: "فيزا اليابان من دبي",
      desc1: "فريق تراف نوك يبدأ في تجهيز ملف فيزا اليابان بمجرد التواصل وتحديد متطلباتك لضمان الدقة والاكتمال.",
      desc2: "ما يميز فريقنا هو الخبرة الواسعة في إجراءات التقديم والمعرفة الكاملة بمتطلبات التأشيرة اليابانية.",
    }
  },
  plans: [
    {
      title: "Complete Japan Visa Assistance Service",
      desc: "We provide support throughout the Japan visa application process. We help you prepare accurate documents, application preparation, and submission assistance.",
      image: "/images/japan_plan.png",
      code: "JPN 1",
      features: ["Document Review & Checklist Guidance", "Application Form Assistance", "Application Review & Error Check", "Ongoing Application Updates", "Dedicated Support Team"],
      featured: true,
      ar: {
        title: "نظام المواعيد الكامل",
        desc: "معالجة كاملة وإرشاد لطلب فيزا اليابان (سياحة، بزنس، أو زيارة عائلية).",
        features: ["مراجعة الأوراق", "تعبئة الطلب", "مراجعة شاملة للأخطاء", "متابعة مستمرة", "فريق دعم مخصص"]
      }
    }
  ],
  steps: [
    { number: "01", title: "Submit Your Details", desc: "Share your basic travel and personal information to get started with the process.", ar: { title: "أرسل بياناتك", desc: "شاركنا معلومات سفرك وبياناتك الشخصية الأساسية لبدء العملية." } },
    { number: "02", title: "Document Review", desc: "Receive guidance on required documents and get them reviewed for completeness.", ar: { title: "مراجعة الأوراق", desc: "احصل على إرشاد بالأوراق المطلوبة ومراجعتها للتأكد من اكتمالها." } },
    { number: "03", title: "Application Support", desc: "We assist you in accurately filling out and preparing your visa application.", ar: { title: "دعم التقديم", desc: "نساعدك في تعبئة وتجهيز طلب الفيزا بدقة." } },
    { number: "04", title: "Appointment Assistance", desc: "Get support in understanding the appointment process and next steps based on availability.", ar: { title: "مساعدة المواعيد", desc: "احصل على دعم في فهم عملية المواعيد والخطوات التالية حسب التوفر." } },
    { number: "05", title: "Submission & Processing", desc: "Attend your appointment and proceed with visa processing as per official guidelines.", ar: { title: "التقديم والمعالجة", desc: "احضر موعدك وتابع معالجة الفيزا حسب التعليمات الرسمية." } }
  ],
  requirements: {
    processingTime: "Approx. 5-7 working days",
    fees: "Varies by duration (Contact for details)",
    items: [
      "Original Passport (min 6 months validity, 2 blank pages)",
      "Valid UAE Residence Visa (min 3 months validity)",
      "Completed Visa Application Form",
      "Passport-Sized Photographs (recent, background specific)",
      "Confirmed Flight & Hotel Reservations",
      "Proof of Financial Stability (bank statements last 3 months)",
      "Employment Certificate or valid Trade License",
      "Detailed Day-by-day Travel Itinerary",
      "Additional Supporting Documents depending on visa type"
    ],
    ar: {
      processingTime: "تقريباً 5-7 أيام عمل",
      fees: "تعتمد على المدة (تواصل معانا للتفاصيل)",
      items: [
        "جواز سفر ساري (6 شهور على الأقل، صفحتين فاضية)",
        "إقامة إماراتية سارية (3 شهور على الأقل)",
        "نموذج طلب الفيزا معبأ",
        "صور شخصية (حديثة حسب الشروط)",
        "حجز طيران وفندق (مؤكد)",
        "إثبات الملاءة المالية (كشف حساب آخر 3 شهور)",
        "إثبات عمل (NOC أو رخصه تجارية سارية)",
        "خطة سفر مفصلة (جدول يومي)",
        "أوراق إضافية حسب نوع الفيزا"
      ]
    }
  }
};

export const getCountryConfig = (): CountryConfig => {
  const mode = import.meta.env.MODE || 'schengen';
  if (mode === 'indonesia') return indonesiaConfig;
  if (mode === 'china') return chinaConfig;
  if (mode === 'japan') return japanConfig;
  return schengenConfig; // default to schengen
};

export const getImagePath = (path: string): string => {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('data:')) return path;

  const baseUrl = import.meta.env.BASE_URL || '/';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

  return `${cleanBase}${cleanPath}`;
};
