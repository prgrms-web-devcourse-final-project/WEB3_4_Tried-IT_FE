import { ReactNode } from "react";
import { useSwitchContext } from "./switch";

export type CaseProps<T extends string> = {
  on: T;
  children: ReactNode;
};

export function Case<T extends string>({ on, children }: CaseProps<T>) {
  const { value: switchValue } = useSwitchContext<T>();

  if (on !== switchValue) {
    return null;
  }

  return <>{children}</>;
}
