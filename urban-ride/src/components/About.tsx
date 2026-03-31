import React from 'react';
import { motion } from 'motion/react';
import { Shield, Star, Clock } from 'lucide-react';

export const About = () => {
  return (
    <section id="about" className="pt-48 lg:pt-32 pb-32 px-6 md:px-12 max-w-[1440px] mx-auto">
      <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        <motion.div 
          initial={{ opacity: 0, x: -60, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="w-full lg:w-1/2"
        >
          <div className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] overflow-hidden rounded-[40px] bg-muted group">
            <motion.img 
              initial={{ scale: 1.2 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
              src="https://res.cloudinary.com/dcy26s9jm/image/upload/v1774735042/download_29_mr7qst.jpg" 
              alt="Luxury Chauffeur Service" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 border border-black/5 rounded-[40px]" />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="w-full lg:w-1/2 flex flex-col justify-center"
        >
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-[11px] uppercase tracking-[0.3em] font-bold text-black/40 mb-6 block"
          >
            About Urban Ride
          </motion.span>
          <div className="overflow-hidden mb-8">
            <motion.h2 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-medium tracking-tight leading-[1.1]"
            >
              Elevating your <br />
              <span className="text-black/40 italic font-light">journey.</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="text-lg text-black/60 leading-relaxed mb-12 max-w-xl"
          >
            Urban Ride is Kigali's premier luxury mobility service. We blend world-class vehicles with highly trained professional chauffeurs to deliver an unmatched travel experience. Whether for business or leisure, we ensure every ride is punctual, private, and exceptionally comfortable.
          </motion.p>

          <div className="grid sm:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center mb-4">
                <Star size={20} className="text-black" />
              </div>
              <h4 className="text-lg font-display font-medium mb-2">Premium Fleet</h4>
              <p className="text-sm text-black/50 leading-relaxed">
                A meticulously maintained selection of luxury sedans and SUVs.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center mb-4">
                <Shield size={20} className="text-black" />
              </div>
              <h4 className="text-lg font-display font-medium mb-2">Professional Drivers</h4>
              <p className="text-sm text-black/50 leading-relaxed">
                Vetted, trained, and discreet chauffeurs dedicated to your safety.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
