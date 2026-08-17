import React, { useState } from 'react';
import { UI_COMPONENTS_SHOWCASE } from '../data/engineerData';
import { Sparkles, Copy, Check, Eye, Code, Zap, Layers, Sliders, CheckCircle2 } from 'lucide-react';

export const ComponentPlayground: React.FC = () => {
  const [selectedComponentId, setSelectedComponentId] = useState<string>('interactive-button');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Component Customization Live Props State
  const [buttonVariant, setButtonVariant] = useState<'primary' | 'secondary' | 'outline' | 'danger'>('primary');
  const [borderRadius, setBorderRadius] = useState<'rounded-md' | 'rounded-lg' | 'rounded-xl' | 'rounded-full'>('rounded-full');
  const [paddingSize, setPaddingSize] = useState<'compact' | 'normal' | 'spacious'>('normal');
  const [isLoadingState, setIsLoadingState] = useState<boolean>(false);
  const [isDisableState, setIsDisableState] = useState<boolean>(false);
  const [showIcon, setShowIcon] = useState<boolean>(true);
  const [buttonText, setButtonText] = useState<string>('Confirm Action');

  // Active Selected Item
  const activeComponent = UI_COMPONENTS_SHOWCASE.find((c) => c.id === selectedComponentId) || UI_COMPONENTS_SHOWCASE[0];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Helper padding classes
  const getPaddingClass = () => {
    switch (paddingSize) {
      case 'compact': return 'px-4 py-1.5 text-xs';
      case 'spacious': return 'px-7 py-3 text-sm';
      case 'normal': default: return 'px-6 py-2.5 text-xs';
    }
  };

  // Helper variant classes
  const getVariantClass = () => {
    switch (buttonVariant) {
      case 'secondary':
        return 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700';
      case 'outline':
        return 'bg-transparent text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900';
      case 'danger':
        return 'bg-rose-600 text-white hover:bg-rose-700';
      case 'primary': default:
        return 'bg-black text-white dark:bg-white dark:text-black hover:opacity-90';
    }
  };

  // Dynamic code generator for live preview
  const generateDynamicJSX = () => {
    if (selectedComponentId === 'interactive-button') {
      return `<button 
  disabled={${isDisableState}}
  className="${getPaddingClass()} ${borderRadius} ${getVariantClass()} font-bold uppercase tracking-widest transition-all flex items-center gap-2 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
>
  ${isLoadingState ? `<Spinner className="w-3.5 h-3.5 animate-spin" />` : showIcon ? `<Sparkles className="w-3.5 h-3.5" />` : ''}
  <span>${buttonText}</span>
</button>`;
    }
    return activeComponent.jsxCode;
  };

  return (
    <section className="py-12 bg-white dark:bg-slate-950 min-h-[600px] border-b border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-black dark:bg-white"></span>
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-slate-400 dark:text-slate-500">
                UI Architecture & Component Lab
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-light text-slate-900 dark:text-white tracking-tight">
              Design Tokens & <span className="italic font-serif">Components</span>
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-light max-w-2xl">
              Uji langsung fleksibilitas komponen, atur properti visual secara interaktif, dan salin kode JSX + Tailwind CSS yang bersih serta memenuhi standar WCAG.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>WCAG 2.2 AA Compliant</span>
          </div>
        </div>

        {/* Component Selector Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {UI_COMPONENTS_SHOWCASE.map((comp) => {
            const isSelected = comp.id === selectedComponentId;
            return (
              <button
                key={comp.id}
                onClick={() => setSelectedComponentId(comp.id)}
                className={`p-4 rounded-xl text-left transition-all border ${
                  isSelected
                    ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-900/60 border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className={`text-[10px] uppercase tracking-widest font-bold ${isSelected ? 'text-slate-300 dark:text-slate-600' : 'text-slate-400'}`}>
                  {comp.category}
                </div>
                <div className="text-xs font-bold uppercase tracking-wider mt-1 line-clamp-1">
                  {comp.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Interactive Sandbox Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Live Visual Canvas & Customizer Controls */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Live Interactive Preview Canvas */}
            <div className="p-8 sm:p-12 rounded-2xl bg-slate-50/50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 shadow-2xs min-h-[320px] flex flex-col items-center justify-center relative overflow-hidden group">
              <div className="absolute top-4 left-5 text-[10px] uppercase tracking-widest font-bold text-slate-400 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" />
                Live Preview Stage
              </div>

              {/* RENDER COMPONENT LIVE BASED ON SELECTION */}
              <div className="relative z-10 w-full max-w-sm flex justify-center">
                
                {selectedComponentId === 'interactive-button' && (
                  <button
                    disabled={isDisableState}
                    onClick={() => !isDisableState && !isLoadingState && alert('Tombol di-klik! Action executed.')}
                    className={`${getPaddingClass()} ${borderRadius} ${getVariantClass()} font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isLoadingState ? (
                      <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                    ) : showIcon ? (
                      <Sparkles className="w-3.5 h-3.5" />
                    ) : null}
                    <span>{buttonText}</span>
                  </button>
                )}

                {selectedComponentId === 'bento-card' && (
                  <div className="w-full p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="p-2 rounded-lg bg-black text-white dark:bg-white dark:text-black">
                        <Zap className="w-4 h-4" />
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300">
                        Optimized
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 tracking-tight">Core Web Vitals Engine</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                      LCP &lt; 1.0s, Zero Cumulative Layout Shift (CLS), dan keandalan tinggi pada jaringan seluler 3G/4G.
                    </p>
                  </div>
                )}

                {selectedComponentId === 'custom-form' && (
                  <div className="w-full space-y-3 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                    <div>
                      <label htmlFor="preview-email" className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1.5">
                        Professional Email Address
                      </label>
                      <input
                        id="preview-email"
                        type="email"
                        placeholder="engineer@company.com"
                        className="w-full px-4 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-black dark:focus:border-white"
                      />
                      <p className="text-[10px] text-slate-400 mt-1">Gunakan alamat email resmi perusahaan Anda.</p>
                    </div>
                  </div>
                )}

                {selectedComponentId === 'stat-metric' && (
                  <div className="w-full p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 space-y-2">
                    <div className="text-[10px] uppercase tracking-widest font-bold text-slate-400">
                      Lighthouse Performance Rating
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-light text-slate-900 dark:text-white">99/100</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500">+12% Peak</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-1 rounded-full mt-3 overflow-hidden">
                      <div className="bg-black dark:bg-white h-full w-[99%] rounded-full"></div>
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Customizer Controls Panel (If Button is selected) */}
            {selectedComponentId === 'interactive-button' && (
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
                  <Sliders className="w-4 h-4 text-black dark:text-white" />
                  <span>Interactive Props Modifier</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Variant picker */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1.5">
                      Button Variant
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {(['primary', 'secondary', 'outline', 'danger'] as const).map((v) => (
                        <button
                          key={v}
                          onClick={() => setButtonVariant(v)}
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border ${
                            buttonVariant === v
                              ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white'
                              : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Corner Radius */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1.5">
                      Border Radius
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {(['rounded-md', 'rounded-lg', 'rounded-xl', 'rounded-full'] as const).map((r) => (
                        <button
                          key={r}
                          onClick={() => setBorderRadius(r)}
                          className={`px-2 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border ${
                            borderRadius === r
                              ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white'
                              : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                          }`}
                        >
                          {r.replace('rounded-', '')}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Text Input */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">
                      Button Text Label
                    </label>
                    <input
                      type="text"
                      value={buttonText}
                      onChange={(e) => setButtonText(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none"
                    />
                  </div>

                  {/* Toggles */}
                  <div className="flex items-center gap-4 pt-4">
                    <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isLoadingState}
                        onChange={(e) => setIsLoadingState(e.target.checked)}
                        className="rounded border-slate-300 text-black focus:ring-black"
                      />
                      <span>Loading</span>
                    </label>

                    <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isDisableState}
                        onChange={(e) => setIsDisableState(e.target.checked)}
                        className="rounded border-slate-300 text-black focus:ring-black"
                      />
                      <span>Disabled</span>
                    </label>

                    <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showIcon}
                        onChange={(e) => setShowIcon(e.target.checked)}
                        className="rounded border-slate-300 text-black focus:ring-black"
                      />
                      <span>Icon</span>
                    </label>
                  </div>

                </div>
              </div>
            )}

          </div>

          {/* Right Column: Generated Code Inspection & Tailwind Classes */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Code Output Card */}
            <div className="rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 overflow-hidden">
              
              <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4 text-white" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    JSX & Tailwind Source
                  </span>
                </div>

                <button
                  onClick={() => handleCopyCode(generateDynamicJSX())}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-[10px] text-white font-bold uppercase tracking-wider transition-colors"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code display */}
              <div className="p-4 font-mono text-xs overflow-x-auto text-slate-300 leading-relaxed max-h-[300px]">
                <pre>{generateDynamicJSX()}</pre>
              </div>

              <div className="px-4 py-2.5 bg-slate-950/80 border-t border-slate-800/80 text-[10px] uppercase tracking-widest text-slate-500 flex items-center justify-between font-bold">
                <span>Tailwind CSS v4 Utility First</span>
                <span className="text-emerald-400">Ready</span>
              </div>

            </div>

            {/* Utility Classes Breakdown */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 space-y-3">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-black dark:text-white" />
                Tailwind Classes Applied
              </h3>

              <div className="flex flex-wrap gap-1.5">
                {activeComponent.tailwindClasses.map((cls) => (
                  <span
                    key={cls}
                    className="px-2.5 py-1 rounded-full bg-slate-50 dark:bg-slate-800 font-mono text-[10px] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                  >
                    {cls}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
