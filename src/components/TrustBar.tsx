import { motion } from 'framer-motion';
import { Award, ShieldCheck, Clock, BadgeCheck } from 'lucide-react';

const trustItems = [
  { icon: <Award className="w-8 h-8 text-brand-yellow" />, text: "Proven Track Record" },
  { icon: <Clock className="w-8 h-8 text-brand-green" />, text: "A Decade of Service" },
  { icon: <ShieldCheck className="w-8 h-8 text-brand-teal" />, text: "Transparent Pricing" },
  { icon: <BadgeCheck className="w-8 h-8 text-brand-yellow" />, text: "Comprehensive Support" }
];

const TrustBar = () => {
  return (
    <section className="relative z-40 -mt-16 pb-12 w-full px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/70 backdrop-blur-2xl border border-white rounded-[2rem] p-6 shadow-float grid grid-cols-2 md:grid-cols-4 gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-yellow/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-teal/10 rounded-full blur-3xl"></div>
          
          {trustItems.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15, duration: 0.6, type: "spring" }}
              viewport={{ once: true, margin: "-50px" }}
              className="flex flex-col items-center justify-center text-center gap-3 p-4 relative z-10 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:-translate-y-2 group-hover:shadow-glow transition-all duration-300">
                {item.icon}
              </div>
              <p className="font-bold text-brand-dark text-[15px] leading-tight max-w-[150px] group-hover:text-brand-teal transition-colors">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
