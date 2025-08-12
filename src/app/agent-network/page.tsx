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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Network className="w-8 h-8 text-primary" />
            <div>
              <CardTitle className="text-2xl">萬能代理網絡 (Agent Network)</CardTitle>
              <CardDescription>The autonomous execution and delegation network. It processes and executes tasks based on predefined rules and live data, serving as the system's hands and feet.</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
      <AgentNetworkForm />
    </div>
  );
}
