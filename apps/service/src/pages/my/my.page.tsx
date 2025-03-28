import { MyInfoSection } from "@/pages/my/components/my-info-section";
import { PageLayout } from "@/shared/layouts/page-layout";

const userInfo = {
  name: "홍길동",
  email: "example@email.com",
  phone: "010-1234-5678",
};

export function MyPage() {
  const handleChangeUserInfo = (userInfoPartial: Partial<typeof userInfo>) => {
    alert(`유저 정보 변경! ${JSON.stringify(userInfoPartial)}`);
  };

  return (
    <PageLayout>
      <div className="container mx-auto space-y-8 py-10 px-4">
        <MyInfoSection
          userInfo={userInfo}
          onChangeUserInfo={handleChangeUserInfo}
        />
      </div>
    </PageLayout>
  );
}
