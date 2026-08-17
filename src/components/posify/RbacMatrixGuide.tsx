import React, { useState } from 'react';
import { UserRole } from '../../types/posify';
import { ShieldCheck, Lock, CheckCircle2, XCircle, ChevronDown, ChevronUp, Clock, Info } from 'lucide-react';

interface RbacMatrixGuideProps {
  currentRole: UserRole;
  onSwitchRole: (role: UserRole) => void;
}

export const RbacMatrixGuide: React.FC<RbacMatrixGuideProps> = ({
  currentRole,
  onSwitchRole
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div className="rounded-2xl bg-slate-900 text-white border border-slate-800 p-5 space-y-4 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-950 text-purple-300 border border-purple-800">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Matrix Otorisasi RBAC + ABAC (@casl/ability)
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-emerald-950 text-emerald-300 border border-emerald-800">
                Active Role: {currentRole}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-light">
              Aturan otorisasi berbasis konteks & batasan waktu void 15 menit (ABAC).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Role Switcher Buttons */}
          <div className="flex p-1 rounded-full bg-slate-950 border border-slate-800 text-[10px] font-bold uppercase tracking-wider">
            <button
              onClick={() => onSwitchRole('OWNER')}
              className={`px-3 py-1 rounded-full transition-all ${currentRole === 'OWNER' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              OWNER
            </button>
            <button
              onClick={() => onSwitchRole('MANAGER')}
              className={`px-3 py-1 rounded-full transition-all ${currentRole === 'MANAGER' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              MANAGER
            </button>
            <button
              onClick={() => onSwitchRole('CASHIER')}
              className={`px-3 py-1 rounded-full transition-all ${currentRole === 'CASHIER' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              CASHIER
            </button>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="pt-3 border-t border-slate-800 space-y-4 text-xs animate-fade-in">
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-950 border-b border-slate-800 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  <th className="py-2.5 px-3">Modul / Fitur</th>
                  <th className="py-2.5 px-3">OWNER</th>
                  <th className="py-2.5 px-3">MANAGER</th>
                  <th className="py-2.5 px-3">CASHIER</th>
                  <th className="py-2.5 px-3">Aturan ABAC & Batasan Kustom</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                
                <tr>
                  <td className="py-2.5 px-3 font-bold text-white">User Management (M-6)</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold">FULL</td>
                  <td className="py-2.5 px-3 text-rose-400 font-bold">❌ No</td>
                  <td className="py-2.5 px-3 text-rose-400 font-bold">❌ No</td>
                  <td className="py-2.5 px-3 text-slate-300">Khusus Owner (Tambah/Edit/Nonaktifkan & Force Reset).</td>
                </tr>

                <tr>
                  <td className="py-2.5 px-3 font-bold text-white">Product & Stock CRUD (M-3)</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold">FULL</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold">FULL</td>
                  <td className="py-2.5 px-3 text-blue-300 font-bold">👁️ Read</td>
                  <td className="py-2.5 px-3 text-slate-300">Kasir hanya dapat melihat katalog tanpa ubah harga/stok.</td>
                </tr>

                <tr>
                  <td className="py-2.5 px-3 font-bold text-white">Void Transaksi (Central)</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold">FULL</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold">FULL</td>
                  <td className="py-2.5 px-3 text-amber-300 font-bold">ABAC Rule</td>
                  <td className="py-2.5 px-3 text-slate-300">
                    Kasir: Transaksi buatan sendiri DAN ≤ 15 menit. Owner/Manager: No time limit.
                  </td>
                </tr>

                <tr>
                  <td className="py-2.5 px-3 font-bold text-white">Detail Profit & HPP (M-2, M-5)</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold">FULL</td>
                  <td className="py-2.5 px-3 text-rose-400 font-bold">❌ No</td>
                  <td className="py-2.5 px-3 text-rose-400 font-bold">❌ No</td>
                  <td className="py-2.5 px-3 text-slate-300">HPP & profit margin disembunyikan dari Manager/Kasir.</td>
                </tr>

                <tr>
                  <td className="py-2.5 px-3 font-bold text-white">Export Excel (.xlsx) (M-5)</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold">FULL</td>
                  <td className="py-2.5 px-3 text-amber-300 font-bold">LIMITED</td>
                  <td className="py-2.5 px-3 text-rose-400 font-bold">❌ No</td>
                  <td className="py-2.5 px-3 text-slate-300">Manager dapat export laporan penjualan tanpa kolom profit margin/HPP.</td>
                </tr>

              </tbody>
            </table>
          </div>

        </div>
      )}
    </div>
  );
};
