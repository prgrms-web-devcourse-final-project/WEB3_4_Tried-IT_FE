import { AppliedClassesSection } from "@/pages/my/components/applied-classes-section";
import { MyInfoSection } from "@/pages/my/components/my-info-section";
import { PageLayout } from "@/shared/layouts/page-layout";
import { Suspense } from "react";

export function MyPage() {
  const handleChangeUserInfo = (userInfoPartial: {
    name?: string;
    email?: string;
    phone?: string;
  }) => {
    alert(`유저 정보 변경! ${JSON.stringify(userInfoPartial)}`);
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
