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
import { Webhook, CheckCircle, XCircle, Clock } from "lucide-react";

const runes = [
  { name: "OpenAI", type: "AI/LLM", status: "Operational", auth: "Bearer Token" },
  { name: "Notion", type: "Productivity/CMS", status: "Operational", auth: "Bearer Token" },
  { name: "AITable.ai", type: "Database/AI", status: "Operational", auth: "Bearer Token" },
  { name: "Supabase", type: "BaaS/Database", status: "Operational", auth: "Service Role Key" },
  { name: "Straico AI", type: "AI/LLM Gateway", status: "Operational", auth: "Bearer Token" },
  { name: "GitHub", type: "DevOps/VCS", status: "Operational", auth: "Personal Access Token" },
  { name: "Google Cloud", type: "Cloud/AI", status: "Operational", auth: "OAuth/Service Account" },
  { name: "Boost.space", type: "Automation/iPaaS", status: "Operational", auth: "Bearer Token" },
  { name: "Taskade", type: "Productivity/Tasks", status: "Operational", auth: "Bearer Token" },
  { name: "Capacities", type: "Productivity/Notes", status: "Pending API", auth: "API Key" },
  { name: "Mymemoai", type: "Productivity/AI Notes", status: "Pending API", auth: "API Key (TBD)" },
  { name: "InfoFlow", type: "OA/Workflow", status: "Local Deployed", auth: "Token/None" },
  { name: "Scripting App", type: "Local Automation", status: "Local Deployed", auth: "Local Permissions" },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Operational":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "Pending API":
      return <Clock className="h-4 w-4 text-yellow-500" />;
    case "Local Deployed":
       return <CheckCircle className="h-4 w-4 text-blue-500" />;
    default:
      return <XCircle className="h-4 w-4 text-red-500" />;
  }
};


export default function RuneSystemPage() {
  return (
    <div className="container mx-auto py-2">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Webhook className="w-8 h-8 text-primary" />
            <div>
              <CardTitle className="text-2xl">萬能符文系統 (Rune System)</CardTitle>
              <CardDescription>
                The integration layer for all external services and APIs.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-muted-foreground">
            This table provides an overview of all integrated "Runes" (APIs), their primary functions, and current operational status within the OmniKey System.
          </p>
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rune Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Authentication</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {runes.map((rune) => (
                  <TableRow key={rune.name}>
                    <TableCell className="font-medium">{rune.name}</TableCell>
                    <TableCell>
                        <Badge variant="outline">{rune.type}</Badge>
                    </TableCell>
                     <TableCell>
                        <Badge variant="secondary">{rune.auth}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(rune.status)}
                        <span>{rune.status}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
