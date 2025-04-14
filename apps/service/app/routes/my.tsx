import { withAuth } from "@/features/auth/components/with-auth";
import { MyPage } from "@/pages";

export default withAuth(MyPage);

export function meta() {
  return [
    { title: "My Page - Dementor" },
    { name: "description", content: "My Page in Dementor" },
  ];
}
