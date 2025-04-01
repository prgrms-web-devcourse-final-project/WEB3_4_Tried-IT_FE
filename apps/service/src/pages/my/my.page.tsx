import { AppliedClassesSection } from "@/pages/my/components/applied-classes-section";
import { MyInfoSection } from "@/pages/my/components/my-info-section";
import { PageLayout } from "@/shared/layouts/page-layout";
import { Suspense } from "react";

const appliedClasses = [
  {
    id: 1,
    mentor: {
      name: "슈퍼 천재 개발자",
    },
    inquiry: "안녕하세요 멘토님! 멘토님으로부터 Java 강의를 받고 싶습니다.",
    status: "진행중",
    schedule: "3월 24일 오후 2시 30분",
  },
  {
    id: 2,
    mentor: {
      name: "김멘토",
    },
    inquiry: "React와 TypeScript 관련 멘토링을 받고 싶습니다.",
    status: "예약됨",
    schedule: "4월 1일 오전 11시",
  },
  {
    id: 3,
    mentor: {
      name: "박시니어",
    },
    inquiry: "Spring Boot를 활용한 백엔드 개발 멘토링 신청합니다.",
    status: "대기중",
    schedule: "4월 15일 오후 3시 30분",
  },
  {
    id: 4,
    mentor: {
      name: "이멘토",
    },
    inquiry: "알고리즘 문제 풀이 스터디 멘토링 문의드립니다.",
    status: "거절됨",
    schedule: "3월 30일 오후 1시",
  },
];

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
        <AppliedClassesSection appliedClasses={appliedClasses} />
      </div>
    </PageLayout>
  );
}
