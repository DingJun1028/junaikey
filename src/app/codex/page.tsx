
"use client";

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
      <CardHeader className="pb-4">
        <div className="flex items-start gap-4">
          <BookOpen className="w-8 h-8 text-primary flex-shrink-0" />
          <div>
            <CardTitle>開發者聖典</CardTitle>
            <CardDescription className="mt-1">
              Developer Codex: The core technical documentation for the Triune Unity and Universal Card structure.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-8 pt-4">
        <section>
           <div className="mb-3">
              <h2 className="text-xl font-semibold">三界統合：數據語義對應</h2>
              <p className="text-sm text-muted-foreground">Triune Unity: Data-Semantic Mapping</p>
            </div>
          <p className="text-muted-foreground mb-4">
            To fully integrate the "Physical World (Omni-Universe)," "System World (Omni-System)," and "Card World (Omni-Matrix)," the core lies in mapping data to semantics. Each card is a "meaning-vectorized" data structure, carrying a queryable, editable, and recordable "unit of action."
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg bg-background">
              <div className="flex items-center gap-3 mb-2">
                <Globe className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Physical World (萬能宇宙)</h3>
              </div>
              <p className="text-sm text-muted-foreground">The source of all meaning, experience, and concepts (i.e., human life, nature, culture, philosophy).</p>
            </div>
             <div className="p-4 border rounded-lg bg-background">
              <div className="flex items-center gap-3 mb-2">
                <Code className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">System World (萬能系統)</h3>
              </div>
              <p className="text-sm text-muted-foreground">The abstracted rules, models, data, and processes for all phenomena (e.g., AI, rule engines, algorithms).</p>
            </div>
             <div className="p-4 border rounded-lg bg-background">
              <div className="flex items-center gap-3 mb-2">
                <LinkIcon className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Card World (萬能矩陣)</h3>
              </div>
              <p className="text-sm text-muted-foreground">Projects all the above meanings into a concrete, operable card game system.</p>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-3">
            <h2 className="text-xl font-semibold">卡牌結構設計範例 (TypeScript)</h2>
            <p className="text-sm text-muted-foreground">Card Structure Design Example (TypeScript)</p>
          </div>
          <p className="text-muted-foreground mb-4">
            This is the core TypeScript type definition for a `UniversalCard`. It demonstrates how a card links to the three core layers of the universe: the Catalog, Definitions, and Chapters.
          </p>
          <div className="bg-background rounded-lg overflow-hidden border">
             <SyntaxHighlighter language="typescript" style={vscDarkPlus} customStyle={{ margin: 0, padding: '1.5rem', backgroundColor: 'hsl(var(--background))' }}>
                {codeString}
            </SyntaxHighlighter>
          </div>
        </section>
      </CardContent>
    </Card>
  );
}
