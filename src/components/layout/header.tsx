"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PanelLeft } from "lucide-react";

import { cn } from "@/lib/utils";
import { mainNav } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function AppHeader() {
  const pathname = usePathname();

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background px-4 md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0"
          >
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold mb-4"
            >
              <Home className="h-6 w-6 text-primary" />
              <span>JunAiKey</span>
            </Link>
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                  { "bg-muted text-foreground": pathname === item.href }
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.title}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="w-full flex justify-center">
         <Link href="/" className="flex items-center gap-2 font-semibold">
              <Home className="h-6 w-6 text-primary" />
              <span className="">JunAiKey</span>
        </Link>
      </div>
    </header>
  );
}
