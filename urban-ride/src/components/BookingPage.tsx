import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Calendar, MapPin, CreditCard, CheckCircle, Car as CarIcon, Clock, Info, Plus, Trash2, Smartphone, Building2, Wallet } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { cars } from '../data/cars';
import { Car } from '../types';
import { MapSelector } from './MapSelector';

interface BookingPageProps {
  onBack: () => void;
  selectedCars?: { instanceId: string; carId: number }[];
  onAddAnotherCar?: () => void;
  onRemoveCar?: (instanceId: string) => void;
}

export const BookingPage: React.FC<BookingPageProps> = ({ 
  onBack, 
  selectedCars = [], 
  onAddAnotherCar,
  onRemoveCar
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [bookingType, setBookingType] = useState<'ride' | 'rental'>('ride');
  const [days, setDays] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'momo' | 'paypal' | 'bank_transfer'>('credit_card');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    pickup: 'Kigali International Airport',
    dropoff: '',
  });

  // Kigali International Airport coordinates
  const airportCoords: [number, number] = [-1.9686, 30.1332];
  const [pickupCoords, setPickupCoords] = useState<[number, number] | null>(airportCoords);
  const [dropoffCoords, setDropoffCoords] = useState<[number, number] | null>(null);

  // When booking type changes, reset relevant state
  useEffect(() => {
    if (bookingType === 'ride') {
      setPickupCoords(airportCoords);
      setFormData(prev => ({ ...prev, pickup: 'Kigali International Airport' }));
    } else {
      setPickupCoords(null);
      setFormData(prev => ({ ...prev, pickup: '' }));
    }
    setDropoffCoords(null);
    setFormData(prev => ({ ...prev, dropoff: '' }));
  }, [bookingType]);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    return R * c; // Distance in km
  };

  const getEstimatedPrice = () => {
    if (selectedCarsData.length === 0) return 0;
    
    if (bookingType === 'rental') {
      // Sum of daily prices * days
      const totalDaily = selectedCarsData.reduce((sum, car) => {
        const price = parseInt(car.price.replace(/[^0-9]/g, ''));
        return sum + price;
      }, 0);
      return totalDaily * days;
    } else {
      // Ride: Base fare + Distance * Rate
      if (!pickupCoords || !dropoffCoords) return 0;
      const distance = calculateDistance(pickupCoords[0], pickupCoords[1], dropoffCoords[0], dropoffCoords[1]);
      const baseFare = 20;
      const ratePerKm = 2.5;
      return Math.round(baseFare + (distance * ratePerKm));
    }
  };

  const selectedCarsData = selectedCars.map(sc => {
    const car = cars.find(c => c.id === sc.carId);
    return car ? { ...car, instanceId: sc.instanceId } : null;
  }).filter(Boolean) as (Car & { instanceId: string })[];

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    if (currentStep === 1) {
      if (!formData.dropoff.trim()) {
        newErrors.dropoff = 'Drop-off location is required';
        isValid = false;
      }
      if (bookingType === 'rental' && days < 1) {
        newErrors.days = 'Number of days must be at least 1';
        isValid = false;
      }
    } else if (currentStep === 2) {
      if (!formData.firstName.trim()) {
        newErrors.firstName = 'First name is required';
        isValid = false;
      }
      if (!formData.lastName.trim()) {
        newErrors.lastName = 'Last name is required';
        isValid = false;
      }
      if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Valid email is required';
        isValid = false;
      }
      if (!formData.phone.trim() || !/^\+?[\d\s-]{8,}$/.test(formData.phone)) {
        newErrors.phone = 'Valid phone number is required';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(step)) {
      if (step < 3) setStep((prev) => (prev + 1) as 1 | 2 | 3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleStepClick = (targetStep: 1 | 2 | 3) => {
    if (targetStep < step) {
      setStep(targetStep);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (targetStep === step + 1) {
      if (validateStep(step)) {
        setStep(targetStep);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          selectedCars: selectedCarsData,
          bookingType,
          days: bookingType === 'rental' ? days : undefined,
          pickup: bookingType === 'ride' ? formData.pickup : undefined,
          dropoff: formData.dropoff
        }),
      });
      
      if (!response.ok) {
        console.error('Failed to send confirmation email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    } finally {
      setIsSubmitting(false);
      setIsSuccess(true);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-muted/30 pt-32 pb-20 px-6 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-10 md:p-16 rounded-[40px] shadow-xl max-w-lg w-full text-center"
        >
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-3xl font-display font-medium mb-4">Booking Confirmed!</h2>
          <p className="text-black/60 mb-8">
            Your ride has been successfully booked. We've sent the confirmation details to your email.
          </p>
          <button 
            onClick={onBack}
            className="w-full py-4 bg-black text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:opacity-80 transition-opacity"
          >
            Return to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 pt-24 pb-20 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <motion.button 
          whileHover={{ x: -4 }}
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-medium text-black/60 hover:text-black transition-colors mb-10"
        >
          <ArrowLeft size={16} />
          Back to Home
        </motion.button>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-display font-medium mb-4">Complete your booking</h1>
          
          {step === 1 && (
            <div className="flex p-1 bg-black/5 rounded-2xl w-full max-w-md mb-8">
              <button
                onClick={() => setBookingType('ride')}
                className={cn(
                  "flex-1 py-3 text-sm font-bold uppercase tracking-widest rounded-xl transition-all",
                  bookingType === 'ride' ? "bg-white text-black shadow-sm" : "text-black/50 hover:text-black"
                )}
              >
                Airport Transfer
              </button>
              <button
                onClick={() => setBookingType('rental')}
                className={cn(
                  "flex-1 py-3 text-sm font-bold uppercase tracking-widest rounded-xl transition-all",
                  bookingType === 'rental' ? "bg-white text-black shadow-sm" : "text-black/50 hover:text-black"
                )}
              >
                Car Rental
              </button>
            </div>
          )}

          {selectedCarsData.length > 0 && (
            <div className="mt-8 mb-12">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold uppercase tracking-widest text-black/60">Selected Vehicles</h2>
                {onAddAnotherCar && (
                  <button 
                    onClick={onAddAnotherCar}
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black hover:opacity-70 transition-opacity"
                  >
                    <Plus size={14} />
                    Add Another
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatePresence>
                  {selectedCarsData.map(car => (
                    <motion.div 
                      key={car.instanceId}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-white p-4 rounded-3xl border border-black/5 flex items-center gap-4 shadow-sm"
                    >
                      <img src={car.images[0]} alt={car.name} className="w-24 h-16 object-cover rounded-xl" />
                      <div className="flex-1">
                        <h3 className="font-display font-medium text-lg leading-tight">{car.name}</h3>
                        <p className="text-xs font-bold text-black/40 uppercase tracking-widest">{car.category}</p>
                      </div>
                      {onRemoveCar && (
                        <button 
                          onClick={() => onRemoveCar(car.instanceId)}
                          className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors shrink-0"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}
          
          {/* Progress Steps */}
          <div className="flex items-center gap-4 mt-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 flex-1">
                <button 
                  onClick={() => handleStepClick(i as 1 | 2 | 3)}
                  disabled={i > step + 1}
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                    step >= i ? "bg-black text-white shadow-md" : "bg-black/5 text-black/40",
                    i < step ? "cursor-pointer hover:scale-110" : (i === step ? "cursor-default" : "cursor-not-allowed opacity-50")
                  )}>
                  {i < step ? <CheckCircle size={14} /> : i}
                </button>
                {i < 3 && (
                  <div className={cn(
                    "h-[2px] flex-1 transition-colors",
                    step > i ? "bg-black" : "bg-black/5"
                  )} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-3 text-[10px] font-bold uppercase tracking-widest text-black/40">
            <span className={cn("transition-colors", step >= 1 ? "text-black" : "")}>Trip Details</span>
            <span className={cn("transition-colors text-center", step >= 2 ? "text-black" : "")}>Personal Info</span>
            <span className={cn("transition-colors text-right", step >= 3 ? "text-black" : "")}>Checkout</span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-[40px] shadow-sm border border-black/5 p-6 md:p-12 relative"
        >
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.form 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleNext}
                className="space-y-8"
              >
                <div className="mb-8">
                  <MapSelector 
                    mode={bookingType === 'ride' ? 'route' : 'single'}
                    pickupCoords={pickupCoords}
                    dropoffCoords={dropoffCoords}
                    pickupDraggable={bookingType !== 'ride'}
                    onPickupChange={(coords, address) => {
                      if (bookingType === 'ride') return; // Prevent changing pickup for rides
                      setPickupCoords(coords);
                      setFormData(prev => ({ ...prev, pickup: address }));
                    }}
                    onDropoffChange={(coords, address) => {
                      setDropoffCoords(coords);
                      setFormData(prev => ({ ...prev, dropoff: address }));
                    }}
                  />
                  <div className="flex justify-end mt-2">
                    <a 
                      href="https://www.openstreetmap.org" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
                    >
                      Need help finding your address? Open OpenStreetMap ↗
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {bookingType === 'ride' ? (
                    <>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-black/60">Pick-up Location</label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40" size={18} />
                          <input readOnly type="text" name="pickup" value={formData.pickup} className="w-full bg-muted/50 border border-transparent rounded-2xl py-4 pl-12 pr-4 text-black/60 outline-none cursor-not-allowed" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-black/60">Drop-off Location</label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40" size={18} />
                          <input required type="text" name="dropoff" value={formData.dropoff} onChange={handleInputChange} placeholder="Select on map or search" className={cn("w-full bg-muted/50 border rounded-2xl py-4 pl-12 pr-4 focus:bg-white transition-all outline-none", errors.dropoff ? "border-red-500 focus:border-red-500" : "border-transparent focus:border-black/20")} />
                        </div>
                        {errors.dropoff && <p className="text-red-500 text-xs mt-1">{errors.dropoff}</p>}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-black/60">Delivery Location</label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40" size={18} />
                          <input required type="text" name="dropoff" value={formData.dropoff} onChange={handleInputChange} placeholder="Where should we send the car?" className={cn("w-full bg-muted/50 border rounded-2xl py-4 pl-12 pr-4 focus:bg-white transition-all outline-none", errors.dropoff ? "border-red-500 focus:border-red-500" : "border-transparent focus:border-black/20")} />
                        </div>
                        {errors.dropoff && <p className="text-red-500 text-xs mt-1">{errors.dropoff}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-black/60">Number of Days</label>
                        <div className="relative">
                          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40" size={18} />
                          <input required type="number" min="1" value={days} onChange={(e) => {
                            setDays(parseInt(e.target.value) || 1);
                            if (errors.days) setErrors(prev => ({ ...prev, days: '' }));
                          }} className={cn("w-full bg-muted/50 border rounded-2xl py-4 pl-12 pr-4 focus:bg-white transition-all outline-none", errors.days ? "border-red-500 focus:border-red-500" : "border-transparent focus:border-black/20")} />
                        </div>
                        {errors.days && <p className="text-red-500 text-xs mt-1">{errors.days}</p>}
                      </div>
                    </>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-black/60">
                      {bookingType === 'ride' ? 'Pick-up Date & Time' : 'Delivery Date & Time'}
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40" size={18} />
                        <input required type="date" className="w-full bg-muted/50 border border-transparent rounded-2xl py-4 pl-12 pr-4 focus:border-black/20 focus:bg-white transition-all outline-none" />
                      </div>
                      <div className="relative w-32">
                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40" size={18} />
                        <input required type="time" className="w-full bg-muted/50 border border-transparent rounded-2xl py-4 pl-12 pr-4 focus:border-black/20 focus:bg-white transition-all outline-none" />
                      </div>
                    </div>
                  </div>
                  {/* Empty div to keep grid alignment if needed, or we can just let it span 1 col */}
                </div>

                <div className="pt-6 border-t border-black/5 flex justify-end">
                  <button type="submit" className="px-8 py-4 bg-black text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:opacity-80 transition-opacity">
                    Continue to Details
                  </button>
                </div>
              </motion.form>
            )}

            {step === 2 && (
              <motion.form 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleNext}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-black/60">First Name</label>
                    <input required type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="John" className={cn("w-full bg-muted/50 border rounded-2xl py-4 px-5 focus:bg-white transition-all outline-none", errors.firstName ? "border-red-500 focus:border-red-500" : "border-transparent focus:border-black/20")} />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-black/60">Last Name</label>
                    <input required type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Doe" className={cn("w-full bg-muted/50 border rounded-2xl py-4 px-5 focus:bg-white transition-all outline-none", errors.lastName ? "border-red-500 focus:border-red-500" : "border-transparent focus:border-black/20")} />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-black/60">Email Address</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="john@example.com" className={cn("w-full bg-muted/50 border rounded-2xl py-4 px-5 focus:bg-white transition-all outline-none", errors.email ? "border-red-500 focus:border-red-500" : "border-transparent focus:border-black/20")} />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-black/60">Phone Number</label>
                    <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+250 788 000 000" className={cn("w-full bg-muted/50 border rounded-2xl py-4 px-5 focus:bg-white transition-all outline-none", errors.phone ? "border-red-500 focus:border-red-500" : "border-transparent focus:border-black/20")} />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div className="pt-6 border-t border-black/5 flex justify-between items-center">
                  <button type="button" onClick={() => setStep(1)} className="text-sm font-medium text-black/60 hover:text-black transition-colors">
                    Back
                  </button>
                  <button type="submit" className="px-8 py-4 bg-black text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:opacity-80 transition-opacity">
                    Continue to Payment
                  </button>
                </div>
              </motion.form>
            )}

            {step === 3 && (
              <motion.form 
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleCheckout}
                className="space-y-8 relative"
              >
                <div className="bg-blue-50 text-blue-800 p-4 rounded-2xl text-sm flex items-start gap-3">
                  <Info size={20} className="shrink-0 mt-0.5" />
                  <p>This is a checkout sandbox. No real charges will be made. You can use any dummy information to test the flow.</p>
                </div>

                <div className="bg-muted/30 p-6 rounded-2xl border border-black/5">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-black/60 mb-4">Order Summary</h3>
                  <div className="space-y-3 mb-6">
                    {selectedCarsData.map(car => (
                      <div key={car.instanceId} className="flex justify-between items-center text-sm">
                        <span className="font-medium">{car.name}</span>
                        <span className="text-black/60">
                          {bookingType === 'rental' ? `${car.price} × ${days} days` : 'Ride Fare'}
                        </span>
                      </div>
                    ))}
                    {bookingType === 'ride' && pickupCoords && dropoffCoords && (
                      <div className="flex justify-between items-center text-sm text-black/60 pt-2 border-t border-black/5">
                        <span>Estimated Distance</span>
                        <span>{calculateDistance(pickupCoords[0], pickupCoords[1], dropoffCoords[0], dropoffCoords[1]).toFixed(1)} km</span>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-black/10">
                    <span className="font-bold">Total Estimated</span>
                    <span className="text-xl font-display font-medium">${getEstimatedPrice()}</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <label className="text-xs font-bold uppercase tracking-widest text-black/60">Select Payment Method</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button type="button" onClick={() => setPaymentMethod('credit_card')} className={cn("p-4 border rounded-2xl flex flex-col items-center gap-2 transition-all", paymentMethod === 'credit_card' ? "border-black bg-black/5" : "border-black/10 hover:border-black/30")}>
                      <CreditCard size={24} />
                      <span className="text-xs font-bold uppercase tracking-widest">Card</span>
                    </button>
                    <button type="button" onClick={() => setPaymentMethod('momo')} className={cn("p-4 border rounded-2xl flex flex-col items-center gap-2 transition-all", paymentMethod === 'momo' ? "border-black bg-black/5" : "border-black/10 hover:border-black/30")}>
                      <Smartphone size={24} />
                      <span className="text-xs font-bold uppercase tracking-widest">MoMo</span>
                    </button>
                    <button type="button" onClick={() => setPaymentMethod('paypal')} className={cn("p-4 border rounded-2xl flex flex-col items-center gap-2 transition-all", paymentMethod === 'paypal' ? "border-black bg-black/5" : "border-black/10 hover:border-black/30")}>
                      <Wallet size={24} />
                      <span className="text-xs font-bold uppercase tracking-widest">PayPal</span>
                    </button>
                    <button type="button" onClick={() => setPaymentMethod('bank_transfer')} className={cn("p-4 border rounded-2xl flex flex-col items-center gap-2 transition-all", paymentMethod === 'bank_transfer' ? "border-black bg-black/5" : "border-black/10 hover:border-black/30")}>
                      <Building2 size={24} />
                      <span className="text-xs font-bold uppercase tracking-widest">Bank</span>
                    </button>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {paymentMethod === 'credit_card' && (
                    <motion.div key="credit_card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-black/60">Card Information</label>
                        <div className="relative">
                          <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40" size={18} />
                          <input required type="text" placeholder="0000 0000 0000 0000" maxLength={19} className="w-full bg-muted/50 border border-transparent rounded-2xl py-4 pl-12 pr-4 focus:border-black/20 focus:bg-white transition-all outline-none font-mono" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-black/60">Expiry Date</label>
                          <input required type="text" placeholder="MM/YY" maxLength={5} className="w-full bg-muted/50 border border-transparent rounded-2xl py-4 px-5 focus:border-black/20 focus:bg-white transition-all outline-none font-mono" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-black/60">CVC</label>
                          <input required type="text" placeholder="123" maxLength={4} className="w-full bg-muted/50 border border-transparent rounded-2xl py-4 px-5 focus:border-black/20 focus:bg-white transition-all outline-none font-mono" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-black/60">Name on Card</label>
                        <input required type="text" placeholder="John Doe" className="w-full bg-muted/50 border border-transparent rounded-2xl py-4 px-5 focus:border-black/20 focus:bg-white transition-all outline-none" />
                      </div>
                    </motion.div>
                  )}

                  {paymentMethod === 'momo' && (
                    <motion.div key="momo" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-black/60">Mobile Money Number</label>
                        <div className="relative">
                          <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40" size={18} />
                          <input required type="tel" placeholder="0780 000 000" className="w-full bg-muted/50 border border-transparent rounded-2xl py-4 pl-12 pr-4 focus:border-black/20 focus:bg-white transition-all outline-none font-mono" />
                        </div>
                        <p className="text-[10px] text-black/40 mt-2">Enter your MTN Mobile Money or Airtel Money number. You will receive a prompt on your phone to confirm the payment.</p>
                      </div>
                    </motion.div>
                  )}

                  {paymentMethod === 'paypal' && (
                    <motion.div key="paypal" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-muted/30 p-6 rounded-2xl text-center border border-black/5">
                      <Wallet size={32} className="mx-auto mb-4 text-black/40" />
                      <p className="text-sm text-black/60">You will be redirected to PayPal to complete your secure payment after clicking confirm.</p>
                    </motion.div>
                  )}

                  {paymentMethod === 'bank_transfer' && (
                    <motion.div key="bank_transfer" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-muted/30 p-6 rounded-2xl border border-black/5 space-y-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Building2 size={24} className="text-black/40" />
                        <h3 className="font-bold text-sm uppercase tracking-widest">Bank of Kigali</h3>
                      </div>
                      <div className="space-y-1 text-sm text-black/60 font-mono">
                        <p>Account Name: Urban Ride Ltd</p>
                        <p>Account Number: 0000 0000 0000 00</p>
                        <p>Swift Code: BOKIRWRW</p>
                      </div>
                      <p className="text-[10px] text-black/40 mt-4">Please use your booking reference as the payment description. Your booking will be confirmed once funds clear.</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="pt-6 border-t border-black/5 flex justify-between items-center">
                  <button type="button" onClick={() => setStep(2)} className="text-sm font-medium text-black/60 hover:text-black transition-colors">
                    Back
                  </button>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="px-8 py-4 bg-black text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:opacity-80 transition-opacity disabled:opacity-50 flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Pay & Confirm'
                    )}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};
