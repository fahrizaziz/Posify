import { User, Category, Product, Transaction, StockAdjustment, VoidLog } from '../types/posify';

export const SEED_USERS: User[] = [
  {
    id: 'usr-001',
    name: 'Budi Santoso (Owner)',
    email: 'owner@posify.dev',
    role: 'OWNER',
    phone: '081299887766',
    status: 'ACTIVE',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    createdAt: '2026-01-10T08:00:00Z',
    lastLogin: '2026-08-01T07:15:00Z'
  },
  {
    id: 'usr-002',
    name: 'Siti Rahma (Store Manager)',
    email: 'manager@posify.dev',
    role: 'MANAGER',
    phone: '081377665544',
    status: 'ACTIVE',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
    createdAt: '2026-02-01T09:30:00Z',
    lastLogin: '2026-08-01T06:45:00Z'
  },
  {
    id: 'usr-003',
    name: 'Andi Wijaya (Senior Cashier)',
    email: 'andi.cashier@posify.dev',
    role: 'CASHIER',
    phone: '081512345678',
    status: 'ACTIVE',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    createdAt: '2026-03-15T10:00:00Z',
    lastLogin: '2026-08-01T07:00:00Z'
  },
  {
    id: 'usr-004',
    name: 'Dewi Lestari (Junior Cashier)',
    email: 'dewi.cashier@posify.dev',
    role: 'CASHIER',
    phone: '081698765432',
    status: 'ACTIVE',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    createdAt: '2026-05-20T11:00:00Z',
    lastLogin: '2026-07-31T16:20:00Z'
  }
];

export const SEED_CATEGORIES: Category[] = [
  { id: 'cat-01', name: 'Kopi & Espresso', slug: 'kopi-espresso', color: '#8B5CF6', icon: 'Coffee', productCount: 6 },
  { id: 'cat-02', name: 'Non-Coffee & Boba', slug: 'non-coffee', color: '#EC4899', icon: 'CupSoda', productCount: 4 },
  { id: 'cat-03', name: 'Makanan Utama', slug: 'makanan-utama', color: '#F59E0B', icon: 'Utensils', productCount: 5 },
  { id: 'cat-04', name: 'Pastry & Dessert', slug: 'pastry-dessert', color: '#10B981', icon: 'Cake', productCount: 4 }
];

export const SEED_PRODUCTS: Product[] = [
  {
    id: 'prd-101',
    sku: 'SKU-KOP-001',
    barcode: '8991001001',
    name: 'Kopi Susu Gula Aren Signature',
    categoryId: 'cat-01',
    hppPrice: 8500,
    sellPrice: 22000,
    stock: 3, // Low stock <= 5
    minStockAlert: 5,
    imageUrl: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=300',
    status: 'ACTIVE',
    variantGroups: [
      {
        id: 'vg-size',
        title: 'Ukuran Cup',
        options: [
          { id: 'opt-reg', name: 'Regular 350ml', priceAdjustment: 0 },
          { id: 'opt-lrg', name: 'Large 500ml', priceAdjustment: 4000 }
        ]
      },
      {
        id: 'vg-shot',
        title: 'Extra Espresso Shot',
        options: [
          { id: 'opt-none', name: 'Normal Shot', priceAdjustment: 0 },
          { id: 'opt-extra', name: 'Double Shot Espresso', priceAdjustment: 5000 }
        ]
      }
    ],
    createdAt: '2026-01-15T10:00:00Z'
  },
  {
    id: 'prd-102',
    sku: 'SKU-KOP-002',
    barcode: '8991001002',
    name: 'Americano Double Shot Hot/Iced',
    categoryId: 'cat-01',
    hppPrice: 6000,
    sellPrice: 18000,
    stock: 42,
    minStockAlert: 5,
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=300',
    status: 'ACTIVE',
    variantGroups: [
      {
        id: 'vg-temp',
        title: 'Suhu',
        options: [
          { id: 'opt-iced', name: 'Iced (Dingin)', priceAdjustment: 0 },
          { id: 'opt-hot', name: 'Hot (Hangat)', priceAdjustment: 0 }
        ]
      }
    ],
    createdAt: '2026-01-15T10:30:00Z'
  },
  {
    id: 'prd-103',
    sku: 'SKU-KOP-003',
    barcode: '8991001003',
    name: 'Caramel Macchiato Creamy',
    categoryId: 'cat-01',
    hppPrice: 11000,
    sellPrice: 28000,
    stock: 25,
    minStockAlert: 5,
    imageUrl: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&q=80&w=300',
    status: 'ACTIVE',
    createdAt: '2026-02-01T08:00:00Z'
  },
  {
    id: 'prd-104',
    sku: 'SKU-NON-001',
    barcode: '8991002001',
    name: 'Matcha Latte Uji Kyoto',
    categoryId: 'cat-02',
    hppPrice: 10500,
    sellPrice: 25000,
    stock: 18,
    minStockAlert: 5,
    imageUrl: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&q=80&w=300',
    status: 'ACTIVE',
    createdAt: '2026-02-05T09:00:00Z'
  },
  {
    id: 'prd-105',
    sku: 'SKU-NON-002',
    barcode: '8991002002',
    name: 'Boba Brown Sugar Milk',
    categoryId: 'cat-02',
    hppPrice: 9000,
    sellPrice: 24000,
    stock: 4, // Low stock <= 5
    minStockAlert: 5,
    imageUrl: 'https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&q=80&w=300',
    status: 'ACTIVE',
    createdAt: '2026-02-10T11:00:00Z'
  },
  {
    id: 'prd-106',
    sku: 'SKU-MAK-001',
    barcode: '8991003001',
    name: 'Nasi Goreng Wagyu Truffle Oil',
    categoryId: 'cat-03',
    hppPrice: 22000,
    sellPrice: 48000,
    stock: 15,
    minStockAlert: 5,
    imageUrl: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=300',
    status: 'ACTIVE',
    createdAt: '2026-03-01T12:00:00Z'
  },
  {
    id: 'prd-107',
    sku: 'SKU-MAK-002',
    barcode: '8991003002',
    name: 'Spaghetti Carbonara Smoked Beef',
    categoryId: 'cat-03',
    hppPrice: 18000,
    sellPrice: 38000,
    stock: 22,
    minStockAlert: 5,
    imageUrl: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&q=80&w=300',
    status: 'ACTIVE',
    createdAt: '2026-03-05T13:00:00Z'
  },
  {
    id: 'prd-108',
    sku: 'SKU-PAS-001',
    barcode: '8991004001',
    name: 'Butter Croissant French Bakery',
    categoryId: 'cat-04',
    hppPrice: 8000,
    sellPrice: 20000,
    stock: 2, // Low stock <= 5
    minStockAlert: 5,
    imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=300',
    status: 'ACTIVE',
    createdAt: '2026-03-10T14:00:00Z'
  },
  {
    id: 'prd-109',
    sku: 'SKU-PAS-002',
    barcode: '8991004002',
    name: 'Fudgy Chocolate Brownie Bite',
    categoryId: 'cat-04',
    hppPrice: 7000,
    sellPrice: 16000,
    stock: 30,
    minStockAlert: 5,
    imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=300',
    status: 'ACTIVE',
    createdAt: '2026-03-12T15:00:00Z'
  }
];

export const SEED_TRANSACTIONS: Transaction[] = [
  {
    id: 'trx-1001',
    invoiceNumber: 'INV-20260801-001',
    timestamp: '2026-08-01T08:12:00Z',
    cashierId: 'usr-003',
    cashierName: 'Andi Wijaya',
    items: [
      {
        productId: 'prd-101',
        sku: 'SKU-KOP-001',
        name: 'Kopi Susu Gula Aren Signature',
        quantity: 2,
        hppPriceSnapshot: 8500,
        sellPriceSnapshot: 22000,
        variants: [{ groupTitle: 'Ukuran Cup', optionName: 'Large 500ml', priceAdjustment: 4000 }],
        subtotal: 52000
      },
      {
        productId: 'prd-108',
        sku: 'SKU-PAS-001',
        name: 'Butter Croissant French Bakery',
        quantity: 1,
        hppPriceSnapshot: 8000,
        sellPriceSnapshot: 20000,
        subtotal: 20000
      }
    ],
    totalHpp: 25000, // (8500*2) + (8000*1)
    totalGross: 72000,
    discount: 2000,
    tax: 7000,
    totalNet: 77000,
    paymentMethod: 'QRIS',
    amountPaid: 77000,
    change: 0,
    status: 'COMPLETED'
  },
  {
    id: 'trx-1002',
    invoiceNumber: 'INV-20260801-002',
    timestamp: '2026-08-01T09:05:00Z',
    cashierId: 'usr-003',
    cashierName: 'Andi Wijaya',
    items: [
      {
        productId: 'prd-106',
        sku: 'SKU-MAK-001',
        name: 'Nasi Goreng Wagyu Truffle Oil',
        quantity: 1,
        hppPriceSnapshot: 22000,
        sellPriceSnapshot: 48000,
        subtotal: 48000
      },
      {
        productId: 'prd-102',
        sku: 'SKU-KOP-002',
        name: 'Americano Double Shot Hot/Iced',
        quantity: 1,
        hppPriceSnapshot: 6000,
        sellPriceSnapshot: 18000,
        subtotal: 18000
      }
    ],
    totalHpp: 28000,
    totalGross: 66000,
    discount: 0,
    tax: 6600,
    totalNet: 72600,
    paymentMethod: 'TUNAI',
    amountPaid: 100000,
    change: 27400,
    status: 'COMPLETED'
  },
  {
    id: 'trx-1003',
    invoiceNumber: 'INV-20260801-003',
    timestamp: '2026-08-01T09:40:00Z',
    cashierId: 'usr-004',
    cashierName: 'Dewi Lestari',
    items: [
      {
        productId: 'prd-104',
        sku: 'SKU-NON-001',
        name: 'Matcha Latte Uji Kyoto',
        quantity: 2,
        hppPriceSnapshot: 10500,
        sellPriceSnapshot: 25000,
        subtotal: 50000
      }
    ],
    totalHpp: 21000,
    totalGross: 50000,
    discount: 5000,
    tax: 4500,
    totalNet: 49500,
    paymentMethod: 'TRANSFER',
    amountPaid: 49500,
    change: 0,
    status: 'COMPLETED'
  },
  {
    id: 'trx-1004',
    invoiceNumber: 'INV-20260801-004',
    timestamp: '2026-08-01T10:15:00Z',
    cashierId: 'usr-004',
    cashierName: 'Dewi Lestari',
    items: [
      {
        productId: 'prd-105',
        sku: 'SKU-NON-002',
        name: 'Boba Brown Sugar Milk',
        quantity: 1,
        hppPriceSnapshot: 9000,
        sellPriceSnapshot: 24000,
        subtotal: 24000
      }
    ],
    totalHpp: 9000,
    totalGross: 24000,
    discount: 0,
    tax: 2400,
    totalNet: 26400,
    paymentMethod: 'TUNAI',
    amountPaid: 50000,
    change: 23600,
    status: 'VOIDED',
    voidReason: 'Pelanggan membatalkan pesanan karena salah pilih varian gula',
    voidedBy: 'Siti Rahma (Store Manager)',
    voidedByRole: 'MANAGER',
    voidedAt: '2026-08-01T10:20:00Z'
  },
  {
    id: 'trx-1005',
    invoiceNumber: 'INV-20260731-088',
    timestamp: '2026-07-31T18:30:00Z',
    cashierId: 'usr-003',
    cashierName: 'Andi Wijaya',
    items: [
      {
        productId: 'prd-103',
        sku: 'SKU-KOP-003',
        name: 'Caramel Macchiato Creamy',
        quantity: 3,
        hppPriceSnapshot: 11000,
        sellPriceSnapshot: 28000,
        subtotal: 84000
      },
      {
        productId: 'prd-107',
        sku: 'SKU-MAK-002',
        name: 'Spaghetti Carbonara Smoked Beef',
        quantity: 2,
        hppPriceSnapshot: 18000,
        sellPriceSnapshot: 38000,
        subtotal: 76000
      }
    ],
    totalHpp: 69000,
    totalGross: 160000,
    discount: 10000,
    tax: 15000,
    totalNet: 165000,
    paymentMethod: 'QRIS',
    amountPaid: 165000,
    change: 0,
    status: 'COMPLETED'
  }
];

export const SEED_STOCK_ADJUSTMENTS: StockAdjustment[] = [
  {
    id: 'adj-01',
    productId: 'prd-101',
    productName: 'Kopi Susu Gula Aren Signature',
    oldStock: 10,
    newStock: 3,
    delta: -7,
    reason: 'Stock Opname Fisik - Penyesuaian Penggunaan Bahan Baku Shift Pagi',
    adjustedBy: 'Siti Rahma (Store Manager)',
    adjustedByRole: 'MANAGER',
    timestamp: '2026-08-01T07:30:00Z'
  },
  {
    id: 'adj-02',
    productId: 'prd-108',
    productName: 'Butter Croissant French Bakery',
    oldStock: 12,
    newStock: 2,
    delta: -10,
    reason: 'Restock Terjual & Expiry Date Check',
    adjustedBy: 'Budi Santoso (Owner)',
    adjustedByRole: 'OWNER',
    timestamp: '2026-07-31T20:00:00Z'
  }
];

export const SEED_VOID_LOGS: VoidLog[] = [
  {
    id: 'vlog-01',
    transactionId: 'trx-1004',
    invoiceNumber: 'INV-20260801-004',
    totalAmount: 26400,
    voidedBy: 'Siti Rahma (Store Manager)',
    voidedByRole: 'MANAGER',
    reason: 'Pelanggan membatalkan pesanan karena salah pilih varian gula',
    timestamp: '2026-08-01T10:20:00Z'
  }
];

export interface SalesTrendPoint {
  label: string;
  revenue: number;
  hpp: number;
  profit: number;
  count: number;
}

// Sales Analytics Trend Data for Recharts
export const SALES_TREND_DAILY: SalesTrendPoint[] = [
  { label: '08:00', revenue: 150000, hpp: 52000, profit: 98000, count: 3 },
  { label: '10:00', revenue: 280000, hpp: 95000, profit: 185000, count: 6 },
  { label: '12:00', revenue: 540000, hpp: 190000, profit: 350000, count: 12 },
  { label: '14:00', revenue: 420000, hpp: 145000, profit: 275000, count: 9 },
  { label: '16:00', revenue: 610000, hpp: 210000, profit: 400000, count: 14 },
  { label: '18:00', revenue: 890000, hpp: 310000, profit: 580000, count: 20 },
  { label: '20:00', revenue: 730000, hpp: 250000, profit: 480000, count: 16 }
];

export const SALES_TREND_WEEKLY: SalesTrendPoint[] = [
  { label: 'Senin', revenue: 2850000, hpp: 980000, profit: 1870000, count: 62 },
  { label: 'Selasa', revenue: 3120000, hpp: 1050000, profit: 2070000, count: 71 },
  { label: 'Rabu', revenue: 2980000, hpp: 1010000, profit: 1970000, count: 65 },
  { label: 'Kamis', revenue: 3450000, hpp: 1180000, profit: 2270000, count: 78 },
  { label: 'Jumat', revenue: 4820000, hpp: 1620000, profit: 3200000, count: 104 },
  { label: 'Sabtu', revenue: 6200000, hpp: 2100000, profit: 4100000, count: 142 },
  { label: 'Minggu', revenue: 5750000, hpp: 1950000, profit: 3800000, count: 128 }
];

export const SALES_TREND_MONTHLY: SalesTrendPoint[] = [
  { label: 'Minggu 1', revenue: 21500000, hpp: 7400000, profit: 14100000, count: 480 },
  { label: 'Minggu 2', revenue: 24800000, hpp: 8300000, profit: 16500000, count: 540 },
  { label: 'Minggu 3', revenue: 23200000, hpp: 7800000, profit: 15400000, count: 510 },
  { label: 'Minggu 4', revenue: 29100000, hpp: 9900000, profit: 19200000, count: 630 }
];
