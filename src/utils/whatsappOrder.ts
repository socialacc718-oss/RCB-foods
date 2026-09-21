import { Order, PaymentMethod } from '../types';

export const OWNER_WHATSAPP_NUMBER = '923021959609';
export const OWNER_PHONE_DISPLAY = '0302-1959609';

export const formatWhatsAppSlip = (
  order: Pick<
    Order,
    | 'orderNumber'
    | 'createdAt'
    | 'customer'
    | 'items'
    | 'subtotal'
    | 'deliveryFee'
    | 'total'
    | 'paymentMethod'
    | 'paymentReference'
  >
): string => {
  const itemsText = order.items
    .map(
      (item, index) =>
        `${index + 1}. *${item.menuItem.name}* x ${item.quantity} = Rs. ${
          item.menuItem.price * item.quantity
        }/-${item.selectedFlavor ? `\n   ↳ Flavor: ${item.selectedFlavor}` : ''}`
    )
    .join('\n');

  const paymentLabel: Record<PaymentMethod, string> = {
    cod: 'Cash on Delivery (COD)',
    jazzcash: 'JazzCash Transfer (0302-1959609)',
    easypaisa: 'EasyPaisa Transfer (0302-1959609)',
    sadapay: 'SadaPay / NayaPay',
    bank_transfer: 'Bank Transfer (BOP/Meezan)',
    card: 'Card on Delivery',
  };

  return `🔥 *NEW ORDER - RCB FOODS* 🔥
━━━━━━━━━━━━━━━━━━━━
*Order ID:* ${order.orderNumber}
*Date & Time:* ${order.createdAt}

👤 *CUSTOMER DETAILS:*
• *Name:* ${order.customer.name}
• *Phone:* ${order.customer.phone}${
    order.customer.altPhone ? `\n• *Alt Phone:* ${order.customer.altPhone}` : ''
  }
• *Address:* ${order.customer.address}
• *Area:* ${order.customer.area}
• *Payment:* ${paymentLabel[order.paymentMethod] || order.paymentMethod}${
    order.paymentReference ? `\n• *Ref / TID:* ${order.paymentReference}` : ''
  }

🛒 *ORDERED ITEMS:*
${itemsText}

━━━━━━━━━━━━━━━━━━━━
*Subtotal:* Rs. ${order.subtotal}/-
*Delivery Fee:* ${order.deliveryFee === 0 ? 'FREE' : `Rs. ${order.deliveryFee}/-`}
*GRAND TOTAL:* Rs. ${order.total}/-
━━━━━━━━━━━━━━━━━━━━
${order.customer.instructions ? `📝 *Special Notes:* ${order.customer.instructions}\n` : ''}
📍 *Restaurant:* RCB FOODS, Main PWD Road, Islamabad
🌐 _Order placed via RCB FOODS Digital Order Portal_`;
};

export const getWhatsAppOrderUrl = (slipText: string): string => {
  return `https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${encodeURIComponent(slipText)}`;
};

export const openWhatsAppDirectly = (url: string) => {
  try {
    // 1. Direct window.open attempt
    const win = window.open(url, '_blank', 'noopener,noreferrer');
    if (!win || win.closed || typeof win.closed === 'undefined') {
      // 2. Simulated link click fallback
      const a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        if (document.body.contains(a)) {
          document.body.removeChild(a);
        }
      }, 500);
    }
  } catch (err) {
    console.error('Auto open WhatsApp error:', err);
  }
};
