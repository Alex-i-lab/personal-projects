import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar = ({ onBookNow }: { onBookNow?: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'fixed top-4 left-4 right-4 md:top-6 md:left-1/2 md:-translate-x-1/2 md:w-[85vw] max-w-[1200px] z-50 transition-all duration-500 px-5 py-2 md:px-10 md:py-3 rounded-full',
        isScrolled 
          ? 'bg-white/90 backdrop-blur-xl shadow-lg border border-black/5 text-black' 
          : 'bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]'
      )}
    >
      <div className="flex items-center justify-between w-full">
        <a href="/" className="text-xl font-display font-bold tracking-tight shrink-0">
          URBAN <span className="font-light">RIDE</span>
        </a>

        <div className="hidden md:flex items-center justify-center gap-12 lg:gap-20 text-[14px] font-medium tracking-wide w-full">
          <motion.a whileHover={{ scale: 1.05 }} href="#about" className="hover:opacity-70 transition-opacity">About</motion.a>
          <motion.a whileHover={{ scale: 1.05 }} href="#services" className="hover:opacity-70 transition-opacity">Services</motion.a>
          <motion.a whileHover={{ scale: 1.05 }} href="#fleet" className="hover:opacity-70 transition-opacity">Fleet</motion.a>
          <motion.a whileHover={{ scale: 1.05 }} href="#testimonials" className="hover:opacity-70 transition-opacity">Testimonies</motion.a>
        </div>

        <div className="flex items-center justify-end gap-6 shrink-0">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBookNow}
            className={cn(
            "hidden sm:block text-[14px] font-medium px-8 py-2 rounded-full hover:opacity-80 transition-all",
            isScrolled ? "bg-black text-white" : "bg-white text-black"
          )}>
            Book Now
          </motion.button>
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-[calc(100%+1rem)] left-0 right-0 bg-white text-black p-8 flex flex-col gap-6 md:hidden shadow-2xl rounded-3xl border border-black/5"
          >
            <a href="#about" className="text-2xl font-display font-medium" onClick={() => setIsMobileMenuOpen(false)}>About</a>
            <a href="#services" className="text-2xl font-display font-medium" onClick={() => setIsMobileMenuOpen(false)}>Services</a>
            <a href="#fleet" className="text-2xl font-display font-medium" onClick={() => setIsMobileMenuOpen(false)}>Fleet</a>
            <a href="#testimonials" className="text-2xl font-display font-medium" onClick={() => setIsMobileMenuOpen(false)}>Testimonies</a>
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                onBookNow?.();
              }}
              className="w-full py-4 bg-black text-white rounded-2xl font-medium mt-4"
            >
              Book Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
