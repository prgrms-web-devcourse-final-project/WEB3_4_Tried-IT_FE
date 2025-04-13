import { MenteeRequestStatus } from "@/entities/model/mentee-request/mentee-request-status.enum";
import { dementorApiFetchers } from "@repo/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface HandleMenteeRequestParams {
  applyId: number;
  status: Omit<MenteeRequestStatus, "PENDING">;
}

export function useHandleMenteeRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ applyId, status }: HandleMenteeRequestParams) => {
      return dementorApiFetchers.mentor.handleMentoringApplication({
        pathParams: { applyId },
        body: { status },
      });
    },
    onSuccess: () => {
      // 멘티 요청 목록 데이터 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ["mentee-requests"] });
    },
  });
}
