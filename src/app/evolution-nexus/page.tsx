
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Infinity, Zap, Sparkles, Wind, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

interface EvolutionRule {
  id: string;
  timestamp: string;
  rule: string;
  reason: string;
  pillars: string[];
}

const pillars = {
  simplicity: '簡單性',
  speed: '快速性',
  practicality: '實用性',
  efficiency: '效能性',
};

const pillarColors: { [key: string]: string } = {
  simplicity: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  speed: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  practicality: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  efficiency: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
};


const generateRule = (): EvolutionRule => {
  const pillarKeys = Object.keys(pillars);
  const randomPillar = pillarKeys[Math.floor(Math.random() * pillarKeys.length)];
  const reasons = {
    simplicity: '降低 UI 複雜度，提升直覺性',
    speed: '優化數據庫查詢，減少響應延遲',
    practicality: '整合用戶反饋，提升功能實用性',
    efficiency: '重構後端邏輯，減少資源消耗',
  }
  const rules = {
      simplicity: "Refactor: Consolidate User and Profile settings pages into a single 'Account' view.",
      speed: "Optimize: Add a new index to the `logs` table on the `timestamp` column.",
      practicality: "Feature: Add a 'quick add' button to the main dashboard for new tasks.",
      efficiency: "Refactor: Switch image processing from a synchronous to an asynchronous queue."
  }

  return {
    id: `EVO-${Date.now()}`,
    timestamp: new Date().toLocaleTimeString(),
    rule: rules[randomPillar as keyof typeof rules],
    reason: reasons[randomPillar as keyof typeof reasons],
    pillars: [randomPillar],
  };
};

export default function EvolutionNexusPage() {
    const [rules, setRules] = useState<EvolutionRule[]>([]);

    useEffect(() => {
        const initialRule = generateRule();
        setRules([initialRule]);

        const interval = setInterval(() => {
            setRules(prevRules => [generateRule(), ...prevRules.slice(0, 4)]);
        }, 5000); // Generate a new rule every 5 seconds

        return () => clearInterval(interval);
    }, []);


  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Infinity className="w-8 h-8 text-primary" />
          <div>
            <CardTitle className="text-2xl">進化中樞 (Evolution Nexus)</CardTitle>
            <CardDescription>
              見證系統自我優化過程的儀表板。
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-muted-foreground">
          系統會根據「四大基石」（簡單、快速、實用、效能）的得分，每 5 分鐘自動生成一條新的優化規則。您可以在此即時見證系統的自主成長與進化。
        </p>

        <div className="space-y-4">
            {rules.map((rule, index) => (
                 <Card key={rule.id} className={`transition-all duration-500 ease-in-out ${index === 0 ? 'opacity-100 transform-none' : 'opacity-60'}`}>
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center justify-between">
                            <span>新進化規則已生成</span>
                            <span className="text-sm font-mono text-muted-foreground">{rule.timestamp}</span>
                        </CardTitle>
                        <CardDescription>{rule.reason}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="p-4 bg-muted rounded-md font-mono text-sm flex items-center gap-3">
                            <Zap className="w-5 h-5 text-yellow-500" />
                            <p>{rule.rule}</p>
                        </div>
                        <div className="mt-4 flex items-center gap-2">
                             <span className="text-sm text-muted-foreground">關聯基石:</span>
                             {rule.pillars.map(p => (
                                <span key={p} className={`px-2 py-1 text-xs font-medium rounded-md ${pillarColors[p]}`}>
                                    {pillars[p as keyof typeof pillars]}
                                </span>
                             ))}
                        </div>
                    </CardContent>
                 </Card>
            ))}
        </div>

      </CardContent>
    </Card>
  );
}
