import { type RouteConfig, index, route } from "@react-router/dev/routes";

export const ROUTE_PATH = {
  HOME: "/",
  AUTH: {
    LOGIN: "/auth/login",
  },
  APPLY_APPROVAL: "/apply-approval",
  INQUERY: "/inquery",
  JOB_CATEGORY: "/job-category",
};

export default [
  index("routes/home.tsx"),
  route(ROUTE_PATH.AUTH.LOGIN, "routes/auth/login.tsx"),
  route(ROUTE_PATH.APPLY_APPROVAL, "routes/apply-approval.tsx"),
  route(ROUTE_PATH.INQUERY, "routes/inquery.tsx"),
  route(ROUTE_PATH.JOB_CATEGORY, "routes/job-category.tsx"),
] satisfies RouteConfig;
