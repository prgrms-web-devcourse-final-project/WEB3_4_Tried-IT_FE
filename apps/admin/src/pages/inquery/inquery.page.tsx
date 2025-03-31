import { InquiryList } from "@/pages/inquery/components/inquiry-list";
import { PageLayout } from "@/shared/layouts/page-layout";
import { Typography } from "@repo/ui";

export function InqueryPage() {
  return (
    <PageLayout>
      <div className="flex items-center mb-6">
        <Typography.H3>문의 채팅 목록</Typography.H3>
      </div>
      <InquiryList />
    </PageLayout>
  );
}
