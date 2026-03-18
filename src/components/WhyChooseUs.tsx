import { motion } from 'framer-motion';
import { SearchCheck, Users, Zap, Eye, LockKeyhole, Plane, CheckCircle2 } from 'lucide-react';

const guarantees = [
  {
    icon: <SearchCheck className="w-12 h-12" />,
    title: "Expedited Appointment Search",
    desc: "We diligently search for the earliest available Schengen appointment slots. If unable to book, a refund will be processed as per terms.",
    color: "bg-brand-teal",
    span: "lg:col-span-2 lg:row-span-2"
  },
  {
    icon: <Users className="w-10 h-10" />,
    title: "Personalised Assistance",
    desc: "From booking to review, we strive for efficient processing.",
    color: "bg-brand-dark",
    span: "lg:col-span-1"
  },
  {
    icon: <Zap className="w-10 h-10" />,
    title: "Responsive Service",
    desc: "Our team provides responsive, UAE-wide support.",
    color: "bg-brand-teal",
    span: "lg:col-span-1"
  },
  {
    icon: <Eye className="w-10 h-10" />,
    title: "Transparent Process",
    desc: "We keep you informed every step of the way.",
    color: "bg-brand-teal",
    span: "lg:col-span-1"
  },
  {
    icon: <LockKeyhole className="w-10 h-10" />,
    title: "Total Privacy",
    desc: "Discretion and confidentiality is our priority.",
    color: "bg-brand-dark",
    span: "lg:col-span-1"
  }
];

const WhyChooseUs = () => {
  return (
    <section className="relative bg-[#F8F9F9] py-24 md:py-32" id="why-us">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-24 relative">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-6 py-2 bg-brand-teal/5 rounded-full text-brand-teal font-outfit font-black text-xs tracking-[0.3em] mb-8 border border-brand-teal/10 uppercase"
          >
            <CheckCircle2 className="w-5 h-5 text-brand-green" />
            <span>GUARANTEED EXCELLENCE</span>
          </motion.div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-outfit font-black text-brand-teal tracking-tighter leading-none mb-6">
            Smart & <span className="text-brand-green italic font-sora">Professional</span> Solutions
          </h2>
          <p className="text-gray-400 font-outfit text-lg md:text-xl font-bold max-w-2xl mx-auto leading-relaxed">
            Securing your European travel appointments with speed, clarity, and total privacy in one seamless process.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 font-outfit">
           {guarantees.map((item, idx) => (
             <motion.div
               key={idx}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: idx * 0.1, duration: 0.6 }}
               className={`group-card relative p-8 md:p-12 rounded-[3.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden transition-all hover:scale-[1.02] ${item.color} ${item.span} text-white group`}
             >
                {/* Background Decor */}
                <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:rotate-12 transition-transform">
                   <Plane className="w-32 h-32 rotate-45" />
                </div>

                <div className="relative z-10 h-full flex flex-col justify-between">
                   <div className="mb-10 lg:mb-16">
                      <div className="inline-block p-6 bg-white/10 backdrop-blur-md rounded-3xl text-brand-green group-hover:bg-brand-green group-hover:text-white transition-all shadow-xl mb-10">
                         {item.icon}
                      </div>
                      <h3 className={`font-black tracking-tighter leading-none mb-6 ${idx === 0 ? 'text-4xl md:text-6xl lg:text-7xl' : 'text-2xl md:text-4xl'}`}>
                        {item.title}
                      </h3>
                      <p className={`text-white/60 leading-relaxed font-bold tracking-wide ${idx === 0 ? 'text-lg md:text-2xl max-w-xl' : 'text-base md:text-xl'}`}>
                        {item.desc}
                      </p>
                   </div>

                   <div className="flex items-center gap-6">
                      <div className="h-0.5 flex-1 bg-white/10 group-hover:bg-brand-green/50 transition-colors"></div>
                      <div className="text-[11px] font-black uppercase tracking-[0.4em] text-white/30 group-hover:text-brand-green transition-colors">
                        SUCCESS 0{idx + 1}
                      </div>
                   </div>
                </div>
             </motion.div>
           ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
