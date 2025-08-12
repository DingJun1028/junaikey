import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BrainCircuit, Search, PlusCircle } from "lucide-react";
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
    id: "K001",
    title: "Core Philosophy & Sacred Pillars",
    type: "System Architecture",
    tags: ["Philosophy", "Core"],
    lastUpdated: "2024-07-28",
  },
  {
    id: "K002",
    title: "Six Styles of Infinite Evolution",
    type: "Core Mechanic",
    tags: ["Evolution Loop", "Automation"],
    lastUpdated: "2024-07-28",
  },
  {
    id: "K003",
    title: "Agent Network Implementation",
    type: "Technical Document",
    tags: ["Agent", "Genkit", "AI"],
    lastUpdated: "2024-07-27",
  },
  {
    id: "K004",
    title: "Theme Engine UI/UX Principles",
    type: "Design Guideline",
    tags: ["UI", "UX", "Theme"],
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
              <CardDescription>系統的長期記憶與知識管理中心。</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
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
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead className="text-right">Last Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {knowledgeEntries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell className="font-medium">{entry.id}</TableCell>
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