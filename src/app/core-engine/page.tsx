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
      <CardHeader className="pb-4">
        <div className="flex items-start gap-4">
          <Cpu className="w-8 h-8 text-primary flex-shrink-0" />
          <div>
            <CardTitle>萬能核心引擎</CardTitle>
            <CardDescription className="mt-1">Core Engine: The central nervous system of JunAiKey, responsible for interpreting intent, orchestrating agents, and managing the entire workflow.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-4">
        <div className="p-6 bg-muted/50 rounded-lg text-muted-foreground space-y-4">
           <p>
            The Core Engine does not merely wait for commands; it proactively analyzes your habits and patterns to anticipate needs, embodying the "Triune Unity" principle. It serves as the central orchestration layer connecting all other modules.
          </p>
          <div>
            <h3 className="font-semibold text-foreground text-lg mb-2">Triune Unity Workflow:</h3>
            <ul className="list-disc pl-5 space-y-2">
                <li>
                    <strong>Intent:</strong> Captures the user's natural language command or goal, both explicit and implied, from any interface.
                </li>
                <li>
                    <strong>AI Processing:</strong> Utilizes Genkit flows and the <Link href="/agent-network" className="text-primary hover:underline">Agent Network</Link> to understand the intent, consult the <Link href="/knowledge-hub" className="text-primary hover:underline">Knowledge Hub</Link>, and formulate a proactive plan.
                </li>
                <li>
                    <strong>Automation:</strong> Executes the plan by generating code, calling APIs via the <Link href="/rune-system" className="text-primary hover:underline">Rune System</Link>, or delegating sub-tasks to specialized agents.
                </li>
            </ul>
          </div>
        </div>
         <div>
           <h3 className="text-lg font-semibold text-foreground mb-4">Orchestrated Components</h3>
           <p className="mb-4 text-muted-foreground">
            This page serves as the main interface for initiating tasks and monitoring the Core Engine's processes. Below are quick links to the key components it orchestrates.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/agent-network" passHref>
                  <Button variant="outline" className="w-full h-16 justify-start p-4 text-left">
                      <div className="flex items-center gap-3">
                        <Network className="w-6 h-6 text-primary" />
                        <div>
                            <p className="font-semibold">Agent Network</p>
                            <p className="text-xs text-muted-foreground">Execute tasks</p>
                        </div>
                      </div>
                  </Button>
              </Link>
              <Link href="/knowledge-hub" passHref>
                  <Button variant="outline" className="w-full h-16 justify-start p-4 text-left">
                       <div className="flex items-center gap-3">
                        <BrainCircuit className="w-6 h-6 text-primary" />
                        <div>
                            <p className="font-semibold">Knowledge Hub</p>
                            <p className="text-xs text-muted-foreground">Consult memory</p>
                        </div>
                      </div>
                  </Button>
              </Link>
              <Link href="/rune-system" passHref>
                  <Button variant="outline" className="w-full h-16 justify-start p-4 text-left">
                      <div className="flex items-center gap-3">
                        <Webhook className="w-6 h-6 text-primary" />
                        <div>
                            <p className="font-semibold">Rune System</p>
                            <p className="text-xs text-muted-foreground">Integrate APIs</p>
                        </div>
                      </div>
                  </Button>
              </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
