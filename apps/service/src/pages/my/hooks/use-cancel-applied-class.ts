import { dementorApiFetchers } from "@repo/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface CancelAppliedClassParams {
  applyId: number;
}

export function useCancelAppliedClass() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ applyId }: CancelAppliedClassParams) => {
      return dementorApiFetchers.applyClass.cancelApplyClass({
        pathParams: {
          applyId,
        },
      });
    },
    onSuccess: () => {
      // 멘토링 신청 목록 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: ["applied-classes"],
      });
    },
  });
}
