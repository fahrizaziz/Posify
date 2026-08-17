import React from 'react';
import { EXPERIENCE_HISTORY } from '../data/engineerData';
import { Briefcase, MapPin, CheckCircle2, Star } from 'lucide-react';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section className="py-16 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-black dark:bg-white"></span>
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-slate-400 dark:text-slate-500">
              10+ Years Career Trajectory
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-light text-slate-900 dark:text-white tracking-tight">
            Engineering Evolution & <span className="italic font-serif">Leadership</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-light max-w-2xl">
            Dari membangun SPA responsif sederhana hingga memimpin arsitektur Design System berskala jutaan pengguna aktif harian.
          </p>
        </div>

        {/* Timeline Items */}
        <div className="relative border-l border-slate-200 dark:border-slate-800 ml-4 sm:ml-32 space-y-10">
          {EXPERIENCE_HISTORY.map((exp, idx) => (
            <div key={idx} className="relative pl-6 sm:pl-10 group">
              
              {/* Timeline Bullet Node */}
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-black dark:text-white shadow-2xs group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all">
                <Briefcase className="w-3.5 h-3.5" />
              </div>

              {/* Year Badge on the Left for Desktop */}
              <div className="hidden sm:block absolute -left-32 top-2 w-24 text-right">
                <span className="text-[10px] uppercase tracking-widest font-bold text-slate-500 dark:text-slate-400">
                  {exp.period}
                </span>
              </div>

              {/* Content Card */}
              <div className="p-6 rounded-2xl bg-slate-50/60 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 dark:border-slate-800 pb-4">
                  <div>
                    <div className="sm:hidden text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">
                      {exp.period}
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white tracking-tight">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
                      <span className="text-slate-800 dark:text-slate-200 font-bold">{exp.company}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Impact Badge */}
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black text-white dark:bg-white dark:text-black text-[10px] uppercase tracking-wider font-bold w-fit">
                    <Star className="w-3 h-3 fill-current" />
                    {exp.impactMetric}
                  </span>
                </div>

                {/* Highlights List */}
                <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal">
                  {exp.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                {/* Skills Used Chips */}
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {exp.skillsUsed.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 text-[10px] uppercase tracking-wider font-bold border border-slate-200 dark:border-slate-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
