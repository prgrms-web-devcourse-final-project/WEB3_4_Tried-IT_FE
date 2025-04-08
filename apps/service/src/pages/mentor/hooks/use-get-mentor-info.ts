import { dementorApiFetchers } from "@repo/api";
import { useSuspenseQuery } from "@tanstack/react-query";

export type UseGetMentorInfoProps = {
  memberId?: string;
};

export function useGetMentorInfo({ memberId }: UseGetMentorInfoProps = {}) {
  const query = useSuspenseQuery({
    queryKey: ["mentor-info", memberId],
    queryFn: async ({ queryKey }) => {
      const [, memberId] = queryKey;
      if (!memberId) {
        return null;
      }
      try {
        const response = await dementorApiFetchers.mentor.getMentorInfo({
          pathParams: {
            memberId,
          },
        });
        return response.data;
      } catch {
        return null;
      }
    },
    select: () => {
      // TODO: API 완성시 구현
      return null;
    },
  });

  return query;
}
