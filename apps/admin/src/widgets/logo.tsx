import { cn } from "@repo/utils/cn";

export interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn(className)}>
      <div className="text-2xl font-bold">
        DeMentor <span className="text-sm">Admin</span>
      </div>
    </div>
  );
}
