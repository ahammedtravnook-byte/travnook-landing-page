import { useEffect, useMemo, useState } from 'react';
import Lenis from 'lenis';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyTravnook from './components/WhyTravnook';
import TrustBar from './components/TrustBar';
import About from './components/About';
import TravelPlans from './components/TravelPlans';
import HowItWorks from './components/HowItWorks';
import WhyChooseUs from './components/WhyChooseUs';
import Contact from './components/Contact';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import { getCountryConfig, getImagePath } from './data/countryConfig';

function App() {
  const config = useMemo(() => getCountryConfig(), []);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [lang, setLang] = useState<'en' | 'ar'>((localStorage.getItem('lang') as 'en' | 'ar') || 'en');

  const toggleLang = () => {
    const newLang = lang === 'en' ? 'ar' : 'en';
    setLang(newLang);
    localStorage.setItem('lang', newLang);
  };

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    // Dynamically update SEO meta tags based on active build mode
    const isAr = lang === 'ar' && config.ar;
    const pageTitle = isAr ? config.ar!.metaTitle : config.metaTitle;
    const pageDesc = isAr ? config.ar!.metaDesc : config.metaDesc;
    const buildTime: string = typeof __BUILD_TIME__ !== 'undefined' ? __BUILD_TIME__ : new Date().toISOString();
    const buildDate: string = typeof __BUILD_DATE__ !== 'undefined' ? __BUILD_DATE__ : new Date().toISOString().split('T')[0];
    const countryMode: string = typeof __COUNTRY_MODE__ !== 'undefined' ? __COUNTRY_MODE__ : 'schengen';
    const canonicalUrl = `https://travnook.com/${countryMode}/`;

    document.title = pageTitle;

    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Core SEO
    setMeta('description', pageDesc);
    setMeta('robots', 'index, follow, max-snippet:-1, max-image-preview:large');

    // Freshness signals — Google Ads reads these to judge if the page is "new"
    setMeta('article:modified_time', buildTime, true);
    setMeta('og:updated_time', buildTime, true);

    // Open Graph
    setMeta('og:title', pageTitle, true);
    setMeta('og:description', pageDesc, true);
    setMeta('og:type', 'website', true);
    setMeta('og:url', canonicalUrl, true);
    setMeta('og:site_name', 'Travnook', true);
    setMeta('og:locale', lang === 'ar' ? 'ar_AE' : 'en_AE', true);

    // Canonical URL — unique per country, tells Google this is a distinct page
    let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    // JSON-LD structured data with dateModified — strongest freshness signal for Google
    const existingSchema = document.getElementById('travnook-schema');
    if (existingSchema) existingSchema.remove();
    const schema = document.createElement('script');
    schema.id = 'travnook-schema';
    schema.type = 'application/ld+json';
    schema.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Travnook",
      "url": canonicalUrl,
      "description": pageDesc,
      "dateModified": buildTime,
      "datePublished": buildDate,
      "serviceType": `${config.countryName} Visa Assistance`,
      "areaServed": "United Arab Emirates",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer support",
        "availableLanguage": ["English", "Arabic"]
      }
    });
    document.head.appendChild(schema);

    // Set document direction
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;

    // Create/update favicon dynamically or point to a specific asset if available
    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = getImagePath('/images/logo.png'); // Updated to use the actual logo as the favicon

    // Advanced smooth scroll setup
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [config, lang]);

  // Handle dynamic text colors based on config
  const customSelectionColor = config.countryName === 'Schengen' ? 'selection:bg-brand-yellow'
    : config.countryName === 'Indonesia' ? 'selection:bg-emerald-500'
      : 'selection:bg-teal-500';

  const footerBgColor = config.countryName === 'Schengen' ? 'bg-[#0B272C]'
    : config.countryName === 'Indonesia' ? 'bg-emerald-950'
      : config.countryName === 'Japan' ? 'bg-slate-900'
        : 'bg-teal-950';

  const fontClass = lang === 'ar' ? 'font-arabic' : 'font-sans';

  if (currentPath === '/privacy') {
    return (
      <div className={`bg-brand-offwhite text-brand-dark min-h-screen ${fontClass} ${customSelectionColor} selection:text-white`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <Navbar lang={lang} toggleLang={toggleLang} />
        <PrivacyPolicy lang={lang} navigate={navigate} />
        {/* Simple Footer */}
        <footer className={`${footerBgColor} py-8 px-6 text-center text-white/40 text-xs border-t border-white/5`}>
          <div className="max-w-7xl mx-auto flex flex-col justify-between items-center gap-6">
            <p className="max-w-4xl mx-auto leading-relaxed text-[10px] md:text-xs">
              {lang === 'ar'
                ? 'إخلاء مسؤولية: نحن خدمة مساعدة خاصة. نحن لا نصدر أو نضمن أو نؤثر على تصاريح السفر. جميع القرارات المتعلقة بالدخول والإقامة تتخذها السفارة أو سلطة الهجرة المعنية.'
                : 'Disclaimer: We are a private assistance service. We do not issue, guarantee, or influence travel permits. All decisions regarding entry and stay are made by the respective embassy or immigration authority.'}
            </p>
            <div className="w-full h-px bg-white/5"></div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 w-full">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-white/80 cursor-pointer" onClick={() => navigate('/')}>Travnook</span>
              </div>
              <div className="flex gap-4">
                <span className="cursor-pointer hover:text-white transition-colors" onClick={() => navigate('/privacy')}>{lang === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}</span>
                <span className="cursor-pointer hover:text-white transition-colors" onClick={() => navigate('/terms')}>{lang === 'ar' ? 'الشروط والأحكام' : 'Terms & Conditions'}</span>
              </div>
              <p>© {new Date().getFullYear()} Travnook. {lang === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}</p>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  if (currentPath === '/terms') {
    return (
      <div className={`bg-brand-offwhite text-brand-dark min-h-screen ${fontClass} ${customSelectionColor} selection:text-white`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <Navbar lang={lang} toggleLang={toggleLang} />
        <TermsAndConditions lang={lang} navigate={navigate} />
        {/* Simple Footer */}
        <footer className={`${footerBgColor} py-8 px-6 text-center text-white/40 text-xs border-t border-white/5`}>
          <div className="max-w-7xl mx-auto flex flex-col justify-between items-center gap-6">
            <p className="max-w-4xl mx-auto leading-relaxed text-[10px] md:text-xs">
              {lang === 'ar'
                ? 'إخلاء مسؤولية: نحن خدمة مساعدة خاصة. نحن لا نصدر أو نضمن أو نؤثر على تصاريح السفر. جميع القرارات المتعلقة بالدخول والإقامة تتخذها السفارة أو سلطة الهجرة المعنية.'
                : 'Disclaimer: We are a private assistance service. We do not issue, guarantee, or influence travel permits. All decisions regarding entry and stay are made by the respective embassy or immigration authority.'}
            </p>
            <div className="w-full h-px bg-white/5"></div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 w-full">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-white/80 cursor-pointer" onClick={() => navigate('/')}>Travnook</span>
              </div>
              <div className="flex gap-4">
                <span className="cursor-pointer hover:text-white transition-colors" onClick={() => navigate('/privacy')}>{lang === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}</span>
                <span className="cursor-pointer hover:text-white transition-colors" onClick={() => navigate('/terms')}>{lang === 'ar' ? 'الشروط والأحكام' : 'Terms & Conditions'}</span>
              </div>
              <p>© {new Date().getFullYear()} Travnook. {lang === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}</p>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className={`bg-brand-offwhite text-brand-dark min-h-screen ${fontClass} ${customSelectionColor} selection:text-white`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <Navbar lang={lang} toggleLang={toggleLang} />
      <Hero lang={lang} />
      <WhyTravnook lang={lang} />
      <TrustBar lang={lang} />
      <About lang={lang} />
      <TravelPlans lang={lang} />
      <HowItWorks lang={lang} />
      <div className="hidden md:block">
        <WhyChooseUs lang={lang} />
      </div>
      <Contact lang={lang} />
      <FloatingWhatsApp lang={lang} />

      {/* Simple Footer */}
      <footer className={`${footerBgColor} py-8 px-6 text-center text-white/40 text-xs border-t border-white/5`}>
        <div className="max-w-7xl mx-auto flex flex-col justify-between items-center gap-6">
          <p className="max-w-4xl mx-auto leading-relaxed text-[10px] md:text-xs">
            {lang === 'ar'
              ? 'إخلاء مسؤولية: نحن خدمة مساعدة خاصة. نحن لا نصدر أو نضمن أو نؤثر على تصاريح السفر. جميع القرارات المتعلقة بالدخول والإقامة تتخذها السفارة أو سلطة الهجرة المعنية.'
              : 'Disclaimer: We are a private assistance service. We do not issue, guarantee, or influence travel permits. All decisions regarding entry and stay are made by the respective embassy or immigration authority.'}
          </p>
          <div className="w-full h-px bg-white/5"></div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 w-full">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-white/80 cursor-pointer" onClick={() => navigate('/')}>Travnook</span>
            </div>
            <div className="flex gap-4">
              <span className="cursor-pointer hover:text-white transition-colors" onClick={() => navigate('/privacy')}>{lang === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}</span>
              <span className="cursor-pointer hover:text-white transition-colors" onClick={() => navigate('/terms')}>{lang === 'ar' ? 'الشروط والأحكام' : 'Terms & Conditions'}</span>
            </div>
            <p>© {new Date().getFullYear()} Travnook. {lang === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
