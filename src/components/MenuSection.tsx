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
  Heart
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
  const [favoritesMap, setFavoritesMap] = useState<Record<string, boolean>>({});
  const [sortBy, setSortBy] = useState<'default' | 'price_low' | 'price_high' | 'popular'>('default');

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavoritesMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

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
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
            <AnimatePresence>
              {filteredItems.map((item) => {
                const isAdded = !!addedItemMap[item.id];
                const currentFlavor = selectedFlavorMap[item.id] || (item.flavors ? item.flavors[0] : '');
                const isFavorite = !!favoritesMap[item.id];

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className="bg-white rounded-2xl border border-stone-200/90 shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between group p-2.5 sm:p-3.5"
                  >
                    <div>
                      {/* Image Thumbnail with Heart and Red Circular Plus Button */}
                      <div className="relative rounded-xl overflow-hidden bg-stone-100 aspect-square sm:aspect-4/3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />

                        {/* Wishlist / Favorite Heart Icon */}
                        <button
                          type="button"
                          onClick={(e) => toggleFavorite(item.id, e)}
                          aria-label="Add to wishlist"
                          className="absolute top-2 right-2 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 backdrop-blur-xs shadow-xs flex items-center justify-center text-stone-600 hover:text-red-500 active:scale-90 transition cursor-pointer"
                        >
                          <Heart
                            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${
                              isFavorite ? 'fill-red-500 text-red-500' : 'text-stone-600'
                            }`}
                          />
                        </button>

                        {/* Popular or Spice Badge */}
                        {item.popular ? (
                          <div className="absolute top-2 left-2 z-10 bg-amber-400 text-stone-950 text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs flex items-center gap-1">
                            <Sparkles className="w-2.5 h-2.5" />
                            <span>Bestseller</span>
                          </div>
                        ) : item.spiceLevel ? (
                          <div
                            className={`absolute top-2 left-2 z-10 text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs ${
                              item.spiceLevel === 'Karachi Spicy'
                                ? 'bg-red-600 text-white'
                                : item.spiceLevel === 'Hot'
                                ? 'bg-orange-500 text-white'
                                : 'bg-stone-900/80 text-stone-200 backdrop-blur-xs'
                            }`}
                          >
                            {item.spiceLevel}
                          </div>
                        ) : null}

                        {/* Quick Add Red Circular Plus Button */}
                        <button
                          type="button"
                          onClick={() => handleAdd(item)}
                          aria-label={`Add ${item.name} to cart`}
                          className={`absolute bottom-2 right-2 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shadow-md transition-all duration-200 cursor-pointer active:scale-90 ${
                            isAdded
                              ? 'bg-emerald-600 text-white scale-105'
                              : 'bg-red-600 hover:bg-red-700 text-white'
                          }`}
                        >
                          {isAdded ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Plus className="w-4 h-4 stroke-[2.5]" />
                          )}
                        </button>
                      </div>

                      {/* Details Below Image */}
                      <div className="pt-2 sm:pt-2.5">
                        <h3 className="font-bold text-stone-900 text-xs sm:text-base leading-snug line-clamp-1 group-hover:text-red-600 transition-colors">
                          {item.name}
                        </h3>

                        {item.urduName && (
                          <p className="text-[10px] sm:text-xs text-amber-700 font-bold leading-tight mt-0.5 line-clamp-1">
                            {item.urduName}
                          </p>
                        )}

                        <p className="text-[11px] sm:text-xs text-stone-500 line-clamp-2 mt-1 leading-snug min-h-[1.75rem]">
                          {item.description}
                        </p>

                        {/* Optional Flavor Selector */}
                        {item.flavors && item.flavors.length > 0 && (
                          <div className="mt-1.5 pt-1 border-t border-stone-100">
                            <select
                              value={currentFlavor}
                              onChange={(e) =>
                                setSelectedFlavorMap((prev) => ({
                                  ...prev,
                                  [item.id]: e.target.value,
                                }))
                              }
                              className="w-full text-[10px] sm:text-xs font-semibold py-1 px-1.5 bg-stone-50 border border-stone-200 rounded-lg text-stone-700 focus:ring-1 focus:ring-red-500 truncate cursor-pointer"
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

                    {/* Price Row */}
                    <div className="mt-2 pt-1.5 border-t border-stone-100 flex items-baseline justify-between">
                      <div className="flex items-baseline gap-1">
                        <span className="text-xs sm:text-sm text-stone-600 font-bold">Rs</span>
                        <span className="text-sm sm:text-lg font-black text-stone-900 leading-none">
                          {item.price}
                        </span>
                      </div>
                      {item.dietaryTags && item.dietaryTags.some((t) => t !== 'All') && (
                        <span className="text-[9.5px] font-bold text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded-sm">
                          {item.dietaryTags.find((t) => t !== 'All')}
                        </span>
                      )}
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
