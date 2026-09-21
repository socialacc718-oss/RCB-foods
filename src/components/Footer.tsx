import { Flame, Phone, MessageCircle, MapPin, Clock, Heart, ShieldCheck } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-stone-950 text-stone-400 text-xs pt-16 pb-24 sm:pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          {/* Col 1: Brand & Slogan */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-stone-900 rounded-xl border border-amber-400/40 flex flex-col items-center justify-center p-1 text-white">
                <Flame className="w-3.5 h-3.5 text-amber-300 fill-amber-400" />
                <span className="font-heading text-base font-black leading-none">RCB</span>
              </div>
              <div>
                <span className="font-heading text-2xl font-black tracking-wider text-white">
                  RCB FOODS
                </span>
                <p className="text-[10px] text-amber-400 font-bold uppercase tracking-widest -mt-1">
                  Karachi Ultimate Food Stop!
                </p>
              </div>
            </div>

            <p className="text-stone-400 text-xs leading-relaxed">
              Bringing Karachi's beloved authentic street spices, crispy broast, smoky charcoal BBQ, tender chutney rolls, and revitalizing fresh juices to Main PWD Road Islamabad.
            </p>

            <div className="flex items-center gap-2 text-stone-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="font-semibold text-[11px]">100% Fresh Halal Ingredients</span>
            </div>
          </div>

          {/* Col 2: Famous Categories */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">
              Popular Categories
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#deals-section" className="hover:text-red-400 transition">
                  Famous 1 - 8 Combo Deals
                </a>
              </li>
              <li>
                <a href="#menu-section" className="hover:text-red-400 transition">
                  Crispy Paratha Rolls & Flavors
                </a>
              </li>
              <li>
                <a href="#menu-section" className="hover:text-red-400 transition">
                  Karachi Broast & Masala Fries
                </a>
              </li>
              <li>
                <a href="#menu-section" className="hover:text-red-400 transition">
                  Authentic Matka Dum Biryani
                </a>
              </li>
              <li>
                <a href="#menu-section" className="hover:text-red-400 transition">
                  RCB Juice Bar & Thick Shakes
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Hotline */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">
              Order Hotline & Location
            </h4>
            <div className="space-y-2.5">
              <a
                href="tel:03021959609"
                className="flex items-center gap-2 hover:text-white transition"
              >
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-bold text-stone-200">0302-1959609 (Owner/WhatsApp)</span>
              </a>

              <a
                href="tel:03156987822"
                className="flex items-center gap-2 hover:text-white transition"
              >
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>0315-6987822 (Branch)</span>
              </a>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>Shop # 3, Malik Usman Plaza, Near Bank of Punjab, Block-A Main PWD Road Islamabad</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>12:00 PM – 03:00 AM (Daily)</span>
              </div>
            </div>
          </div>

          {/* Col 4: Payment & Digital Slips */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">
              Accepted Payment Gateways
            </h4>
            <p className="text-stone-400 text-xs">
              Multiple hassle-free payment methods supported with instant digital receipts:
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="px-2.5 py-1 bg-stone-900 border border-stone-800 rounded-md text-[10px] font-bold text-stone-300">
                Cash on Delivery
              </span>
              <span className="px-2.5 py-1 bg-stone-900 border border-stone-800 rounded-md text-[10px] font-bold text-amber-400">
                JazzCash
              </span>
              <span className="px-2.5 py-1 bg-stone-900 border border-stone-800 rounded-md text-[10px] font-bold text-emerald-400">
                EasyPaisa
              </span>
              <span className="px-2.5 py-1 bg-stone-900 border border-stone-800 rounded-md text-[10px] font-bold text-teal-400">
                SadaPay / NayaPay
              </span>
              <span className="px-2.5 py-1 bg-stone-900 border border-stone-800 rounded-md text-[10px] font-bold text-blue-400">
                Bank Transfer
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <p>© {new Date().getFullYear()} RCB FOODS Islamabad. All Rights Reserved.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>for Islamabad & Rawalpindi Food Lovers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
