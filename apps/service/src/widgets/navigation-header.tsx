import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Separator } from "@/shared/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/ui/sheet";
import { ROUTE_PATH } from "@app/routes";
import { Menu } from "lucide-react";
import { ComponentProps } from "react";
import { Link, useLocation } from "react-router";

export function NavigationHeader() {
  return (
    <>
      <NavigationHeaderPadding />
      <div
        className={`fixed top-0 left-0 right-0 z-50 h-[60px] md:h-[72px] bg-white shadow-md`}
      >
        <div className="flex justify-between items-center h-full px-3 md:px-4">
          <Link to={ROUTE_PATH.HOME}>
            <div className="text-2xl font-bold">DeMentor</div>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            <div className="flex gap-1">
              <NavigationMenuDesktop to={ROUTE_PATH.HOME} label="Home" />
              <NavigationMenuDesktop
                to={ROUTE_PATH.APPLY_MENTOR}
                label="멘토 지원하기"
              />
              <NavigationMenuDesktop
                to={ROUTE_PATH.AVAILABLE_CLASSES}
                label="멘토링 신청"
              />
            </div>
            <Separator orientation="vertical" />
            <div className="flex gap-2">
              <NavigationMenuDesktop
                to={ROUTE_PATH.AUTH.SIGNUP}
                variant="default"
                label="회원가입"
              />
              <NavigationMenuDesktop
                to={ROUTE_PATH.AUTH.LOGIN}
                variant="secondary"
                label="로그인"
              />
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
                  <SheetTitle>DeMentor</SheetTitle>
                </SheetHeader>
                <SheetDescription></SheetDescription>
                <div className="flex flex-col">
                  <NavigationMenuMobile to={ROUTE_PATH.HOME} label="Home" />
                  <NavigationMenuMobile
                    to={ROUTE_PATH.APPLY_MENTOR}
                    label="멘토 지원하기"
                  />
                  <NavigationMenuMobile
                    to={ROUTE_PATH.AVAILABLE_CLASSES}
                    label="멘토링 신청"
                  />
                  <Separator className="my-2" />
                  <div className="flex flex-col gap-2 px-2">
                    <NavigationMenuMobile
                      to={ROUTE_PATH.AUTH.SIGNUP}
                      variant="default"
                      label="회원가입"
                    />
                    <NavigationMenuMobile
                      to={ROUTE_PATH.AUTH.LOGIN}
                      variant="secondary"
                      label="로그인"
                    />
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

interface NavigationMenuMobileProps {
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
}: NavigationMenuMobileProps) {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Button
      className={cn("text-sm", isActive && "underline", className)}
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
}: NavigationMenuMobileProps) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Button
      className={cn(
        "w-full justify-start py-4",
        isActive && "bg-secondary/50 text-primary",
        className
      )}
      variant={variant}
      asChild
    >
      <Link to={to}>{label}</Link>
    </Button>
  );
}
