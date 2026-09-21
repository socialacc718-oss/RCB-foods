export type CategoryId = 
  | 'all'
  | 'deals'
  | 'paratha_rolls'
  | 'shawarma'
  | 'burgers'
  | 'fried_broast'
  | 'barbecue'
  | 'sandwiches'
  | 'chinese_rice'
  | 'biryani'
  | 'soups_noodles'
  | 'juice_bar'
  | 'shakes'
  | 'extras_drinks';

export type DietaryTag = 'All' | 'Spicy' | 'Veg' | 'Halal' | 'Crispy' | 'Chef Special';

export interface MenuItem {
  id: string;
  name: string;
  urduName?: string;
  category: CategoryId;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  popular?: boolean;
  isDeal?: boolean;
  dealHighlights?: string[];
  freeDrink?: boolean;
  flavors?: string[];
  spiceLevel?: 'Mild' | 'Medium' | 'Hot' | 'Karachi Spicy';
  dietaryTags?: DietaryTag[];
  serving?: string;
}

export interface CartItem {
  id: string; // unique item cart instance id
  menuItem: MenuItem;
  quantity: number;
  selectedFlavor?: string;
  selectedDrink?: string;
  instructions?: string;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  altPhone?: string;
  address: string;
  area: string;
  instructions?: string;
}

export type PaymentMethod = 
  | 'cod' 
  | 'jazzcash' 
  | 'easypaisa' 
  | 'sadapay' 
  | 'bank_transfer' 
  | 'card';

export type OrderStatus = 
  | 'received' 
  | 'kitchen_prep' 
  | 'quality_check' 
  | 'out_for_delivery' 
  | 'delivered';

export interface OrderTimelineStep {
  status: OrderStatus;
  title: string;
  description: string;
  timestamp: string;
  completed: boolean;
  current: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customer: CustomerDetails;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentReference?: string;
  status: OrderStatus;
  estimatedDeliveryTime: string;
  rider?: {
    name: string;
    phone: string;
    vehicle: string;
  };
}

export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  recommendedItem: string;
  verified: boolean;
}
