import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Users, Zap, Fuel, Star, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Car } from '../types';

interface CarDetailsModalProps {
  car: Car | null;
  onClose: () => void;
  onBook: (id: number) => void;
}

export const CarDetailsModal: React.FC<CarDetailsModalProps> = ({ 
  car, 
  onClose, 
  onBook 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  if (!car) return null;

  const nextImg = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % car.images.length);
  };

  const prevImg = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + car.images.length) % car.images.length);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
      />
      <motion.div 
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative bg-white w-full max-w-5xl rounded-t-[40px] sm:rounded-[40px] overflow-hidden shadow-2xl flex flex-col md:flex-row h-[92vh] sm:h-auto sm:max-h-[90vh]"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-30 w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-black hover:bg-black hover:text-white transition-all shadow-lg sm:shadow-xl"
        >
          <X size={24} />
        </button>

        {/* Left: Image Carousel */}
        <div className="w-full md:w-1/2 h-[40vh] sm:h-[450px] md:h-auto relative bg-muted/10 shrink-0">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.img
              key={currentIndex}
              src={car.images[currentIndex]}
              alt={car.name}
              custom={direction}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 w-full h-full object-contain p-4 md:p-12"
            />
          </AnimatePresence>

          <div className="absolute inset-x-6 bottom-8 flex justify-between items-center z-10">
            <button 
              onClick={prevImg}
              className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-black hover:bg-black hover:text-white transition-all shadow-lg"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex gap-2">
              {car.images.map((_, idx) => (
                <button 
                  key={idx} 
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    idx === currentIndex ? "w-8 bg-black" : "w-2 bg-black/20 hover:bg-black/40"
                  )} 
                />
              ))}
            </div>
            <button 
              onClick={nextImg}
              className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-black hover:bg-black hover:text-white transition-all shadow-lg"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Right: Content */}
        <div className="w-full md:w-1/2 p-6 sm:p-10 md:p-12 overflow-y-auto bg-white">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-block bg-black text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                {car.category}
              </span>
              <span className={cn(
                "text-[9px] font-bold px-3 py-1.5 rounded-full tracking-widest uppercase",
                car.available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              )}>
                {car.available ? 'Available' : 'Booked'}
              </span>
            </div>
            <h2 className="text-4xl font-display font-medium mb-2">{car.name}</h2>
            <div className="flex items-center gap-2">
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
              <span className="font-bold text-sm">{car.rating}</span>
              <span className="text-black/40 text-sm">({car.reviews} verified reviews)</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-muted/30 p-4 rounded-2xl text-center">
              <Users size={20} className="mx-auto mb-2 text-black/40" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-black/40 mb-1">Seats</p>
              <p className="text-xs font-bold">{car.specs.passengers}</p>
            </div>
            <div className="bg-muted/30 p-4 rounded-2xl text-center">
              <Zap size={20} className="mx-auto mb-2 text-black/40" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-black/40 mb-1">Trans</p>
              <p className="text-xs font-bold">{car.specs.transmission}</p>
            </div>
            <div className="bg-muted/30 p-4 rounded-2xl text-center">
              <Fuel size={20} className="mx-auto mb-2 text-black/40" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-black/40 mb-1">Fuel</p>
              <p className="text-xs font-bold">{car.specs.fuel}</p>
            </div>
            <div className="bg-muted/30 p-4 rounded-2xl text-center">
              <Star size={20} className="mx-auto mb-2 text-black/40" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-black/40 mb-1">Class</p>
              <p className="text-xs font-bold">Elite</p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xs font-bold uppercase tracking-widest text-black/60 mb-4">Description</h3>
            <p className="text-black/60 leading-relaxed text-sm">{car.description}</p>
          </div>

          <div className="mb-10">
            <h3 className="text-xs font-bold uppercase tracking-widest text-black/60 mb-4">Key Features</h3>
            <div className="grid grid-cols-2 gap-y-3">
              {car.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-green-500" />
                  <span className="text-xs font-medium text-black/80">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-black/5 mt-auto">
            <div className="text-center sm:text-left">
              <p className="text-[10px] font-bold uppercase tracking-widest text-black/40">Daily Rate</p>
              <span className="text-3xl font-display font-medium">{car.price}</span>
            </div>
            <button 
              onClick={() => {
                onBook(car.id);
                onClose();
              }}
              className="w-full sm:w-auto px-10 py-4 bg-black text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:opacity-80 transition-all shadow-xl shadow-black/20"
            >
              Book This Car
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
