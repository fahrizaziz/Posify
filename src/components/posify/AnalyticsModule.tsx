import React, { useState } from 'react';
import { UserRole, Transaction, Category } from '../../types/posify';
import { FileSpreadsheet, Printer, ShieldAlert, Download, Calendar, Filter, PieChart, TrendingUp, DollarSign } from 'lucide-react';
import * as XLSX from 'xlsx';

interface AnalyticsModuleProps {
  userRole: UserRole;
  transactions: Transaction[];
  categories: Category[];
}

export const AnalyticsModule: React.FC<AnalyticsModuleProps> = ({
  userRole,
  transactions,
  categories
}) => {
  const [dateRange, setDateRange] = useState<'ALL' | 'TODAY' | 'WEEK' | 'MONTH'>('ALL');

  const completedTrx = transactions.filter(t => t.status === 'COMPLETED');

  // Compute Totals
  const totalGrossRevenue = completedTrx.reduce((acc, curr) => acc + curr.totalGross, 0);
  const totalDiscount = completedTrx.reduce((acc, curr) => acc + curr.discount, 0);
  const totalTax = completedTrx.reduce((acc, curr) => acc + curr.tax, 0);
  const totalNetRevenue = completedTrx.reduce((acc, curr) => acc + curr.totalNet, 0);
  const totalHpp = completedTrx.reduce((acc, curr) => acc + curr.totalHpp, 0);
  const totalNetProfit = totalNetRevenue - totalHpp;

  // Payment Method Distribution
  const paymentStats = {
    TUNAI: completedTrx.filter(t => t.paymentMethod === 'TUNAI').reduce((acc, curr) => acc + curr.totalNet, 0),
    QRIS: completedTrx.filter(t => t.paymentMethod === 'QRIS').reduce((acc, curr) => acc + curr.totalNet, 0),
    TRANSFER: completedTrx.filter(t => t.paymentMethod === 'TRANSFER').reduce((acc, curr) => acc + curr.totalNet, 0)
  };

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  // M-5.2 File Export Service (Excel .xlsx with CASL RBAC Column Enforcement)
  const handleExportExcel = () => {
    // PRD Rule: Manager can export sales report WITHOUT HPP and Profit Margin columns!
    const excelData = completedTrx.map((t, idx) => {
      const baseRow: any = {
        'No.': idx + 1,
        'No. Faktur': t.invoiceNumber,
        'Waktu Transaksi': new Date(t.timestamp).toLocaleString('id-ID'),
        'Kasir': t.cashierName,
        'Metode Pembayaran': t.paymentMethod,
        'Total Gross (Rp)': t.totalGross,
        'Diskon (Rp)': t.discount,
        'Pajak PB1 (Rp)': t.tax,
        'Total Net Omzet (Rp)': t.totalNet
      };

      // IF OWNER: Append HPP and Net Profit columns
      if (userRole === 'OWNER') {
        baseRow['Total HPP Modal (Rp - Owner)'] = t.totalHpp;
        baseRow['Net Profit Bersih (Rp - Owner)'] = t.totalNet - t.totalHpp;
        baseRow['Margin Profit (%)'] = `${Math.round(((t.totalNet - t.totalHpp) / (t.totalNet || 1)) * 100)}%`;
      }

      return baseRow;
    });

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Laporan_Penjualan_Posify');

    const roleSuffix = userRole === 'OWNER' ? 'OwnerFull' : 'ManagerLimited';
    const fileName = `Posify_Sales_Report_${roleSuffix}_${new Date().toISOString().slice(0, 10)}.xlsx`;
    
    XLSX.writeFile(workbook, fileName);
  };

  const handlePrintPDFReport = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header & Export Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Modul M-5 • Reporting & Financial Analytics
          </div>
          <h2 className="text-2xl font-light text-slate-900 dark:text-white tracking-tight">
            Laporan Keuangan Kompleks & <span className="italic font-serif">Export Engine</span>
          </h2>
        </div>

        {/* Export Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportExcel}
            className="px-4 py-2 rounded-full bg-emerald-700 text-white font-bold uppercase tracking-widest text-xs hover:bg-emerald-800 transition-colors flex items-center gap-2 shadow-xs"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Export Excel (.xlsx)</span>
          </button>

          <button
            onClick={handlePrintPDFReport}
            className="px-4 py-2 rounded-full border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold uppercase tracking-widest text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak PDF / Print</span>
          </button>
        </div>
      </div>

      {/* RBAC Export Matrix Banner */}
      <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-start gap-3 text-xs">
        <div className="p-2 rounded-xl bg-black text-white dark:bg-white dark:text-black shrink-0">
          <ShieldAlert className="w-4 h-4" />
        </div>
        <div>
          <span className="font-bold text-slate-900 dark:text-white">Ketentuan Ekspor RBAC Posify:</span>
          <p className="text-slate-600 dark:text-slate-300 font-light mt-0.5">
            Role <span className="font-bold text-black dark:text-white">{userRole}</span> sedang aktif. {userRole === 'OWNER' ? 'File Excel yang diunduh mencakup rincian HPP, Net Profit Margin, dan analisis modal secara penuh.' : 'Sesuai spesifikasi PRD, file Excel yang diunduh oleh Role Manager OTOMATIS MENYEMBUNYIKAN kolom HPP dan Net Profit Margin.'}
          </p>
        </div>
      </div>

      {/* Financial Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Total Omzet Net</div>
          <div className="text-2xl font-light text-slate-900 dark:text-white">{formatRupiah(totalNetRevenue)}</div>
          <div className="text-[10px] text-slate-500 font-mono">Gross: {formatRupiah(totalGrossRevenue)}</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Total Pajak PB1 Collected</div>
          <div className="text-2xl font-light text-slate-900 dark:text-white">{formatRupiah(totalTax)}</div>
          <div className="text-[10px] text-slate-500 font-mono">Diskon Total: {formatRupiah(totalDiscount)}</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Total HPP Modal</div>
          <div className="text-2xl font-light text-slate-900 dark:text-white">
            {userRole === 'OWNER' ? formatRupiah(totalHpp) : '[Disembunyikan]'}
          </div>
          <div className="text-[10px] text-slate-500 font-mono">Owner Access Required</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-black border border-slate-800 space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-300 dark:text-slate-600">Profit Bersih (Net Margin)</div>
          <div className="text-2xl font-light text-emerald-400 dark:text-emerald-700">
            {userRole === 'OWNER' ? formatRupiah(totalNetProfit) : '[Disembunyikan]'}
          </div>
          <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
            {userRole === 'OWNER' ? `Margin: ~${Math.round((totalNetProfit / (totalNetRevenue || 1)) * 100)}%` : 'RBAC Restricted'}
          </div>
        </div>

      </div>

      {/* Payment Method Distribution Breakdown */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
          Distribusi Metode Pembayaran
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tunai (Cash)</div>
            <div className="text-xl font-bold font-mono text-slate-900 dark:text-white">{formatRupiah(paymentStats.TUNAI)}</div>
            <div className="text-[10px] text-slate-400 font-mono">
              ~{Math.round((paymentStats.TUNAI / (totalNetRevenue || 1)) * 100)}% dari total omzet
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">QRIS Instant</div>
            <div className="text-xl font-bold font-mono text-slate-900 dark:text-white">{formatRupiah(paymentStats.QRIS)}</div>
            <div className="text-[10px] text-slate-400 font-mono">
              ~{Math.round((paymentStats.QRIS / (totalNetRevenue || 1)) * 100)}% dari total omzet
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Transfer Bank</div>
            <div className="text-xl font-bold font-mono text-slate-900 dark:text-white">{formatRupiah(paymentStats.TRANSFER)}</div>
            <div className="text-[10px] text-slate-400 font-mono">
              ~{Math.round((paymentStats.TRANSFER / (totalNetRevenue || 1)) * 100)}% dari total omzet
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
