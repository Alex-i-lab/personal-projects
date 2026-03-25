import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from "motion/react";
import { Star, ChevronLeft, ChevronRight, ShoppingBag, ArrowLeft, CheckCircle2, ChevronDown, Ruler, Heart } from "lucide-react";
import { PRODUCTS, SIZES } from '../constants';
import { useAppContext } from '../context/AppContext';
import { getOptimizedUrl, IMAGE_SIZES } from '../utils/cloudinary';

const SIZE_GUIDES: Record<string, { headers: string[], rows: string[][] }> = {
  "Knitwear": {
    headers: ["Size", "Chest (cm)", "Length (cm)", "Sleeve (cm)"],
    rows: [
      ["S", "102", "66", "62"],
      ["M", "106", "68", "63"],
      ["L", "110", "70", "64"],
      ["XL", "116", "72", "65"]
    ]
  },
  "Outerwear": {
    headers: ["Size", "Shoulder (cm)", "Chest (cm)", "Sleeve (cm)"],
    rows: [
      ["S", "44", "104", "63"],
      ["M", "46", "112", "65"],
      ["L", "47", "116", "66"],
      ["XL", "48", "120", "67"]
    ]
  },
  "Trousers": {
    headers: ["Size", "Waist (cm)", "Inseam (cm)", "Rise (cm)"],
    rows: [
      ["S", "82", "84", "24"],
      ["M", "90", "85", "26"],
      ["L", "94", "85", "27"],
      ["XL", "98", "86", "28"]
    ]
  },
  "Accessories": {
    headers: ["Dimension", "Measurement (cm)"],
    rows: [
      ["Length", "180"],
      ["Width", "35"]
    ]
  }
};

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, setSelectedProductForReviews, formatPrice, products, isLoadingProducts, toggleWishlist, isInWishlist } = useAppContext();
  
  const product = useMemo(() => products.find(p => p.id === id), [id, products]);
  const [[page, direction], setPage] = useState([0, 0]);
  const currentImageIndex = product?.images ? Math.abs(page % product.images.length) : 0;

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const [isAdded, setIsAdded] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  // Set default size
  useEffect(() => {
    if (product && SIZES[product.category]) {
      setSelectedSize(SIZES[product.category][0]);
    }
  }, [product]);

  // Related products based on category or material
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products.filter(p => 
      p.id !== product.id && 
      (p.category === product.category || p.material === product.material)
    ).slice(0, 6);
  }, [product, products]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setPage([0, 0]);
  }, [id]);

  if (isLoadingProducts) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-6 px-6">
        <div className="w-12 h-12 border-4 border-[#F5F5F5] border-t-gold rounded-full animate-spin" />
        <p className="text-[11px] uppercase tracking-[0.4em] text-[#AAAAAA] animate-pulse">Loading Product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-6 px-6">
        <h1 className="font-serif text-4xl">Product Not Found</h1>
        <Link to="/shop" className="text-sm uppercase tracking-widest border-b border-black pb-1">Back to Shop</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (selectedSize) {
      addToCart(product, selectedSize);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }
  };

  return (
    <div className="pb-24">
      <Helmet>
        <title>{`${product.title} | Empire Menswear Luxury Menswear`}</title>
        <meta name="description" content={`Shop the ${product.title} at Empire Menswear. Crafted from premium ${product.material}, this ${product.category.toLowerCase()} piece embodies Milanese sartorial excellence.`} />
        <link rel="canonical" href={`https://empire-menswear.luxury/product/${product.id}`} />
        
        {/* Product Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": product.title,
            "image": [product.img, ...(product.images || [])],
            "description": `Premium ${product.material} ${product.category.toLowerCase()} handcrafted in Milan, Italy.`,
            "brand": {
              "@type": "Brand",
              "name": "Empire Menswear"
            },
            "offers": {
              "@type": "Offer",
              "url": `https://empire-menswear.luxury/product/${product.id}`,
              "priceCurrency": "USD",
              "price": product.price.replace('$', '').replace(',', ''),
              "availability": "https://schema.org/InStock"
            }
          })}
        </script>
      </Helmet>
      {/* BACK BUTTON */}
      <div className="px-6 sm:px-16 py-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[11px] uppercase tracking-widest font-bold hover:opacity-60 transition-opacity"
        >
          <ArrowLeft size={14} />
          Back
        </button>
      </div>

      <div className="px-6 sm:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24">
        {/* IMAGE GALLERY CAROUSEL */}
        <div className="space-y-6">
          <div className="relative aspect-[4/5] bg-[#F5F5F5] rounded-[32px] overflow-hidden group touch-pan-y">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
              >
                <img 
                  src={getOptimizedUrl(product.images ? product.images[currentImageIndex] : product.img, { width: IMAGE_SIZES.PRODUCT_DETAIL })} 
                  alt={product.title} 
                  className="w-full h-full object-cover pointer-events-none"
                  referrerPolicy="no-referrer"
                  fetchPriority="high"
                />
              </motion.div>
            </AnimatePresence>

            {product.images && product.images.length > 1 && (
              <>
                {/* Navigation Arrows */}
                <button 
                  onClick={() => paginate(-1)}
                  className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-white/80 backdrop-blur-md rounded-full hover:bg-black hover:text-white transition-all opacity-0 group-hover:opacity-100 shadow-sm z-10"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={() => paginate(1)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-white/80 backdrop-blur-md rounded-full hover:bg-black hover:text-white transition-all opacity-0 group-hover:opacity-100 shadow-sm z-10"
                >
                  <ChevronRight size={20} />
                </button>

                {/* Dot Indicators */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {product.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        const newDirection = idx > currentImageIndex ? 1 : -1;
                        setPage([idx, newDirection]);
                      }}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'bg-black w-4' : 'bg-black/20 hover:bg-black/40'}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {product.images && product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => {
                    const newDirection = idx > currentImageIndex ? 1 : -1;
                    setPage([idx, newDirection]);
                  }}
                  className={`relative flex-shrink-0 w-24 aspect-[4/5] rounded-xl overflow-hidden border-2 transition-all ${idx === currentImageIndex ? 'border-black' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={getOptimizedUrl(img, { width: IMAGE_SIZES.THUMBNAIL })} alt={`${product.title} view ${idx + 1}`} loading="lazy" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* PRODUCT INFO */}
        <div className="flex flex-col justify-center space-y-10">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <p className="text-[11px] text-[#AAAAAA] uppercase tracking-[0.4em]">{product.category}</p>
              <span className="w-1 h-1 bg-[#AAAAAA] rounded-full" />
              <p className="text-[11px] text-[#AAAAAA] uppercase tracking-[0.4em]">{product.material}</p>
            </div>
            <h1 className="font-serif text-5xl sm:text-6xl tracking-tight leading-tight">{product.title}</h1>
            <p className="text-2xl font-medium">{formatPrice(product.price)}</p>
          </div>

          <div className="space-y-6">
            <p className="text-[#7A7A7A] text-lg font-light leading-relaxed">
              {product.desc}
            </p>

            {/* SIZE & FIT GUIDE */}
            <div className="border-t border-b border-black/5 py-6">
              <button 
                onClick={() => setIsSizeGuideOpen(!isSizeGuideOpen)}
                className="w-full flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <Ruler size={16} className="text-[#AAAAAA]" />
                  <span className="text-[11px] uppercase tracking-[0.2em] font-bold">Size & Fit Guide</span>
                </div>
                <ChevronDown 
                  size={16} 
                  className={`transition-transform duration-500 ${isSizeGuideOpen ? 'rotate-180' : ''}`} 
                />
              </button>
              
              <AnimatePresence>
                {isSizeGuideOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-8 space-y-6">
                      <p className="text-xs text-[#7A7A7A] leading-relaxed">
                        This garment is cut for a refined, contemporary silhouette. We recommend taking your standard size for a classic fit, or sizing up for a more relaxed drape.
                      </p>
                      
                      {SIZE_GUIDES[product.category] && (
                        <div className="overflow-x-auto scrollbar-hide">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="border-b border-black/5">
                                {SIZE_GUIDES[product.category].headers.map((header, i) => (
                                  <th key={i} className="py-3 text-[10px] uppercase tracking-widest font-bold text-[#AAAAAA]">{header}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {SIZE_GUIDES[product.category].rows.map((row, i) => (
                                <tr key={i} className="border-b border-black/5 last:border-0">
                                  {row.map((cell, j) => (
                                    <td key={j} className="py-4 text-xs font-medium">{cell}</td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                      
                      <div className="bg-[#F9F9F9] p-4 rounded-xl">
                        <p className="text-[10px] uppercase tracking-widest font-bold mb-2">Model Measurements</p>
                        <p className="text-xs text-[#7A7A7A]">Model is 188cm / 6'2" and wears size M.</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-6">
              <div 
                className="flex items-center gap-2 cursor-pointer hover:opacity-60 transition-opacity"
                onClick={() => setSelectedProductForReviews(product)}
              >
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      size={14} 
                      fill={star <= Math.floor(product.rating) ? "var(--color-gold)" : "transparent"} 
                      strokeWidth={1}
                      className={star <= Math.floor(product.rating) ? "text-gold" : "text-[#AAAAAA]"}
                    />
                  ))}
                </div>
                <span className="text-[11px] text-[#AAAAAA] uppercase tracking-widest">({product.reviewCount} Reviews)</span>
              </div>
            </div>
          </div>

          <div className="pt-6 space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#AAAAAA]">Select Size</h4>
                <button 
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-[10px] uppercase tracking-widest border-b border-black/10 pb-0.5 hover:border-black transition-all"
                >
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {SIZES[product.category]?.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 rounded-full border text-xs font-medium transition-all flex items-center justify-center ${selectedSize === size ? 'bg-black text-white border-gold shadow-lg' : 'border-black/10 hover:border-gold'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4">
                <button 
                  onClick={handleAddToCart}
                  disabled={isAdded || !selectedSize}
                  className={`flex-1 py-6 sm:py-7 rounded-full text-[13px] sm:text-[14px] md:text-[15px] uppercase tracking-[0.3em] font-bold transition-all duration-500 flex items-center justify-center gap-3 shadow-xl ${isAdded ? 'bg-emerald-500 text-white' : 'bg-gold text-white hover:bg-gold-dark'}`}
                >
                  {isAdded ? (
                    <>
                      <CheckCircle2 size={18} />
                      Added to Bag
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={18} />
                      Add to Shopping Bag
                    </>
                  )}
                </button>
                <button 
                  onClick={() => toggleWishlist(product)}
                  className={`w-16 sm:w-20 rounded-full border flex items-center justify-center transition-all duration-500 shadow-xl ${isInWishlist(product.id) ? 'bg-gold border-gold text-white' : 'border-black/10 hover:border-gold text-black hover:text-gold'}`}
                  title={isInWishlist(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                >
                  <Heart size={24} className={isInWishlist(product.id) ? "fill-white" : ""} />
                </button>
              </div>
              <p className="text-[10px] text-[#AAAAAA] uppercase tracking-widest text-center">Complimentary shipping & returns on all orders.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 pt-12 border-t border-black/5">
            <div className="space-y-2">
              <h4 className="text-[11px] uppercase tracking-widest font-bold">Material</h4>
              <p className="text-sm text-[#7A7A7A] font-light">100% Premium {product.material}</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-[11px] uppercase tracking-widest font-bold">Origin</h4>
              <p className="text-sm text-[#7A7A7A] font-light">Handcrafted in Milan, Italy</p>
            </div>
          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section className="mt-32 px-6 sm:px-16 space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="space-y-4">
              <p className="text-[11px] text-[#AAAAAA] uppercase tracking-[0.4em]">Curated For You</p>
              <h2 className="font-serif text-4xl sm:text-5xl font-normal tracking-tight">You Might Also Like</h2>
            </div>
          </div>

          <div className="relative group/carousel">
            <div className="flex gap-8 overflow-x-auto pb-12 scrollbar-hide snap-x snap-mandatory">
              {relatedProducts.map((item) => (
                <Link 
                  key={item.id}
                  to={`/product/${item.id}`}
                  className="flex-shrink-0 w-[280px] sm:w-[320px] snap-start space-y-6 group"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F5F5] rounded-[24px]">
                    <img 
                      src={getOptimizedUrl(item.img, { width: IMAGE_SIZES.PRODUCT_CARD })} 
                      alt={item.title} 
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-serif text-lg tracking-tight group-hover:opacity-60 transition-opacity">{item.title}</h3>
                        <p className="text-[10px] text-[#AAAAAA] uppercase tracking-widest mt-1">{item.material}</p>
                      </div>
                      <span className="font-medium">{formatPrice(item.price)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            {/* CAROUSEL CONTROLS (Visual only for now as it's native scroll) */}
            <div className="absolute top-1/2 -translate-y-1/2 -left-4 -right-4 flex justify-between pointer-events-none opacity-0 group-hover/carousel:opacity-100 transition-opacity">
               {/* These could be functional with a ref and scrollBy if needed */}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
