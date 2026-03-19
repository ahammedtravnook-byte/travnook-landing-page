import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { Plane } from 'lucide-react';

const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for that "flight" feel
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
      
      // Check if hovering over a clickable element
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' || 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' ||
        (target.closest && (target.closest('button') !== null || target.closest('a') !== null))
      );
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  // Don't show on mobile/touch
  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        x: smoothX,
        y: smoothY,
        translateX: '-50%',
        translateY: '-50%',
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: isVisible ? 1 : 0,
      }}
      className="hidden md:block"
    >
      <motion.div
        animate={{
          scale: isPointer ? 1.5 : 1,
          rotate: isPointer ? 45 : -45,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="relative flex items-center justify-center"
      >
        <Plane 
          className="w-10 h-10 text-brand-teal drop-shadow-[0_5px_15px_rgba(0,0,0,0.3)]"
          fill={isPointer ? "#8ec436" : "none"}
        />
        
        <AnimatePresence>
          {!isPointer && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: [0, 0.5, 0], x: [20, 40, 60] }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
              className="absolute right-full mr-2 h-[2px] w-8 bg-brand-teal/20 rounded-full"
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default CustomCursor;
