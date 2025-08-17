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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BrainCircuit,
  DraftingCompass,
  Gem,
  Flame,
  BookUser
} from "lucide-react";
import Link from "next/link";
import { principles } from "../../../../omni_center/src/blueprints/knowledge-hub/principles";
import { philosophies } from "../../../../omni_center/src/blueprints/knowledge-hub/philosophies";
import { elementalSpirits } from "../../../../omni_center/src/blueprints/knowledge-hub/elements";
import { professionalAvatars } from "../../../../omni_center/src/blueprints/knowledge-hub/avatars";


export default function KnowledgeHubPage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start gap-4">
          <BrainCircuit className="w-8 h-8 text-primary flex-shrink-0" />
          <div>
            <CardTitle>
              萬能智庫中樞
            </CardTitle>
            <CardDescription className="mt-1">
              Knowledge Hub: The repository for all the system's core concepts, architectures, and principles.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 h-auto">
            <TabsTrigger value="overview">
              <div className="flex flex-col items-center gap-1 py-1">
                <DraftingCompass className="w-4 h-4" />
                <span className="text-xs">12 Core Dimensions</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="philosophy">
              <div className="flex flex-col items-center gap-1 py-1">
                <Gem className="w-4 h-4" />
                <span className="text-xs">4 Cosmic Axioms</span>
              </div>
            </TabsTrigger>
             <TabsTrigger value="elements">
               <div className="flex flex-col items-center gap-1 py-1">
                <Flame className="w-4 h-4" />
                <span className="text-xs">10 Elemental Laws</span>
              </div>
            </TabsTrigger>
             <TabsTrigger value="avatars">
              <div className="flex flex-col items-center gap-1 py-1">
                <BookUser className="w-4 h-4" />
                <span className="text-xs">10 Pro Avatars</span>
              </div>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>The 12 Core Dimensions (MECE Framework)</CardTitle>
                <CardDescription>
                  The core components of the system, divided based on the MECE (Mutually Exclusive, Collectively Exhaustive) principle.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {principles.map((item, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                      <AccordionTrigger>
                        <Link href={item.href} className="flex items-center gap-3 hover:no-underline text-left w-full">
                          <item.icon className="w-5 h-5 text-primary" />
                          <div>
                            <span className="font-semibold text-lg">{item.title}</span>
                            <span className="block text-sm text-muted-foreground">{item.label}</span>
                          </div>
                        </Link>
                      </AccordionTrigger>
                      <AccordionContent className="pl-10">
                        <p className="font-medium text-muted-foreground">
                          {item.description}
                        </p>
                        <p className="mt-2 text-sm">{item.details}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="philosophy" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>The 4 Cosmic Axioms: The Architect's Passive Talents</CardTitle>
                <CardDescription>
                  The four core axioms that drive the universe's operation. They are the cornerstones of your creative authority.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {philosophies.map((item, index) => (
                    <AccordionItem value={`item-p-${index}`} key={index}>
                      <AccordionTrigger>
                        <div className="flex items-start text-left gap-3">
                          <item.icon className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                          <div>
                            <p className="font-semibold text-lg">{item.title}</p>
                            <p className="text-sm text-muted-foreground font-normal mt-1">{item.description}</p>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4 text-sm pt-4">
                        <div className="border rounded-lg overflow-hidden">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="w-1/4">Dimension</TableHead>
                                <TableHead>System World (Jun.Ai.Key)</TableHead>
                                <TableHead>Card World (Architect Duels)</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {item.content.map((row, rIndex) => (
                                <TableRow key={rIndex}>
                                  <TableCell className="font-semibold">
                                    {row.header}
                                  </TableCell>
                                  <TableCell className="whitespace-pre-line">
                                    {row.system}
                                  </TableCell>
                                  <TableCell className="whitespace-pre-line">
                                    {row.game}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

           <TabsContent value="elements" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>The 10 Elemental Laws</CardTitle>
                <CardDescription>
                  Universal principles guiding module interaction, evolution, and balance, representing ten card attributes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                 <div className="border rounded-md">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[20%]">Element</TableHead>
                          <TableHead className="w-[30%]">Spirit Alias</TableHead>
                          <TableHead>Core Essence</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {elementalSpirits.map((element) => (
                          <TableRow key={element.name}>
                            <TableCell className="font-medium">{element.name}</TableCell>
                            <TableCell>{element.spirit}</TableCell>
                            <TableCell>{element.essence}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="avatars" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>The 10 Professional Avatars</CardTitle>
                <CardDescription>
                  Key roles within the ecosystem that collectively build the sustainable partnership.
                </CardDescription>
              </CardHeader>
              <CardContent>
                 <div className="border rounded-lg">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Avatar</TableHead>
                          <TableHead>Core Responsibility</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {professionalAvatars.map((avatar) => (
                          <TableRow key={avatar.name}>
                            <TableCell className="font-medium">{avatar.name}</TableCell>
                            <TableCell>{avatar.description}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
