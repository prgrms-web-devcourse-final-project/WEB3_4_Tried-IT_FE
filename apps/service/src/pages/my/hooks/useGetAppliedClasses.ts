import { AppliedClassModel } from "@/entities/model/applied-class/applied-class.model";
import { ModelCreator } from "@/entities/model/model-creator";
import { useSuspenseQuery } from "@tanstack/react-query";

const MOCK_APPLIED_CLASSES = [
  {
    id: 1,
    mentor: {
      name: "슈퍼 천재 개발자",
    },
    inquiry: "안녕하세요 멘토님! 멘토님으로부터 Java 강의를 받고 싶습니다.",
    status: "진행중" as const,
    schedule: "2024-03-24T14:30:00.000Z",
  },
  {
    id: 2,
    mentor: {
      name: "김멘토",
    },
    inquiry: "React와 TypeScript 관련 멘토링을 받고 싶습니다.",
    status: "예약됨" as const,
    schedule: "2024-04-01T11:00:00.000Z",
  },
  {
    id: 3,
    mentor: {
      name: "박시니어",
    },
    inquiry: "Spring Boot를 활용한 백엔드 개발 멘토링 신청합니다.",
    status: "대기중" as const,
    schedule: "2024-04-15T15:30:00.000Z",
  },
  {
    id: 4,
    mentor: {
      name: "이멘토",
    },
    inquiry: "알고리즘 문제 풀이 스터디 멘토링 문의드립니다.",
    status: "거절됨" as const,
    schedule: "2024-03-30T13:00:00.000Z",
  },
];

export function useGetAppliedClasses() {
  const query = useSuspenseQuery({
    queryKey: ["applied-classes"],
    queryFn: () =>
      new Promise<typeof MOCK_APPLIED_CLASSES>((resolve) =>
        resolve(MOCK_APPLIED_CLASSES)
      ),
    select: (data) =>
      data.map((item) => ModelCreator.create(AppliedClassModel, item)),
  });

  return query;
}
