import { Route } from ".react-router/types/app/+types/root";
import { Links, Meta, Scripts, ScrollRestoration } from "react-router";

import { ThemeProvider } from "@/app/theme-provider/theme-provider";

import { AppSidebar } from "@/widgets/app-sidebar";
import { SidebarProvider } from "@repo/ui";

import "@/app/styles/index.css";
import "@repo/design-system/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

const queryClient = new QueryClient();

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system">
        <html lang="en">
          <head>
            <meta charSet="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <Meta />
            <Links />
          </head>
          <body>
            {/* <NavigationHeader /> */}
            <SidebarProvider open={true}>
              <AppSidebar />
              <div className="flex-1 flex flex-col">{children}</div>
            </SidebarProvider>
            <ScrollRestoration />
            <Scripts />
          </body>
        </html>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
