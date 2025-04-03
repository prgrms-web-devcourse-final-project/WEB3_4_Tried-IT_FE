import { Case, CaseProps } from "@/shared/components/switch/case";
import { createContext, JSX, ReactNode, useContext } from "react";

interface SwitchComponent<T extends string> {
  (props: SwitchProps<T>): JSX.Element;
  Case: (props: CaseProps<T>) => JSX.Element;
}

export type SwitchProps<T extends string> = {
  value: T;
  children: ReactNode;
};

export function Switch<T extends string>({ value, children }: SwitchProps<T>) {
  return (
    <SwitchContext.Provider value={{ value }}>
      {children}
    </SwitchContext.Provider>
  );
}

interface SwitchContextType<T extends string> {
  value: T;
}

const SwitchContext = createContext<SwitchContextType<string> | null>(null);

const createTypedSwitch = <T extends string>(): SwitchComponent<T> => {
  const SwitchWithCase = Switch as SwitchComponent<T>;
  SwitchWithCase.Case = Case as (props: CaseProps<T>) => JSX.Element;
  return SwitchWithCase;
};

export { createTypedSwitch };

export function useSwitchContext<T extends string>() {
  const context = useContext(SwitchContext);
  if (!context) {
    throw new Error("useSwitchContext must be used within a Switch component");
  }
  return context as SwitchContextType<T>;
}
