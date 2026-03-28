import React from 'react';
import { motion } from 'motion/react';
import { Shield, Star, Clock } from 'lucide-react';

export const About = () => {
  return (
    <section id="about" className="pt-48 lg:pt-32 pb-32 px-6 md:px-12 max-w-[1440px] mx-auto">
      <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="w-full lg:w-1/2"
        >
          <div className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] overflow-hidden rounded-[40px] bg-muted">
            <img 
              src="https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=80&w=1200" 
              alt="Luxury Chauffeur Service" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 border border-black/5 rounded-[40px]" />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="w-full lg:w-1/2 flex flex-col justify-center"
        >
          <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-black/40 mb-6 block">
            About Urban Ride
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium tracking-tight mb-8 leading-[1.1]">
            Elevating your <br />
            <span className="text-black/40 italic font-light">journey.</span>
          </h2>
          <p className="text-lg text-black/60 leading-relaxed mb-12 max-w-xl">
            Urban Ride is Kigali's premier luxury mobility service. We blend world-class vehicles with highly trained professional chauffeurs to deliver an unmatched travel experience. Whether for business or leisure, we ensure every ride is punctual, private, and exceptionally comfortable.
          </p>

          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center mb-4">
                <Star size={20} className="text-black" />
              </div>
              <h4 className="text-lg font-display font-medium mb-2">Premium Fleet</h4>
              <p className="text-sm text-black/50 leading-relaxed">
                A meticulously maintained selection of luxury sedans and SUVs.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center mb-4">
                <Shield size={20} className="text-black" />
              </div>
              <h4 className="text-lg font-display font-medium mb-2">Professional Drivers</h4>
              <p className="text-sm text-black/50 leading-relaxed">
                Vetted, trained, and discreet chauffeurs dedicated to your safety.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
