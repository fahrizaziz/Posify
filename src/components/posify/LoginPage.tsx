import React, { useState } from 'react';
import { User } from '../../types/posify';
import { ThemeMode } from './PosifyWebAdmin';
import { Language, LanguageMode, translations } from '../../i18n/translations';
import { api } from '../../lib/api';
import { 
  Shield, 
  Lock, 
  Mail, 
  Key, 
  CheckCircle2, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  Store, 
  Building2, 
  Sun, 
  Moon, 
  Laptop,
  MonitorCheck,
  Globe
} from 'lucide-react';

interface LoginPageProps {
  onLogin: (user: User, token: string) => void;
  allUsers: User[];
  themeMode: ThemeMode;
  onThemeChange: (mode: ThemeMode) => void;
  isResolvedDark: boolean;
  langMode: LanguageMode;
  resolvedLang: Language;
  onLangModeChange: (mode: LanguageMode) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ 
  onLogin, 
  allUsers, 
  themeMode, 
  onThemeChange, 
  isResolvedDark,
  langMode,
  resolvedLang,
  onLangModeChange
}) => {
  const [selectedUserId, setSelectedUserId] = useState<string>(allUsers[0]?.id || '');
  const [emailInput, setEmailInput] = useState<string>(allUsers[0]?.email || 'owner@posify.com');
  const [passwordInput, setPasswordInput] = useState<string>('posify2026!');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [selectedOutlet, setSelectedOutlet] = useState<string>('OUTLET-01');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [issuedJwt, setIssuedJwt] = useState<{ accessToken: string; refreshToken: string } | null>(null);

  const t = translations[resolvedLang];
  const selectedUser = allUsers.find(u => u.id === selectedUserId) || allUsers[0];

  const handleSelectPreset = (user: User) => {
    setSelectedUserId(user.id);
    setEmailInput(user.email);
    setPasswordInput('posify2026!');
    setErrorMsg('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim() || !passwordInput.trim()) {
      setErrorMsg(resolvedLang === 'id' ? 'Email dan Password wajib diisi.' : 'Email and Password are required.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    try {
      const response = await api.post('/auth/login', {
        email: emailInput.trim(),
        password: passwordInput.trim()
      });
      
      const data = response.data;
      setIssuedJwt({ accessToken: data.access_token, refreshToken: data.refresh_token });
      
      // Decoded user info can be extracted from JWT or backend response if needed, 
      // but for now we'll pass a dummy user with the correct email/role based on selectedUser for the UI state.
      const loggedInUser = {
        id: `usr_${Date.now()}`,
        name: emailInput.split('@')[0],
        email: emailInput,
        role: 'OWNER',
        outletId: selectedOutlet,
        active: true,
        createdAt: new Date().toISOString()
      };

      setTimeout(() => {
        setIsLoading(false);
        onLogin(loggedInUser, data.access_token);
      }, 600);
    } catch (err: any) {
      setIsLoading(false);
      setErrorMsg(err.response?.data?.message || 'Login failed');
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'OWNER': return 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-300 dark:border-amber-800';
      case 'MANAGER': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/80 dark:text-indigo-300 border-indigo-300 dark:border-indigo-800';
      case 'INVENTORY_STAFF': return 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border-blue-300 dark:border-blue-800';
      case 'CASHIER': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800';
      default: return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-sans relative overflow-hidden transition-colors duration-200 ${isResolvedDark ? 'dark' : ''}`}>
      
      {/* Background Decorative Gradients */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-600/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Header Bar / Language & Theme Switcher */}
      <div className="w-full max-w-5xl flex flex-wrap items-center justify-between gap-3 mb-6 z-20">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 flex items-center justify-center font-black text-base shadow-sm">
            P
          </div>
          <div>
            <span className="font-extrabold text-sm tracking-tight text-slate-900 dark:text-white">Posify</span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono block leading-none font-semibold">{t.adminSubtitle}</span>
          </div>
        </div>

        {/* Action Controls: Language + Theme */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Language Selector (Auto Browser, ID, EN) */}
          <div className="flex items-center p-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-xs">
            <button
              type="button"
              onClick={() => onLangModeChange('system')}
              className={`px-2.5 py-1 rounded-full transition-all flex items-center gap-1.5 text-xs font-bold ${
                langMode === 'system'
                  ? 'bg-indigo-50 dark:bg-slate-800 text-indigo-700 dark:text-indigo-400 shadow-xs border border-indigo-200 dark:border-indigo-900/50'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
              title="Otomatis mengikuti bahasa sistem browser (navigator.language)"
            >
              <Globe className="w-3.5 h-3.5 text-indigo-500" />
              <span className="text-[11px] hidden sm:inline">{t.langAuto}</span>
              <span className="text-[9px] px-1 py-0.2 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-mono uppercase">
                {resolvedLang}
              </span>
            </button>

            <button
              type="button"
              onClick={() => onLangModeChange('id')}
              className={`px-2.5 py-1 rounded-full transition-all flex items-center gap-1 text-xs font-bold ${
                langMode === 'id'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
              title="Bahasa Indonesia"
            >
              <span>🇮🇩 ID</span>
            </button>

            <button
              type="button"
              onClick={() => onLangModeChange('en')}
              className={`px-2.5 py-1 rounded-full transition-all flex items-center gap-1 text-xs font-bold ${
                langMode === 'en'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
              title="English (US)"
            >
              <span>🇬🇧 EN</span>
            </button>
          </div>

          {/* Theme Selector (Terang, Mengikuti Perangkat/Sistem, Gelap) */}
          <div className="flex items-center p-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-xs">
            <button
              type="button"
              onClick={() => onThemeChange('light')}
              className={`px-2.5 py-1 rounded-full transition-all flex items-center gap-1.5 ${
                themeMode === 'light'
                  ? 'bg-amber-50 dark:bg-slate-800 text-amber-700 dark:text-amber-400 shadow-xs font-bold border border-amber-200 dark:border-amber-900/50'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
              title={t.themeLight}
            >
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-[11px] hidden sm:inline">{t.themeLight}</span>
            </button>

            <button
              type="button"
              onClick={() => onThemeChange('system')}
              className={`px-2.5 py-1 rounded-full transition-all flex items-center gap-1.5 ${
                themeMode === 'system'
                  ? 'bg-emerald-50 dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 shadow-xs font-bold border border-emerald-200 dark:border-emerald-900/50'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
              title={t.themeSystem}
            >
              <Laptop className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-[11px] hidden sm:inline">{t.themeSystem}</span>
              <span className="text-[9px] px-1 py-0.2 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono">
                {isResolvedDark ? 'Dark' : 'Light'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => onThemeChange('dark')}
              className={`px-2.5 py-1 rounded-full transition-all flex items-center gap-1.5 ${
                themeMode === 'dark'
                  ? 'bg-indigo-50 dark:bg-slate-800 text-indigo-700 dark:text-indigo-400 shadow-xs font-bold border border-indigo-200 dark:border-indigo-900/50'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
              title={t.themeDark}
            >
              <Moon className="w-3.5 h-3.5 text-indigo-500" />
              <span className="text-[11px] hidden sm:inline">{t.themeDark}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Left Branding / Marketing Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-xs">
            <Shield className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
            <span>{t.badgeEnterprise}</span>
          </div>

          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Posify POS <span className="text-emerald-600 dark:text-emerald-400">{resolvedLang === 'id' ? 'Executive Engine' : 'Executive Management'}</span>
            </h1>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {t.loginSubtitle}
            </p>
          </div>

          {/* Quick Features List */}
          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 shadow-xs">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
                <Store className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-200">{t.featureMultiOutletTitle}</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">{t.featureMultiOutletDesc}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 shadow-xs">
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shrink-0">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-200">{t.featureAbacTitle}</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">{t.featureAbacDesc}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 shadow-xs">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-200">{t.featureThemeTitle}</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">{t.featureThemeDesc}</p>
              </div>
            </div>
          </div>

          {/* Quick Presets Selection */}
          <div className="pt-2">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2">
              {t.quickDemoAccount}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {allUsers.map((u) => (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => handleSelectPreset(u)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    selectedUserId === u.id
                      ? 'bg-slate-100 dark:bg-slate-800 border-emerald-500 dark:border-emerald-500 ring-1 ring-emerald-500'
                      : 'bg-white dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 dark:text-white truncate">{u.name}</span>
                    <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${getRoleBadgeColor(u.role)}`}>
                      {u.role}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-1">{u.email}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Login Form Card */}
        <div className="lg:col-span-7">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl dark:shadow-2xl space-y-6 transition-colors duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">{t.loginCardHeading}</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">{t.loginCardSubheading}</p>
              </div>
              <div className="p-2.5 rounded-2xl bg-emerald-50 dark:bg-slate-800 border border-emerald-100 dark:border-slate-700 text-emerald-600 dark:text-emerald-400">
                <Key className="w-5 h-5" />
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
                <span className="font-bold">Error:</span> {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Selected Preset Info */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center justify-center">
                    {selectedUser.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">{selectedUser.name}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{selectedUser.email}</p>
                  </div>
                </div>
                <span className={`text-xs font-mono px-2 py-0.5 rounded border ${getRoleBadgeColor(selectedUser.role)}`}>
                  {selectedUser.role}
                </span>
              </div>

              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{t.emailLabel}</span>
                </label>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="user@posify.com"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                />
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{t.passwordLabel}</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full px-3.5 py-2.5 pr-10 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Outlet Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>{t.outletLabel}</span>
                </label>
                <select
                  value={selectedOutlet}
                  onChange={(e) => setSelectedOutlet(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                >
                  <option value="ALL">{t.allOutlets}</option>
                  <option value="OUTLET-01">{t.centralBranch} (OUTLET-01)</option>
                  <option value="OUTLET-02">{t.westBranch} (OUTLET-02)</option>
                  <option value="OUTLET-03">{t.southHub} (OUTLET-03)</option>
                </select>
              </div>

              {/* JWT Simulation Details */}
              {issuedJwt && (
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-emerald-500/30 space-y-1 text-[10px] font-mono">
                  <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> {t.jwtGenerated}
                    </span>
                    <span>{t.jwtExpires}</span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 truncate">Token: {issuedJwt.accessToken}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <span className="animate-pulse">{t.loggingIn}</span>
                ) : (
                  <>
                    <span>{t.loginButton}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 text-center text-[11px] text-slate-500 font-mono flex flex-wrap items-center justify-center gap-2">
              <span>Posify Enterprise System v1.2.0</span>
              <span>•</span>
              <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <Laptop className="w-3 h-3" />
                {themeMode === 'system' ? `${t.theme}: ${t.themeSystem}` : themeMode === 'dark' ? `${t.theme}: ${t.themeDark}` : `${t.theme}: ${t.themeLight}`}
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-bold">
                <Globe className="w-3 h-3" />
                {langMode === 'system' ? `${t.language}: ${t.langAuto} (${resolvedLang.toUpperCase()})` : resolvedLang === 'id' ? 'ID (Bahasa Indonesia)' : 'EN (English)'}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
