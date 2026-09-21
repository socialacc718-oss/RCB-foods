import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Flame, Sparkles, MessageCircle } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedCheckout: () => void;
  subtotal: number;
  deliveryFee: number;
}

export const CartDrawer = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onProceedCheckout,
  subtotal,
  deliveryFee,
}: CartDrawerProps) => {
  const total = subtotal + (cart.length > 0 ? deliveryFee : 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity"
          />

          {/* Slide Drawer container: full width on mobile, max-w-md on desktop */}
          <div className="fixed inset-y-0 right-0 max-w-full flex w-full sm:w-auto pointer-events-none">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="w-full sm:w-md sm:max-w-md bg-white shadow-2xl flex flex-col justify-between h-full pointer-events-auto"
            >
              {/* Header */}
              <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-red-700 text-white flex items-center justify-center shadow-md shadow-red-900/20">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-bold text-stone-900 text-lg leading-tight">Your Order Basket</h2>
                    <p className="text-xs text-stone-500">{cart.length} item{cart.length !== 1 ? 's' : ''} in cart</p>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition cursor-pointer"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Free delivery bar */}
              {cart.length > 0 && (
                <div className="bg-amber-50 px-4 py-2 border-b border-amber-100 flex items-center gap-2 text-xs text-amber-900 font-medium">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    {subtotal >= 2500 ? (
                      <strong className="text-emerald-700">🎉 Congratulations! You unlocked Free Delivery!</strong>
                    ) : (
                      <>Add <strong>Rs. {2500 - subtotal}</strong> more for Free Delivery anywhere in PWD!</>
                    )}
                  </span>
                </div>
              )}

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
                {cart.length === 0 ? (
                  <div className="text-center py-16 px-4">
                    <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center mx-auto mb-3 text-stone-400">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <h3 className="font-bold text-stone-800 text-base mb-1">Your cart is hungry!</h3>
                    <p className="text-xs text-stone-500 mb-6 max-w-xs mx-auto">
                      Explore our famous deals, crispy burgers, paratha chutney rolls, and juices to begin.
                    </p>
                    <button
                      onClick={onClose}
                      className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-sm cursor-pointer"
                    >
                      Browse Menu
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 flex gap-3 items-center"
                    >
                      {/* Image */}
                      <img
                        src={item.menuItem.image}
                        alt={item.menuItem.name}
                        className="w-16 h-16 rounded-lg object-cover bg-stone-200 shrink-0"
                      />

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-xs sm:text-sm text-stone-900 truncate">
                          {item.menuItem.name}
                        </h4>
                        {item.selectedFlavor && (
                          <span className="inline-block text-[10px] font-semibold text-red-700 bg-red-100 px-2 py-0.5 rounded-md mt-0.5">
                            {item.selectedFlavor}
                          </span>
                        )}
                        <div className="text-xs font-black text-stone-900 mt-1">
                          Rs. {item.menuItem.price * item.quantity}/-
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-1.5 bg-white border border-stone-200 rounded-lg p-1 shadow-2xs">
                        <motion.button
                          whileTap={{ scale: 0.8 }}
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-stone-600 hover:bg-stone-100 hover:text-red-600 cursor-pointer transition"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </motion.button>
                        <span className="text-xs font-bold w-5 text-center text-stone-900">
                          {item.quantity}
                        </span>
                        <motion.button
                          whileTap={{ scale: 0.8 }}
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-stone-600 hover:bg-stone-100 hover:text-emerald-600 cursor-pointer transition"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </motion.button>
                      </div>

                      {/* Remove */}
                      <motion.button
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.85 }}
                        onClick={() => onRemoveItem(item.id)}
                        className="text-stone-400 hover:text-red-600 p-1 cursor-pointer transition"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Bottom Summary & Checkout */}
              {cart.length > 0 && (
                <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200 space-y-3">
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-stone-600">
                      <span>Subtotal</span>
                      <span className="font-semibold text-stone-900">Rs. {subtotal}/-</span>
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <span>Delivery Charges (PWD/Islamabad)</span>
                      <span className="font-semibold text-stone-900">
                        {deliveryFee === 0 ? (
                          <span className="text-emerald-600 font-bold">FREE</span>
                        ) : (
                          `Rs. ${deliveryFee}/-`
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-base font-black text-stone-950 pt-2 border-t border-stone-200">
                      <span>Grand Total</span>
                      <span className="text-red-600 font-display text-xl">Rs. {total}/-</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      onClose();
                      onProceedCheckout();
                    }}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Proceed to Seamless Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>

                  <a
                    href={`https://wa.me/923021959609?text=${encodeURIComponent(
                      `🔥 *NEW QUICK ORDER - RCB FOODS* 🔥\n\nItems in Cart:\n${cart
                        .map(
                          (item, idx) =>
                            `${idx + 1}. *${item.menuItem.name}* x ${item.quantity} = Rs. ${
                              item.menuItem.price * item.quantity
                            }/-${item.selectedFlavor ? ` (${item.selectedFlavor})` : ''}`
                        )
                        .join('\n')}\n\n*Total Amount:* Rs. ${total}/-\nDelivery Area: Main PWD Road & surroundings\nPlease send me the order confirmation!`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl border border-emerald-600 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-emerald-600 text-emerald-600" />
                    <span>Quick Order on WhatsApp (0302-1959609)</span>
                  </a>

                  <p className="text-[11px] text-center text-stone-500">
                    🔒 Instant WhatsApp receipt slip generated automatically upon checkout!
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
