import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { KeyRound, User, Users, Building } from 'lucide-react';

export default function OmniKeySolutionsPage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <KeyRound className="w-8 h-8 text-primary" />
          <div>
            <CardTitle className="text-2xl">萬能元鑰方案中心 (Omni-Key Solution Center)</CardTitle>
            <CardDescription>
              探索、配置並獲取針對您特定需求的客製化解決方案。
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        <section className="text-center">
            <p className="max-w-3xl mx-auto text-muted-foreground">
                「萬能元鑰」是開啟 JunAiKey 系統潛能的鑰匙。每個元鑰都是一個根據特定場景、目標或挑戰所設計的綜合性解決方案包，它可能包含預設的 AI 代理、自動化流程 (OmniFlow)、知識庫模板和 UI 配置。
            </p>
        </section>
        
        <div className="grid md:grid-cols-3 gap-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <User className="w-6 h-6 text-primary" />
                        <CardTitle>個人增益方案</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                        專為提升個人生產力與創造力設計的元鑰，例如「個人知識管理大師」或「自動化內容創作助手」。
                    </p>
                    <Button variant="outline" className="w-full">探索個人方案</Button>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <Users className="w-6 h-6 text-primary" />
                        <CardTitle>團隊協作方案</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                        旨在優化團隊溝通、專案管理與集體智慧的元鑰，例如「高效敏捷開發團隊」或「市場研究協作空間」。
                    </p>
                    <Button variant="outline" className="w-full">探索團隊方案</Button>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                     <div className="flex items-center gap-3">
                        <Building className="w-6 h-6 text-primary" />
                        <CardTitle>企業級架構方案</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                        提供企業級的系統整合、安全合規與大規模自動化部署的元鑰，例如「全渠道客戶支援中心」。
                    </p>
                    <Button variant="outline" className="w-full">探索企業方案</Button>
                </CardContent>
            </Card>
        </div>
      </CardContent>
    </Card>
  );
}
