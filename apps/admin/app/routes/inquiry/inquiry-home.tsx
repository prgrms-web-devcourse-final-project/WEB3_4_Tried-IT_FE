import { withAuth } from "@/features/auth/components/with-auth";
import { InqueryPage } from "@/pages";

export default withAuth(InqueryPage);

export function meta() {
  return [
    { title: "디멘터 어드민 | 문의사항 관리" },
    { name: "description", content: "디멘터 어드민 문의사항 관리 페이지" },
  ];
}
