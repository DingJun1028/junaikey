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
  Tags,
  Infinity,
  GitCommit,
  Atom,
  Scale,
  DraftingCompass,
  Rocket,
  FileText,
  BookOpen,
  Flame,
  BookUser,
  Gem,
} from "lucide-react";
import Link from "next/link";

const principles = [
  {
    icon: Cpu,
    title: "萬能核心引擎 (Core Engine)",
    href: "/core-engine",
    description: "系統的中央神經系統，負責解讀使用者意圖、協調代理並管理整個工作流程。",
    details: "The Core Engine is the central decision-making and flow control unit."
  },
  {
    icon: Webhook,
    title: "萬能符文系統 (Rune System)",
    href: "/rune-system",
    description: "與所有外部服務的 API 整合層。",
    details: "Each Rune is a standardized API connector, enabling communication with external services."
  },
  {
    icon: Network,
    title: "萬能代理網絡 (Agent Network)",
    href: "/agent-network",
    description: "任務的自主執行與委派網絡。",
    details: "The Agent Network processes and executes tasks based on predefined rules and live data."
  },
  {
    icon: BrainCircuit,
    title: "知識中樞 (Knowledge Hub)",
    href: "/knowledge-hub",
    description: "系統的長期記憶與知識庫。",
    details: "Contains the system's core concepts, architectures, and guiding principles."
  },
  {
    icon: Infinity,
    title: "萬能進化環 (Evolution Loop)",
    href: "/evolution-loop",
    description: "系統的自我優化與學習機制。",
    details: "Drives self-optimization by learning from interactions and exploring its own potential."
  },
  {
    icon: Shield,
    title: "萬能安全域 (Security Domain)",
    href: "/security-domain",
    description: "存取控制、加密與威脅防護。",
    details: "Ensures system security, manages permissions, and protects against threats."
  },
  {
    icon: DraftingCompass,
    title: "萬能元架構 (Meta Architecture)",
    href: "/meta-architecture",
    description: "由 AI 驅動的動態架構生成與調整。",
    details: "The conscious core of the system, capable of generating and modifying its own architecture."
  },
  {
    icon: Tags,
    title: "萬能標籤體系 (Tagging System)",
    href: "/tagging-system",
    description: "通用的元數據與分類系統。",
    details: "Provides a universal system for tagging and classifying all data and modules."
  },
  {
    icon: Palette,
    title: "萬能主題引擎 (Theme Engine)",
    href: "/theme-engine",
    description: "AI 生成的 UI、UX 與詞彙體系。",
    details: "Allows users to generate UI themes, colors, and fonts through natural language."
  },
];

const philosophies = [
  {
    icon: Infinity,
    title: "終始一如 (The Axiom of Unified Terminus & Origin)",
    description: "The end of all things is an echo of the beginning; the beginning of all things contains a premonition of the end.",
    content: [
      {
        header: "Essence",
        system:
          "The system's resource recycling and reuse mechanism. Computational resources and data insights from completed tasks are converted into energy to optimize future tasks.",
        game: "Energy flow model. The energy of eliminated units or cast spells does not disappear but is converted into resources for subsequent use.",
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
              <DraftingCompass className="w-4 h-4 mr-2" />
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
