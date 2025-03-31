import { ROUTE_PATH } from "@app/routes";
import { Button } from "@repo/ui";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";

const flatRouteObject = (route: string | Record<string, unknown>): string[] => {
  if (typeof route === "string") {
    return [route];
  }
  return Object.values(route).flatMap((subRoute: unknown) =>
    flatRouteObject(subRoute as string | Record<string, unknown>)
  );
};

const flattedRoutes = Object.values(ROUTE_PATH).flatMap(flatRouteObject);

export function PageNavigationDevtools() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isHidden, setIsHidden] = useState(false);

  return (
    <div className="fixed bottom-0 left-0 w-full flex flex-col gap-2 shadow border p-2 rounded-t-lg bg-background z-50">
      <h1 className="text-sm font-bold">개발용 페이지 네비게이션</h1>
      <Button variant="outline" onClick={() => setIsHidden(!isHidden)}>
        {isHidden ? "Show" : "Hide"}
      </Button>
      <div className={`${isHidden ? "hidden" : ""} flex gap-2`}>
        {flattedRoutes.map((route) => (
          <Button
            variant="link"
            key={route}
            onClick={() => navigate(route)}
            className={`${location?.pathname === route ? "text-blue-500" : ""}`}
          >
            {route}
          </Button>
        ))}
      </div>
    </div>
  );
}
