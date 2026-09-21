import { useState } from 'react';
import { motion } from 'motion/react';
import { Review } from '../types';
import { CUSTOMER_REVIEWS } from '../data/reviewsData';
import { Star, CheckCircle, MessageSquare, ThumbsUp, Sparkles, Plus, X } from 'lucide-react';

export const CustomerReviews = () => {
  const [reviews, setReviews] = useState<Review[]>(CUSTOMER_REVIEWS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newLocation, setNewLocation] = useState('PWD Housing Society, Islamabad');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [newDish, setNewDish] = useState('Famous 1 Combo');

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newComment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      name: newName.trim(),
      location: newLocation,
      rating: newRating,
      date: 'Just now',
      comment: newComment.trim(),
      recommendedItem: newDish,
      verified: true,
    };

    setReviews([newRev, ...reviews]);
    setNewName('');
    setNewComment('');
    setIsModalOpen(false);
  };

  return (
    <section id="reviews-section" className="py-14 sm:py-20 bg-stone-100 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Verified Customer Reviews</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-stone-900 tracking-tight">
              Loved by 8,000+ Foodies in Islamabad
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-1 max-w-xl">
              Real feedback from our regular customers in PWD, Bahria Town, Police Foundation, and surrounding twin city sectors.
            </p>
          </div>

          <div className="mt-4 sm:mt-0 flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-stone-200 shadow-xs">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="font-black text-stone-900 text-sm">4.9 / 5.0</span>
              <span className="text-xs text-stone-500 font-semibold">(850+ Ratings)</span>
            </div>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-red-600 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Write Review</span>
            </motion.button>
          </div>
        </div>

        {/* Reviews Grid (8+ reviews) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3, delay: (idx % 3) * 0.08 }}
              className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs hover:shadow-xl hover:border-amber-200 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
                      <span>{rev.name}</span>
                      {rev.verified && (
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 fill-emerald-100" />
                      )}
                    </h3>
                    <p className="text-[11px] text-stone-500">{rev.location}</p>
                  </div>

                  <span className="text-[10px] text-stone-400 font-medium">{rev.date}</span>
                </div>

                {/* Stars */}
                <div className="flex gap-0.5 text-amber-400 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-stone-700 text-xs sm:text-sm leading-relaxed mb-4">
                  &quot;{rev.comment}&quot;
                </p>
              </div>

              {/* Recommended dish pill */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="text-stone-500 text-[11px]">Ordered:</span>
                <span className="font-bold text-red-700 bg-red-50 px-2.5 py-0.5 rounded-full text-[11px]">
                  {rev.recommendedItem}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Add Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-stone-900 font-display">Share Your Experience</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-stone-400 hover:text-stone-700 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddReview} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bilal Ahmed"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Your Area / Society</label>
                <input
                  type="text"
                  placeholder="e.g. Police Foundation, PWD Islamabad"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Rating</label>
                <div className="flex gap-2 text-amber-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewRating(star)}
                      className="p-1 cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= newRating ? 'fill-amber-400' : 'text-stone-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Favorite Dish</label>
                <input
                  type="text"
                  placeholder="e.g. Famous 2 Zinger Deal"
                  value={newDish}
                  onChange={(e) => setNewDish(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Your Review *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="How was the taste, crunch, and delivery time?"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md cursor-pointer"
              >
                Submit Verified Review
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </section>
  );
};
