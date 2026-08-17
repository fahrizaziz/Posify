import React, { useState } from 'react';
import { UserRole, Product, Transaction } from '../../types/posify';
import { SALES_TREND_DAILY, SALES_TREND_WEEKLY, SALES_TREND_MONTHLY } from '../../data/posifySeedData';
import { Language, translations } from '../../i18n/translations';
import { DollarSign, ShoppingBag, AlertTriangle, TrendingUp, ShieldAlert, ArrowUpRight, ArrowDownRight, Layers, BarChart3 } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

interface DashboardModuleProps {
  userRole: UserRole;
  products: Product[];
  transactions: Transaction[];
  onNavigateTab: (tab: string) => void;
  lang?: Language;
}

export const DashboardModule: React.FC<DashboardModuleProps> = ({
  userRole,
  products,
  transactions,
  onNavigateTab,
  lang = 'id'
}) => {
  const [chartPeriod, setChartPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const t = translations[lang];

  // Compute live metrics from state
  const completedTodayTrx = transactions.filter(t => t.status === 'COMPLETED');
  const todayRevenue = completedTodayTrx.reduce((acc, curr) => acc + curr.totalNet, 0);
  const todayHpp = completedTodayTrx.reduce((acc, curr) => acc + curr.totalHpp, 0);
  const todayNetProfit = todayRevenue - todayHpp;

  // Low stock products count
  const lowStockProducts = products.filter(p => p.stock <= p.minStockAlert && p.status === 'ACTIVE');

  // Top 5 Selling Products Computation
  const productSalesMap: { [key: string]: { name: string; category: string; qty: number; revenue: number } } = {};
  completedTodayTrx.forEach(trx => {
    trx.items.forEach(item => {
      if (!productSalesMap[item.productId]) {
        productSalesMap[item.productId] = { name: item.name, category: lang === 'id' ? 'Katalog' : 'Catalog', qty: 0, revenue: 0 };
      }
      productSalesMap[item.productId].qty += item.quantity;
      productSalesMap[item.productId].revenue += item.subtotal;
    });
  });

  const topSellingList = Object.values(productSalesMap)
    .sort((a, b) => b.qty - a.qty)
    .slice(0, 5);

  // Default fallback if empty
  const defaultTopSelling = [
    { name: 'Kopi Susu Gula Aren Signature', category: 'Kopi', qty: 48, revenue: 1056000 },
    { name: 'Nasi Goreng Wagyu Truffle Oil', category: 'Makanan', qty: 32, revenue: 1536000 },
    { name: 'Americano Double Shot Hot/Iced', category: 'Kopi', qty: 28, revenue: 504000 },
    { name: 'Matcha Latte Uji Kyoto', category: 'Non-Coffee', qty: 21, revenue: 525000 },
    { name: 'Butter Croissant French Bakery', category: 'Pastry', qty: 19, revenue: 380000 }
  ];

  const displayTopSelling = topSellingList.length > 0 ? topSellingList : defaultTopSelling;
  const maxQty = Math.max(...displayTopSelling.map(d => d.qty), 1);

  // Active chart dataset
  const activeChartData = chartPeriod === 'daily'
    ? SALES_TREND_DAILY
    : chartPeriod === 'weekly'
    ? SALES_TREND_WEEKLY
    : SALES_TREND_MONTHLY;

  const formatCurrency = (val: number) => {
    if (lang === 'id') {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
    }
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val / 16000);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* M-2.1 Summary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Omzet Hari Ini */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              {t.todayRevenue}
            </span>
            <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-light text-slate-900 dark:text-white tracking-tight">
              {formatCurrency(todayRevenue || 2450000)}
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18.4% {t.growthComparison}</span>
            </div>
          </div>
        </div>

        {/* Card 2: Total Transaksi */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              {t.todayTransactions}
            </span>
            <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-light text-slate-900 dark:text-white tracking-tight">
              {completedTodayTrx.length || 42} <span className="text-sm font-normal text-slate-400">trx</span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
              Avg ticket: {formatCurrency(completedTodayTrx.length ? todayRevenue / completedTodayTrx.length : 58333)}
            </div>
          </div>
        </div>

        {/* Card 3: Peringatan Stok Menipis */}
        <div 
          onClick={() => onNavigateTab('inventory')}
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-3 cursor-pointer hover:border-amber-400 transition-colors group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              {t.lowStockWarning} (≤ 5)
            </span>
            <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-light text-amber-600 dark:text-amber-400 tracking-tight flex items-center gap-2">
              <span>{lowStockProducts.length} {lang === 'id' ? 'Produk' : 'Products'}</span>
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400" />
            </div>
            <div className="text-[11px] text-amber-700/80 dark:text-amber-300/80 font-medium">
              {lang === 'id' ? 'Perlu Stock Opname / Restock' : 'Requires Stock Opname / Restock'}
            </div>
          </div>
        </div>

        {/* Card 4: Profit Bersih (CRITICAL RBAC CHECK FOR OWNER ONLY) */}
        <div className={`p-5 rounded-2xl border shadow-2xs space-y-3 transition-all ${
          userRole === 'OWNER'
            ? 'bg-slate-900 text-white dark:bg-white dark:text-black border-slate-800'
            : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800'
        }`}>
          <div className="flex items-center justify-between">
            <span className={`text-[10px] font-bold uppercase tracking-widest ${userRole === 'OWNER' ? 'text-slate-300 dark:text-slate-600' : 'text-slate-400'}`}>
              {t.todayNetProfit}
            </span>
            <div className={`p-2 rounded-xl ${userRole === 'OWNER' ? 'bg-slate-800 text-emerald-400 dark:bg-slate-100 dark:text-emerald-700' : 'bg-slate-200 dark:bg-slate-800 text-slate-400'}`}>
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>

          <div className="space-y-1">
            {userRole === 'OWNER' ? (
              <>
                <div className="text-2xl sm:text-3xl font-light tracking-tight text-emerald-400 dark:text-emerald-700">
                  {formatCurrency(todayNetProfit || 1580000)}
                </div>
                <div className="text-[11px] text-slate-300 dark:text-slate-600 font-mono">
                  {lang === 'id' ? `HPP Tot: ${formatCurrency(todayHpp || 870000)} (Margin ~64%)` : `Total COGS: ${formatCurrency(todayHpp || 870000)} (Margin ~64%)`}
                </div>
              </>
            ) : (
              <>
                <div className="text-sm font-bold text-slate-500 dark:text-slate-400 py-1 font-mono">
                  [RBAC RESTRICTED]
                </div>
                <div className="text-[11px] text-slate-400 font-light">
                  {t.hiddenForRole}
                </div>
              </>
            )}
          </div>
        </div>

      </div>

      {/* Low Stock Warning Alert Banner (If items <= 5 exist) */}
      {lowStockProducts.length > 0 && (
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-amber-200 dark:bg-amber-900 text-amber-800 dark:text-amber-200">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-amber-900 dark:text-amber-200">
                {lang === 'id' ? `Peringatan Stok Menipis (${lowStockProducts.length} Produk Sisa ≤ 5 Pcs)` : `Low Stock Alert (${lowStockProducts.length} Products Remaining ≤ 5 Units)`}
              </div>
              <div className="text-[11px] text-amber-700 dark:text-amber-300 font-light">
                {lowStockProducts.map(p => `${p.name} (${p.stock} pcs)`).join(' • ')}
              </div>
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('inventory')}
            className="px-4 py-1.5 rounded-full bg-amber-800 text-white dark:bg-amber-300 dark:text-slate-950 text-xs font-bold uppercase tracking-wider shrink-0 cursor-pointer"
          >
            {t.stockAdjustment}
          </button>
        </div>
      )}

      {/* M-2.2 Sales Analytics Chart + M-2.3 Top Selling Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Sales Chart (8 Cols) */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400">
                {t.salesTrend}
              </div>
              <h3 className="text-lg font-light text-slate-900 dark:text-white tracking-tight">
                {lang === 'id' ? 'Tren Omzet & Volume Transaksi' : 'Revenue & Transaction Volume Trend'}
              </h3>
            </div>

            {/* Time Toggle */}
            <div className="flex p-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold uppercase tracking-wider">
              <button
                onClick={() => setChartPeriod('daily')}
                className={`px-3 py-1 rounded-full transition-all ${chartPeriod === 'daily' ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs' : 'text-slate-500'}`}
              >
                {t.daily}
              </button>
              <button
                onClick={() => setChartPeriod('weekly')}
                className={`px-3 py-1 rounded-full transition-all ${chartPeriod === 'weekly' ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs' : 'text-slate-500'}`}
              >
                {t.weekly}
              </button>
              <button
                onClick={() => setChartPeriod('monthly')}
                className={`px-3 py-1 rounded-full transition-all ${chartPeriod === 'monthly' ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs' : 'text-slate-500'}`}
              >
                {t.monthly}
              </button>
            </div>
          </div>

          {/* Recharts Area Chart */}
          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activeChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0F172A" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#0F172A" stopOpacity={0}/>
                  </linearGradient>
                  {userRole === 'OWNER' && (
                    <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                  )}
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} tickFormatter={(val) => `${val/1000}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                  formatter={(value: any) => [formatCurrency(Number(value)), '']}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="revenue" name={lang === 'id' ? 'Omzet Penjualan (Rp)' : 'Gross Revenue'} stroke="#0F172A" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
                {userRole === 'OWNER' && (
                  <Area type="monotone" dataKey="profit" name={lang === 'id' ? 'Profit Bersih (Rp - Owner)' : 'Net Profit (Owner)'} stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorProfit)" />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top 5 Selling Products (4 Cols) */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-5">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              {lang === 'id' ? 'Kinerja Produk' : 'Product Performance'}
            </div>
            <h3 className="text-base font-light text-slate-900 dark:text-white tracking-tight">
              {t.topSellingProducts}
            </h3>
          </div>

          <div className="space-y-4">
            {displayTopSelling.map((prod, idx) => {
              const pct = Math.round((prod.qty / maxQty) * 100);
              return (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-900 dark:text-slate-100 truncate max-w-[180px]">
                      {idx + 1}. {prod.name}
                    </span>
                    <span className="font-mono text-slate-500 font-bold">
                      {prod.qty} pcs
                    </span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-black dark:bg-white h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>{prod.category}</span>
                    <span>{formatCurrency(prod.revenue)}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => onNavigateTab('transactions')}
            className="w-full py-2 rounded-full border border-slate-200 dark:border-slate-700 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {t.viewAllTransactions}
          </button>
        </div>

      </div>

    </div>
  );
};
