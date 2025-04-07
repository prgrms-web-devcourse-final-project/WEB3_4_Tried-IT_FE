import { MenteeRequestStatus } from "@/entities/model/mentee-request/mentee-request-status.enum";
import { MenteeRequestModel } from "@/entities/model/mentee-request/mentee-request.model";
import { ModelCreator } from "@/entities/model/model-creator";
import { useSuspenseQuery } from "@tanstack/react-query";

const MOCK_MENTEE_REQUESTS = [
  {
    applyment_id: 1,
    class_id: 1,
    member_id: 1,
    nickname: "John Doe",
    status: MenteeRequestStatus.PENDING,
    inquiry: "React 상태 관리에 대해 질문이 있습니다",
    schedule: "2023-05-10T14:00:00+09:00",
  },
  {
    applyment_id: 2,
    class_id: 1,
    member_id: 2,
    nickname: "Jane Doe",
    status: MenteeRequestStatus.APPROVED,
    inquiry: "프론트엔드 개발자 커리어 상담",
    schedule: "2023-05-12T15:30:00+09:00",
  },
  {
    applyment_id: 3,
    class_id: 1,
    member_id: 3,
    nickname: "Kim Smith",
    status: MenteeRequestStatus.PENDING,
    inquiry: "Next.js 프로젝트 구조에 대한 조언",
    schedule: "2023-05-15T10:00:00+09:00",
  },
];

export function useGetMenteeRequests() {
  const query = useSuspenseQuery({
    queryKey: ["mentee-requests"],
    queryFn: () =>
      new Promise<typeof MOCK_MENTEE_REQUESTS>((resolve) =>
        resolve(MOCK_MENTEE_REQUESTS)
      ),
    select: (data) =>
      data.map((item) =>
        ModelCreator.create(MenteeRequestModel, {
          applymentId: item.applyment_id,
          classId: item.class_id,
          memberId: item.member_id,
          nickname: item.nickname,
          status: item.status,
          inquiry: item.inquiry,
          schedule: item.schedule,
        })
      ),
  });

  return query;
}
