import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Flame, 
  ShoppingBag, 
  Phone, 
  MessageCircle, 
  MapPin, 
  Clock, 
  Search, 
  Truck, 
  RotateCcw, 
  Menu as MenuIcon, 
  X,
  Sun,
  Moon
} from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenTracker: () => void;
  onOpenSearch: () => void;
  onOpenPastOrders: () => void;
  activeOrdersCount: number;
  pastOrdersCount: number;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Navbar = ({
  cartCount,
  onOpenCart,
  onOpenTracker,
  onOpenSearch,
  onOpenPastOrders,
  activeOrdersCount,
  pastOrdersCount,
  theme,
  onToggleTheme,
}: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs">
      {/* Top Hotline & Announcement Bar */}
      <div className="bg-stone-900 text-stone-300 text-xs py-1.5 px-4 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-amber-400 font-medium">
              <Clock className="w-3.5 h-3.5" />
              <span>Open: 12:00 PM - 03:00 AM (Daily)</span>
            </div>
            <div className="hidden md:flex items-center gap-1.5 text-stone-300">
              <MapPin className="w-3.5 h-3.5 text-red-500" />
              <span>Shop # 3, Malik Usman Plaza, Main PWD Road, Islamabad</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Top Bar Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-200 text-[11px] font-bold transition cursor-pointer border border-stone-700"
              title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-amber-300" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>
            <span className="text-stone-700">|</span>
            <a 
              href="tel:03021959609" 
              className="flex items-center gap-1 hover:text-white font-medium transition"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              <span>0302-1959609</span>
            </a>
            <span className="text-stone-700">|</span>
            <a 
              href="https://wa.me/923021959609" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium transition"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" />
              <span className="hidden sm:inline">WhatsApp Order</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Identity */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-11 h-11 sm:w-13 sm:h-13 bg-gradient-to-br from-red-600 to-stone-900 rounded-xl border border-amber-400/50 shadow-md flex flex-col items-center justify-center p-1">
              <Flame className="w-4 h-4 text-amber-300 fill-amber-400 -mb-0.5" />
              <span className="font-heading text-lg sm:text-xl font-black tracking-wider text-white leading-tight">RCB</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading text-2xl sm:text-3xl font-black tracking-tight text-stone-900 dark:text-white">
                  RCB FOODS
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-red-100 text-red-700 tracking-wider">
                  Islamabad
                </span>
              </div>
              <p className="text-[11px] font-medium text-stone-500 dark:text-stone-400 -mt-1 hidden sm:block">
                Karachi Ultimate Food Stop!
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-stone-700 dark:text-stone-300">
            <button 
              onClick={() => scrollToSection('deals-section')} 
              className="hover:text-red-600 transition flex items-center gap-1 cursor-pointer"
            >
              <span className="text-red-600">★</span> Famous Deals
            </button>
            <button 
              onClick={() => scrollToSection('menu-section')} 
              className="hover:text-red-600 transition cursor-pointer"
            >
              Full Menu
            </button>
            <button 
              onClick={() => scrollToSection('reviews-section')} 
              className="hover:text-red-600 transition cursor-pointer"
            >
              Customer Reviews
            </button>
            <button 
              onClick={() => scrollToSection('location-section')} 
              className="hover:text-red-600 transition cursor-pointer"
            >
              Location & Map
            </button>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2.5 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 transition cursor-pointer"
              title="Search Menu"
              aria-label="Search Menu"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Desktop Theme Switcher Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onToggleTheme}
              className="p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-200 transition cursor-pointer flex items-center justify-center"
              title={`Toggle ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-stone-700" />
              )}
            </motion.button>

            {/* Live Track Order Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenTracker}
              className="relative hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 transition cursor-pointer"
            >
              <Truck className="w-4 h-4 text-amber-600 animate-pulse" />
              <span>Track</span>
              {activeOrdersCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-red-600 text-white text-[10px] flex items-center justify-center font-bold">
                  {activeOrdersCount}
                </span>
              )}
            </motion.button>

            {/* Past Orders History Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenPastOrders}
              className="relative hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-stone-100 text-stone-800 border border-stone-200 hover:bg-stone-200 transition cursor-pointer"
              title="View Past Orders & 1-Click Re-order"
            >
              <RotateCcw className="w-3.5 h-3.5 text-stone-700" />
              <span>My Orders</span>
              {pastOrdersCount > 0 && (
                <span className="bg-stone-800 text-white text-[10px] font-black px-1.5 py-0.2 rounded-full">
                  {pastOrdersCount}
                </span>
              )}
            </motion.button>

            {/* WhatsApp Quick Order button */}
            <a
              href="https://wa.me/923021959609?text=Assalam%20o%20Alaikum!%20I%20want%20to%20place%20an%20order%20at%20RCB%20FOODS."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>0302-1959609</span>
            </a>

            {/* Cart Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition cursor-pointer"
              id="header-cart-button"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Cart</span>
              
              <AnimatePresence mode="wait">
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.7 }}
                  animate={{ scale: 1 }}
                  className="bg-amber-400 text-stone-950 px-2 py-0.5 rounded-full text-xs font-black min-w-[20px] text-center"
                >
                  {cartCount}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-600 hover:text-stone-900 lg:hidden cursor-pointer"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden bg-stone-900 text-white px-4 pt-3 pb-6 border-t border-stone-800 space-y-3"
        >
          <div className="flex flex-col space-y-2 text-sm font-semibold">
            <button
              onClick={() => scrollToSection('deals-section')}
              className="px-3 py-2 text-left rounded-lg hover:bg-stone-800 text-red-400 flex items-center justify-between"
            >
              <span>🔥 Famous Deals</span>
              <span className="text-xs text-stone-400">Save up to 30%</span>
            </button>
            <button
              onClick={() => scrollToSection('menu-section')}
              className="px-3 py-2 text-left rounded-lg hover:bg-stone-800 text-stone-200"
            >
              📜 Full Restaurant Menu
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTracker();
              }}
              className="px-3 py-2 text-left rounded-lg hover:bg-stone-800 text-amber-300 flex items-center justify-between"
            >
              <span>🛵 Track Active Order</span>
              {activeOrdersCount > 0 && (
                <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                  {activeOrdersCount} active
                </span>
              )}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPastOrders();
              }}
              className="px-3 py-2 text-left rounded-lg hover:bg-stone-800 text-stone-200 flex items-center justify-between"
            >
              <span>🛍️ Past Orders & 1-Click Reorder</span>
              {pastOrdersCount > 0 && (
                <span className="bg-amber-500 text-stone-950 font-bold text-xs px-2 py-0.5 rounded-full">
                  {pastOrdersCount}
                </span>
              )}
            </button>
            <button
              onClick={() => scrollToSection('reviews-section')}
              className="px-3 py-2 text-left rounded-lg hover:bg-stone-800 text-stone-200"
            >
              ⭐ Customer Reviews (4.9/5)
            </button>
            <button
              onClick={() => scrollToSection('location-section')}
              className="px-3 py-2 text-left rounded-lg hover:bg-stone-800 text-stone-200"
            >
              📍 Location & Google Map
            </button>
          </div>

          <div className="pt-3 border-t border-stone-800 flex flex-col gap-2">
            <button
              onClick={() => {
                onToggleTheme();
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs flex items-center justify-between transition cursor-pointer"
            >
              <span className="flex items-center gap-2">
                {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-amber-300" />}
                <span>Appearance Theme</span>
              </span>
              <span className="text-amber-400 font-extrabold text-[11px] uppercase">
                {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
              </span>
            </button>
            <a
              href="tel:03021959609"
              className="w-full py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-center font-bold text-sm flex items-center justify-center gap-2 text-stone-100"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Call: 0302-1959609</span>
            </a>
            <a
              href="https://wa.me/923021959609"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-center font-bold text-sm flex items-center justify-center gap-2 text-white shadow-sm"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp: 0302-1959609</span>
            </a>
          </div>
        </motion.div>
      )}
    </header>
  );
};
