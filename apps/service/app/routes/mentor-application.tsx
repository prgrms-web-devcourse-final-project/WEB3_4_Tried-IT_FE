import { withAuth } from "@/features/auth/components/with-auth";
import { MentorApplicationPage } from "@/pages";

export function meta() {
  return [
    { title: "디멘터 | 멘토 신청" },
    { name: "description", content: "디멘터 멘토 신청 페이지" },
  ];
}

export default withAuth(MentorApplicationPage);
