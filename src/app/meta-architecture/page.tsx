import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { DraftingCompass, Bot, Database, Workflow } from "lucide-react";

export default function MetaArchitecturePage() {
  return (
    <div className="container mx-auto py-2">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-4">
            <DraftingCompass className="w-8 h-8 text-primary" />
            <div>
              <CardTitle className="text-2xl">萬能元架構 (Meta Architecture)</CardTitle>
              <CardDescription>由 AI 驅動的動態架構生成與調整。</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6 text-muted-foreground">
             <p>
              The Meta Architecture is the self-aware blueprint of the JunAiKey system. It uses AI to dynamically generate, assess, and adjust its own architecture, ensuring the system remains optimal, resilient, and aligned with its core philosophies as it evolves.
            </p>
            <h3 className="font-semibold text-foreground text-lg">Key Principles:</h3>
            <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-muted/50 rounded-lg">
                    <Bot className="w-8 h-8 mx-auto text-primary mb-2"/>
                    <h4 className="font-semibold text-foreground">AI-Driven Design</h4>
                    <p className="text-sm">Leverages Genkit flows to analyze requirements and generate architectural patterns.</p>
                </div>
                 <div className="p-4 bg-muted/50 rounded-lg">
                    <Database className="w-8 h-8 mx-auto text-primary mb-2"/>
                    <h4 className="font-semibold text-foreground">Self-Optimization</h4>
                    <p className="text-sm">Continuously monitors performance and suggests refactoring or resource reallocation.</p>
                </div>
                 <div className="p-4 bg-muted/50 rounded-lg">
                    <Workflow className="w-8 h-8 mx-auto text-primary mb-2"/>
                    <h4 className="font-semibold text-foreground">Adaptive Evolution</h4>
                    <p className="text-sm">Modifies schemas, agent workflows, and data models in response to new tasks and data.</p>
                </div>
            </div>
            <p>
              This page will serve as the interface for observing and guiding the meta-architectural evolution of the system, making it a living, breathing codebase.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
