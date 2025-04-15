import { withAuth } from "@/features/auth/components/with-auth";
import { AvailableClassesPage } from "@/pages";

export default withAuth(AvailableClassesPage);

export function meta() {
  return [
    { title: "디멘터 | 수업 조회" },
    { name: "description", content: "디멘터 수업 조회 페이지" },
  ];
}
