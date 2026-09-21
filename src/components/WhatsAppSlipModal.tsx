import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Order } from '../types';
import { formatWhatsAppSlip, getWhatsAppOrderUrl, OWNER_PHONE_DISPLAY } from '../utils/whatsappOrder';
import { 
  X, 
  MessageCircle, 
  Printer, 
  Copy, 
  Check, 
  Truck, 
  Receipt, 
  Flame,
  Clock,
  MapPin,
  Phone,
  Send
} from 'lucide-react';

interface WhatsAppSlipModalProps {
  order: Order | null;
  onClose: () => void;
  onTrackOrder: (order: Order) => void;
}

export const WhatsAppSlipModal = ({
  order,
  onClose,
  onTrackOrder,
}: WhatsAppSlipModalProps) => {
  const [copied, setCopied] = useState(false);

  // Generate clean formatted WhatsApp text
  const whatsappText = useMemo(() => {
    if (!order) return '';
    return formatWhatsAppSlip(order);
  }, [order]);

  if (!order) return null;

  const whatsappUrl = getWhatsAppOrderUrl(whatsappText);

  const handleCopy = () => {
    navigator.clipboard.writeText(whatsappText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 my-6"
        >
          {/* Header Action Banner */}
          <div className="bg-emerald-600 text-white p-4 sm:p-5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center">
                <Receipt className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-100">
                  Order Successfully Created
                </span>
                <h2 className="text-xl font-black font-display leading-tight">Digital Order Slip</h2>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-emerald-100 hover:text-white hover:bg-emerald-700 transition cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* WhatsApp Auto-Dispatch Status Notification */}
          <div className="bg-emerald-50 border-b border-emerald-200 px-4 py-2.5 sm:px-6 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-emerald-900 font-semibold">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
              </span>
              <span>Slip Auto-Sent to Owner's WhatsApp (0302-1959609)</span>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:text-emerald-900 font-black underline flex items-center gap-1"
            >
              <span>Tap to Open</span>
              <Send className="w-3 h-3" />
            </a>
          </div>

          {/* Thermal Receipt Body */}
          <div className="p-5 sm:p-6 bg-stone-100/70 max-h-[60vh] overflow-y-auto">
            <div 
              id="printable-receipt"
              className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-stone-200/90 font-mono text-xs text-stone-800 space-y-3 relative"
            >
              {/* Receipt Header */}
              <div className="text-center pb-3 border-b-2 border-dashed border-stone-300">
                <div className="flex items-center justify-center gap-1 text-red-600 font-bold mb-0.5">
                  <Flame className="w-4 h-4 fill-red-600" />
                  <span className="font-heading text-2xl tracking-wider text-stone-900">RCB FOODS</span>
                </div>
                <p className="text-[10px] text-stone-500 uppercase tracking-widest font-semibold">
                  Karachi Ultimate Food Stop
                </p>
                <p className="text-[10px] text-stone-500">
                  Shop # 3, Malik Usman Plaza, Main PWD Road Islamabad
                </p>
                <p className="text-[10px] text-stone-600 font-bold mt-1">
                  📞 0302-1959609 • 0315-6987822
                </p>
              </div>

              {/* Order Meta */}
              <div className="flex justify-between text-[11px] py-1 border-b border-stone-200">
                <span>ORDER #: <strong className="text-red-600">{order.orderNumber}</strong></span>
                <span>{order.createdAt}</span>
              </div>

              {/* Customer Info */}
              <div className="py-1 text-[11px] space-y-0.5 border-b border-stone-200">
                <div><strong>Customer:</strong> {order.customer.name}</div>
                <div><strong>Phone:</strong> {order.customer.phone}</div>
                <div><strong>Address:</strong> {order.customer.address}</div>
                <div><strong>Area:</strong> {order.customer.area}</div>
                <div>
                  <strong>Payment:</strong>{' '}
                  <span className="uppercase text-emerald-700 font-bold">
                    {order.paymentMethod}
                  </span>
                </div>
                {order.paymentReference && (
                  <div><strong>TID / Ref:</strong> {order.paymentReference}</div>
                )}
                {order.customer.instructions && (
                  <div className="text-stone-600 italic">
                    <strong>Note:</strong> &quot;{order.customer.instructions}&quot;
                  </div>
                )}
              </div>

              {/* Items Table */}
              <div className="pt-2">
                <div className="flex justify-between font-bold text-[10px] uppercase text-stone-500 border-b pb-1">
                  <span>Item Description</span>
                  <span>Amount</span>
                </div>
                <div className="divide-y divide-stone-100 py-1 space-y-1">
                  {order.items.map((item) => (
                    <div key={item.id} className="pt-1">
                      <div className="flex justify-between items-start">
                        <span className="font-semibold text-stone-900">
                          {item.menuItem.name} x {item.quantity}
                        </span>
                        <span className="font-bold text-stone-900">
                          Rs. {item.menuItem.price * item.quantity}
                        </span>
                      </div>
                      {item.selectedFlavor && (
                        <div className="text-[10px] text-red-700">
                          ↳ {item.selectedFlavor}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Calculations */}
              <div className="pt-2 border-t-2 border-dashed border-stone-300 space-y-1 text-right">
                <div className="flex justify-between text-[11px]">
                  <span>Subtotal:</span>
                  <span>Rs. {order.subtotal}/-</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span>Delivery Charges:</span>
                  <span>{order.deliveryFee === 0 ? 'FREE' : `Rs. ${order.deliveryFee}/-`}</span>
                </div>
                <div className="flex justify-between text-base font-black text-stone-900 pt-1 border-t border-stone-300">
                  <span>GRAND TOTAL:</span>
                  <span className="text-red-600">Rs. {order.total}/-</span>
                </div>
              </div>

              {/* Barcode representation */}
              <div className="text-center pt-3 pb-1 border-t border-stone-200">
                <div className="font-mono text-[9px] tracking-widest text-stone-400">
                  ||| | | |||| | ||||| || ||| | |||| |||
                </div>
                <p className="text-[10px] text-stone-500 mt-1">
                  Thank You for Ordering with RCB FOODS!
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-4 sm:p-5 bg-white border-t border-stone-200 space-y-2.5">
            {/* Direct WhatsApp Send CTA */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>Send Order Slip to WhatsApp (0302-1959609)</span>
            </a>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleCopy}
                className="py-2.5 px-3 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-700 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-600">Copied Slip!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Slip Text</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  onClose();
                  onTrackOrder(order);
                }}
                className="py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shadow-xs"
              >
                <Truck className="w-4 h-4" />
                <span>Track Order Live</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
