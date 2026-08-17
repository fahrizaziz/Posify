export type UserRole = 'OWNER' | 'MANAGER' | 'CASHIER';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone: string;
  status: 'ACTIVE' | 'INACTIVE';
  avatarUrl?: string;
  createdAt: string;
  lastLogin?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  color: string;
  icon: string;
  productCount: number;
}

export interface ProductVariant {
  id: string;
  name: string;
  priceAdjustment: number;
}

export interface ProductVariantGroup {
  id: string;
  title: string; // e.g. "Ukuran", "Topping Tambahan"
  options: ProductVariant[];
}

export interface Product {
  id: string;
  sku: string;
  barcode: string;
  name: string;
  categoryId: string;
  hppPrice: number; // Harga Modal (HPP)
  sellPrice: number; // Harga Jual
  stock: number;
  minStockAlert: number; // default 5
  imageUrl: string;
  status: 'ACTIVE' | 'INACTIVE';
  variantGroups?: ProductVariantGroup[];
  createdAt: string;
}

export interface StockAdjustment {
  id: string;
  productId: string;
  productName: string;
  oldStock: number;
  newStock: number;
  delta: number;
  reason: string;
  adjustedBy: string;
  adjustedByRole: UserRole;
  timestamp: string;
}

export interface CartItemVariant {
  groupTitle: string;
  optionName: string;
  priceAdjustment: number;
}

export interface OrderItem {
  productId: string;
  sku: string;
  name: string;
  quantity: number;
  hppPriceSnapshot: number; // Snapshot HPP at transaction time
  sellPriceSnapshot: number; // Snapshot sell price at transaction time
  variants?: CartItemVariant[];
  subtotal: number;
}

export type TransactionStatus = 'COMPLETED' | 'VOIDED';
export type PaymentMethod = 'TUNAI' | 'QRIS' | 'TRANSFER';

export interface Transaction {
  id: string;
  invoiceNumber: string;
  timestamp: string;
  cashierId: string;
  cashierName: string;
  items: OrderItem[];
  totalHpp: number; // Sum of HPP snapshots * qty
  totalGross: number; // Sum of sell price snapshots * qty
  discount: number;
  tax: number;
  totalNet: number;
  paymentMethod: PaymentMethod;
  amountPaid: number;
  change: number;
  status: TransactionStatus;
  voidReason?: string;
  voidedBy?: string;
  voidedByRole?: UserRole;
  voidedAt?: string;
}

export interface VoidLog {
  id: string;
  transactionId: string;
  invoiceNumber: string;
  totalAmount: number;
  voidedBy: string;
  voidedByRole: UserRole;
  reason: string;
  timestamp: string;
}

export interface AuthSession {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
}
