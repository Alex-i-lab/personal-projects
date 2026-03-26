import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { Star, Search, SlidersHorizontal, X, ChevronDown, Eye, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PRODUCTS, CATEGORIES, SIZES, GENDERS, OCCASIONS, FITS, STYLES } from '../constants';
import { useAppContext } from '../context/AppContext';
import { getOptimizedUrl, IMAGE_SIZES } from '../utils/cloudinary';

const Shop: React.FC = () => {
  const { addToCart, setSelectedProductForReviews, setQuickViewProduct, formatPrice, products, isLoadingProducts, toggleWishlist, isInWishlist } = useAppContext();
  const [searchParams] = useSearchParams();
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedColor, setSelectedColor] = useState("All");
  const [selectedSize, setSelectedSize] = useState("All");
  const [selectedGender, setSelectedGender] = useState("All");
  const [selectedOccasion, setSelectedOccasion] = useState("All");
  const [selectedFit, setSelectedFit] = useState("All");
  const [selectedStyle, setSelectedStyle] = useState("All");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("Featured");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  const COLORS = ["All", "Black", "Blue", "Beige", "Grey", "Red", "Green", "Brown", "White", "Purple", "Teal", "Gold"];

  // Scroll to top on mount or page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const q = searchParams.get("q");
    if (q) {
      setSearchQuery(q);
    }
  }, [searchParams, currentPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedColor, selectedSize, selectedGender, selectedOccasion, selectedFit, selectedStyle, priceRange, minRating, sortBy]);

  const filteredProducts = useMemo(() => {
    let result = products.filter(product => {
      const price = parseInt(product.price.replace('$', '').replace(',', ''));
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (product as any).tags?.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
      const matchesRating = product.rating >= minRating;
      
      const matchesColor = selectedColor === "All" || 
                          (product as any).color === selectedColor ||
                          product.title.toLowerCase().includes(selectedColor.toLowerCase()) ||
                          (selectedColor === "White" && product.title.toLowerCase().includes("offwhite"));

      const matchesSize = selectedSize === "All" || 
                         (product as any).sizes?.includes(selectedSize);

      const matchesGender = selectedGender === "All" || (product as any).gender === selectedGender;
      const matchesOccasion = selectedOccasion === "All" || (product as any).occasion === selectedOccasion;
      const matchesFit = selectedFit === "All" || (product as any).fit === selectedFit;
      const matchesStyle = selectedStyle === "All" || (product as any).style === selectedStyle;

      return matchesSearch && matchesCategory && matchesPrice && matchesRating && 
             matchesColor && matchesSize && matchesGender && matchesOccasion && matchesFit && matchesStyle;
    });

    if (sortBy === "Price: Low to High") {
      result.sort((a, b) => parseInt(a.price.replace('$', '').replace(',', '')) - parseInt(b.price.replace('$', '').replace(',', '')));
    } else if (sortBy === "Price: High to Low") {
      result.sort((a, b) => parseInt(b.price.replace('$', '').replace(',', '')) - parseInt(a.price.replace('$', '').replace(',', '')));
    } else if (sortBy === "Top Rated") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "Newest Arrivals") {
      // Assuming original order is chronological, reverse it for newest
      result = [...result].reverse();
    }

    return result;
  }, [searchQuery, selectedCategory, selectedColor, selectedSize, selectedGender, selectedOccasion, selectedFit, selectedStyle, priceRange, minRating, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedColor("All");
    setSelectedSize("All");
    setSelectedGender("All");
    setSelectedOccasion("All");
    setSelectedFit("All");
    setSelectedStyle("All");
    setPriceRange([0, 500]);
    setMinRating(0);
    setSearchQuery("");
    setSortBy("Featured");
  };

  return (
    <div className="px-6 sm:px-16 py-12 space-y-12 min-h-screen bg-[#FAFAFA]">
      <Helmet>
        <title>Shop All | Empire Menswear Luxury Menswear</title>
        <meta name="description" content="Browse our full collection of luxury menswear. From tailored formal wear to refined casual pieces, find the perfect addition to your sartorial wardrobe." />
        <link rel="canonical" href="https://empire-menswear.luxury/shop" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
      </Helmet>
      {/* HEADER */}
      <div className="space-y-4 max-w-2xl">
        <p className="text-[11px] text-[#AAAAAA] uppercase tracking-[0.4em]">The Full Collection</p>
        <h1 className="font-serif text-5xl sm:text-6xl font-normal tracking-tight">Shop All Pieces</h1>
        <p className="text-[#7A7A7A] text-lg font-light leading-relaxed">
          Explore our complete range of meticulously crafted garments and accessories, designed for the modern connoisseur.
        </p>
      </div>

      {/* CONTROLS */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 sticky top-[80px] z-40 bg-[#FAFAFA]/90 backdrop-blur-md py-4 border-y border-black/5">
        <div className="relative w-full md:w-96 group">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#AAAAAA] group-focus-within:text-black transition-colors" />
          <input 
            type="text" 
            placeholder="Search products, styles..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-black/5 rounded-full py-3 pl-12 pr-6 text-sm focus:outline-none focus:ring-1 focus:ring-gold/20 transition-all shadow-sm"
          />
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          {(selectedCategory !== "All" || selectedColor !== "All" || selectedSize !== "All" || 
            selectedGender !== "All" || selectedOccasion !== "All" || selectedFit !== "All" || selectedStyle !== "All" ||
            minRating > 0 || priceRange[0] > 0 || priceRange[1] < 500 || searchQuery !== "" || sortBy !== "Featured") && (
            <button 
              onClick={clearFilters}
              className="px-6 py-3 rounded-full text-[11px] uppercase tracking-widest font-bold text-[#AAAAAA] hover:text-black transition-colors"
            >
              Clear All
            </button>
          )}
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full border transition-all text-sm uppercase tracking-widest font-medium ${isFilterOpen ? 'bg-black text-white border-black' : 'bg-white text-black border-black/10 hover:border-black'}`}
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>
          
          <div className="relative flex-1 md:flex-none group">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full appearance-none bg-white border border-black/10 rounded-full py-3 pl-6 pr-12 text-sm focus:outline-none focus:border-black transition-all cursor-pointer uppercase tracking-widest font-medium shadow-sm"
            >
              <option>Featured</option>
              <option>Newest Arrivals</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Top Rated</option>
            </select>
            <ChevronDown size={16} className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-[#AAAAAA]" />
          </div>
        </div>
      </div>

      {/* FILTER DRAWER / PANEL */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-white rounded-[32px] border border-black/5 shadow-xl relative"
          >
            {/* Close Button at top right */}
            <button 
              onClick={() => setIsFilterOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-black/5 transition-colors z-10"
              title="Close Filters"
            >
              <X size={20} />
            </button>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              <div className="space-y-6">
                <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#AAAAAA]">Category</h4>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-widest transition-all border ${selectedCategory === cat ? 'bg-black text-white border-gold' : 'bg-[#F5F5F5] text-[#7A7A7A] border-transparent hover:border-gold/40'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#AAAAAA]">Gender</h4>
                <div className="flex flex-wrap gap-2">
                  {GENDERS.map(gender => (
                    <button 
                      key={gender}
                      onClick={() => setSelectedGender(gender)}
                      className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-widest transition-all border ${selectedGender === gender ? 'bg-black text-white border-gold' : 'bg-[#F5F5F5] text-[#7A7A7A] border-transparent hover:border-gold/40'}`}
                    >
                      {gender}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#AAAAAA]">Occasion</h4>
                <div className="flex flex-wrap gap-2">
                  {OCCASIONS.map(occ => (
                    <button 
                      key={occ}
                      onClick={() => setSelectedOccasion(occ)}
                      className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-widest transition-all border ${selectedOccasion === occ ? 'bg-black text-white border-gold' : 'bg-[#F5F5F5] text-[#7A7A7A] border-transparent hover:border-gold/40'}`}
                    >
                      {occ}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#AAAAAA]">Fit</h4>
                <div className="flex flex-wrap gap-2">
                  {FITS.map(fit => (
                    <button 
                      key={fit}
                      onClick={() => setSelectedFit(fit)}
                      className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-widest transition-all border ${selectedFit === fit ? 'bg-black text-white border-gold' : 'bg-[#F5F5F5] text-[#7A7A7A] border-transparent hover:border-gold/40'}`}
                    >
                      {fit}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#AAAAAA]">Style</h4>
                <div className="flex flex-wrap gap-2">
                  {STYLES.map(style => (
                    <button 
                      key={style}
                      onClick={() => setSelectedStyle(style)}
                      className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-widest transition-all border ${selectedStyle === style ? 'bg-black text-white border-gold' : 'bg-[#F5F5F5] text-[#7A7A7A] border-transparent hover:border-gold/40'}`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#AAAAAA]">Color</h4>
                <div className="flex flex-wrap gap-2">
                  {COLORS.map(color => (
                    <button 
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-widest transition-all border ${selectedColor === color ? 'bg-black text-white border-gold' : 'bg-[#F5F5F5] text-[#7A7A7A] border-transparent hover:border-gold/40'}`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#AAAAAA]">Size</h4>
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={() => setSelectedSize("All")}
                    className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-widest transition-all border ${selectedSize === "All" ? 'bg-black text-white border-gold' : 'bg-[#F5F5F5] text-[#7A7A7A] border-transparent hover:border-gold/40'}`}
                  >
                    All
                  </button>
                  {selectedCategory !== "All" ? (
                    SIZES[selectedCategory]?.map(size => (
                      <button 
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-widest transition-all border ${selectedSize === size ? 'bg-black text-white border-gold' : 'bg-[#F5F5F5] text-[#7A7A7A] border-transparent hover:border-gold/40'}`}
                      >
                        {size}
                      </button>
                    ))
                  ) : (
                    Object.values(SIZES).flat().filter((v, i, a) => a.indexOf(v) === i).map(size => (
                      <button 
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-widest transition-all border ${selectedSize === size ? 'bg-black text-white border-gold' : 'bg-[#F5F5F5] text-[#7A7A7A] border-transparent hover:border-gold/40'}`}
                      >
                        {size}
                      </button>
                    ))
                  )}
                </div>
              </div>

              <div className="space-y-8">
                <div className="space-y-6">
                  <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#AAAAAA]">Price Range</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between text-xs font-medium">
                      <span>{formatPrice(priceRange[0])}</span>
                      <span>{formatPrice(priceRange[1])}</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="500" 
                      step="10"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full h-1 bg-black/5 rounded-lg appearance-none cursor-pointer accent-gold"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#AAAAAA]">Minimum Rating</h4>
                  <div className="flex gap-2">
                    {[0, 3, 4, 4.5].map(rating => (
                      <button 
                        key={rating}
                        onClick={() => setMinRating(rating)}
                        className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-widest transition-all border ${minRating === rating ? 'bg-black text-white border-gold' : 'bg-[#F5F5F5] text-[#7A7A7A] border-transparent hover:border-gold/40'}`}
                      >
                        {rating === 0 ? "Any" : `${rating}+`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="px-8 py-6 bg-[#F9F9F9] border-t border-black/5 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
                <p className="text-[11px] text-[#AAAAAA] uppercase tracking-widest">Showing {filteredProducts.length} results</p>
                <button 
                  onClick={clearFilters}
                  className="text-[11px] uppercase tracking-widest font-bold hover:opacity-60 transition-opacity"
                >
                  Reset All
                </button>
              </div>
              <button 
                onClick={() => setIsFilterOpen(false)}
                className="w-full sm:w-auto bg-black text-white px-10 py-4 rounded-full text-[12px] uppercase tracking-[0.2em] font-bold hover:bg-gold transition-all shadow-lg"
              >
                Apply Filters & Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PRODUCT GRID */}
      {isLoadingProducts ? (
        <div className="py-24 flex flex-col items-center justify-center space-y-4">
          <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin" />
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#AAAAAA]">Curating Collection...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="py-24 text-center space-y-6">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
            <Search size={32} strokeWidth={1} className="text-[#EAEAEA]" />
          </div>
          <div className="space-y-2">
            <h3 className="font-serif text-2xl">No pieces found</h3>
            <p className="text-[#7A7A7A] font-light">Try adjusting your filters or search query.</p>
          </div>
          <button 
            onClick={clearFilters}
            className="bg-gold text-white px-10 py-4 rounded-full text-[12px] uppercase tracking-[0.2em] font-bold hover:bg-gold-dark transition-all"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="space-y-16">
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 sm:gap-x-8 gap-y-12 sm:gap-y-16">
            {paginatedProducts.map((product, index) => (
              <motion.div 
                key={product.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (index % 8) * 0.05 }}
                className="group cursor-pointer space-y-6"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F5F5] rounded-[24px]">
                  <Link to={`/product/${product.id}`}>
                    <img 
                      src={getOptimizedUrl(product.img, { width: IMAGE_SIZES.PRODUCT_CARD })} 
                      alt={product.title} 
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  </Link>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />
                  <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-500">
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleWishlist(product);
                      }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 ${isInWishlist(product.id) ? 'bg-gold text-white' : 'bg-white text-black hover:bg-gold hover:text-white'}`}
                    >
                      <Heart size={16} className={isInWishlist(product.id) ? "fill-white" : ""} />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickViewProduct(product);
                      }}
                      className="p-3 bg-white/90 backdrop-blur-md rounded-full hover:bg-black hover:text-white transition-all shadow-lg"
                      title="Quick View"
                    >
                      <Eye size={16} />
                    </button>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setQuickViewProduct(product);
                    }}
                    className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md text-black py-4 rounded-full text-[11px] uppercase tracking-[0.2em] font-bold opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 hover:bg-black hover:text-white shadow-xl"
                  >
                    Quick View
                  </button>
                </div>
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-1 sm:gap-4">
                    <div>
                      <h3 className="font-serif text-base sm:text-xl tracking-tight group-hover:opacity-60 transition-opacity">{product.title}</h3>
                      <p className="text-[9px] sm:text-[11px] text-[#AAAAAA] uppercase tracking-widest mt-0.5 sm:mt-1">{product.material}</p>
                    </div>
                    <span className="font-medium text-sm sm:text-lg">{formatPrice(product.price)}</span>
                  </div>
                  <div 
                    className="flex items-center gap-2 pt-2 cursor-pointer hover:opacity-60 transition-opacity"
                    onClick={() => setSelectedProductForReviews(product)}
                  >
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          size={10} 
                          fill={star <= Math.floor(product.rating) ? "var(--color-gold)" : "transparent"} 
                          strokeWidth={1}
                          className={star <= Math.floor(product.rating) ? "text-gold" : "text-[#AAAAAA]"}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-[#AAAAAA] uppercase tracking-widest">({product.reviewCount} Reviews)</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* PAGINATION CONTROLS */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 pt-12 border-t border-black/5">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`p-3 rounded-full border transition-all ${currentPage === 1 ? 'opacity-20 cursor-not-allowed' : 'hover:bg-black hover:text-white border-black/10'}`}
              >
                <ChevronLeft size={20} />
              </button>
              
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-full text-xs font-bold transition-all ${currentPage === page ? 'bg-black text-white' : 'hover:bg-black/5 text-[#AAAAAA]'}`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`p-3 rounded-full border transition-all ${currentPage === totalPages ? 'opacity-20 cursor-not-allowed' : 'hover:bg-black hover:text-white border-black/10'}`}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Shop;
