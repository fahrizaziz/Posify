import React, { useState } from 'react';
import { X, Send, CheckCircle2, Mail, User } from 'lucide-react';
import { ENGINEER_PROFILE } from '../data/engineerData';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: 'Design System / Advisory',
    message: '',
  });

  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-black dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-black dark:bg-white"></span>
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-slate-400 dark:text-slate-500">
              Direct Advisory Inquiry
            </span>
          </div>
          <h2 className="text-2xl font-light text-slate-900 dark:text-white tracking-tight">
            Hubungi <span className="italic font-serif">{ENGINEER_PROFILE.name}</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-light">
            Tersedia untuk konsultasi arsitektur UI, audit performa React/Tailwind, dan posisi Principal/Lead Engineer.
          </p>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-black dark:text-white w-fit mx-auto border border-slate-200 dark:border-slate-700">
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white tracking-tight">Pesan Berhasil Terkirim!</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-light">
              Terima kasih. Kami akan merespons dalam waktu kurang dari 24 jam.
            </p>
            <button
              onClick={() => { setSubmitted(false); onClose(); }}
              className="px-6 py-2.5 rounded-full bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-widest text-[10px] mt-2"
            >
              Tutup Modal
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">
                Nama Lengkap
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  required
                  type="text"
                  placeholder="Nama Anda"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">
                Email Perusahaan
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  required
                  type="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">
                Kebutuhan Layanan
              </label>
              <select
                value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors"
              >
                <option value="Design System / Advisory">Design System / UI Architecture</option>
                <option value="Core Web Vitals Audit">Core Web Vitals & Performance Audit</option>
                <option value="Principal / Lead Role">Principal / Lead Engineer Position</option>
                <option value="Custom Consultation">Konsultasi Lainnya</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">
                Detail Pesan / Deskripsi Proyek
              </label>
              <textarea
                required
                rows={3}
                placeholder="Jelaskan kebutuhan tim atau proyek Anda..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-widest text-[10px] hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Kirim Pesan Konsultasi</span>
            </button>

          </form>
        )}

      </div>
    </div>
  );
};
