/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MenuItem, CartItem, Order, CustomerDetails, PaymentMethod, OrderStatus } from './types';
import { MENU_ITEMS } from './data/menuData';
import { formatWhatsAppSlip, getWhatsAppOrderUrl, openWhatsAppDirectly } from './utils/whatsappOrder';
import { SplashScreen } from './components/SplashScreen';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { DealsHighlight } from './components/DealsHighlight';
import { MenuSection } from './components/MenuSection';
import { CustomerReviews } from './components/CustomerReviews';
import { GoogleMapsLocation } from './components/GoogleMapsLocation';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WhatsAppSlipModal } from './components/WhatsAppSlipModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { PastOrdersModal } from './components/PastOrdersModal';
import { Check, Flame } from 'lucide-react';

const STORAGE_KEYS = {
  CART: 'rcb_cart_v1',
  ORDERS: 'rcb_orders_v1',
  THEME: 'rcb_theme',
};

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.THEME);
      if (saved === 'dark' || saved === 'light') return saved;
    } catch {}
    return 'light';
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSlipOpen, setIsSlipOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [isPastOrdersOpen, setIsPastOrdersOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Sync orders to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  // Apply theme class to document and sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
    } catch (e) {
      console.error(e);
    }
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Total cart counts
  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Subtotal
  const subtotal = cart.reduce(
    (total, item) => total + item.menuItem.price * item.quantity,
    0
  );

  // Delivery fee logic
  const deliveryFee = subtotal >= 2500 || subtotal === 0 ? 0 : 100;

  // Active orders (not yet delivered)
  const activeOrders = orders.filter((o) => o.status !== 'delivered');

  // Famous deals items
  const dealItems = MENU_ITEMS.filter((item) => item.isDeal);

  // Add item to cart
  const handleAddToCart = (item: MenuItem, flavor?: string, drink?: string) => {
    const existingIndex = cart.findIndex(
      (ci) =>
        ci.menuItem.id === item.id &&
        ci.selectedFlavor === flavor &&
        ci.selectedDrink === drink
    );

    if (existingIndex > -1) {
      setCart((prev) => {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      });
    } else {
      const newCartItem: CartItem = {
        id: `${item.id}-${flavor || 'default'}-${Date.now()}`,
        menuItem: item,
        quantity: 1,
        selectedFlavor: flavor,
        selectedDrink: drink,
      };
      setCart((prev) => [...prev, newCartItem]);
    }

    // Trigger toast notification
    setToastMessage(`Added "${item.name}" to cart!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 2000);
  };

  // Update item quantity
  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  // Remove single item
  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Place Order Handler
  const handleOrderPlaced = (
    customer: CustomerDetails,
    paymentMethod: PaymentMethod,
    paymentReference?: string
  ) => {
    const orderNumber = `#RCB-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-PK', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const newOrder: Order = {
      id: `order-${Date.now()}`,
      orderNumber,
      createdAt: formattedDate,
      customer,
      items: [...cart],
      subtotal,
      deliveryFee,
      discount: 0,
      total: subtotal + deliveryFee,
      paymentMethod,
      paymentReference,
      status: 'received',
      estimatedDeliveryTime: '30-40 mins',
      rider: {
        name: 'Tariq Mehmood',
        phone: '0302-1959609',
        vehicle: 'Honda 125 (ICT-5829)',
      },
    };

    // 1. Generate full formatted slip text
    const slipText = formatWhatsAppSlip(newOrder);
    const whatsappUrl = getWhatsAppOrderUrl(slipText);

    // 2. Auto-dispatch / open WhatsApp to owner number (0302-1959609)
    openWhatsAppDirectly(whatsappUrl);

    // 3. Store order, reset cart, and display digital thermal slip modal
    setOrders((prev) => [newOrder, ...prev]);
    setCurrentOrder(newOrder);
    setCart([]); // Clear cart
    setIsCheckoutOpen(false);
    setIsSlipOpen(true); // Show Digital WhatsApp Slip
  };

  // Update order status (for simulation/real-time tracking)
  const handleUpdateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord))
    );
    if (currentOrder && currentOrder.id === orderId) {
      setCurrentOrder((prev) => (prev ? { ...prev, status } : null));
    }
  };

  // Re-order past items with 1-click
  const handleReorder = (items: CartItem[]) => {
    setCart((prev) => {
      const updated = [...prev];
      items.forEach((pastItem) => {
        const existingIdx = updated.findIndex(
          (ci) =>
            ci.menuItem.id === pastItem.menuItem.id &&
            ci.selectedFlavor === pastItem.selectedFlavor &&
            ci.selectedDrink === pastItem.selectedDrink
        );
        if (existingIdx > -1) {
          updated[existingIdx].quantity += pastItem.quantity;
        } else {
          updated.push({
            ...pastItem,
            id: `${pastItem.menuItem.id}-${pastItem.selectedFlavor || 'default'}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          });
        }
      });
      return updated;
    });

    setIsPastOrdersOpen(false);
    setIsCartOpen(true);
    setToastMessage(`Re-ordered ${items.length} item${items.length > 1 ? 's' : ''}! Cart is ready.`);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Clear past orders history
  const handleClearOrdersHistory = () => {
    if (window.confirm('Clear all your stored order history?')) {
      setOrders([]);
      try {
        localStorage.removeItem(STORAGE_KEYS.ORDERS);
      } catch (e) {
        console.error(e);
      }
      setToastMessage('Past orders history cleared.');
      setTimeout(() => setToastMessage(null), 2000);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen flex flex-col selection:bg-red-600 selection:text-white relative transition-colors duration-200 ${theme === 'dark' ? 'bg-stone-950 text-stone-100 dark' : 'bg-stone-50 text-stone-900'}`}>
      {/* 3-Second Animated Splash Screen */}
      <AnimatePresence>
        {showSplash && (
          <SplashScreen onComplete={() => setShowSplash(false)} />
        )}
      </AnimatePresence>

      {/* Main Navbar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTracker={() => setIsTrackerOpen(true)}
        onOpenPastOrders={() => setIsPastOrdersOpen(true)}
        onOpenSearch={() => {
          scrollToSection('menu-section');
          const input = document.querySelector<HTMLInputElement>('input[placeholder*="Search menu"]');
          input?.focus();
        }}
        activeOrdersCount={activeOrders.length}
        pastOrdersCount={orders.length}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Hero Banner with Karachi Food Highlights */}
      <HeroBanner
        onExploreDeals={() => scrollToSection('deals-section')}
        onExploreMenu={() => scrollToSection('menu-section')}
      />

      {/* Famous 1-8 and Combo Deals Section */}
      <DealsHighlight
        deals={dealItems}
        onAddToCart={handleAddToCart}
      />

      {/* Complete Menu with Dynamic Search & Category Filter Pills */}
      <MenuSection
        items={MENU_ITEMS}
        onAddToCart={handleAddToCart}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Customer Reviews Section (8+ reviews) */}
      <CustomerReviews />

      {/* Google Maps Location & Branch Info (Shop # 3, Malik Usman Plaza, Main PWD Road Islamabad) */}
      <GoogleMapsLocation />

      {/* Footer */}
      <Footer />

      {/* Mobile Sticky Bottom Bar */}
      <MobileBottomNav
        cartCount={totalCartCount}
        subtotal={subtotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTracker={() => setIsTrackerOpen(true)}
        onOpenPastOrders={() => setIsPastOrdersOpen(true)}
        activeOrdersCount={activeOrders.length}
        pastOrdersCount={orders.length}
      />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedCheckout={() => setIsCheckoutOpen(true)}
        subtotal={subtotal}
        deliveryFee={deliveryFee}
      />

      {/* Seamless Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        subtotal={subtotal}
        deliveryFee={deliveryFee}
        onOrderPlaced={handleOrderPlaced}
      />

      {/* Digital WhatsApp Slip Modal */}
      <WhatsAppSlipModal
        order={currentOrder}
        onClose={() => setIsSlipOpen(false)}
        onTrackOrder={(order) => {
          setCurrentOrder(order);
          setIsTrackerOpen(true);
        }}
      />

      {/* Real-time Live Order Dispatch Tracker */}
      <OrderTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        orders={orders}
        activeOrder={currentOrder}
        onUpdateOrderStatus={handleUpdateOrderStatus}
      />

      {/* Past Orders History Modal with 1-Click Re-order */}
      <PastOrdersModal
        isOpen={isPastOrdersOpen}
        onClose={() => setIsPastOrdersOpen(false)}
        orders={orders}
        onReorder={handleReorder}
        onViewSlip={(order) => {
          setCurrentOrder(order);
          setIsSlipOpen(true);
        }}
        onTrackOrder={(order) => {
          setCurrentOrder(order);
          setIsTrackerOpen(true);
        }}
        onClearHistory={handleClearOrdersHistory}
      />

      {/* Interactive Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-20 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 border border-stone-700 text-xs font-bold"
          >
            <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
              <Check className="w-3.5 h-3.5" />
            </div>
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
