import { useTheme } from "@/app/theme-provider/theme-provider";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { ROUTE_PATH } from "@app/routes";
import {
  Button,
  Separator,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@repo/ui";
import { cn } from "@repo/utils/cn";
import { Menu, MoonIcon, SunIcon } from "lucide-react";
import { ComponentProps } from "react";
import { Link, useLocation } from "react-router";

export function NavigationHeader() {
  const { theme, setTheme } = useTheme();
  const { logout, isAuthenticated, isMentor } = useAuth();

  return (
    <>
      <NavigationHeaderPadding />
      <div
        className={`fixed top-0 left-0 right-0 z-50 h-[60px] md:h-[72px] bg-background shadow-md`}
      >
        <div className="flex justify-between items-center h-full px-3 md:px-4 text-foreground">
          <div className="flex items-center gap-2">
            <Link to={ROUTE_PATH.HOME}>
              <div className="text-2xl font-bold">DeMentor</div>
            </Link>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="ml-2 rounded-full transition-colors hover:bg-black/80 dark:hover:bg-white/80"
              aria-label={
                theme === "light" ? "다크 모드로 전환" : "라이트 모드로 전환"
              }
            >
              {theme === "light" ? (
                <SunIcon className="size-4" />
              ) : (
                <MoonIcon className="size-4" />
              )}
            </Button>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <div className="flex gap-1">
              {!isMentor && (
                <NavigationMenuDesktop
                  to={ROUTE_PATH.MENTOR_APPLICATION}
                  className="text-primary"
                  label="멘토 지원하기"
                />
              )}
              <NavigationMenuDesktop
                to={ROUTE_PATH.AVAILABLE_CLASSES}
                className="text-secondary"
                label="멘토링 신청"
              />
            </div>
            <Separator orientation="vertical" />
            <div className="flex gap-2">
              {isAuthenticated ? (
                <>
                  <NavigationMenuDesktop to={ROUTE_PATH.MY} label="내 정보" />
                  {isMentor && (
                    <NavigationMenuDesktop
                      to={ROUTE_PATH.MENTOR.DASHBOARD}
                      className="text-primary"
                      label="멘토 대시보드"
                    />
                  )}
                  <Button size="lg" variant="outline" onClick={logout}>
                    로그아웃
                  </Button>
                </>
              ) : (
                <>
                  <NavigationMenuDesktop
                    to={ROUTE_PATH.AUTH.SIGNUP}
                    variant="gradient"
                    label="회원가입"
                  />
                  <NavigationMenuDesktop
                    to={ROUTE_PATH.AUTH.LOGIN}
                    variant="outline"
                    label="로그인"
                  />
                </>
              )}
            </div>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <Sheet modal>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="메뉴 열기">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                <SheetHeader>
                  <SheetTitle>
                    <SheetClose asChild>
                      <Link to={ROUTE_PATH.HOME}>DeMentor</Link>
                    </SheetClose>
                  </SheetTitle>
                </SheetHeader>
                <SheetDescription></SheetDescription>
                <div className="flex flex-col">
                  {!isMentor && (
                    <NavigationMenuMobile
                      to={ROUTE_PATH.MENTOR_APPLICATION}
                      className="text-primary"
                      label="멘토 지원하기"
                    />
                  )}
                  <NavigationMenuMobile
                    to={ROUTE_PATH.AVAILABLE_CLASSES}
                    className="text-secondary hover:bg-secondary/80"
                    label="멘토링 신청"
                  />
                  <Separator className="my-2" />
                  <div className="flex flex-col gap-2 px-2">
                    {isAuthenticated ? (
                      <>
                        <NavigationMenuMobile
                          to={ROUTE_PATH.MY}
                          className="rounded-md"
                          variant="ghost"
                          label="내 정보"
                        />
                        {isMentor && (
                          <NavigationMenuMobile
                            to={ROUTE_PATH.MENTOR.DASHBOARD}
                            className="text-primary"
                            label="멘토 대시보드"
                          />
                        )}
                        <Button onClick={logout} variant="ghost">
                          로그아웃
                        </Button>
                      </>
                    ) : (
                      <>
                        <NavigationMenuMobile
                          to={ROUTE_PATH.AUTH.SIGNUP}
                          className="bg-gradient-to-br from-primary to-secondary transition-colors duration-500 hover:from-secondary hover:to-primary text-primary-foreground rounded-md"
                          variant="secondary"
                          label="회원가입"
                        />
                        <NavigationMenuMobile
                          to={ROUTE_PATH.AUTH.LOGIN}
                          className="rounded-md"
                          variant="outline"
                          label="로그인"
                        />
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </>
  );
}

export function NavigationHeaderPadding() {
  return <div className={`h-[60px] md:h-[72px]`} />;
}

interface NavigationMenuProps {
  to: string;
  label: string;
  className?: string;
  variant?: ComponentProps<typeof Button>["variant"];
}

function NavigationMenuDesktop({
  to,
  label,
  className,
  variant = "link",
}: NavigationMenuProps) {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Button
      size="lg"
      className={cn(
        isActive && "underline",
        variant === "link" && "text-foreground",
        className
      )}
      variant={variant}
      asChild
    >
      <Link to={to}>{label}</Link>
    </Button>
  );
}

function NavigationMenuMobile({
  to,
  label,
  className,
  variant = "ghost",
  closeOnClick = true,
}: NavigationMenuProps & { closeOnClick?: boolean }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Button
      className={cn(
        "w-full justify-start py-4 rounded-none",
        isActive && "bg-border/20",
        className
      )}
      variant={variant}
      asChild
    >
      {closeOnClick ? (
        <SheetClose asChild>
          <Link to={to}>{label}</Link>
        </SheetClose>
      ) : (
        <Link to={to}>{label}</Link>
      )}
    </Button>
  );
}
