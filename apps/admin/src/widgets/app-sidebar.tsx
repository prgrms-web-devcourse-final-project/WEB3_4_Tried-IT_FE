import { AuthButton } from "@/widgets/auth/auth-button";
import { ROUTE_PATH } from "@app/routes";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@repo/ui";
import { CheckSquare, Contact2, Inbox } from "lucide-react";
import { Suspense } from "react";
import { Link } from "react-router";

const items = [
  {
    title: "승인 요청 목록",
    url: ROUTE_PATH.APPLY_APPROVAL,
    icon: CheckSquare,
  },
  {
    title: "문의 채팅 목록",
    url: ROUTE_PATH.INQUERY,
    icon: Inbox,
  },
  {
    title: "직무 카테고리 설정",
    url: ROUTE_PATH.JOB_CATEGORY,
    icon: Contact2,
  },
];

export function AppSidebar() {
  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader>
        <div className="p-2">
          <Link to={ROUTE_PATH.HOME}>
            <div className="text-2xl font-bold">
              DeMentor <span className="text-sm">Admin</span>
            </div>
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    className="hover:bg-primary hover:text-primary-foreground"
                    asChild
                  >
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <Suspense fallback={<div />}>
                <AuthButton />
              </Suspense>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
