import { withAuth } from "@/features/auth/components/with-auth";
import { InqueryChatPage } from "@/pages";

export default withAuth(InqueryChatPage);

export function meta() {
  return [
    { title: "디멘터 어드민 | 문의 채팅" },
    { name: "description", content: "디멘터 어드민 문의 채팅" },
  ];
}
