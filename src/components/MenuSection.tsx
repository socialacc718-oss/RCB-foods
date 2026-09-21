import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MenuItem, CategoryId, DietaryTag } from '../types';
import { CATEGORIES, DIETARY_OPTIONS } from '../data/menuData';
import { 
  Search, 
  Plus, 
  Check, 
  Flame, 
  Sparkles, 
  SlidersHorizontal,
  X,
  Layers,
  Leaf,
  ShieldCheck
} from 'lucide-react';

interface MenuSectionProps {
  items: MenuItem[];
  onAddToCart: (item: MenuItem, flavor?: string, drink?: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const MenuSection = ({
  items,
  onAddToCart,
  searchQuery,
  setSearchQuery,
}: MenuSectionProps) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [selectedDietary, setSelectedDietary] = useState<DietaryTag>('All');
  const [addedItemMap, setAddedItemMap] = useState<Record<string, boolean>>({});
  const [selectedFlavorMap, setSelectedFlavorMap] = useState<Record<string, string>>({});
  const [sortBy, setSortBy] = useState<'default' | 'price_low' | 'price_high' | 'popular'>('default');

  // Compute dietary counts for badges
  const dietaryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: items.length };
    items.forEach((item) => {
      item.dietaryTags?.forEach((tag) => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });
    return counts;
  }, [items]);

  // Filter and sort items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Category match
      const categoryMatch = 
        selectedCategory === 'all' 
          ? true 
          : item.category === selectedCategory;

      // Dietary match
      const dietaryMatch = 
        selectedDietary === 'All'
          ? true
          : (item.dietaryTags && item.dietaryTags.includes(selectedDietary));

      // Search match
      const query = searchQuery.toLowerCase().trim();
      const searchMatch = !query || 
        item.name.toLowerCase().includes(query) ||
        (item.urduName && item.urduName.toLowerCase().includes(query)) ||
        item.description.toLowerCase().includes(query) ||
        (item.dealHighlights && item.dealHighlights.some(h => h.toLowerCase().includes(query)));

      return categoryMatch && dietaryMatch && searchMatch;
    }).sort((a, b) => {
      if (sortBy === 'price_low') return a.price - b.price;
      if (sortBy === 'price_high') return b.price - a.price;
      if (sortBy === 'popular') return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
      return 0;
    });
  }, [items, selectedCategory, selectedDietary, searchQuery, sortBy]);

  const handleAdd = (item: MenuItem) => {
    const chosenFlavor = selectedFlavorMap[item.id] || (item.flavors ? item.flavors[0] : undefined);
    onAddToCart(item, chosenFlavor);

    setAddedItemMap((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemMap((prev) => ({ ...prev, [item.id]: false }));
    }, 1200);
  };

  return (
    <section id="menu-section" className="py-14 sm:py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Flame className="w-3.5 h-3.5 fill-red-600 text-red-600" />
            <span>Complete Restaurant Menu</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-stone-900 tracking-tight">
            Order Your Favorite Food
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            Explore authentic paratha rolls, shawarma, crispy broast, karachi biryani, wok Chinese, and fresh juices made fresh to order.
          </p>
        </div>

        {/* Dynamic Search & Controls Bar */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-stone-200 mb-8">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search menu (e.g. Zinger, Chutney Roll, Matka Biryani, Oreo Shake)..."
                className="w-full pl-11 pr-10 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-800 placeholder-stone-400 focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:bg-white transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1 cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-stone-500 hidden sm:block" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full sm:w-auto px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm font-semibold text-stone-700 focus:outline-hidden focus:ring-2 focus:ring-red-500 cursor-pointer"
              >
                <option value="default">Default Sort</option>
                <option value="popular">Most Popular First</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills (Horizontal Scrolling) */}
          <div className="mt-4 pt-4 border-t border-stone-100 flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <motion.button
                  key={cat.id}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(cat.id as CategoryId)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md shadow-red-600/25'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isSelected ? 'bg-red-800 text-white' : 'bg-stone-200 text-stone-600'
                    }`}
                  >
                    {cat.count}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Interactive Dietary Preference Filter Toggles */}
          <div className="mt-3 pt-3 border-t border-stone-100 flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <span className="text-[11px] font-black uppercase tracking-wider text-stone-500 whitespace-nowrap flex items-center gap-1 mr-1">
              Dietary Filter:
            </span>
            {DIETARY_OPTIONS.map((opt) => {
              const isSelected = selectedDietary === opt.id;
              const count = dietaryCounts[opt.id] || 0;
              return (
                <motion.button
                  key={opt.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedDietary(opt.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-stone-900 text-white shadow-md'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  <span>{opt.icon}</span>
                  <span>{opt.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                      isSelected ? 'bg-stone-700 text-white' : 'bg-stone-200 text-stone-600'
                    }`}
                  >
                    {count}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6 text-xs text-stone-500 font-medium px-1">
          <span>
            Showing <strong className="text-stone-900">{filteredItems.length}</strong> items
            {selectedDietary !== 'All' && (
              <span className="ml-1 text-red-600 font-bold">({selectedDietary})</span>
            )}
            {searchQuery && ` for "${searchQuery}"`}
          </span>
          {(searchQuery || selectedCategory !== 'all' || selectedDietary !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedDietary('All');
              }}
              className="text-red-600 hover:underline font-bold cursor-pointer"
            >
              Reset All Filters
            </button>
          )}
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 p-8 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-4 text-stone-400">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-stone-800 mb-1">No items found</h3>
            <p className="text-stone-500 text-xs mb-4">
              We couldn't find anything matching &quot;{searchQuery}&quot;. Try searching for &quot;Burger&quot;, &quot;Biryani&quot;, &quot;Roll&quot;, or &quot;Shake&quot;.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold cursor-pointer"
            >
              View All Menu
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredItems.map((item) => {
                const isAdded = !!addedItemMap[item.id];
                const currentFlavor = selectedFlavorMap[item.id] || (item.flavors ? item.flavors[0] : '');

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="bg-white rounded-2xl border border-stone-200/90 shadow-xs hover:shadow-xl hover:border-red-200 transition-all duration-300 overflow-hidden flex flex-col justify-between group"
                  >
                    <div>
                      {/* Image Thumbnail */}
                      <div className="relative h-44 w-full bg-stone-100 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                        {/* Popular Badge */}
                        {item.popular && (
                          <div className="absolute top-2.5 left-2.5 bg-amber-400 text-stone-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            <span>Bestseller</span>
                          </div>
                        )}

                        {/* Spice Level */}
                        {item.spiceLevel && (
                          <div className={`absolute top-2.5 right-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm ${
                            item.spiceLevel === 'Karachi Spicy'
                              ? 'bg-red-600 text-white'
                              : item.spiceLevel === 'Hot'
                              ? 'bg-orange-500 text-white'
                              : 'bg-stone-900/80 text-stone-200 backdrop-blur-xs'
                          }`}>
                            {item.spiceLevel}
                          </div>
                        )}

                        {/* Price Badge */}
                        <div className="absolute bottom-2.5 right-2.5 bg-stone-950/90 backdrop-blur-xs text-white text-sm font-black px-2.5 py-1 rounded-lg">
                          Rs. {item.price}/-
                        </div>

                        {/* Urdu Name */}
                        {item.urduName && (
                          <div className="absolute bottom-2.5 left-2.5 text-amber-200 text-xs font-bold drop-shadow">
                            {item.urduName}
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="p-4">
                        <h3 className="font-bold text-stone-900 text-base leading-snug line-clamp-1 mb-1 group-hover:text-red-600 transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-stone-500 text-xs line-clamp-2 mb-2">
                          {item.description}
                        </p>

                        {/* Dietary Tags Chips */}
                        {item.dietaryTags && item.dietaryTags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {item.dietaryTags.map((tag) => {
                              if (tag === 'All') return null;
                              let badgeColor = 'bg-stone-100 text-stone-700';
                              let icon = '';
                              if (tag === 'Spicy') {
                                badgeColor = 'bg-red-50 text-red-700 border border-red-200/80';
                                icon = '🌶️';
                              } else if (tag === 'Veg') {
                                badgeColor = 'bg-emerald-50 text-emerald-700 border border-emerald-200/80';
                                icon = '🌱';
                              } else if (tag === 'Halal') {
                                badgeColor = 'bg-green-50 text-green-800 border border-green-200/80';
                                icon = '🥩';
                              } else if (tag === 'Crispy') {
                                badgeColor = 'bg-amber-50 text-amber-800 border border-amber-200/80';
                                icon = '🍗';
                              } else if (tag === 'Chef Special') {
                                badgeColor = 'bg-purple-50 text-purple-700 border border-purple-200/80';
                                icon = '⭐';
                              }
                              return (
                                <span
                                  key={tag}
                                  className={`text-[9.5px] font-extrabold px-1.5 py-0.5 rounded-md flex items-center gap-0.5 ${badgeColor}`}
                                >
                                  <span>{icon}</span>
                                  <span>{tag}</span>
                                </span>
                              );
                            })}
                          </div>
                        )}

                        {/* Optional Flavor Selector */}
                        {item.flavors && item.flavors.length > 0 && (
                          <div className="mb-3 bg-stone-50 p-2 rounded-xl border border-stone-100">
                            <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
                              Choose Flavor / Sauce:
                            </label>
                            <select
                              value={currentFlavor}
                              onChange={(e) =>
                                setSelectedFlavorMap((prev) => ({
                                  ...prev,
                                  [item.id]: e.target.value,
                                }))
                              }
                              className="w-full text-xs font-semibold py-1 px-2 bg-white border border-stone-200 rounded-lg text-stone-800 focus:ring-1 focus:ring-red-500"
                            >
                              {item.flavors.map((f) => (
                                <option key={f} value={f}>
                                  {f}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <div className="p-4 pt-0">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAdd(item)}
                        className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shadow-xs ${
                          isAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-stone-900 hover:bg-red-600 text-white'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Added to Cart!</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" />
                            <span>Add to Order</span>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};
