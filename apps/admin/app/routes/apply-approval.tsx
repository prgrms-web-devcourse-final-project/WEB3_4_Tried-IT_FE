import { withAuth } from "@/features/auth/components/with-auth";
import { ApplyApprovalPage } from "@/pages";

export default withAuth(ApplyApprovalPage);

export function meta() {
  return [
    { title: "디멘터 어드민 | 멘토 신청 승인" },
    { name: "description", content: "디멘터 어드민 멘토 신청 승인 관리" },
  ];
}
