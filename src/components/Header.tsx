import React from 'react';
import { TabType } from '../types';
import { ENGINEER_PROFILE } from '../data/engineerData';
import { Code2, Sparkles, Terminal, Palette, Zap, Briefcase, Sun, Moon, Send } from 'lucide-react';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onOpenContact: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  darkMode,
  setDarkMode,
  onOpenContact,
}) => {
  const navItems: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <Code2 className="w-3.5 h-3.5" /> },
    { id: 'playground', label: 'UI Lab', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'case-studies', label: 'Case Studies', icon: <Briefcase className="w-3.5 h-3.5" /> },
    { id: 'tailwind-lab', label: 'Design Tokens', icon: <Palette className="w-3.5 h-3.5" /> },
    { id: 'tech-radar', label: 'Web Vitals', icon: <Zap className="w-3.5 h-3.5" /> },
    { id: 'terminal', label: 'CLI Terminal', icon: <Terminal className="w-3.5 h-3.5" /> },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/90 dark:bg-slate-950/90 border-b border-slate-100 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo & Senior Title */}
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 bg-black dark:bg-white rounded-lg flex items-center justify-center font-bold text-white dark:text-black shrink-0">
              <span className="text-base font-extrabold tracking-tight">A</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 dark:text-white tracking-tight text-base sm:text-lg">
                  {ENGINEER_PROFILE.name}
                </span>
                <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-widest font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                  10+ Yrs
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-[0.15em] text-slate-400 font-semibold hidden md:block">
                Senior Front-End Engineer & UI Architect
              </p>
            </div>
          </div>

          {/* Navigation Tabs - Desktop */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 py-1 text-xs font-semibold uppercase tracking-wider transition-all border-b-2 ${
                    isActive
                      ? 'text-black dark:text-white border-black dark:border-white'
                      : 'text-slate-400 dark:text-slate-500 hover:text-black dark:hover:text-white border-transparent'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3">
            {/* Status indicator */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-[10px] font-semibold uppercase tracking-widest text-slate-600 dark:text-slate-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Available for collaboration</span>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-800"
              title="Toggle Light/Dark Theme"
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Contact / Hire CTA */}
            <button
              onClick={onOpenContact}
              className="px-5 py-2 bg-black dark:bg-white text-white dark:text-black text-xs font-bold uppercase tracking-widest rounded-full hover:opacity-90 transition-all shadow-xs"
            >
              Connect
            </button>
          </div>
        </div>

        {/* Mobile Navigation Tabs bar */}
        <div className="flex lg:hidden overflow-x-auto pb-3 pt-1 gap-2 border-t border-slate-100 dark:border-slate-800 no-scrollbar">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-black text-white dark:bg-white dark:text-black'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
};
