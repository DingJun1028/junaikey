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
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Network, Search, UserPlus } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const agents = [
    { id: 'agent-001', name: 'Market Analysis Agent', level: 3, engagement: 92, accuracy: 95, status: 'Active' },
    { id: 'agent-002', name: 'Customer Support Bot', level: 2, engagement: 88, accuracy: 91, status: 'Active' },
    { id: 'agent-003', name: 'Data Sync Core', level: 4, engagement: 99, accuracy: 99.8, status: 'Active' },
    { id: 'agent-004', name: 'Content Generation Sprite', level: 2, engagement: 85, accuracy: 89, status: 'Idle' },
    { id: 'agent-005', name: 'Security Audit Guardian', level: 5, engagement: 100, accuracy: 100, status: 'System' },
];

export default function AgentNetworkPage() {
  return (
    <div className="space-y-6">
       <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Network className="w-8 h-8 text-primary" />
            <div>
              <CardTitle>萬能代理網絡</CardTitle>
              <CardDescription>Agent Network: Manage and monitor all AI agents operating within the system.</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
            <div className="flex items-center justify-between">
                <div>
                    <CardTitle>Agent Fleet</CardTitle>
                    <CardDescription>An overview of all active and idle agents.</CardDescription>
                </div>
                <Button><UserPlus className="mr-2 h-4 w-4"/>New Agent</Button>
            </div>
             <div className="pt-4">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search by agent name or ID..." className="pl-8" />
                </div>
            </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent Name</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Engagement</TableHead>
                <TableHead>Accuracy</TableHead>
                <TableHead>Status</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agents.map((agent) => (
                <TableRow key={agent.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">{agent.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-mono">Lv.{agent.level}</Badge>
                    </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                        <Progress value={agent.engagement} className="h-2 w-24" />
                        <span className="text-xs text-muted-foreground">{agent.engagement}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                     <div className="flex items-center gap-2">
                        <Progress value={agent.accuracy} className="h-2 w-24" />
                        <span className="text-xs text-muted-foreground">{agent.accuracy}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={agent.status === 'Active' ? 'default' : agent.status === 'System' ? 'secondary' : 'outline' }>{agent.status}</Badge>
                  </TableCell>
                  <TableCell>
                     <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4"/></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
