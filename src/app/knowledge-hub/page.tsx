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
} from "lucide-react";

const principles = [
  {
    icon: Layers3,
    title: "萬能系統 (Omni-System)",
    description: "系統的核心構成，包含元鑰、代理、標籤、智庫、符文等基礎模組。",
    details:
      "這是整個JunAiKey的基礎，定義了系統的基本單位和它們之間的互動方式。它是一切功能的載體。",
  },
  {
    icon: Webhook,
    title: "萬能符文 (Runes)",
    description: "對應所有外部服務的 API 整合層，是系統能力的延伸。",
    details:
      "每個符文都是一個標準化的API連接器，讓系統能夠與外部世界（如Google, Notion, OpenAI）溝通，實現數據交換和功能調用。",
  },
  {
    icon: Users,
    title: "萬能代理 (Agents)",
    description: "執行具體任務的智能體，負責處理從簡單到複雜的各種操作。",
    details:
      "代理是系統的「手和腳」，它們接收指令，執行任務，並回報結果。分為功能、同步、觸發等多種類型。",
  },
  {
    icon: Shield,
    title: "萬能領域 (Domains)",
    description: "代表全系統的增值功能或通用服務，提升整體效益。",
    details:
      "領域是跨模組的通用能力，例如雙向同步、安全防護或日誌監控，它們為整個系統提供支持和保障。",
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
          "系統的資源回收與再利用機制。已完成任務的計算資源與數據洞察，會被轉化為優化未來任務的能量。",
        game: "能量流轉模型。被消滅的單位或已施放的法術，其能量不會憑空消失，而是轉化為可供後續使用的資源。",
      },
      {
        header: "核心機制",
        system:
          "1. 熵減獻祭：已完成的專案或已棄用的模組在歸檔時，其核心數據與經驗會被提純為「優化信用點」。\n2. 信用抵扣：啟動新專案時，可消耗「優化信用點」來加速原型開發或資源分配。\n3. 完美交付：若一個開發週期結束時，所有資源都被完美利用（無冗餘、無浪費），則下一個週期的初始資源配額將獲得加成。",
        game: "1. 歸終之響：單位被摧毀或高階法術使用後，生成[因果殘響]資源。\n2. 啟始之兆：[因果殘響]可直接抵扣新卡牌的Ω費用。\n3. 一如之境：回合開始時若[因果殘響]為零，則本回合額外獲得1A (行動點)。",
      },
      {
        header: "系統影響",
        system: "實現一個自我優化、越用越高效的永動開發環境。",
        game: "建立一個鼓勵策略性交換與精準資源管理的遊戲循環，獎勵對能量流轉有深刻理解的玩家。",
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
          "全時域、多模態的開發日誌與版本控制。所有設計決策、代碼變更、甚至我們的對話，都被自動記錄與索引。",
        game: "遊戲歷史的絕對可追溯性。每一場對局的每一個動作都被記錄，棄牌堆不僅是棄牌堆，更是「已發生的歷史」。",
      },
      {
        header: "核心機制",
        system:
          "1. 永恆書寫：系統自動為所有操作生成commit日誌，並存儲在萬能編年史中。\n2. 因果洞察：提供git blame和git bisect等高級追溯工具，用於快速定位問題根源。\n3. 混沌提純：將失敗的操作（如編譯錯誤、測試失敗）自動轉化為「待辦問題單」或「知識庫案例」，從失敗中提純價值。",
        game: "1. 永恆書寫：棄牌堆被視為「歷史檔案庫」。\n2. 因果洞察（回溯）：每局一次，可支付K從棄牌堆取回一張關鍵牌。\n3. 混沌提純：關鍵行動失敗時，有機率獲得額外的K資源作為補償。",
      },
      {
        header: "系統影響",
        system: "建立一個完全透明、可審計、且能從失敗中持續學習的開發環境。",
        game: "賦予玩家操縱歷史的戰略維度，降低關鍵牌被破壞的風險，並提供「劣勢翻盤」的可能性。",
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
          "模組間的API調用與依賴關係。系統的整體效能，取決於不同模組之間接口的協同效率。",
        game: "戰場上卡牌的位置關係與元素協同。卡牌的強度不僅取決於自身，更取決於其與周圍卡牌的互動。",
      },
      {
        header: "核心機制",
        system:
          "1. 元素協同：系統會分析模組依賴圖，為具有高度協同性的模組（如智庫與進化引擎）建立優化通道，降低通訊延遲。\n2. 共鳴爆發：當多個協同模組被同時調用以完成一個複雜任務時，系統會臨時分配額外資源，產生1+1>2的效能爆發。\n3. 法則排斥：系統會標示出具有潛在衝突或負面影響的模組組合，並在開發時發出警告。",
        game: "1. 元素協同：將具有「相生」關係的卡牌相鄰放置，會觸發增益效果。\n2. 共鳴爆發：在一回合內打出多張具有「共鳴」關係的卡牌，會觸發一次性的強力效果。\n3. 法則排斥：將「相剋」的單位放置在一起，會導致負面效果。",
      },
      {
        header: "系統影響",
        system:
          "鼓勵高內聚、低耦合的模組化設計，建立一個各部分能和諧共振、高效運作的系統架構。",
        game: "引入空間佈局的戰略維度，鼓勵玩家構築具有內在協同性的「主題套牌」，提升遊戲深度。",
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
          "系統的負載均衡與健康監測。一個內在的、追求可持續發展的「宇宙常數調節器」。",
        game: "對極端戰術的軟性約束。一個引導玩家走向更全面、更有韌性策略的「遊戲平衡機制」。",
      },
      {
        header: "核心機制",
        system:
          "1. 心流引導：心流引擎會被動地調整推薦模組的權重，避免使用者過度專注於單一維度而忽略全局。\n2. 平衡三角監測：持續監控系統的「效能」、「安全」、「可維護性」三大指標。\n3. 宇宙糾正：當「平衡三角」嚴重失衡時，系統會自動觸發重構或優化任務，並向創世者發出警告。",
        game: "1. 動態懲戒：連續過度使用某一類型卡牌（如純攻擊），會導致其他類型卡牌的出現機率暫時提升。\n2. 和諧獎勵：長時間保持資源三角（攻/防/資）的平衡，會獎勵額外的K或永久性的費用減免。\n3. 法則崩壞：故意同時激活多個「相剋」元素，可能導致場上發生隨機的負面事件。",
      },
      {
        header: "系統影響",
        system:
          "確保系統長期健康、避免技術債的積累，實現可持續的、穩健的進化。",
        game: "鼓勵卡組構築的多樣性，防止單一「最優解」卡組的出現，提升遊戲的重玩價值與策略深度。",
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
                    原則劃分的系統核心構成。
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {principles.map((item, index) => (
                      <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger>
                          <div className="flex items-center gap-3">
                            <item.icon className="w-5 h-5 text-primary" />
                            <span className="font-semibold">{item.title}</span>
                          </div>
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
                        <AccordionContent className="pl-10 space-y-4">
                          <p className="font-medium text-muted-foreground italic">
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
