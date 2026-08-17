import React, { useState } from 'react';
import { COLOR_TOKENS } from '../data/engineerData';
import { Palette, Copy, Check, Type, Sparkles } from 'lucide-react';

export const TailwindLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'colors' | 'typography'>('colors');
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  const typeScales = [
    { label: 'Display Hero (H1)', size: '3.0rem (48px)', leading: '1.1', tracking: '-0.025em', usage: 'Hero headlines, landing key phrases' },
    { label: 'Section Heading (H2)', size: '2.25rem (36px)', leading: '1.2', tracking: '-0.02em', usage: 'Judul bagian utama' },
    { label: 'Card Title (H3)', size: '1.25rem (20px)', leading: '1.4', tracking: '-0.01em', usage: 'Judul kartu & bento block' },
    { label: 'Body Base', size: '1.0rem (16px)', leading: '1.6', tracking: '0em', usage: 'Paragraf deskripsi utama' },
    { label: 'Small Label', size: '0.875rem (14px)', leading: '1.5', tracking: '0.01em', usage: 'Pesan pembantu, metadata' },
    { label: 'Micro Caption', size: '0.75rem (12px)', leading: '1.4', tracking: '0.05em (uppercase)', usage: 'Badge status & label kategori' },
  ];

  return (
    <section className="py-12 bg-white dark:bg-slate-950 min-h-[600px] border-b border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-black dark:bg-white"></span>
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-slate-400 dark:text-slate-500">
                Design System Foundation
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-light text-slate-900 dark:text-white tracking-tight">
              Color Palette & <span className="italic font-serif">Type Scale</span>
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-light max-w-2xl">
              Sistem token warna presisi dan rasio tipografi matematika yang menjamin kenyamanan mata serta memenuhi kriteria kontras WCAG AA.
            </p>
          </div>

          {/* Sub-tabs */}
          <div className="flex items-center p-1 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setActiveTab('colors')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'colors'
                  ? 'bg-black text-white dark:bg-white dark:text-black'
                  : 'text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Color Tokens</span>
            </button>
            <button
              onClick={() => setActiveTab('typography')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'typography'
                  ? 'bg-black text-white dark:bg-white dark:text-black'
                  : 'text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white'
              }`}
            >
              <Type className="w-3.5 h-3.5" />
              <span>Type Scale</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Color Tokens & WCAG Contrast Inspector */}
        {activeTab === 'colors' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {COLOR_TOKENS.map((token) => (
              <div
                key={token.name}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-2xs space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
              >
                {/* Color Swatch Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs flex shrink-0"
                      style={{ backgroundColor: token.hex }}
                    ></span>
                    <div>
                      <h3 className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">{token.name}</h3>
                      <p className="text-xs font-mono text-slate-400">{token.hex}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopy(token.hex)}
                    className="p-2 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors border border-slate-200 dark:border-slate-700"
                    title="Copy HEX Code"
                  >
                    {copiedHex === token.hex ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 font-light border-t border-slate-100 dark:border-slate-800 pt-3">
                  {token.usage}
                </p>

                {/* WCAG Contrast Meters */}
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">Kontras vs Teks Putih:</span>
                    <span className={`font-bold ${token.wcagContrastWhite >= 4.5 ? 'text-emerald-500' : 'text-amber-500'}`}>
                      {token.wcagContrastWhite}:1 {token.wcagContrastWhite >= 4.5 ? '(Pass AA)' : '(Low)'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">Kontras vs Dark Canvas:</span>
                    <span className={`font-bold ${token.wcagContrastDark >= 4.5 ? 'text-emerald-500' : 'text-slate-400'}`}>
                      {token.wcagContrastDark}:1
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Type Scale */}
        {activeTab === 'typography' && (
          <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 space-y-6">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              <Sparkles className="w-3.5 h-3.5 text-black dark:text-white" />
              Modular Typographic Scale (Major Second 1.125 / Perfect Fourth 1.333)
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {typeScales.map((item, i) => (
                <div key={i} className="py-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="md:col-span-3">
                    <div className="text-xs font-bold text-slate-900 dark:text-white">{item.label}</div>
                    <div className="text-[10px] font-mono text-slate-400">{item.size} • LH {item.leading}</div>
                  </div>

                  <div className="md:col-span-6">
                    <div
                      className="font-light text-slate-900 dark:text-white line-clamp-1"
                      style={{ fontSize: item.size.split(' ')[0] }}
                    >
                      Antarmuka Web Modern & Responsif
                    </div>
                  </div>

                  <div className="md:col-span-3 text-xs text-slate-400 font-light">
                    {item.usage}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
