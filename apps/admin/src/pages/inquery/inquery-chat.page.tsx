import { PageLayout } from "@/shared/layouts/page-layout";
import { InquiryChat } from "./components/inquiry-chat";

export function InqueryChatPage() {
  return (
    <PageLayout>
      <div className="h-full flex flex-col">
        <InquiryChat />
      </div>
    </PageLayout>
  );
}
