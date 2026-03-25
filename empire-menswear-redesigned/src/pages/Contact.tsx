import React, { useState, useEffect } from 'react';
import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send, Instagram, Linkedin, Twitter, Clock, Loader2 } from "lucide-react";
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';

const Contact: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const subjectParam = searchParams.get('subject');
    if (subjectParam === 'bespoke') {
      setFormState(prev => ({ ...prev, subject: 'Bespoke Appointment' }));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Firebase removal: Simulating form submission
      console.log("Simulating contact form submission:", formState);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 5000);
      setFormState({ name: '', email: '', subject: 'General Inquiry', message: '' });
    } catch (error) {
      console.error("Failed to submit contact form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const locations = [
    {
      city: "Kigali",
      address: "EMPIRE MENS WEAR, 4th floor, La Bonne Adresse, KN 2 Roundabout, Kigali, Rwanda",
      phone: "+250 788 123 456",
      email: "kigali@empire-menswear.luxury",
      hours: "Mon - Sat: 09:00 - 20:00"
    }
  ];

  return (
    <div className="pb-24">
      <Helmet>
        <title>Contact Us | Empire Menswear Luxury Menswear</title>
        <meta name="description" content="Get in touch with the House of Empire. Contact our master tailors, book a bespoke appointment, or find our flagship store in Kigali." />
      </Helmet>

      {/* HERO SECTION */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden bg-[#111111]">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://picsum.photos/seed/contact-hero/1920/1080?grayscale" 
            alt="Contact Empire Menswear" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 text-center text-white space-y-4 px-6">
          <p className="text-[11px] uppercase tracking-[0.5em] opacity-70">Get In Touch</p>
          <h1 className="font-serif text-5xl sm:text-7xl tracking-tight">Contact <span className="italic">Us</span></h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 sm:px-16 mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          {/* CONTACT FORM */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
          >
            <div className="space-y-4">
              <h2 className="font-serif text-4xl tracking-tight">Send a Message</h2>
              <p className="text-[#7A7A7A] font-light leading-relaxed">
                Whether you have a question about our collections, require assistance with an order, or wish to discuss a bespoke commission, our team is here to assist you.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-[#AAAAAA]">Full Name</label>
                  <input 
                    required
                    type="text" 
                    value={formState.name}
                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                    placeholder="Giovanni Rossi"
                    className="w-full bg-transparent border-b border-black/10 py-3 focus:outline-none focus:border-black transition-colors text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-[#AAAAAA]">Email Address</label>
                  <input 
                    required
                    type="email" 
                    value={formState.email}
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                    placeholder="giovanni@example.com"
                    className="w-full bg-transparent border-b border-black/10 py-3 focus:outline-none focus:border-black transition-colors text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-[#AAAAAA]">Subject</label>
                <select 
                  value={formState.subject}
                  onChange={(e) => setFormState({...formState, subject: e.target.value})}
                  className="w-full bg-transparent border-b border-black/10 py-3 focus:outline-none focus:border-black transition-colors text-sm appearance-none cursor-pointer"
                >
                  <option>General Inquiry</option>
                  <option>Bespoke Appointment</option>
                  <option>Order Support</option>
                  <option>Press & Media</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-[#AAAAAA]">Message</label>
                <textarea 
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({...formState, message: e.target.value})}
                  placeholder="How can we assist you today?"
                  className="w-full bg-transparent border-b border-black/10 py-3 focus:outline-none focus:border-black transition-colors text-sm resize-none"
                />
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-black text-white px-12 py-5 rounded-full text-[12px] uppercase tracking-[0.3em] font-bold hover:bg-black/80 transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending...
                  </>
                ) : isSubmitted ? "Message Sent" : "Send Message"}
                {!isSubmitting && <Send size={16} />}
              </button>
            </form>
          </motion.div>

          {/* CONTACT INFO & LOCATIONS */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-16"
          >
            <div className="space-y-12">
              <h2 className="font-serif text-4xl tracking-tight">Our Ateliers</h2>
              <div className="space-y-12">
                {locations.map((loc) => (
                  <div key={loc.city} className="space-y-4 group">
                    <h3 className="font-serif text-2xl italic border-b border-black/5 pb-2 group-hover:border-black transition-all duration-500">{loc.city}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 text-[#7A7A7A]">
                          <MapPin size={16} className="mt-1 flex-shrink-0" />
                          <p className="text-sm leading-relaxed">{loc.address}</p>
                        </div>
                        <div className="flex items-center gap-3 text-[#7A7A7A]">
                          <Phone size={16} className="flex-shrink-0" />
                          <p className="text-sm">{loc.phone}</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-[#7A7A7A]">
                          <Mail size={16} className="flex-shrink-0" />
                          <p className="text-sm">{loc.email}</p>
                        </div>
                        <div className="flex items-center gap-3 text-[#7A7A7A]">
                          <Clock size={16} className="flex-shrink-0" />
                          <p className="text-sm">{loc.hours}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-12 border-t border-black/5 space-y-8">
              <h3 className="text-[11px] uppercase tracking-[0.4em] font-bold text-[#AAAAAA]">Connect With Us</h3>
              <div className="flex gap-8">
                <a href="#" className="hover:opacity-60 transition-opacity"><Instagram size={24} strokeWidth={1.5} /></a>
                <a href="#" className="hover:opacity-60 transition-opacity"><Twitter size={24} strokeWidth={1.5} /></a>
                <a href="#" className="hover:opacity-60 transition-opacity"><Linkedin size={24} strokeWidth={1.5} /></a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* MAP SECTION */}
      <section className="mt-24 px-6 sm:px-16">
        <div className="h-[500px] bg-[#F5F5F5] rounded-[40px] overflow-hidden relative shadow-2xl">
          <iframe 
            width="100%" 
            height="100%" 
            frameBorder="0" 
            style={{ border: 0 }} 
            src="https://maps.google.com/maps?q=EMPIRE+MENS+WEAR,+La+Bonne+Adresse,+KN+2+Roundabout,+Kigali&t=&z=15&ie=UTF8&iwloc=&output=embed" 
            allowFullScreen
            className="absolute inset-0 grayscale hover:grayscale-0 transition-all duration-700"
          ></iframe>
          <div className="absolute bottom-8 left-8 right-8 md:right-auto md:w-96">
            <div className="bg-white/90 backdrop-blur-md p-8 rounded-[32px] shadow-2xl space-y-4">
              <h4 className="font-serif text-2xl tracking-tight">Visit Our Flagship</h4>
              <p className="text-sm text-[#7A7A7A] leading-relaxed">EMPIRE MENS WEAR, 4th floor, La Bonne Adresse, KN 2 Roundabout, Kigali, Rwanda</p>
              <a 
                href="https://www.google.com/maps/search/?api=1&query=EMPIRE+MENS+WEAR+La+Bonne+Adresse+Kigali" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block text-[11px] uppercase tracking-widest font-bold border-b border-black pb-1 hover:opacity-60 transition-opacity"
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
