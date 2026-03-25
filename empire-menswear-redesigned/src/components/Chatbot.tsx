import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, User as UserIcon, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from '../constants';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: "Welcome to Empire Menswear. I am your sartorial assistant. How may I assist you with our collections or services today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const productContext = PRODUCTS.map(p => 
        `${p.title}: ${p.desc} (Price: ${p.price}, Category: ${p.category}, Occasion: ${p.occasion})`
      ).join('\n');

      const systemInstruction = `
        You are the Empire Menswear Sartorial Assistant. 
        Your goal is to provide expert advice on luxury menswear, our specific products, and our services (like Bespoke tailoring).
        
        STRICT RULES:
        1. ONLY answer questions related to Empire Menswear, its products, services, and general luxury menswear style advice.
        2. If a user asks about anything unrelated (e.g., weather, politics, other businesses, general knowledge not related to fashion), politely decline and redirect them to Empire Menswear services.
        3. Use a sophisticated, professional, and helpful tone.
        4. Refer to our flagship location in Kigali, Rwanda if asked about locations.
        5. Here is our current product catalog for reference:
        ${productContext}
        
        Services we offer:
        - Bespoke Tailoring: Handcrafted in Milan, personalized for the modern connoisseur.
        - Ready-to-Wear: Formal, Casual, and Wedding collections.
        - Accessories: Bowties, shirts, etc.
        - Global Shipping: We ship our luxury pieces worldwide.
      `;

      const chat = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction,
        },
        history: messages.map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        }))
      });

      const result = await chat.sendMessage({ message: userMessage });
      const responseText = result.text || "I apologize, I am unable to process that request at the moment. How else can I help you with our collections?";
      
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "I encountered a slight technical difficulty. Please try again or contact our atelier directly." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[200]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20, x: 20 }}
            className="absolute bottom-20 right-0 w-[350px] sm:w-[400px] h-[500px] bg-white shadow-2xl rounded-[32px] overflow-hidden border border-black/5 flex flex-col"
          >
            {/* Header */}
            <div className="bg-black text-white p-6 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                  <Bot size={20} className="text-gold" />
                </div>
                <div>
                  <h3 className="text-sm font-serif tracking-widest uppercase">Empire Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] text-white/60 uppercase tracking-widest">Online</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide bg-[#FAFAFA]"
            >
              {messages.map((m, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={i}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-3 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${m.role === 'user' ? 'bg-black text-white' : 'bg-gold/10 text-gold'}`}>
                      {m.role === 'user' ? <UserIcon size={14} /> : <Bot size={14} />}
                    </div>
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed ${m.role === 'user' ? 'bg-black text-white rounded-tr-none' : 'bg-white text-black shadow-sm border border-black/5 rounded-tl-none'}`}>
                      {m.text}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[85%]">
                    <div className="w-8 h-8 rounded-full bg-gold/10 text-gold flex items-center justify-center">
                      <Bot size={14} />
                    </div>
                    <div className="p-4 rounded-2xl bg-white text-black shadow-sm border border-black/5 rounded-tl-none flex items-center gap-2">
                      <Loader2 size={14} className="animate-spin text-gold" />
                      <span className="text-xs text-[#AAAAAA] italic">Assistant is typing...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-black/5">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Ask about our collections..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  className="w-full bg-[#F5F5F5] border-none rounded-full py-4 pl-6 pr-14 text-sm focus:ring-1 focus:ring-gold outline-none"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 p-2.5 bg-gold text-white rounded-full hover:bg-gold-dark transition-all disabled:opacity-50 disabled:scale-95"
                >
                  <Send size={18} />
                </button>
              </div>
              <p className="text-[9px] text-center text-[#AAAAAA] mt-3 uppercase tracking-widest">Empire Sartorial AI Assistant</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-black text-white' : 'bg-gold text-white'}`}
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </motion.button>
    </div>
  );
};

export default Chatbot;
