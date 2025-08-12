
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
  Infinity as InfinityIcon,
  Shield,
  Tags,
  Palette,
  LayoutDashboard,
  KeyRound,
  FileText,
  BookOpen,
  LifeBuoy
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const capabilities = [
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
    name: '代理網絡',
    description: '任務的自主執行與委派網絡，處理並執行定義好的任務。',
    href: '/agent-network',
    icon: Network,
  },
  {
    level: 3,
    name: '符文系統',
    description: '與所有外部服務的 API 整合層，讓系統能與外部世界溝通。',
    href: '/rune-system',
    icon: Webhook,
  },
  {
    level: 4,
    name: '知識中樞',
    description: '系統的長期記憶與知識庫，沉澱所有核心概念、架構與原則。',
    href: '/knowledge-hub',
    icon: BrainCircuit,
  },
  {
    level: 5,
    name: '進化迴廊',
    description: '系統的自我優化與學習機制，探索其終極潛力。',
    href: '/evolution-loop',
    icon: InfinityIcon,
  },
    {
    level: 6,
    name: '安全域',
    description: '存取控制、加密與威脅防護，保護系統的完整性。',
    href: '/security-domain',
    icon: Shield,
  },
];


export default function HomePage() {
  const [activeCircle, setActiveCircle] = useState(capabilities[0]);

  return (
    <div className="container mx-auto flex h-full w-full flex-col items-center justify-center p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
           
            <div className="md:col-span-1 flex items-center justify-center">
                 <Card className="w-64 text-center bg-card/90 backdrop-blur-md p-4 border-dashed">
                    <CardHeader className="p-2">
                        <div className="flex items-center justify-center gap-3">
                            <activeCircle.icon className="h-7 w-7 text-primary" />
                            <CardTitle className="text-2xl">{activeCircle.name}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="p-2">
                        <CardDescription className="min-h-[60px] text-sm">
                            {activeCircle.description}
                        </CardDescription>
                        <Link href={activeCircle.href} passHref>
                        <Button className="mt-4 w-full" variant="outline">進入 {activeCircle.name}</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>

            <div className="md:col-span-2 grid grid-cols-2 lg:grid-cols-3 gap-6">
                 {capabilities.map((cap) => (
                    <Link href={cap.href} passHref key={cap.level}>
                        <Card 
                            className={cn(
                                "flex flex-col items-center justify-center p-4 text-center cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 hover:border-primary h-full",
                                "bg-card/80 backdrop-blur-sm"
                            )}
                            onMouseEnter={() => setActiveCircle(cap)}
                        >
                            <CardHeader className="p-2">
                                <cap.icon className="w-8 h-8 mx-auto text-primary" />
                            </CardHeader>
                            <CardContent className="p-2">
                                <CardTitle className="text-base font-semibold">{cap.name}</CardTitle>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    </div>
  );
}
