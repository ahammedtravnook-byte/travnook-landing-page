import { motion } from 'framer-motion';
import { FileCheck, CalendarCheck, FileBadge, Eye, ShieldCheck, HeartHandshake } from 'lucide-react';

const worksList = [
  { icon: <FileCheck className="text-brand-yellow w-6 h-6" />, title: "Contact Us", desc: "Share details and travel date. We provide a checklist." },
  { icon: <FileBadge className="text-brand-green w-6 h-6" />, title: "Document Review", desc: "Assist with organizing required paperwork." },
  { icon: <CalendarCheck className="text-brand-teal w-6 h-6" />, title: "Appointment Booking", desc: "Search and book the earliest available slot." },
  { icon: <Eye className="text-brand-yellow w-6 h-6" />, title: "Submission & Assistance", desc: "Prepare and organize documents for submission." }
];

const ServiceFeatures = () => {
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-8">
        
        {/* How it works */}
        <div className="flex flex-col md:flex-row items-center gap-16 mb-32">
          <div className="w-full md:w-1/2">
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-brand-teal mb-4"
            >
              How Our Service <span className="text-brand-yellow font-script text-5xl font-normal">Works</span>
            </motion.h2>
            <p className="text-gray-500 mb-8 max-w-md">Our process is designed to be straightforward and stress-free for your convenience.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {worksList.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-brand-offwhite p-6 rounded-3xl shadow-sm hover:shadow-card transition-all"
                >
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4">
                    {item.icon}
                  </div>
                  <h4 className="font-bold text-brand-teal mb-2">{item.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-8 flex gap-4">
              <button className="bg-brand-teal text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">←</button>
              <button className="bg-brand-yellow text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">→</button>
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 relative h-[600px]"
          >
            <div className="absolute inset-0 bg-brand-lightTeal rounded-[3rem] transform rotate-3"></div>
            <img src="/images/swiss_alps_scene_1773825101838.png" alt="Travel" className="absolute inset-0 w-full h-full object-cover rounded-[3rem] shadow-float" />
          </motion.div>
        </div>

        {/* Why Choose Us */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-16">
          <div className="w-full md:w-1/2">
            <motion.h2 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-brand-teal mb-4"
            >
              Why Choose <span className="text-brand-green">Our Service?</span>
            </motion.h2>
            <p className="text-gray-500 mb-8 max-w-md">Let us streamline your Schengen appointment process for your European visit from Dubai, with efficient and accurate handling.</p>
            
            <div className="space-y-6">
              {[
                { title: "Expedited Search", desc: "Diligently search for earliest available slots. Refund policy applies.", icon: <CalendarCheck /> },
                { title: "Personalised Assistance", desc: "Efficient and accurate processing from booking to document review.", icon: <HeartHandshake /> },
                { title: "Total Privacy", desc: "Information handled with highest discretion and confidentiality.", icon: <ShieldCheck /> }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.15 }}
                  viewport={{ once: true }}
                  className="flex gap-4 items-start"
                >
                  <div className="w-12 h-12 shrink-0 bg-brand-offwhite rounded-2xl flex items-center justify-center text-brand-teal">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-teal text-lg">{item.title}</h4>
                    <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <a 
              href="https://wa.me/971544388038"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block bg-brand-green hover:bg-brand-teal text-white font-bold py-3 px-8 rounded-full shadow-lg transition-colors cursor-pointer"
            >
              Discover More
            </a>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 relative h-[500px] flex items-center justify-center"
          >
            <div className="absolute w-[120%] h-[120%] bg-brand-yellow/10 rounded-full blur-3xl -z-10"></div>
            <div className="relative w-80 h-80 bg-white rounded-full border-8 border-brand-offwhite shadow-float overflow-hidden z-20">
              <img src="/images/rome_colosseum_scene_1773825118794.png" alt="Rome" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-10 left-0 w-48 h-48 bg-white rounded-[2rem] border-8 border-brand-offwhite shadow-card overflow-hidden z-30">
              <img src="/images/passport_illustration_1773825157044.png" alt="Passport" className="w-full h-full object-cover" />
            </div>
            <div className="absolute top-10 right-0 w-32 h-32 bg-white rounded-full border-4 border-brand-offwhite shadow-card overflow-hidden z-10">
              <img src="/images/calendar_booking_illustration_1773825172614.png" alt="Calendar" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default ServiceFeatures;
