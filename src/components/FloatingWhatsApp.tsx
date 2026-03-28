import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  lang?: 'en' | 'ar';
}

const FloatingWhatsApp = ({ lang = 'en' }: Props) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, type: "spring" }}
      className={`fixed bottom-8 ${lang === 'ar' ? 'left-8' : 'right-8'} z-[100] group`}
    >
      <a 
        href="https://wa.me/971544388038?text=Hi%20Travnook!%20I'm%20interested%20in%20your%20visa%20assistance%20service.%20Please%20guide%20me." 
        target="_blank" 
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-16 h-16 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full shadow-[0_0_20px_rgba(37,211,102,0.5)] transition-all hover:scale-110"
      >
        <MessageCircle className="w-8 h-8" />
        
        {/* Tooltip */}
        <div className={`absolute ${lang === 'ar' ? 'left-20' : 'right-20'} bg-white text-gray-800 text-sm font-bold px-4 py-2 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none`}>
          {lang === 'ar' ? 'تواصل معنا واتساب' : 'Chat With Us'}
          <div className={`absolute top-1/2 -translate-y-1/2 ${lang === 'ar' ? '-left-1.5' : '-right-1.5'} w-3 h-3 bg-white rotate-45`}></div>
        </div>
        
        {/* Ripple effect */}
        <div className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-50"></div>
      </a>
    </motion.div>
  );
};

export default FloatingWhatsApp;
