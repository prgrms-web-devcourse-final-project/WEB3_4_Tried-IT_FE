import { MentorModel } from "@/entities/model/mentor/mentor.model";
import { ModelCreator } from "@/entities/model/model-creator";
import { useSuspenseQuery } from "@tanstack/react-query";

const MOCK_MENTOR_INFO = {
  memberId: 1,
  name: "김멘토",
  job: "소프트웨어 개발자",
  career: 5,
  phone: "010-1234-5678",
  currentCompany: "테크 컴퍼니",
  stack: "React, TypeScript, Node.js, Spring Boot",
  introduction:
    "안녕하세요! 5년차 소프트웨어 개발자입니다. 프론트엔드와 백엔드 개발을 모두 경험했으며, 현재는 풀스택 개발자로 활동하고 있습니다.",
  bestFor: "프론트엔드 개발자, 백엔드 개발자, 풀스택 개발자",
  isApproved: true,
  totalClasses: 10,
  pendingRequests: 2,
  completedSessions: 8,
};

export function useGetMentorInfo() {
  const query = useSuspenseQuery({
    queryKey: ["mentor-info"],
    queryFn: () =>
      new Promise<typeof MOCK_MENTOR_INFO>((resolve) =>
        resolve(MOCK_MENTOR_INFO)
      ),
    select: (data) => ModelCreator.create(MentorModel, data),
  });

  return query;
}
