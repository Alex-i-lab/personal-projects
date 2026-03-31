import React, { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Brands } from './components/Brands';
import { Fleet } from './components/Fleet';
import { Testimonials } from './components/Testimonials';
import { Cities } from './components/Cities';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';

// Lazy loading the booking page
const BookingPage = lazy(() => import('./components/BookingPage').then(module => ({ default: module.BookingPage })));

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'booking'>('home');
  const [selectedCars, setSelectedCars] = useState<{ instanceId: string, carId: number }[]>([]);

  const navigateToBooking = (carId?: number) => {
    if (carId) {
      setSelectedCars(prev => [...prev, { instanceId: Math.random().toString(36).substring(7), carId }]);
    }
    setCurrentPage('booking');
    window.scrollTo(0, 0);
  };

  const navigateHome = () => {
    setCurrentPage('home');
    window.scrollTo(0, 0);
  };

  const scrollToFleet = () => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        document.getElementById('fleet')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById('fleet')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddAnotherCar = () => {
    scrollToFleet();
  };

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {currentPage === 'booking' ? (
          <motion.div
            key="booking"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Suspense fallback={
              <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-black/5 border-t-black rounded-full animate-spin" />
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-black/40">Preparing Booking</p>
                </div>
              </div>
            }>
              <BookingPage 
                onBack={navigateHome} 
                selectedCars={selectedCars} 
                onAddAnotherCar={handleAddAnotherCar}
                onRemoveCar={(instanceId) => setSelectedCars(prev => prev.filter(car => car.instanceId !== instanceId))}
              />
            </Suspense>
          </motion.div>
        ) : (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen"
          >
            <Navbar onBookNow={scrollToFleet} />
            <main>
              <Hero onBookNow={scrollToFleet} />
              <About />
              <Services />
              <Brands />
              <Fleet onBookCar={(carId) => navigateToBooking(carId)} />
              <Testimonials />
              <Cities />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
      <WhatsAppButton />
    </div>
  );
}

