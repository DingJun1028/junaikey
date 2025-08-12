import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BrainCircuit,
  Cpu,
  Webhook,
  Network,
  Shield,
  Palette,
  Goal,
  Recycle,
  GitCommit,
  Atom,
  Scale,
  DraftingCompass,
  Tags,
  Infinity,
  Sparkles,
  Archive,
  MessageCircleQuestion,
  Flame,
  BookUser,
  LayoutDashboard,
  Cog,
  Rocket,
  FileText,
  BookOpen,
  Gem,
} from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const principles = [
  {
    icon: LayoutDashboard,
    title: '全能日誌 (OmniLog)',
    href: '/omnilog',
    description: '系統的中央儀表板，提供所有關鍵指標的實時概覽。',
    details: '監控活躍 AI 代理、平均參與度、準確度與自動化規則總數。'
  },
  {
    icon: Cog,
    title: '全能流程 (OmniFlow)',
    href: '/omniflow',
    description: '系統的自動化核心，建立「如果...那麼...」的規則來自動化任務。',
    details: '支援 AI 輔助生成、手動編輯、規則測試與 AI 解釋。'
  },
  {
    icon: Network,
    title: '全能代理 (OmniAgents)',
    href: '/omniagents',
    description: '管理和監控在系統中運行的所有 AI 代理。',
    details: '查看代理的詳細統計數據、歷史活動記錄，並直接與它們進行對話。'
  },
  {
    icon: BrainCircuit,
    title: '知識中樞 (Knowledge Hub)',
    href: '/knowledge-hub',
    description: '系統的長期記憶與知識庫。',
    details: '包含記憶金庫、知識對話 (Oracle)、以及描述所有核心概念的萬能智典。'
  },
  {
    icon: Rocket,
    title: '內容生成器 (Content Generator)',
    href: '/content-generator',
    description: '利用 AI 的創造力來生成各種內容，例如課程計畫。',
    details: '輸入一個主題，AI 將為您生成一份包含標題、目標和活動的完整課程計畫。'
  },
   {
    icon: Infinity,
    title: '進化中樞 (Evolution Nexus)',
    href: '/evolution-nexus',
    description: '觀察並影響系統自我優化過程的儀表板。',
    details: '系統會根據四大基石自動生成優化規則，在此見證其自主成長。'
  },
  {
    icon: FileText,
    title: 'AI 核心終端 (Sanctum)',
    href: '/sanctum',
    description: '一個擬真的終端界面，與系統的 AI 核心直接對話。',
    details: '輸入類 shell 命令，獲取關於系統健康狀況的詳細技術報告。'
  },
  {
    icon: BookOpen,
    title: '開發者聖典 (Developer Codex)',
    href: '/codex',
    description: '為進階使用者和開發者提供深入了解系統底層的工具。',
    details: '包含系統設計哲學、架構藍圖和核心程式碼範例。'
  },
  {
    icon: DraftingCompass,
    title: "萬能元架構 (Meta Architecture)",
    description: "由 AI 驅動的動態架構生成與調整。",
    details:
      "系統的意識核心，它將「萬用元鑰」(主權)、「元認知」(自我洞察)與「元學習」(自我進化)融為一體。",
    href: "/meta-architecture",
  },
    {
    icon: Webhook,
    title: "萬能符文系統 (Rune System)",
    description: "與所有外部服務的 API 整合層。",
    details:
      "每個符文都是一個標準化的API連接器，讓系統能夠與外部世界溝通，實現數據交換和功能調用。",
    href: "/rune-system",
  },
  {
    icon: Tags,
    title: "萬能標籤體系 (Tagging System)",
    description: "通用的元數據與分類系統。",
    details:
      "對系統內所有數據和模組進行精確標籤與分類，實現數據的智能關聯與追蹤。",
    href: "/tagging-system",
  },
  {
    icon: Palette,
    title: "萬能主題引擎 (Theme Engine)",
    description: "AI 生成的 UI、UX 與詞彙體系。",
    details:
      "允許使用者透過自然語言描述，生成符合其品牌或個人風格的UI主題、色彩與字體。",
    href: "/theme-engine",
  },
  {
    icon: Shield,
    title: "萬能安全域 (Security Domain)",
    description: "存取控制、加密與威脅防護。",
    details:
      "確保系統的安全性與合規性，管理權限與訪問控制，為整個系統提供支持和保障。",
    href: "/security-domain",
  },
  {
    icon: Cpu,
    title: "萬能核心引擎 (Core Engine)",
    description: "中央決策與流程控制。",
    details:
      "系統的中央神經系統，負責解讀使用者意圖、協調代理並管理整個工作流程。",
    href: "/core-engine",
  },
  {
    icon: Infinity,
    title: "萬能進化環 (Evolution Loop)",
    description: "系統的自我優化與學習機制。",
    details:
      "系統的自我優化、潛能釋放與天命研究。探索系統的自我創造、集體智慧與最終演化命運。",
    href: "/evolution-loop",
  },
];

const philosophies = [
  {
    icon: Recycle,
    title: "終始一如 (The Axiom of Unified Terminus & Origin)",
    description: "The end of all things is an echo of the beginning; the beginning of all things contains a premonition of the end.",
    content: [
      {
        header: "Essence",
        system:
          "The system's resource recycling and reuse mechanism. Computational resources and data insights from completed tasks are converted into energy to optimize future tasks.",
        game: "Energy flow model. The energy of eliminated units or cast spells does not disappear but is converted into resources for subsequent use.",
      },
      {
        header: "Core Mechanics",
        system:
          "1. Entropy Sacrifice: When completed projects or deprecated modules are archived, their core data and experience are refined into 'Optimization Credits'.\n2. Credit Deduction: When starting a new project, 'Optimization Credits' can be consumed to accelerate prototype development or resource allocation.\n3. Perfect Delivery: If a development cycle ends with all resources perfectly utilized (no redundancy, no waste), the initial resource quota for the next cycle receives a bonus.",
        game: "1. Echo of Terminus: When a unit is destroyed or a high-level spell is cast, [Causal Echo] resources are generated.\n2. Omen of Origin: [Causal Echo] can directly offset the Ω cost of new cards.\n3. State of Oneness: If [Causal Echo] is zero at the start of the turn, gain an additional 1A (Action Point) for this turn.",
      },
      {
        header: "System Impact",
        system: "Creates a self-optimizing, perpetually efficient development environment that becomes more effective with use.",
        game: "Establishes a game loop that encourages strategic exchanges and precise resource management, rewarding players with a deep understanding of energy flow.",
      },
    ],
  },
  {
    icon: GitCommit,
    title: "創元實錄 (Genesis Chronicle)",
    description: "Whatever happens, is recorded; whatever is recorded, can be traced.",
    content: [
      {
        header: "Essence",
        system:
          "A full-time-domain, multimodal development log and version control. All design decisions, code changes, and even our conversations are automatically recorded and indexed.",
        game: "The absolute traceability of game history. Every action in every match is recorded. The discard pile is not just a discard pile, but 'history that has occurred'.",
      },
      {
        header: "Core Mechanics",
        system:
          "1. Eternal Scribe: The system automatically generates commit logs for all operations and stores them in the Omni-Chronicle.\n2. Causal Insight: Provides advanced traceability tools like git blame and git bisect for rapid root cause analysis.\n3. Chaos Purification: Automatically converts failed operations (like compile errors, test failures) into 'To-Do tickets' or 'Knowledge Base cases', extracting value from failure.",
        game: "1. Eternal Scribe: The discard pile is treated as a 'Historical Archive'.\n2. Causal Insight (Rewind): Once per game, pay K to retrieve a key card from the discard pile.\n3. Chaos Purification: When a key action fails, there is a chance to receive extra K resources as compensation.",
      },
      {
        header: "System Impact",
        system: "Establishes a fully transparent, auditable development environment capable of continuous learning from failures.",
        game: "Gives players a strategic dimension of manipulating history, reducing the risk of key cards being destroyed and providing 'comeback' potential.",
      },
    ],
  },
  {
    icon: Atom,
    title: "萬有引力 (Omni-Gravity)",
    description: "Nothing is isolated; its resonance or repulsion follows laws.",
    content: [
      {
        header: "Essence",
        system:
          "API calls and dependency relationships between modules. The overall performance of the system depends on the synergistic efficiency of interfaces between different modules.",
        game: "Positional relationships and elemental synergies of cards on the battlefield. A card's strength depends not only on itself but also on its interaction with surrounding cards.",
      },
      {
        header: "Core Mechanics",
        system:
          "1. Elemental Synergy: The system analyzes the module dependency graph and creates optimization channels for highly synergistic modules (like the Knowledge Hub and Evolution Engine) to reduce communication latency.\n2. Resonant Burst: When multiple synergistic modules are called simultaneously to complete a complex task, the system temporarily allocates extra resources, producing a 1+1>2 performance burst.\n3. Lawful Repulsion: The system flags potentially conflicting or negatively impacting module combinations and issues warnings during development.",
        game: "1. Elemental Synergy: Placing cards with 'symbiotic' relationships adjacent to each other triggers buff effects.\n2. Resonant Burst: Playing multiple cards with a 'Resonance' relationship in one turn triggers a powerful one-time effect.\n3. Lawful Repulsion: Placing 'conflicting' units together results in negative effects.",
      },
      {
        header: "System Impact",
        system:
          "Encourages high-cohesion, low-coupling modular design, building a system architecture where all parts can resonate harmoniously and operate efficiently.",
        game: "Introduces a strategic dimension of spatial layout, encouraging players to build 'themed decks' with internal synergy, enhancing game depth.",
      },
    ],
  },
  {
    icon: Scale,
    title: "萬能平衡 (Omni-Equilibrium)",
    description: "The over-extension of any dimension will come at the cost of sacrificing others.",
    content: [
      {
        header: "Essence",
        system:
          "The system's load balancing and health monitoring. An internal 'universal constant regulator' that pursues sustainable development.",
        game: "A soft constraint on extreme tactics. A 'game balance mechanism' that guides players towards more comprehensive and resilient strategies.",
      },
      {
        header: "Core Mechanics",
        system:
          "1. Flow Guidance: The Flow Engine passively adjusts the weights of recommended modules to prevent users from over-focusing on a single dimension and neglecting the whole.\n2. Balance Triangle Monitoring: Continuously monitors the system's three major indicators: 'Performance,' 'Security,' and 'Maintainability.'\n3. Cosmic Correction: When the 'Balance Triangle' is severely imbalanced, the system automatically triggers refactoring or optimization tasks and issues a warning to the First Architect.",
        game: "1. Dynamic Retribution: Consecutively overusing a certain type of card (e.g., pure offense) will temporarily increase the appearance rate of other card types.\n2. Harmony Bonus: Maintaining a balance in the resource triangle (Attack/Defense/Resources) for a long time rewards extra K or permanent cost reductions.\n3. Lawful Collapse: Deliberately activating multiple 'conflicting' elements at the same time may cause random negative events on the field.",
      },
      {
        header: "System Impact",
        system:
          "Ensures the long-term health of the system, avoids the accumulation of technical debt, and achieves sustainable, robust evolution.",
        game: "Encourages diversity in deck building, prevents the emergence of a single 'optimal' deck, and enhances the replay value and strategic depth of the game.",
      },
    ],
  },
];

const elementalSpirits = [
  { name: "金 (Gold)", spirit: "鋒靈 Aurex", essence: "Order, Strategy, Value" },
  { name: "木 (Wood)", spirit: "森靈 Sylfa", essence: "Growth, Creation, Reproduction" },
  { name: "水 (Water)", spirit: "湧靈 Aquare", essence: "Thought, Flow, Perception" },
  { name: "火 (Fire)", spirit: "焰靈 Pyra", essence: "Passion, Action, Destruction" },
  { name: "土 (Earth)", spirit: "磐靈 Terrax", essence: "Stability, Foundation, Defense" },
  { name: "光 (Light)", spirit: "耀靈 Luxis", essence: "Illumination, Guidance, Purity" },
  { name: "暗 (Darkness)", spirit: "幽靈 Umbrix", essence: "Stealth, Potential, Chaos" },
  { name: "無 (Void)", spirit: "源靈 Nullis", essence: "Omni, Universal, Neutral" },
  { name: "時風 (Time-Wind)", spirit: "馭靈 Tempest", essence: "Change, Acceleration, Flow, Adaptation" },
  { name: "靈魂 (Soul)", spirit: "蘊靈 Anima", essence: "Essence, Connection, Potential, Revelation" },
];

const professionalAvatars = [
    { name: "智庫守護者 (Archivist)", description: "Maintains and optimizes the Omni-Codex, ensuring the integrity and consistency of knowledge." },
    { name: "符文連結師 (RuneBinder)", description: "Specializes in the design, development, and integration of the Rune System, connecting everything." },
    { name: "代理執行官 (Agentus)", description: "Drives the Agent Network, designing and monitoring automated workflows." },
    { name: "熵減煉金師 (Alchemist)", description: "Focuses on the Evolution Loop, reducing technical debt and system chaos through optimization and refactoring." },
    { name: "真理探測者 (Veritas)", description: "Extracts valuable insights from massive data, revealing the deep truths of the system." },
    { name: "同心圓引導者 (Concentric)", description: "Coordinates interactions between modules to ensure concentric and harmonious system operation." },
    { name: "創世編織者 (Genesis Weaver)", description: "Responsible for building new solutions from scratch, transforming concepts into reality." },
    { name: "秩序守衛者 (Aegis)", description: "Focuses on the Security Domain, ensuring system security, compliance, and integrity." },
    { name: "啟蒙導師 (Luminar)", description: "Translates the knowledge from the Omni-Codex and the results from various modules into easy-to-understand training and educational content." },
    { name: "第一建築師 (Prime Architect)", description: "Transcends and orchestrates all elements and professions, sets the ultimate vision, and guides the evolution of the universe." },
];


export default function KnowledgeHubPage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start gap-4">
          <BrainCircuit className="w-8 h-8 text-primary flex-shrink-0" />
          <div>
            <CardTitle className="text-2xl">
              萬能智庫中樞 (Knowledge Hub)
            </CardTitle>
            <CardDescription className="mt-1">
              The repository for all the system's core concepts, architectures, and principles.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 h-auto">
            <TabsTrigger value="overview">
              <LayoutDashboard className="w-4 h-4 mr-2" />
              System Architecture
            </TabsTrigger>
            <TabsTrigger value="philosophy">
              <Gem className="w-4 h-4 mr-2" />
              Cosmic Axioms
            </TabsTrigger>
             <TabsTrigger value="elements">
              <Flame className="w-4 h-4 mr-2" />
              10 Elemental Laws
            </TabsTrigger>
             <TabsTrigger value="avatars">
              <BookUser className="w-4 h-4 mr-2" />
              10 Professional Avatars
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>System Architecture & Core Principles</CardTitle>
                <CardDescription>
                  The core components of the system, divided based on the MECE (Mutually Exclusive, Collectively Exhaustive) principle. Click on each module to navigate to its detailed page.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {principles.map((item, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                      <AccordionTrigger>
                        <Link href={item.href} className="flex items-center gap-3 hover:no-underline text-left w-full">
                          <item.icon className="w-5 h-5 text-primary" />
                          <span className="font-semibold text-lg">{item.title}</span>
                        </Link>
                      </AccordionTrigger>
                      <AccordionContent className="pl-10">
                        <p className="font-medium text-muted-foreground">
                          {item.description}
                        </p>
                        <p className="mt-2 text-sm">{item.details}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="philosophy" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>The Omni-Codex: The Architect's Passive Talents</CardTitle>
                <CardDescription>
                  The four core axioms that drive the universe's operation. They are the cornerstones of your creative authority.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {philosophies.map((item, index) => (
                    <AccordionItem value={`item-p-${index}`} key={index}>
                      <AccordionTrigger>
                        <div className="flex items-start text-left gap-3">
                          <item.icon className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                          <div>
                            <p className="font-semibold text-lg">{item.title}</p>
                            <p className="text-sm text-muted-foreground font-normal mt-1">{item.description}</p>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4 text-sm pt-4">
                        <div className="border rounded-lg overflow-hidden">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="w-1/4">Dimension</TableHead>
                                <TableHead>System World (Jun.Ai.Key)</TableHead>
                                <TableHead>Card World (Architect Duels)</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {item.content.map((row, rIndex) => (
                                <TableRow key={rIndex}>
                                  <TableCell className="font-semibold">
                                    {row.header}
                                  </TableCell>
                                  <TableCell className="whitespace-pre-line">
                                    {row.system}
                                  </TableCell>
                                  <TableCell className="whitespace-pre-line">
                                    {row.game}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

           <TabsContent value="elements" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>The 10 Elemental Laws</CardTitle>
                <CardDescription>
                  Universal principles guiding module interaction, evolution, and balance, representing ten card attributes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                 <div className="border rounded-md">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[20%]">Element</TableHead>
                          <TableHead className="w-[30%]">Spirit Alias</TableHead>
                          <TableHead>Core Essence</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {elementalSpirits.map((element) => (
                          <TableRow key={element.name}>
                            <TableCell className="font-medium">{element.name}</TableCell>
                            <TableCell>{element.spirit}</TableCell>
                            <TableCell>{element.essence}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="avatars" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>The 10 Professional Avatars</CardTitle>
                <CardDescription>
                  Key roles within the ecosystem that collectively build the sustainable partnership.
                </CardDescription>
              </CardHeader>
              <CardContent>
                 <div className="border rounded-lg">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Avatar</TableHead>
                          <TableHead>Core Responsibility</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {professionalAvatars.map((avatar) => (
                          <TableRow key={avatar.name}>
                            <TableCell className="font-medium">{avatar.name}</TableCell>
                            <TableCell>{avatar.description}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
