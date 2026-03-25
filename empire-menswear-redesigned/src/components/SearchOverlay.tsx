import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { Search, X, ArrowRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { PRODUCTS } from '../constants';

const SearchOverlay: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, products } = useAppContext();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      inputRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery("");
      setActiveCategory(null);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSearchOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/shop?q=${encodeURIComponent(query.trim())}`);
      setIsSearchOpen(false);
    }
  };

  const filteredProducts = products.filter(p => {
    const matchesQuery = p.title.toLowerCase().includes(query.toLowerCase()) ||
                        p.category.toLowerCase().includes(query.toLowerCase()) ||
                        p.material?.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = activeCategory ? p.category === activeCategory : true;
    return matchesQuery && matchesCategory;
  });

  const suggestions = filteredProducts.slice(0, 6);
  
  const categories = Array.from(new Set(products.map(p => p.category)));

  const highlightMatch = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => 
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={i} className="text-gold font-bold">{part}</span>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <div className="fixed inset-0 z-[200]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSearchOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute top-0 left-0 right-0 bg-white shadow-2xl overflow-hidden"
          >
            <div className="max-w-5xl mx-auto p-4 sm:p-8 space-y-6">
              <div className="flex justify-between items-center">
                <div className="text-[9px] font-bold tracking-[0.4em] text-black/40 uppercase">Search Collection</div>
                <button 
                  onClick={() => setIsSearchOpen(false)}
                  className="p-1.5 hover:bg-black/5 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-8">
                <form onSubmit={handleSubmit} className="relative group">
                  <Search size={24} className="absolute left-0 top-1/2 -translate-y-1/2 text-[#AAAAAA] group-focus-within:text-gold transition-colors" />
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full bg-transparent border-b border-black/10 py-4 pl-10 pr-12 text-xl sm:text-3xl font-serif focus:outline-none focus:border-gold transition-all placeholder:text-[#EAEAEA]"
                  />
                  {query && (
                    <button 
                      type="submit"
                      className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-gold text-white rounded-full hover:bg-gold-dark transition-all shadow-lg hover:scale-105 active:scale-95"
                    >
                      <ArrowRight size={18} />
                    </button>
                  )}
                </form>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  {/* Left Column: Categories */}
                  <div className="space-y-6 md:border-r md:border-black/5 md:pr-8">
                    <div className="space-y-3">
                      <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#AAAAAA]">Collections</h4>
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => setActiveCategory(null)}
                          className={`text-left py-1.5 text-xs uppercase tracking-widest transition-all ${!activeCategory ? 'text-gold font-bold' : 'text-gray-400 hover:text-black'}`}
                        >
                          All
                        </button>
                        {categories.map(cat => (
                          <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`text-left py-1.5 text-xs uppercase tracking-widest transition-all ${activeCategory === cat ? 'text-gold font-bold' : 'text-gray-400 hover:text-black'}`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#AAAAAA]">Trending</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {["Cashmere", "Silk", "Milanese"].map(tag => (
                          <button
                            key={tag}
                            onClick={() => setQuery(tag)}
                            className="px-3 py-1 rounded-full border border-black/5 text-[9px] uppercase tracking-widest hover:border-gold hover:text-gold transition-all"
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Results */}
                  <div className="md:col-span-3 space-y-4">
                    <div className="flex justify-between items-end border-b border-black/5 pb-2">
                      <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#AAAAAA]">
                        {query ? `Results for "${query}"` : 'Suggestions'}
                      </h4>
                      <span className="text-[9px] text-gray-400 uppercase tracking-widest">{filteredProducts.length} items</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {suggestions.length > 0 ? (
                        suggestions.map(product => (
                          <motion.button
                            layout
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            key={product.id}
                            onClick={() => {
                              navigate(`/product/${product.id}`);
                              setIsSearchOpen(false);
                            }}
                            className="group flex flex-col text-left space-y-2"
                          >
                            <div className="aspect-[4/5] bg-[#F5F5F5] rounded-xl overflow-hidden relative">
                              <img 
                                src={product.img} 
                                alt={product.title} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                referrerPolicy="no-referrer" 
                              />
                            </div>
                            <div>
                              <p className="font-serif text-sm leading-tight group-hover:text-gold transition-colors truncate">
                                {highlightMatch(product.title, query)}
                              </p>
                              <div className="flex justify-between items-center mt-0.5">
                                <p className="text-[9px] text-[#AAAAAA] uppercase tracking-widest">{product.category}</p>
                                <p className="text-[10px] font-medium">{product.price}</p>
                              </div>
                            </div>
                          </motion.button>
                        ))
                      ) : (
                        <div className="col-span-full py-8 text-center space-y-3">
                          <p className="text-[#7A7A7A] italic font-serif text-lg">No pieces found.</p>
                          <button 
                            onClick={() => setQuery("")}
                            className="text-[10px] uppercase tracking-widest text-gold font-bold border-b border-gold pb-0.5"
                          >
                            Clear
                          </button>
                        </div>
                      )}
                    </div>

                    {filteredProducts.length > 6 && (
                      <div className="pt-4 flex justify-center">
                        <button
                          onClick={handleSubmit}
                          className="px-8 py-2.5 rounded-full bg-black text-white text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-gold transition-all shadow-lg"
                        >
                          View all results
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;
