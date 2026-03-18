import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, SendHorizonal } from 'lucide-react';

const ContactFooter = () => {
  return (
    <section className="relative pt-24 pb-8 bg-brand-dark overflow-hidden font-sans text-white/90" id="contact">
      {/* Decorative blurred lights */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-teal opacity-30 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-yellow/10 opacity-40 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
        
        {/* Left Side: Contact Info */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-brand-yellow font-bold text-sm tracking-wide mb-6">
              <Phone className="w-4 h-4" /> 24/7 Support
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6">
              Get Expert <br/> <span className="text-brand-yellow font-script font-normal text-[1.4em] leading-none">Answers!</span>
            </h2>
            <p className="text-white/70 text-lg mb-12 leading-relaxed max-w-md">
              If you have any questions, contact us so that our professional agents can answer your inquiries and assist with your application immediately.
            </p>

            <div className="space-y-8">
              {[
                { icon: <Phone />, title: "Phone Number", desc: "+971 54 438 8038", link: "tel:+971544388038" },
                { icon: <Mail />, title: "Email Address", desc: "contact@travnook.com", link: "mailto:contact@travnook.com" },
                { icon: <MapPin />, title: "Office Location", desc: "Office M2 & M2, 1st Floor, Ibis One Central Hotel, World Trade Center, Dubai, United Arab Emirates", link: "#" }
              ].map((item, idx) => (
                <a key={idx} href={item.link} className="flex items-start gap-6 group hover:-translate-y-1 transition-transform">
                  <div className="w-14 h-14 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-green group-hover:bg-brand-green group-hover:text-white transition-colors shadow-lg">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">{item.title}</h4>
                    <p className="text-white text-lg font-bold group-hover:text-brand-yellow transition-colors">{item.desc}</p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Side: Glassmorphism Form */}
        <div className="lg:col-span-7 relative">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-2xl border border-white/20 p-8 md:p-12 rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.3)] relative z-20"
          >
            <h3 className="text-3xl font-bold text-white mb-3">Send Your Enquiry</h3>
            <p className="text-white/60 mb-8">Send your details and one of our representatives will soon connect with you.</p>

            <form className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-white/80 mb-2">Phone Number *</label>
                <input 
                  type="text" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/30 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all" 
                  placeholder="+971 50 XXX XXXX" 
                  required 
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-white/80 mb-2">Message</label>
                <textarea 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/30 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all resize-none h-40" 
                  placeholder="Please explain your situation or your special needs..." 
                ></textarea>
              </div>

              <button className="w-full bg-brand-green hover:bg-brand-yellow text-white font-bold text-lg py-5 rounded-2xl shadow-[0_10px_20px_rgba(142,196,54,0.3)] hover:shadow-[0_15px_30px_rgba(244,163,26,0.4)] transition-all hover:scale-[1.02] flex items-center justify-center gap-3">
                Submit Enquiry
                <SendHorizonal className="w-6 h-6" />
              </button>
            </form>
          </motion.div>
        </div>

      </div>

      {/* Footer / Disclaimer */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 border-t border-white/10 pt-8 mt-16 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-white/40 text-xs text-center md:text-left max-w-3xl leading-relaxed">
          Disclaimer: We are a private assistance service. We do not issue, guarantee, or influence travel permits. All decisions regarding entry and stay are made by the respective embassy or immigration authority.
        </p>
        <div className="flex gap-6 text-sm font-bold text-white/60">
          <a href="#" className="hover:text-brand-yellow transition-colors">Terms & Conditions</a>
          <a href="#" className="hover:text-brand-yellow transition-colors">Privacy Policy</a>
        </div>
      </div>
    </section>
  );
};

export default ContactFooter;
