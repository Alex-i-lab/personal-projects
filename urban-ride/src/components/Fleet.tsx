import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Users, Fuel, Gauge, Zap, Check, Search, Filter, SlidersHorizontal, ChevronLeft, ChevronRight, Star, Heart, Info } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const categories = ['ALL', 'SEDAN', 'LUXURY', 'SUV', 'VAN'];
const capacities = ['ANY', '4', '5', '7', '9+'];
const transmissions = ['ANY', 'Automatic', 'Manual'];

const cars = [
  {
    id: 1,
    name: 'Toyota Land Cruiser V8',
    category: 'LUXURY',
    price: '$150 / day',
    images: [
      'https://images.unsplash.com/photo-1594568284297-7c64464062b1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800'
    ],
    transmission: 'Automatic',
    capacityNum: 7,
    rating: 4.9,
    reviewCount: 124,
    isPopular: true,
    available: true,
    reviews: [
      { user: "Jean-Paul K.", rating: 5, comment: "Exceptional service and the V8 is perfect for upcountry trips." },
      { user: "Marie M.", rating: 5, comment: "The most comfortable ride in Kigali. Highly recommended." }
    ],
    specs: {
      engine: '4.5L V8 Diesel',
      mileage: '10 km/l',
      capacity: '7 Adults',
      features: ['4WD', 'Leather Interior', 'Climate Control', 'Sunroof']
    }
  },
  {
    id: 2,
    name: 'Volkswagen ID.4',
    category: 'SUV',
    price: '$70 / day',
    images: [
      'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1621932953986-15fcf084da0f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1623046418924-d9bb2403521e?auto=format&fit=crop&q=80&w=800'
    ],
    transmission: 'Automatic',
    capacityNum: 5,
    rating: 4.8,
    reviewCount: 89,
    isNew: true,
    available: true,
    reviews: [
      { user: "David R.", rating: 5, comment: "Love the electric feel. Very smooth for city driving." },
      { user: "Sarah L.", rating: 4, comment: "Great car, though charging stations are still limited." }
    ],
    specs: {
      engine: 'Electric Motor',
      mileage: '520 km Range',
      capacity: '5 Adults',
      features: ['Zero Emissions', 'Touchscreen Infotainment', 'Lane Assist', 'Ambient Lighting']
    }
  },
  {
    id: 3,
    name: 'Toyota RAV4',
    category: 'SUV',
    price: '$85 / day',
    images: [
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1606611013016-969c19ba27bb?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1625047509168-a7026f36de04?auto=format&fit=crop&q=80&w=800'
    ],
    transmission: 'Automatic',
    capacityNum: 5,
    rating: 4.7,
    reviewCount: 156,
    available: false,
    reviews: [
      { user: "Eric T.", rating: 5, comment: "Reliable and spacious. Perfect for the family." }
    ],
    specs: {
      mileage: '14 km/l',
      capacity: '5 Adults',
      features: ['AWD', 'Spacious Cargo', 'Bluetooth', 'Reverse Camera']
    }
  },
  {
    id: 4,
    name: 'Mercedes-Benz E-Class',
    category: 'LUXURY',
    price: '$180 / day',
    images: [
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800'
    ],
    transmission: 'Automatic',
    capacityNum: 4,
    rating: 5.0,
    reviewCount: 42,
    available: true,
    reviews: [
      { user: "Alice B.", rating: 5, comment: "Pure luxury. The chauffeur was very professional." }
    ],
    specs: {
      engine: '2.0L Turbo',
      mileage: '12 km/l',
      capacity: '4 Adults',
      features: ['Executive Seating', 'Soft Close Doors', 'Premium Audio', 'Air Suspension']
    }
  },
  {
    id: 5,
    name: 'Toyota Prado TXL',
    category: 'SUV',
    price: '$110 / day',
    images: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1594568284297-7c64464062b1?auto=format&fit=crop&q=80&w=800'
    ],
    transmission: 'Automatic',
    capacityNum: 7,
    rating: 4.6,
    reviewCount: 210,
    available: false,
    reviews: [
      { user: "Kevin O.", rating: 4, comment: "Solid SUV. Handles the hills of Kigali with ease." }
    ],
    specs: {
      mileage: '11 km/l',
      capacity: '7 Adults',
      features: ['4WD', 'Robust Suspension', 'Large Trunk', 'Reliable Performance']
    }
  },
  {
    id: 6,
    name: 'Toyota Hiace (Drone)',
    category: 'VAN',
    price: '$100 / day',
    images: [
      'https://images.unsplash.com/photo-1560174038-da43ac74f01b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1562620644-65bb4d99484d?auto=format&fit=crop&q=80&w=800'
    ],
    transmission: 'Manual',
    capacityNum: 14,
    rating: 4.5,
    reviewCount: 340,
    available: true,
    reviews: [
      { user: "Group Travel Ltd", rating: 5, comment: "Best option for our corporate retreat. Plenty of space." }
    ],
    specs: {
      engine: '2.5L Diesel',
      mileage: '9 km/l',
      capacity: '14 Adults',
      features: ['High Roof', 'Air Conditioning', 'Ample Legroom', 'Group Travel Ready']
    }
  },
  {
    id: 7,
    name: 'Volkswagen Polo',
    category: 'SEDAN',
    price: '$50 / day',
    images: [
      'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1594568284297-7c64464062b1?auto=format&fit=crop&q=80&w=800'
    ],
    transmission: 'Automatic',
    capacityNum: 5,
    rating: 4.4,
    reviewCount: 178,
    available: true,
    reviews: [
      { user: "Diane U.", rating: 4, comment: "Economical and easy to park in the city center." }
    ],
    specs: {
      mileage: '18 km/l',
      capacity: '5 Adults',
      features: ['Compact Size', 'Fuel Efficient', 'Modern Interior', 'Easy Parking']
    }
  },
  {
    id: 8,
    name: 'BMW 7 Series',
    category: 'LUXURY',
    price: '$200 / day',
    images: [
      'https://images.unsplash.com/photo-1555353540-64fd8b028b17?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&q=80&w=800'
    ],
    transmission: 'Automatic',
    capacityNum: 4,
    rating: 4.9,
    reviewCount: 65,
    available: true,
    reviews: [{ user: "John D.", rating: 5, comment: "Ultimate luxury experience." }],
    specs: { engine: '3.0L TwinPower Turbo', mileage: '11 km/l', capacity: '4 Adults', features: ['Massage Seats', 'Rear Entertainment', 'Air Suspension'] }
  },
  {
    id: 9,
    name: 'Range Rover Vogue',
    category: 'SUV',
    price: '$250 / day',
    images: [
      'https://images.unsplash.com/photo-1606016159991-d17f6532000e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1606016159991-d17f6532000e?auto=format&fit=crop&q=80&w=800'
    ],
    transmission: 'Automatic',
    capacityNum: 5,
    rating: 4.8,
    reviewCount: 112,
    available: true,
    reviews: [{ user: "Sam K.", rating: 5, comment: "Commands presence on the road." }],
    specs: { engine: '3.0L V6 Supercharged', mileage: '8 km/l', capacity: '5 Adults', features: ['Terrain Response', 'Panoramic Roof', 'Meridian Audio'] }
  },
  {
    id: 10,
    name: 'Toyota Corolla Cross',
    category: 'SUV',
    price: '$65 / day',
    images: [
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1606611013016-969c19ba27bb?auto=format&fit=crop&q=80&w=800'
    ],
    transmission: 'Automatic',
    capacityNum: 5,
    rating: 4.5,
    reviewCount: 88,
    available: true,
    reviews: [{ user: "Anna P.", rating: 4, comment: "Great hybrid efficiency." }],
    specs: { engine: '1.8L Hybrid', mileage: '20 km/l', capacity: '5 Adults', features: ['Hybrid', 'Apple CarPlay', 'Toyota Safety Sense'] }
  },
  {
    id: 11,
    name: 'Mercedes-Benz V-Class',
    category: 'VAN',
    price: '$160 / day',
    images: [
      'https://images.unsplash.com/photo-1562620644-65bb4d99484d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&q=80&w=800'
    ],
    transmission: 'Automatic',
    capacityNum: 7,
    rating: 4.9,
    reviewCount: 45,
    available: true,
    reviews: [{ user: "Corp Team", rating: 5, comment: "Perfect for VIP group transfers." }],
    specs: { engine: '2.1L Diesel', mileage: '12 km/l', capacity: '7 Adults', features: ['Captain Chairs', 'Conference Seating', 'Privacy Glass'] }
  },
  {
    id: 12,
    name: 'Audi A6',
    category: 'SEDAN',
    price: '$120 / day',
    images: [
      'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800'
    ],
    transmission: 'Automatic',
    capacityNum: 5,
    rating: 4.7,
    reviewCount: 92,
    available: true,
    reviews: [{ user: "Mark T.", rating: 5, comment: "Smooth and powerful." }],
    specs: { engine: '2.0L TFSI', mileage: '14 km/l', capacity: '5 Adults', features: ['Quattro AWD', 'Virtual Cockpit', 'Matrix LED'] }
  },
  {
    id: 13,
    name: 'Porsche Cayenne',
    category: 'SUV',
    price: '$220 / day',
    images: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800'
    ],
    transmission: 'Automatic',
    capacityNum: 5,
    rating: 4.9,
    reviewCount: 76,
    available: true,
    reviews: [{ user: "Chris L.", rating: 5, comment: "Sporty yet practical." }],
    specs: { engine: '3.0L V6 Turbo', mileage: '9 km/l', capacity: '5 Adults', features: ['Sport Chrono', 'PASM', 'Bose Audio'] }
  },
  {
    id: 14,
    name: 'Lexus LX 570',
    category: 'LUXURY',
    price: '$210 / day',
    images: [
      'https://images.unsplash.com/photo-1594568284297-7c64464062b1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800'
    ],
    transmission: 'Automatic',
    capacityNum: 7,
    rating: 4.8,
    reviewCount: 134,
    available: true,
    reviews: [{ user: "Hassan M.", rating: 5, comment: "Unmatched reliability and comfort." }],
    specs: { engine: '5.7L V8', mileage: '7 km/l', capacity: '7 Adults', features: ['Crawl Control', 'Mark Levinson Audio', 'Cool Box'] }
  }
];

const CarCarousel = ({ images, name, className }: { images: string[], name: string, className?: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className={cn("relative group/carousel overflow-hidden", className)}>
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${name} - view ${currentIndex + 1}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="w-full h-full object-contain cursor-zoom-in"
          referrerPolicy="no-referrer"
        />
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-white"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-white"
          >
            <ChevronRight size={20} />
          </button>
          
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <div
                key={i}
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-all duration-300",
                  i === currentIndex ? "bg-black w-4" : "bg-black/20"
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export const Fleet = () => {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState('ANY');
  const [selectedTransmission, setSelectedTransmission] = useState('ANY');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCar, setSelectedCar] = useState<typeof cars[0] | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const toggleFavorite = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  const filteredCars = useMemo(() => {
    return cars.filter(car => {
      const matchesCategory = activeCategory === 'ALL' || car.category === activeCategory;
      const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           car.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCapacity = selectedCapacity === 'ANY' || 
                             (selectedCapacity === '9+' ? car.capacityNum >= 9 : car.capacityNum.toString() === selectedCapacity);
      const matchesTransmission = selectedTransmission === 'ANY' || car.transmission === selectedTransmission;
      
      return matchesCategory && matchesSearch && matchesCapacity && matchesTransmission;
    });
  }, [activeCategory, searchQuery, selectedCapacity, selectedTransmission]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery, selectedCapacity, selectedTransmission]);

  const totalPages = Math.ceil(filteredCars.length / itemsPerPage);
  const currentCars = filteredCars.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <section id="fleet" className="py-32 bg-muted/30">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="mb-24 text-center">
          <h2 className="text-4xl md:text-6xl font-display font-medium tracking-tight mb-12">The Fleet</h2>
          
          <div className="max-w-6xl mx-auto space-y-8">
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
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
          <AnimatePresence mode="popLayout">
            {currentCars.map((car) => (
              <motion.div
                key={car.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                onClick={() => setSelectedCar(car)}
                className="bg-white rounded-2xl md:rounded-3xl overflow-hidden flex flex-col group cursor-pointer shadow-sm hover:shadow-xl border border-black/5 transition-all duration-500 relative"
              >
                {/* Image Section */}
                <div className="relative w-full bg-muted/30 pt-4 px-4 md:pt-6 md:px-6">
                  {/* Badges & Actions */}
                  <div className="absolute top-2 left-2 right-2 md:top-4 md:left-4 md:right-4 flex justify-between items-start z-10">
                    <div className="flex flex-col gap-2 items-start">
                      <span className={cn(
                        "text-[8px] md:text-[9px] font-bold px-2 py-1 md:px-3 md:py-1.5 rounded-full tracking-widest uppercase backdrop-blur-md",
                        car.available ? "bg-white/80 text-green-700" : "bg-white/80 text-red-700"
                      )}>
                        {car.available ? 'Available' : 'Booked'}
                      </span>
                    </div>
                    <button 
                      onClick={(e) => toggleFavorite(e, car.id)}
                      className="p-1.5 md:p-2.5 bg-white/80 backdrop-blur-md rounded-full shadow-sm hover:bg-white transition-all group/heart"
                    >
                      <Heart 
                        size={14} 
                        className={cn(
                          "transition-colors md:w-4 md:h-4",
                          favorites.includes(car.id) ? "fill-red-500 text-red-500" : "text-black/20 group-hover/heart:text-black/40"
                        )} 
                      />
                    </button>
                  </div>
                  
                  <CarCarousel 
                    images={car.images} 
                    name={car.name} 
                    className="w-full aspect-[16/10]"
                  />
                </div>

                {/* Content Section */}
                <div className="p-3 md:p-6 flex flex-col flex-grow">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 md:mb-4 gap-1 sm:gap-0">
                    <div>
                      <h3 className="text-sm md:text-xl font-display font-medium mb-0.5 md:mb-1 group-hover:text-black/70 transition-colors leading-tight">{car.name}</h3>
                      <p className="text-[9px] md:text-[12px] text-black/40 font-medium tracking-widest uppercase">{car.category}</p>
                    </div>
                    <div className="sm:text-right">
                      <p className="text-sm md:text-lg font-medium">{car.price}</p>
                      <div className="flex items-center sm:justify-end gap-1 mt-0.5 md:mt-1">
                        <Star size={10} className="fill-black text-black md:w-3 md:h-3" />
                        <span className="text-[9px] md:text-[11px] font-bold">{car.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Specs */}
                  <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-4 md:mb-6 pt-3 md:pt-4 border-t border-black/5">
                    <div className="flex items-center gap-1 md:gap-1.5 text-black/60">
                      <Users size={12} className="md:w-3.5 md:h-3.5" />
                      <span className="text-[9px] md:text-[11px] font-bold">{car.capacityNum}</span>
                    </div>
                    <div className="flex items-center gap-1 md:gap-1.5 text-black/60">
                      <Zap size={12} className="md:w-3.5 md:h-3.5" />
                      <span className="text-[9px] md:text-[11px] font-bold">{car.transmission === 'Automatic' ? 'AUTO' : 'MAN'}</span>
                    </div>
                    <div className="flex items-center gap-1 md:gap-1.5 text-black/60">
                      <Fuel size={12} className="md:w-3.5 md:h-3.5" />
                      <span className="text-[9px] md:text-[11px] font-bold">{car.specs.mileage.split(' ')[0]}</span>
                    </div>
                  </div>

                  <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3 mt-auto">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCar(car);
                      }}
                      className="flex items-center justify-center gap-1.5 md:gap-2 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] py-2 md:py-3.5 rounded-lg md:rounded-xl border border-black/5 hover:bg-muted transition-colors"
                    >
                      <Info size={12} className="md:w-3.5 md:h-3.5" />
                      Details
                    </button>
                    <button 
                      onClick={(e) => e.stopPropagation()}
                      className="bg-black text-white text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] py-2 md:py-3.5 rounded-lg md:rounded-xl hover:opacity-80 transition-opacity shadow-lg shadow-black/10"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
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
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-full border border-black/10 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black hover:text-white transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="flex gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
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
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
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
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCar(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedCar(null)}
                className="absolute top-6 right-6 z-50 p-3 bg-white/80 backdrop-blur-md hover:bg-white rounded-full transition-all shadow-lg border border-black/5 md:bg-white/50"
              >
                <X size={20} />
              </button>

              {/* Image Section */}
              <div className="w-full md:w-1/2 bg-muted/30 p-8 md:p-12 flex items-center justify-center border-b md:border-b-0 md:border-r border-black/5 shrink-0">
                <CarCarousel 
                  images={selectedCar.images} 
                  name={selectedCar.name} 
                  className="w-full aspect-[16/10] md:aspect-square"
                />
              </div>

              {/* Details Section */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col overflow-y-auto no-scrollbar">
                <div className="flex justify-between items-start mb-8">
                  <div className="pr-8">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/30 block">
                        {selectedCar.category} • {selectedCar.transmission}
                      </span>
                      <span className={cn(
                        "text-[9px] font-bold px-2 py-0.5 rounded-full tracking-widest uppercase",
                        selectedCar.available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      )}>
                        {selectedCar.available ? 'Available' : 'Booked'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={12} 
                          className={cn(
                            "fill-current",
                            i < Math.floor(selectedCar.rating) ? "text-black" : "text-black/10"
                          )} 
                        />
                      ))}
                      <span className="text-[10px] font-bold ml-1">{selectedCar.rating}</span>
                      <span className="text-[10px] text-black/30 ml-1">({selectedCar.reviewCount} reviews)</span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-display font-medium leading-tight">{selectedCar.name}</h3>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 md:gap-8 mb-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                      <Zap size={18} className="text-black/40" />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-black/30">Engine</p>
                      <p className="text-xs md:text-sm font-medium">{selectedCar.specs.engine || 'Standard'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                      <Gauge size={18} className="text-black/40" />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-black/30">Range/MPG</p>
                      <p className="text-xs md:text-sm font-medium">{selectedCar.specs.mileage}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                      <Users size={18} className="text-black/40" />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-black/30">Capacity</p>
                      <p className="text-xs md:text-sm font-medium">{selectedCar.specs.capacity}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                      <Fuel size={18} className="text-black/40" />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-black/30">Rate</p>
                      <p className="text-xs md:text-sm font-medium">{selectedCar.price}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-10">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-black/30 mb-4">Key Features</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4">
                    {selectedCar.specs.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-black/5 flex items-center justify-center shrink-0">
                          <Check size={10} className="text-black" />
                        </div>
                        <span className="text-xs md:text-sm text-black/60">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedCar.reviews && selectedCar.reviews.length > 0 && (
                  <div className="mb-10">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-black/30 mb-4">Recent Reviews</p>
                    <div className="space-y-3">
                      {selectedCar.reviews.map((review, i) => (
                        <div key={i} className="bg-muted/30 p-5 rounded-[24px] border border-black/5">
                          <div className="flex justify-between items-center mb-2">
                            <p className="text-xs font-bold">{review.user}</p>
                            <div className="flex gap-0.5">
                              {[...Array(5)].map((_, starI) => (
                                <Star 
                                  key={starI} 
                                  size={10} 
                                  className={cn(
                                    "fill-current",
                                    starI < review.rating ? "text-black" : "text-black/10"
                                  )} 
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-xs text-black/60 leading-relaxed italic">"{review.comment}"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-8 sticky bottom-0 bg-white pt-4 pb-2">
                  <button 
                    disabled={!selectedCar.available}
                    onClick={() => {
                      if (selectedCar.available) {
                        setSelectedCar(null);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className={cn(
                      "w-full py-5 rounded-2xl font-bold text-[13px] uppercase tracking-[0.2em] transition-all shadow-xl shadow-black/10",
                      selectedCar.available 
                        ? "bg-black text-white hover:opacity-90" 
                        : "bg-muted text-black/30 cursor-not-allowed shadow-none"
                    )}
                  >
                    {selectedCar.available ? 'Book Now' : 'Currently Unavailable'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
