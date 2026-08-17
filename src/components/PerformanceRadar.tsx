import React, { useState } from 'react';
import { Zap, Gauge, Smartphone, Monitor } from 'lucide-react';

export const PerformanceRadar: React.FC = () => {
  const [deviceType, setDeviceType] = useState<'mobile' | 'desktop'>('mobile');
  const [isAuditing, setIsAuditing] = useState<boolean>(false);
  const [scores, setScores] = useState({
    performance: 99,
    accessibility: 100,
    bestPractices: 100,
    seo: 100,
  });

  const handleRunAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setScores({
        performance: deviceType === 'mobile' ? 98 : 100,
        accessibility: 100,
        bestPractices: 100,
        seo: 100,
      });
      setIsAuditing(false);
    }, 1200);
  };

  const webVitals = [
    { metric: 'LCP (Largest Contentful Paint)', value: deviceType === 'mobile' ? '1.1s' : '0.6s', status: 'Good', target: '< 2.5s', tip: 'Preload hero images & use CSS containment.' },
    { metric: 'INP (Interaction to Next Paint)', value: deviceType === 'mobile' ? '42ms' : '18ms', status: 'Good', target: '< 200ms', tip: 'Avoid long task blocks on main thread.' },
    { metric: 'CLS (Cumulative Layout Shift)', value: '0.00', status: 'Good', target: '< 0.1', tip: 'Set explicit aspect-ratio on media.' },
    { metric: 'FCP (First Contentful Paint)', value: deviceType === 'mobile' ? '0.7s' : '0.4s', status: 'Good', target: '< 1.8s', tip: 'Inline critical CSS via Tailwind CSS v4.' },
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
                Performance Lab
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-light text-slate-900 dark:text-white tracking-tight">
              Core Web <span className="italic font-serif">Vitals Radar</span>
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-light max-w-2xl">
              Uji langsung metrik performa aplikasi web pada perangkat seluler dan desktop dengan standar kelas dunia.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex p-1 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setDeviceType('mobile')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  deviceType === 'mobile'
                    ? 'bg-black text-white dark:bg-white dark:text-black'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile</span>
              </button>

              <button
                onClick={() => setDeviceType('desktop')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  deviceType === 'desktop'
                    ? 'bg-black text-white dark:bg-white dark:text-black'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Desktop</span>
              </button>
            </div>

            <button
              onClick={handleRunAudit}
              disabled={isAuditing}
              className="px-5 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-widest text-xs hover:bg-slate-800 transition-colors flex items-center gap-2"
            >
              <Gauge className="w-3.5 h-3.5" />
              <span>{isAuditing ? 'Auditing...' : 'Run Audit'}</span>
            </button>
          </div>
        </div>

        {/* Lighthouse Score Gauge Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Performance', score: scores.performance },
            { label: 'Accessibility', score: scores.accessibility },
            { label: 'Best Practices', score: scores.bestPractices },
            { label: 'SEO Rating', score: scores.seo },
          ].map((item) => (
            <div
              key={item.label}
              className="p-6 rounded-2xl bg-slate-50/50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 text-center space-y-3"
            >
              <div className="relative inline-flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border-2 border-black dark:border-white flex items-center justify-center text-xl font-light text-slate-900 dark:text-white">
                  {isAuditing ? '...' : item.score}
                </div>
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Web Vitals Table & Optimization Strategies */}
        <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 space-y-4">
          <h3 className="text-sm font-bold tracking-tight text-slate-900 dark:text-white uppercase">
            Detail Metrik Utama & Strategi Optimasi (10+ Yrs Craft)
          </h3>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {webVitals.map((wv, i) => (
              <div key={i} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">{wv.metric}</span>
                  <p className="text-slate-400 font-light mt-0.5">{wv.tip}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-slate-400 font-mono">Target: {wv.target}</span>
                  <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold font-mono border border-slate-200 dark:border-slate-700">
                    {wv.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
