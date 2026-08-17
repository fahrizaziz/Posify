import React, { useState } from 'react';
import { PROJECT_CASE_STUDIES } from '../data/engineerData';
import { Briefcase, CheckCircle2, Activity } from 'lucide-react';

export const CaseStudies: React.FC = () => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>('design-system-scale');

  // Interactive Mini-Demo State for Case Study 2 (Analytics Simulator)
  const [chartData, setChartData] = useState([
    { time: '10:00', throughput: 4200, latency: 18 },
    { time: '10:05', throughput: 6800, latency: 22 },
    { time: '10:10', throughput: 8900, latency: 19 },
    { time: '10:15', throughput: 10400, latency: 24 },
    { time: '10:20', throughput: 9200, latency: 21 },
  ]);

  // Interactive Mini-Demo State for Case Study 3 (Checkout Flow)
  const [checkoutStep, setCheckoutStep] = useState<number>(1);

  const activeCase = PROJECT_CASE_STUDIES.find((c) => c.id === selectedCaseId) || PROJECT_CASE_STUDIES[0];

  const handleSimulateThroughput = () => {
    const nextThru = Math.floor(Math.random() * 4000) + 7000;
    const nextLat = Math.floor(Math.random() * 10) + 16;
    const nextTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setChartData((prev) => [...prev.slice(1), { time: nextTime, throughput: nextThru, latency: nextLat }]);
  };

  return (
    <section className="py-12 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-black dark:bg-white"></span>
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-slate-400 dark:text-slate-500">
                Architectural Milestones
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-light text-slate-900 dark:text-white tracking-tight">
              Enterprise <span className="italic font-serif">Case Studies</span>
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-light max-w-2xl">
              Studi kasus nyata implementasi React 19, Tailwind CSS, serta optimasi performa berstandar enterprise.
            </p>
          </div>
        </div>

        {/* Case Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PROJECT_CASE_STUDIES.map((project) => {
            const isSelected = project.id === selectedCaseId;
            return (
              <button
                key={project.id}
                onClick={() => setSelectedCaseId(project.id)}
                className={`p-6 rounded-2xl text-left transition-all border ${
                  isSelected
                    ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-900/60 border-slate-100 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className={`text-[10px] font-bold uppercase tracking-widest ${isSelected ? 'text-slate-300 dark:text-slate-600' : 'text-slate-400'}`}>
                  {project.clientCategory}
                </div>
                <h3 className={`text-base font-semibold tracking-tight mt-1 ${isSelected ? 'text-white dark:text-black' : 'text-slate-900 dark:text-slate-100'}`}>
                  {project.title}
                </h3>
                <p className={`text-xs mt-2 font-light line-clamp-2 ${isSelected ? 'text-slate-300 dark:text-slate-700' : 'text-slate-500 dark:text-slate-400'}`}>
                  {project.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Case Study Detail & Live Prototype Stage */}
        <div className="p-8 rounded-3xl bg-slate-50/60 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 space-y-8">
          
          {/* Metrics Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-b border-slate-200/60 dark:border-slate-800 pb-6">
            {activeCase.metrics.map((m, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 space-y-1">
                <div className="text-3xl font-light text-slate-900 dark:text-white tracking-tight">{m.value}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{m.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Story & Architecture Notes */}
            <div className="lg:col-span-6 space-y-4">
              <h3 className="text-xl font-light text-slate-900 dark:text-white tracking-tight">
                {activeCase.title}
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-400 font-light leading-relaxed">
                {activeCase.fullStory}
              </p>

              <div className="space-y-2 pt-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Core Technologies:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeCase.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-900 text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Interactive Case Mini-Prototype Stage */}
            <div className="lg:col-span-6 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-2xs space-y-4">
              
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-black dark:text-white flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-black dark:text-white" />
                  Live Interactive Prototype
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">
                  Active Demo
                </span>
              </div>

              {/* DEMO 1: Design System Token Previewer */}
              {activeCase.liveInteractiveType === 'design-system' && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-light">
                    Sistem Token Warna & Button States dari Design System Enterprise:
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <button className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full bg-black text-white dark:bg-white dark:text-black">
                      Primary Token
                    </button>
                    <button className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                      Secondary Token
                    </button>
                    <button className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300">
                      Success Token
                    </button>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-1 font-mono">
                    <div className="font-bold text-slate-900 dark:text-white">Design Token Config:</div>
                    <code className="text-[11px] text-slate-600 dark:text-slate-400">--color-primary: #0f172a; --radius-base: 9999px;</code>
                  </div>
                </div>
              )}

              {/* DEMO 2: Realtime Analytics Simulator */}
              {activeCase.liveInteractiveType === 'analytics' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                      Simulasi Throughput Event:
                    </span>
                    <button
                      onClick={handleSimulateThroughput}
                      className="px-3 py-1.5 rounded-full bg-black text-white dark:bg-white dark:text-black text-[10px] font-bold uppercase tracking-widest"
                    >
                      Ping New Data
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 text-white space-y-3 font-mono text-xs">
                    {chartData.map((d, idx) => (
                      <div key={idx} className="flex justify-between items-center border-b border-slate-800 pb-1">
                        <span className="text-slate-500">{d.time}</span>
                        <span className="text-white font-bold">{d.throughput} req/s</span>
                        <span className="text-emerald-400">{d.latency}ms</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* DEMO 3: Checkout Wizard */}
              {activeCase.liveInteractiveType === 'e-commerce' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 pb-2">
                    <span>Tahap Checkout: {checkoutStep} dari 3</span>
                    <span className="text-emerald-500">INP Latency: 38ms</span>
                  </div>

                  {checkoutStep === 1 && (
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Alamat Pengiriman</label>
                      <input
                        type="text"
                        defaultValue="Sudirman Central Business District, Jakarta"
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                      />
                      <button
                        onClick={() => setCheckoutStep(2)}
                        className="w-full py-2.5 bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-widest text-[10px] rounded-full"
                      >
                        Lanjut ke Pembayaran
                      </button>
                    </div>
                  )}

                  {checkoutStep === 2 && (
                    <div className="space-y-3">
                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-medium">
                        Diskon otomatis 10% diterapkan!
                      </div>
                      <button
                        onClick={() => setCheckoutStep(3)}
                        className="w-full py-2.5 bg-emerald-600 text-white font-bold uppercase tracking-widest text-[10px] rounded-full"
                      >
                        Bayar Sekarang (Rp 450.000)
                      </button>
                    </div>
                  )}

                  {checkoutStep === 3 && (
                    <div className="text-center py-4 space-y-2">
                      <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                      <div className="text-sm font-bold text-slate-900 dark:text-white">Transaksi Berhasil!</div>
                      <button
                        onClick={() => setCheckoutStep(1)}
                        className="text-xs text-slate-400 hover:text-black dark:hover:text-white uppercase font-bold tracking-widest"
                      >
                        Reset Simulasi
                      </button>
                    </div>
                  )}
                </div>
              )}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
