
'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Search, UserPlus } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const agents = [
  { id: 'agent-001', name: '市場分析代理', level: 3, engagement: 92, accuracy: 95, status: 'Active' },
  { id: 'agent-002', name: '客戶支援機器人', level: 2, engagement: 88, accuracy: 91, status: 'Active' },
  { id: 'agent-003', name: '數據同步核心', level: 4, engagement: 99, accuracy: 99.8, status: 'Active' },
  { id: 'agent-004', name: '內容生成精靈', level: 2, engagement: 85, accuracy: 89, status: 'Idle' },
  { id: 'agent-005', name: '安全審計守衛', level: 5, engagement: 100, accuracy: 100, status: 'System' },
];

export default function OmniAgentsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
            <h2 className="text-3xl font-bold tracking-tight">全能代理 (OmniAgents)</h2>
            <p className="text-muted-foreground">管理和監控在系統中運行的所有 AI 代理。</p>
        </div>
        <Button><UserPlus className="mr-2 h-4 w-4"/>新增代理</Button>
      </div>

       <div className="pb-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="搜索代理名稱或ID..." className="pl-8" />
          </div>
        </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>代理名稱</TableHead>
                <TableHead>等級</TableHead>
                <TableHead>參與度</TableHead>
                <TableHead>準確度</TableHead>
                <TableHead>狀態</TableHead>
                <TableHead><span className="sr-only">操作</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agents.map((agent) => (
                <TableRow key={agent.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">{agent.name}</TableCell>
                  <TableCell>{agent.level}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                        <span>{agent.engagement}%</span>
                        <Progress value={agent.engagement} className="h-2 w-24" />
                    </div>
                  </TableCell>
                  <TableCell>
                     <div className="flex items-center gap-2">
                        <span>{agent.accuracy}%</span>
                        <Progress value={agent.accuracy} className="h-2 w-24" />
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
