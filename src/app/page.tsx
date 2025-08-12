import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { coreFunctions } from "@/lib/constants";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          JunAiKey - 萬能系統
        </h1>
        <p className="text-muted-foreground">The Quantum Codex Architecture</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {coreFunctions.map((func) => (
          <Card
            key={func.title}
            className="flex flex-col hover:shadow-lg transition-shadow duration-300"
          >
            <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <func.icon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-base font-semibold leading-tight">{func.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {func.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
