import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Plane, SendHorizonal, Globe, ShieldCheck, User, CheckCircle2, AlertCircle, Loader2, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'duplicate' | 'error' | 'rate-limited'>('idle');
  const [cooldown, setCooldown] = useState(0);

  // Basic Obfuscation (Base64) to deter simple scripters
  // Original: https://crm.travnook.com/rest/6567/0ix3yof5stj27w10/
  const _O = "aHR0cHM6Ly9jcm0udHJhdm5vb2suY29tL3Jlc3QvNjU2Ny8waXgzeW9mNXN0ajI3dzEwLw==";
  const getEP = () => atob(_O);

  useEffect(() => {
    const lastSub = localStorage.getItem('_tn_last_sub');
    if (lastSub) {
      const diff = Date.now() - parseInt(lastSub);
      const remaining = Math.max(0, 300000 - diff); // 5 mins in ms
      if (remaining > 0) {
        setCooldown(Math.ceil(remaining / 1000));
        const timer = setInterval(() => {
          setCooldown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        return () => clearInterval(timer);
      }
    }
  }, []);

  const triggerConfettiBloom = () => {
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 40 : 100;

    const defaults = {
      spread: 360,
      ticks: 50,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      colors: ['#8ec436', '#0d4a41', '#f4a31a'],
      shapes: ['circle'] as confetti.Shape[]
    };

    const shoot = () => {
      confetti({ ...defaults, particleCount: count, origin: { x: 0.2, y: 0.2 } });
      confetti({ ...defaults, particleCount: count, origin: { x: 0.8, y: 0.2 } });
      if (!isMobile) {
        confetti({ ...defaults, particleCount: count, origin: { x: 0.2, y: 0.8 } });
        confetti({ ...defaults, particleCount: count, origin: { x: 0.8, y: 0.8 } });
      }
    };

    shoot();
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check local storage rate limit
    const lastSub = localStorage.getItem('_tn_last_sub');
    if (lastSub && Date.now() - parseInt(lastSub) < 300000) {
        setSubmitStatus('rate-limited');
        return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const endpoint = getEP();
      
      // 1. Check if number already exists
      const checkResponse = await fetch(`${endpoint}crm.lead.list`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filter: { "PHONE": formData.phone },
          select: ["ID"]
        })
      });
      const checkData = await checkResponse.json();

      if (checkData.result && checkData.result.length > 0) {
        setSubmitStatus('duplicate');
        setIsSubmitting(false);
        return;
      }

      // 2. Create new lead
      const addResponse = await fetch(`${endpoint}crm.lead.add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields: {
            "TITLE": `Google ads : ${formData.name} + chatbot`,
            "NAME": formData.name,
            "PHONE": [{ "VALUE": formData.phone, "VALUE_TYPE": "WORK" }],
            "COMMENTS": formData.message,
            "SOURCE_ID": "UC_7B8N42", // Google Ads
            "ASSIGNED_BY_ID": "4" // User updated to ID 4
          }
        })
      });

      if (addResponse.ok) {
        setSubmitStatus('success');
        triggerConfettiBloom();
        localStorage.setItem('_tn_last_sub', Date.now().toString());
        setFormData({ name: '', phone: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error("CRM Error:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-20 md:py-32 bg-brand-teal overflow-hidden" id="contact">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand-green rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-brand-yellow/30 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">

          {/* Left Info Column */}
          <div className="lg:col-span-5 text-white">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 md:px-5 md:py-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6 md:mb-8 text-brand-yellow font-outfit font-black tracking-[0.2em] text-[10px] md:text-xs uppercase">
                <Globe className="w-4 h-4 text-brand-green" />
                <span>GLOBAL ASSISTANCE</span>
              </div>

              <h2 className="text-4xl md:text-6xl lg:text-8xl font-black mb-6 md:mb-8 leading-[1.1] md:leading-[1] tracking-tighter font-sora shadow-text">
                Get Expert <br />
                <span className="text-brand-yellow font-script font-normal text-[1.4em] drop-shadow-2xl translate-y-2 inline-block">Answers!</span>
              </h2>

              <p className="text-white/60 text-base md:text-xl mb-10 md:mb-12 font-outfit leading-relaxed max-w-md font-medium tracking-wide">
                Our professional agents are available 24/7 to handle your inquiries and assist with your application complexities.
              </p>

              <div className="space-y-4 md:space-y-6">
                {[
                  { icon: <Phone className="w-5 h-5 md:w-6 md:h-6" />, title: "Call Us Now", desc: "+971 54 438 8038", link: "tel:+971544388038", color: "text-brand-green" },
                  { icon: <Mail className="w-5 h-5 md:w-6 md:h-6" />, title: "Email Address", desc: "contact@travnook.com", link: "mailto:contact@travnook.com", color: "text-brand-yellow" },
                  { 
                    icon: <MapPin className="w-5 h-5 md:w-6 md:h-6" />, 
                    title: "Visit Office", 
                    desc: (
                      <>
                        Office M1, M2, M3, 1st Floor, Ibis One Central Hotel, World Trade Center<br />
                        <span className="text-xl md:text-2xl mt-1 block">Dubai, United Arab Emirates</span>
                      </>
                    ), 
                    link: "#", 
                    color: "text-white" 
                  }
                ].map((item, idx) => (
                  <motion.a
                    key={idx}
                    href={item.link}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 md:gap-6 group p-3 md:p-4 rounded-2xl md:rounded-3xl hover:bg-white/5 transition-all border border-transparent hover:border-white/10"
                  >
                    <div className={`w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center ${item.color} group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                      {item.icon}
                    </div>
                    <div className="font-outfit">
                      <h4 className="text-white/30 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] mb-1">{item.title}</h4>
                      <p className="text-white text-lg md:text-xl font-black group-hover:text-brand-yellow transition-colors leading-none tracking-tight">{item.desc}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-6 md:p-14 rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.4)] relative overflow-hidden ring-1 ring-black/5"
            >
              {/* Professional Trust Stamp */}
              <div className="absolute top-6 right-6 md:top-8 md:right-8 flex flex-col items-center">
                <div className="w-14 h-14 md:w-20 md:h-20 bg-brand-yellow rounded-full flex items-center justify-center shadow-lg animate-spin-slow" style={{ animationDuration: '20s' }}>
                  <Plane className="w-7 h-7 md:w-10 md:h-10 text-white rotate-45" />
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                    <path id="badgePath" d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
                    <text className="text-[6px] font-black fill-white/50 tracking-[0.6em] font-outfit uppercase">
                      <textPath href="#badgePath">Trusted Service • Priority • </textPath>
                    </text>
                  </svg>
                </div>
              </div>

              <div className="relative z-10 font-outfit">
                <div className="flex items-center gap-3 mb-4">
                  <ShieldCheck className="w-6 h-6 md:w-7 md:h-7 text-brand-green" />
                  <h3 className="text-2xl md:text-3xl font-black text-brand-teal tracking-tighter uppercase">Send Your Enquiry</h3>
                </div>
                <p className="text-gray-400 mb-8 md:mb-10 text-sm md:text-lg font-bold leading-relaxed max-w-sm">
                  We usually respond within 15 minutes. Our experts are ready to help.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  {/* Status Alerts */}
                  <AnimatePresence mode="wait">
                    {submitStatus === 'success' && (
                      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-4 bg-brand-green/10 border border-brand-green/20 rounded-2xl flex items-center gap-4 text-brand-green font-bold">
                        <CheckCircle2 className="w-6 h-6 shrink-0" />
                        <span>Enquiry Sent! Our specialist will call you shortly.</span>
                      </motion.div>
                    )}
                    {submitStatus === 'duplicate' && (
                      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-4 bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl flex items-center gap-4 text-brand-yellow font-bold">
                        <AlertCircle className="w-6 h-6 shrink-0" />
                        <span>You have already contacted us. Please wait, our specialist will contact you soon.</span>
                      </motion.div>
                    )}
                    {submitStatus === 'rate-limited' && (
                      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-4 bg-brand-yellow/5 border border-brand-yellow/20 rounded-2xl flex items-center gap-4 text-brand-yellow font-bold">
                        <Clock className="w-6 h-6 shrink-0" />
                        <span>Please wait 5 minutes before submitting another request.</span>
                      </motion.div>
                    )}
                    {submitStatus === 'error' && (
                      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-4 text-red-500 font-bold">
                        <AlertCircle className="w-6 h-6 shrink-0" />
                        <span>Error connecting to CRM. Please try again or call us directly.</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="space-y-2">
                    <label className="text-[10px] md:text-[11px] font-black text-brand-teal uppercase tracking-[0.25em] ml-1 flex items-center gap-2">
                      <User className="w-3 h-3 text-brand-green" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      className="w-full bg-gray-50 border border-gray-100 focus:border-brand-green focus:bg-white rounded-xl md:rounded-2xl px-5 py-4 md:px-6 md:py-4.5 text-brand-teal font-black placeholder:text-gray-300 outline-none transition-all focus:ring-8 focus:ring-brand-green/5 text-base md:text-lg"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      disabled={isSubmitting || !!cooldown}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] md:text-[11px] font-black text-brand-teal uppercase tracking-[0.25em] ml-1 flex items-center gap-2">
                      <Phone className="w-3 h-3 text-brand-green" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      className="w-full bg-gray-50 border border-gray-100 focus:border-brand-green focus:bg-white rounded-xl md:rounded-2xl px-5 py-4 md:px-6 md:py-4.5 text-brand-teal font-black placeholder:text-gray-300 outline-none transition-all focus:ring-8 focus:ring-brand-green/5 text-base md:text-lg"
                      placeholder="+971 50 XXX XXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      disabled={isSubmitting || !!cooldown}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] md:text-[11px] font-black text-brand-teal uppercase tracking-[0.25em] ml-1">Message</label>
                    <textarea
                      className="w-full bg-gray-50 border border-gray-100 focus:border-brand-green focus:bg-white rounded-xl md:rounded-2xl px-5 py-4 md:px-6 md:py-4.5 text-brand-teal font-bold placeholder:text-gray-300 outline-none transition-all resize-none h-32 md:h-40 focus:ring-8 focus:ring-brand-green/5 text-base"
                      placeholder="Please explain your situation..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      disabled={isSubmitting || !!cooldown}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !!cooldown}
                    className="w-full bg-brand-green hover:bg-brand-teal text-white font-black text-lg md:text-xl py-4 md:py-6 rounded-xl md:rounded-2xl shadow-[0_20px_40px_rgba(142,196,54,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-4 group mt-2 md:mt-4 uppercase tracking-[0.1em] disabled:opacity-50 disabled:hover:scale-100"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : cooldown > 0 ? (
                      `Try again in ${Math.floor(cooldown / 60)}m ${cooldown % 60}s`
                    ) : (
                      <>
                        Submit Request
                        <SendHorizonal className="w-6 h-6 md:w-7 md:h-7 group-hover:translate-x-2 transition-transform" />
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-100 flex items-center justify-between text-[10px] md:text-[11px] font-black text-gray-400 uppercase tracking-widest">
                  <span>Safety Guaranteed</span>
                  <div className="flex gap-2 items-center">
                    <div className="w-2 h-2 rounded-full bg-brand-green animate-pulse"></div>
                    <span className="opacity-60 uppercase">Agents Online</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>

        <div className="mt-16 md:mt-20"></div>

      </div>
    </section>
  );
};

export default Contact;
