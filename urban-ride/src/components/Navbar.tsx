import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const Navbar = () => {
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
    <nav
      className={cn(
        'fixed top-4 left-4 right-4 md:top-6 md:left-1/2 md:-translate-x-1/2 md:w-[85vw] max-w-[1200px] z-50 transition-all duration-500 px-5 py-2 md:px-10 md:py-3 rounded-full',
        isScrolled 
          ? 'bg-white/90 backdrop-blur-xl shadow-lg border border-black/5 text-black' 
          : 'bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg text-white'
      )}
    >
      <div className="flex items-center justify-between w-full">
        <a href="/" className="text-xl font-display font-bold tracking-tight shrink-0">
          URBAN <span className="font-light">RIDE</span>
        </a>

        <div className="hidden md:flex items-center justify-center gap-12 lg:gap-20 text-[14px] font-medium tracking-wide w-full">
          <a href="#about" className="hover:opacity-70 transition-opacity">About</a>
          <a href="#services" className="hover:opacity-70 transition-opacity">Services</a>
          <a href="#fleet" className="hover:opacity-70 transition-opacity">Fleet</a>
          <a href="#testimonials" className="hover:opacity-70 transition-opacity">Testimonies</a>
        </div>

        <div className="flex items-center justify-end gap-6 shrink-0">
          <button className={cn(
            "hidden sm:block text-[14px] font-medium px-8 py-2 rounded-full hover:opacity-80 transition-all",
            isScrolled ? "bg-black text-white" : "bg-white text-black"
          )}>
            Book Now
          </button>
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-[calc(100%+1rem)] left-0 right-0 bg-white text-black p-8 flex flex-col gap-6 md:hidden shadow-2xl animate-in fade-in slide-in-from-top-4 rounded-3xl border border-black/5">
          <a href="#about" className="text-2xl font-display font-medium" onClick={() => setIsMobileMenuOpen(false)}>About</a>
          <a href="#services" className="text-2xl font-display font-medium" onClick={() => setIsMobileMenuOpen(false)}>Services</a>
          <a href="#fleet" className="text-2xl font-display font-medium" onClick={() => setIsMobileMenuOpen(false)}>Fleet</a>
          <a href="#testimonials" className="text-2xl font-display font-medium" onClick={() => setIsMobileMenuOpen(false)}>Testimonies</a>
          <button className="w-full py-4 bg-black text-white rounded-2xl font-medium mt-4">
            Book Now
          </button>
        </div>
      )}
    </nav>
  );
};
