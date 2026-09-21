import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Order, OrderStatus } from '../types';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  ChefHat, 
  PackageCheck, 
  Truck, 
  MapPin, 
  Phone, 
  MessageCircle, 
  Sparkles,
  RefreshCw,
  HelpCircle
} from 'lucide-react';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  activeOrder: Order | null;
  onUpdateOrderStatus: (orderId: string, status: OrderStatus) => void;
}

const STEPS: { status: OrderStatus; label: string; desc: string; icon: any }[] = [
  {
    status: 'received',
    label: 'Order Confirmed',
    desc: 'Order received & slip dispatched to WhatsApp',
    icon: CheckCircle2,
  },
  {
    status: 'kitchen_prep',
    label: 'Sizzling in Kitchen',
    desc: 'Chefs are grilling fresh boti & frying broast',
    icon: ChefHat,
  },
  {
    status: 'quality_check',
    label: 'Packed with Care',
    desc: 'Packed hot with mint chutney & drinks in thermal bag',
    icon: PackageCheck,
  },
  {
    status: 'out_for_delivery',
    label: 'Rider on the Way',
    desc: 'Rider is speeding through PWD / Islamabad',
    icon: Truck,
  },
  {
    status: 'delivered',
    label: 'Delivered Hot & Fresh',
    desc: 'Enjoy your authentic Karachi meal!',
    icon: Sparkles,
  },
];

export const OrderTrackerModal = ({
  isOpen,
  onClose,
  orders,
  activeOrder,
  onUpdateOrderStatus,
}: OrderTrackerModalProps) => {
  const [selectedOrderId, setSelectedOrderId] = useState<string>(
    activeOrder?.id || (orders.length > 0 ? orders[0].id : '')
  );

  const currentOrder = orders.find((o) => o.id === selectedOrderId) || activeOrder || orders[0];

  const getStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'received': return 0;
      case 'kitchen_prep': return 1;
      case 'quality_check': return 2;
      case 'out_for_delivery': return 3;
      case 'delivered': return 4;
      default: return 0;
    }
  };

  const currentIndex = currentOrder ? getStepIndex(currentOrder.status) : 0;

  // Advance simulation step
  const handleAdvanceStep = () => {
    if (!currentOrder) return;
    const statuses: OrderStatus[] = ['received', 'kitchen_prep', 'quality_check', 'out_for_delivery', 'delivered'];
    const nextIndex = Math.min(currentIndex + 1, statuses.length - 1);
    onUpdateOrderStatus(currentOrder.id, statuses[nextIndex]);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-stone-200 my-6"
        >
          {/* Header */}
          <div className="bg-stone-900 text-white p-5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-md">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                  Live Dispatch Tracking
                </span>
                <h2 className="text-xl font-black font-display text-white">
                  Real-Time Order Tracker
                </h2>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {!currentOrder ? (
            <div className="p-8 text-center">
              <Clock className="w-12 h-12 text-stone-300 mx-auto mb-3" />
              <h3 className="font-bold text-stone-800 text-base">No Active Orders Yet</h3>
              <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto mb-4">
                Place an order from our Famous Deals or Menu to track real-time delivery status here.
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold"
              >
                Start Ordering
              </button>
            </div>
          ) : (
            <div className="p-5 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              {/* Order selector if multiple */}
              {orders.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  <span className="text-xs font-bold text-stone-500 whitespace-nowrap">Your Orders:</span>
                  {orders.map((ord) => (
                    <button
                      key={ord.id}
                      onClick={() => setSelectedOrderId(ord.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                        currentOrder.id === ord.id
                          ? 'bg-red-600 text-white'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      {ord.orderNumber}
                    </button>
                  ))}
                </div>
              )}

              {/* Status Header Box */}
              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-bold text-stone-500">
                    Order ID: <span className="text-stone-900 font-extrabold">{currentOrder.orderNumber}</span>
                  </div>
                  <div className="text-base font-black text-stone-900 mt-0.5">
                    {STEPS[currentIndex].label}
                  </div>
                  <div className="text-xs text-stone-600 mt-0.5">
                    {STEPS[currentIndex].desc}
                  </div>
                </div>

                <div className="bg-amber-100/80 border border-amber-300 rounded-xl px-3 py-2 text-right">
                  <div className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">
                    Estimated Time
                  </div>
                  <div className="text-sm font-black text-amber-950 flex items-center gap-1 justify-end">
                    <Clock className="w-3.5 h-3.5 text-amber-700" />
                    <span>{currentOrder.status === 'delivered' ? 'Completed' : '25-35 Mins'}</span>
                  </div>
                </div>
              </div>

              {/* Vertical / Stepper Timeline */}
              <div className="space-y-4 py-2 relative">
                {STEPS.map((step, idx) => {
                  const isCompleted = idx < currentIndex;
                  const isCurrent = idx === currentIndex;
                  const Icon = step.icon;

                  return (
                    <div key={step.status} className="flex items-start gap-3.5 relative">
                      {/* Connecting vertical line */}
                      {idx < STEPS.length - 1 && (
                        <div
                          className={`absolute left-4 top-8 w-0.5 h-10 ${
                            idx < currentIndex ? 'bg-emerald-500' : 'bg-stone-200'
                          }`}
                        />
                      )}

                      {/* Icon Circle */}
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors z-10 ${
                          isCompleted
                            ? 'bg-emerald-500 text-white shadow-xs'
                            : isCurrent
                            ? 'bg-red-600 text-white ring-4 ring-red-100 shadow-md animate-pulse'
                            : 'bg-stone-100 text-stone-400 border border-stone-200'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>

                      {/* Details */}
                      <div className="flex-1 pb-4">
                        <div className="flex items-center justify-between">
                          <h4
                            className={`text-xs sm:text-sm font-bold ${
                              isCurrent
                                ? 'text-red-600'
                                : isCompleted
                                ? 'text-stone-900'
                                : 'text-stone-400'
                            }`}
                          >
                            {step.label}
                          </h4>
                          {isCurrent && (
                            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-red-100 text-red-700 animate-pulse">
                              In Progress
                            </span>
                          )}
                          {isCompleted && (
                            <span className="text-[10px] font-bold text-emerald-600">
                              Completed ✓
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-stone-500 mt-0.5">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Delivery Rider Details */}
              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-700 font-black text-sm">
                      TM
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-stone-900">
                        Tariq Mehmood (RCB Delivery Partner)
                      </h4>
                      <p className="text-[11px] text-stone-500">
                        Honda 125 • Reg: ICT-5829 • Verified Rider
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                    On Duty
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-stone-200/80">
                  <a
                    href="tel:03021959609"
                    className="py-2 px-3 rounded-xl bg-white border border-stone-200 text-stone-800 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-stone-50 cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Call Hotline</span>
                  </a>
                  <a
                    href="https://wa.me/923021959609"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-3 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-emerald-700 cursor-pointer shadow-xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-white" />
                    <span>Rider WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Destination info */}
              <div className="flex items-start gap-2.5 text-xs text-stone-600 bg-white p-3 rounded-xl border border-stone-200">
                <MapPin className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900">Delivering To:</strong> {currentOrder.customer.address}, {currentOrder.customer.area}
                </div>
              </div>

              {/* Simulator Controls for customer/demo */}
              <div className="p-3 bg-stone-100 rounded-xl border border-dashed border-stone-300 text-xs space-y-2">
                <div className="flex items-center justify-between text-stone-700 font-bold">
                  <span>Interactive Live Simulator</span>
                  <span className="text-[10px] text-stone-500">Test live kitchen & rider flow</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleAdvanceStep}
                    disabled={currentOrder.status === 'delivered'}
                    className="flex-1 py-1.5 px-3 bg-stone-900 text-white rounded-lg font-bold text-xs hover:bg-red-600 disabled:opacity-50 transition cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Advance Next Status Step</span>
                  </button>
                  <button
                    onClick={() => onUpdateOrderStatus(currentOrder.id, 'received')}
                    className="py-1.5 px-3 bg-white border border-stone-300 text-stone-700 rounded-lg font-bold text-xs hover:bg-stone-50 cursor-pointer"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
