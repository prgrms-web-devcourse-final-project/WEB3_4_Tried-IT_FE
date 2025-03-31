import { Typography } from "@repo/ui";
import { cn } from "@repo/utils/cn";

export interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn(className)}>
      <Typography.H3 className="text-muted-foreground">
        개발자 멘토링 플랫폼
      </Typography.H3>
      <Typography.H1>디멘터</Typography.H1>
    </div>
  );
}
