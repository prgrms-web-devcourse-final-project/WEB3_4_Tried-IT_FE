import { dementorApiFetchers } from "@repo/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface UpdateMentorInfoParams {
  memberId: string;
  jobId: number;
  career: number;
  currentCompany: string;
  introduction: string;
  files?: File[];
}

export function useUpdateMentorInfo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      memberId,
      jobId,
      career,
      currentCompany,
      introduction,
      files,
    }: UpdateMentorInfoParams) => {
      return dementorApiFetchers.mentor.requestUpdateMentorInfo({
        pathParams: {
          memberId,
        },
        body: {
          mentorUpdateData: {
            jobId,
            career,
            currentCompany,
            introduction,
          },
          files,
        },
      });
    },
    onSuccess: (_, variables) => {
      // 멘토 정보 캐시 갱신
      queryClient.invalidateQueries({
        queryKey: ["mentor-info", variables.memberId],
      });
    },
  });
}
