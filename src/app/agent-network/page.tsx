import { AgentNetworkForm } from "./agent-network-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Network } from "lucide-react";

export default function AgentNetworkPage() {
  return (
    <div className="container mx-auto py-2">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Network className="w-8 h-8 text-primary" />
            <div>
              <CardTitle className="text-2xl">萬能代理網絡 (Agent Network)</CardTitle>
              <CardDescription>任務的自主執行與委派網絡。</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-muted-foreground">
            Define a task and its parameters. The agent network will process and
            execute it.
          </p>
          <AgentNetworkForm />
        </CardContent>
      </Card>
    </div>
  );
}
