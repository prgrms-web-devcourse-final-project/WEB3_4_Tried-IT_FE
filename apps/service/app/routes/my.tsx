import { withAuth } from "@/features/auth/components/with-auth";
import { MyPage } from "@/pages";

export default withAuth(MyPage);

export function meta() {
  return [
    { title: "디멘터 | 마이 페이지" },
    { name: "description", content: "디멘터 마이 페이지" },
  ];
}
