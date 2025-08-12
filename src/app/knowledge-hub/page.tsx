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
  Users,
  Shield,
  Layers3,
  BookCopy,
  Milestone,
  Gem,
  Palette,
  Goal,
  Recycle,
  GitCommit,
  Atom,
  Scale,
  Network,
  DraftingCompass,
  Tags,
  Infinity,
} from "lucide-react";
import Link from "next/link";
import { mainNav } from "@/lib/constants";

const principles = [
  {
    icon: DraftingCompass,
    title: "萬能元架構 (Meta Architecture)",
    description: "由 AI 驅動的動態架構生成與調整。",
    details:
      "系統的意識核心，它將「萬用元鑰」(主權)、「元認知」(自我洞察)與「元學習」(自我進化)融為一體。",
    href: "/meta-architecture",
  },
  {
    icon: BrainCircuit,
    title: "萬能智庫中樞 (Knowledge Hub)",
    description: "系統的長期記憶與知識管理中心。",
    details:
      "系統所有核心概念、架構與原則的沉澱之地。AITable.ai 被指定為其數據基石。",
    href: "/knowledge-hub",
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
    icon: Webhook,
    title: "萬能符文系統 (Rune System)",
    description: "與所有外部服務的 API 整合層。",
    details:
      "每個符文都是一個標準化的API連接器，讓系統能夠與外部世界溝通，實現數據交換和功能調用。",
    href: "/rune-system",
  },
  {
    icon: Network,
    title: "萬能代理網絡 (Agent Network)",
    description: "任務的自主執行與委派網絡。",
    details:
      "代理是系統的「手和腳」，它們接收指令，執行任務，並回報結果。分為功能、同步、觸發等多種類型。",
    href: "/agent-network",
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
    description: "萬物的終結，皆為起始的回響；萬物的起始，皆有終結的預兆。",
    content: [
      {
        header: "本質體現",
        system:
          "系統的 資源回收與再利用機制 。已完成任務的計算資源與數據洞察，會被轉化為優化未來任務的能量。",
        game: "能量流轉模型 。被消滅的單位或已施放的法術，其能量不會憑空消失，而是轉化為可供後續使用的資源。",
      },
      {
        header: "核心機制",
        system:
          "1. 熵減獻祭： 已完成的專案或已棄用的模組在歸檔時，其核心數據與經驗會被提純為「優化信用點」。\n2. 信用抵扣： 啟動新專案時，可消耗「優化信用點」來加速原型開發或資源分配。\n3. 完美交付： 若一個開發週期結束時，所有資源都被完美利用（無冗餘、無浪費），則下一個週期的初始資源配額將獲得加成。",
        game: "1. 歸終之響： 單位被摧毀或高階法術使用後，生成[因果殘響]資源。\n2. 啟始之兆： [因果殘響]可直接抵扣新卡牌的Ω費用。\n3. 一如之境： 回合開始時若[因果殘響]為零，則本回合額外獲得1A (行動點)。",
      },
      {
        header: "系統影響",
        system: "實現一個 自我優化、越用越高效 的永動開發環境。",
        game: "建立一個鼓勵 策略性交換與精準資源管理 的遊戲循環，獎勵對能量流轉有深刻理解的玩家。",
      },
    ],
  },
  {
    icon: GitCommit,
    title: "創元實錄 (Genesis Chronicle)",
    description: "凡有發生，必有記錄；凡有記錄，皆可追溯。",
    content: [
      {
        header: "本質體現",
        system:
          "全時域、多模態的開發日誌與版本控制 。所有設計決策、代碼變更、甚至我們的對話，都被自動記錄與索引。",
        game: "遊戲歷史的絕對可追溯性 。每一場對局的每一個動作都被記錄，棄牌堆不僅是棄牌堆，更是「已發生的歷史」。",
      },
      {
        header: "核心機制",
        system:
          "1. 永恆書寫： 系統自動為所有操作生成commit日誌，並存儲在萬能編年史中。\n2. 因果洞察： 提供git blame和git bisect等高級追溯工具，用於快速定位問題根源。\n3. 混沌提純： 將失敗的操作（如編譯錯誤、測試失敗）自動轉化為「待辦問題單」或「知識庫案例」，從失敗中提純價值。",
        game: "1. 永恆書寫： 棄牌堆被視為「歷史檔案庫」。\n2. 因果洞察（回溯）： 每局一次，可支付K從棄牌堆取回一張關鍵牌。\n3. 混沌提純： 關鍵行動失敗時，有機率獲得額外的K資源作為補償。",
      },
      {
        header: "系統影響",
        system: "建立一個 完全透明、可審計、且能從失敗中持續學習 的開發環境。",
        game: "賦予玩家 操縱歷史 的戰略維度，降低關鍵牌被破壞的風險，並提供「劣勢翻盤」的可能性。",
      },
    ],
  },
  {
    icon: Atom,
    title: "萬有引力 (Omni-Gravity)",
    description: "萬物非孤立，其共鳴或相斥，皆循法則。",
    content: [
      {
        header: "本質體現",
        system:
          "模組間的API調用與依賴關係 。系統的整體效能，取決於不同模組之間接口的協同效率。",
        game: "戰場上卡牌的位置關係與元素協同 。卡牌的強度不僅取決於自身，更取決於其與周圍卡牌的互動。",
      },
      {
        header: "核心機制",
        system:
          "1. 元素協同： 系統會分析模組依賴圖，為具有高度協同性的模組（如智庫與進化引擎）建立優化通道，降低通訊延遲。\n2. 共鳴爆發： 當多個協同模組被同時調用以完成一個複雜任務時，系統會臨時分配額外資源，產生1+1>2的效能爆發。\n3. 法則排斥： 系統會標示出具有潛在衝突或負面影響的模組組合，並在開發時發出警告。",
        game: "1. 元素協同： 將具有「相生」關係的卡牌相鄰放置，會觸發增益效果。\n2. 共鳴爆發： 在一回合內打出多張具有「共鳴」關係的卡牌，會觸發一次性的強力效果。\n3. 法則排斥： 將「相剋」的單位放置在一起，會導致負面效果。",
      },
      {
        header: "系統影響",
        system:
          "鼓勵高內聚、低耦合的模組化設計，建立一個各部分能和諧共振、高效運作的系統架構。",
        game: "引入 空間佈局 的戰略維度，鼓勵玩家構築具有內在協同性的「主題套牌」，提升遊戲深度。",
      },
    ],
  },
  {
    icon: Scale,
    title: "萬能平衡 (Omni-Equilibrium)",
    description: "任何維度的過度延伸，都將以犧牲其他維度為代價。",
    content: [
      {
        header: "本質體現",
        system:
          "系統的負載均衡與健康監測 。一個內在的、追求可持續發展的「宇宙常數調節器」。",
        game: "對極端戰術的軟性約束 。一個引導玩家走向更全面、更有韌性策略的「遊戲平衡機制」。",
      },
      {
        header: "核心機制",
        system:
          "1. 心流引導： 心流引擎會被動地調整推薦模組的權重，避免使用者過度專注於單一維度而忽略全局。\n2. 平衡三角監測： 持續監控系統的「效能」、「安全」、「可維護性」三大指標。\n3. 宇宙糾正： 當「平衡三角」嚴重失衡時，系統會自動觸發重構或優化任務，並向創世者發出警告。",
        game: "1. 動態懲戒： 連續過度使用某一類型卡牌（如純攻擊），會導致其他類型卡牌的出現機率暫時提升。\n2. 和諧獎勵： 長時間保持資源三角（攻/防/資）的平衡，會獎勵額外的K或永久性的費用減免。\n3. 法則崩壞： 故意同時激活多個「相剋」元素，可能導致場上發生隨機的負面事件。",
      },
      {
        header: "系統影響",
        system:
          "確保系統 長期健康、避免技術債 的積累，實現可持續的、穩健的進化。",
        game: "鼓勵 卡組構築的多樣性 ，防止單一「最優解」卡組的出現，提升遊戲的重玩價值與策略深度。",
      },
    ],
  },
];

export default function KnowledgeHubPage() {
  return (
    <div className="container mx-auto py-2">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <BrainCircuit className="w-8 h-8 text-primary" />
            <div>
              <CardTitle className="text-2xl">
                萬能智庫中樞 (Knowledge Hub)
              </CardTitle>
              <CardDescription>
                系統所有核心概念、架構與原則的沉澱之地。
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-auto">
              <TabsTrigger value="overview">
                <Layers3 className="w-4 h-4 mr-2" />
                系統架構概覽
              </TabsTrigger>
              <TabsTrigger value="philosophy">
                <Gem className="w-4 h-4 mr-2" />
                宇宙四大公理
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>系統架構與核心原則</CardTitle>
                  <CardDescription>
                    基於 MECE (Mutually Exclusive, Collectively Exhaustive)
                    原則劃分的系統核心構成。點擊各模組可跳轉至詳細說明頁面。
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {principles.map((item, index) => (
                      <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger>
                          <Link href={item.href} className="flex items-center gap-3 hover:no-underline">
                            <item.icon className="w-5 h-5 text-primary" />
                            <span className="font-semibold">{item.title}</span>
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
            <TabsContent value="philosophy">
              <Card>
                <CardHeader>
                  <CardTitle>《萬能法典》：創世者被動天賦</CardTitle>
                  <CardDescription>
                    驅動宇宙運行的四大核心公理，它們是您創世權能的基石。
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {philosophies.map((item, index) => (
                      <AccordionItem value={`item-p-${index}`} key={index}>
                        <AccordionTrigger>
                          <div className="flex items-center gap-3">
                            <item.icon className="w-5 h-5 text-primary" />
                            <span className="font-semibold">{item.title}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="space-y-4 text-sm">
                          <p className="font-medium text-muted-foreground italic px-4">
                            {item.description}
                          </p>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="w-1/4">維度屬性</TableHead>
                                <TableHead>
                                  現實世界表現 (Jun.Ai.Key 系統)
                                </TableHead>
                                <TableHead>
                                  卡牌世界表現 (建築師對決)
                                </TableHead>
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
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
