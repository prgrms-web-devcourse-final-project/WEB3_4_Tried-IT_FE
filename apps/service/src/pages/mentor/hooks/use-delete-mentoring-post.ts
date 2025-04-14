import { dementorApiFetchers } from "@repo/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface DeleteMentoringPostParams {
  classId: string;
}

export function useDeleteMentoringPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ classId }: DeleteMentoringPostParams) => {
      return dementorApiFetchers.class.deleteClass({
        pathParams: {
          classId,
        },
      });
    },
    onSuccess: () => {
      // 멘토링 포스트 목록 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: ["mentoring-posts"],
      });
    },
  });
}
