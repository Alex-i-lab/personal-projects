import React from 'react';
import { motion } from 'motion/react';
import { Shield, Star, Clock } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, type: "spring", bounce: 0.4 } }
};

export const About = () => {
  return (
    <section id="about" className="pt-48 lg:pt-32 pb-32 px-6 md:px-12 max-w-[1440px] mx-auto overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        <motion.div 
          initial={{ opacity: 0, x: -60, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1, type: "spring", bounce: 0.3 }}
          viewport={{ once: true, margin: "-100px" }}
          className="w-full lg:w-1/2"
        >
          <div className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] overflow-hidden rounded-[40px] bg-muted">
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              src="https://res.cloudinary.com/dcy26s9jm/image/upload/f_auto,q_auto:good,w_900/v1774735042/download_29_mr7qst.jpg" 
              alt="Luxury Chauffeur Service" 
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 border border-black/5 rounded-[40px]" />
          </div>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } },
            hidden: {}
          }}
          className="w-full lg:w-1/2 flex flex-col justify-center"
        >
          <motion.span variants={fadeInUp} className="text-[11px] uppercase tracking-[0.3em] font-bold text-black/40 mb-6 block">
            About Urban Ride
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-display font-medium tracking-tight mb-8 leading-[1.1]">
            Elevating your <br />
            <span className="text-black/40 italic font-light">journey.</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-black/60 leading-relaxed mb-12 max-w-xl">
            Urban Ride is Kigali's premier luxury mobility service. We blend world-class vehicles with highly trained professional chauffeurs to deliver an unmatched travel experience. Whether for business or leisure, we ensure every ride is punctual, private, and exceptionally comfortable.
          </motion.p>

          <div className="grid sm:grid-cols-2 gap-8">
            <motion.div variants={fadeInUp}>
              <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center mb-4">
                <Star size={20} className="text-black" />
              </div>
              <h4 className="text-lg font-display font-medium mb-2">Premium Fleet</h4>
              <p className="text-sm text-black/50 leading-relaxed">
                A meticulously maintained selection of luxury sedans and SUVs.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp}>
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
