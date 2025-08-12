
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { BookOpen, Globe, Code, Link as LinkIcon } from "lucide-react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';


const codeString = `
type UniversalCard = {
  id: string; // e.g., "GEN-001"
  catalogPath: string[]; // Path in Omni-Catalog, e.g., ["System", "Security", "Firewall"]
  definitions: string[]; // Link to Omni-Definition IDs
  storyChapter: string;  // Link to Omni-Chapter ID
  lore: string;          // Flavor text and background story
  actions: ActionFn[];   // The card's functions that affect the universe/rules
  meta: MetaData;        // Version, history, author, etc.
};

type ActionFn = (context: UniverseContext) => EffectResult;

interface UniverseContext {
  // A snapshot of the universe at the moment of action
  time: number;
  entities: Record<string, any>;
  history: EventLog[];
}
`;


export default function CodexPage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <BookOpen className="w-8 h-8 text-primary" />
          <div>
            <CardTitle className="text-2xl">開發者聖典 (Developer Codex)</CardTitle>
            <CardDescription>
              三界統合與卡牌結構的核心技術說明。
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-3">三界統合：數據語義對應</h2>
          <p className="text-muted-foreground mb-4">
            要將「［萬能宇宙］現實世界」、「［萬能系統］系統世界」、「［萬能矩陣］卡牌世界」完全統合，核心在於數據語義的對應。每一張卡牌都是一份「意義向量化」的數據結構，承載著可查詢、可編輯、可記錄的「行動單位」。
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <Globe className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">現實世界 (萬能宇宙)</h3>
              </div>
              <p className="text-sm text-muted-foreground">一切意義、經驗、概念的來源（即人類生活、自然、文化、哲思）。</p>
            </div>
             <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <Code className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">系統世界 (萬能系統)</h3>
              </div>
              <p className="text-sm text-muted-foreground">為一切現象抽象出的規則、模型、數據與流程（如AI、規則引擎、演算法）。</p>
            </div>
             <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <LinkIcon className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">卡牌世界 (萬能矩陣)</h3>
              </div>
              <p className="text-sm text-muted-foreground">將以上所有意義投射進具體、可操作的卡牌遊戲系統。</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">卡牌結構設計範例 (TypeScript)</h2>
          <p className="text-muted-foreground mb-4">
            這是 `UniversalCard` 的核心 TypeScript 類型定義，它展示了卡牌如何鏈接到宇宙的三個核心層次：目錄、定義和篇章。
          </p>
          <div className="bg-background rounded-lg overflow-hidden">
             <SyntaxHighlighter language="typescript" style={vscDarkPlus} customStyle={{ margin: 0, padding: '1.5rem', backgroundColor: 'hsl(var(--muted))' }}>
                {codeString}
            </SyntaxHighlighter>
          </div>
        </section>
      </CardContent>
    </Card>
  );
}
