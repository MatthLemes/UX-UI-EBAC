export type UnitType = 'un' | 'kg';

export interface Product {
  id: string;
  ean: string;
  name: string;
  category: 'merceria' | 'hortifruti' | 'laticinios' | 'padaria' | 'carnes' | 'bebidas' | 'higiene';
  brand: string;
  unitType: UnitType;
  defaultPrice: number;
  marketPrices: Record<string, number>; // marketId -> price
  promoPrice?: number;
  step?: number; // e.g., 0.1 for kg, 1 for un
  isEssential: boolean;
  imageEmoji: string;
  nutriScore?: string;
  weightDescription?: string;
  economyTip?: string;
}

export type SplitType = 'shared' | 'me' | 'roommate';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number; // units or kg
  unitPrice: number;
  subtotal: number;
  addedAt: number;
  splitType?: SplitType; // 'shared' (50/50), 'me' (100% mine), 'roommate' (100% roommate's)
}

export interface UserProfile {
  name: string;
  email: string;
  city: string;
  monthlyBudget: number;
  pixKey: string;
  roommateName: string;
  createdAt: string;
  savingsGoal: number;
}

export interface ReceiptDivergence {
  productName: string;
  shelfPrice: number;
  registerPrice: number;
  diff: number;
}

export interface ReceiptAudit {
  id: string;
  date: string;
  storeName: string;
  cnpj: string;
  nfceKey: string;
  shelfTotal: number;
  registerTotal: number;
  divergentItems: ReceiptDivergence[];
}

export interface Market {
  id: string;
  name: string;
  chain: string;
  type: 'Supermercado' | 'Hipermercado' | 'Atacarejo' | 'Bairro';
  distance: string;
  address: string;
  logoBg: string;
  colorText: string;
  hasPromoApp: boolean;
  rating: number;
}

export type KetMood = 'pensativo' | 'animado' | 'cauteloso' | 'vitorioso' | 'curioso' | 'alerta';

export type ScreenId =
  | 'onboarding'
  | 'budget_setup'
  | 'market_select'
  | 'scanner'
  | 'cart_list'
  | 'checkout_insights'
  | 'history'
  | 'profile';

export interface PlannedItem {
  id: string;
  name: string;
  category?: string;
  estimatedPrice?: number;
  checked: boolean;
  linkedCartItemId?: string;
}

export interface ShoppingTrip {
  id: string;
  date: string;
  market: Market;
  budget: number;
  items: CartItem[];
  total: number;
  savings: number;
  status: 'completed' | 'active';
}
