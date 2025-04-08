import { Route } from ".react-router/types/app/+types/root";
import { PageLayout } from "@/shared/layouts/page-layout";
import { ROUTE_PATH } from "@app/routes";
import { Button, Typography } from "@repo/ui";
import { isRouteErrorResponse, useNavigate } from "react-router";

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const navigate = useNavigate();
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <PageLayout>
      <Typography.H1>{message}</Typography.H1>
      <Typography.Small>{details}</Typography.Small>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
      <Button variant="outline" onClick={() => navigate(ROUTE_PATH.HOME)}>
        홈으로 돌아가기
      </Button>
    </PageLayout>
  );
}
