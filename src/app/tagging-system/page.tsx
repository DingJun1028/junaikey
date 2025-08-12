
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
import { cn } from "@/lib/utils";

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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start gap-4">
            <Tags className="w-8 h-8 text-primary flex-shrink-0" />
            <div>
              <CardTitle className="text-2xl">萬能標籤體系 (Tagging System)</CardTitle>
              <CardDescription className="mt-1">
                A universal metadata and classification system for intelligent data association and tracking.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-muted/50 rounded-lg">
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
              <h3 className="text-lg font-semibold mb-2 text-center">Tagging Graph Visualization</h3>
               <div className="flex justify-center items-center h-full">
                  <p className="text-muted-foreground">(Visualization placeholder)</p>
               </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
             <div className="flex justify-between items-center gap-4">
              <div>
                <CardTitle>Tag Manager</CardTitle>
                <CardDescription>Browse, search, and manage all system tags.</CardDescription>
              </div>
               <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                New Tag
              </Button>
            </div>
             <div className="relative mt-4">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search tags..." className="pl-8" />
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
                      <TableCell className="text-right font-mono">{tag.count}</TableCell>
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
                              <span className="font-medium">
                                  <span className={cn("font-bold", {
                                      "text-green-600 dark:text-green-400": activity.action === "Generated",
                                      "text-blue-600 dark:text-blue-400": activity.action === "Associated",
                                      "text-purple-600 dark:text-purple-400": activity.action === "Inferred",
                                      "text-orange-600 dark:text-orange-400": activity.action === "Updated",
                                  })}>{activity.action}</span> tag <Badge variant="secondary">{activity.tag}</Badge>
                              </span>
                              <span className="block text-muted-foreground">on "{activity.source}"</span>
                          </div>
                      </li>
                  ))}
              </ul>
           </CardContent>
        </Card>
      </div>
    </div>
  );
}
