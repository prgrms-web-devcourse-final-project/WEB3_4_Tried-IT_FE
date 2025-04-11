import { ApprovalRequestModel } from "@/entities/approval/approval-request.model";
import { ModelCreator } from "@/entities/model-creator";
import { dementorApiFetchers } from "@repo/api";
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
            mentor: {
              name: request.memberName ?? "알 수 없음",
            },
            id: request.id ?? 0,
            type: "profile",
            title: "멤버 정보 수정",
          })
        ),
        ...(approvalRequests.data?.content ?? []).map((request) =>
          ModelCreator.create(ApprovalRequestModel, {
            category: "approval",
            description: `${request.name} 님이 멤버 신청을 하셨습니다.`,
            createdAt: request.createdAt ?? new Date(),
            mentor: {
              name: request.name ?? "알 수 없음",
            },
            id: request.id ?? 0,
            type: "blank",
            title: "멤버 승인",
          })
        ),
      ];
    },
  });

  const { mutate: approveRequest } = useMutation({
    mutationFn: async ({
      id,
      category,
    }: {
      id: number;
      category: "modification" | "approval";
    }) => {
      if (category === "modification") {
        return dementorApiFetchers.admin.approveMentorInfoModification({
          pathParams: { id },
        });
      }
      return dementorApiFetchers.admin.approveMentorApplication({
        pathParams: { id },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["approvalRequests"] });
    },
  });

  const { mutate: rejectRequest } = useMutation({
    mutationFn: async ({
      id,
      category,
    }: {
      id: number;
      category: "modification" | "approval";
    }) => {
      if (category === "modification") {
        return dementorApiFetchers.admin.rejectMentorInfoModification({
          pathParams: { id },
        });
      }
      return dementorApiFetchers.admin.rejectMentorApplication({
        pathParams: { id },
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
    isLoading,
    approveRequest,
    rejectRequest,
  };
}
