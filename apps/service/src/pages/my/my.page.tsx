import { handleError } from "@/app/error-handler/error-handler";
import { AppliedClassesSection } from "@/pages/my/components/applied-classes-section";
import { MyInfoSection } from "@/pages/my/components/my-info-section";
import { usePutUserInfo } from "@/pages/my/hooks/use-put-user-info";
import { PageLayout } from "@/shared/layouts/page-layout";
import { toast } from "@repo/ui";
import { Suspense } from "react";

export function MyPage() {
  const { putUserInfo } = usePutUserInfo();

  const handleChangeUserInfo = async (userInfo: { name: string }) => {
    try {
      await putUserInfo(userInfo);
      toast.success("유저 정보 변경 완료");
    } catch (e) {
      handleError(e);
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto space-y-8 py-10 px-4">
        <Suspense fallback={<MyInfoSection.Skeleton />}>
          <MyInfoSection onChangeUserInfo={handleChangeUserInfo} />
        </Suspense>
        <Suspense fallback={<AppliedClassesSection.Skeleton />}>
          <AppliedClassesSection />
        </Suspense>
      </div>
    </PageLayout>
  );
}
