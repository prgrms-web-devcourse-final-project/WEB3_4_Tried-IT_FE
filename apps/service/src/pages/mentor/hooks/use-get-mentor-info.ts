import { MentorModel } from "@/entities/model/mentor/mentor.model";
import { ModelCreator } from "@/entities/model/model-creator";
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
    select: (data) => {
      if (!data) {
        return null;
      }
      return ModelCreator.create(MentorModel, {
        bestFor: "",
        career: data.career,
        memberId: data.memberId,
        name: data.name,
        job: data.jobName,
        completedSessions: data.completedSessions,
        currentCompany: data.currentCompany,
        introduction: data.introduction,
        isApproved: true,
        pendingRequests: data.pendingRequests,
        phone: data.phone,
        totalClasses: data.totalClasses,
      });
    },
  });

  return query;
}
