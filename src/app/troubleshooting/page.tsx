"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LifeBuoy, Send } from 'lucide-react';

export default function TroubleshootingPage() {
  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-4">
          <LifeBuoy className="w-8 h-8 text-primary" />
          <div>
            <CardTitle className="text-2xl">疑難雜症需求中心 (Troubleshooting & Request Center)</CardTitle>
            <CardDescription>
              遇到問題或有新功能想法？在此提交您的需求，讓系統與您一同進化。
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="title">需求標題</Label>
                <Input id="title" placeholder="例如：希望能整合 Google Calendar" />
            </div>
             <div className="space-y-2">
                <Label htmlFor="type">需求類型</Label>
                 <Select>
                    <SelectTrigger id="type">
                        <SelectValue placeholder="選擇一個類型..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="bug">問題回報 (Bug Report)</SelectItem>
                        <SelectItem value="feature">新功能建議 (Feature Request)</SelectItem>
                        <SelectItem value="integration">整合需求 (Integration Request)</SelectItem>
                         <SelectItem value="other">其他問題</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="description">詳細說明</Label>
                <Textarea id="description" rows={6} placeholder="請盡可能詳細地描述您遇到的問題、您的期望，或您想要的新功能如何運作。" />
            </div>
            <div className="flex justify-end">
                <Button>
                    <Send className="mr-2" />
                    提交需求
                </Button>
            </div>
        </form>
      </CardContent>
    </Card>
  );
}
