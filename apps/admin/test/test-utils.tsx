import { render } from "@testing-library/react";

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const customRender = ((ui: any, options: any) =>
  render(ui, { wrapper: AllTheProviders, ...options })) as typeof render;

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
