import { cn } from "@repo/utils/cn";

export interface PageLayoutProps {
  className?: string;
  children: React.ReactNode;
}

export function PageLayout({ children, className }: PageLayoutProps) {
  return (
    <main className={cn("flex-1 bg-background p-8", className)}>
      {children}
    </main>
  );
}
