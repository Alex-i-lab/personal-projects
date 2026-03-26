import React from 'react';
import { motion } from "motion/react";
import { Star, Mail, Eye, Globe, Heart } from "lucide-react";
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PRODUCTS } from '../constants';
import { useAppContext } from '../context/AppContext';
import { getOptimizedUrl, IMAGE_SIZES } from '../utils/cloudinary';

const Home: React.FC = () => {
  const { addToCart, setSelectedProductForReviews, setQuickViewProduct, formatPrice, products, isLoadingProducts, toggleWishlist, isInWishlist } = useAppContext();

  return (
    <div className="space-y-24 pb-24">
      <Helmet>
        <title>Empire Menswear | Luxury Menswear & Sartorial Excellence</title>
        <meta name="description" content="Discover Empire Menswear, the pinnacle of luxury menswear. Explore our collection of premium knitwear, outerwear, and bespoke tailoring handcrafted in Milan." />
        <link rel="canonical" href="https://empire-menswear.luxury/" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link 
          rel="preload" 
          as="image" 
          href={getOptimizedUrl("https://res.cloudinary.com/dcy26s9jm/image/upload/v1774306147/hero_ynvxcc.png", { width: IMAGE_SIZES.HERO })} 
        />
      </Helmet>
      {/* HERO SECTION */}
      <section className="relative h-screen min-h-[600px] md:h-[90vh] lg:h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70 z-10" />
        <img 
          src={getOptimizedUrl("https://res.cloudinary.com/dcy26s9jm/image/upload/v1774306147/hero_ynvxcc.png", { width: IMAGE_SIZES.HERO })} 
          alt="Empire Menswear Hero" 
          className="absolute inset-0 w-full h-full object-cover animate-slow-zoom"
          referrerPolicy="no-referrer"
          fetchPriority="high"
          sizes="100vw"
        />
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-white px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="space-y-6 sm:space-y-8 max-w-5xl mx-auto flex flex-col items-center"
          >
            <p className="text-[10px] sm:text-[12px] md:text-[13px] uppercase tracking-[0.4em] sm:tracking-[0.6em] font-light opacity-90">Spring / Summer 2026</p>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-normal leading-[1.1] tracking-tight">
              The Art of <br className="hidden sm:block" />
              <span className="italic">Timeless Elegance</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg font-light text-white/80 max-w-2xl mx-auto leading-relaxed px-4">
              Discover the pinnacle of Milanese craftsmanship. Hand-stitched garments crafted from the world's rarest noble fibers.
            </p>
            <div className="pt-6 sm:pt-10 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center w-full">
              <Link 
                to="/shop"
                className="w-full sm:w-auto bg-gold text-white px-10 sm:px-12 md:px-14 py-4 sm:py-5 md:py-6 rounded-full text-[11px] sm:text-[13px] md:text-[14px] uppercase tracking-[0.2em] sm:tracking-[0.3em] font-medium hover:bg-gold-dark transition-all duration-500 shadow-2xl"
              >
                Explore Collection
              </Link>
              <a 
                href="#bespoke"
                className="w-full sm:w-auto bg-transparent border border-white/40 backdrop-blur-sm text-white px-10 sm:px-12 md:px-14 py-4 sm:py-5 md:py-6 rounded-full text-[11px] sm:text-[13px] md:text-[14px] uppercase tracking-[0.2em] sm:tracking-[0.3em] font-medium hover:bg-white hover:text-black transition-all duration-500"
              >
                Bespoke Service
              </a>
            </div>
            
            {/* Scroll Indicator - Positioned relative to content to ensure alignment */}
            <div className="pt-12 animate-bounce opacity-40 hidden sm:block">
              <div className="w-[1px] h-12 bg-white mx-auto" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURED COLLECTIONS */}
      <section id="collections" className="px-6 sm:px-16 space-y-16">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-4">
            <p className="text-[11px] text-[#AAAAAA] uppercase tracking-[0.4em]">Curated Selection</p>
            <h2 className="font-serif text-4xl sm:text-5xl font-normal tracking-tight">Featured Pieces</h2>
          </div>
          <Link 
            to="/shop"
            className="text-[13px] uppercase tracking-[0.2em] border-b border-black pb-2 hover:opacity-60 transition-opacity font-medium"
          >
            View Full Collection
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-8 gap-y-12 sm:gap-y-16">
          {isLoadingProducts ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-6 animate-pulse">
                <div className="aspect-[3/4] bg-[#F5F5F5] rounded-[20px]" />
                <div className="space-y-2">
                  <div className="h-6 bg-[#F5F5F5] rounded w-3/4" />
                  <div className="h-4 bg-[#F5F5F5] rounded w-1/2" />
                </div>
              </div>
            ))
          ) : (
            products.slice(0, 8).map((product, index) => (
              <motion.div 
                key={product.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer space-y-6"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F5F5] rounded-[20px]">
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
                      className={`p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${isInWishlist(product.id) ? 'bg-gold text-white' : 'bg-white/90 backdrop-blur-md text-black hover:bg-gold hover:text-white'}`}
                      title={isInWishlist(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
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
                    onClick={() => setQuickViewProduct(product)}
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
            ))
          )}
        </div>
      </section>

      {/* BESPOKE SECTION */}
      <section id="bespoke" className="px-4 sm:px-16">
        <div className="relative min-h-[600px] h-[80vh] md:h-[70vh] lg:h-[80vh] rounded-[30px] sm:rounded-[40px] overflow-hidden group">
          <img 
            src={getOptimizedUrl("https://res.cloudinary.com/dcy26s9jm/image/upload/v1774306538/lifestyle_noz9n3.webp", { width: IMAGE_SIZES.PRODUCT_DETAIL })} 
            alt="Bespoke Tailoring" 
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          {/* Responsive Gradient: Bottom-to-top on mobile, Left-to-right on desktop */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent md:bg-gradient-to-r md:from-black/80 md:via-black/40 md:to-transparent z-10" />
          
          <div className="relative z-20 h-full flex items-end md:items-center px-8 sm:px-16 lg:px-24 pb-16 md:pb-0">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-xl space-y-6 sm:space-y-8 text-white"
            >
              <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.4em] sm:tracking-[0.5em] opacity-80">The Ultimate Experience</p>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-tight">
                Bespoke <br /><span className="italic">Tailoring</span>
              </h2>
              <p className="text-[#CCCCCC] text-base sm:text-lg leading-relaxed font-light max-w-md">
                Experience the pinnacle of sartorial excellence. Our master tailors work with you to create a garment that is uniquely yours, crafted from the world's finest fabrics.
              </p>
              <div className="pt-4">
                <Link 
                  to="/contact?subject=bespoke"
                  className="inline-block w-full sm:w-auto bg-gold text-white px-10 sm:px-12 md:px-14 py-4 sm:py-5 md:py-6 rounded-full text-[12px] sm:text-[13px] md:text-[14px] uppercase tracking-[0.2em] sm:tracking-[0.3em] font-medium hover:bg-gold-dark transition-all duration-500 shadow-xl text-center"
                >
                  Book Appointment
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* BRAND VALUES */}
      <section className="px-6 sm:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="space-y-6 text-center md:text-left">
            <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto md:mx-0">
              <span className="font-serif text-xl italic text-gold-dark">01</span>
            </div>
            <h3 className="font-serif text-2xl uppercase tracking-tight">Master Craftsmanship</h3>
            <p className="text-[#7A7A7A] text-sm leading-relaxed">Every piece is meticulously handcrafted by artisans with decades of experience in traditional Milanese tailoring.</p>
          </div>
          <div className="space-y-6 text-center md:text-left">
            <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto md:mx-0">
              <span className="font-serif text-xl italic text-gold-dark">02</span>
            </div>
            <h3 className="font-serif text-2xl uppercase tracking-tight">Noble Materials</h3>
            <p className="text-[#7A7A7A] text-sm leading-relaxed">We source only the rarest and finest materials, from Loro Piana cashmere to Vicuña and hand-selected leathers.</p>
          </div>
          <div className="space-y-6 text-center md:text-left">
            <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto md:mx-0">
              <span className="font-serif text-xl italic text-gold-dark">03</span>
            </div>
            <h3 className="font-serif text-2xl uppercase tracking-tight">Timeless Design</h3>
            <p className="text-[#7A7A7A] text-sm leading-relaxed">Our aesthetic transcends seasons, focusing on silhouettes that remain elegant and relevant for a lifetime.</p>
          </div>
        </div>
      </section>

      {/* BRAND STORY */}
      <section id="the-house" className="px-6 sm:px-16">
        <div className="flex flex-col lg:flex-row gap-24 items-center">
          <div className="lg:w-1/2 space-y-12">
            <div className="space-y-4">
              <p className="text-[11px] text-[#AAAAAA] uppercase tracking-[0.4em]">The House of Empire</p>
              <h2 className="font-serif text-5xl sm:text-6xl font-normal tracking-tight leading-tight">A Legacy of <br /><span className="italic">Excellence</span></h2>
            </div>
            <div className="space-y-8 text-[#7A7A7A] text-lg leading-relaxed font-light">
              <p>Empire Menswear was built on a simple idea: that what a man wears should speak before he does.</p>
              <p>Not driven by trends, but by intention, every piece is designed to deliver presence, precision, and quiet confidence. From structured outerwear to refined essentials, each garment is crafted to feel effortless while looking unmistakably sharp.</p>
              <p>At Empire, we don’t just create clothing—we shape identity through detail, discipline, and design.</p>
            </div>
          </div>
          <div className="lg:w-1/2 grid grid-cols-2 gap-6">
            <div className="space-y-6 pt-12">
              <img src={getOptimizedUrl("https://res.cloudinary.com/dcy26s9jm/image/upload/v1774439653/IMG_7724_1_ocyi76.webp", { width: IMAGE_SIZES.PRODUCT_CARD })} alt="Atelier Craftsmanship" loading="lazy" className="rounded-[30px] w-full aspect-[3/4] object-cover shadow-2xl" referrerPolicy="no-referrer" />
              <img src={getOptimizedUrl("https://res.cloudinary.com/dcy26s9jm/image/upload/v1774353818/precision_nqzrr3.webp", { width: IMAGE_SIZES.PRODUCT_CARD })} alt="Precision Tailoring" loading="lazy" className="rounded-[30px] w-full aspect-[3/4] object-cover shadow-xl" referrerPolicy="no-referrer" />
            </div>
            <div className="space-y-6">
              <img src={getOptimizedUrl("https://res.cloudinary.com/dcy26s9jm/image/upload/v1774353816/father_to_son_xtcsef.webp", { width: IMAGE_SIZES.PRODUCT_CARD })} alt="Legacy of Excellence" loading="lazy" className="rounded-[30px] w-full aspect-[3/4] object-cover shadow-xl" referrerPolicy="no-referrer" />
              <img src={getOptimizedUrl("https://res.cloudinary.com/dcy26s9jm/image/upload/v1774439769/8_1_fkl1wg.webp", { width: IMAGE_SIZES.PRODUCT_CARD })} alt="Master Artisan" loading="lazy" className="rounded-[30px] w-full aspect-[3/4] object-cover shadow-2xl" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </section>

      {/* ATELIER SECTION */}
      <section id="atelier" className="px-6 sm:px-16">
        <div className="bg-[#F9F9F9] rounded-[40px] overflow-hidden flex flex-col lg:flex-row">
          <div className="lg:w-[55%] p-8 sm:p-16 lg:p-24 space-y-12">
            <div className="space-y-4">
              <p className="text-[11px] text-[#AAAAAA] uppercase tracking-[0.4em]">Visit Us</p>
              <h2 className="font-serif text-4xl sm:text-5xl tracking-tight">The Kigali <br /><span className="italic">Flagship</span></h2>
            </div>
            
            <div className="space-y-8">
              <div className="space-y-2">
                <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#AAAAAA]">Address</h4>
                <p className="text-lg font-light leading-relaxed text-[#333333]">
                  EMPIRE MENS WEAR, 4th floor,<br />
                  La Bonne Adresse, KN 2 Roundabout,<br />
                  Kigali, Rwanda
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#AAAAAA]">Hours</h4>
                <div className="text-sm font-light space-y-1 text-[#7A7A7A]">
                  <p className="flex justify-between max-w-[200px]"><span>Mon — Sat</span> <span>09:00 — 20:00</span></p>
                  <p className="flex justify-between max-w-[200px]"><span>Sunday</span> <span>Closed</span></p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#AAAAAA]">Contact</h4>
                <p className="text-sm font-light text-[#7A7A7A]">+250 788 123 456</p>
                <p className="text-sm font-light text-[#7A7A7A]">kigali@empire-menswear.luxury</p>
              </div>
            </div>

            <div className="pt-8">
              <Link 
                to="/contact?subject=appointment"
                className="inline-block bg-black text-white px-12 py-5 rounded-full text-[13px] uppercase tracking-[0.2em] font-medium hover:bg-gold transition-all duration-500 shadow-xl"
              >
                Book An Appointment
              </Link>
            </div>
          </div>
          
          <div className="lg:w-[45%] p-6 sm:p-12 lg:p-16 bg-[#F0F0F0]">
            <div className="w-full h-full min-h-[400px] lg:min-h-[500px] rounded-[32px] overflow-hidden shadow-2xl relative group">
              <iframe 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                style={{ border: 0 }} 
                src="https://maps.google.com/maps?q=EMPIRE+MENS+WEAR,+La+Bonne+Adresse,+KN+2+Roundabout,+Kigali&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                allowFullScreen
                className="absolute inset-0 grayscale hover:grayscale-0 transition-all duration-700"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
