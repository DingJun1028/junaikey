
import {
  Cpu,
  Webhook,
  Network,
  BrainCircuit,
  GitCompareArrows,
  MessageCircle,
  Infinity,
  Activity,
  Shield,
  DraftingCompass,
  Tags,
  Palette,
  LayoutDashboard,
  MessageSquarePlus,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  label?: string;
};

export const mainNav: NavItem[] = [
  {
    title: "Omni-Codex",
    href: "/",
    icon: LayoutDashboard,
    label: "Omni-Codex",
  },
  {
    title: "Meta Architecture",
    href: "/meta-architecture",
    icon: DraftingCompass,
    label: "Meta Architecture",
  },
  {
    title: "Knowledge Hub",
    href: "/knowledge-hub",
    icon: BrainCircuit,
    label: "Knowledge Hub",
  },
  {
    title: "Core Engine",
    href: "/core-engine",
    icon: Cpu,
    label: "Core Engine",
  },
  {
    title: "Rune System",
    href: "/rune-system",
    icon: Webhook,
    label: "Rune System",
  },
  {
    title: "Agent Network",
    href: "/agent-network",
    icon: Network,
    label: "Agent Network",
  },
  {
    title: "Theme Engine",
    href: "/theme-engine",
    icon: Palette,
    label: "Theme Engine",
  },
  {
    title: "Tagging System",
    href: "/tagging-system",
    icon: Tags,
    label: "Tagging System",
  },
  {
    title: "Security Domain",
    href: "/security-domain",
    icon: Shield,
    label: "Security Domain",
  },
  {
    title: "Evolution Loop",
    href: "/evolution-loop",
    icon: Infinity,
    label: "Evolution Loop",
  },
];

export type CoreFunction = {
  title: string;
  description: string;
  icon: LucideIcon;
  href?: string;
};

export const coreFunctions: CoreFunction[] = [
  {
    title: "萬能核心引擎 (Core Engine)",
    description: "中央決策與流程控制。",
    icon: Cpu,
    href: "/core-engine",
  },
  {
    title: "萬能符文系統 (Rune System)",
    description: "與所有外部服務的 API 整合層。",
    icon: Webhook,
    href: "/rune-system",
  },
  {
    title: "萬能代理網絡 (Agent Network)",
    description: "任務的自主執行與委派網絡。",
    icon: Network,
    href: "/agent-network",
  },
  {
    title: "萬能智庫中樞 (Knowledge Hub)",
    description: "系統的長期記憶與知識管理中心。",
    icon: BrainCircuit,
    href: "/knowledge-hub",
  },
  {
    title: "萬能同步矩陣 (Sync Matrix)",
    description: "跨平台、雙向的數據同步。",
    icon: GitCompareArrows,
  },
  {
    title: "萬能接口協議 (Interface Protocol)",
    description: "多模態的使用者交互（UI、語音等）。",
    icon: MessageCircle,
  },
  {
    title: "萬能進化環 (Evolution Loop)",
    description: "系統的自我優化與學習機制。",
    icon: Infinity,
    href: "/evolution-loop",
  },
  {
    title: "萬能監控體 (Monitoring Body)",
    description: "系統的可觀測性、日誌與診斷。",
    icon: Activity,
  },
  {
    title: "萬能安全域 (Security Domain)",
    description: "存取控制、加密與威脅防護。",
    icon: Shield,
    href: "/security-domain",
  },
  {
    title: "萬能元架構 (Meta Architecture)",
    description: "由 AI 驅動的動態架構生成與調整。",
    icon: DraftingCompass,
    href: "/meta-architecture",
  },
  {
    title: "萬能標籤體系 (Tagging System)",
    description: "通用的元數據與分類系統。",
    icon: Tags,
    href: "/tagging-system",
  },
  {
    title: "萬能主題引擎 (Theme Engine)",
    description: "AI 生成的 UI、UX 與詞彙體系。",
    icon: Palette,
    href: "/theme-engine",
  },
];
