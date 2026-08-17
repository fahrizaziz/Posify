import { TechSkill, ExperienceItem, UIComponentItem, ProjectCaseStudy, ColorToken } from '../types';

export const ENGINEER_PROFILE = {
  name: 'Anugerah Pratama',
  title: 'Principal Front-End Engineer & UI Architect',
  experienceYears: 10,
  tagline: 'Membangun Antarmuka Web Modern, Aksesibel, dan Berkinerja Tinggi dengan React & Tailwind CSS',
  bio: 'Seorang Front-End Engineer senior berpengalaman 10+ tahun dalam merancang design system berskala besar, mengoptimalkan Core Web Vitals, dan memimpin tim pengembang dalam membangun produk SaaS enterprise.',
  location: 'Jakarta, Indonesia (Open to Remote Worldwide)',
  status: 'Tersedia untuk Advisory, Lead Roles, & Konsultasi',
  metrics: [
    { label: 'Tahun Pengalaman', value: '10+' },
    { label: 'Design System Dibangun', value: '14+' },
    { label: 'Komponen UI Modular', value: '350+' },
    { label: 'Rata-rata Score Lighthouse', value: '98/100' },
  ],
};

export const TECH_SKILLS: TechSkill[] = [
  {
    name: 'React 19 & Next.js',
    category: 'Frontend Core',
    level: 98,
    yearsOfExp: 10,
    iconName: 'Code2',
    description: 'Server Components, Hooks Architecture, Concurrent Features, State Optimization.',
    highlightTags: ['React 19', 'RSC', 'Vite', 'Next.js 15'],
  },
  {
    name: 'Tailwind CSS (v3 & v4)',
    category: 'Styling & Design Systems',
    level: 99,
    yearsOfExp: 8,
    iconName: 'Palette',
    description: 'Atomic Design, Dynamic Theming, Arbitrary Variants, Custom Plugins, Design Tokens.',
    highlightTags: ['Tailwind v4', 'CSS Container Queries', 'Design Tokens', 'Dark Mode'],
  },
  {
    name: 'TypeScript & Type Safety',
    category: 'Frontend Core',
    level: 95,
    yearsOfExp: 8,
    iconName: 'FileCode',
    description: 'Generic Abstractions, Strict Mode Pattern, Type-Safe API Contracts.',
    highlightTags: ['Generics', 'Utility Types', 'Strict Nulls', 'Zod Integration'],
  },
  {
    name: 'Web Performance & Web Vitals',
    category: 'Performance & Testing',
    level: 94,
    yearsOfExp: 9,
    iconName: 'Zap',
    description: 'Tree-shaking, Bundle Splitting, INP & LCP Optimization, Asset Preloading.',
    highlightTags: ['INP < 100ms', 'LCP < 1.2s', 'Zero CLS', 'Lighthouse 100'],
  },
  {
    name: 'Accessibility (WCAG 2.2 AA/AAA)',
    category: 'Styling & Design Systems',
    level: 92,
    yearsOfExp: 7,
    iconName: 'Eye',
    description: 'ARIA Roles, Screen Reader Navigation, Focus Trap, Color Contrast Audits.',
    highlightTags: ['Keyboard Nav', 'Screen Readers', 'WAI-ARIA', 'Focus Management'],
  },
  {
    name: 'State Architecture & Micro-frontends',
    category: 'State & Architecture',
    level: 90,
    yearsOfExp: 8,
    iconName: 'Layers',
    description: 'Zustand, TanStack Query, Redux Toolkit, Module Federation, Monorepos.',
    highlightTags: ['Zustand', 'TanStack Query', 'Turborepo', 'Module Federation'],
  },
];

export const EXPERIENCE_HISTORY: ExperienceItem[] = [
  {
    period: '2022 - Sekarang',
    role: 'Principal UI Architect & Design System Lead',
    company: 'Nexus Tech Global',
    location: 'Remote',
    type: 'Full-time',
    highlights: [
      'Memimpin arsitektur Design System enterprise dengan Tailwind CSS v4 & React 19 yang digunakan oleh 45+ engineer.',
      'Meningkatkan performa Core Web Vitals pada aplikasi dashboard utama, menaikkan skor Lighthouse dari 68 menjadi 99/100.',
      'Mengurangi bundle size JavaScript sebesar 42% melalui strategi dynamic imports dan tree-shaking terpadu.',
    ],
    skillsUsed: ['React 19', 'Tailwind CSS', 'TypeScript', 'Design Tokens', 'Lighthouse Optimization'],
    impactMetric: '-42% JS Bundle Size',
  },
  {
    period: '2019 - 2022',
    role: 'Senior Front-End Engineer (Team Lead)',
    company: 'Fintech Scaleup Asia',
    location: 'Jakarta',
    type: 'Full-time',
    highlights: [
      'Membangun platform trading & analytics real-time menggunakan WebSocket, Recharts, dan Tailwind UI.',
      'Mengembangkan 80+ komponen UI reusable dengan cakupan aksesibilitas WCAG 2.1 AA.',
      'Mentoring 12 front-end developer junior dan middle dalam praktik React modern dan clean code.',
    ],
    skillsUsed: ['React', 'Tailwind CSS', 'Zustand', 'Recharts', 'WebSockets', 'Jest'],
    impactMetric: '100% WCAG AA Certified',
  },
  {
    period: '2016 - 2019',
    role: 'Front-End Specialist',
    company: 'Creative Media Studio',
    location: 'Bandung',
    type: 'Full-time',
    highlights: [
      'Mengembangkan 30+ portal web responsif, e-commerce, dan aplikasi interaktif untuk klien internasional.',
      'Pionir migrasi CSS tradisional ke Tailwind CSS di seluruh proyek studio, mempercepat waktu pengerjaan UI hingga 50%.',
    ],
    skillsUsed: ['React', 'Tailwind CSS', 'Sass', 'REST APIs', 'Interactive Canvas'],
    impactMetric: '2x Speedup UI Delivery',
  },
  {
    period: '2014 - 2016',
    role: 'Web Developer & UI Designer',
    company: 'Digital Solutions Lab',
    location: 'Surakarta',
    type: 'Full-time',
    highlights: [
      'Memulai karir membangun antarmuka web interaktif, SPA JavaScript murni, dan layout HTML5/CSS3 responsif.',
    ],
    skillsUsed: ['JavaScript ES6+', 'HTML5', 'CSS3', 'Responsive Design', 'Bootstrap/Tailwind'],
    impactMetric: '10+ Years Foundation',
  },
];

export const UI_COMPONENTS_SHOWCASE: UIComponentItem[] = [
  {
    id: 'interactive-button',
    title: 'Button Component with Dynamic Loading & Ripple Effect',
    category: 'Buttons & Controls',
    description: 'Tombol serbaguna dengan state hover presisi, indikator loading halus, dan feedback haptik visual.',
    previewType: 'button',
    jsxCode: `<button className="px-5 py-2.5 rounded-lg bg-slate-900 text-white dark:bg-sky-500 dark:text-slate-950 font-medium transition-all hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 flex items-center gap-2">
  <Sparkles className="w-4 h-4" />
  <span>Eksekusi Aksi</span>
</button>`,
    tailwindClasses: ['bg-slate-900', 'dark:bg-sky-500', 'hover:-translate-y-0.5', 'focus:ring-2', 'rounded-lg'],
    wcagCompliant: true,
  },
  {
    id: 'bento-card',
    title: 'Modern Bento Grid Card with Calculated Outer/Inner Radius',
    category: 'Cards & Layouts',
    description: 'Kartu layout bento modern dengan kombinasi border subtil 1px, shadow bertingkat, dan kontras warna yang tepat.',
    previewType: 'bento-card',
    jsxCode: `<div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
  <div className="flex items-center justify-between mb-4">
    <span className="p-2 rounded-xl bg-sky-50 text-sky-600 dark:bg-sky-950/60 dark:text-sky-400">
      <Zap className="w-5 h-5" />
    </span>
    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300">
      Aktif
    </span>
  </div>
  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Core Web Vitals</h3>
  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Skor optimasi halaman mencapai 99/100 pada jaringan seluler.</p>
</div>`,
    tailwindClasses: ['rounded-2xl', 'border-slate-200', 'shadow-sm', 'hover:shadow-md', 'dark:bg-slate-900'],
    wcagCompliant: true,
  },
  {
    id: 'custom-form',
    title: 'Accessible Floating-Label Form Input',
    category: 'Form Elements',
    description: 'Input formulir dengan status validasi real-time, pesan error aksesibel (aria-live), dan fokus outline jelas.',
    previewType: 'form',
    jsxCode: `<div className="space-y-1">
  <label htmlFor="email-input" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
    Email Profesional
  </label>
  <input 
    id="email-input"
    type="email"
    placeholder="engineer@company.com"
    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors"
  />
</div>`,
    tailwindClasses: ['px-3.5', 'py-2.5', 'rounded-lg', 'border-slate-300', 'focus:ring-2', 'focus:ring-sky-500'],
    wcagCompliant: true,
  },
  {
    id: 'stat-metric',
    title: 'Live Stat Badge with Metric Progress Bar',
    category: 'Data Displays',
    description: 'Komponen visualisasi angka statistik kunci dengan indikator tren positif/negatif.',
    previewType: 'metric-card',
    jsxCode: `<div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
  <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Total User Satisfaction</div>
  <div className="flex items-baseline gap-2 mt-1">
    <span className="text-2xl font-bold text-slate-900 dark:text-white">99.4%</span>
    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">+2.4%</span>
  </div>
</div>`,
    tailwindClasses: ['p-4', 'rounded-xl', 'bg-slate-50', 'text-2xl', 'font-bold'],
    wcagCompliant: true,
  },
];

export const COLOR_TOKENS: ColorToken[] = [
  { name: 'Slate 900 (Canvas Text)', hex: '#0f172a', rgb: '15, 23, 42', usage: 'Teks utama pada mode terang', wcagContrastWhite: 15.8, wcagContrastDark: 1.2 },
  { name: 'Sky 600 (Primary Brand)', hex: '#0284c7', rgb: '2, 132, 199', usage: 'Aksen tombol & link interaktif', wcagContrastWhite: 4.6, wcagContrastDark: 3.8 },
  { name: 'Emerald 600 (Success State)', hex: '#059669', rgb: '5, 150, 105', usage: 'Indikator status berhasil & badge', wcagContrastWhite: 4.8, wcagContrastDark: 3.5 },
  { name: 'Rose 600 (Alert & Error)', hex: '#e11d48', rgb: '225, 29, 72', usage: 'Pesan error dan hapus aksi', wcagContrastWhite: 5.1, wcagContrastDark: 3.2 },
  { name: 'Slate 50 (Light Card BG)', hex: '#f8fafc', rgb: '248, 250, 252', usage: 'Background kartu kontras rendah', wcagContrastWhite: 1.05, wcagContrastDark: 18.2 },
];

export const PROJECT_CASE_STUDIES: ProjectCaseStudy[] = [
  {
    id: 'design-system-scale',
    title: 'Enterprise Design System Architect',
    clientCategory: 'Fintech & SaaS',
    description: 'Arsitektur Design System terpusat berbasis React 19 + Tailwind CSS v4 untuk 40+ produk mikro.',
    fullStory: 'Mengakomodasi kebutuhan skala enterprise dengan membuat 120+ token warna, komponen UI yang dapat diakses penuh (WCAG AA), serta pustaka CLI khusus untuk meng-generate layout dalam hitungan detik.',
    tags: ['React 19', 'Tailwind v4', 'Storybook', 'Design Tokens', 'WCAG AA'],
    metrics: [
      { label: 'Kecepatan Build UI', value: '3x Lebih Cepat' },
      { label: 'Rata-rata Score WCAG', value: '100% Compliant' },
      { label: 'Komponen Reusable', value: '140+ Components' },
    ],
    accentColor: 'sky',
    liveInteractiveType: 'design-system',
  },
  {
    id: 'realtime-analytics-dashboard',
    title: 'High-Throughput Realtime Analytics UI',
    clientCategory: 'E-Commerce & Logistics',
    description: 'Dashboard analitik waktu-nyata dengan visualisasi chart D3 & Recharts yang menangani 10.000 event/detik.',
    fullStory: 'Didesain untuk keandalan tinggi tanpa lag saat memuat grafik harga, tren logistik, dan peta panas pesanan pelanggan. Menggunakan teknik memoization tingkat tinggi dan Web Workers.',
    tags: ['React', 'Recharts', 'D3.js', 'Tailwind CSS', 'Web Workers'],
    metrics: [
      { label: 'Rendering Frame', value: '60 FPS Smooth' },
      { label: 'Penghematan Memori', value: '-35% RAM' },
      { label: 'LCP Score', value: '0.8 Detik' },
    ],
    accentColor: 'indigo',
    liveInteractiveType: 'analytics',
  },
  {
    id: 'e-commerce-checkout',
    title: 'Next-Gen Checkout Flow & Micro-Interactions',
    clientCategory: 'Global Retailer',
    description: 'Alur checkout ultra-cepat dengan konversi tinggi, animasi Motion, dan proteksi error form interaktif.',
    fullStory: 'Mengoptimalkan alur transaksi 4 langkah menjadi single-screen wizard dengan kalkulasi pajak instan, validasi alamat otomatis, dan feedback mikro yang menyenangkan user.',
    tags: ['React', 'Tailwind CSS', 'Motion', 'Zod', 'State Machines'],
    metrics: [
      { label: 'Kenaikan Konversi', value: '+18.4%' },
      { label: 'Form Abandonment', value: '-24%' },
      { label: 'INP Latency', value: '38ms' },
    ],
    accentColor: 'emerald',
    liveInteractiveType: 'e-commerce',
  },
];
