import {
  Cpu,
  Webhook,
  Network,
  BrainCircuit,
  Infinity,
  Shield,
  DraftingCompass,
  Tags,
  Palette,
  LayoutDashboard,
  MessageSquarePlus,
  Rocket,
  Cog,
  FileText,
  BookOpen,
  Flame,
  BookUser,
  Home,
  KeyRound,
  LifeBuoy,
  Activity,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  label?: string;
};

export const mainNav: NavItem[] = [
  {
    title: '宇宙核心',
    href: '/',
    icon: Home,
    label: 'Core',
  },
  {
    title: '全能日誌',
    href: '/omnilog',
    icon: LayoutDashboard,
    label: 'OmniLog',
  },
  {
    title: '萬能核心引擎',
    href: '/core-engine',
    icon: Cpu,
    label: 'Core Engine',
  },
  {
    title: '萬能代理網絡',
    href: '/agent-network',
    icon: Network,
    label: 'Agent Network',
  },
  {
    title: '萬能符文系統',
    href: '/rune-system',
    icon: Webhook,
    label: 'Rune System',
  },
  {
    title: '知識中樞',
    href: '/knowledge-hub',
    icon: BrainCircuit,
    label: 'Knowledge Hub',
  },
  {
    title: '進化環',
    href: '/evolution-loop',
    icon: Infinity,
    label: 'Evolution Loop',
  },
    {
    title: '萬能安全域',
    href: '/security-domain',
    icon: Shield,
    label: 'Security Domain',
  },
  {
    title: '萬能元架構',
    href: '/meta-architecture',
    icon: DraftingCompass,
    label: 'Meta Architecture',
  },
  {
    title: '萬能標籤體系',
    href: '/tagging-system',
    icon: Tags,
    label: 'Tagging System',
  },
  {
    title: '萬能主題引擎',
    href: '/theme-engine',
    icon: Palette,
    label: 'Theme Engine',
  },
   {
    title: '萬能元鑰方案中心',
    href: '/omni-key-solutions',
    icon: KeyRound,
    label: 'Omni-Key Solutions',
  },
  {
    title: '內容生成器',
    href: '/content-generator',
    icon: Rocket,
    label: 'Content Generator',
  },
  {
    title: 'AI 核心終端',
    href: '/sanctum',
    icon: FileText,
    label: 'AI Core Sanctum',
  },
  {
    title: '開發者聖典',
    href: '/codex',
    icon: BookOpen,
    label: 'Developer Codex',
  },
  {
    title: '疑難雜症需求中心',
    href: '/troubleshooting',
    icon: LifeBuoy,
    label: 'Troubleshooting',
  }
];
