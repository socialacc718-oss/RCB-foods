import { motion } from 'motion/react';
import { Flame, Clock, ShieldCheck, Sparkles, ArrowRight, MessageCircle, Star } from 'lucide-react';

interface HeroBannerProps {
  onExploreDeals: () => void;
  onExploreMenu: () => void;
}

export const HeroBanner = ({ onExploreDeals, onExploreMenu }: HeroBannerProps) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 text-white pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background radial decorations */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Eyebrow Tag */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 text-xs sm:text-sm font-bold"
            >
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>Karachi Ultimate Food Stop • Main PWD Road Islamabad</span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-2"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-tight">
                Authentic Karachi Flavor, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-yellow-400">
                  Delivered Piping Hot!
                </span>
              </h1>
              <p className="text-stone-300 text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
                From sizzling crispy broast, juicy paratha chutney rolls, and clay-pot Matka Biryani to handcrafted milkshakes from the RCB Juice Bar. Order effortlessly with instant WhatsApp slip generation!
              </p>
            </motion.div>

            {/* Quick Badges */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1 text-xs sm:text-sm"
            >
              <div className="flex items-center gap-2 bg-stone-800/70 border border-stone-700/60 px-3 py-2 rounded-xl">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-stone-200 font-medium">Free Drink in Deals</span>
              </div>
              <div className="flex items-center gap-2 bg-stone-800/70 border border-stone-700/60 px-3 py-2 rounded-xl">
                <Clock className="w-4 h-4 text-amber-400" />
                <span className="text-stone-200 font-medium">Open Till 3:00 AM</span>
              </div>
              <div className="flex items-center gap-2 bg-stone-800/70 border border-stone-700/60 px-3 py-2 rounded-xl col-span-2 sm:col-span-1">
                <ShieldCheck className="w-4 h-4 text-red-400" />
                <span className="text-stone-200 font-medium">100% Fresh Halal</span>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3 pt-3"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onExploreDeals}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-sm sm:text-base shadow-lg shadow-red-600/30 flex items-center gap-2 cursor-pointer"
              >
                <span>View Famous Deals</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onExploreMenu}
                className="px-6 py-3.5 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 font-bold text-sm sm:text-base transition cursor-pointer"
              >
                Explore Full Menu
              </motion.button>

              <a
                href="https://wa.me/923021959609?text=Hi%20RCB%20FOODS,%20I%20would%20like%20to%20place%20an%20order."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-400 hover:text-emerald-300 font-bold text-sm sm:text-base flex items-center gap-2 transition cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-emerald-400" />
                <span>WhatsApp (0302-1959609)</span>
              </a>
            </motion.div>
          </div>

          {/* Right Featured Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative mx-auto max-w-md lg:max-w-none"
            >
              {/* Glow effect */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-red-600 to-amber-400 opacity-30 blur-xl" />

              {/* Main Card */}
              <div className="relative rounded-2xl bg-stone-800/90 border border-stone-700/80 p-4 shadow-2xl overflow-hidden backdrop-blur-sm">
                {/* Floating animated badge 1: Top Right */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
                  className="absolute -top-3 -right-3 z-20 bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 text-[11px] font-black px-3 py-1.5 rounded-xl shadow-lg border border-amber-300/50 flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 fill-stone-950" />
                  <span>Free Chilled Drink</span>
                </motion.div>

                {/* Floating animated badge 2: Bottom Left */}
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                  className="absolute -bottom-3 -left-3 z-20 bg-gradient-to-r from-red-600 to-red-700 text-white text-[11px] font-black px-3 py-1.5 rounded-xl shadow-lg border border-red-400/50 flex items-center gap-1.5"
                >
                  <Flame className="w-3.5 h-3.5 text-amber-300 fill-amber-300 animate-pulse" />
                  <span>Crispy & Sizzling Hot</span>
                </motion.div>

                <div className="relative h-64 sm:h-72 w-full rounded-xl overflow-hidden mb-4 group">
                  <img
                    src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1000&q=80"
                    alt="RCB Foods Famous 1 Deal with Burger, Roll and Fries"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Tag on image */}
                  <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                    Top Seller Deal
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-left">
                    <h3 className="text-xl font-black text-white font-display">FAMOUS 1 COMBO</h3>
                    <p className="text-stone-300 text-xs">Chicken Cheese Burger + Chicken Chutney Roll + Fries + Cold Drink</p>
                  </div>
                </div>

                {/* Price & Quick Order row */}
                <div className="flex items-center justify-between pt-1">
                  <div>
                    <span className="text-xs text-stone-400 line-through">Rs. 1,150</span>
                    <div className="text-2xl font-black text-amber-400">Rs. 900/-</div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onExploreDeals}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer transition"
                  >
                    <span>Order Deal Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </motion.button>
                </div>

                {/* Social Proof Mini pill */}
                <div className="mt-3 pt-3 border-t border-stone-700/60 flex items-center justify-between text-xs text-stone-400">
                  <div className="flex items-center gap-1 text-amber-400 font-bold">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-white ml-1 font-extrabold">4.9 / 5</span>
                  </div>
                  <span>Rated by 2,500+ PWD Foodies</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Live Animated Ticker Bar */}
      <div className="mt-12 pt-4 pb-1 border-t border-stone-800 bg-stone-950/60 overflow-hidden">
        <div className="flex whitespace-nowrap gap-8 text-xs font-semibold text-stone-300">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
            className="flex items-center gap-8 shrink-0"
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <strong className="text-white">LIVE FROM KITCHEN:</strong> Fresh Sizzling Broast & Charcoal Rolls in PWD
            </span>
            <span className="text-stone-600">•</span>
            <span className="flex items-center gap-2 text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FREE Delivery on Orders above Rs. 2,500</span>
            </span>
            <span className="text-stone-600">•</span>
            <span className="text-emerald-400">
              ⚡ Instant WhatsApp Order Slip to 0302-1959609
            </span>
            <span className="text-stone-600">•</span>
            <span className="text-stone-300">
              🌙 Open Till 03:00 AM Every Night
            </span>
            <span className="text-stone-600">•</span>
            <span className="text-amber-300">
              ⭐ 4.9 Star Rated by 2,500+ Islamabad Foodies
            </span>
            <span className="text-stone-600">•</span>
            <span className="text-red-400">
              🔥 Famous 1-8 Deals with FREE Drinks
            </span>
          </motion.div>

          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
            className="flex items-center gap-8 shrink-0"
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <strong className="text-white">LIVE FROM KITCHEN:</strong> Fresh Sizzling Broast & Charcoal Rolls in PWD
            </span>
            <span className="text-stone-600">•</span>
            <span className="flex items-center gap-2 text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FREE Delivery on Orders above Rs. 2,500</span>
            </span>
            <span className="text-emerald-400">
              ⚡ Instant WhatsApp Order Slip to 0302-1959609
            </span>
            <span className="text-stone-600">•</span>
            <span className="text-stone-300">
              🌙 Open Till 03:00 AM Every Night
            </span>
            <span className="text-stone-600">•</span>
            <span className="text-amber-300">
              ⭐ 4.9 Star Rated by 2,500+ Islamabad Foodies
            </span>
            <span className="text-stone-600">•</span>
            <span className="text-red-400">
              🔥 Famous 1-8 Deals with FREE Drinks
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
