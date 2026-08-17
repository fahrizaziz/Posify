import React, { useState } from 'react';
import { ENGINEER_PROFILE, TECH_SKILLS, EXPERIENCE_HISTORY, PROJECT_CASE_STUDIES } from '../data/engineerData';
import { Terminal as TerminalIcon, CornerDownLeft } from 'lucide-react';

export const DevTerminal: React.FC = () => {
  const [commandInput, setCommandInput] = useState<string>('');
  const [logs, setLogs] = useState<{ command?: string; response: string | React.ReactNode }[]>([
    {
      response: (
        <div className="space-y-1 text-slate-300 font-mono">
          <p className="text-white font-bold">Anugerah Pratama Developer CLI v10.4.0</p>
          <p className="text-slate-400">Ketik <span className="text-white font-bold underline">help</span> untuk melihat daftar perintah yang tersedia.</p>
        </div>
      ),
    },
  ]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = commandInput.trim().toLowerCase();
    if (!cmd) return;

    let responseNode: React.ReactNode = '';

    switch (cmd) {
      case 'help':
        responseNode = (
          <div className="space-y-1 text-xs font-mono">
            <p className="text-white font-bold">Perintah Terdaftar:</p>
            <p><span className="text-emerald-400">skills</span> - Daftar keahlian teknis & mastery level</p>
            <p><span className="text-emerald-400">experience</span> - Riwayat karir 10+ tahun</p>
            <p><span className="text-emerald-400">projects</span> - Ringkasan proyek enterprise</p>
            <p><span className="text-emerald-400">contact</span> - Informasi kontak profesional</p>
            <p><span className="text-emerald-400">clear</span> - Bersihkan layar terminal</p>
          </div>
        );
        break;

      case 'skills':
        responseNode = (
          <div className="space-y-1 text-xs font-mono">
            <p className="text-white font-bold">Tech Stack Mastery (10+ Yrs Exp):</p>
            {TECH_SKILLS.map((s) => (
              <p key={s.name}>
                <span className="text-slate-200 font-semibold">{s.name}:</span> {s.level}% — {s.description}
              </p>
            ))}
          </div>
        );
        break;

      case 'experience':
        responseNode = (
          <div className="space-y-2 text-xs font-mono">
            <p className="text-white font-bold">Ringkasan Karir:</p>
            {EXPERIENCE_HISTORY.map((exp) => (
              <div key={exp.role} className="border-l border-slate-700 pl-2">
                <p className="font-bold text-white">{exp.role} @ {exp.company} ({exp.period})</p>
                <p className="text-slate-400">{exp.impactMetric}</p>
              </div>
            ))}
          </div>
        );
        break;

      case 'projects':
        responseNode = (
          <div className="space-y-2 text-xs font-mono">
            <p className="text-white font-bold">Proyek Enterprise Utama:</p>
            {PROJECT_CASE_STUDIES.map((p) => (
              <p key={p.id}>
                <span className="text-slate-200 font-semibold">{p.title}:</span> {p.description}
              </p>
            ))}
          </div>
        );
        break;

      case 'contact':
        responseNode = (
          <div className="text-xs space-y-1 font-mono">
            <p className="text-white font-bold">Kontak Profesional:</p>
            <p>Email: <span className="text-emerald-400">anugerah.engineer@studio.dev</span></p>
            <p>Status: <span className="text-white font-semibold">{ENGINEER_PROFILE.status}</span></p>
          </div>
        );
        break;

      case 'clear':
        setLogs([]);
        setCommandInput('');
        return;

      default:
        responseNode = (
          <p className="text-rose-400 text-xs font-mono">
            Perintah tidak dikenali: '{cmd}'. Ketik <span className="text-white font-bold">help</span> untuk bantuan.
          </p>
        );
    }

    setLogs((prev) => [...prev, { command: cmd, response: responseNode }]);
    setCommandInput('');
  };

  return (
    <section className="py-12 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-black dark:bg-white"></span>
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-slate-400 dark:text-slate-500">
                Command Line Interface
              </span>
            </div>
            <h2 className="text-2xl font-light text-slate-900 dark:text-white tracking-tight">
              Developer <span className="italic font-serif">CLI Terminal</span>
            </h2>
          </div>
        </div>

        <div className="rounded-2xl bg-black border border-slate-800 p-6 font-mono text-xs shadow-2xs space-y-4 min-h-[350px] flex flex-col justify-between">
          
          <div className="space-y-4 overflow-y-auto max-h-[320px] pr-2">
            {logs.map((log, idx) => (
              <div key={idx} className="space-y-1">
                {log.command && (
                  <div className="flex items-center gap-2 text-slate-500">
                    <span className="text-white font-bold">anugerah@dev-box:~$</span>
                    <span className="text-white font-semibold">{log.command}</span>
                  </div>
                )}
                <div className="pl-4 border-l border-slate-800">{log.response}</div>
              </div>
            ))}
          </div>

          <form onSubmit={handleCommandSubmit} className="flex items-center gap-2 border-t border-slate-800/80 pt-3">
            <span className="text-slate-400 font-bold shrink-0">anugerah@dev-box:~$</span>
            <input
              type="text"
              value={commandInput}
              onChange={(e) => setCommandInput(e.target.value)}
              placeholder="ketik perintah (misal: help, skills, experience, projects, contact)..."
              className="w-full bg-transparent text-slate-100 focus:outline-none placeholder-slate-600 font-mono"
            />
            <button type="submit" className="text-slate-400 hover:text-white p-1">
              <CornerDownLeft className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>
    </section>
  );
};
