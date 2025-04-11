import { dementorApiFetchers } from "@repo/api";
import { useQuery } from "@tanstack/react-query";

export interface UseGetMentorApplicantProps {
  page: number;
  size: number;
}

export function useGetMentorApplicant({
  page,
  size,
}: UseGetMentorApplicantProps) {
  return useQuery({
    queryKey: ["mentor-applicant", page, size],
    queryFn: async () => {
      try {
        const response =
          await dementorApiFetchers.admin.getMentorApplicationList({
            queryParam: {
              page,
              size,
              sort: "id,desc",
            },
          });
        return response.data;
      } catch {
        return null;
      }
    },
  });
}
