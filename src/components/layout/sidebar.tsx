"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Rocket } from "lucide-react";

import { cn } from "@/lib/utils";
import { mainNav } from "@/lib/constants";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden border-r bg-background md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Rocket className="h-6 w-6 text-primary" />
            <span className="">JunAiKey</span>
          </Link>
        </div>
        <div className="flex-1">
          <TooltipProvider>
            <nav className="grid items-start gap-1 px-2 py-4 text-sm font-medium lg:px-4">
              {mainNav.map((item) => (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                        { "bg-muted text-primary": pathname === item.href }
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.title}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{item.label || item.title}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </nav>
          </TooltipProvider>
        </div>
        <div className="mt-auto p-4">
          <div className="flex justify-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </aside>
  );
}
