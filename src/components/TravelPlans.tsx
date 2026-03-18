import { motion } from 'framer-motion';
import { CheckCircle2, Clock, CalendarDays, CalendarCheck2 } from 'lucide-react';

const plans = [
  {
    title: "Short-Term Travel Plan",
    desc: "We help find and book earliest available Schengen appointment dates within 15 days approx for your time-sensitive travel.",
    image: "/images/rome_colosseum_scene_1773825118794.png",
    code: "sp03 1",
    icon: <Clock className="w-8 h-8 text-brand-yellow" />,
    features: ["Within 15 days approx", "Time-sensitive travel", "Earliest availability", "Priority handling"]
  },
  {
    title: "Intermediate Travel Plan",
    desc: "We support convenient booking of Schengen appointments within 30 days approx for your upcoming trips.",
    image: "/images/swiss_alps_scene_1773825101838.png",
    code: "sp02 1",
    icon: <CalendarCheck2 className="w-8 h-8 text-white" />,
    features: ["Within 30 days approx", "Upcoming trips", "Convenient booking", "Dedicated agent"],
    featured: true
  },
  {
    title: "Future Travel Plans",
    desc: "We help find and arrange Schengen appointment dates beyond 30 days approx for your flexible travel planning.",
    image: "/images/schengen_hero_landscape_1773825066510.png",
    code: "sp01 1",
    icon: <CalendarDays className="w-8 h-8 text-brand-green" />,
    features: ["Beyond 30 days approx", "Flexible planning", "Advance arrangement", "Standard review"]
  }
];

const TravelPlans = () => {
  return (
    <section className="py-24 bg-brand-offwhite relative px-8" id="appointments">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-green/10 rounded-full text-brand-green font-bold text-sm tracking-wide mb-6">
            <CalendarCheck2 className="w-5 h-5" /> Appointments Mode
          </div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-brand-teal mb-4 leading-tight"
          >
            Schengen <span className="text-brand-yellow font-script font-normal text-6xl">Appointment</span> Plans
          </motion.h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">Choose the timeline that best fits your European travel needs. We specialize in securing slots efficiently.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 lg:gap-8 items-center">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ y: -10 }}
              className={`bg-white rounded-[2.5rem] p-6 shadow-[0_15px_40px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col group ${
                plan.featured ? 'md:scale-105 border-[3px] border-brand-green relative z-10 shadow-[0_20px_50px_rgba(142,196,54,0.15)] bg-gradient-to-b from-white to-brand-offwhite/50' : 'relative z-0'
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-brand-green text-white text-sm font-bold py-1.5 px-6 rounded-full shadow-lg flex items-center gap-2">
                   MOST POPULAR
                </div>
              )}
              
              <div className="w-full h-56 rounded-[2rem] overflow-hidden mb-8 relative">
                <img src={plan.image} alt={plan.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20 shadow-lg ${plan.featured ? 'bg-brand-teal' : 'bg-white'}`}>
                    {plan.icon}
                  </div>
                  <div className="bg-white/20 backdrop-blur-md px-4 py-1.5 justify-center rounded-xl border border-white/30 text-white font-mono font-bold text-sm tracking-widest shadow-lg">
                    {plan.code}
                  </div>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-brand-teal mb-4 min-h-[64px]">{plan.title}</h3>
              
              <p className="text-[15px] text-gray-500 mb-8 min-h-[80px] leading-relaxed border-b border-gray-100 pb-8">{plan.desc}</p>
              
              <div className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-4 text-gray-700 font-medium">
                    <CheckCircle2 className={`w-6 h-6 shrink-0 ${plan.featured ? 'text-brand-green' : 'text-brand-yellow'}`} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              <a 
                href="https://wa.me/971544388038"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-4 text-lg rounded-2xl font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                plan.featured 
                ? 'bg-brand-green text-white shadow-[0_10px_20px_rgba(142,196,54,0.4)] hover:bg-[#7bc026] hover:shadow-glow hover:-translate-y-1' 
                : 'bg-brand-offwhite text-brand-teal hover:bg-brand-yellow hover:text-white hover:-translate-y-1 hover:shadow-[0_10px_20_rgba(244,163,26,0.3)]'
              }`}>
                Chat With Us
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TravelPlans;
