import { Route } from ".react-router/types/app/+types/root";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { OverlayProvider } from "overlay-kit";
import { Links, Meta, Scripts, ScrollRestoration } from "react-router";

import { ThemeProvider } from "@/app/theme-provider/theme-provider";
import { ChatAddon } from "@/widgets/chat-addon";
import Footer from "@/widgets/footer";
import { NavigationHeader } from "@/widgets/navigation-header";

import "@/app/styles/index.css";
import { Toaster } from "@repo/ui";

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
      <ThemeProvider defaultTheme="light">
        <OverlayProvider>
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

            <body className="min-h-dvh flex flex-col">
              <NavigationHeader />
              <div className="flex-1 flex flex-col">{children}</div>
              <Footer />
              <ChatAddon />
              <Toaster richColors />
              <ScrollRestoration />
              <Scripts />
            </body>
          </html>
        </OverlayProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
