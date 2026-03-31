import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

const services = [
  {
    title: 'Corporate',
    image: 'https://res.cloudinary.com/dcy26s9jm/image/upload/v1774733145/Chauffeur_standing_beside_202603282322_h2gdpd.jpg',
    description: 'Executive mobility for modern business.'
  },
  {
    title: 'Airport',
    image: 'https://res.cloudinary.com/dcy26s9jm/image/upload/v1774733145/Traveler_pulling_suitcase_202603282323_bpaffy.jpg',
    description: 'Punctual transfers to all major hubs.'
  },
  {
    title: 'Events',
    image: 'https://res.cloudinary.com/dcy26s9jm/image/upload/v1774733147/Black_luxury_car_202603282312_1_ph7uo7.jpg',
    description: 'Bespoke service for your special moments.'
  }
];

export const Services = () => {
  return (
    <section id="services" className="py-32 px-6 md:px-12 max-w-[1440px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12">
        <div className="max-w-2xl overflow-hidden">
          <motion.h2 
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-display font-medium tracking-tight mb-8"
          >
            Designed for <br />
            <span className="opacity-30 italic">seamless travel.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="text-[17px] text-black/50 leading-relaxed max-w-lg"
          >
            We provide a refined transportation experience that prioritizes your time and comfort above all else.
          </motion.p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 1.2, 
              delay: index * 0.15, 
              ease: [0.22, 1, 0.36, 1] 
            }}
            viewport={{ once: true, margin: "-50px" }}
            className="group cursor-pointer max-w-[280px] sm:max-w-[320px] md:max-w-none mx-auto w-full"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] mb-8 bg-muted">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-2xl font-display font-medium">{service.title}</h3>
              <div className="w-10 h-10 rounded-full border border-black/5 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500">
                <ArrowUpRight size={20} />
              </div>
            </div>
            <p className="text-[15px] text-black/40">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
