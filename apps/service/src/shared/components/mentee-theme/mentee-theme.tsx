import { Slot } from "@radix-ui/react-slot";
import { cn } from "@repo/utils/cn";
import { HTMLAttributes } from "react";

export function MenteeTheme({
  children,
  className,
  asChild,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      className={cn(
        `        
        [&>*]:[--primary:var(--secondary)] [&>*]:[--primary-foreground:var(--secondary-foreground)]
        [&>*]:[--accent:var(--secondary)] [&>*]:[--accent-foreground:var(--secondary-foreground)]
        [&>*]:[--ring:var(--secondary)]
        `,
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
