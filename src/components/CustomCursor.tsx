import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { Plane } from 'lucide-react';

const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);
  const particleId = useRef(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // High performance spring for "Extreme Smoothness"
  // Higher stiffness = faster response, Balanced damping = no wobble
  const springConfig = { damping: 35, stiffness: 450, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      mouseX.set(clientX);
      mouseY.set(clientY);
      if (!isVisible) setIsVisible(true);

      // Add smoke particle if not hovering over a pointer
      if (!isPointer) {
        particleId.current++;
        const newParticle = { id: particleId.current, x: clientX, y: clientY };
        setParticles((prev) => [...prev.slice(-15), newParticle]); // Keep only last 15 particles for performance
      }
      
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
  }, [isVisible, isPointer, mouseX, mouseY]);

  // Cleanup particles
  useEffect(() => {
    const timer = setInterval(() => {
      setParticles((prev) => prev.slice(1));
    }, 100);
    return () => clearInterval(timer);
  }, []);

  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <>
      {/* Smoke Trail */}
      <AnimatePresence>
        {isVisible && !isPointer && particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0.4, scale: 0.5, x: p.x, y: p.y }}
            animate={{ opacity: 0, scale: 2, y: p.y + 20, x: p.x + (Math.random() * 20 - 10) }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed top-0 left-0 w-3 h-3 bg-white/40 rounded-full blur-md pointer-events-none z-[9998]"
            style={{ translateX: '-50%', translateY: '-50%' }}
          />
        ))}
      </AnimatePresence>

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
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="relative flex items-center justify-center"
        >
          {/* Main Plane Icon */}
          <Plane 
            className="w-8 h-8 lg:w-9 lg:h-9 text-brand-teal drop-shadow-[0_5px_15px_rgba(0,0,0,0.3)]"
            fill={isPointer ? "#8ec436" : "none"}
          />
          
          {/* Engine Glow */}
          {!isPointer && (
            <div className="absolute top-[70%] left-[20%] w-2 h-2 bg-brand-yellow rounded-full blur-sm opacity-60 animate-pulse"></div>
          )}
        </motion.div>
      </motion.div>
    </>
  );
};

export default CustomCursor;
