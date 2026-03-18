import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ClipboardCheck, CalendarRange, MousePointer2, PlaneTakeoff, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: <ClipboardCheck className="w-10 h-10" />,
    title: "Document Review",
    desc: "Our experts meticulously check your documents to ensure everything is perfect for your Schengen application.",
    color: "bg-brand-teal"
  },
  {
    icon: <CalendarRange className="w-10 h-10" />,
    title: "Slot Booking",
    desc: "We search 24/7 for the earliest available appointments at VFS Global or TLScontact centers in the UAE.",
    color: "bg-brand-green"
  },
  {
    icon: <MousePointer2 className="w-10 h-10" />,
    title: "Form Assistance",
    desc: "Professional guidance in filling out multi-page visa application forms with 100% accuracy.",
    color: "bg-brand-teal"
  },
  {
    icon: <PlaneTakeoff className="w-12 h-12" />,
    title: "Ready to Fly!",
    desc: "Receive your confirmed appointment and thorough preparation for your embassy interview.",
    color: "bg-brand-yellow"
  }
];

const HowItWorks = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [hasBlasted, setHasBlasted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"]
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Trigger Confetti Blast on the last step
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (latest) => {
      if (latest > 0.95 && !hasBlasted) {
        setHasBlasted(true);
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#8ec436', '#f4a31a', '#0d4a41', '#ffffff']
        });
      }
    });
    return () => unsub();
  }, [scrollYProgress, hasBlasted]);

  return (
    <section ref={containerRef} className="relative py-24 md:py-32 bg-[#F8F9F9] overflow-hidden" id="process">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-green/5 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-yellow/5 blur-[120px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-teal/5 rounded-full text-brand-teal font-outfit font-black text-xs tracking-[0.2em] mb-6 uppercase"
          >
            <Sparkles className="w-4 h-4 text-brand-green" />
            <span>OUR SEAMLESS PROCESS</span>
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-outfit font-black text-brand-teal tracking-tighter leading-none mb-6">
            How It <span className="text-brand-green italic font-sora">Works</span>
          </h2>
          <p className="text-gray-400 font-outfit text-lg md:text-xl font-bold max-w-2xl mx-auto">
            A precise, curved roadmap to your European adventure.
          </p>
        </div>

        <div className="relative">
          {/* THE CURVED PATH - SVG */}
          <div className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 z-0 hidden md:block">
            <svg 
              className="absolute top-0 left-0 w-[400px] h-full overflow-visible -translate-x-1/2 stroke-gray-100" 
              viewBox="0 0 400 1000" 
              preserveAspectRatio="none"
              fill="none"
              strokeWidth="4"
            >
              {/* Vertical Path with Curves */}
              <path 
                d="M 200 0 C 350 150, 50 350, 200 500 C 350 650, 50 850, 200 1000" 
                strokeLinecap="round" 
                strokeDasharray="15 15"
              />
              <motion.path 
                ref={pathRef}
                d="M 200 0 C 350 150, 50 350, 200 500 C 350 650, 50 850, 200 1000" 
                stroke="#8ec436" 
                strokeWidth="8"
                strokeLinecap="round"
                style={{ 
                  pathLength: pathLength 
                }}
                className="drop-shadow-[0_0_10px_rgba(142,196,54,0.5)]"
              />
            </svg>
          </div>

          <div className="space-y-24 md:space-y-48 relative z-10">
            {steps.map((step, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col md:flex-row items-center gap-12 ${
                  idx % 2 !== 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Step Card */}
                <motion.div 
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  className="w-full md:w-1/2"
                >
                  <div className="group relative bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-gray-50 hover:border-brand-green/20 transition-all hover:shadow-2xl">
                    <div className={`absolute top-0 right-0 p-8 opacity-5 text-8xl font-black font-outfit select-none`}>
                      0{idx + 1}
                    </div>
                    
                    <div className={`inline-flex items-center justify-center p-6 ${step.color} rounded-3xl text-white shadow-lg mb-8 group-hover:scale-110 transition-transform`}>
                      {step.icon}
                    </div>
                    
                    <h3 className="text-3xl md:text-4xl font-outfit font-black text-brand-teal mb-6 tracking-tight">
                      {step.title}
                    </h3>
                    
                    <p className="text-gray-500 font-outfit text-lg font-bold leading-relaxed">
                      {step.desc}
                    </p>

                    <div className="mt-8 flex items-center gap-4">
                      <div className="h-1 w-12 bg-gray-100 group-hover:bg-brand-green transition-colors"></div>
                      <span className="text-xs font-outfit font-black uppercase tracking-[0.3em] text-gray-300 group-hover:text-brand-green transition-colors">
                        Step Complete
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Vertical Space Holder for Mobile */}
                <div className="hidden md:block w-0 h-0"></div>

                {/* Index Indicator on the curve */}
                <div className="absolute left-[30px] md:left-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full border-4 border-gray-100 flex items-center justify-center z-20 shadow-md">
                   <div className="w-4 h-4 rounded-full bg-brand-green opacity-0 group-in-view:opacity-100 transition-opacity"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final Success Callout */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="mt-32 text-center"
        >
           <a 
              href="https://wa.me/971544388038"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-5 bg-brand-teal text-white rounded-2xl font-outfit font-black tracking-widest text-sm shadow-2xl hover:bg-brand-green transition-all hover:-translate-y-1 cursor-pointer uppercase"
           >
              {hasBlasted ? "LETS BOOK NOW 🎉" : "START YOUR JOURNEY NOW"}
           </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
