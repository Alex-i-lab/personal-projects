import React from 'react';
import { motion } from 'motion/react';

const carBrands = [
  { name: 'Toyota', url: 'https://cdn.simpleicons.org/toyota/000000' },
  { name: 'Volkswagen', url: 'https://cdn.simpleicons.org/volkswagen/000000' },
  { name: 'Hyundai', url: 'https://cdn.simpleicons.org/hyundai/000000' },
  { name: 'Kia', url: 'https://cdn.simpleicons.org/kia/000000' },
  { name: 'Nissan', url: 'https://cdn.simpleicons.org/nissan/000000' },
  { name: 'Mercedes-Benz', url: 'https://cdn.jsdelivr.net/npm/simple-icons@3.13.0/icons/mercedes.svg' },
  { name: 'BMW', url: 'https://cdn.simpleicons.org/bmw/000000' },
  { name: 'Ford', url: 'https://cdn.simpleicons.org/ford/000000' },
  { name: 'Suzuki', url: 'https://cdn.simpleicons.org/suzuki/000000' },
  { name: 'Mitsubishi', url: 'https://cdn.simpleicons.org/mitsubishi/000000' },
];

export const Brands = () => {
  return (
    <section className="py-16 border-t border-black/5 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-[1440px] mx-auto px-6 md:px-12"
      >
        <p className="text-center text-[13px] font-medium text-black/40 uppercase tracking-[0.2em] mb-12">
          Trusted by drivers of popular brands in Rwanda
        </p>
        <div className="relative flex overflow-hidden mask-fade-edges">
          <div className="flex w-max animate-marquee items-center gap-16 pr-16">
            {[...carBrands, ...carBrands].map((brand, idx) => (
              <motion.div 
                whileHover={{ scale: 1.1 }}
                key={`${brand.name}-${idx}`} 
                className="flex items-center justify-center w-32 h-16 opacity-40 hover:opacity-100 transition-opacity duration-300"
              >
                <img src={brand.url} alt={brand.name} className="max-h-12 max-w-full object-contain" referrerPolicy="no-referrer" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
