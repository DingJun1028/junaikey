import { ThemeEngineForm } from "./theme-engine-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Palette } from "lucide-react";

export default function ThemeEnginePage() {
  return (
    <div className="container mx-auto py-2">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Palette className="w-8 h-8 text-primary" />
            <div>
              <CardTitle className="text-2xl">萬能主題引擎 (Theme Engine)</CardTitle>
              <CardDescription>AI 生成的 UI、UX 與詞彙體系。</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-muted-foreground">
            Describe your desired UI theme, including concepts, colors, and
            feelings. Our AI will generate a theme configuration for you.
          </p>
          <ThemeEngineForm />
        </CardContent>
      </Card>
    </div>
  );
}
