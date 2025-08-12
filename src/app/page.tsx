
'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  BrainCircuit,
  Cpu,
  DraftingCompass,
  Network,
  Webhook,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const circles = [
  {
    level: 1,
    name: '核心引擎',
    description:
      '系統的中央神經系統，負責解讀使用者意圖、協調代理並管理整個工作流程。',
    href: '/core-engine',
    icon: Cpu,
  },
  {
    level: 2,
    name: '知識中樞',
    description: '系統的長期記憶與知識庫，沉澱所有核心概念、架構與原則。',
    href: '/knowledge-hub',
    icon: BrainCircuit,
  },
  {
    level: 3,
    name: '代理網絡',
    description: '任務的自主執行與委派網絡，處理並執行定義好的任務。',
    href: '/agent-network',
    icon: Network,
  },
  {
    level: 4,
    name: '符文系統',
    description: '與所有外部服務的 API 整合層，讓系統能與外部世界溝通。',
    href: '/rune-system',
    icon: Webhook,
  },
  {
    level: 5,
    name: '元架構',
    description: '系統的意識核心，將主權、自我洞察與自我進化融為一體。',
    href: '/meta-architecture',
    icon: DraftingCompass,
  },
];

export default function HomePage() {
  const [activeCircle, setActiveCircle] = useState(circles[0]);

  return (
    <div className="container mx-auto flex h-full flex-col items-center justify-center p-4">
      <div className="grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
        <div className="flex flex-col items-center justify-center">
          <div className="concentric-circle-container">
            {circles.map(c => (
              <Link href={c.href} key={c.level} passHref>
                <div
                  className={cn(
                    'circle',
                    `circle-${c.level}`,
                    activeCircle.level === c.level && 'active'
                  )}
                  onMouseEnter={() => setActiveCircle(c)}
                >
                  <div className="text-center group-hover/circle:opacity-0">
                    <c.icon
                      className={cn(
                        'mx-auto h-8 w-8 transition-all',
                        c.level === 1 ? 'text-primary-foreground' : 'text-primary',
                        activeCircle.level === c.level && c.level !== 1 && 'scale-125'
                      )}
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center">
          <Card className="w-full">
            <CardHeader>
              <div className="flex items-center gap-3">
                 <activeCircle.icon className="h-8 w-8 text-primary" />
                 <CardTitle className="text-2xl">{activeCircle.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="min-h-[60px] text-base">
                {activeCircle.description}
              </CardDescription>
              <Link href={activeCircle.href}>
                <Button className="mt-4 w-full">
                  進入 {activeCircle.name}
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
