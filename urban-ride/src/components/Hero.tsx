import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, MapPin, X, CheckCircle2, Timer, Star } from 'lucide-react';
import { cn } from '@/src/lib/utils';

type PricingTier = 'distance' | 'hourly' | 'daily' | 'event';

export const Hero = () => {
  const [activeTab, setActiveTab] = useState<PricingTier>('distance');
  const [showConfirm, setShowConfirm] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [formData, setFormData] = useState({
    pickup: '',
    dropoff: '',
    date: '',
    time: '',
    duration: '2',
    days: '1',
    eventType: 'Wedding'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRequestRide = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const confirmBooking = () => {
    setIsConfirmed(true);
    setTimeout(() => {
      setShowConfirm(false);
      setIsConfirmed(false);
      setFormData({ pickup: '', dropoff: '', date: '', time: '', duration: '2', days: '1', eventType: 'Wedding' });
    }, 2000);
  };

  const scrollToForm = () => {
    const formElement = document.getElementById('booking-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const getTierLabel = (tier: PricingTier) => {
    switch (tier) {
      case 'distance': return 'Point-to-Point';
      case 'hourly': return 'Hourly Charter';
      case 'daily': return 'Daily Rental';
      case 'event': return 'Event Package';
    }
  };

  return (
    <section className="relative min-h-[100svh] lg:min-h-[95vh] flex flex-col items-center justify-center pt-32 lg:pt-20 pb-[280px] lg:pb-0 px-6 overflow-visible">
      {/* Background Image / Product Shot */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=2000"
          alt="Luxury Car"
          className="w-full h-full object-cover opacity-90"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-white/90" />
      </div>

      <div className="max-w-[1440px] mx-auto w-full relative z-10 flex flex-col items-center text-center mt-0 lg:mt-[-8vh]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="mb-16"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-bold uppercase tracking-[0.3em] mb-6">
            Kigali's Premier Fleet
          </span>
          <h1 className="text-6xl md:text-9xl font-display font-medium tracking-tighter mb-6 text-white drop-shadow-lg">
            Urban <span className="font-light italic text-white/90">Ride</span>
          </h1>
          <p className="text-lg md:text-xl font-medium tracking-wide text-white/90 max-w-2xl mx-auto drop-shadow-md mb-8">
            Experience luxury mobility redefined. <br className="hidden md:block" />
            Premium chauffeur services tailored for you.
          </p>
          <button 
            onClick={scrollToForm}
            className="bg-white text-black px-8 py-4 rounded-full font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-white/90 transition-colors shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
          >
            Book a Ride
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-32 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/50">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
      </motion.div>

      {/* Floating Search Form */}
      <div id="booking-form" className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[35%] lg:translate-y-1/2 w-full max-w-6xl px-4 lg:px-6 z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white/80 backdrop-blur-3xl rounded-[32px] lg:rounded-full p-2 lg:p-3 border border-white/40 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)]"
        >
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2">
            {/* Tabs integrated as a dropdown or small selector on mobile, horizontal on desktop */}
            <div className="flex lg:hidden justify-center gap-4 mb-2 px-4 py-2 border-b border-black/5">
              {(['distance', 'hourly', 'daily', 'event'] as PricingTier[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    'text-[9px] uppercase tracking-widest font-bold transition-all relative pb-1',
                    activeTab === tab ? 'text-black' : 'text-black/30'
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            <form onSubmit={handleRequestRide} className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2 w-full">
              {/* Desktop Tabs Selector */}
              <div className="hidden lg:flex items-center px-6 border-r border-black/5 shrink-0">
                <select 
                  value={activeTab} 
                  onChange={(e) => setActiveTab(e.target.value as PricingTier)}
                  className="bg-transparent text-[11px] font-bold uppercase tracking-widest focus:ring-0 border-none cursor-pointer appearance-none pr-4"
                >
                  <option value="distance">Point-to-Point</option>
                  <option value="hourly">Hourly Charter</option>
                  <option value="daily">Daily Rental</option>
                  <option value="event">Event Package</option>
                </select>
              </div>

              <div className="flex-1 relative group min-w-[180px]">
                <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-black/20 group-focus-within:text-black transition-colors" size={16} />
                <input
                  type="text"
                  name="pickup"
                  required
                  value={formData.pickup}
                  onChange={handleInputChange}
                  placeholder="Pickup"
                  className="w-full bg-transparent border-none rounded-full py-4 pl-12 pr-4 focus:ring-0 text-sm placeholder:text-black/30"
                />
              </div>

              {activeTab === 'distance' && (
                <div className="flex-1 relative group min-w-[180px] border-t lg:border-t-0 lg:border-l border-black/5">
                  <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-black/20 group-focus-within:text-black transition-colors" size={16} />
                  <input
                    type="text"
                    name="dropoff"
                    required
                    value={formData.dropoff}
                    onChange={handleInputChange}
                    placeholder="Dropoff"
                    className="w-full bg-transparent border-none rounded-full py-4 pl-12 pr-4 focus:ring-0 text-sm placeholder:text-black/30"
                  />
                </div>
              )}

              {activeTab === 'hourly' && (
                <div className="flex-1 relative group min-w-[140px] border-t lg:border-t-0 lg:border-l border-black/5">
                  <Timer className="absolute left-5 top-1/2 -translate-y-1/2 text-black/20 group-focus-within:text-black transition-colors" size={16} />
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-none rounded-full py-4 pl-12 pr-8 focus:ring-0 text-sm appearance-none cursor-pointer"
                  >
                    {[2, 3, 4, 5, 6, 8, 10, 12].map(h => (
                      <option key={h} value={h}>{h} Hours</option>
                    ))}
                  </select>
                </div>
              )}

              {activeTab === 'daily' && (
                <div className="flex-1 relative group min-w-[140px] border-t lg:border-t-0 lg:border-l border-black/5">
                  <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-black/20 group-focus-within:text-black transition-colors" size={16} />
                  <select
                    name="days"
                    value={formData.days}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-none rounded-full py-4 pl-12 pr-8 focus:ring-0 text-sm appearance-none cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 7, 14].map(d => (
                      <option key={d} value={d}>{d} {d === 1 ? 'Day' : 'Days'}</option>
                    ))}
                  </select>
                </div>
              )}

              {activeTab === 'event' && (
                <div className="flex-1 relative group min-w-[160px] border-t lg:border-t-0 lg:border-l border-black/5">
                  <Star className="absolute left-5 top-1/2 -translate-y-1/2 text-black/20 group-focus-within:text-black transition-colors" size={16} />
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-none rounded-full py-4 pl-12 pr-8 focus:ring-0 text-sm appearance-none cursor-pointer"
                  >
                    {['Wedding', 'Corporate', 'Gala', 'Airport VIP', 'Prom'].map(e => (
                      <option key={e} value={e}>{e}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="flex items-center w-full lg:w-auto border-t lg:border-t-0 lg:border-l border-black/5">
                <div className="relative group flex-1 lg:min-w-[140px]">
                  <Calendar className="absolute left-4 lg:left-5 top-1/2 -translate-y-1/2 text-black/20 group-focus-within:text-black transition-colors" size={16} />
                  <input
                    type="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-none rounded-full py-4 pl-10 lg:pl-12 pr-2 focus:ring-0 text-sm"
                  />
                </div>
                <div className="relative group flex-1 lg:min-w-[110px] border-l border-black/5">
                  <Clock className="absolute left-3 lg:left-4 top-1/2 -translate-y-1/2 text-black/20 group-focus-within:text-black transition-colors" size={16} />
                  <input
                    type="time"
                    name="time"
                    required
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-none rounded-full py-4 pl-9 lg:pl-10 pr-2 lg:pr-4 focus:ring-0 text-sm"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full lg:w-auto bg-black text-white px-8 py-4 rounded-full font-bold text-[11px] uppercase tracking-[0.2em] hover:opacity-90 transition-opacity shrink-0 mt-2 lg:mt-0"
              >
                Search
              </button>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Confirmation Dialog */}
      <AnimatePresence>
        {showConfirm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isConfirmed && setShowConfirm(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[40px] p-10 shadow-2xl overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {!isConfirmed ? (
                  <motion.div
                    key="confirm-content"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <div className="flex justify-between items-center mb-8">
                      <h3 className="text-2xl font-display font-medium">Confirm Booking</h3>
                      <button 
                        onClick={() => setShowConfirm(false)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    <div className="space-y-6 mb-10">
                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                          <Star size={18} className="text-black/40" />
                        </div>
                        <div>
                          <p className="text-[11px] uppercase tracking-widest font-bold opacity-30 mb-1">Tier</p>
                          <p className="text-sm font-medium">{getTierLabel(activeTab)}</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                          <MapPin size={18} className="text-black/40" />
                        </div>
                        <div>
                          <p className="text-[11px] uppercase tracking-widest font-bold opacity-30 mb-1">Details</p>
                          <p className="text-sm font-medium">
                            {activeTab === 'distance' && `${formData.pickup} → ${formData.dropoff}`}
                            {activeTab === 'hourly' && `${formData.pickup} (${formData.duration} Hours)`}
                            {activeTab === 'daily' && `${formData.pickup} (${formData.days} Days)`}
                            {activeTab === 'event' && `${formData.eventType} at ${formData.pickup}`}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                          <Calendar size={18} className="text-black/40" />
                        </div>
                        <div>
                          <p className="text-[11px] uppercase tracking-widest font-bold opacity-30 mb-1">Schedule</p>
                          <p className="text-sm font-medium">{formData.date} at {formData.time}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setShowConfirm(false)}
                        className="flex-1 py-4 rounded-2xl font-bold text-[13px] uppercase tracking-widest border border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={confirmBooking}
                        className="flex-1 py-4 bg-black text-white rounded-2xl font-bold text-[13px] uppercase tracking-widest hover:opacity-90 transition-opacity"
                      >
                        Confirm
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success-content"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center py-10"
                  >
                    <div className="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center mb-6">
                      <CheckCircle2 size={40} />
                    </div>
                    <h3 className="text-2xl font-display font-medium mb-2">Booking Confirmed</h3>
                    <p className="text-black/40 text-sm">Your {getTierLabel(activeTab)} is scheduled.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
