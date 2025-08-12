import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Cpu, BrainCircuit, Network, Webhook } from "lucide-react";
import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default function CoreEnginePage() {
  return (
    <Card>
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
            The Core Engine is the central nervous system of JunAiKey, responsible for interpreting user intent, orchestrating agents, and managing the entire workflow from start to finish. It does not merely wait for commands; it proactively analyzes your habits and patterns to anticipate needs, embodying the "Triune Unity" principle:
          </p>
          <h3 className="font-semibold text-foreground text-lg mt-4">Triune Unity Workflow:</h3>
          <ul className="list-disc pl-5 space-y-2">
              <li>
                  <strong>Intent:</strong> Captures the user's natural language command or goal, both explicit and implied.
              </li>
              <li>
                  <strong>AI Processing:</strong> Utilizes Genkit flows and the <Link href="/agent-network" className="text-primary hover:underline">Agent Network</Link> to understand the intent, consult the <Link href="/knowledge-hub" className="text-primary hover:underline">Knowledge Hub</Link>, and formulate a proactive plan.
              </li>
              <li>
                  <strong>Automation:</strong> Executes the plan by generating code, calling APIs via the <Link href="/rune-system" className="text-primary hover:underline">Rune System</Link>, or delegating sub-tasks to specialized agents.
              </li>
          </ul>
           <p className="pt-4">
            This page will serve as the main interface for initiating tasks and monitoring the Core Engine's processes. Below are quick links to the key components it orchestrates.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <Link href="/agent-network" passHref>
                  <Button variant="outline" className="w-full">
                      <Network className="w-4 h-4 mr-2" />
                      Agent Network
                  </Button>
              </Link>
              <Link href="/knowledge-hub" passHref>
                  <Button variant="outline" className="w-full">
                       <BrainCircuit className="w-4 h-4 mr-2" />
                      Knowledge Hub
                  </Button>
              </Link>
              <Link href="/rune-system" passHref>
                  <Button variant="outline" className="w-full">
                      <Webhook className="w-4 h-4 mr-2" />
                      Rune System
                  </Button>
              </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
