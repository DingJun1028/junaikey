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
  Home
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
    title: '全能流程',
    href: '/omniflow',
    icon: Cog,
    label: 'OmniFlow',
  },
  {
    title: '全能代理',
    href: '/omniagents',
    icon: Network,
    label: 'OmniAgents',
  },
  {
    title: '知識中樞',
    href: '/knowledge-hub',
    icon: BrainCircuit,
    label: 'Knowledge Hub',
  },
  {
    title: '內容生成器',
    href: '/content-generator',
    icon: Rocket,
    label: 'Content Generator',
  },
  {
    title: '進化中樞',
    href: '/evolution-nexus',
    icon: Infinity,
    label: 'Evolution Nexus',
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
];
