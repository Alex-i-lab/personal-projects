import React from 'react';
import { motion, AnimatePresence } from "motion/react";
import { Search, User, ShoppingBag, Menu, X, Trash2, Plus, Minus, CheckCircle2, Star, Mail, Eye, ChevronLeft, ChevronRight, Instagram, Linkedin, Twitter, Globe, ArrowRight, Heart } from "lucide-react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { SIZES } from '../constants';
import SearchOverlay from './SearchOverlay';
import Chatbot from './Chatbot';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    cart, addToCart, updateQuantity, removeFromCart, cartTotal, cartCount,
    isCartOpen, setIsCartOpen, isCheckoutOpen, setIsCheckoutOpen,
    checkoutStep, setCheckoutStep, selectedProductForReviews, setSelectedProductForReviews,
    quickViewProduct, setQuickViewProduct,
    isMenuOpen, setIsMenuOpen,
    isSearchOpen, setIsSearchOpen,
    clearCart,
    currency, setCurrency, formatPrice,
    allCurrencies, isLoadingRates,
    placeOrder,
    wishlist, toggleWishlist, isInWishlist,
    reviews, isLoadingReviews, addReview
  } = useAppContext();

  const navigate = useNavigate();

  const [isCurrencyOpen, setIsCurrencyOpen] = React.useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = React.useState(false);
  const [currencySearch, setCurrencySearch] = React.useState("");

  const filteredCurrencies = React.useMemo(() => {
    if (!currencySearch) return allCurrencies.slice(0, 50);
    return allCurrencies.filter(c => 
      c.code.toLowerCase().includes(currencySearch.toLowerCase()) || 
      c.label.toLowerCase().includes(currencySearch.toLowerCase())
    ).slice(0, 50);
  }, [allCurrencies, currencySearch]);

  const location = useLocation();

  const [[page, direction], setPage] = React.useState([0, 0]);
  const currentImageIndex = quickViewProduct?.images ? Math.abs(page % quickViewProduct.images.length) : 0;

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const [selectedSize, setSelectedSize] = React.useState<string | null>(null);
  const [isPlacingOrder, setIsPlacingOrder] = React.useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = React.useState(false);
  const [newReview, setNewReview] = React.useState({ rating: 0, comment: '' });
  const [shippingAddress, setShippingAddress] = React.useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: ''
  });

  React.useEffect(() => {
    // Shipping address logic removed or simplified
  }, []);

  const handlePlaceOrder = async () => {
    if (!shippingAddress.fullName || !shippingAddress.email || !shippingAddress.address) {
      alert("Please fill in all required shipping details.");
      return;
    }

    setIsPlacingOrder(true);
    try {
      await placeOrder(shippingAddress);
      setCheckoutStep(2);
    } catch (error) {
      console.error("Error placing order:", error);
    } finally {
      setIsPlacingOrder(false);
    }
  };

  React.useEffect(() => {
    if (quickViewProduct) {
      setPage([0, 0]);
      setSelectedSize(SIZES[quickViewProduct.category]?.[0] || null);
    }
  }, [quickViewProduct]);

  const nextImage = () => {
    if (quickViewProduct?.images) {
      paginate(1);
    }
  };

  const prevImage = () => {
    if (quickViewProduct?.images) {
      paginate(-1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#111111] text-white py-2 text-[10px] sm:text-xs tracking-widest uppercase relative z-[60]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-16 flex justify-between items-center">
          <div className="flex-1 text-center hidden sm:block">
            Complimentary Global Shipping & Returns | <Link to="/contact?subject=bespoke" className="text-gold hover:text-gold-light transition-colors">Bespoke Appointments Available</Link>
          </div>
          <div className="flex-1 text-center sm:hidden">
            Global Shipping | <Link to="/contact?subject=bespoke" className="text-gold">Bespoke</Link>
          </div>
        </div>
      </div>

      {/* MAIN NAVIGATION */}
      <nav className="sticky top-0 z-50 flex justify-between items-center px-6 sm:px-16 py-6 bg-[#FAFAFA]/80 backdrop-blur-md border-b border-black/5">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="lg:hidden p-1 hover:bg-black/5 rounded-full transition-colors"
          >
            <Menu size={20} />
          </button>
          <Link to="/" className="flex items-center">
            <img 
              src="https://res.cloudinary.com/dcy26s9jm/image/upload/v1774279193/logo2_jqdner.png" 
              alt="EMPIRE" 
              className="h-8 sm:h-10 w-auto"
              referrerPolicy="no-referrer"
            />
          </Link>
        </div>
        
        <div className="hidden lg:flex gap-10 text-[11px] sm:text-[13px] uppercase tracking-wider">
          <Link to="/shop" className="hover:opacity-60 transition-opacity">Collections</Link>
          <Link to="/#bespoke" className="hover:opacity-60 transition-opacity">Bespoke</Link>
          <Link to="/#the-house" className="hover:opacity-60 transition-opacity">About</Link>
          <Link to="/contact" className="hover:opacity-60 transition-opacity">Contact</Link>
        </div>

        <div className="flex gap-4 sm:gap-6 text-[11px] sm:text-[13px] uppercase tracking-wider items-center">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="hover:opacity-60 transition-opacity flex items-center gap-1"
          >
            <Search size={14} /> <span className="hidden sm:inline">Search</span>
          </button>

          <button 
            onClick={() => setIsWishlistOpen(true)}
            className="hover:opacity-60 transition-opacity flex items-center gap-1 relative"
          >
            <Heart size={14} className={wishlist.length > 0 ? "fill-gold text-gold" : ""} />
            <span className="hidden sm:inline">Wishlist</span>
            {wishlist.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-gold text-white text-[7px] flex items-center justify-center rounded-full font-bold">
                {wishlist.length}
              </span>
            )}
          </button>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="hover:opacity-60 transition-opacity flex items-center gap-1 relative"
          >
            <ShoppingBag size={14} /> <span className="hidden xs:inline">Cart</span> ({cartCount})
          </button>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[80%] max-w-sm bg-white z-[70] lg:hidden flex flex-col p-8"
            >
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center">
                  <img 
                    src="https://res.cloudinary.com/dcy26s9jm/image/upload/v1774279193/logo2_jqdner.png" 
                    alt="EMPIRE" 
                    className="h-8 w-auto"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-black/5 rounded-full">
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-col gap-8 text-lg uppercase tracking-widest font-light">
                {[
                  { name: "Collections", href: "/shop" },
                  { name: "Bespoke", href: "/#bespoke" },
                  { name: "About", href: "/#the-house" },
                  { name: "Contact", href: "/contact" }
                ].map((item) => (
                  <Link 
                    key={item.name} 
                    to={item.href} 
                    onClick={() => setIsMenuOpen(false)}
                    className="hover:pl-4 transition-all duration-300 border-b border-black/5 pb-4"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="mt-auto pt-8 border-t border-black/5 space-y-6">
                <button 
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsSearchOpen(true);
                  }}
                  className="flex items-center gap-3 text-sm uppercase tracking-wider"
                >
                  <Search size={18} /> Search
                </button>
                <button 
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsWishlistOpen(true);
                  }}
                  className="flex items-center gap-3 text-sm uppercase tracking-wider"
                >
                  <Heart size={18} className={wishlist.length > 0 ? "fill-gold text-gold" : ""} /> Wishlist ({wishlist.length})
                </button>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="flex-1">
        {children}
      </main>

      <SearchOverlay />

      {/* QUICK VIEW MODAL */}
      <AnimatePresence>
        {quickViewProduct && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setQuickViewProduct(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[150]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="fixed inset-0 m-auto w-[95%] max-w-4xl h-fit max-h-[90vh] bg-white z-[160] rounded-[32px] overflow-hidden flex flex-col md:flex-row shadow-2xl"
            >
              <button 
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-6 right-6 p-2 bg-white/80 backdrop-blur-md rounded-full z-10 hover:bg-black hover:text-white transition-all shadow-sm"
              >
                <X size={20} />
              </button>

              <div className="w-full md:w-1/2 aspect-[4/5] md:aspect-auto bg-[#F5F5F5] relative group/slider">
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
                      src={quickViewProduct.images ? quickViewProduct.images[currentImageIndex] : quickViewProduct.img} 
                      alt={quickViewProduct.title} 
                      className="w-full h-full object-cover pointer-events-none"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                </AnimatePresence>

                {quickViewProduct.images && quickViewProduct.images.length > 1 && (
                  <>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        prevImage();
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-md rounded-full hover:bg-black hover:text-white transition-all opacity-0 group-hover/slider:opacity-100 shadow-sm"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImage();
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-md rounded-full hover:bg-black hover:text-white transition-all opacity-0 group-hover/slider:opacity-100 shadow-sm"
                    >
                      <ChevronRight size={20} />
                    </button>

                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                      {quickViewProduct.images.map((_: any, idx: number) => (
                        <button
                          key={idx}
                          onClick={() => {
                            const newDirection = idx > currentImageIndex ? 1 : -1;
                            setPage([idx, newDirection]);
                          }}
                          className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentImageIndex ? 'bg-black w-4' : 'bg-black/20'}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center space-y-8 overflow-y-auto">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[11px] text-[#AAAAAA] uppercase tracking-[0.4em] mb-2">{quickViewProduct.category}</p>
                      <h3 className="font-serif text-3xl sm:text-4xl uppercase tracking-tight leading-tight">{quickViewProduct.title}</h3>
                    </div>
                    <span className="text-2xl font-medium">{quickViewProduct.price}</span>
                  </div>
                  
                  <div 
                    className="flex items-center gap-2 cursor-pointer hover:opacity-60 transition-opacity"
                    onClick={() => {
                      setSelectedProductForReviews(quickViewProduct);
                      setQuickViewProduct(null);
                    }}
                  >
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star 
                key={star} 
                size={12} 
                fill={star <= Math.floor(quickViewProduct.rating) ? "var(--color-gold)" : "transparent"} 
                strokeWidth={1}
                className={star <= Math.floor(quickViewProduct.rating) ? "text-gold" : "text-[#AAAAAA]"}
              />
            ))}
          </div>
                    <span className="text-xs text-[#AAAAAA] uppercase tracking-widest">({quickViewProduct.reviewCount} Reviews)</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#AAAAAA]">Description</h4>
                  <p className="text-[#7A7A7A] text-base leading-relaxed font-light">
                    {quickViewProduct.desc}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#AAAAAA]">Material</h4>
                    <p className="text-sm font-medium">{quickViewProduct.material}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#AAAAAA]">Origin</h4>
                    <p className="text-sm font-medium">Milan, Italy</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#AAAAAA]">Select Size</h4>
                  <div className="flex flex-wrap gap-3">
                    {SIZES[quickViewProduct.category]?.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-12 h-12 rounded-full border text-xs font-medium transition-all flex items-center justify-center ${selectedSize === size ? 'bg-black text-white border-black' : 'border-black/10 hover:border-black'}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-8 flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => {
                      if (selectedSize) {
                        addToCart(quickViewProduct, selectedSize);
                        setQuickViewProduct(null);
                      }
                    }}
                    className="flex-1 bg-gold text-white py-5 rounded-full text-[13px] uppercase tracking-[0.2em] font-bold hover:bg-gold-dark transition-all shadow-xl"
                  >
                    Add to Cart
                  </button>
                  <button 
                    onClick={() => setQuickViewProduct(null)}
                    className="sm:w-16 h-16 rounded-full border border-black/10 flex items-center justify-center hover:border-black transition-colors"
                  >
                    <ShoppingBag size={20} />
                  </button>
                </div>
                <div className="flex justify-center">
                  <Link 
                    to={`/product/${quickViewProduct.id}`}
                    onClick={() => setQuickViewProduct(null)}
                    className="text-[11px] uppercase tracking-[0.3em] font-bold border-b border-black/10 pb-1 hover:border-black transition-all"
                  >
                    View Full Details
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* WISHLIST DRAWER */}
      <AnimatePresence>
        {isWishlistOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsWishlistOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[250]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white shadow-2xl z-[260] flex flex-col"
            >
              <div className="p-8 border-b border-black/5 flex justify-between items-center bg-[#FAFAFA]">
                <div className="space-y-1">
                  <h3 className="text-[11px] uppercase tracking-[0.4em] font-bold text-[#AAAAAA]">Your Favorites</h3>
                  <p className="font-serif text-2xl uppercase tracking-tight">Wishlist <span className="text-sm font-sans text-black/40 ml-2">({wishlist.length})</span></p>
                </div>
                <button onClick={() => setIsWishlistOpen(false)} className="p-2 hover:bg-black/5 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-6">
                {wishlist.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center space-y-6 text-center">
                    <div className="w-20 h-20 bg-[#F5F5F5] rounded-full flex items-center justify-center text-[#AAAAAA]">
                      <Heart size={32} strokeWidth={1} />
                    </div>
                    <div className="space-y-2">
                      <p className="font-serif text-xl italic">Your wishlist is empty.</p>
                      <p className="text-sm text-[#7A7A7A] max-w-[200px] mx-auto">Save your favorite pieces to view them later.</p>
                    </div>
                    <button 
                      onClick={() => {
                        setIsWishlistOpen(false);
                        navigate('/shop');
                      }}
                      className="text-[11px] uppercase tracking-[0.2em] font-bold border-b border-black pb-1 hover:text-gold hover:border-gold transition-all"
                    >
                      Explore Collection
                    </button>
                  </div>
                ) : (
                  wishlist.map((item) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      key={item.id} 
                      className="flex gap-6 group"
                    >
                      <div className="w-24 h-32 bg-[#F5F5F5] rounded-xl overflow-hidden flex-shrink-0 relative">
                        <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                        <button 
                          onClick={() => toggleWishlist(item)}
                          className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-md rounded-full text-red-500 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={12} />
                        </button>
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div className="space-y-1">
                          <p className="text-[9px] text-[#AAAAAA] uppercase tracking-widest">{item.category}</p>
                          <h4 className="font-serif text-lg leading-tight group-hover:text-gold transition-colors cursor-pointer" onClick={() => {
                            navigate(`/product/${item.id}`);
                            setIsWishlistOpen(false);
                          }}>{item.title}</h4>
                          <p className="text-sm font-medium">{item.price}</p>
                        </div>
                        <button 
                          onClick={() => {
                            setQuickViewProduct(item);
                            setIsWishlistOpen(false);
                          }}
                          className="w-full py-2.5 bg-black text-white text-[10px] uppercase tracking-[0.2em] font-bold rounded-lg hover:bg-gold transition-all shadow-md"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* CART DRAWER */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-[90%] max-w-md bg-white z-[110] flex flex-col shadow-2xl"
            >
              <div className="p-8 border-b border-black/5 flex justify-between items-center">
                <div>
                  <h3 className="font-serif text-2xl uppercase tracking-tight">Your Cart</h3>
                  <p className="text-[11px] text-[#AAAAAA] uppercase tracking-widest mt-1">{cartCount} Items</p>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-black/5 rounded-full">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <ShoppingBag size={48} strokeWidth={1} className="text-[#EAEAEA]" />
                    <p className="font-serif text-xl italic text-[#7A7A7A]">Your cart is empty.</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="text-[13px] uppercase tracking-widest border-b border-black pb-1 hover:opacity-60 transition-opacity"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={`${item.title}-${item.size}`} className="flex gap-6 group">
                      <div className="w-24 h-32 bg-[#F5F5F5] rounded-lg overflow-hidden flex-shrink-0">
                        <img src={item.img} alt={item.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="font-serif text-lg leading-tight">{item.title}</h4>
                            <button 
                              onClick={() => removeFromCart(item.title, item.size)}
                              className="text-[#AAAAAA] hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <p className="text-[10px] text-[#AAAAAA] uppercase tracking-widest">{item.material}</p>
                            <span className="w-1 h-1 bg-[#AAAAAA] rounded-full" />
                            <p className="text-[10px] text-black font-bold uppercase tracking-widest">Size: {item.size}</p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center border border-black/10 rounded-full px-3 py-1 gap-4">
                            <button onClick={() => updateQuantity(item.title, item.size, -1)} className="hover:opacity-60 transition-opacity">
                              <Minus size={12} />
                            </button>
                            <span className="text-xs font-medium w-4 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.title, item.size, 1)} className="hover:opacity-60 transition-opacity">
                              <Plus size={12} />
                            </button>
                          </div>
                          <span className="font-medium">{formatPrice(item.price)}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-8 bg-[#F9F9F9] border-t border-black/5 space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#7A7A7A]">Subtotal</span>
                      <span>{formatPrice(cartTotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#7A7A7A]">Shipping</span>
                      <span className="text-emerald-600 uppercase text-[10px] font-bold tracking-widest">Complimentary</span>
                    </div>
                    <div className="flex justify-between text-lg font-medium pt-4 border-t border-black/5">
                      <span>Total</span>
                      <span>{formatPrice(cartTotal)}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsCheckoutOpen(true);
                      setCheckoutStep(1);
                    }}
                    className="w-full bg-gold text-white py-5 sm:py-6 rounded-full text-[13px] sm:text-[14px] md:text-[15px] uppercase tracking-[0.2em] font-medium hover:bg-gold-dark transition-all shadow-xl"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* CHECKOUT MODAL */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[120]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="fixed inset-0 m-auto w-[95%] max-w-2xl h-fit max-h-[90vh] bg-white z-[130] rounded-[32px] overflow-hidden flex flex-col shadow-2xl"
            >
              <div className="p-8 sm:p-12 border-b border-black/5 flex justify-between items-center">
                <h3 className="font-serif text-3xl uppercase tracking-tight">Checkout</h3>
                <button onClick={() => setIsCheckoutOpen(false)} className="p-2 hover:bg-black/5 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 sm:p-12">
                {checkoutStep === 1 ? (
                  <div className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="space-y-6">
                        <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#AAAAAA]">Shipping Information</h4>
                        <div className="space-y-4">
                          <input 
                            type="text" 
                            placeholder="Full Name" 
                            value={shippingAddress.fullName}
                            onChange={(e) => setShippingAddress({...shippingAddress, fullName: e.target.value})}
                            className="w-full border-b border-black/10 py-3 focus:outline-none focus:border-black transition-colors text-sm" 
                          />
                          <input 
                            type="email" 
                            placeholder="Email Address" 
                            value={shippingAddress.email}
                            onChange={(e) => setShippingAddress({...shippingAddress, email: e.target.value})}
                            className="w-full border-b border-black/10 py-3 focus:outline-none focus:border-black transition-colors text-sm" 
                          />
                          <input 
                            type="text" 
                            placeholder="Shipping Address" 
                            value={shippingAddress.address}
                            onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})}
                            className="w-full border-b border-black/10 py-3 focus:outline-none focus:border-black transition-colors text-sm" 
                          />
                          <div className="grid grid-cols-2 gap-4">
                            <input 
                              type="text" 
                              placeholder="City" 
                              value={shippingAddress.city}
                              onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                              className="w-full border-b border-black/10 py-3 focus:outline-none focus:border-black transition-colors text-sm" 
                            />
                            <input 
                              type="text" 
                              placeholder="Postal Code" 
                              value={shippingAddress.postalCode}
                              onChange={(e) => setShippingAddress({...shippingAddress, postalCode: e.target.value})}
                              className="w-full border-b border-black/10 py-3 focus:outline-none focus:border-black transition-colors text-sm" 
                            />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#AAAAAA]">Payment Method</h4>
                        <div className="space-y-4">
                          <div className="p-4 border border-black rounded-xl flex justify-between items-center cursor-pointer">
                            <span className="text-sm font-medium">Credit / Debit Card</span>
                            <div className="flex gap-1">
                              <div className="w-6 h-4 bg-blue-600 rounded-sm" />
                              <div className="w-6 h-4 bg-red-500 rounded-sm" />
                            </div>
                          </div>
                          <input type="text" placeholder="Card Number" className="w-full border-b border-black/10 py-3 focus:outline-none focus:border-black transition-colors text-sm" />
                          <div className="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="MM/YY" className="w-full border-b border-black/10 py-3 focus:outline-none focus:border-black transition-colors text-sm" />
                            <input type="text" placeholder="CVC" className="w-full border-b border-black/10 py-3 focus:outline-none focus:border-black transition-colors text-sm" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#F9F9F9] p-8 rounded-2xl space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-[#7A7A7A]">Order Summary</span>
                        <span>{cartCount} Items</span>
                      </div>
                      <div className="flex justify-between text-xl font-medium pt-4 border-t border-black/10">
                        <span>Total Amount</span>
                        <span>{formatPrice(cartTotal)}</span>
                      </div>
                    </div>

                    <button 
                      onClick={handlePlaceOrder}
                      disabled={isPlacingOrder}
                      className="w-full bg-gold text-white py-5 sm:py-6 rounded-full text-[13px] sm:text-[14px] md:text-[15px] uppercase tracking-[0.2em] font-medium hover:bg-gold-dark transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                      {isPlacingOrder ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Processing...
                        </>
                      ) : (
                        'Complete Purchase'
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="py-12 text-center space-y-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 12, stiffness: 200 }}
                      className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto"
                    >
                      <CheckCircle2 size={48} />
                    </motion.div>
                    <div className="space-y-4">
                      <h4 className="font-serif text-4xl uppercase tracking-tight">Order Confirmed</h4>
                      <p className="text-[#7A7A7A] max-w-sm mx-auto leading-relaxed">
                        Thank you for your purchase. Your order has been received and is being prepared by our master tailors.
                      </p>
                    </div>
                    <div className="pt-8">
                      <button 
                        onClick={() => {
                          setIsCheckoutOpen(false);
                          clearCart();
                        }}
                        className="bg-gold text-white px-12 py-4 rounded-full text-[13px] uppercase tracking-[0.2em] font-medium hover:bg-gold-dark transition-all"
                      >
                        Return to Shop
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* REVIEW MODAL */}
      <AnimatePresence>
        {selectedProductForReviews && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProductForReviews(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl md:max-h-[85vh] bg-white z-[110] rounded-[40px] shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-6 sm:p-10 border-b border-black/5 flex justify-between items-center bg-white sticky top-0 z-10">
                <div className="space-y-1">
                  <h3 className="font-serif text-2xl sm:text-3xl tracking-tight">Product Reviews</h3>
                  <p className="text-[11px] text-[#AAAAAA] uppercase tracking-widest">{selectedProductForReviews.title}</p>
                </div>
                <button 
                  onClick={() => setSelectedProductForReviews(null)}
                  className="p-3 hover:bg-black/5 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-12 scrollbar-hide">
                {/* SUMMARY & ADD REVIEW */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <div className="flex items-center gap-8">
                      <div className="text-center">
                        <div className="text-6xl font-serif text-gold mb-2">{selectedProductForReviews.rating}</div>
                        <div className="flex gap-1 justify-center mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              size={14} 
                              fill={star <= Math.floor(selectedProductForReviews.rating) ? "var(--color-gold)" : "transparent"} 
                              strokeWidth={1}
                              className={star <= Math.floor(selectedProductForReviews.rating) ? "text-gold" : "text-[#AAAAAA]"}
                            />
                          ))}
                        </div>
                        <p className="text-[10px] text-[#AAAAAA] uppercase tracking-widest">Based on {reviews.length} reviews</p>
                      </div>
                      <div className="flex-1 space-y-3">
                        {[5, 4, 3, 2, 1].map((rating) => {
                          const count = reviews.filter(r => Math.floor(r.rating) === rating).length;
                          const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                          return (
                            <div key={rating} className="flex items-center gap-4">
                              <span className="text-[10px] font-bold w-4">{rating}</span>
                              <div className="flex-1 h-1 bg-[#F5F5F5] rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${percentage}%` }}
                                  className="h-full bg-gold"
                                />
                              </div>
                              <span className="text-[10px] text-[#AAAAAA] w-8 text-right">{count}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="bg-[#F9F9F9] p-8 rounded-3xl space-y-6">
                      <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold">Write a Review</h4>
                      <div className="space-y-6">
                        <div className="flex gap-3">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button 
                              key={star}
                              onClick={() => setNewReview({ ...newReview, rating: star })}
                              className="transition-transform hover:scale-125"
                            >
                              <Star 
                                size={24} 
                                fill={star <= newReview.rating ? "var(--color-gold)" : "transparent"} 
                                strokeWidth={1}
                                className={star <= newReview.rating ? "text-gold" : "text-[#AAAAAA]"}
                              />
                            </button>
                          ))}
                        </div>
                        <textarea 
                          placeholder="Share your experience with this piece..."
                          value={newReview.comment}
                          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                          className="w-full bg-white border border-black/5 rounded-2xl p-6 text-sm focus:outline-none focus:border-gold transition-all min-h-[120px] resize-none"
                        />
                        <button 
                          onClick={async () => {
                            if (newReview.rating === 0 || !newReview.comment.trim()) return;
                            setIsSubmittingReview(true);
                            try {
                              await addReview(newReview.rating, newReview.comment);
                              setNewReview({ rating: 0, comment: '' });
                            } catch (e) {
                              console.error(e);
                            } finally {
                              setIsSubmittingReview(false);
                            }
                          }}
                          disabled={isSubmittingReview || newReview.rating === 0 || !newReview.comment.trim()}
                          className="w-full bg-black text-white py-4 rounded-full text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-gold transition-all disabled:opacity-50"
                        >
                          {isSubmittingReview ? "Submitting..." : "Post Review"}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* REVIEWS LIST */}
                  <div className="space-y-10">
                    <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold">Recent Feedback</h4>
                    {isLoadingReviews ? (
                      <div className="py-12 flex justify-center">
                        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
                      </div>
                    ) : reviews.length === 0 ? (
                      <div className="py-12 text-center space-y-4">
                        <p className="text-[#7A7A7A] font-light italic">No reviews yet. Be the first to share your thoughts.</p>
                      </div>
                    ) : (
                      <div className="space-y-10">
                        {reviews.map((review, i) => (
                          <motion.div 
                            key={review.id || i}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="space-y-4"
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex items-center gap-4">
                                <img 
                                  src={review.userPhoto || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.userName)}`} 
                                  alt={review.userName} 
                                  className="w-10 h-10 rounded-full object-cover border border-black/5"
                                  referrerPolicy="no-referrer"
                                />
                                <div>
                                  <h5 className="text-sm font-bold">{review.userName}</h5>
                                  <div className="flex gap-0.5">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <Star 
                                        key={star} 
                                        size={10} 
                                        fill={star <= review.rating ? "var(--color-gold)" : "transparent"} 
                                        strokeWidth={1}
                                        className={star <= review.rating ? "text-gold" : "text-[#AAAAAA]"}
                                      />
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <span className="text-[10px] text-[#AAAAAA] uppercase tracking-widest">
                                {review.createdAt?.toDate ? review.createdAt.toDate().toLocaleDateString() : 'Just now'}
                              </span>
                            </div>
                            <p className="text-sm text-[#7A7A7A] leading-relaxed font-light italic">
                              "{review.comment}"
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="bg-[#111111] text-white pt-12 sm:pt-24 pb-8 sm:pb-12 px-6 sm:px-16 mt-auto">
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-24">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-10 sm:gap-16">
            <div className="col-span-2 lg:col-span-1 space-y-4 sm:space-y-8">
              <Link to="/" className="flex items-center">
                <img 
                  src="https://res.cloudinary.com/dcy26s9jm/image/upload/v1774281143/s9lnnogn4tlunatgxiet_zf3ave.webp" 
                  alt="EMPIRE" 
                  className="h-14 w-auto"
                  referrerPolicy="no-referrer"
                />
              </Link>
              <p className="text-[#7A7A7A] text-sm leading-relaxed max-w-xs font-light">
                The pinnacle of luxury menswear. Handcrafted in Milan, designed for the modern connoisseur.
              </p>
              <div className="flex gap-6">
                <a href="#" className="text-[#7A7A7A] hover:text-white transition-colors"><Instagram size={20} strokeWidth={1.5} /></a>
                <a href="#" className="text-[#7A7A7A] hover:text-white transition-colors"><Twitter size={20} strokeWidth={1.5} /></a>
                <a href="#" className="text-[#7A7A7A] hover:text-white transition-colors"><Linkedin size={20} strokeWidth={1.5} /></a>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-8">
              <h4 className="text-[11px] uppercase tracking-[0.3em] font-bold">Collections</h4>
              <ul className="space-y-2 sm:space-y-4 text-sm text-[#7A7A7A] font-light">
                <li><Link to="/shop" className="hover:text-white transition-colors">All Pieces</Link></li>
                <li><Link to="/shop" className="hover:text-white transition-colors">Formal Wear</Link></li>
                <li><Link to="/shop" className="hover:text-white transition-colors">Casual Wear</Link></li>
                <li><Link to="/shop" className="hover:text-white transition-colors">Accessories</Link></li>
              </ul>
            </div>

            <div className="space-y-4 sm:space-y-8">
              <h4 className="text-[11px] uppercase tracking-[0.3em] font-bold">The House</h4>
              <ul className="space-y-2 sm:space-y-4 text-sm text-[#7A7A7A] font-light">
                <li><a href="/#the-house" className="hover:text-white transition-colors">Our Story</a></li>
                <li><a href="/#bespoke" className="hover:text-white transition-colors">Bespoke Service</a></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Ateliers</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              </ul>
            </div>

            <div className="space-y-4 sm:space-y-8">
              <h4 className="text-[11px] uppercase tracking-[0.3em] font-bold">Support</h4>
              <ul className="space-y-2 sm:space-y-4 text-sm text-[#7A7A7A] font-light">
                <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Size Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>

            <div className="col-span-2 lg:col-span-1 space-y-4 sm:space-y-8">
              <h4 className="text-[11px] uppercase tracking-[0.3em] font-bold">Newsletter</h4>
              <p className="text-[#7A7A7A] text-sm font-light">Subscribe for exclusive updates and sartorial inspiration.</p>
              <form className="relative group">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full bg-transparent border-b border-white/20 py-3 text-sm focus:outline-none focus:border-gold transition-colors placeholder:text-[#444444]"
                />
                <button className="absolute right-0 top-1/2 -translate-y-1/2 text-gold hover:text-gold-light transition-colors">
                  <ArrowRight size={18} />
                </button>
              </form>
            </div>
          </div>

          <div className="pt-12 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-6">
            <p className="text-[10px] text-[#7A7A7A] uppercase tracking-widest">© 2026 Empire Menswear. All Rights Reserved.</p>
            <div className="flex gap-8 text-[10px] text-[#7A7A7A] uppercase tracking-widest">
              <a href="#" className="hover:text-white transition-colors">Kigali</a>
            </div>
          </div>
        </div>
      </footer>

      {/* FLOATING CURRENCY SELECTOR */}
      <div className="fixed bottom-8 left-8 z-[100]">
        <div className="relative">
          <AnimatePresence>
            {isCurrencyOpen && (
              <>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsCurrencyOpen(false)}
                  className="fixed inset-0 bg-black/20 backdrop-blur-[2px]"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20, x: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20, x: -20 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="absolute bottom-16 left-0 w-72 bg-white text-black shadow-2xl rounded-[24px] overflow-hidden border border-black/5"
                >
                  <div className="p-4 border-b border-black/5 bg-[#F9F9F9]">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#AAAAAA]">Select Currency</span>
                      <button onClick={() => setIsCurrencyOpen(false)} className="text-[#AAAAAA] hover:text-black">
                        <X size={14} />
                      </button>
                    </div>
                    <div className="relative">
                      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#AAAAAA]" />
                      <input 
                        type="text"
                        placeholder="Search global currencies..."
                        value={currencySearch}
                        onChange={(e) => setCurrencySearch(e.target.value)}
                        className="w-full bg-white border border-black/5 rounded-xl py-2.5 pl-10 pr-4 text-xs focus:ring-1 focus:ring-gold outline-none shadow-sm"
                        autoFocus
                      />
                    </div>
                  </div>
                  <div className="max-h-80 overflow-y-auto p-2 space-y-1 scrollbar-thin">
                    {isLoadingRates ? (
                      <div className="p-8 text-center text-[10px] text-[#AAAAAA] animate-pulse uppercase tracking-widest">Updating rates...</div>
                    ) : filteredCurrencies.length > 0 ? (
                      filteredCurrencies.map((curr) => (
                        <button
                          key={curr.code}
                          onClick={() => {
                            setCurrency(curr);
                            setIsCurrencyOpen(false);
                            setCurrencySearch("");
                          }}
                          className={`w-full text-left px-4 py-3 text-[11px] uppercase tracking-widest hover:bg-[#F5F5F5] transition-all flex justify-between items-center rounded-xl ${currency.code === curr.code ? 'bg-black text-white font-bold' : 'text-[#333333]'}`}
                        >
                          <div className="flex flex-col items-start">
                            <span className="truncate max-w-[140px]">{curr.label}</span>
                            <span className={`text-[9px] opacity-60 ${currency.code === curr.code ? 'text-gold' : ''}`}>{curr.code}</span>
                          </div>
                          <span className={`text-sm font-serif ${currency.code === curr.code ? 'text-gold' : 'text-[#AAAAAA]'}`}>{curr.symbol}</span>
                        </button>
                      ))
                    ) : (
                      <div className="p-8 text-center text-[10px] text-[#AAAAAA] uppercase tracking-widest">No results found</div>
                    )}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
            className="flex items-center gap-3 bg-white/90 backdrop-blur-md border border-black/5 text-black px-5 py-4 rounded-full shadow-2xl hover:bg-black hover:text-white transition-all duration-500 group"
          >
            <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
              <Globe size={16} className="text-gold" />
            </div>
            <div className="flex flex-col items-start leading-none">
              <span className="text-[9px] uppercase tracking-widest opacity-60 mb-1">Currency</span>
              <span className="text-xs font-bold tracking-widest">{currency.code}</span>
            </div>
          </motion.button>
        </div>
      </div>

      {/* GEMINI CHATBOT */}
      <Chatbot />
    </div>
  );
};
