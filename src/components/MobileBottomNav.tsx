import { motion } from 'motion/react';
import { Utensils, Flame, ShoppingBag, Truck, MessageCircle, RotateCcw } from 'lucide-react';

interface MobileBottomNavProps {
  cartCount: number;
  subtotal: number;
  onOpenCart: () => void;
  onOpenTracker: () => void;
  onOpenPastOrders: () => void;
  activeOrdersCount: number;
  pastOrdersCount: number;
}

export const MobileBottomNav = ({
  cartCount,
  subtotal: _subtotal,
  onOpenCart,
  onOpenTracker,
  onOpenPastOrders,
  activeOrdersCount,
  pastOrdersCount,
}: MobileBottomNavProps) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200/90 py-1.5 px-2.5 shadow-lg">
      <div className="flex items-center justify-between gap-1 max-w-md mx-auto">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => scrollToSection('deals-section')}
          className="flex flex-col items-center justify-center p-1 rounded-xl text-stone-600 hover:text-red-600 transition cursor-pointer flex-1"
        >
          <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
          <span className="text-[10px] font-bold mt-0.5">Deals</span>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => scrollToSection('menu-section')}
          className="flex flex-col items-center justify-center p-1 rounded-xl text-stone-600 hover:text-stone-900 transition cursor-pointer flex-1"
        >
          <Utensils className="w-4 h-4 sm:w-5 sm:h-5 text-stone-700" />
          <span className="text-[10px] font-bold mt-0.5">Menu</span>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onOpenPastOrders}
          className="relative flex flex-col items-center justify-center p-1 rounded-xl text-stone-600 hover:text-stone-900 transition cursor-pointer flex-1"
        >
          <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 text-stone-600" />
          <span className="text-[10px] font-bold mt-0.5">Orders</span>
          {pastOrdersCount > 0 && (
            <span className="absolute top-0 right-2 w-3.5 h-3.5 rounded-full bg-stone-800 text-white text-[8px] font-black flex items-center justify-center">
              {pastOrdersCount}
            </span>
          )}
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onOpenTracker}
          className="relative flex flex-col items-center justify-center p-1 rounded-xl text-amber-700 transition cursor-pointer flex-1"
        >
          <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
          <span className="text-[10px] font-bold mt-0.5">Track</span>
          {activeOrdersCount > 0 && (
            <span className="absolute top-0 right-2 w-3.5 h-3.5 rounded-full bg-red-600 text-white text-[8px] font-black flex items-center justify-center animate-pulse">
              {activeOrdersCount}
            </span>
          )}
        </motion.button>

        {/* Cart Pill */}
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={onOpenCart}
          className="flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white font-bold text-xs shadow-md shrink-0 cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Cart</span>
          <span className="bg-amber-400 text-stone-950 font-black px-1.5 py-0.2 rounded-full text-[10px]">
            {cartCount}
          </span>
        </motion.button>
      </div>
    </div>
  );
};
