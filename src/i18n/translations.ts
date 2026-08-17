export type Language = 'id' | 'en';
export type LanguageMode = 'system' | 'id' | 'en';

export const detectSystemLanguage = (): Language => {
  if (typeof window === 'undefined' || !window.navigator) return 'id';
  const navLang = (
    window.navigator.language || 
    (window.navigator.languages && window.navigator.languages[0]) || 
    ''
  ).toLowerCase();
  
  // Jika bahasa browser diawali dengan 'id' (misal: 'id', 'id-ID') gunakan Indonesia
  if (navLang.startsWith('id')) {
    return 'id';
  }
  // Default fallback untuk browser bahasa lain (Inggris, dsb)
  return 'en';
};

export interface Translations {
  // Common & Navigation
  appName: string;
  adminSubtitle: string;
  dashboard: string;
  inventory: string;
  transactions: string;
  analytics: string;
  users: string;
  logout: string;
  profile: string;
  save: string;
  cancel: string;
  delete: string;
  edit: string;
  add: string;
  search: string;
  filter: string;
  export: string;
  status: string;
  active: string;
  inactive: string;
  allOutlets: string;
  centralBranch: string;
  westBranch: string;
  southHub: string;
  role: string;
  owner: string;
  manager: string;
  inventoryStaff: string;
  cashier: string;
  theme: string;
  themeLight: string;
  themeSystem: string;
  themeDark: string;
  language: string;
  langAuto: string;
  langIndonesian: string;
  langEnglish: string;
  
  // Login Page
  loginTitle: string;
  loginSubtitle: string;
  loginCardHeading: string;
  loginCardSubheading: string;
  emailLabel: string;
  passwordLabel: string;
  outletLabel: string;
  loginButton: string;
  loggingIn: string;
  quickDemoAccount: string;
  jwtGenerated: string;
  jwtExpires: string;
  featureMultiOutletTitle: string;
  featureMultiOutletDesc: string;
  featureAbacTitle: string;
  featureAbacDesc: string;
  featureThemeTitle: string;
  featureThemeDesc: string;
  badgeEnterprise: string;
  
  // Dashboard Module
  todayRevenue: string;
  todayTransactions: string;
  lowStockWarning: string;
  todayNetProfit: string;
  hiddenForRole: string;
  salesTrend: string;
  daily: string;
  weekly: string;
  monthly: string;
  topSellingProducts: string;
  itemsSold: string;
  revenueGenerated: string;
  viewAllInventory: string;
  viewAllTransactions: string;
  growthComparison: string;
  
  // Inventory Module
  masterProducts: string;
  categories: string;
  stockAdjustment: string;
  interOutletTransfer: string;
  bulkImport: string;
  addProduct: string;
  productName: string;
  sku: string;
  barcode: string;
  hppPrice: string;
  sellPrice: string;
  stock: string;
  minStock: string;
  category: string;
  actions: string;
  stockStatus: string;
  inStock: string;
  outOfStock: string;
  restockNow: string;
  importExcelTitle: string;
  downloadTemplate: string;
  
  // Transactions & Void
  invoiceNumber: string;
  dateTime: string;
  cashierName: string;
  totalAmount: string;
  paymentMethod: string;
  completed: string;
  voided: string;
  voidTransaction: string;
  reprintReceipt: string;
  centralVoidCenter: string;
  voidReasonPrompt: string;
  voidSuccess: string;
  filterByDate: string;
  filterByOutlet: string;
  filterByCashier: string;
  
  // Analytics Module
  salesReport: string;
  exportExcel: string;
  exportPdf: string;
  totalGrossSales: string;
  totalNetSales: string;
  totalHppCost: string;
  paymentBreakdown: string;
  cash: string;
  qris: string;
  transfer: string;
  
  // User Management Module
  userManagementTitle: string;
  addNewStaff: string;
  employeeName: string;
  assignedOutlet: string;
  forceResetPassword: string;
  deactivateAccount: string;
  activateAccount: string;
  
  // Security & Toast
  toastLoginSuccess: string;
  toastLoggedOut: string;
  toastThemeChanged: string;
  toastLangChanged: string;
  toastLangAuto: string;
}

export const translations: Record<Language, Translations> = {
  id: {
    // Common & Navigation
    appName: 'Posify',
    adminSubtitle: 'Web Admin',
    dashboard: 'Dashboard',
    inventory: 'Inventaris & Produk',
    transactions: 'Transaksi & Audit',
    analytics: 'Analitik & Laporan',
    users: 'Karyawan & Cabang',
    logout: 'Keluar',
    profile: 'Profil Saya',
    save: 'Simpan',
    cancel: 'Batal',
    delete: 'Hapus',
    edit: 'Ubah',
    add: 'Tambah Baru',
    search: 'Cari data...',
    filter: 'Filter',
    export: 'Ekspor Data',
    status: 'Status',
    active: 'Aktif',
    inactive: 'Nonaktif',
    allOutlets: 'Semua Cabang (Global)',
    centralBranch: 'Posify Central Jakarta',
    westBranch: 'Posify West Branch',
    southHub: 'Posify South Hub',
    role: 'Peran Akun',
    owner: 'Owner (Pemilik)',
    manager: 'Manager (Pengelola)',
    inventoryStaff: 'Staf Gudang',
    cashier: 'Kasir',
    theme: 'Tema',
    themeLight: 'Terang',
    themeSystem: 'Perangkat',
    themeDark: 'Gelap',
    language: 'Bahasa',
    langAuto: 'Auto Sistem',
    langIndonesian: 'Bahasa Indonesia',
    langEnglish: 'English',

    // Login Page
    loginTitle: 'Posify POS Executive Engine',
    loginSubtitle: 'Sistem Manajemen POS Multi-Outlet Enterprise dengan Keamanan Terenkripsi JWT Access Token & Otorisasi Ketat ABAC/RBAC CASL.',
    loginCardHeading: 'Login Autentikasi Posify',
    loginCardSubheading: 'Masukkan kredensial akun untuk masuk ke dashboard web admin',
    emailLabel: 'Alamat Email',
    passwordLabel: 'Password Kredensial',
    outletLabel: 'Pilih Cabang / Outlet Tugas',
    loginButton: 'Masuk ke Web Admin',
    loggingIn: 'Mengautentikasi JWT...',
    quickDemoAccount: 'Pilih Akun Demo (Quick Role Preset):',
    jwtGenerated: 'JWT Access Token Diterbitkan',
    jwtExpires: 'Masa Berlaku: 24 Jam',
    featureMultiOutletTitle: 'Multi-Outlet Konsolidasi',
    featureMultiOutletDesc: 'Akses terpadu lintas cabang untuk Owner dengan sinkronisasi omzet & stok real-time.',
    featureAbacTitle: 'Keamanan ABAC & RBAC CASL',
    featureAbacDesc: 'Aturan otorisasi pembatalan void & proteksi data HPP modal khusus level Executive.',
    featureThemeTitle: 'Tema Adaptif & Multi-Bahasa',
    featureThemeDesc: 'Mendukung Mode Terang, Gelap, Sistem Perangkat, serta Pilihan Bahasa Indonesia & English.',
    badgeEnterprise: 'Posify Enterprise Web Admin M-1.1',

    // Dashboard Module
    todayRevenue: 'Omzet Hari Ini',
    todayTransactions: 'Total Transaksi Hari Ini',
    lowStockWarning: 'Peringatan Stok Menipis',
    todayNetProfit: 'Total Profit Bersih',
    hiddenForRole: 'Khusus Owner (HPP Diproteksi)',
    salesTrend: 'Grafik Tren Penjualan',
    daily: 'Harian',
    weekly: 'Mingguan',
    monthly: 'Bulanan',
    topSellingProducts: '5 Produk Terlaris Hari Ini',
    itemsSold: 'Item Terjual',
    revenueGenerated: 'Total Pendapatan',
    viewAllInventory: 'Buka Modul Inventaris',
    viewAllTransactions: 'Lihat Semua Transaksi',
    growthComparison: 'vs. periode sebelumnya',

    // Inventory Module
    masterProducts: 'Katalog Master Produk',
    categories: 'Kategori Produk',
    stockAdjustment: 'Penyesuaian Stok (Stock Opname)',
    interOutletTransfer: 'Transfer Stok Antar-Cabang',
    bulkImport: 'Import Massal Excel (.xlsx)',
    addProduct: 'Tambah Produk Baru',
    productName: 'Nama Produk',
    sku: 'SKU / Barcode',
    barcode: 'Barcode',
    hppPrice: 'Harga Modal (HPP)',
    sellPrice: 'Harga Jual',
    stock: 'Jumlah Stok',
    minStock: 'Batas Stok Minimum',
    category: 'Kategori',
    actions: 'Aksi',
    stockStatus: 'Status Stok',
    inStock: 'Tersedia',
    outOfStock: 'Habis',
    restockNow: 'Restock Segera',
    importExcelTitle: 'Unggah File Excel Katalog',
    downloadTemplate: 'Unduh Template Excel',

    // Transactions & Void
    invoiceNumber: 'No. Faktur / Invoice',
    dateTime: 'Waktu Transaksi',
    cashierName: 'Nama Kasir',
    totalAmount: 'Total Pembayaran',
    paymentMethod: 'Metode Bayar',
    completed: 'Selesai (Completed)',
    voided: 'Dibatalkan (Voided)',
    voidTransaction: 'Void Transaksi',
    reprintReceipt: 'Cetak Ulang Struk',
    centralVoidCenter: 'Central Void Center (Executive)',
    voidReasonPrompt: 'Masukkan alasan resmi pembatalan transaksi:',
    voidSuccess: 'Transaksi berhasil di-void dan stok telah dipulihkan otomatis!',
    filterByDate: 'Rentang Tanggal',
    filterByOutlet: 'Filter Outlet',
    filterByCashier: 'Filter Kasir',

    // Analytics Module
    salesReport: 'Laporan Penjualan & Performa Keuangan',
    exportExcel: 'Ekspor ke Excel (.xlsx)',
    exportPdf: 'Cetak Dokumen PDF',
    totalGrossSales: 'Total Omzet Kotor',
    totalNetSales: 'Total Omzet Bersih',
    totalHppCost: 'Total Beban Pokok (HPP)',
    paymentBreakdown: 'Distribusi Metode Pembayaran',
    cash: 'Tunai',
    qris: 'QRIS Dinamis',
    transfer: 'Transfer Bank',

    // User Management Module
    userManagementTitle: 'Manajemen Karyawan & Hak Akses Outlet',
    addNewStaff: 'Tambah Karyawan Baru',
    employeeName: 'Nama Karyawan',
    assignedOutlet: 'Outlet Bertugas',
    forceResetPassword: 'Paksa Reset Password',
    deactivateAccount: 'Nonaktifkan Akun',
    activateAccount: 'Aktifkan Akun',

    // Security & Toast
    toastLoginSuccess: 'Login berhasil sebagai',
    toastLoggedOut: 'Sesi keluar. Silakan login kembali pada Halaman Login M-1.1.',
    toastThemeChanged: 'Tema diubah ke:',
    toastLangChanged: 'Bahasa diubah ke Bahasa Indonesia',
    toastLangAuto: 'Bahasa otomatis mengikuti sistem browser'
  },
  en: {
    // Common & Navigation
    appName: 'Posify',
    adminSubtitle: 'Web Admin',
    dashboard: 'Dashboard',
    inventory: 'Inventory & Products',
    transactions: 'Transactions & Audit',
    analytics: 'Analytics & Reports',
    users: 'Staff & Outlets',
    logout: 'Sign Out',
    profile: 'My Profile',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    add: 'Add New',
    search: 'Search data...',
    filter: 'Filter',
    export: 'Export Data',
    status: 'Status',
    active: 'Active',
    inactive: 'Inactive',
    allOutlets: 'All Outlets (Global Scope)',
    centralBranch: 'Posify Central Jakarta',
    westBranch: 'Posify West Branch',
    southHub: 'Posify South Hub',
    role: 'User Role',
    owner: 'Owner (Executive)',
    manager: 'Manager (Branch Ops)',
    inventoryStaff: 'Inventory Staff',
    cashier: 'Cashier',
    theme: 'Theme',
    themeLight: 'Light',
    themeSystem: 'Device',
    themeDark: 'Dark',
    language: 'Language',
    langAuto: 'Auto System',
    langIndonesian: 'Bahasa Indonesia',
    langEnglish: 'English',

    // Login Page
    loginTitle: 'Posify POS Executive Engine',
    loginSubtitle: 'Enterprise Multi-Outlet POS Management System with Encrypted JWT Access Tokens & Strict CASL ABAC/RBAC Authorization.',
    loginCardHeading: 'Posify Authentication Login',
    loginCardSubheading: 'Enter your credentials to access the executive web admin dashboard',
    emailLabel: 'Email Address',
    passwordLabel: 'Account Password',
    outletLabel: 'Select Assigned Branch / Outlet',
    loginButton: 'Sign In to Web Admin',
    loggingIn: 'Authenticating JWT Token...',
    quickDemoAccount: 'Select Demo Account (Quick Role Preset):',
    jwtGenerated: 'JWT Access Token Issued',
    jwtExpires: 'Validity: 24 Hours',
    featureMultiOutletTitle: 'Consolidated Multi-Outlet',
    featureMultiOutletDesc: 'Unified cross-branch access for Owners with real-time revenue & inventory synchronization.',
    featureAbacTitle: 'CASL ABAC & RBAC Security',
    featureAbacDesc: 'Strict void authorization constraints & COGS/HPP profit margin data protection for Executive tier.',
    featureThemeTitle: 'Adaptive Themes & Bilingual',
    featureThemeDesc: 'Supports Light, Dark, Auto Device Sync, alongside full Indonesian and English language support.',
    badgeEnterprise: 'Posify Enterprise Web Admin M-1.1',

    // Dashboard Module
    todayRevenue: "Today's Revenue",
    todayTransactions: "Today's Total Transactions",
    lowStockWarning: 'Low Stock Alerts',
    todayNetProfit: 'Net Profit (COGS Subtracted)',
    hiddenForRole: 'Owner Only (COGS Protected)',
    salesTrend: 'Sales Trend Analytics',
    daily: 'Daily',
    weekly: 'Weekly',
    monthly: 'Monthly',
    topSellingProducts: 'Top 5 Best-Selling Products Today',
    itemsSold: 'Units Sold',
    revenueGenerated: 'Total Revenue',
    viewAllInventory: 'Open Inventory Module',
    viewAllTransactions: 'View All Transactions',
    growthComparison: 'vs. previous period',

    // Inventory Module
    masterProducts: 'Master Product Catalog',
    categories: 'Product Categories',
    stockAdjustment: 'Stock Opname & Adjustment',
    interOutletTransfer: 'Inter-Outlet Stock Transfer',
    bulkImport: 'Bulk Import via Excel (.xlsx)',
    addProduct: 'Add New Product',
    productName: 'Product Name',
    sku: 'SKU / Barcode',
    barcode: 'Barcode',
    hppPrice: 'Cost of Goods (COGS/HPP)',
    sellPrice: 'Selling Price',
    stock: 'Stock Quantity',
    minStock: 'Minimum Alert Threshold',
    category: 'Category',
    actions: 'Actions',
    stockStatus: 'Stock Status',
    inStock: 'In Stock',
    outOfStock: 'Out of Stock',
    restockNow: 'Restock Now',
    importExcelTitle: 'Upload Excel Product Catalog',
    downloadTemplate: 'Download Excel Template',

    // Transactions & Void
    invoiceNumber: 'Invoice Number',
    dateTime: 'Transaction Date & Time',
    cashierName: 'Cashier Name',
    totalAmount: 'Total Billed',
    paymentMethod: 'Payment Method',
    completed: 'Completed',
    voided: 'Voided',
    voidTransaction: 'Void Transaction',
    reprintReceipt: 'Reprint Receipt',
    centralVoidCenter: 'Central Void Center (Executive)',
    voidReasonPrompt: 'Please provide official transaction void reason:',
    voidSuccess: 'Transaction successfully voided and stock restored automatically!',
    filterByDate: 'Date Range',
    filterByOutlet: 'Filter by Outlet',
    filterByCashier: 'Filter by Cashier',

    // Analytics Module
    salesReport: 'Sales Performance & Financial Reporting',
    exportExcel: 'Export to Excel (.xlsx)',
    exportPdf: 'Print PDF Document',
    totalGrossSales: 'Total Gross Sales',
    totalNetSales: 'Total Net Sales',
    totalHppCost: 'Total Cost of Goods (COGS)',
    paymentBreakdown: 'Payment Method Breakdown',
    cash: 'Cash',
    qris: 'Dynamic QRIS',
    transfer: 'Bank Transfer',

    // User Management Module
    userManagementTitle: 'Staff & Multi-Outlet Access Management',
    addNewStaff: 'Add New Employee',
    employeeName: 'Employee Name',
    assignedOutlet: 'Assigned Outlet',
    forceResetPassword: 'Force Password Reset',
    deactivateAccount: 'Deactivate Account',
    activateAccount: 'Activate Account',

    // Security & Toast
    toastLoginSuccess: 'Successfully signed in as',
    toastLoggedOut: 'Session terminated. Please sign in again via Login Page M-1.1.',
    toastThemeChanged: 'Theme changed to:',
    toastLangChanged: 'Language changed to English',
    toastLangAuto: 'Language set to automatic browser system language'
  }
};
