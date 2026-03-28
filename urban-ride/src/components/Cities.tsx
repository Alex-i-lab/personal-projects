import React from 'react';
import { motion } from 'motion/react';

const cities = [
  { name: 'Kigali', image: 'https://res.cloudinary.com/dcy26s9jm/image/upload/f_auto,q_auto:good,w_1600/v1774727936/pexels-christian-nzayisenga-2160342483-36653830_zbrrqt.jpg' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, type: "spring", bounce: 0.3 } }
};

export const Cities = () => {
  return (
    <section id="cities" className="py-32 px-6 md:px-12 max-w-[1440px] mx-auto">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
        className="mb-24"
      >
        <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl font-display font-medium tracking-tight mb-8">Our Hub</motion.h2>
        <motion.p variants={itemVariants} className="max-w-xl text-[17px] text-black/50 leading-relaxed">
          Urban Ride is proudly rooted in Kigali, providing premium chauffeur services across Rwanda's most dynamic urban center.
        </motion.p>
      </motion.div>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="grid grid-cols-1 gap-4"
      >
        {cities.map((city, index) => (
          <motion.div
            key={city.name}
            variants={itemVariants}
            className="relative group cursor-pointer overflow-hidden rounded-[32px] md:rounded-[40px] aspect-[4/3] md:aspect-[21/9]"
          >
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              src={city.image}
              alt={city.name}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
              className="absolute bottom-8 left-8 md:bottom-12 md:left-12"
            >
              <h3 className="text-white text-4xl md:text-5xl font-display font-medium">
                {city.name}
              </h3>
              <p className="text-white/80 text-base md:text-lg mt-2 font-medium">The Heart of Rwanda</p>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
