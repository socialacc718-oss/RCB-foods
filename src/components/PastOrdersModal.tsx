import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Order, CartItem } from '../types';
import { 
  X, 
  RotateCcw, 
  Receipt, 
  Truck, 
  Clock, 
  ShoppingBag, 
  MapPin, 
  Trash2, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight,
  ArrowRight,
  Utensils
} from 'lucide-react';

interface PastOrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  onReorder: (items: CartItem[]) => void;
  onViewSlip: (order: Order) => void;
  onTrackOrder: (order: Order) => void;
  onClearHistory?: () => void;
}

export const PastOrdersModal = ({
  isOpen,
  onClose,
  orders,
  onReorder,
  onViewSlip,
  onTrackOrder,
  onClearHistory,
}: PastOrdersModalProps) => {
  const [reorderingId, setReorderingId] = useState<string | null>(null);

  const handleReorderClick = (order: Order) => {
    setReorderingId(order.id);
    setTimeout(() => {
      onReorder(order.items);
      setReorderingId(null);
      onClose();
    }, 450);
  };

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'received':
        return { label: 'Received', color: 'bg-blue-100 text-blue-800 border-blue-200' };
      case 'kitchen_prep':
        return { label: 'In Kitchen', color: 'bg-amber-100 text-amber-800 border-amber-200' };
      case 'quality_check':
        return { label: 'Packed Hot', color: 'bg-purple-100 text-purple-800 border-purple-200' };
      case 'out_for_delivery':
        return { label: 'Out for Delivery', color: 'bg-red-100 text-red-800 border-red-200 animate-pulse' };
      case 'delivered':
        return { label: 'Delivered', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
      default:
        return { label: 'Processing', color: 'bg-stone-100 text-stone-700 border-stone-200' };
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 26, stiffness: 280 }}
            className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200 my-6 flex flex-col max-h-[85vh]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-stone-900 via-stone-900 to-red-950 text-white p-5 sm:p-6 flex items-center justify-between border-b border-stone-800">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-red-600 to-amber-500 text-white flex items-center justify-center shadow-lg shadow-red-900/30">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-black font-display tracking-tight text-white">
                      Your Past Orders
                    </h2>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-400 text-stone-950">
                      {orders.length}
                    </span>
                  </div>
                  <p className="text-xs text-stone-300 mt-0.5">
                    1-Click Re-order your favorite Karachi deals & meals
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {orders.length > 0 && onClearHistory && (
                  <button
                    onClick={onClearHistory}
                    className="p-2 rounded-xl text-stone-400 hover:text-red-400 hover:bg-stone-800/80 transition cursor-pointer"
                    title="Clear Order History"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-stone-50/70">
              {orders.length === 0 ? (
                <div className="text-center py-16 px-4 bg-white rounded-2xl border border-stone-200">
                  <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto mb-3">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-stone-900 text-base mb-1">
                    No Order History Yet
                  </h3>
                  <p className="text-xs text-stone-500 max-w-sm mx-auto mb-5">
                    Orders you place are automatically saved here so you can re-order your favorite Karachi broast, rolls, and deals with one tap!
                  </p>
                  <button
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition cursor-pointer"
                  >
                    Explore Delicious Menu
                  </button>
                </div>
              ) : (
                orders.map((order, index) => {
                  const statusInfo = getStatusBadge(order.status);
                  const isReorderingThis = reorderingId === order.id;

                  return (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-xs hover:shadow-md transition"
                    >
                      {/* Top row: Order ID, Date & Status Badge */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-100">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-sm text-stone-900 font-mono tracking-tight">
                            {order.orderNumber}
                          </span>
                          <span className="text-stone-300">•</span>
                          <span className="text-xs text-stone-500 flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-stone-400" />
                            {order.createdAt}
                          </span>
                        </div>

                        <span
                          className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${statusInfo.color}`}
                        >
                          {statusInfo.label}
                        </span>
                      </div>

                      {/* Items Preview */}
                      <div className="py-3 space-y-2">
                        {order.items.map((item, itemIdx) => (
                          <div
                            key={`${item.id}-${itemIdx}`}
                            className="flex items-center justify-between gap-3 text-xs"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <img
                                src={item.menuItem.image}
                                alt={item.menuItem.name}
                                className="w-10 h-10 rounded-lg object-cover bg-stone-100 shrink-0 border border-stone-200"
                              />
                              <div className="truncate">
                                <div className="font-bold text-stone-900 truncate">
                                  {item.menuItem.name}
                                </div>
                                <div className="text-[11px] text-stone-500 flex items-center gap-1.5">
                                  <span>Qty: {item.quantity}</span>
                                  {item.selectedFlavor && (
                                    <>
                                      <span>•</span>
                                      <span className="text-red-700 font-semibold">
                                        {item.selectedFlavor}
                                      </span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>

                            <span className="font-bold text-stone-900 shrink-0">
                              Rs. {item.menuItem.price * item.quantity}/-
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Address & Payment Summary */}
                      <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500 bg-stone-50/60 -mx-4 -mb-4 sm:-mx-5 sm:-mb-5 p-3 sm:p-4 rounded-b-2xl">
                        <div className="flex items-center gap-1.5 min-w-0 max-w-xs">
                          <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                          <span className="truncate">
                            {order.customer.address}, {order.customer.area.split('-')[0]}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-stone-600 font-semibold">Total:</span>
                          <span className="text-red-600 font-black text-sm">
                            Rs. {order.total}/-
                          </span>
                        </div>

                        {/* Action buttons */}
                        <div className="w-full sm:w-auto flex items-center gap-2 pt-2 sm:pt-0">
                          <button
                            onClick={() => {
                              onClose();
                              onViewSlip(order);
                            }}
                            className="flex-1 sm:flex-initial py-1.5 px-3 rounded-xl border border-stone-300 hover:bg-white text-stone-700 text-xs font-bold flex items-center justify-center gap-1 transition cursor-pointer"
                          >
                            <Receipt className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Slip</span>
                          </button>

                          <button
                            onClick={() => {
                              onClose();
                              onTrackOrder(order);
                            }}
                            className="flex-1 sm:flex-initial py-1.5 px-3 rounded-xl border border-stone-300 hover:bg-white text-stone-700 text-xs font-bold flex items-center justify-center gap-1 transition cursor-pointer"
                          >
                            <Truck className="w-3.5 h-3.5 text-amber-600" />
                            <span>Track</span>
                          </button>

                          {/* 1-Click Re-order button */}
                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            disabled={isReorderingThis}
                            onClick={() => handleReorderClick(order)}
                            className="flex-1 sm:flex-initial py-1.5 px-3.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs font-black flex items-center justify-center gap-1.5 shadow-xs cursor-pointer transition"
                          >
                            <RotateCcw className={`w-3.5 h-3.5 ${isReorderingThis ? 'animate-spin' : ''}`} />
                            <span>{isReorderingThis ? 'Re-ordering...' : '1-Click Re-order'}</span>
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Modal Footer Banner */}
            <div className="p-4 bg-white border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span className="font-semibold text-stone-700">
                  Instant re-ordering adds all items into your basket with 1 tap.
                </span>
              </div>
              <button
                onClick={onClose}
                className="text-stone-600 hover:text-stone-900 font-bold cursor-pointer"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
