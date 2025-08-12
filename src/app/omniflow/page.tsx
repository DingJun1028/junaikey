
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
import { PlusCircle, Trash2, Cog, BrainCircuit, Sparkles, TestTube2, AlertTriangle, Info } from 'lucide-react';

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
  const [ruleName, setRuleName] = useState('新規則');
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
      { id: Date.now(), type: 'send_email', target: 'admin@junai.key', details: '代理 {agent.name} 的準確度低於閾值' },
    ]);
  };

  const removeCondition = (id: number) => {
    setConditions(conditions.filter((c) => c.id !== id));
  };
  
  const removeAction = (id: number) => {
    setActions(actions.filter((a) => a.id !== id));
  };


  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">全能流程 (OmniFlow)</h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>AI 輔助生成</CardTitle>
                        <CardDescription>用自然語言描述您的規則，AI 會為您生成對應的條件與操作。</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Textarea placeholder="例如：當代理的參與度高於 95 時，將其標記為 'top-performer'" />
                    </CardContent>
                    <CardFooter>
                        <Button><Sparkles className="mr-2 h-4 w-4" />生成規則</Button>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>規則編輯器</CardTitle>
                        <CardDescription>手動設計您的自動化規則。</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="rule-name">規則名稱</Label>
                            <Input id="rule-name" value={ruleName} onChange={(e) => setRuleName(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label>如果 (IF)</Label>
                            {conditions.map((condition) => (
                                <div key={condition.id} className="flex gap-2 items-center p-2 border rounded-lg">
                                    <Select defaultValue={condition.metric}>
                                        <SelectTrigger><SelectValue/></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="accuracy">準確度</SelectItem>
                                            <SelectItem value="engagement">參與度</SelectItem>
                                            <SelectItem value="level">等級</SelectItem>
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
                            <Button variant="outline" onClick={addCondition}><PlusCircle className="mr-2 h-4 w-4" />新增條件</Button>
                        </div>
                        <div className="space-y-2">
                            <Label>那麼 (THEN)</Label>
                            {actions.map((action) => (
                                <div key={action.id} className="flex gap-2 items-center p-2 border rounded-lg">
                                    <Select defaultValue={action.type}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="send_email">發送郵件</SelectItem>
                                            <SelectItem value="add_tag">新增標籤</SelectItem>
                                            <SelectItem value="trigger_webhook">觸發 Webhook</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Input defaultValue={action.target} />
                                    <Button variant="ghost" size="icon" onClick={() => removeAction(action.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                                </div>
                            ))}
                            <Button variant="outline" onClick={addAction}><PlusCircle className="mr-2 h-4 w-4" />新增操作</Button>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                         <Button variant="ghost">取消</Button>
                         <Button>儲存規則</Button>
                    </CardFooter>
                </Card>
            </div>
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center"><BrainCircuit className="mr-2"/>AI 解釋</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">點擊下方按鈕，AI 會用簡單的語言解釋當前設定的規則將如何運作。</p>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" className="w-full">解釋當前規則</Button>
                    </CardFooter>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center"><TestTube2 className="mr-2"/>規則測試</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">選擇一個代理，模擬執行當前規則，以驗證其是否如預期般觸發。</p>
                        <Select>
                            <SelectTrigger><SelectValue placeholder="選擇一個代理..." /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="agent-1">代理 A (準確度 95%)</SelectItem>
                                <SelectItem value="agent-2">代理 B (準確度 75%)</SelectItem>
                                <SelectItem value="agent-3">代理 C (參與度 98%)</SelectItem>
                            </SelectContent>
                        </Select>
                         <div className="p-4 bg-muted rounded-md space-y-2">
                            <h4 className="font-semibold flex items-center"><Info className="mr-2 h-4 w-4"/>測試結果</h4>
                            <p className="text-xs text-muted-foreground">選擇代理 B... 條件 "準確度 &lt; 80" 滿足... 執行操作 "發送郵件"...</p>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button variant="secondary" className="w-full">執行測試</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    </div>
  );
}
