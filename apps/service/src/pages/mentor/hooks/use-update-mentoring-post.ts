import { useMutation, useQueryClient } from "@tanstack/react-query";

import { dementorApiFetchers } from "@repo/api";

export interface UpdateMentoringPostParams {
  classId: string;
  title: string;
  content: string;
  price: number;
  stack: string[];
}

export function useUpdateMentoringPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      classId,
      title,
      content,
      price,
      stack,
    }: UpdateMentoringPostParams) => {
      await dementorApiFetchers.class.putClass({
        pathParams: { classId },
        body: {
          title,
          content,
          price,
          stack,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["mentoring-posts"],
      });
    },
  });
}
