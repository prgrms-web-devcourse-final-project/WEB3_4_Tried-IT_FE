import { ApprovalRequestModel } from "@/entities/approval/approval-request.model";
import { ModelCreator } from "@/entities/model-creator";
import { dementorApiFetchers, Status, StatusConst } from "@repo/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useApprovalRequests() {
  const queryClient = useQueryClient();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["approvalRequests"],
    queryFn: async () => {
      const [modificationRequests, approvalRequests] = await Promise.all([
        dementorApiFetchers.admin.getMentorInfoModificationList({
          queryParam: {
            page: 1,
            size: 10,
          },
        }),
        dementorApiFetchers.admin.getMentorApplicationList({
          queryParam: {
            page: 1,
            size: 10,
            sort: "id,desc",
          },
        }),
      ]);

      return [
        ...(modificationRequests.data?.content ?? []).map((request) =>
          ModelCreator.create(ApprovalRequestModel, {
            category: "modification",
            description: `멤버 ${request.memberName} 님이 정보 처리 수정 요청을 하셨습니다.`,
            createdAt: request.createdAt ?? new Date(),
            memberId: request.memberId ?? 0,
            mentor: {
              name: request.memberName ?? "알 수 없음",
            },
            id: request.id ?? 0,
            type: "profile",
            title: "멤버 정보 수정",
            status: (request.status as Status) ?? StatusConst.PENDING,
          })
        ),
        ...(approvalRequests.data?.content ?? []).map((request) =>
          ModelCreator.create(ApprovalRequestModel, {
            category: "approval",
            description: `${request.name} 님이 멤버 신청을 하셨습니다.`,
            createdAt: request.createdAt ?? new Date(),
            memberId: request.memberId ?? 0,
            mentor: {
              name: request.name ?? "알 수 없음",
            },
            id: request.id ?? 0,
            type: "blank",
            title: "멤버 승인",
            status: (request.status as Status) ?? StatusConst.PENDING,
          })
        ),
      ];
    },
  });

  // PENDING 상태인 요청이 먼저 오도록 정렬하는 함수
  const sortByPendingStatus = (
    a: ApprovalRequestModel,
    b: ApprovalRequestModel
  ) => {
    // PENDING 상태가 가장 먼저 오도록 정렬
    if (a.status === StatusConst.PENDING && b.status !== StatusConst.PENDING)
      return -1;
    if (a.status !== StatusConst.PENDING && b.status === StatusConst.PENDING)
      return 1;

    // PENDING이 아닌 경우, APPROVED가 REJECTED보다 먼저 오도록 정렬
    if (a.status === StatusConst.APPROVED && b.status === StatusConst.REJECTED)
      return -1;
    if (a.status === StatusConst.REJECTED && b.status === StatusConst.APPROVED)
      return 1;

    // 그 외의 경우 생성일 기준 내림차순 정렬
    return b.createdAt.valueOf() - a.createdAt.valueOf();
  };

  // 카테고리별로 요청을 필터링하고 정렬
  const modificationRequests = requests
    .filter((request) => request.category === "modification")
    .sort(sortByPendingStatus);

  const approvalRequests = requests
    .filter((request) => request.category === "approval")
    .sort(sortByPendingStatus);

  const { mutate: approveRequest } = useMutation({
    mutationFn: async ({
      memberId,
      category,
    }: {
      memberId: number;
      category: "modification" | "approval";
    }) => {
      if (category === "modification") {
        return dementorApiFetchers.admin.approveMentorInfoModification({
          pathParams: { id: memberId },
        });
      }
      return dementorApiFetchers.admin.approveMentorApplication({
        pathParams: { id: memberId },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["approvalRequests"] });
    },
  });

  const { mutate: rejectRequest } = useMutation({
    mutationFn: async ({
      memberId,
      category,
    }: {
      memberId: number;
      category: "modification" | "approval";
    }) => {
      if (category === "modification") {
        return dementorApiFetchers.admin.rejectMentorInfoModification({
          pathParams: { id: memberId },
        });
      }
      return dementorApiFetchers.admin.rejectMentorApplication({
        pathParams: { id: memberId },
        body: {
          reason: "거절 사유를 입력해주세요.",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["approvalRequests"] });
    },
  });

  return {
    requests,
    modificationRequests,
    approvalRequests,
    isLoading,
    approveRequest,
    rejectRequest,
  };
}
