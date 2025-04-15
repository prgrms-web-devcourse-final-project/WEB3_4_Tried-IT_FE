import { ScrollArea } from "@repo/ui";
import { cn } from "@repo/utils/cn";

export interface PageLayoutProps {
  className?: string;
  children: React.ReactNode;
}

export function PageLayout({ children, className }: PageLayoutProps) {
  return (
    <main className={cn("flex-1 bg-background p-4 pr-0", className)}>
      <ScrollArea className="h-full pr-4">{children}</ScrollArea>
    </main>
  );
}
