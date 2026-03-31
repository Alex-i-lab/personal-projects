import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Car } from '../types';
import { cars } from '../data/cars';
import { CarCard } from './CarCard';
import { CarDetailsModal } from './CarDetailsModal';

const categories = ['ALL', 'SEDAN', 'LUXURY', 'SUV', 'VAN'];
const capacities = ['ANY', '4', '5', '7', '9+'];
const transmissions = ['ANY', 'Automatic', 'Manual'];

export const Fleet = ({ onBookCar }: { onBookCar?: (carId: number) => void }) => {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState('ANY');
  const [selectedTransmission, setSelectedTransmission] = useState('ANY');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 6;

  // Simulate loading on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  const filteredCars = useMemo(() => {
    return cars.filter(car => {
      const matchesCategory = activeCategory === 'ALL' || car.category === activeCategory;
      const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           car.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Extract number from passengers string (e.g., "7 Adults" -> 7)
      const passengerCount = parseInt(car.specs.passengers);
      const matchesCapacity = selectedCapacity === 'ANY' || 
                             (selectedCapacity === '9+' ? passengerCount >= 9 : passengerCount.toString() === selectedCapacity);
      
      const matchesTransmission = selectedTransmission === 'ANY' || car.specs.transmission === selectedTransmission;
      
      return matchesCategory && matchesSearch && matchesCapacity && matchesTransmission;
    });
  }, [activeCategory, searchQuery, selectedCapacity, selectedTransmission]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery, selectedCapacity, selectedTransmission]);

  const totalPages = Math.ceil(filteredCars.length / itemsPerPage);
  const currentCars = filteredCars.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    document.getElementById('fleet')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="fleet" className="py-32 bg-muted/30">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="mb-24 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-display font-medium tracking-tight mb-12"
          >
            The Fleet
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto space-y-8"
          >
            {/* Search and Main Category Filter */}
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between w-full">
              <div className="relative w-full lg:max-w-sm xl:max-w-md group shrink-0">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-black/20 group-focus-within:text-black transition-colors" size={18} />
                <input
                  type="text"
                  placeholder="Search vehicles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-transparent rounded-2xl py-4 pl-14 pr-5 focus:border-black/10 focus:ring-0 transition-all text-sm shadow-sm"
                />
              </div>

              <div className="flex flex-wrap lg:flex-nowrap items-center justify-center gap-2 w-full lg:w-auto">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      'px-4 xl:px-5 py-3 rounded-xl text-[10px] font-bold tracking-[0.2em] transition-all whitespace-nowrap',
                      activeCategory === cat 
                        ? 'bg-black text-white' 
                        : 'bg-white text-black/40 hover:text-black hover:bg-white/80 shadow-sm'
                    )}
                  >
                    {cat}
                  </button>
                ))}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={cn(
                    'p-3 rounded-xl transition-all shadow-sm shrink-0',
                    showFilters ? 'bg-black text-white' : 'bg-white text-black/40 hover:text-black'
                  )}
                >
                  <SlidersHorizontal size={18} />
                </button>
              </div>
            </div>

            {/* Granular Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-white rounded-[32px] p-6 md:p-8 shadow-sm border border-black/5 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-left">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-black/30 mb-4">Seating Capacity</p>
                      <div className="flex flex-wrap gap-2">
                        {capacities.map(cap => (
                          <button
                            key={cap}
                            onClick={() => setSelectedCapacity(cap)}
                            className={cn(
                              'px-4 py-2 rounded-lg text-xs font-medium transition-all',
                              selectedCapacity === cap ? 'bg-black text-white' : 'bg-muted hover:bg-muted/80 text-black/60'
                            )}
                          >
                            {cap === 'ANY' ? 'Any' : `${cap} Seats`}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-black/30 mb-4">Transmission</p>
                      <div className="flex flex-wrap gap-2">
                        {transmissions.map(trans => (
                          <button
                            key={trans}
                            onClick={() => setSelectedTransmission(trans)}
                            className={cn(
                              'px-4 py-2 rounded-lg text-xs font-medium transition-all',
                              selectedTransmission === trans ? 'bg-black text-white' : 'bg-muted hover:bg-muted/80 text-black/60'
                            )}
                          >
                            {trans}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 relative">
          <AnimatePresence mode="popLayout">
            {isLoading ? (
              // Render 6 skeletons while loading
              Array.from({ length: 6 }).map((_, i) => (
                <CarCard key={`skeleton-${i}`} loading={true} />
              ))
            ) : (
              currentCars.map((car) => (
                <CarCard
                  key={car.id}
                  car={car}
                  isFavorite={favorites.includes(car.id)}
                  onToggleFavorite={toggleFavorite}
                  onSelect={setSelectedCar}
                  onBook={(id) => onBookCar?.(id)}
                />
              ))
            )}
          </AnimatePresence>
        </div>

        {filteredCars.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-black/40 font-medium">No vehicles found matching your criteria.</p>
            <button 
              onClick={() => {
                setActiveCategory('ALL');
                setSearchQuery('');
                setSelectedCapacity('ANY');
                setSelectedTransmission('ANY');
              }}
              className="mt-4 text-[11px] font-bold uppercase tracking-widest border-b border-black"
            >
              Reset Filters
            </button>
          </motion.div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-16 flex items-center justify-center gap-2">
            <button
              onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-full border border-black/10 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black hover:text-white transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="flex gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={cn(
                    "w-10 h-10 rounded-full text-sm font-medium transition-colors",
                    currentPage === i + 1 
                      ? "bg-black text-white" 
                      : "hover:bg-black/5 text-black/60"
                  )}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-full border border-black/10 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black hover:text-white transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      {/* Car Details Modal */}
      <AnimatePresence>
        {selectedCar && (
          <CarDetailsModal
            car={selectedCar}
            onClose={() => setSelectedCar(null)}
            onBook={(id) => onBookCar?.(id)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
