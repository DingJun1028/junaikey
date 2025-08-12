
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ConcentricCircle = () => {
    const [activeLayer, setActiveLayer] = useState(3);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const circleData = {
        1: { title: '核心層 (Core Layer)', description: '代表使用者最本質的需求和資訊，是所有數據和系統核心邏輯的中心。負責底層數據的存儲、安全與一致性。' },
        2: { title: '內環層 (Inner Ring)', description: '提供與使用者直接互動的基礎服務，如個人化設定、核心應用介面。將核心層數據轉化為使用者可操作的功能。' },
        3: { title: '中環層 (Middle Ring)', description: '擴展核心功能，提供進階的模組整合、自動化工作流和智慧輔助。協調多模組間的數據流與功能調用。' },
        4: { title: '外環層 (Outer Ring)', description: '提供多元化的生態服務與協作平台，引入外部數據源和第三方應用整合。作為系統與外部世界的橋樑。' },
        5: { title: '擴展層 (Expansion Layer)', description: '代表系統的無限潛能與未來演化方向，包含實驗性功能、新技術整合和社群共創模組。' }
    };

    const handleCircleClick = (layer: number) => {
        setActiveLayer(layer);
    };
    
    if (!isClient) {
        return null; // or a loading skeleton
    }

    const layerInfo = circleData[activeLayer as keyof typeof circleData];

    return (
        <section id="overview" className="content-section active w-full">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground sm:text-4xl">萬象總覽：同心圓聖域系統</h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">本節介紹萬能系統的核心架構——以使用者為中心的「同心圓聖域系統」。此系統將功能與數據劃分為五個相互關聯的層次，從最內部的核心到最外部的擴展，體現了系統的同心演化本質。點擊下方的同心圓，探索每一層的角色與功能。</p>
            </div>
             <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
                <div className="w-full lg:w-1/2 flex justify-center">
                    <div className="concentric-circle-container">
                        {[5, 4, 3, 2, 1].map(layer => (
                            <div
                                key={layer}
                                id={`circle-${layer}`}
                                data-layer={layer}
                                className={`circle circle-${layer} ${activeLayer === layer ? 'active' : ''}`}
                                onClick={() => handleCircleClick(layer)}
                            >
                                {layer === 1 && <span className="text-xs font-bold text-primary-foreground">核心</span>}
                            </div>
                        ))}
                    </div>
                </div>
                <div id="circle-details" className="w-full lg:w-1/2 bg-card p-6 rounded-lg shadow-lg">
                    <h3 id="layer-title" className="text-2xl font-bold text-primary mb-2">{layerInfo.title}</h3>
                    <p id="layer-description" className="text-card-foreground">{layerInfo.description}</p>
                </div>
            </div>
        </section>
    );
};

const Philosophy = () => (
    <section id="philosophy" className="content-section w-full">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">核心哲學：法則與基石</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">此區塊闡述了構成萬能宇宙的頂層哲學。這包括三大模組聖階（定義了模組的能力層級）、四大宇宙公理（系統運行的被動天賦）以及四大基石（構成世界觀的底層邏輯）。這些概念共同構建了萬能系統的穩定性、平衡性與進化潛能。</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             <Card className="p-6">
                <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-xl font-bold text-primary">三大模組聖階</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <ul className="space-y-3 text-card-foreground">
                        <li><strong>根源 (Origin):</strong> 維繫系統底層運作的物理法則，構成萬能系統的基石。</li>
                        <li><strong>核心 (Core):</strong> 日常使用的標準工具，實現核心功能和業務邏輯。</li>
                        <li><strong>巔峰 (Apex):</strong> 具備變革性、創造奇蹟的高階能力，代表系統的最高潛能。</li>
                    </ul>
                </CardContent>
            </Card>
            <Card className="p-6">
                <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-xl font-bold text-primary">四大宇宙公理</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                     <ul className="space-y-3 text-card-foreground">
                        <li><strong>終始一如:</strong> 能量消耗以未來資源形式回饋系統，形成永續循環。</li>
                        <li><strong>創元實錄:</strong> 記錄所有事件，確保數據的完整性與可追溯性。</li>
                        <li><strong>萬有引力:</strong> 規範元素間的相互吸引與協同作用，促進模組共鳴。</li>
                        <li><strong>萬能平衡:</strong> 禁止單一維度的極端發展，確保系統整體和諧。</li>
                    </ul>
                </CardContent>
            </Card>
            <Card className="p-6">
                <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-xl font-bold text-primary">四大基石：無有奧義</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <ul className="space-y-3 text-card-foreground">
                        <li><strong>因果律:</strong> 強調事件之間的必然聯繫，每個結果都有其原因。</li>
                        <li><strong>熵增定律:</strong> 系統趨向混亂，但透過熵減機制對抗之。</li>
                        <li><strong>湧現性:</strong> 簡單組件的互動產生出超越個體屬性的新興特性。</li>
                        <li><strong>有限性:</strong> 在有限中追求無限的潛能，認識到資源與能力的界限。</li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    </section>
);


const OmniCards = () => (
    <section id="cards" className="content-section w-full">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">萬能卡牌：概念具現化</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">「萬能卡牌化」是將抽象的系統概念轉化為直觀、可互動卡牌的核心機制。每張卡牌都映射著真實世界、系統世界與卡牌世界。</p>
        </div>
    </section>
);

const Architecture = () => (
    <section id="architecture" className="content-section w-full">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">系統架構：奇美拉計畫</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">「奇美拉計畫」是萬能系統的技術核心，旨在整合多個獨立應用，實現資訊的無縫同步。其設計融合了事件驅動、命令查詢責任分離 (CQRS) 等先進模式。</p>
        </div>
    </section>
);

const Evolution = () => (
     <section id="evolution" className="content-section w-full">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">進化框架：永續循環</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">萬能系統並非靜態的，它內建了一套持續優化與驗證的框架，確保系統能夠不斷革新、補全缺口並提升性能。</p>
        </div>
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

    const navItems = [
        { id: 'overview', label: '萬象總覽' },
        { id: 'philosophy', label: '核心哲學' },
        { id: 'cards', label: '萬能卡牌' },
        { id: 'architecture', label: '系統架構' },
        { id: 'evolution', label: '進化框架' },
    ];

    return (
        <div className="w-full">
            <header className="bg-card/80 backdrop-blur-sm sticky top-0 z-40 shadow-sm border-b mb-4">
                <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex-shrink-0">
                            <h1 className="text-xl md:text-2xl font-bold text-foreground">
                                <span className="text-primary">萬能智典</span> 4.0
                            </h1>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                {navItems.map(item => (
                                    <Button
                                        key={item.id}
                                        variant="ghost"
                                        onClick={() => setActiveSection(item.id)}
                                        className={`nav-link px-3 py-2 rounded-md text-sm font-medium ${activeSection === item.id ? 'text-primary border-primary' : 'border-transparent text-muted-foreground'}`}
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </div>
                        </div>
                        <div className="md:hidden">
                            <Select onValueChange={value => setActiveSection(value)} defaultValue="overview">
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="選擇章節" />
                                </SelectTrigger>
                                <SelectContent>
                                    {navItems.map(item => (
                                         <SelectItem key={item.id} value={item.id}>{item.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </nav>
            </header>

            <main className="container mx-auto p-4 sm:p-6 lg:p-8">
                {renderSection()}
            </main>
        </div>
    );
}
