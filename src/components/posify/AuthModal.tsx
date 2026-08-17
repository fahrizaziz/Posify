import React, { useState } from 'react';
import { User, UserRole } from '../../types/posify';
import { X, Lock, Mail, Shield, CheckCircle2, Key, RefreshCw, LogIn, AlertCircle } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  onLogin: (user: User, token: string) => void;
  allUsers: User[];
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  allUsers
}) => {
  const [mode, setMode] = useState<'login' | 'profile' | 'token-info'>('login');
  const [selectedPresetId, setSelectedPresetId] = useState<string>(currentUser.id);
  const [emailInput, setEmailInput] = useState<string>(currentUser.email);
  const [passwordInput, setPasswordInput] = useState<string>('••••••••');
  const [tokenSim, setTokenSim] = useState<{ accessToken: string; refreshToken: string; expiresAt: string } | null>(null);
  const [loginSuccessMsg, setLoginSuccessMsg] = useState<string>('');

  // Password change state for Profile tab
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [profileMsg, setProfileMsg] = useState<string>('');

  if (!isOpen) return null;

  const handleSelectPreset = (user: User) => {
    setSelectedPresetId(user.id);
    setEmailInput(user.email);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const foundUser = allUsers.find(u => u.id === selectedPresetId || u.email.toLowerCase() === emailInput.toLowerCase()) || allUsers[0];
    
    // Generate simulated JWT tokens
    const dummyJwt = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify({ sub: foundUser.id, role: foundUser.role, email: foundUser.email, iat: Date.now() }))}.signature_hash`;
    const dummyRefresh = `refresh_${Math.random().toString(36).substring(2, 15)}`;
    
    const tokenObj = {
      accessToken: dummyJwt,
      refreshToken: dummyRefresh,
      expiresAt: new Date(Date.now() + 86400000).toLocaleString('id-ID')
    };

    setTokenSim(tokenObj);
    onLogin(foundUser, dummyJwt);
    setLoginSuccessMsg(`Berhasil masuk sebagai ${foundUser.name} (${foundUser.role})`);
    
    setTimeout(() => {
      setLoginSuccessMsg('');
    }, 4000);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setProfileMsg('Error: Konfirmasi password baru tidak cocok!');
      return;
    }
    if (newPassword.length < 6) {
      setProfileMsg('Error: Password minimal 6 karakter!');
      return;
    }
    setProfileMsg('Password berhasil diperbarui! JWT Refresh Token diperbarui.');
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-black text-white dark:bg-white dark:text-black">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                Posify Auth & Security Center
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                JWT Auth • Role-Based Access Control (RBAC)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-100 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-950/50 p-1">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
              mode === 'login'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Switch Role / Login
          </button>
          <button
            onClick={() => setMode('profile')}
            className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
              mode === 'profile'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Kelola Profil
          </button>
          <button
            onClick={() => setMode('token-info')}
            className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
              mode === 'token-info'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            JWT Token Inspector
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          
          {loginSuccessMsg && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{loginSuccessMsg}</span>
            </div>
          )}

          {/* MODE 1: LOGIN / SWITCH ROLE */}
          {mode === 'login' && (
            <div className="space-y-5">
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-2">
                  Pilih Preset User & Role (Instant Switch)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {allUsers.map((u) => {
                    const isSelected = selectedPresetId === u.id;
                    const roleColor = u.role === 'OWNER' ? 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border-purple-300'
                      : u.role === 'MANAGER' ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border-blue-300'
                      : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300';

                    return (
                      <button
                        type="button"
                        key={u.id}
                        onClick={() => handleSelectPreset(u)}
                        className={`p-3 rounded-xl border text-left transition-all flex items-start justify-between ${
                          isSelected
                            ? 'bg-slate-900 text-white dark:bg-white dark:text-black border-black dark:border-white ring-2 ring-slate-400 dark:ring-slate-600'
                            : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="text-xs font-bold leading-tight">{u.name}</div>
                          <div className={`text-[10px] font-mono ${isSelected ? 'text-slate-300 dark:text-slate-600' : 'text-slate-500 dark:text-slate-400'}`}>
                            {u.email}
                          </div>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${roleColor}`}>
                          {u.role}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">
                    Email Account
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      required
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="password"
                      required
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-full bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-widest text-[10px] hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors flex items-center justify-center gap-2 mt-2"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Authenticate & Generate JWT Token</span>
                </button>
              </form>
            </div>
          )}

          {/* MODE 2: PROFILE MANAGEMENT */}
          {mode === 'profile' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
                <img
                  src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
                  alt={currentUser.name}
                  className="w-12 h-12 rounded-full object-cover border border-slate-300 dark:border-slate-700"
                />
                <div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">{currentUser.name}</div>
                  <div className="text-xs text-slate-500 font-mono">{currentUser.email} • {currentUser.phone}</div>
                  <div className="text-[10px] uppercase tracking-widest font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                    Role Aktif: {currentUser.role}
                  </div>
                </div>
              </div>

              {profileMsg && (
                <div className={`p-3 rounded-xl text-xs font-medium ${
                  profileMsg.startsWith('Error')
                    ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                    : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                }`}>
                  {profileMsg}
                </div>
              )}

              <form onSubmit={handlePasswordChange} className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  Pembaruan Kata Sandi
                </h4>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">
                    Password Lama
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Masukkan password saat ini"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">
                    Password Baru
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Minimal 6 karakter"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">
                    Konfirmasi Password Baru
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Ulangi password baru"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-full bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-widest text-[10px] hover:bg-slate-800 transition-colors"
                >
                  Update Password & Refresh Session
                </button>
              </form>
            </div>
          )}

          {/* MODE 3: TOKEN INSPECTOR */}
          {mode === 'token-info' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs leading-relaxed flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">NestJS API Security Spec:</span> Semua request dari Web Admin maupun Mobile POS membawa JWT Bearer Token yang berisi klaim `sub` (User ID) dan `role` untuk dievaluasi oleh NestJS Auth Guard & CASL Ability Engine.
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-900 dark:text-white">Active Access Token (JWT):</span>
                  <span className="text-[10px] font-mono text-emerald-500">Bearer Token Valid</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 text-emerald-400 font-mono text-[11px] break-all border border-slate-800">
                  {tokenSim?.accessToken || `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify({ sub: currentUser.id, role: currentUser.role, email: currentUser.email }))}.sig`}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-900 dark:text-white">Refresh Token:</span>
                  <span className="text-[10px] font-mono text-slate-400">Rotated on Login</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 text-slate-300 font-mono text-[11px] break-all border border-slate-800">
                  {tokenSim?.refreshToken || 'refresh_posify_sec_99a8b1c2d3e4'}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs space-y-1 font-mono text-slate-600 dark:text-slate-300">
                <div>User ID: <span className="text-black dark:text-white font-bold">{currentUser.id}</span></div>
                <div>User Role: <span className="text-black dark:text-white font-bold">{currentUser.role}</span></div>
                <div>Permission Scopes: <span className="text-black dark:text-white font-bold">{currentUser.role === 'OWNER' ? 'FULL (All Actions)' : currentUser.role === 'MANAGER' ? 'OPERATIONAL + INVENTORY' : 'POS_TRANSACTION_ONLY'}</span></div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
