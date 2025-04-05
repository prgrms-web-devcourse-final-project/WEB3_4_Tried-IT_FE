import { ThemeProvider } from "@/app/theme-provider/theme-provider";
import { Toaster } from "@repo/ui";
import { render } from "@testing-library/react";
import { OverlayProvider } from "overlay-kit";

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <OverlayProvider>
        {children}
        <Toaster />
      </OverlayProvider>
    </ThemeProvider>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const customRender = ((ui: any, options: any) =>
  render(ui, { wrapper: AllTheProviders, ...options })) as typeof render;

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
