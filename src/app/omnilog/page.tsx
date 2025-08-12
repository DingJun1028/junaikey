"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from 'recharts';
import { Users, Bot, Cog, Activity } from 'lucide-react';

const agentPerformanceData = [
  { engagement: 80, accuracy: 92, level: 2 },
  { engagement: 65, accuracy: 88, level: 1 },
  { engagement: 95, accuracy: 98, level: 3 },
  { engagement: 72, accuracy: 85, level: 1 },
  { engagement: 88, accuracy: 95, level: 2 },
  { engagement: 98, accuracy: 99, level: 4 },
  { engagement: 50, accuracy: 75, level: 1 },
  { engagement: 78, accuracy: 90, level: 2 },
  { engagement: 91, accuracy: 96, level: 3 },
  { engagement: 60, accuracy: 82, level: 1 },
];

const agentLevelData = [
  { name: 'Level 1', count: 12, color: '#8884d8' },
  { name: 'Level 2', count: 25, color: '#82ca9d' },
  { name: 'Level 3', count: 8, color: '#ffc658' },
  { name: 'Level 4+', count: 3, color: '#ff8042' },
];


export default function OmniLogPage() {
  return (
    <div className="flex-1 space-y-6">
      <Card>
        <CardHeader>
            <div className="flex items-center gap-4">
               <Activity className="w-8 h-8 text-primary" />
               <div>
                <CardTitle>全能日誌</CardTitle>
                <CardDescription>OmniLog: Your system's central dashboard, providing a real-time overview of all key metrics.</CardDescription>
               </div>
            </div>
        </CardHeader>
      </Card>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active AI Agents</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-muted-foreground">+5 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Engagement</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85.3%</div>
            <p className="text-xs text-muted-foreground">+2.1% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Accuracy</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">91.7%</div>
            <p className="text-xs text-muted-foreground">Stable</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Automation Rules</CardTitle>
            <Cog className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground">+3 this week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Agent Performance Matrix</CardTitle>
            <CardDescription>
              Distribution of agent engagement and accuracy, sized by level.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <ScatterChart
                margin={{
                  top: 20,
                  right: 40,
                  bottom: 20,
                  left: 20,
                }}
              >
                <CartesianGrid />
                <XAxis type="number" dataKey="engagement" name="Engagement" unit="%" />
                <YAxis type="number" dataKey="accuracy" name="Accuracy" unit="%" domain={[70, 100]}/>
                <ZAxis type="number" dataKey="level" range={[60, 400]} name="Level" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Legend />
                <Scatter name="Agent Performance" data={agentPerformanceData} fill="hsl(var(--primary))" />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Agent Level Distribution</CardTitle>
            <CardDescription>
              Distribution of AI agents across different levels.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={agentLevelData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="count"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {agentLevelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                   <Tooltip />
                  <Legend />
                </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
