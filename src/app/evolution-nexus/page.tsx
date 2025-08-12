
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
  simplicity: 'Simplicity',
  speed: 'Speed',
  practicality: 'Practicality',
  efficiency: 'Efficiency',
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
    simplicity: 'Reduce UI complexity for better intuition.',
    speed: 'Optimize database queries to reduce response latency.',
    practicality: 'Integrate user feedback to enhance functionality.',
    efficiency: 'Refactor backend logic to minimize resource consumption.',
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
    <Card>
      <CardHeader>
        <div className="flex items-start gap-4">
          <Infinity className="w-8 h-8 text-primary flex-shrink-0" />
          <div>
            <CardTitle className="text-2xl">進化中樞 (Evolution Nexus)</CardTitle>
            <CardDescription className="mt-1">
              A dashboard to witness the system's self-optimization process.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-muted-foreground p-6 bg-muted/50 rounded-lg">
          Based on the scores of the "Four Pillars" (Simplicity, Speed, Practicality, Efficiency), the system automatically generates a new optimization rule every 5 seconds. Here, you can witness the autonomous growth and evolution of the system in real-time.
        </p>

        <div className="space-y-4">
            {rules.map((rule, index) => (
                 <Card key={rule.id} className={`transition-all duration-500 ease-in-out ${index === 0 ? 'opacity-100 transform-none' : 'opacity-60'}`}>
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center justify-between">
                            <span>New Evolution Rule Generated</span>
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
                             <span className="text-sm text-muted-foreground">Associated Pillar:</span>
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
