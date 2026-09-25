import { useState } from 'react';
import { motion } from 'motion/react';
import { MenuItem } from '../types';
import { Flame, Sparkles, Plus, Check, Users, Wine, Heart } from 'lucide-react';

interface DealsHighlightProps {
  deals: MenuItem[];
  onAddToCart: (item: MenuItem, flavor?: string, drink?: string) => void;
}

export const DealsHighlight = ({ deals, onAddToCart }: DealsHighlightProps) => {
  const [addedItemId, setAddedItemId] = useState<string | null>(null);
  const [activeFlavorModalItem, setActiveFlavorModalItem] = useState<MenuItem | null>(null);
  const [selectedFlavor, setSelectedFlavor] = useState<string>('Karachi Chutney');
  const [favoritesMap, setFavoritesMap] = useState<Record<string, boolean>>({});

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavoritesMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

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

        {/* Deals Grid (2-column layout on mobile, clean card arrangement) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
          {deals.map((deal, index) => {
            const isJustAdded = addedItemId === deal.id;
            const isFavorite = !!favoritesMap[deal.id];

            return (
              <motion.div
                key={deal.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.35, delay: (index % 4) * 0.05 }}
                className="bg-white rounded-2xl border border-stone-200/90 shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between group p-2.5 sm:p-3.5"
              >
                <div>
                  {/* Deal Image Container */}
                  <div className="relative rounded-xl overflow-hidden bg-stone-100 aspect-square sm:aspect-4/3">
                    <img
                      src={deal.image}
                      alt={deal.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      loading="lazy"
                    />

                    {/* Wishlist / Favorite Heart Icon */}
                    <button
                      type="button"
                      onClick={(e) => toggleFavorite(deal.id, e)}
                      aria-label="Add to wishlist"
                      className="absolute top-2 right-2 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 backdrop-blur-xs shadow-xs flex items-center justify-center text-stone-600 hover:text-red-500 active:scale-90 transition cursor-pointer"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${
                          isFavorite ? 'fill-red-500 text-red-500' : 'text-stone-600'
                        }`}
                      />
                    </button>

                    {/* Free Drink / Serving Badge */}
                    {deal.freeDrink ? (
                      <div className="absolute top-2 left-2 z-10 bg-red-600 text-white text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs flex items-center gap-1">
                        <Wine className="w-2.5 h-2.5" />
                        <span>FREE DRINK</span>
                      </div>
                    ) : deal.serving ? (
                      <div className="absolute top-2 left-2 z-10 bg-stone-900/80 backdrop-blur-xs text-stone-200 text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
                        <Users className="w-2.5 h-2.5 text-amber-400" />
                        <span>{deal.serving}</span>
                      </div>
                    ) : null}

                    {/* Quick Add Red Circular Plus Button */}
                    <button
                      type="button"
                      onClick={() => handleQuickAdd(deal)}
                      aria-label={`Add ${deal.name} to cart`}
                      className={`absolute bottom-2 right-2 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shadow-md transition-all duration-200 cursor-pointer active:scale-90 ${
                        isJustAdded
                          ? 'bg-emerald-600 text-white scale-105'
                          : 'bg-red-600 hover:bg-red-700 text-white'
                      }`}
                    >
                      {isJustAdded ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Plus className="w-4 h-4 stroke-[2.5]" />
                      )}
                    </button>
                  </div>

                  {/* Card Content Below Image */}
                  <div className="pt-2 sm:pt-2.5">
                    <h3 className="font-bold text-stone-900 text-xs sm:text-base leading-snug line-clamp-1 group-hover:text-red-600 transition-colors">
                      {deal.name}
                    </h3>

                    {deal.urduName && (
                      <p className="text-[10px] sm:text-xs text-amber-700 font-bold leading-tight mt-0.5 line-clamp-1">
                        {deal.urduName}
                      </p>
                    )}

                    <p className="text-[11px] sm:text-xs text-stone-500 line-clamp-2 mt-1 leading-snug min-h-[1.75rem]">
                      {deal.description}
                    </p>
                  </div>
                </div>

                {/* Price Row */}
                <div className="mt-2 pt-1.5 border-t border-stone-100 flex items-baseline justify-between">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xs sm:text-sm text-stone-600 font-bold">Rs</span>
                    <span className="text-sm sm:text-lg font-black text-stone-900 leading-none">
                      {deal.price}
                    </span>
                  </div>
                  {deal.originalPrice && (
                    <span className="text-[10px] sm:text-xs text-stone-400 line-through font-semibold">
                      Rs {deal.originalPrice}
                    </span>
                  )}
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
