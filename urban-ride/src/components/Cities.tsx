import React from 'react';
import { motion } from 'motion/react';

const cities = [
  { name: 'Kigali', subtitle: 'The Heart of Rwanda', image: 'https://res.cloudinary.com/dcy26s9jm/image/upload/v1774727936/pexels-christian-nzayisenga-2160342483-36653830_zbrrqt.jpg' },
  { name: 'Musanze', subtitle: 'Gateway to the Volcanoes', image: 'https://res.cloudinary.com/dcy26s9jm/image/upload/v1774959077/Musanze_dufw4q.jpg' },
  { name: 'Rubavu', subtitle: 'Lakeside Serenity', image: 'https://res.cloudinary.com/dcy26s9jm/image/upload/v1774959084/pexels-pinamon-19252017_dplxvu.jpg' },
  { name: 'Huye', subtitle: 'Cultural Heritage', image: 'https://res.cloudinary.com/dcy26s9jm/image/upload/v1774959544/24232745011_089ea885fd_b_hw8h9c.jpg' },
];

export const Cities = () => {
  return (
    <section id="cities" className="py-32 px-6 md:px-12 max-w-[1440px] mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: "-100px" }}
        className="mb-24"
      >
        <h2 className="text-4xl md:text-6xl font-display font-medium tracking-tight mb-8">Our Hubs</h2>
        <p className="max-w-xl text-[17px] text-black/50 leading-relaxed">
          Urban Ride provides premium chauffeur services across Rwanda's most dynamic cities and regions.
        </p>
      </motion.div>

      <div className="flex flex-col md:flex-row w-full h-[800px] md:h-[600px] gap-4">
        {cities.map((city, index) => (
          <motion.div
            key={city.name}
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-50px" }}
            className="relative flex-1 group cursor-pointer overflow-hidden rounded-[32px] md:rounded-[40px] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] hover:flex-[4] md:hover:flex-[5]"
          >
            <img
              src={city.image}
              alt={city.name}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]" />
            <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 right-8">
              <h3 className="text-white text-3xl md:text-4xl lg:text-5xl font-display font-medium whitespace-nowrap transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-8">
                {city.name}
              </h3>
              <p className="absolute left-0 top-full mt-2 text-white/80 text-base md:text-lg font-medium whitespace-nowrap opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:-translate-y-8 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
                {city.subtitle}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
