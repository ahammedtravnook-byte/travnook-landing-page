import { useEffect } from 'react';
import Lenis from 'lenis';

import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import About from './components/About';
import TravelPlans from './components/TravelPlans';
import HowItWorks from './components/HowItWorks';
import WhyChooseUs from './components/WhyChooseUs';
import Contact from './components/Contact';
import FloatingWhatsApp from './components/FloatingWhatsApp';

function App() {
  useEffect(() => {
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
  }, []);

  return (
    <div className="bg-brand-offwhite text-brand-dark min-h-screen font-sans selection:bg-brand-yellow selection:text-white cursor-none">
      <CustomCursor />
      <Navbar />
      <Hero />
      <TrustBar />
      <About />
      <TravelPlans />
      <HowItWorks />
      <WhyChooseUs />
      <Contact />
      <FloatingWhatsApp />
      
      {/* Simple Footer */}
      <footer className="bg-brand-teal py-8 px-6 text-center text-white/40 text-xs border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-white/80">Travnook</span>
          </div>
          <p>© 2026 Travnook Private Assistance Service. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
