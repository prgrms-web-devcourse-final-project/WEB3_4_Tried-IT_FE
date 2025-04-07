import { cn } from "@repo/utils/cn";
import { forwardRef, useMemo, useState } from "react";
import * as reactSpinners from "react-spinners";
import { Button } from "./button";

const { BarLoader } = reactSpinners;

interface Props extends React.ComponentProps<typeof Button> {
  loading?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
}

export const ButtonWithLoading = forwardRef<HTMLButtonElement, Props>(
  function Element(
    { children, className, onClick, disabled, loading = false, ...props },
    ref
  ) {
    const [internalLoading, setInternalLoading] = useState(loading);
    const isLoading = useMemo(
      () => internalLoading || loading,
      [internalLoading, loading]
    );

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
      try {
        setInternalLoading(true);
        await onClick?.(e);
      } finally {
        setInternalLoading(false);
      }
    };

    return (
      <Button
        ref={ref}
        className={cn("relative", className)}
        onClick={handleClick}
        disabled={isLoading || disabled}
        {...props}
      >
        <div className="w-full">{children}</div>
        {isLoading && (
          <div className="absolute w-full -bottom-0">
            <BarLoader
              width="100%"
              speedMultiplier={0.8}
              color="currentColor"
            />
          </div>
        )}
      </Button>
    );
  }
);
