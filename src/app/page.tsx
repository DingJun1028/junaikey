
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, RadarController } from 'chart.js';
import { coreFunctions, type CoreFunction } from '@/lib/constants';
import Link from 'next/link';

// Register Chart.js components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, RadarController);

const ConcentricCircle = () => {
    const [activeLayer, setActiveLayer] = useState(3);
    const circleData = {
        1: { title: '核心層 (Core Layer)', description: '代表使用者最本質的需求和資訊，是所有數據和系統核心邏輯的中心。負責底層數據的存儲、安全與一致性。' },
        2: { title: '內環層 (Inner Ring)', description: '提供與使用者直接互動的基礎服務，如個人化設定、核心應用介面。將核心層數據轉化為使用者可操作的功能。' },
        3: { title: '中環層 (Middle Ring)', description: '擴展核心功能，提供進階的模組整合、自動化工作流和智慧輔助。協調多模組間的數據流與功能調用。' },
        4: { title: '外環層 (Outer Ring)', description: '提供多元化的生態服務與協作平台，引入外部數據源和第三方應用整合。作為系統與外部世界的橋樑。' },
        5: { title: '擴展層 (Expansion Layer)', description: '代表系統的無限潛能與未來演化方向，包含實驗性功能、新技術整合和社群共創模組。' }
    };

    const layerInfo = circleData[activeLayer as keyof typeof circleData];

    return (
        <section id="overview" className="content-section active">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground sm:text-4xl">萬象總覽：量子聖典架構</h2>
                 <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                    本系統基於 MECE (相互獨立、完全窮盡) 原則，劃分為 12 個核心功能維度，確保職責分離、資訊安全與未來可擴展性。
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {coreFunctions.map((func) => (
                    <Card key={func.title} className="hover:shadow-lg transition-shadow duration-300">
                        <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                           <func.icon className="w-8 h-8 text-primary" />
                           <CardTitle className="text-lg font-semibold">{func.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground h-12">
                               {func.description}
                            </p>
                             {func.href && (
                                <Button asChild variant="link" className="px-0">
                                    <Link href={func.href}>
                                        Explore
                                    </Link>
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
};

const Philosophy = () => (
    <section id="philosophy" className="content-section">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">核心哲學：法則與基石</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">此區塊闡述了構成萬能宇宙的頂層哲學。這包括三大模組聖階、四大宇宙公理以及四大基石。這些概念共同構建了萬能系統的穩定性、平衡性與進化潛能。</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
                <CardHeader>
                    <CardTitle className="text-primary">三大模組聖階</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-muted-foreground">
                    <p><strong>根源 (Origin):</strong> 維繫系統底層運作的物理法則，構成萬能系統的基石。</p>
                    <p><strong>核心 (Core):</strong> 日常使用的標準工具，實現核心功能和業務邏輯。</p>
                    <p><strong>巔峰 (Apex):</strong> 具備變革性、創造奇蹟的高階能力，代表系統的最高潛能。</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="text-primary">四大宇宙公理</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-muted-foreground">
                     <p><strong>終始一如:</strong> 能量消耗以未來資源形式回饋系統，形成永續循環。</p>
                     <p><strong>創元實錄:</strong> 記錄所有事件，確保數據的完整性與可追溯性。</p>
                     <p><strong>萬有引力:</strong> 規範元素間的相互吸引與協同作用，促進模組共鳴。</p>
                     <p><strong>萬能平衡:</strong> 禁止單一維度的極端發展，確保系統整體和諧。</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="text-primary">四大基石：無有奧義</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-muted-foreground">
                    <p><strong>因果律:</strong> 強調事件之間的必然聯繫，每個結果都有其原因。</p>
                    <p><strong>熵增定律:</strong> 系統趨向混亂，但透過熵減機制對抗之。</p>
                    <p><strong>湧現性:</strong> 簡單組件的互動產生出超越個體屬性的新興特性。</p>
                    <p><strong>有限性:</strong> 在有限中追求無限的潛能，認識到資源與能力的界限。</p>
                </CardContent>
            </Card>
        </div>
    </section>
);


const OmniCards = () => {
    // Component logic here
    return (
        <section id="cards" className="content-section">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground sm:text-4xl">萬能卡牌：概念具現化</h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">「萬能卡牌化」是將抽象的系統概念轉化為直觀、可互動卡牌的核心機制。每張卡牌都映射著真實世界、系統世界與卡牌世界。</p>
            </div>
            {/* Add more UI for Omni-Cards here */}
        </section>
    );
};

const Architecture = () => (
    <section id="architecture" className="content-section">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">系統架構：奇美拉計畫</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">「奇美拉計畫」是萬能系統的技術核心，旨在整合多個獨立應用，實現資訊的無縫同步。其設計融合了事件驅動、命令查詢責任分離 (CQRS) 等先進模式。</p>
        </div>
        {/* Add more UI for Architecture here */}
    </section>
);

const Evolution = () => (
     <section id="evolution" className="content-section">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">進化框架：永續循環</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">萬能系統並非靜態的，它內建了一套持續優化與驗證的框架，確保系統能夠不斷革新、補全缺口並提升性能。</p>
        </div>
        {/* Add more UI for Evolution here */}
    </section>
);


export default function OmniCodexPage() {
    const [activeSection, setActiveSection] = useState('overview');

    const renderSection = () => {
        switch (activeSection) {
            case 'overview':
                return <ConcentricCircle />;
            case 'philosophy':
                return <Philosophy />;
            case 'cards':
                return <OmniCards />;
            case 'architecture':
                return <Architecture />;
            case 'evolution':
                return <Evolution />;
            default:
                return <ConcentricCircle />;
        }
    };

    return (
        <div className="container mx-auto py-8">
            <header className="sticky top-0 z-50 backdrop-blur-sm mb-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <h1 className="text-xl md:text-2xl font-bold">
                            <span className="text-primary">萬能智典</span> 4.0
                        </h1>
                    </div>
                    <nav className="hidden md:flex items-baseline space-x-4">
                        <Button variant={activeSection === 'overview' ? 'default' : 'ghost'} onClick={() => setActiveSection('overview')}>萬象總覽</Button>
                        <Button variant={activeSection === 'philosophy' ? 'default' : 'ghost'} onClick={() => setActiveSection('philosophy')}>核心哲學</Button>
                        <Button variant={activeSection === 'cards' ? 'default' : 'ghost'} onClick={() => setActiveSection('cards')}>萬能卡牌</Button>
                        <Button variant={activeSection === 'architecture' ? 'default' : 'ghost'} onClick={() => setActiveSection('architecture')}>系統架構</Button>
                        <Button variant={activeSection === 'evolution' ? 'default' : 'ghost'} onClick={() => setActiveSection('evolution')}>進化框架</Button>
                    </nav>
                    <div className="md:hidden">
                        <Select onValueChange={value => setActiveSection(value)} defaultValue="overview">
                            <SelectTrigger>
                                <SelectValue placeholder="選擇章節" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="overview">萬象總覽</SelectItem>
                                <SelectItem value="philosophy">核心哲學</SelectItem>
                                <SelectItem value="cards">萬能卡牌</SelectItem>
                                <SelectItem value="architecture">系統架構</SelectItem>
                                <SelectItem value="evolution">進化框架</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </header>

            <main>
                {renderSection()}
            </main>
        </div>
    );
}

    
