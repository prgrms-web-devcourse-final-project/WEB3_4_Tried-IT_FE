import { withAuth } from "@/features/auth/components/with-auth";
import { MentorDashboardPage } from "@/pages";

export default withAuth(MentorDashboardPage, {
  requireMentor: true,
});

export function meta() {
  return [
    { title: "디멘터 | 멘토 대시보드" },
    { name: "description", content: "디멘터 멘토 대시보드 페이지" },
  ];
}
