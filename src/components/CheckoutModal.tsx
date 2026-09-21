import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem, CustomerDetails, PaymentMethod } from '../types';
import { 
  X, 
  MapPin, 
  Phone, 
  User, 
  CreditCard, 
  Banknote, 
  CheckCircle2, 
  Smartphone, 
  Building2, 
  ShieldCheck,
  MessageCircle,
  FileText
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  subtotal: number;
  deliveryFee: number;
  onOrderPlaced: (customer: CustomerDetails, paymentMethod: PaymentMethod, reference?: string) => void;
}

const AREAS = [
  'PWD Housing Society - Block A',
  'PWD Housing Society - Block B',
  'PWD Housing Society - Block C',
  'PWD Main Road / Commercial',
  'Police Foundation (Sector O-9)',
  'Media Town, Islamabad',
  'Pakistan Town (Phase 1 & 2)',
  'Soan Gardens, Islamabad',
  'CBR Town, Islamabad',
  'Bahria Town Phase 1 - 3',
  'Bahria Town Phase 4 - 5',
  'River Garden / Korang Town',
  'Doctor Town, PWD',
  'Naval Anchorage, Islamabad',
  'Other Islamabad / Rawalpindi Area',
];

export const CheckoutModal = ({
  isOpen,
  onClose,
  cart,
  subtotal,
  deliveryFee,
  onOrderPlaced,
}: CheckoutModalProps) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [altPhone, setAltPhone] = useState('');
  const [address, setAddress] = useState('');
  const [area, setArea] = useState(AREAS[0]);
  const [instructions, setInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [paymentReference, setPaymentReference] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const total = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your full name');
      return;
    }
    if (!phone.trim() || phone.trim().length < 10) {
      setError('Please enter a valid Pakistani contact phone number (e.g., 0302-1234567)');
      return;
    }
    if (!address.trim()) {
      setError('Please enter your complete street and house delivery address');
      return;
    }

    setError('');
    setSubmitting(true);

    // Call onOrderPlaced immediately within user gesture to allow window.open to WhatsApp
    onOrderPlaced(
      {
        name: name.trim(),
        phone: phone.trim(),
        altPhone: altPhone.trim() || undefined,
        address: address.trim(),
        area,
        instructions: instructions.trim() || undefined,
      },
      paymentMethod,
      paymentReference.trim() || undefined
    );
    setSubmitting(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200 my-8"
          >
            {/* Modal Header */}
            <div className="bg-stone-900 text-white p-5 sm:p-6 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                  RCB FOODS • Fast Delivery
                </span>
                <h2 className="text-2xl font-black font-display tracking-tight text-white">
                  Seamless Checkout
                </h2>
                <p className="text-xs text-stone-300">
                  Fill in your delivery details to generate your WhatsApp Order Slip instantly.
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              {error && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                  {error}
                </div>
              )}

              {/* Section 1: Customer Details */}
              <div className="space-y-4">
                <h3 className="text-sm font-black uppercase tracking-wider text-stone-900 flex items-center gap-1.5 border-b pb-2">
                  <User className="w-4 h-4 text-red-600" />
                  <span>1. Contact & Customer Information</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Hamza Tariq"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      WhatsApp / Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0300-1234567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Alternate Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    placeholder="0312-9876543"
                    value={altPhone}
                    onChange={(e) => setAltPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              {/* Section 2: Delivery Address */}
              <div className="space-y-4">
                <h3 className="text-sm font-black uppercase tracking-wider text-stone-900 flex items-center gap-1.5 border-b pb-2">
                  <MapPin className="w-4 h-4 text-red-600" />
                  <span>2. Delivery Location (Islamabad & Rawalpindi)</span>
                </h3>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Select Area / Society *
                  </label>
                  <select
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm font-semibold text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-red-500"
                  >
                    {AREAS.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Street Address & House / Apartment # *
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="House # 12, Street 5, Near Bank of Punjab / Commercial Plaza..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Special Kitchen / Delivery Instructions
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Extra spicy green chutney, deliver piping hot, don't ring bell"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              {/* Section 3: Multiple Payment Gateways */}
              <div className="space-y-4">
                <h3 className="text-sm font-black uppercase tracking-wider text-stone-900 flex items-center gap-1.5 border-b pb-2">
                  <CreditCard className="w-4 h-4 text-red-600" />
                  <span>3. Payment Gateway / Method</span>
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {/* COD */}
                  <label
                    className={`p-3 rounded-xl border flex flex-col items-center text-center cursor-pointer transition ${
                      paymentMethod === 'cod'
                        ? 'border-red-600 bg-red-50/50 text-red-900 font-bold shadow-xs'
                        : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="sr-only"
                    />
                    <Banknote className="w-5 h-5 text-red-600 mb-1" />
                    <span className="text-xs">Cash on Delivery</span>
                    <span className="text-[10px] text-stone-500">Pay rider on arrival</span>
                  </label>

                  {/* JazzCash */}
                  <label
                    className={`p-3 rounded-xl border flex flex-col items-center text-center cursor-pointer transition ${
                      paymentMethod === 'jazzcash'
                        ? 'border-red-600 bg-red-50/50 text-red-900 font-bold shadow-xs'
                        : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'jazzcash'}
                      onChange={() => setPaymentMethod('jazzcash')}
                      className="sr-only"
                    />
                    <Smartphone className="w-5 h-5 text-amber-500 mb-1" />
                    <span className="text-xs">JazzCash</span>
                    <span className="text-[10px] text-stone-500">0302-1959609</span>
                  </label>

                  {/* EasyPaisa */}
                  <label
                    className={`p-3 rounded-xl border flex flex-col items-center text-center cursor-pointer transition ${
                      paymentMethod === 'easypaisa'
                        ? 'border-red-600 bg-red-50/50 text-red-900 font-bold shadow-xs'
                        : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'easypaisa'}
                      onChange={() => setPaymentMethod('easypaisa')}
                      className="sr-only"
                    />
                    <Smartphone className="w-5 h-5 text-emerald-600 mb-1" />
                    <span className="text-xs">EasyPaisa</span>
                    <span className="text-[10px] text-stone-500">0302-1959609</span>
                  </label>

                  {/* SadaPay / NayaPay */}
                  <label
                    className={`p-3 rounded-xl border flex flex-col items-center text-center cursor-pointer transition ${
                      paymentMethod === 'sadapay'
                        ? 'border-red-600 bg-red-50/50 text-red-900 font-bold shadow-xs'
                        : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'sadapay'}
                      onChange={() => setPaymentMethod('sadapay')}
                      className="sr-only"
                    />
                    <CreditCard className="w-5 h-5 text-teal-600 mb-1" />
                    <span className="text-xs">SadaPay / NayaPay</span>
                    <span className="text-[10px] text-stone-500">Instant Wallet</span>
                  </label>

                  {/* Bank Transfer */}
                  <label
                    className={`p-3 rounded-xl border flex flex-col items-center text-center cursor-pointer transition ${
                      paymentMethod === 'bank_transfer'
                        ? 'border-red-600 bg-red-50/50 text-red-900 font-bold shadow-xs'
                        : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'bank_transfer'}
                      onChange={() => setPaymentMethod('bank_transfer')}
                      className="sr-only"
                    />
                    <Building2 className="w-5 h-5 text-blue-600 mb-1" />
                    <span className="text-xs">Bank Transfer</span>
                    <span className="text-[10px] text-stone-500">BOP / Meezan Bank</span>
                  </label>

                  {/* Credit / Debit Card */}
                  <label
                    className={`p-3 rounded-xl border flex flex-col items-center text-center cursor-pointer transition ${
                      paymentMethod === 'card'
                        ? 'border-red-600 bg-red-50/50 text-red-900 font-bold shadow-xs'
                        : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="sr-only"
                    />
                    <ShieldCheck className="w-5 h-5 text-indigo-600 mb-1" />
                    <span className="text-xs">Card on Delivery</span>
                    <span className="text-[10px] text-stone-500">Rider POS Machine</span>
                  </label>
                </div>

                {/* Account Details notice if JazzCash/EasyPaisa/Bank selected */}
                {(paymentMethod === 'jazzcash' || paymentMethod === 'easypaisa') && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">
                    <p className="font-bold">
                      {paymentMethod === 'jazzcash' ? 'JazzCash' : 'EasyPaisa'} Account Info:
                    </p>
                    <p>Account Number / Title: <strong>0302-1959609</strong> (RCB FOODS / Owner)</p>
                    <p className="text-[11px] text-stone-600 mt-1">
                      You can transfer now and attach the Transaction ID (TID) below or share screenshot on WhatsApp.
                    </p>
                    <input
                      type="text"
                      placeholder="Enter Transaction ID / Reference (Optional)"
                      value={paymentReference}
                      onChange={(e) => setPaymentReference(e.target.value)}
                      className="mt-2 w-full px-3 py-1.5 bg-white border border-amber-300 rounded-lg text-xs"
                    />
                  </div>
                )}

                {paymentMethod === 'bank_transfer' && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900">
                    <p className="font-bold">Bank of Punjab / Meezan Bank Details:</p>
                    <p>Title: <strong>RCB FOODS ISLAMABAD</strong></p>
                    <p>Account / IBAN: <strong>PK22BOPB00019596090001</strong></p>
                    <p>Branch: Main PWD Road Branch, Islamabad</p>
                    <input
                      type="text"
                      placeholder="Enter Bank Transfer Reference # (Optional)"
                      value={paymentReference}
                      onChange={(e) => setPaymentReference(e.target.value)}
                      className="mt-2 w-full px-3 py-1.5 bg-white border border-blue-300 rounded-lg text-xs"
                    />
                  </div>
                )}
              </div>

              {/* Order Items Preview summary */}
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs space-y-2">
                <div className="font-bold text-stone-800 flex justify-between">
                  <span>Order Items ({cart.reduce((s, i) => s + i.quantity, 0)} total)</span>
                  <span>Rs. {subtotal}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Delivery to {area.split('-')[0]}</span>
                  <span>{deliveryFee === 0 ? 'FREE' : `Rs. ${deliveryFee}`}</span>
                </div>
                <div className="flex justify-between font-black text-stone-950 text-sm pt-2 border-t border-stone-200">
                  <span>Total Amount Payable</span>
                  <span className="text-red-600 text-base">Rs. {total}/-</span>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-black text-sm sm:text-base shadow-xl flex items-center justify-center gap-2 cursor-pointer transition"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>
                    {submitting ? 'Generating Slip...' : 'Place Order & Send Slip to WhatsApp (03021959609)'}
                  </span>
                </motion.button>
                <p className="text-center text-[11px] text-stone-500 mt-2">
                  A digital POS receipt will be generated and dispatched to the restaurant owner via WhatsApp.
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
