import React, { useState } from 'react';
import { UserRole, Category, Product, ProductVariantGroup, StockAdjustment } from '../../types/posify';
import { Plus, Search, Filter, Edit, Trash2, AlertTriangle, Shield, Check, X, RefreshCw, Barcode, Layers, Package, Tag, ArrowUpDown } from 'lucide-react';
import { Outlet } from '../../lib/api/outlets';

interface InventoryModuleProps {
  userRole: UserRole;
  categories: Category[];
  products: Product[];
  outlets: Outlet[];
  stockAdjustments: StockAdjustment[];
  onAddProduct: (formData: FormData) => void | Promise<void>;
  onUpdateProduct: (id: string | number, formData: FormData) => void | Promise<void>;
  onDeleteProduct: (productId: string | number) => void;
  onAddCategory: (cat: Category) => void;
  onUpdateCategory: (cat: Category) => void;
  onDeleteCategory: (catId: string) => void;
  onAdjustStock: (productId: string, newStock: number, reason: string, user: string, role: UserRole) => void;
  currentUserName: string;
}

export const InventoryModule: React.FC<InventoryModuleProps> = ({
  userRole,
  categories,
  products,
  outlets,
  stockAdjustments,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
  onAdjustStock,
  currentUserName
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'catalog' | 'categories' | 'stock-opname'>('catalog');
  
  // Search & Filters
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCatId, setSelectedCatId] = useState<string>('ALL');
  const [lowStockOnly, setLowStockOnly] = useState<boolean>(false);

  // Modals state
  const [isProductModalOpen, setIsProductModalOpen] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState<boolean>(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const [isOpnameModalOpen, setIsOpnameModalOpen] = useState<boolean>(false);
  const [opnameTargetProduct, setOpnameTargetProduct] = useState<Product | null>(null);
  const [opnameNewStock, setOpnameNewStock] = useState<number>(0);
  const [opnameReason, setOpnameReason] = useState<string>('Stock Opname Fisik Rutin');

  // Product Form state
  const [pName, setPName] = useState('');
  const [pSku, setPSku] = useState('');
  const [pBarcode, setPBarcode] = useState('');
  const [pCategory, setPCategory] = useState(categories[0]?.id || 'cat-01');
  const [pOutlet, setPOutlet] = useState<number>(outlets[0]?.id || 1);
  const [pHpp, setPHpp] = useState<number>(10000);
  const [pSell, setPSell] = useState<number>(25000);
  const [pStock, setPStock] = useState<number>(20);
  const [pImg, setPImg] = useState<string | null>(null);
  const [pImgFile, setPImgFile] = useState<File | null>(null);
  const [pStatus, setPStatus] = useState<'ACTIVE' | 'INACTIVE'>('ACTIVE');

  // Variant Groups Form state
  const [variantGroups, setVariantGroups] = useState<ProductVariantGroup[]>([]);

  // Category Form state
  const [cName, setCName] = useState('');
  const [cColor, setCColor] = useState('#8B5CF6');

  // Filter products logic
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.barcode.includes(searchTerm);
    const matchesCat = selectedCatId === 'ALL' || p.categoryId === selectedCatId;
    const matchesLowStock = !lowStockOnly || p.stock <= p.minStockAlert;
    return matchesSearch && matchesCat && matchesLowStock;
  });

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  const handleOpenProductModal = (prod?: Product) => {
    if (prod) {
      setEditingProduct(prod);
      setPName(prod.name);
      setPSku(prod.sku);
      setPBarcode(prod.barcode);
      setPCategory(prod.categoryId);
      setPOutlet(prod.outletId);
      setPHpp(prod.hppPrice);
      setPSell(prod.sellPrice);
      setPStock(prod.stock);
      setPImg(prod.imageUrl);
      setPImgFile(null);
      setPStatus(prod.status);
      setVariantGroups(prod.variantGroups || []);
    } else {
      setEditingProduct(null);
      setPName('');
      setPSku(`SKU-POS-${Math.floor(100 + Math.random() * 900)}`);
      setPBarcode(`899${Math.floor(1000000 + Math.random() * 9000000)}`);
      setPCategory(categories[0]?.id || 'cat-01');
      setPOutlet(outlets[0]?.id || 1);
      setPHpp(10000);
      setPSell(25000);
      setPStock(20);
      setPImg(null);
      setPImgFile(null);
      setPStatus('ACTIVE');
      setVariantGroups([
        {
          id: 'vg-1',
          title: 'Ukuran Cup',
          options: [
            { id: 'opt-1', name: 'Regular', priceAdjustment: 0 },
            { id: 'opt-2', name: 'Large (+4.000)', priceAdjustment: 4000 }
          ]
        }
      ]);
    }
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('sku', pSku);
    formData.append('barcode', pBarcode);
    formData.append('name', pName);
    formData.append('categoryId', pCategory.toString());
    formData.append('outletId', pOutlet.toString());
    formData.append('hppPrice', pHpp.toString());
    formData.append('sellPrice', pSell.toString());
    formData.append('stock', pStock.toString());
    formData.append('isActive', (pStatus === 'ACTIVE').toString());
    
    if (pImgFile) {
      formData.append('image', pImgFile);
    }

    if (editingProduct) {
      await onUpdateProduct(editingProduct.id, formData);
    } else {
      await onAddProduct(formData);
    }
    setIsProductModalOpen(false);
  };

  const handleOpenCategoryModal = (cat?: Category) => {
    if (cat) {
      setEditingCategory(cat);
      setCName(cat.name);
      setCColor(cat.color);
    } else {
      setEditingCategory(null);
      setCName('');
      setCColor('#8B5CF6');
    }
    setIsCategoryModalOpen(true);
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const categoryPayload: Category = {
      id: editingCategory ? editingCategory.id : `cat-${Date.now()}`,
      name: cName,
      slug: cName.toLowerCase().replace(/\s+/g, '-'),
      color: cColor,
      icon: 'Tag',
      productCount: editingCategory ? editingCategory.productCount : 0
    };

    if (editingCategory) {
      onUpdateCategory(categoryPayload);
    } else {
      onAddCategory(categoryPayload);
    }
    setIsCategoryModalOpen(false);
  };

  const handleOpenStockOpname = (prod: Product) => {
    setOpnameTargetProduct(prod);
    setOpnameNewStock(prod.stock);
    setOpnameReason('Stock Opname Fisik Rutin - Penyesuaian Gudang');
    setIsOpnameModalOpen(true);
  };

  const handleExecuteStockOpname = (e: React.FormEvent) => {
    e.preventDefault();
    if (!opnameTargetProduct) return;
    onAdjustStock(opnameTargetProduct.id, Number(opnameNewStock), opnameReason, currentUserName, userRole);
    setIsOpnameModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header & Sub-tab navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Modul M-3 • Inventaris & Master Data
          </div>
          <h2 className="text-2xl font-light text-slate-900 dark:text-white tracking-tight">
            Katalog Produk, Kategori & <span className="italic font-serif">Stock Opname</span>
          </h2>
        </div>

        {/* Sub-tabs */}
        <div className="flex items-center p-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold uppercase tracking-wider">
          <button
            onClick={() => setActiveSubTab('catalog')}
            className={`px-4 py-1.5 rounded-full transition-all ${
              activeSubTab === 'catalog'
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Katalog Produk ({products.length})
          </button>
          <button
            onClick={() => setActiveSubTab('categories')}
            className={`px-4 py-1.5 rounded-full transition-all ${
              activeSubTab === 'categories'
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Kategori ({categories.length})
          </button>
          <button
            onClick={() => setActiveSubTab('stock-opname')}
            className={`px-4 py-1.5 rounded-full transition-all ${
              activeSubTab === 'stock-opname'
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Stock Opname Log
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: KATALOG PRODUK & VARIAN */}
      {activeSubTab === 'catalog' && (
        <div className="space-y-4">
          
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800">
            <div className="flex flex-1 items-center gap-2 w-full sm:w-auto">
              {/* Search */}
              <div className="relative flex-1 max-w-xs">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Cari Produk / SKU / Barcode..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-black dark:focus:border-white"
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCatId}
                onChange={(e) => setSelectedCatId(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="ALL">Semua Kategori</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>

              {/* Low stock toggle button */}
              <button
                onClick={() => setLowStockOnly(!lowStockOnly)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border ${
                  lowStockOnly
                    ? 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Stok ≤ 5 Only</span>
              </button>
            </div>

            <button
              onClick={() => handleOpenProductModal()}
              className="w-full sm:w-auto px-4 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-widest text-xs hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Produk Baru</span>
            </button>
          </div>

          {/* Product Table */}
          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-100 dark:border-slate-800 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    <th className="py-3 px-4">Produk & Barcode</th>
                    <th className="py-3 px-4">Kategori</th>
                    <th className="py-3 px-4">Harga Jual</th>
                    <th className="py-3 px-4">HPP (Modal)</th>
                    <th className="py-3 px-4">Sisa Stok</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredProducts.map((prod) => {
                    const categoryObj = categories.find(c => c.id === prod.categoryId);
                    const isLowStock = prod.stock <= prod.minStockAlert;

                    return (
                      <tr key={prod.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                        
                        {/* Column 1: Product & Barcode */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={prod.imageUrl}
                              alt={prod.name}
                              className="w-10 h-10 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                            />
                            <div>
                              <div className="font-bold text-slate-900 dark:text-white text-sm">{prod.name}</div>
                              <div className="text-[10px] font-mono text-slate-400 flex items-center gap-2 mt-0.5">
                                <span>SKU: {prod.sku}</span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                  <Barcode className="w-3 h-3 text-slate-400" />
                                  {prod.barcode}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Column 2: Category */}
                        <td className="py-3.5 px-4">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                            {categoryObj ? categoryObj.name : 'Unassigned'}
                          </span>
                        </td>

                        {/* Column 3: Sell Price */}
                        <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white font-mono">
                          {formatRupiah(prod.sellPrice)}
                        </td>

                        {/* Column 4: HPP (Modal) - OWNER ONLY or Masked */}
                        <td className="py-3.5 px-4 font-mono">
                          {userRole === 'OWNER' ? (
                            <span className="text-slate-600 dark:text-slate-300">{formatRupiah(prod.hppPrice)}</span>
                          ) : (
                            <span className="text-[10px] text-slate-400 italic">[Disembunyikan]</span>
                          )}
                        </td>

                        {/* Column 5: Stock & Low Stock Badge */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            <span className={`font-mono font-bold text-sm ${isLowStock ? 'text-amber-600 dark:text-amber-400' : 'text-slate-900 dark:text-white'}`}>
                              {prod.stock} pcs
                            </span>
                            {isLowStock && (
                              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                                Low Stock
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Column 6: Status */}
                        <td className="py-3.5 px-4">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                            prod.status === 'ACTIVE'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                              : 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                          }`}>
                            {prod.status}
                          </span>
                        </td>

                        {/* Column 7: Actions */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenStockOpname(prod)}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-[10px] font-bold uppercase tracking-wider transition-colors"
                              title="Set Stock Opname"
                            >
                              Opname
                            </button>
                            <button
                              onClick={() => handleOpenProductModal(prod)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                              title="Edit Produk"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => onDeleteProduct(prod.id)}
                              className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950 transition-colors"
                              title="Hapus Produk"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>

                      </tr>
                    );
                  })}
                  {filteredProducts.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-400 text-xs">
                        Tidak ada produk ditemukan sesuai filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* SUB-TAB 2: KATEGORI PRODUK */}
      {activeSubTab === 'categories' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Daftar Kategori Master Data
            </h3>
            <button
              onClick={() => handleOpenCategoryModal()}
              className="px-4 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-widest text-xs hover:bg-slate-800 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Kategori Baru</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-3 relative overflow-hidden"
              >
                <div className="w-full h-1 absolute top-0 left-0" style={{ backgroundColor: cat.color }}></div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }}></span>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">{cat.name}</h4>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenCategoryModal(cat)}
                      className="p-1 text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteCategory(cat.id)}
                      className="p-1 text-rose-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="text-xs text-slate-500 font-mono">
                  Slug: /{cat.slug}
                </div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                  Total Produk: {products.filter(p => p.categoryId === cat.id).length} item
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: STOCK OPNAME LOG */}
      {activeSubTab === 'stock-opname' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Histori Audit Stock Opname Manual & Restock
            </h3>
            <p className="text-xs text-slate-500 font-light mt-0.5">
              Setiap penyesuaian stok dicatat secara atomic dalam audit trail sistem.
            </p>
          </div>

          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-100 dark:border-slate-800 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  <th className="py-3 px-4">Waktu Audit</th>
                  <th className="py-3 px-4">Nama Produk</th>
                  <th className="py-3 px-4">Stok Lama → Baru</th>
                  <th className="py-3 px-4">Delta Penyesuaian</th>
                  <th className="py-3 px-4">Alasan Opname</th>
                  <th className="py-3 px-4">Eksekutor Audit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {stockAdjustments.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50">
                    <td className="py-3 px-4 font-mono text-slate-500">
                      {new Date(log.timestamp).toLocaleString('id-ID')}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                      {log.productName}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-600 dark:text-slate-300">
                      {log.oldStock} pcs → <span className="font-bold text-slate-900 dark:text-white">{log.newStock} pcs</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`font-mono font-bold ${log.delta >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                        {log.delta >= 0 ? `+${log.delta}` : log.delta} pcs
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300 max-w-xs">
                      {log.reason}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-500">
                      {log.adjustedBy} ({log.adjustedByRole})
                    </td>
                  </tr>
                ))}
                {stockAdjustments.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-slate-400 text-xs">
                      Belum ada catatan Stock Opname.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL 1: ADD / EDIT PRODUCT */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {editingProduct ? 'Edit Master Produk & Varian' : 'Tambah Produk Baru'}
              </h3>
              <button onClick={() => setIsProductModalOpen(false)} className="p-1 rounded-full text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">
                    Nama Produk
                  </label>
                  <input
                    type="text"
                    required
                    value={pName}
                    onChange={(e) => setPName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">
                    Kategori
                  </label>
                  <select
                    value={pCategory}
                    onChange={(e) => setPCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">
                    Kode SKU
                  </label>
                  <input
                    type="text"
                    required
                    value={pSku}
                    onChange={(e) => setPSku(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">
                    Barcode / EAN-13
                  </label>
                  <input
                    type="text"
                    required
                    value={pBarcode}
                    onChange={(e) => setPBarcode(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">
                    Harga Jual (Rp)
                  </label>
                  <input
                    type="number"
                    required
                    value={pSell}
                    onChange={(e) => setPSell(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">
                    Harga Modal (HPP - Rp) {userRole !== 'OWNER' && <span className="text-amber-500">(Restricted)</span>}
                  </label>
                  <input
                    type="number"
                    required
                    disabled={userRole !== 'OWNER'}
                    value={pHpp}
                    onChange={(e) => setPHpp(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">
                    Sisa Stok Awal
                  </label>
                  <input
                    type="number"
                    required
                    value={pStock}
                    onChange={(e) => setPStock(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">
                    Status Produk
                  </label>
                  <select
                    value={pStatus}
                    onChange={(e) => setPStatus(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="ACTIVE">ACTIVE (Tampil di Kasir)</option>
                    <option value="INACTIVE">INACTIVE (Nonaktif)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">
                    Cabang (Outlet)
                  </label>
                  <select
                    value={pOutlet}
                    onChange={(e) => setPOutlet(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    {outlets.map(o => (
                      <option key={o.id} value={o.id}>{o.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">
                  Gambar Produk {editingProduct && <span className="text-slate-400 font-normal lowercase">(kosongkan jika tidak diubah)</span>}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      setPImgFile(e.target.files[0]);
                    }
                  }}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-slate-200 text-xs font-bold uppercase tracking-wider"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-widest text-xs"
                >
                  Simpan Produk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD / EDIT CATEGORY */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {editingCategory ? 'Edit Kategori' : 'Tambah Kategori Baru'}
              </h3>
              <button onClick={() => setIsCategoryModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-3">
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">
                  Nama Kategori
                </label>
                <input
                  type="text"
                  required
                  value={cName}
                  onChange={(e) => setCName(e.target.value)}
                  placeholder="Misal: Cold Brew & Mocktails"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">
                  Warna Label Accent
                </label>
                <input
                  type="color"
                  value={cColor}
                  onChange={(e) => setCColor(e.target.value)}
                  className="w-full h-10 rounded-xl cursor-pointer border border-slate-200 dark:border-slate-800 bg-transparent"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-slate-200 text-xs font-bold uppercase tracking-wider"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-widest text-xs"
                >
                  Simpan Kategori
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: STOCK OPNAME ADJUSTMENT */}
      {isOpnameModalOpen && opnameTargetProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Stock Opname Manual
                </h3>
                <p className="text-xs text-slate-500 font-mono">{opnameTargetProduct.name}</p>
              </div>
              <button onClick={() => setIsOpnameModalOpen(false)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleExecuteStockOpname} className="space-y-4">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 flex justify-between items-center text-xs">
                <div>
                  <span className="text-slate-400 font-mono">Stok Saat Ini (Sistem):</span>
                  <div className="font-bold text-slate-900 dark:text-white text-base">{opnameTargetProduct.stock} pcs</div>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 font-mono">Stok Hasil Opname:</span>
                  <div className="font-bold text-emerald-600 dark:text-emerald-400 text-base">
                    {opnameNewStock} pcs
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">
                  Jumlah Stok Fisik Riil
                </label>
                <input
                  type="number"
                  required
                  min={0}
                  value={opnameNewStock}
                  onChange={(e) => setOpnameNewStock(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-lg font-bold"
                />
                <div className="text-[11px] font-mono mt-1 text-slate-500">
                  Selisih Delta: <span className="font-bold">{opnameNewStock - opnameTargetProduct.stock} pcs</span>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">
                  Alasan Penyesuaian (Mandatory Audit)
                </label>
                <textarea
                  required
                  rows={2}
                  value={opnameReason}
                  onChange={(e) => setOpnameReason(e.target.value)}
                  placeholder="Misal: Penyesuaian hasil pencatatan fisik shift sore, barang expired..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                ></textarea>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpnameModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-slate-200 text-xs font-bold uppercase tracking-wider"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-widest text-xs"
                >
                  Eksekusi Stock Opname
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
