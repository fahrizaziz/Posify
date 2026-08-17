export type TabType = 'overview' | 'playground' | 'case-studies' | 'tailwind-lab' | 'tech-radar' | 'terminal';

export interface TechSkill {
  name: string;
  category: 'Frontend Core' | 'Styling & Design Systems' | 'State & Architecture' | 'Performance & Testing' | 'Tooling & CI/CD';
  level: number; // 0-100
  yearsOfExp: number;
  iconName: string;
  description: string;
  highlightTags: string[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  type: string;
  highlights: string[];
  skillsUsed: string[];
  impactMetric: string;
}

export interface UIComponentItem {
  id: string;
  title: string;
  category: 'Buttons & Controls' | 'Cards & Layouts' | 'Form Elements' | 'Data Displays' | 'Feedback & Modals';
  description: string;
  previewType: 'button' | 'bento-card' | 'form' | 'stat-badge' | 'toggle-switch' | 'metric-card';
  jsxCode: string;
  tailwindClasses: string[];
  wcagCompliant: boolean;
}

export interface ProjectCaseStudy {
  id: string;
  title: string;
  clientCategory: string;
  description: string;
  fullStory: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  accentColor: string;
  liveInteractiveType: 'design-system' | 'analytics' | 'e-commerce' | 'collaborative';
}

export interface ColorToken {
  name: string;
  hex: string;
  rgb: string;
  usage: string;
  wcagContrastWhite: number;
  wcagContrastDark: number;
}
