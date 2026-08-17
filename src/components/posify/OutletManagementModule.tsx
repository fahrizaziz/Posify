import React, { useState, useEffect } from 'react';
import { Store, Plus, Search, Edit, Trash2, Check, X, Shield, MapPin, Power } from 'lucide-react';
import { Outlet, getOutlets, createOutlet, updateOutlet, deleteOutlet } from '../../lib/api/outlets';
import { UserRole } from '../../types/posify';

interface OutletManagementModuleProps {
  userRole: UserRole;
}

export const OutletManagementModule: React.FC<OutletManagementModuleProps> = ({ userRole }) => {
  const [outlets, setOutlets] = useState<Outlet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOutlet, setEditingOutlet] = useState<Outlet | null>(null);
  const [oName, setOName] = useState('');
  const [oAddress, setOAddress] = useState('');
  const [oActive, setOActive] = useState(true);

  // Toast
  const [toastMsg, setToastMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const fetchOutlets = async () => {
    try {
      setLoading(true);
      const data = await getOutlets();
      setOutlets(data);
    } catch (err) {
      showToast('Gagal memuat data cabang', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOutlets();
  }, []);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMsg({ text, type });
    setTimeout(() => setToastMsg(null), 3000);
  };

  const filteredOutlets = outlets.filter(o => o.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleOpenModal = (outlet?: Outlet) => {
    if (outlet) {
      setEditingOutlet(outlet);
      setOName(outlet.name);
      setOAddress(outlet.address || '');
      setOActive(outlet.isActive);
    } else {
      setEditingOutlet(null);
      setOName('');
      setOAddress('');
      setOActive(true);
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingOutlet) {
        await updateOutlet(editingOutlet.id, {
          name: oName,
          address: oAddress,
          isActive: oActive
        });
        showToast('Cabang berhasil diperbarui');
      } else {
        await createOutlet({
          name: oName,
          address: oAddress,
          isActive: oActive
        });
        showToast('Cabang baru berhasil dibuat');
      }
      setIsModalOpen(false);
      fetchOutlets();
    } catch (err) {
      showToast('Gagal menyimpan data cabang', 'error');
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (!window.confirm(`Apakah Anda yakin ingin menghapus cabang ${name}?`)) return;
    try {
      await deleteOutlet(id);
      showToast('Cabang dihapus');
      fetchOutlets();
    } catch (err) {
      showToast('Gagal menghapus cabang', 'error');
    }
  };

  if (userRole !== 'OWNER') {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center h-[60vh]">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 text-red-500 rounded-full flex items-center justify-center mb-4">
          <Shield className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-medium mb-2">Akses Ditolak</h3>
        <p className="text-slate-500">Hanya OWNER yang dapat mengakses menu Manajemen Cabang.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Modul M-1 • Setup Sistem
          </div>
          <h2 className="text-2xl font-light text-slate-900 dark:text-white tracking-tight">
            Manajemen <span className="italic font-serif">Cabang (Outlet)</span>
          </h2>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-black text-white dark:bg-white dark:text-black px-5 py-2.5 rounded-full font-medium text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Cabang</span>
        </button>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari nama cabang..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent outline-none transition-all"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400">
              <tr>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">ID</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Nama Cabang</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Alamat</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Status</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">Memuat data...</td>
                </tr>
              ) : filteredOutlets.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <Store className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500 text-base">Tidak ada cabang ditemukan</p>
                  </td>
                </tr>
              ) : (
                filteredOutlets.map((outlet) => (
                  <tr key={outlet.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 text-slate-500 font-mono text-xs">{outlet.id}</td>
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                      {outlet.name}
                    </td>
                    <td className="px-6 py-4 text-slate-500 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span className="truncate max-w-[200px]">{outlet.address || '-'}</span>
                    </td>
                    <td className="px-6 py-4">
                      {outlet.isActive ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-xs font-medium">
                          <Check className="w-3.5 h-3.5" />
                          Aktif
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 text-xs font-medium">
                          <Power className="w-3.5 h-3.5" />
                          Nonaktif
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenModal(outlet)}
                          className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                          title="Edit Cabang"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(outlet.id, outlet.name)}
                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          title="Hapus Cabang"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h3 className="font-medium text-lg">
                {editingOutlet ? 'Edit Cabang' : 'Cabang Baru'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                  Nama Cabang *
                </label>
                <input
                  type="text"
                  required
                  value={oName}
                  onChange={(e) => setOName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition-all"
                  placeholder="Contoh: Cabang Sudirman"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                  Alamat Lengkap
                </label>
                <textarea
                  value={oAddress}
                  onChange={(e) => setOAddress(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition-all resize-none"
                  placeholder="Alamat lengkap operasional cabang..."
                />
              </div>

              <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                <div className="flex-1">
                  <h4 className="font-medium text-sm">Status Operasional</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Cabang nonaktif tidak akan bisa diakses oleh kasir.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={oActive}
                    onChange={(e) => setOActive(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-black dark:peer-checked:bg-white"></div>
                </label>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-black text-white dark:bg-white dark:text-black rounded-xl font-medium hover:opacity-90 transition-opacity"
                >
                  Simpan Cabang
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-fade-in-up">
          <div className={`px-6 py-3 rounded-full shadow-xl flex items-center gap-3 text-sm font-medium ${
            toastMsg.type === 'error' ? 'bg-red-500 text-white' : 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
          }`}>
            {toastMsg.type === 'success' && <Check className="w-4 h-4" />}
            {toastMsg.type === 'error' && <AlertTriangle className="w-4 h-4" />}
            {toastMsg.text}
          </div>
        </div>
      )}
    </div>
  );
};
