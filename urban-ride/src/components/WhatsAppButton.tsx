import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const phoneNumber = "+250780000000"; // Replace with actual business number
  const message = "Hello! I'm interested in booking a car with Kigali Elite Fleet.";
  const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-[9999] w-14 h-14 bg-black text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-black/80 transition-colors border border-white/10"
      title="Chat with us on WhatsApp"
    >
      <MessageCircle size={32} fill="currentColor" />
      <span className="absolute -top-1 -right-1 flex h-4 w-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
        <span className="relative inline-flex rounded-full h-4 w-4 bg-black/20"></span>
      </span>
    </motion.a>
  );
};
