import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
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
    icon: Milestone,
    title: "四大支柱 (The Four Pillars)",
    description: "構成系統世界觀的底層邏輯，確保穩定、平衡與進化。",
    details: "簡單性、快速性、穩定性、進化性。這四大支柱是系統設計和決策的最高指導原則。",
  },
  {
    icon: Gem,
    title: "智慧沉澱 (Wisdom Precipitation)",
    description: "將資訊和經驗轉化為結構化知識的過程。",
    details:
      "系統不僅記錄數據，更重要的是通過學習和總結，將成功的經驗和失敗的教訓轉化為可複用的知識，存入智庫。",
  },
  {
    icon: Goal,
    title: "無限進化循環 (Infinite Evolution Loop)",
    description: "系統自我優化與學習的核心機制。",
    details:
      "通過『觀察→沉澱→學習→決策→行動→觸發』的循環，系統能夠不斷地自我完善，適應新挑戰，並進化出新能力。",
  },
  {
    icon: BookCopy,
    title: "六式奧義 (The Six Mysteries)",
    description: "執行無限進化循環的具體操作指令集。",
    details:
      "覺識、解構、策演、貫通、迴響、鍛智。這六個步驟將一個抽象的任務，從觸發到最終知識沉澱，完整地執行一遍。",
  },
  {
    icon: Palette,
    title: "天使號令 (Celestial Command)",
    description: "系統的頂層主題風格與開發指導哲學。",
    details: "這定義了系統的「人格」和「使命」，指導開發者如何以一種充滿美感和秩序的方式來構建和擴展系統。",
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
              <CardTitle className="text-2xl">萬能智庫中樞 (Knowledge Hub)</CardTitle>
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
                核心哲學與奧義
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>系統架構與核心原則</CardTitle>
                  <CardDescription>
                    基於 MECE (Mutually Exclusive, Collectively Exhaustive) 原則劃分的系統核心構成。
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
                          <p className="font-medium text-muted-foreground">{item.description}</p>
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
                  <CardTitle>核心哲學與進化機制</CardTitle>
                  <CardDescription>
                    驅動系統自我優化與持續成長的頂層思想與運作模式。
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
                        <AccordionContent className="pl-10">
                           <p className="font-medium text-muted-foreground">{item.description}</p>
                           <p className="mt-2 text-sm">{item.details}</p>
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
