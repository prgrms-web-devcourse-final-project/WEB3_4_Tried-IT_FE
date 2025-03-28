import { type RouteConfig, index, route } from "@react-router/dev/routes";

export const ROUTE_PATH = {
  HOME: "/",
  AUTH: {
    LOGIN: "/auth/login",
    SIGNUP: "/auth/signup",
    SIGNUP_COMPLETE: "/auth/signup-complete",
  },
  MENTOR: {
    DASHBOARD: "/mentor/dashboard",
  },
  MENTOR_APPLICATION: "/mentor-application",
  AVAILABLE_CLASSES: "/available-classes",
  MY: "/my",
};

export default [
  index("routes/home.tsx"),

  route(ROUTE_PATH.AUTH.LOGIN, "routes/auth/login.tsx"),
  route(ROUTE_PATH.AUTH.SIGNUP, "routes/auth/signup.tsx"),
  route(ROUTE_PATH.AUTH.SIGNUP_COMPLETE, "routes/auth/signup-complete.tsx"),

  route(ROUTE_PATH.MENTOR.DASHBOARD, "routes/mentor/dashboard.tsx"),

  route(ROUTE_PATH.MENTOR_APPLICATION, "routes/mentor-application.tsx"),
  route(ROUTE_PATH.AVAILABLE_CLASSES, "routes/available-classes.tsx"),
  route(ROUTE_PATH.MY, "routes/my.tsx"),
] satisfies RouteConfig;
