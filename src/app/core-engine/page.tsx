import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Cpu } from "lucide-react";

export default function CoreEnginePage() {
  return (
    <div className="container mx-auto py-2">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Cpu className="w-8 h-8 text-primary" />
            <div>
              <CardTitle className="text-2xl">萬能核心引擎 (Core Engine)</CardTitle>
              <CardDescription>中央決策與流程控制。</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-muted-foreground">
             <p>
              The Core Engine is the central nervous system of JunAiKey, responsible for interpreting user intent, orchestrating agents, and managing the entire workflow from start to finish. It embodies the "Triune Unity" principle:
            </p>
            <h3 className="font-semibold text-foreground">Triune Unity Workflow:</h3>
            <ul className="list-disc pl-5 space-y-2">
                <li>
                    <strong>Intent:</strong> Captures the user's natural language command or goal.
                </li>
                <li>
                    <strong>AI Processing:</strong> Utilizes Genkit flows and the Agent Network to understand the intent, consult the Knowledge Hub, and formulate a plan.
                </li>
                <li>
                    <strong>Automation:</strong> Executes the plan by generating code, calling APIs via the Rune System, or delegating sub-tasks to specialized agents.
                </li>
            </ul>
            <p>
              This page will serve as the main interface for initiating tasks and monitoring the Core Engine's processes.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
