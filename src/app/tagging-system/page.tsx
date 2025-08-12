import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Tags, Search, PlusCircle, Share2, GitBranch } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const recentTags = [
  { id: "T001", name: "AI", count: 125, category: "Core Tech" },
  { id: "T002", name: "Genkit", count: 78, category: "Framework" },
  { id: "T003", name: "Agent", count: 92, category: "Concept" },
  { id: "T004", name: "UI/UX", count: 54, category: "Design" },
  { id: "T005", name: "Automation", count: 110, category: "Workflow" },
];

const recentActivity = [
    {id: 1, action: "Generated", tag: "AI", source: "Knowledge Hub Entry K003"},
    {id: 2, action: "Associated", tag: "UI/UX", source: "Theme Engine Prompt"},
    {id: 3, action: "Inferred", tag: "Automation", source: "Agent Network Task"},
    {id: 4, action: "Updated", tag: "Genkit", source: "Agent Network Implementation"},
]

export default function TaggingSystemPage() {
  return (
    <TooltipProvider>
      <div className="container mx-auto py-2 space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <Tags className="w-8 h-8 text-primary" />
              <div>
                <CardTitle className="text-2xl">萬能標籤體系 (Tagging System)</CardTitle>
                <CardDescription>
                  通用的元數據與分類系統，實現數據的智能關聯與追蹤。
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Core Principles</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                  <li>
                    <strong>Permanent & Real-time:</strong> All tag history is
                    recorded and updated instantly with data flow.
                  </li>
                  <li>
                    <strong>Intelligent & Automatic:</strong> NLP and multimodal
                    models automatically analyze data relationships to generate
                    tags.
                  </li>
                  <li>
                    <strong>Bidirectional Tracking:</strong> Trace data from
                    tags, and trace tags from data, creating a complete data
                    lineage.
                  </li>
                   <li>
                    <strong>Generative & Scalable:</strong> Tags can be
                    generated on-demand, with adjustable detail and hierarchy.
                  </li>
                </ul>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Tagging Graph</h3>
                 <div className="flex justify-center items-center h-full">
                    <Share2 className="w-24 h-24 text-primary/30" />
                 </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Tag Manager</CardTitle>
               <div className="flex justify-between items-center pt-2 gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search tags..." className="pl-8" />
                </div>
                 <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Tag
                </Button>
              </div>
            </CardHeader>
            <CardContent>
               <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tag Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Count</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentTags.map((tag) => (
                      <TableRow key={tag.id}>
                        <TableCell className="font-medium">
                            <Badge>{tag.name}</Badge>
                        </TableCell>
                        <TableCell>
                            <Badge variant="outline">{tag.category}</Badge>
                        </TableCell>
                        <TableCell className="text-right">{tag.count}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          <Card>
             <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Live feed of the tagging engine's operations.</CardDescription>
             </CardHeader>
             <CardContent>
                <ul className="space-y-4">
                    {recentActivity.map(activity => (
                        <li key={activity.id} className="flex items-start gap-3">
                            <div className="mt-1">
                                <GitBranch className="w-4 h-4 text-primary/80"/>
                            </div>
                            <div className="text-sm">
                                <p className="font-medium">
                                    <span className={cn("font-bold", {
                                        "text-green-600": activity.action === "Generated",
                                        "text-blue-600": activity.action === "Associated",
                                        "text-purple-600": activity.action === "Inferred",
                                        "text-orange-600": activity.action === "Updated",
                                    })}>{activity.action}</span> tag <Badge variant="secondary">{activity.tag}</Badge>
                                </p>
                                <p className="text-muted-foreground">on "{activity.source}"</p>
                            </div>
                        </li>
                    ))}
                </ul>
             </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  );
}