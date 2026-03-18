import { motion } from 'framer-motion';
import { Calendar, CreditCard, Luggage } from 'lucide-react';

const steps = [
  {
    icon: <Calendar className="w-6 h-6 text-brand-green" />,
    num: "1",
    title: "Choose Your Destination",
    desc: "Share your details and travel date with us. Our team will provide a checklist."
  },
  {
    icon: <CreditCard className="w-6 h-6 text-brand-yellow" />,
    num: "2",
    title: "Make Your Payment",
    desc: "Secure and fast payment with multiple options for an effortless start."
  },
  {
    icon: <Luggage className="w-6 h-6 text-brand-teal" />,
    num: "3",
    title: "Enjoy Your Trip",
    desc: "Pack your bags and focus on your travel preparations while we assist."
  }
];

const Steps = () => {
  return (
    <section className="py-24 bg-brand-offwhite relative z-10">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-brand-teal"
          >
            Easy Steps <span className="text-brand-yellow font-script text-5xl font-normal">For Bookings</span>
          </motion.h2>
          <div className="w-24 h-1 bg-brand-green/30 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-[2rem] p-8 shadow-card hover:shadow-float transition-all relative overflow-hidden group"
            >
              <div className="w-16 h-16 bg-brand-offwhite rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                {step.icon}
              </div>
              <div className="absolute top-8 right-8 w-10 h-10 bg-brand-teal rounded-xl flex items-center justify-center text-white font-bold shadow-md">
                {step.num}
              </div>
              <h3 className="text-xl font-bold text-brand-teal mb-3">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-20 w-full bg-brand-yellow rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between shadow-float relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
          
          <div className="flex items-center gap-6 relative z-10">
            <span className="text-white font-bold text-7xl">48</span>
            <div className="flex flex-col text-white">
              <span className="text-sm font-semibold uppercase tracking-wider">Get Special Offer</span>
              <span className="text-2xl font-bold font-script tracking-wide">% Off  Tears and Trip Packages, Globally</span>
            </div>
          </div>
          
          <button className="mt-6 md:mt-0 relative z-10 bg-white text-brand-yellow font-bold py-3 px-8 rounded-full shadow-lg hover:bg-brand-teal hover:text-white transition-colors">
            Discover More
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Steps;
