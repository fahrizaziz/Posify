import React, { useState, useEffect } from 'react';
import { User, UserRole, Category, Product, Transaction, StockAdjustment } from '../../types/posify';
import { SEED_USERS, SEED_CATEGORIES, SEED_PRODUCTS, SEED_TRANSACTIONS, SEED_STOCK_ADJUSTMENTS } from '../../data/posifySeedData';
import { Language, LanguageMode, detectSystemLanguage, translations } from '../../i18n/translations';
import { DashboardModule } from './DashboardModule';
import { InventoryModule } from './InventoryModule';
import { TransactionsModule } from './TransactionsModule';
import { AnalyticsModule } from './AnalyticsModule';
import { UserManagementModule } from './UserManagementModule';
import { OutletManagementModule } from './OutletManagementModule';
import { AuthModal } from './AuthModal';
import { useAuthStore } from '../../store/authStore';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../../lib/api/products';
import { getOutlets, Outlet } from '../../lib/api/outlets';
import { 
  LayoutDashboard, 
  Package, 
  Receipt, 
  BarChart3, 
  Users, 
  Shield, 
  Moon, 
  Sun, 
  Laptop, 
  Lock, 
  LogOut, 
  CheckCircle2, 
  AlertTriangle, 
  Layers,
  Globe
} from 'lucide-react';

export type ThemeMode = 'light' | 'dark' | 'system';

export const PosifyWebAdmin: React.FC = () => {
  // Global Posify State
  const [users, setUsers] = useState<User[]>(SEED_USERS);
  const currentUser = useAuthStore((state) => state.user) || SEED_USERS[0];
  const logout = useAuthStore((state) => state.logout);
  const [categories, setCategories] = useState<Category[]>(SEED_CATEGORIES);
  const [products, setProducts] = useState<Product[]>([]); // Will load from API
  const [transactions, setTransactions] = useState<Transaction[]>(SEED_TRANSACTIONS);
  const [stockAdjustments, setStockAdjustments] = useState<StockAdjustment[]>(SEED_STOCK_ADJUSTMENTS);
  const [outlets, setOutlets] = useState<Outlet[]>([]);

  // Fetch initial products and outlets
  useEffect(() => {
    const loadData = async () => {
      try {
        const [prodData, outData] = await Promise.all([getProducts(), getOutlets()]);
        setProducts(prodData);
        setOutlets(outData);
      } catch (e) {
        console.error("Gagal memuat data dari API", e);
      }
    };
    if (currentUser) {
      loadData();
    }
  }, [currentUser]);

  // Active Tab: 'dashboard' | 'inventory' | 'transactions' | 'analytics' | 'users'
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Language Mode ('system' | 'id' | 'en') & Resolved Language ('id' | 'en')
  const [langMode, setLangMode] = useState<LanguageMode>('system');
  const [systemDetectedLang, setSystemDetectedLang] = useState<Language>(detectSystemLanguage());

  const resolvedLang: Language = langMode === 'system' ? systemDetectedLang : langMode;
  const t = translations[resolvedLang];

  // Theme Mode State ('light' | 'dark' | 'system')
  const [themeMode, setThemeMode] = useState<ThemeMode>('system');
  const [isResolvedDark, setIsResolvedDark] = useState<boolean>(false);

  // Auth & Profile Modal
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // Apply Theme & Listen to Device/System Scheme
  useEffect(() => {
    const applyTheme = () => {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const isDark = themeMode === 'dark' || (themeMode === 'system' && systemDark);
      setIsResolvedDark(isDark);

      if (isDark) {
        document.documentElement.classList.add('dark');
        document.body.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('dark');
      }
    };

    applyTheme();

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = () => {
      if (themeMode === 'system') {
        applyTheme();
      }
    };

    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, [themeMode]);

  // Listen to browser language change events if supported
  useEffect(() => {
    const updateSysLang = () => {
      setSystemDetectedLang(detectSystemLanguage());
    };

    window.addEventListener('languagechange', updateSysLang);
    return () => window.removeEventListener('languagechange', updateSysLang);
  }, []);

  // Toast Notification
  const [toastMsg, setToastMsg] = useState<{ text: string; type: 'success' | 'warn' } | null>(null);

  const showToast = (text: string, type: 'success' | 'warn' = 'success') => {
    setToastMsg({ text, type });
    setTimeout(() => {
      setToastMsg(null);
    }, 4000);
  };

  const handleThemeChange = (mode: ThemeMode) => {
    setThemeMode(mode);
    const label = mode === 'system' ? t.themeSystem : mode === 'dark' ? t.themeDark : t.themeLight;
    showToast(`${t.toastThemeChanged} ${label}`);
  };

  const handleLangModeChange = (newMode: LanguageMode) => {
    setLangMode(newMode);
    if (newMode === 'system') {
      const currentSys = detectSystemLanguage();
      setSystemDetectedLang(currentSys);
      showToast(
        currentSys === 'id' 
          ? '🌐 Mode Otomatis: Bahasa Indonesia terdeteksi dari browser (ID)' 
          : '🌐 Auto Mode: English detected from browser (EN)', 
        'success'
      );
    } else if (newMode === 'id') {
      showToast('Bahasa diubah ke Bahasa Indonesia (ID)', 'success');
    } else {
      showToast('Language switched to English (EN)', 'success');
    }
  };

  const handleRoleSwitch = (newRole: UserRole) => {
    // Cannot easily switch role if role is from JWT, but we'll mock it for UI purposes if needed.
    // For now, we'll keep the toast to simulate it.
    showToast(`Role change not supported in JWT mode. Target: ${newRole}`, 'warn');
  };

  const handleLogin = (user: User, token: string) => {
    // Managed by Router now
  };

  const handleLogout = () => {
    logout();
    showToast(t.toastLoggedOut, 'warn');
  };

  // Product CRUD
  const handleAddProduct = async (formData: FormData) => {
    try {
      const newProd = await createProduct(formData);
      setProducts([newProd, ...products]);
      showToast(resolvedLang === 'id' ? `Produk "${newProd.name}" berhasil ditambahkan!` : `Product "${newProd.name}" successfully added!`);
    } catch (err) {
      showToast('Gagal menambah produk', 'warn');
    }
  };

  const handleUpdateProduct = async (id: number | string, formData: FormData) => {
    try {
      const updatedProd = await updateProduct(id, formData);
      setProducts(products.map(p => p.id === updatedProd.id ? updatedProd : p));
      showToast(resolvedLang === 'id' ? `Produk "${updatedProd.name}" berhasil diperbarui!` : `Product "${updatedProd.name}" successfully updated!`);
    } catch (err) {
      showToast('Gagal memperbarui produk', 'warn');
    }
  };

  const handleDeleteProduct = async (productId: string | number) => {
    try {
      await deleteProduct(productId);
      const target = products.find(p => p.id === productId);
      setProducts(products.filter(p => p.id !== productId));
      showToast(resolvedLang === 'id' ? `Produk "${target?.name || ''}" telah dihapus` : `Product "${target?.name || ''}" deleted`, 'warn');
    } catch (err) {
      showToast('Gagal menghapus produk', 'warn');
    }
  };

  // Category CRUD
  const handleAddCategory = (newCat: Category) => {
    setCategories([...categories, newCat]);
    showToast(resolvedLang === 'id' ? `Kategori "${newCat.name}" ditambahkan` : `Category "${newCat.name}" added`);
  };

  const handleUpdateCategory = (updatedCat: Category) => {
    setCategories(categories.map(c => c.id === updatedCat.id ? updatedCat : c));
    showToast(resolvedLang === 'id' ? `Kategori "${updatedCat.name}" diperbarui` : `Category "${updatedCat.name}" updated`);
  };

  const handleDeleteCategory = (categoryId: string) => {
    setCategories(categories.filter(c => c.id !== categoryId));
    showToast(resolvedLang === 'id' ? 'Kategori telah dihapus' : 'Category removed', 'warn');
  };

  // Stock Adjustment (Stock Opname)
  const handleAdjustStock = (adjustment: StockAdjustment) => {
    setStockAdjustments([adjustment, ...stockAdjustments]);
    setProducts(products.map(p => {
      if (p.id === adjustment.productId) {
        return { ...p, stock: adjustment.newStock };
      }
      return p;
    }));
    showToast(resolvedLang === 'id' ? `Stok "${adjustment.productName}" disesuaikan ke ${adjustment.newStock} pcs` : `Stock for "${adjustment.productName}" adjusted to ${adjustment.newStock} units`);
  };

  // Transaction Void (ABAC / RBAC Central Void)
  const handleVoidTransaction = (transactionId: string, reason: string) => {
    const target = transactions.find(t => t.id === transactionId);
    if (!target) return;

    if (currentUser.role !== 'OWNER' && currentUser.role !== 'MANAGER') {
      showToast(resolvedLang === 'id' ? 'Akses Ditolak: Hanya OWNER atau MANAGER yang diizinkan melakukan VOID transaksi.' : 'Access Denied: Only OWNER or MANAGER can VOID transactions.', 'warn');
      return;
    }

    // Mark transaction VOIDED
    setTransactions(transactions.map(t => {
      if (t.id === transactionId) {
        return {
          ...t,
          status: 'VOIDED' as const,
          voidReason: reason,
          voidedBy: currentUser.name,
          voidedByRole: currentUser.role,
          voidedAt: new Date().toISOString()
        };
      }
      return t;
    }));

    // RESTORE PRODUCT STOCKS AUTOMATICALLY
    setProducts(prevProducts => {
      return prevProducts.map(prod => {
        const itemInTrx = target.items.find(i => i.productId === prod.id);
        if (itemInTrx) {
          return {
            ...prod,
            stock: prod.stock + itemInTrx.quantity
          };
        }
        return prod;
      });
    });

    showToast(`${t.voidSuccess} (Inv: ${target.invoiceNumber})`, 'success');
  };

  // User Management CRUD
  const handleAddUser = (newUser: User) => {
    setUsers([...users, newUser]);
    showToast(resolvedLang === 'id' ? `Karyawan "${newUser.name}" [${newUser.role}] berhasil didaftarkan!` : `Employee "${newUser.name}" [${newUser.role}] registered!`);
  };

  const handleToggleUserStatus = (userId: string) => {
    setUsers(users.map(u => {
      if (u.id === userId) {
        const newStatus = u.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
        showToast(resolvedLang === 'id' ? `Status akun ${u.name} diubah menjadi ${newStatus}` : `Account status for ${u.name} set to ${newStatus}`);
        return { ...u, status: newStatus };
      }
      return u;
    }));
  };

  const handleResetPassword = (userId: string) => {
    showToast(resolvedLang === 'id' ? `Forced Password Reset dikirim untuk User ID: ${userId}` : `Forced Password Reset sent for User ID: ${userId}`);
  };

  // Removed the local !isLoggedIn check since ProtectedRoute handles it

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-200 ${isResolvedDark ? 'dark' : ''}`}>
      
      {/* Toast Banner */}
      {toastMsg && (
        <div className={`fixed bottom-5 right-5 z-50 p-4 rounded-2xl shadow-2xl border text-xs font-bold flex items-center gap-3 animate-fade-in ${
          toastMsg.type === 'warn'
            ? 'bg-amber-900 text-amber-100 border-amber-700'
            : 'bg-black text-white dark:bg-white dark:text-black border-slate-700'
        }`}>
          {toastMsg.type === 'warn' ? <AlertTriangle className="w-5 h-5 shrink-0" /> : <CheckCircle2 className="w-5 h-5 shrink-0" />}
          <span>{toastMsg.text}</span>
        </div>
      )}

      {/* TOP NAVBAR HEADER */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Brand Logo & Platform Badge */}
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-black text-white dark:bg-white dark:text-black font-extrabold flex items-center justify-center text-lg tracking-tight shrink-0 shadow-xs">
              P
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-slate-900 dark:text-white">
                  Posify / EasyPOS
                </span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                  {resolvedLang === 'id' ? 'PLATFORM 1: React Web Admin' : 'PLATFORM 1: Executive Web Admin'}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono hidden sm:block">
                {resolvedLang === 'id' ? 'Executive Dashboard & Sistem Manajemen' : 'Executive Dashboard & POS Management System'}
              </p>
            </div>
          </div>

          {/* Module Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/70 dark:bg-slate-800/60 p-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3.5 py-1.5 rounded-full flex items-center gap-1.5 transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>{t.dashboard}</span>
            </button>

            <button
              onClick={() => setActiveTab('inventory')}
              className={`px-3.5 py-1.5 rounded-full flex items-center gap-1.5 transition-all ${
                activeTab === 'inventory'
                  ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span>{t.inventory}</span>
            </button>

            <button
              onClick={() => setActiveTab('transactions')}
              className={`px-3.5 py-1.5 rounded-full flex items-center gap-1.5 transition-all ${
                activeTab === 'transactions'
                  ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Receipt className="w-3.5 h-3.5" />
              <span>{t.transactions}</span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-3.5 py-1.5 rounded-full flex items-center gap-1.5 transition-all ${
                activeTab === 'analytics'
                  ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>{t.analytics}</span>
            </button>

              <button
                onClick={() => setActiveTab('users')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                  activeTab === 'users' 
                    ? 'bg-black text-white dark:bg-white dark:text-black shadow-md' 
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white'
                }`}
              >
                <Users className="w-5 h-5" />
                <span className="font-medium tracking-wide">Tim & Akses</span>
              </button>

              {currentUser.role === 'OWNER' && (
                <button
                  onClick={() => setActiveTab('outlets')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                    activeTab === 'outlets' 
                      ? 'bg-black text-white dark:bg-white dark:text-black shadow-md' 
                      : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white'
                  }`}
                >
                  <Globe className="w-5 h-5" />
                  <span className="font-medium tracking-wide">Manajemen Cabang</span>
                </button>
              )}
            </nav>

          {/* Right User Actions */}
          <div className="flex items-center gap-2">
            
            {/* Quick Role Badge Switcher */}
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-2 border border-slate-200 dark:border-slate-700 cursor-pointer"
              title="Klik untuk membuka Auth & Security Center"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                {currentUser.role}
              </span>
              <Shield className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Language Switcher (Auto Browser / ID / EN) */}
            <div className="flex items-center p-0.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
              <button
                type="button"
                onClick={() => handleLangModeChange('system')}
                className={`px-2 py-1 rounded-full transition-all flex items-center gap-1 text-[11px] font-bold ${
                  langMode === 'system'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
                title={`Otomatis mengikuti browser: ${resolvedLang.toUpperCase()}`}
              >
                <Globe className="w-3 h-3" />
                <span className="hidden sm:inline">Auto</span>
                <span className="text-[9px] uppercase font-mono opacity-80">({resolvedLang})</span>
              </button>

              <button
                type="button"
                onClick={() => handleLangModeChange('id')}
                className={`px-2 py-1 rounded-full transition-all flex items-center gap-1 text-[11px] font-bold ${
                  langMode === 'id'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
                title="Bahasa Indonesia"
              >
                <span>🇮🇩 ID</span>
              </button>

              <button
                type="button"
                onClick={() => handleLangModeChange('en')}
                className={`px-2 py-1 rounded-full transition-all flex items-center gap-1 text-[11px] font-bold ${
                  langMode === 'en'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
                title="English"
              >
                <span>🇬🇧 EN</span>
              </button>
            </div>

            {/* Theme Selector (Light, System/Device, Dark) */}
            <div className="flex items-center p-0.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
              <button
                onClick={() => handleThemeChange('light')}
                className={`p-1.5 rounded-full transition-all flex items-center gap-1 ${
                  themeMode === 'light'
                    ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow-xs font-bold'
                    : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
                title={t.themeLight}
              >
                <Sun className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => handleThemeChange('system')}
                className={`p-1.5 rounded-full transition-all flex items-center gap-1 ${
                  themeMode === 'system'
                    ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-xs font-bold'
                    : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
                title={t.themeSystem}
              >
                <Laptop className="w-3.5 h-3.5" />
                <span className="text-[10px] uppercase font-bold tracking-wider hidden sm:inline px-0.5">{t.themeSystem}</span>
              </button>

              <button
                onClick={() => handleThemeChange('dark')}
                className={`p-1.5 rounded-full transition-all flex items-center gap-1 ${
                  themeMode === 'dark'
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs font-bold'
                    : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
                title={t.themeDark}
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="p-2 rounded-full text-rose-500 hover:text-rose-700 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors flex items-center gap-1 text-xs font-medium cursor-pointer"
              title={`${t.logout} (M-1.1)`}
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline font-bold">{t.logout}</span>
            </button>

          </div>

        </div>

        {/* Mobile Navigation Dropdown/Bar */}
        <div className="lg:hidden flex overflow-x-auto p-2 bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-xs font-bold uppercase tracking-wider gap-1">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3 py-1.5 rounded-full shrink-0 ${activeTab === 'dashboard' ? 'bg-black text-white' : 'text-slate-600'}`}
          >
            {t.dashboard}
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-3 py-1.5 rounded-full shrink-0 ${activeTab === 'inventory' ? 'bg-black text-white' : 'text-slate-600'}`}
          >
            {t.inventory}
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`px-3 py-1.5 rounded-full shrink-0 ${activeTab === 'transactions' ? 'bg-black text-white' : 'text-slate-600'}`}
          >
            {t.transactions}
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-3 py-1.5 rounded-full shrink-0 ${activeTab === 'analytics' ? 'bg-black text-white' : 'text-slate-600'}`}
          >
            {t.analytics}
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-3 py-1.5 rounded-full shrink-0 ${activeTab === 'users' ? 'bg-black text-white' : 'text-slate-600'}`}
          >
            {t.users}
          </button>
        </div>
      </header>

      {/* MAIN BODY CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* TAB 1: DASHBOARD MODULE (M-2) */}
        {activeTab === 'dashboard' && (
          <DashboardModule
            userRole={currentUser.role}
            products={products}
            transactions={transactions}
            onNavigateTab={(tab) => setActiveTab(tab)}
            lang={resolvedLang}
          />
        )}

        {/* TAB 2: INVENTORY & MASTER DATA MODULE (M-3) */}
        {activeTab === 'inventory' && (
          <InventoryModule
            userRole={currentUser.role}
            categories={categories}
            products={products}
            outlets={outlets}
            stockAdjustments={stockAdjustments}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
            onAddCategory={handleAddCategory}
            onUpdateCategory={handleUpdateCategory}
            onDeleteCategory={handleDeleteCategory}
            onAdjustStock={handleAdjustStock}
            currentUserName={currentUser.name}
          />
        )}

        {/* TAB 3: TRANSACTIONS & VOID MODULE (M-4) */}
        {activeTab === 'transactions' && (
          <TransactionsModule
            userRole={currentUser.role}
            currentUserName={currentUser.name}
            transactions={transactions}
            onVoidTransaction={handleVoidTransaction}
          />
        )}

        {/* TAB 4: ANALYTICS & EXPORT ENGINE MODULE (M-5) */}
        {activeTab === 'analytics' && (
          <AnalyticsModule
            userRole={currentUser.role}
            transactions={transactions}
            categories={categories}
          />
        )}

        {/* TAB 5: USER MANAGEMENT MODULE (M-6) */}
          {activeTab === 'outlets' && (
            <OutletManagementModule
              userRole={currentUser.role}
            />
          )}

          {activeTab === 'users' && (
            <UserManagementModule 
              userRole={currentUser.role}
              allUsers={users}
              onAddUser={handleAddUser}
              onToggleUserStatus={handleToggleUserStatus}
              onResetPassword={handleResetPassword}
            />
          )}

      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 py-8 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 dark:text-white">Posify / EasyPOS Engine v1.2.0</span>
            <span>•</span>
            <span>React + Tailwind CSS + Recharts + XLSX</span>
          </div>
          <div className="font-mono text-[11px] text-slate-400">
            {resolvedLang === 'id' 
              ? `RBAC + ABAC CASL Engine Aktif • Bahasa: ${langMode === 'system' ? `Auto Browser (${resolvedLang.toUpperCase()})` : resolvedLang.toUpperCase()}` 
              : `RBAC + ABAC CASL Engine Active • Language: ${langMode === 'system' ? `Auto Browser (${resolvedLang.toUpperCase()})` : resolvedLang.toUpperCase()}`}
          </div>
        </div>
      </footer>

      {/* AUTH & PROFILE MODAL */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onLogin={handleLogin}
        allUsers={users}
      />

    </div>
  );
};
