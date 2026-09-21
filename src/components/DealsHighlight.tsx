import { useState } from 'react';
import { motion } from 'motion/react';
import { MenuItem } from '../types';
import { Flame, Sparkles, Plus, Check, Users, Wine } from 'lucide-react';

interface DealsHighlightProps {
  deals: MenuItem[];
  onAddToCart: (item: MenuItem, flavor?: string, drink?: string) => void;
}

export const DealsHighlight = ({ deals, onAddToCart }: DealsHighlightProps) => {
  const [addedItemId, setAddedItemId] = useState<string | null>(null);
  const [activeFlavorModalItem, setActiveFlavorModalItem] = useState<MenuItem | null>(null);
  const [selectedFlavor, setSelectedFlavor] = useState<string>('Karachi Chutney');

  const handleQuickAdd = (deal: MenuItem) => {
    if (deal.flavors && deal.flavors.length > 0) {
      // open flavor customization modal
      setActiveFlavorModalItem(deal);
      setSelectedFlavor(deal.flavors[0]);
    } else {
      onAddToCart(deal);
      setAddedItemId(deal.id);
      setTimeout(() => setAddedItemId(null), 1500);
    }
  };

  const confirmCustomizedAdd = () => {
    if (activeFlavorModalItem) {
      onAddToCart(activeFlavorModalItem, selectedFlavor);
      setAddedItemId(activeFlavorModalItem.id);
      setTimeout(() => setAddedItemId(null), 1500);
      setActiveFlavorModalItem(null);
    }
  };

  return (
    <section id="deals-section" className="py-14 sm:py-20 bg-stone-100 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Flame className="w-3.5 h-3.5 fill-red-600 text-red-600" />
              <span>Special Menu Deals</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-stone-900 tracking-tight">
              Famous Combo Deals
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-1 max-w-xl">
              Authentic Karachi street combinations crafted for ultimate satisfaction, complete with free drinks and massive savings.
            </p>
          </div>

          <div className="mt-4 sm:mt-0">
            <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-100 text-amber-900 border border-amber-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Free Chilled Drink with Selected Deals
            </span>
          </div>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {deals.map((deal, index) => {
            const isJustAdded = addedItemId === deal.id;

            return (
              <motion.div
                key={deal.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: (index % 4) * 0.08 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Deal Image Container */}
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-stone-100">
                    <img
                      src={deal.image}
                      alt={deal.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60" />

                    {/* Free Drink Pill */}
                    {deal.freeDrink && (
                      <div className="absolute top-3 left-3 bg-red-600 text-white text-[11px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1">
                        <Wine className="w-3 h-3" />
                        <span>FREE DRINK</span>
                      </div>
                    )}

                    {/* Serving Info */}
                    {deal.serving && (
                      <div className="absolute top-3 right-3 bg-stone-900/80 backdrop-blur-xs text-stone-200 text-[10px] font-semibold px-2 py-1 rounded-md flex items-center gap-1">
                        <Users className="w-3 h-3 text-amber-400" />
                        <span>{deal.serving}</span>
                      </div>
                    )}

                    {/* Price Ribbon */}
                    <div className="absolute bottom-3 right-3 bg-amber-400 text-stone-950 font-heading text-xl font-black px-3 py-1 rounded-xl shadow-lg leading-tight">
                      Rs. {deal.price}/-
                    </div>

                    {/* Urdu Name */}
                    {deal.urduName && (
                      <div className="absolute bottom-3 left-3 text-amber-200 text-xs font-bold drop-shadow">
                        {deal.urduName}
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-4 sm:p-5">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-heading text-xl sm:text-2xl font-black text-stone-900 tracking-wide">
                        {deal.name}
                      </h3>
                      {deal.originalPrice && (
                        <span className="text-xs text-stone-400 line-through font-semibold pt-1 whitespace-nowrap">
                          Rs. {deal.originalPrice}
                        </span>
                      )}
                    </div>

                    <p className="text-stone-600 text-xs sm:text-sm line-clamp-2 mb-3">
                      {deal.description}
                    </p>

                    {/* Bullet Highlights of the Deal */}
                    {deal.dealHighlights && (
                      <div className="space-y-1 py-2 border-t border-stone-100 mb-2">
                        {deal.dealHighlights.map((item, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-xs text-stone-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
                            <span className="truncate">{item}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-4 sm:p-5 pt-0">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleQuickAdd(deal)}
                    className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-sm ${
                      isJustAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-stone-900 hover:bg-red-600 text-white'
                    }`}
                  >
                    {isJustAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>{deal.flavors ? 'Select Flavor & Add' : 'Add Deal to Cart'}</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Flavor Customization Modal */}
      {activeFlavorModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-xs uppercase font-bold text-red-600">Choose Paratha Roll Flavor</span>
                <h3 className="text-xl font-bold text-stone-900">{activeFlavorModalItem.name}</h3>
                <p className="text-xs text-stone-500">Pick your favorite sauce / flavor for the included roll:</p>
              </div>
              <button
                onClick={() => setActiveFlavorModalItem(null)}
                className="text-stone-400 hover:text-stone-700 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 mb-6">
              {activeFlavorModalItem.flavors?.map((flavor) => (
                <button
                  key={flavor}
                  onClick={() => setSelectedFlavor(flavor)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold border flex items-center justify-between transition cursor-pointer ${
                    selectedFlavor === flavor
                      ? 'border-red-600 bg-red-50 text-red-700 shadow-xs'
                      : 'border-stone-200 hover:border-stone-300 text-stone-700'
                  }`}
                >
                  <span>{flavor}</span>
                  {selectedFlavor === flavor && <Check className="w-4 h-4 text-red-600" />}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveFlavorModalItem(null)}
                className="w-1/2 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-sm font-bold hover:bg-stone-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmCustomizedAdd}
                className="w-1/2 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-bold shadow-md cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Confirm & Add</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};
