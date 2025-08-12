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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start gap-4">
            <Palette className="w-8 h-8 text-primary flex-shrink-0" />
            <div>
              <CardTitle className="text-2xl">萬能主題引擎 (Theme Engine)</CardTitle>
              <CardDescription className="mt-1">AI-generated UI, UX, and vocabulary system.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Describe your desired UI theme, including concepts, colors, and
            feelings. Our AI will generate a theme configuration for you, including a color palette, font selection, and even a new title and description for the system.
          </p>
        </CardContent>
      </Card>
      <ThemeEngineForm />
    </div>
  );
}
