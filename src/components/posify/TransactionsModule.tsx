import React, { useState } from 'react';
import { UserRole, Transaction, PaymentMethod } from '../../types/posify';
import { Search, Filter, Printer, AlertOctagon, CheckCircle2, X, RefreshCw, Calendar, User, FileText, DollarSign, ShieldAlert } from 'lucide-react';

interface TransactionsModuleProps {
  userRole: UserRole;
  currentUserName: string;
  transactions: Transaction[];
  onVoidTransaction: (transactionId: string, reason: string, voidedBy: string, role: UserRole) => void;
}

export const TransactionsModule: React.FC<TransactionsModuleProps> = ({
  userRole,
  currentUserName,
  transactions,
  onVoidTransaction
}) => {
  // Filters
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [dateFilter, setDateFilter] = useState<'ALL' | 'TODAY' | 'WEEK' | 'MONTH'>('ALL');
  const [selectedCashier, setSelectedCashier] = useState<string>('ALL');
  const [selectedPayment, setSelectedPayment] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  // Modals state
  const [selectedTrxDetail, setSelectedTrxDetail] = useState<Transaction | null>(null);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState<boolean>(false);

  const [voidTargetTrx, setVoidTargetTrx] = useState<Transaction | null>(null);
  const [isVoidModalOpen, setIsVoidModalOpen] = useState<boolean>(false);
  const [voidReason, setVoidReason] = useState<string>('');

  // Cashier list options derived from data
  const cashierOptions = Array.from(new Set(transactions.map(t => t.cashierName)));

  // Filter logic
  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch = t.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.items.some(i => i.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCashier = selectedCashier === 'ALL' || t.cashierName === selectedCashier;
    const matchesPayment = selectedPayment === 'ALL' || t.paymentMethod === selectedPayment;
    const matchesStatus = selectedStatus === 'ALL' || t.status === selectedStatus;

    let matchesDate = true;
    const trxDate = new Date(t.timestamp);
    const now = new Date();
    if (dateFilter === 'TODAY') {
      matchesDate = trxDate.toDateString() === now.toDateString();
    } else if (dateFilter === 'WEEK') {
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      matchesDate = trxDate >= sevenDaysAgo;
    } else if (dateFilter === 'MONTH') {
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      matchesDate = trxDate >= thirtyDaysAgo;
    }

    return matchesSearch && matchesCashier && matchesPayment && matchesStatus && matchesDate;
  });

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  const handleOpenReceipt = (trx: Transaction) => {
    setSelectedTrxDetail(trx);
    setIsReceiptModalOpen(true);
  };

  const handleOpenVoidModal = (trx: Transaction) => {
    setVoidTargetTrx(trx);
    setVoidReason('Kesalahan input transaksi / Pembatalan pelanggan');
    setIsVoidModalOpen(true);
  };

  const handleExecuteVoid = (e: React.FormEvent) => {
    e.preventDefault();
    if (!voidTargetTrx) return;
    onVoidTransaction(voidTargetTrx.id, voidReason, currentUserName, userRole);
    setIsVoidModalOpen(false);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Modul M-4 • Audit Transaksi & Central Void
          </div>
          <h2 className="text-2xl font-light text-slate-900 dark:text-white tracking-tight">
            Riwayat Transaksi & <span className="italic font-serif">Central Void Center</span>
          </h2>
        </div>
        
        <div className="text-xs font-mono text-slate-500 bg-slate-100 dark:bg-slate-800 px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-700">
          Total Filtered: <span className="font-bold text-slate-900 dark:text-white">{filteredTransactions.length} Faktur</span>
        </div>
      </div>

      {/* Multi-Filter Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          
          {/* Invoice / Item Search */}
          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">
              Cari No Faktur / Item
            </label>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="INV-2026..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
          </div>

          {/* Date Filter */}
          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">
              Periode Transaksi
            </label>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value as any)}
              className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
            >
              <option value="ALL">Semua Tanggal</option>
              <option value="TODAY">Hari Ini</option>
              <option value="WEEK">7 Hari Terakhir</option>
              <option value="MONTH">30 Hari Terakhir</option>
            </select>
          </div>

          {/* Cashier Filter */}
          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">
              Filter Kasir
            </label>
            <select
              value={selectedCashier}
              onChange={(e) => setSelectedCashier(e.target.value)}
              className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
            >
              <option value="ALL">Semua Kasir</option>
              {cashierOptions.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Payment Method Filter */}
          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">
              Metode Pembayaran
            </label>
            <select
              value={selectedPayment}
              onChange={(e) => setSelectedPayment(e.target.value)}
              className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
            >
              <option value="ALL">Semua Metode</option>
              <option value="TUNAI">TUNAI</option>
              <option value="QRIS">QRIS</option>
              <option value="TRANSFER">TRANSFER</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">
              Status Transaksi
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
            >
              <option value="ALL">Semua Status</option>
              <option value="COMPLETED">COMPLETED</option>
              <option value="VOIDED">VOIDED</option>
            </select>
          </div>

        </div>
      </div>

      {/* Transaction Table */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-100 dark:border-slate-800 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                <th className="py-3 px-4">No. Faktur & Waktu</th>
                <th className="py-3 px-4">Kasir</th>
                <th className="py-3 px-4">Rincian Items</th>
                <th className="py-3 px-4">Total Net</th>
                <th className="py-3 px-4">Metode Bayar</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Aksi Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredTransactions.map((trx) => {
                const isVoid = trx.status === 'VOIDED';

                return (
                  <tr key={trx.id} className={`hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors ${isVoid ? 'bg-rose-50/20 dark:bg-rose-950/20' : ''}`}>
                    
                    {/* Invoice & Time */}
                    <td className="py-3.5 px-4 font-mono">
                      <div className="font-bold text-slate-900 dark:text-white text-sm">{trx.invoiceNumber}</div>
                      <div className="text-[10px] text-slate-400">
                        {new Date(trx.timestamp).toLocaleString('id-ID')}
                      </div>
                    </td>

                    {/* Cashier */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-800 dark:text-slate-200">{trx.cashierName}</div>
                    </td>

                    {/* Items preview */}
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="text-slate-700 dark:text-slate-300 font-medium truncate">
                        {trx.items.map(i => `${i.name} (x${i.quantity})`).join(', ')}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {trx.items.reduce((acc, curr) => acc + curr.quantity, 0)} Total Item
                      </div>
                    </td>

                    {/* Total Net */}
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900 dark:text-white">
                      {formatRupiah(trx.totalNet)}
                    </td>

                    {/* Payment Method */}
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold font-mono uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                        {trx.paymentMethod}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                        isVoid
                          ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-300'
                          : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300'
                      }`}>
                        {trx.status}
                      </span>
                      {isVoid && (
                        <div className="text-[10px] text-rose-600 dark:text-rose-400 mt-1 max-w-xs truncate" title={trx.voidReason}>
                          {trx.voidReason}
                        </div>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenReceipt(trx)}
                          className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          title="Lihat Detail & Cetak Struk"
                        >
                          <Printer className="w-4 h-4" />
                        </button>

                        {!isVoid && (
                          <button
                            onClick={() => handleOpenVoidModal(trx)}
                            className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800 hover:bg-rose-600 hover:text-white text-[10px] font-bold uppercase tracking-wider transition-colors flex items-center gap-1"
                            title="Central Void Center (Owner/Manager Override)"
                          >
                            <AlertOctagon className="w-3 h-3" />
                            <span>Void</span>
                          </button>
                        )}
                      </div>
                    </td>

                  </tr>
                );
              })}
              {filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 text-xs">
                    Tidak ada transaksi ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: PRINTABLE RECEIPT PREVIEW */}
      {isReceiptModalOpen && selectedTrxDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4">
            
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                <Printer className="w-4 h-4" />
                Cetak Ulang Struk Thermal (58mm/80mm)
              </h3>
              <button onClick={() => setIsReceiptModalOpen(false)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Simulated Receipt Preview Canvas */}
            <div className="p-4 bg-amber-50/50 dark:bg-slate-950 font-mono text-[11px] text-slate-900 dark:text-slate-100 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 space-y-3">
              <div className="text-center space-y-0.5">
                <div className="font-bold text-sm tracking-widest uppercase">POSIFY / EASYPOS STORE</div>
                <div>Jl. Sudirman Central Business District, Jakarta</div>
                <div>Telp: (021) 555-8890</div>
                <div className="text-[10px] text-slate-400">====================================</div>
              </div>

              <div className="space-y-0.5">
                <div className="flex justify-between">
                  <span>No Faktur:</span>
                  <span className="font-bold">{selectedTrxDetail.invoiceNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span>Waktu:</span>
                  <span>{new Date(selectedTrxDetail.timestamp).toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Kasir:</span>
                  <span>{selectedTrxDetail.cashierName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className="font-bold">{selectedTrxDetail.status}</span>
                </div>
                <div className="text-[10px] text-slate-400">------------------------------------</div>
              </div>

              {/* Items List */}
              <div className="space-y-2">
                {selectedTrxDetail.items.map((item, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="font-bold">{item.name}</div>
                    <div className="flex justify-between text-[10px] text-slate-600 dark:text-slate-400">
                      <span>{item.quantity} x {formatRupiah(item.sellPriceSnapshot)}</span>
                      <span className="font-mono">{formatRupiah(item.subtotal)}</span>
                    </div>
                  </div>
                ))}
                <div className="text-[10px] text-slate-400">------------------------------------</div>
              </div>

              {/* Totals */}
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{formatRupiah(selectedTrxDetail.totalGross)}</span>
                </div>
                {selectedTrxDetail.discount > 0 && (
                  <div className="flex justify-between text-rose-600">
                    <span>Diskon:</span>
                    <span>-{formatRupiah(selectedTrxDetail.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Pajak (PB1/10%):</span>
                  <span>{formatRupiah(selectedTrxDetail.tax)}</span>
                </div>
                <div className="flex justify-between font-bold text-sm border-t border-slate-300 dark:border-slate-700 pt-1">
                  <span>TOTAL NET:</span>
                  <span>{formatRupiah(selectedTrxDetail.totalNet)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Bayar ({selectedTrxDetail.paymentMethod}):</span>
                  <span>{formatRupiah(selectedTrxDetail.amountPaid)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Kembalian:</span>
                  <span>{formatRupiah(selectedTrxDetail.change)}</span>
                </div>
              </div>

              <div className="text-center pt-2 border-t border-dashed border-slate-300 dark:border-slate-700 text-[10px] text-slate-500">
                Terima kasih atas kunjungan Anda!
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsReceiptModalOpen(false)}
                className="px-4 py-2 rounded-full border border-slate-200 text-xs font-bold uppercase tracking-wider"
              >
                Tutup
              </button>
              <button
                onClick={handlePrintReceipt}
                className="px-6 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-widest text-xs flex items-center gap-2"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Cetak Struk Now</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL 2: CENTRAL VOID CENTER */}
      {isVoidModalOpen && voidTargetTrx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
                <AlertOctagon className="w-5 h-5" />
                <h3 className="text-base font-bold">Central Void Center (Override)</h3>
              </div>
              <button onClick={() => setIsVoidModalOpen(false)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-xs space-y-1">
              <div className="font-bold flex items-center gap-1">
                <ShieldAlert className="w-4 h-4" />
                <span>Otorisasi Role: {userRole} Override</span>
              </div>
              <p>
                Owner/Manager berhak membatalkan transaksi tanpa batas waktu 15 menit. Stok item akan dipulihkan secara otomatis ke database.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs space-y-1 font-mono">
              <div>Faktur: <span className="font-bold text-slate-900 dark:text-white">{voidTargetTrx.invoiceNumber}</span></div>
              <div>Nominal Total: <span className="font-bold text-slate-900 dark:text-white">{formatRupiah(voidTargetTrx.totalNet)}</span></div>
              <div>Kasir Pembuat: <span className="text-slate-600 dark:text-slate-300">{voidTargetTrx.cashierName}</span></div>
            </div>

            <form onSubmit={handleExecuteVoid} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">
                  Alasan Pembatalan Transaksi (Mandatory)
                </label>
                <textarea
                  required
                  rows={3}
                  value={voidReason}
                  onChange={(e) => setVoidReason(e.target.value)}
                  placeholder="Jelaskan alasan void secara mendetail..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsVoidModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-slate-200 text-xs font-bold uppercase tracking-wider"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-rose-600 text-white font-bold uppercase tracking-widest text-xs flex items-center gap-1.5 hover:bg-rose-700 transition-colors"
                >
                  <AlertOctagon className="w-3.5 h-3.5" />
                  <span>Konfirmasi Central Void</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
