
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Trash2, Cog, BrainCircuit, Sparkles, TestTube2, AlertTriangle, Info, MoveRight } from 'lucide-react';

interface Condition {
  id: number;
  metric: string;
  operator: string;
  value: string;
}

interface Action {
  id: number;
  type: string;
  target: string;
  details: string;
}

export default function OmniFlowPage() {
  const [ruleName, setRuleName] = useState('New Agent Monitoring Rule');
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [actions, setActions] = useState<Action[]>([]);

  const addCondition = () => {
    setConditions([
      ...conditions,
      { id: Date.now(), metric: 'accuracy', operator: '<', value: '80' },
    ]);
  };

  const addAction = () => {
    setActions([
      ...actions,
      { id: Date.now(), type: 'send_email', target: 'admin@junai.key', details: 'Agent {agent.name} accuracy is below threshold' },
    ]);
  };

  const removeCondition = (id: number) => {
    setConditions(conditions.filter((c) => c.id !== id));
  };
  
  const removeAction = (id: number) => {
    setActions(actions.filter((a) => a.id !== id));
  };


  return (
    <div className="space-y-6">
        <Card>
            <CardHeader>
                <div className="flex items-center gap-4">
                    <Cog className="w-8 h-8 text-primary" />
                    <div>
                        <CardTitle className="text-2xl">全能流程 (OmniFlow)</CardTitle>
                        <CardDescription>The system's automation core. Create "IF...THEN..." rules to automate tasks.</CardDescription>
                    </div>
                </div>
            </CardHeader>
        </Card>
        <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>AI-Assisted Generation</CardTitle>
                        <CardDescription>Describe your rule in natural language, and the AI will generate the corresponding conditions and actions.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Textarea placeholder="e.g., When an agent's engagement is above 95%, add the 'top-performer' tag." />
                    </CardContent>
                    <CardFooter>
                        <Button><Sparkles className="mr-2 h-4 w-4" />Generate Rule</Button>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Rule Editor</CardTitle>
                        <CardDescription>Manually design your automation rule.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <Label htmlFor="rule-name">Rule Name</Label>
                            <Input id="rule-name" value={ruleName} onChange={(e) => setRuleName(e.target.value)} />
                        </div>
                        <div className="space-y-4 p-4 border rounded-lg bg-background">
                            <Label className="text-lg font-semibold">IF</Label>
                            <div className="space-y-2">
                                {conditions.map((condition) => (
                                    <div key={condition.id} className="flex gap-2 items-center">
                                        <Select defaultValue={condition.metric}>
                                            <SelectTrigger><SelectValue/></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="accuracy">Accuracy</SelectItem>
                                                <SelectItem value="engagement">Engagement</SelectItem>
                                                <SelectItem value="level">Level</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Select defaultValue={condition.operator}>
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value=">"> &gt; </SelectItem>
                                                <SelectItem value="<"> &lt; </SelectItem>
                                                <SelectItem value="="> = </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Input defaultValue={condition.value} />
                                        <Button variant="ghost" size="icon" onClick={() => removeCondition(condition.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                                    </div>
                                ))}
                            </div>
                            <Button variant="outline" size="sm" onClick={addCondition}><PlusCircle className="mr-2 h-4 w-4" />Add Condition</Button>
                        </div>
                        <div className="flex justify-center">
                           <MoveRight className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <div className="space-y-4 p-4 border rounded-lg bg-background">
                            <Label className="text-lg font-semibold">THEN</Label>
                            <div className="space-y-2">
                                {actions.map((action) => (
                                    <div key={action.id} className="flex gap-2 items-center">
                                        <Select defaultValue={action.type}>
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="send_email">Send Email</SelectItem>
                                                <SelectItem value="add_tag">Add Tag</SelectItem>
                                                <SelectItem value="trigger_webhook">Trigger Webhook</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Input defaultValue={action.target} />
                                        <Button variant="ghost" size="icon" onClick={() => removeAction(action.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                                    </div>
                                ))}
                            </div>
                            <Button variant="outline" size="sm" onClick={addAction}><PlusCircle className="mr-2 h-4 w-4" />Add Action</Button>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                         <Button variant="ghost">Cancel</Button>
                         <Button>Save Rule</Button>
                    </CardFooter>
                </Card>
            </div>
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center"><BrainCircuit className="mr-2 text-primary"/>AI Explanation</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">Click the button below, and the AI will explain in simple terms how the currently configured rule will work.</p>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" className="w-full">Explain Current Rule</Button>
                    </CardFooter>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center"><TestTube2 className="mr-2 text-primary"/>Rule Test</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">Select an agent to simulate running the current rule and verify if it triggers as expected.</p>
                        <Select>
                            <SelectTrigger><SelectValue placeholder="Select an agent to test..." /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="agent-1">Agent A (Accuracy 95%)</SelectItem>
                                <SelectItem value="agent-2">Agent B (Accuracy 75%)</SelectItem>
                                <SelectItem value="agent-3">Agent C (Engagement 98%)</SelectItem>
                            </SelectContent>
                        </Select>
                         <div className="p-4 bg-muted rounded-md space-y-2">
                            <h4 className="font-semibold flex items-center"><Info className="mr-2 h-4 w-4 text-blue-500"/>Test Result</h4>
                            <p className="text-xs text-muted-foreground font-mono">Agent B selected... Condition "Accuracy &lt; 80" MET... Action "Send Email" EXECUTED...</p>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button variant="secondary" className="w-full">Run Test</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    </div>
  );
}
