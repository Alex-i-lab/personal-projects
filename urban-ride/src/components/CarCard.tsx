import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Zap, Fuel, Star, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn, formatCurrency } from '@/src/lib/utils';
import { Car } from '../types';
import { Skeleton } from './Skeleton';

interface CarCardProps {
  car?: Car;
  isFavorite?: boolean;
  onToggleFavorite?: (id: number) => void;
  onSelect?: (car: Car) => void;
  onBook?: (id: number) => void;
  loading?: boolean;
}

export const CarCard: React.FC<CarCardProps> = ({ 
  car, 
  isFavorite = false, 
  onToggleFavorite = (_id: number) => {}, 
  onSelect = (_car: Car) => {}, 
  onBook = (_id: number) => {},
  loading = false
}) => {
  const [currentImg, setCurrentImg] = useState(0);

  if (loading || !car) {
    return (
      <div className="bg-white rounded-[32px] overflow-hidden border border-black/5 flex flex-col h-full animate-pulse">
        <Skeleton className="aspect-[16/10] rounded-none" />
        <div className="p-6 space-y-6">
          <div className="flex justify-between">
            <div className="space-y-2">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-3 w-20" />
            </div>
            <Skeleton className="h-8 w-16" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-10 rounded-2xl" />)}
          </div>
          <div className="flex gap-3">
            <Skeleton className="flex-1 h-12 rounded-2xl" />
            <Skeleton className="flex-1 h-12 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImg((prev) => (prev + 1) % car.images.length);
  };

  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImg((prev) => (prev - 1 + car.images.length) % car.images.length);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="group bg-white rounded-[32px] overflow-hidden border border-black/5 hover:border-black/10 hover:shadow-xl transition-all duration-500 flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-muted/30">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImg}
            src={car.images[currentImg]}
            alt={car.name}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onClick={() => onSelect(car)}
          />
        </AnimatePresence>

        {/* Overlay Controls */}
        <div className="absolute inset-0 p-4 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-2">
              <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-black shadow-sm">
                {car.category}
              </span>
              <span className={cn(
                "text-[9px] font-bold px-3 py-1 rounded-full tracking-widest uppercase backdrop-blur-md shadow-sm",
                car.available ? "bg-white/90 text-green-700" : "bg-white/90 text-red-700"
              )}>
                {car.available ? 'Available' : 'Booked'}
              </span>
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); onToggleFavorite(car.id); }}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-all backdrop-blur-md shadow-sm",
                isFavorite ? "bg-red-500 text-white" : "bg-white/90 text-black hover:bg-black hover:text-white"
              )}
            >
              <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
            </button>
          </div>

          <div className="flex justify-between items-center">
            <button 
              onClick={prevImg}
              className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-black hover:bg-black hover:text-white transition-all shadow-sm"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-1.5">
              {car.images.map((_, idx) => (
                <div 
                  key={idx} 
                  className={cn(
                    "h-1 rounded-full transition-all duration-300",
                    idx === currentImg ? "w-4 bg-white" : "w-1 bg-white/40"
                  )} 
                />
              ))}
            </div>
            <button 
              onClick={nextImg}
              className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-black hover:bg-black hover:text-white transition-all shadow-sm"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-display font-medium text-black group-hover:text-blue-600 transition-colors">{car.name}</h3>
            <div className="flex items-center gap-1 mt-1">
              <Star size={12} className="fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-bold text-black/60">{car.rating}</span>
              <span className="text-[10px] text-black/30">({car.reviews} reviews)</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-2xl font-display font-medium text-black">{formatCurrency(parseInt(car.price.replace(/[^0-9]/g, '')))}</span>
            <p className="text-[10px] font-bold uppercase tracking-widest text-black/30">/ Day</p>
          </div>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="flex items-center gap-2 bg-muted/30 p-2.5 rounded-2xl">
            <Users size={14} className="text-black/40" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-black/60">{car.specs.passengers}</span>
          </div>
          <div className="flex items-center gap-2 bg-muted/30 p-2.5 rounded-2xl">
            <Zap size={14} className="text-black/40" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-black/60">{car.specs.transmission}</span>
          </div>
          <div className="flex items-center gap-2 bg-muted/30 p-2.5 rounded-2xl">
            <Fuel size={14} className="text-black/40" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-black/60">{car.specs.fuel}</span>
          </div>
          <div className="flex items-center gap-2 bg-muted/30 p-2.5 rounded-2xl">
            <Star size={14} className="text-black/40" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-black/60">Elite Class</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-auto">
          <button 
            onClick={() => onSelect(car)}
            className="flex-1 py-3.5 rounded-2xl border border-black/10 text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300"
          >
            Details
          </button>
          <button 
            onClick={() => onBook(car.id)}
            className="flex-1 py-3.5 rounded-2xl bg-black text-white text-[10px] font-bold uppercase tracking-widest hover:opacity-80 transition-all duration-300 shadow-lg shadow-black/10"
          >
            Book Now
          </button>
        </div>
      </div>
    </motion.div>
  );
};
