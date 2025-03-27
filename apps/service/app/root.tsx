import { Outlet } from "react-router";

export { ErrorBoundary } from "@/app/error-boundary/error-boundary";
export { Layout, links } from "@/app/layout";

export default function App() {
  return <Outlet />;
}
