import { cn } from "@repo/utils/cn";
import { forwardRef, useState } from "react";
import * as reactSpinners from "react-spinners";
import { Button } from "./button";

const { BarLoader } = reactSpinners;

interface Props extends React.ComponentProps<typeof Button> {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
}

export const ButtonWithLoading = forwardRef<HTMLButtonElement, Props>(
  function Element({ children, className, onClick, disabled, ...props }, ref) {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
      try {
        setIsLoading(true);
        await onClick?.(e);
      } finally {
        setIsLoading(false);
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
