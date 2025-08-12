import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BrainCircuit, Search, PlusCircle, History, Sparkles } from "lucide-react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const knowledgeEntries = [
  {
    id: "MEM001",
    title: "User Preferences: Dark Mode",
    type: "User Memory",
    tags: ["UI", "Preference"],
    lastUpdated: "2024-07-29",
  },
  {
    id: "AGENT002",
    title: "Agent Log: Task Delegation Flow",
    type: "Agent State",
    tags: ["Agent", "Genkit", "Log"],
    lastUpdated: "2024-07-28",
  },
  {
    id: "SESS003",
    title: "Session History: Theme Generation",
    type: "Session Memory",
    tags: ["Theme Engine", "AI", "History"],
    lastUpdated: "2024-07-27",
  },
  {
    id: "SYS004",
    title: "Core Principle: Triune Unity",
    type: "System Knowledge",
    tags: ["Philosophy", "Core"],
    lastUpdated: "2024-07-26",
  },
];


export default function KnowledgeHubPage() {
  return (
    <div className="container mx-auto py-2">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <BrainCircuit className="w-8 h-8 text-primary" />
            <div>
              <CardTitle className="text-2xl">萬能智庫中樞 (Knowledge Hub)</CardTitle>
              <CardDescription>The system's intelligent, long-term memory.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
                 <Card className="p-4 bg-muted/30">
                    <CardHeader className="p-2 pt-0">
                         <div className="flex items-center gap-3">
                            <History className="w-6 h-6 text-primary"/>
                            <CardTitle className="text-lg">Multi-Level Memory</CardTitle>
                         </div>
                    </CardHeader>
                    <CardContent className="text-sm p-2 pt-0 space-y-2 text-muted-foreground">
                       <p>Seamlessly retains User, Session, and Agent state with adaptive personalization, ensuring context-rich interactions.</p>
                    </CardContent>
                 </Card>
                  <Card className="p-4 bg-muted/30">
                    <CardHeader className="p-2 pt-0">
                         <div className="flex items-center gap-3">
                            <Sparkles className="w-6 h-6 text-primary"/>
                            <CardTitle className="text-lg">Intelligent & Fast</CardTitle>
                         </div>
                    </CardHeader>
                    <CardContent className="text-sm p-2 pt-0 space-y-2 text-muted-foreground">
                        <p>With high accuracy and fast responses, the knowledge hub provides low-latency, high-relevance information.</p>
                    </CardContent>
                 </Card>
                 <Card className="p-4 bg-muted/30">
                    <CardHeader className="p-2 pt-0">
                         <div className="flex items-center gap-3">
                            <PlusCircle className="w-6 h-6 text-primary"/>
                            <CardTitle className="text-lg">Developer-Friendly</CardTitle>
                         </div>
                    </CardHeader>
                    <CardContent className="text-sm p-2 pt-0 space-y-2 text-muted-foreground">
                        <p>An intuitive API and cross-platform SDKs allow for easy integration and extension of the system's memory capabilities.</p>
                    </CardContent>
                 </Card>
            </div>

          <div className="flex justify-between items-center mb-6 gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search the knowledge base..." className="pl-8" />
            </div>
             <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Entry
            </Button>
          </div>
          
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead className="text-right">Last Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {knowledgeEntries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell className="font-medium font-mono text-xs">{entry.id}</TableCell>
                    <TableCell>{entry.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{entry.type}</Badge>
                    </TableCell>
                    <TableCell className="flex gap-1">
                      {entry.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                    </TableCell>
                    <TableCell className="text-right">{entry.lastUpdated}</TableCell>
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
