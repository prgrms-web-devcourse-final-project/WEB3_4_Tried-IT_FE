import { withAuth } from "@/features/auth/components/with-auth";
import { JobCategoryPage } from "@/pages";

export default withAuth(JobCategoryPage);

export function meta() {
  return [
    { title: "디멘터 어드민 | 직무 카테고리 관리" },
    { name: "description", content: "디멘터 어드민 직무 카테고리 관리" },
  ];
}
