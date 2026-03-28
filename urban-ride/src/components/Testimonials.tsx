import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const testimonials = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Corporate Executive",
    content: "Urban Ride has completely transformed my business travel in Kigali. The chauffeurs are punctual, professional, and the fleet is impeccable.",
    rating: 5
  },
  {
    id: 2,
    name: "David M.",
    role: "International Tourist",
    content: "From the airport pickup to our daily excursions, the service was flawless. The vehicles are incredibly comfortable and well-maintained.",
    rating: 5
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Event Planner",
    content: "I rely on Urban Ride for all my VIP clients. Their attention to detail and flexibility make them the only choice for luxury transport.",
    rating: 5
  },
  {
    id: 4,
    name: "Michael Chang",
    role: "Tech Entrepreneur",
    content: "The seamless booking process and the quality of the ride are unmatched. It's my go-to service whenever I'm in Rwanda.",
    rating: 5
  },
  {
    id: 5,
    name: "Amina K.",
    role: "Diplomat",
    content: "Discreet, secure, and highly reliable. Urban Ride provides a level of service that meets the highest international standards.",
    rating: 5
  }
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, type: "spring", bounce: 0.4 } }
};

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const quoteY = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section ref={sectionRef} id="testimonials" className="py-32 px-6 md:px-12 max-w-[1440px] mx-auto overflow-hidden">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="mb-20 text-center"
      >
        <motion.span variants={itemVariants} className="inline-block py-1 px-3 rounded-full bg-black/5 border border-black/10 text-[10px] font-bold uppercase tracking-[0.3em] mb-6">
          Client Experiences
        </motion.span>
        <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-display font-medium tracking-tight">
          Words from our <span className="text-black/40 italic font-light">clients.</span>
        </motion.h2>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.3 }}
        viewport={{ once: true, margin: "-100px" }}
        className="relative max-w-4xl mx-auto"
      >
        {/* Quote Icon Background */}
        <motion.div 
          className="absolute -top-10 -left-2 md:-left-12 text-black/5 z-0 pointer-events-none"
          style={{ y: quoteY }}
        >
          <Quote size={120} className="rotate-180" />
        </motion.div>

        <div className="overflow-hidden relative z-10">
          <motion.div 
            className="flex"
            animate={{ x: `-${currentIndex * 100}%` }}
            transition={{ type: "spring", stiffness: 200, damping: 25, mass: 1 }}
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="w-full shrink-0 px-4 md:px-12">
                <div className="flex flex-col items-center text-center">
                  <div className="flex gap-1 mb-8">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={20} className="fill-black text-black" />
                    ))}
                  </div>
                  <p className="text-2xl md:text-3xl lg:text-4xl font-display leading-tight mb-10 text-black/80">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <h4 className="font-bold tracking-widest uppercase text-[12px]">{testimonial.name}</h4>
                    <p className="text-black/40 text-sm mt-1">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-16">
          <button 
            onClick={handlePrev}
            className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>
          
          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  currentIndex === idx ? "bg-black w-6" : "bg-black/20 hover:bg-black/40"
                )}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>

          <button 
            onClick={handleNext}
            className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </motion.div>
    </section>
  );
};
