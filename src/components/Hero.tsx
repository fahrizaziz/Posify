import React from 'react';
import { ENGINEER_PROFILE, TECH_SKILLS } from '../data/engineerData';
import { TabType } from '../types';
import { Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Zap, Code2 } from 'lucide-react';

interface HeroProps {
  setActiveTab: (tab: TabType) => void;
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ setActiveTab, onOpenContact }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Column */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Minimal Eyebrow Tag */}
            <div className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-slate-400 dark:text-slate-500">
                Senior Front-End Engineer • 10+ Yrs Experience
              </span>
            </div>

            {/* Typography Heading in Clean Minimalism */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              Architecting <span className="italic font-serif">high-performance</span> React & Tailwind CSS ecosystems.
            </h1>

            {/* Subparagraph */}
            <p className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 font-light leading-relaxed max-w-2xl">
              {ENGINEER_PROFILE.bio} Membangun antarmuka web modern berskala besar dengan fokus utama pada performa Core Web Vitals, arsitektur modular, dan kepatuhan WCAG 2.2 AA.
            </p>

            {/* Core Values Bullet Grid */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>React 19 & Tailwind CSS v4</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Skor Lighthouse 98+ Core Web Vitals</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Standar Aksesibilitas WCAG 2.2 AA</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Micro-frontends & Design Tokens</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => setActiveTab('playground')}
                className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black text-xs font-bold uppercase tracking-widest rounded-full hover:opacity-90 transition-all flex items-center gap-2 shadow-xs"
              >
                <span>UI Component Lab</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveTab('case-studies')}
                className="px-6 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold uppercase tracking-widest rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              >
                <span>Case Studies</span>
              </button>

              <button
                onClick={onOpenContact}
                className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-black dark:hover:text-white transition-colors border-b border-slate-200 dark:border-slate-800"
              >
                Jadwalkan Konsultasi
              </button>
            </div>

          </div>

          {/* Right Metrics & Tech Stack Column */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Minimal Impact Stats */}
            <div className="grid grid-cols-2 gap-4">
              {ENGINEER_PROFILE.metrics.map((metric, idx) => (
                <div 
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 space-y-2"
                >
                  <div className="text-3xl sm:text-4xl font-light text-slate-900 dark:text-white tracking-tight">
                    {metric.value}
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.15em] font-bold text-slate-400 dark:text-slate-500">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Interactive Skill Chips */}
            <div className="p-6 rounded-2xl bg-slate-900 dark:bg-slate-900 text-white border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-white" />
                  Tech Stack Core
                </span>
                <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold">100% Clean Code</span>
              </div>

              <div className="space-y-3">
                {TECH_SKILLS.slice(0, 4).map((skill) => (
                  <div key={skill.name} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-200 font-semibold">{skill.name}</span>
                      <span className="text-slate-400 font-mono">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                      <div 
                        className="bg-white h-full rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex items-center justify-between text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Clean Architecture
                </span>
                <span className="flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  Zero Web Slop
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
