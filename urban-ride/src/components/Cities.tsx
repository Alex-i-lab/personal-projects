import React from 'react';
import { motion } from 'motion/react';

const cities = [
  { name: 'Kigali', image: 'https://images.unsplash.com/photo-1589197331516-4d8458bb843e?auto=format&fit=crop&q=80&w=1200' },
];

export const Cities = () => {
  return (
    <section id="cities" className="py-32 px-6 md:px-12 max-w-[1440px] mx-auto">
      <div className="mb-24">
        <h2 className="text-4xl md:text-6xl font-display font-medium tracking-tight mb-8">Our Hub</h2>
        <p className="max-w-xl text-[17px] text-black/50 leading-relaxed">
          Urban Ride is proudly rooted in Kigali, providing premium chauffeur services across Rwanda's most dynamic urban center.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {cities.map((city, index) => (
          <motion.div
            key={city.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="relative group cursor-pointer overflow-hidden rounded-[32px] md:rounded-[40px] aspect-[4/3] md:aspect-[21/9]"
          >
            <img
              src={city.image}
              alt={city.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
            <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12">
              <h3 className="text-white text-4xl md:text-5xl font-display font-medium">
                {city.name}
              </h3>
              <p className="text-white/80 text-base md:text-lg mt-2 font-medium">The Heart of Rwanda</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
