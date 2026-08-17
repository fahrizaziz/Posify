import React, { useState } from 'react';
import { User, UserRole } from '../../types/posify';
import { Users, UserPlus, Shield, Lock, Key, Power, AlertTriangle, CheckCircle2, X } from 'lucide-react';

interface UserManagementModuleProps {
  userRole: UserRole;
  allUsers: User[];
  onAddUser: (user: User) => void;
  onToggleUserStatus: (userId: string) => void;
  onResetPassword: (userId: string) => void;
}

export const UserManagementModule: React.FC<UserManagementModuleProps> = ({
  userRole,
  allUsers,
  onAddUser,
  onToggleUserStatus,
  onResetPassword
}) => {
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState<boolean>(false);
  const [resetMsg, setResetMsg] = useState<string>('');

  // Add user form state
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [roleInput, setRoleInput] = useState<UserRole>('CASHIER');
  const [phoneInput, setPhoneInput] = useState('081234567890');

  const handleCreateUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: nameInput,
      email: emailInput,
      role: roleInput,
      phone: phoneInput,
      status: 'ACTIVE',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
      createdAt: new Date().toISOString()
    };
    onAddUser(newUser);
    setIsAddUserModalOpen(false);
    setNameInput('');
    setEmailInput('');
  };

  const handleTriggerReset = (user: User) => {
    onResetPassword(user.id);
    setResetMsg(`Paksa Reset Password dikirim ke email ${user.email}. Password sementara: PosifyReset2026!`);
    setTimeout(() => {
      setResetMsg('');
    }, 5000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Modul M-6 • Manajemen Pengguna & Keamanan (Owner Only)
          </div>
          <h2 className="text-2xl font-light text-slate-900 dark:text-white tracking-tight">
            Pengelolaan Akses Karyawan & <span className="italic font-serif">Force Password Reset</span>
          </h2>
        </div>

        {userRole === 'OWNER' && (
          <button
            onClick={() => setIsAddUserModalOpen(true)}
            className="px-4 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-widest text-xs hover:bg-slate-800 transition-colors flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>Tambah Karyawan Baru</span>
          </button>
        )}
      </div>

      {/* RBAC GUARD BANNER IF NOT OWNER */}
      {userRole !== 'OWNER' && (
        <div className="p-6 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 space-y-3">
          <div className="flex items-center gap-3 text-amber-900 dark:text-amber-200">
            <div className="p-2 rounded-xl bg-amber-200 dark:bg-amber-900 shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold">Akses Dibatasi Matriks RBAC (Role: {userRole})</h3>
              <p className="text-xs text-amber-800 dark:text-amber-300 font-light mt-0.5">
                Sesuai matriks otorisasi PRD, Modul User Management (M-6) khusus untuk Role OWNER. Anda dapat melihat daftar pengguna tetapi tidak dapat menambah, menonaktifkan, atau mereset akun.
              </p>
            </div>
          </div>
        </div>
      )}

      {resetMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{resetMsg}</span>
        </div>
      )}

      {/* User Table */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-100 dark:border-slate-800 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                <th className="py-3 px-4">Nama & Email Karyawan</th>
                <th className="py-3 px-4">Role Akses</th>
                <th className="py-3 px-4">Nomor Telepon</th>
                <th className="py-3 px-4">Status Akun</th>
                <th className="py-3 px-4">Tanggal Dibuat</th>
                <th className="py-3 px-4 text-right">Tindakan Keamanan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {allUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                  
                  {/* Name & Email */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={u.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
                        alt={u.name}
                        className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                      />
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white text-sm">{u.name}</div>
                        <div className="text-[10px] font-mono text-slate-400">{u.email}</div>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      u.role === 'OWNER'
                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                        : u.role === 'MANAGER'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                        : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    }`}>
                      {u.role}
                    </span>
                  </td>

                  {/* Phone */}
                  <td className="py-3.5 px-4 font-mono text-slate-600 dark:text-slate-300">
                    {u.phone}
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                      u.status === 'ACTIVE'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                    }`}>
                      {u.status}
                    </span>
                  </td>

                  {/* Created At */}
                  <td className="py-3.5 px-4 font-mono text-slate-400 text-[10px]">
                    {new Date(u.createdAt).toLocaleDateString('id-ID')}
                  </td>

                  {/* Security Actions */}
                  <td className="py-3.5 px-4 text-right">
                    {userRole === 'OWNER' && u.role !== 'OWNER' ? (
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleTriggerReset(u)}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-[10px] font-bold uppercase tracking-wider transition-colors flex items-center gap-1"
                        >
                          <Key className="w-3 h-3" />
                          <span>Reset Password</span>
                        </button>

                        <button
                          onClick={() => onToggleUserStatus(u.id)}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors flex items-center gap-1 ${
                            u.status === 'ACTIVE'
                              ? 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300 hover:bg-rose-600 hover:text-white'
                              : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 hover:bg-emerald-600 hover:text-white'
                          }`}
                        >
                          <Power className="w-3 h-3" />
                          <span>{u.status === 'ACTIVE' ? 'Nonaktifkan' : 'Aktifkan'}</span>
                        </button>
                      </div>
                    ) : (
                      <span className="text-[10px] text-slate-400 italic">No Action Allowed</span>
                    )}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: ADD USER */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Tambah Akun Karyawan Baru
              </h3>
              <button onClick={() => setIsAddUserModalOpen(false)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUserSubmit} className="space-y-3">
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Rian Hidayat"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">
                  Email Karyawan
                </label>
                <input
                  type="email"
                  required
                  placeholder="rian.cashier@posify.dev"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">
                  Role Otorisasi
                </label>
                <select
                  value={roleInput}
                  onChange={(e) => setRoleInput(e.target.value as UserRole)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold"
                >
                  <option value="MANAGER">MANAGER (Operasional & Inventaris)</option>
                  <option value="CASHIER">CASHIER (Layar Kasir POS)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">
                  Nomor Telepon
                </label>
                <input
                  type="text"
                  required
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddUserModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-slate-200 text-xs font-bold uppercase tracking-wider"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-widest text-xs"
                >
                  Buat Karyawan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
