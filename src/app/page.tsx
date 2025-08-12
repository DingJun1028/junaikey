
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
    <div className="container mx-auto flex h-full w-full flex-col items-center justify-center p-4 overflow-hidden">
        <div className="relative flex items-center justify-center w-[600px] h-[600px]">
            {/* Concentric Circles as the sun */}
            <div 
                className="absolute w-64 h-64 bg-primary/10 rounded-full animate-pulse"
                onMouseEnter={() => setActiveCircle(capabilities[0])}
            >
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 bg-primary/20 rounded-full">
                         <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-32 h-32 bg-primary/30 rounded-full flex items-center justify-center">
                               <Link href={capabilities[0].href} className="text-primary-foreground">
                                    <Cpu className="w-16 h-16 text-white hover:scale-110 transition-transform" />
                               </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Orbiting capability cards */}
            {capabilities.slice(1).map((cap, index) => {
                const angle = (index / (capabilities.length - 1)) * 2 * Math.PI;
                const radius = 250;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                
                return (
                     <div
                        key={cap.level}
                        className="absolute"
                        style={{
                            transform: `translate(${x}px, ${y}px)`,
                        }}
                    >
                         <div className="planet-orbit">
                            <Link href={cap.href} passHref>
                                <Card 
                                    className={cn(
                                        "w-48 h-48 flex flex-col items-center justify-center p-4 text-center cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-110 hover:border-primary",
                                        "bg-card/80 backdrop-blur-sm"
                                    )}
                                    onMouseEnter={() => setActiveCircle(cap)}
                                >
                                    <CardHeader className="p-2">
                                        <cap.icon className="w-10 h-10 mx-auto text-primary" />
                                    </CardHeader>
                                    <CardContent className="p-2">
                                        <CardTitle className="text-lg">{cap.name}</CardTitle>
                                    </CardContent>
                                </Card>
                            </Link>
                         </div>
                    </div>
                );
            })}

             <Card className="absolute w-64 text-center bg-background/90 backdrop-blur-md p-4 border-dashed">
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
    </div>
  );
}
