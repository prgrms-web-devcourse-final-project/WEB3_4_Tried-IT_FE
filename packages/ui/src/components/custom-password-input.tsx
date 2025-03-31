import { Eye, EyeOff } from "lucide-react";
import { ComponentProps, useState } from "react";
import { Button } from "./button";
import { Input } from "./input";

export type CustomPasswordInputProps = ComponentProps<"input">;

export function CustomPasswordInput({ ...props }: CustomPasswordInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div className="relative">
      <Input type={isPasswordVisible ? "text" : "password"} {...props} />
      <Button
        className="absolute right-0 top-0"
        variant="ghost"
        type="button"
        onClick={() => {
          setIsPasswordVisible(!isPasswordVisible);
        }}
      >
        {isPasswordVisible ? <EyeOff /> : <Eye />}
      </Button>
    </div>
  );
}
