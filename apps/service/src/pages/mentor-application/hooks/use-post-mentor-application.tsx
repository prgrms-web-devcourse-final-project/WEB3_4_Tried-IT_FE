import { MentorApplicationFormValues } from "@/pages/mentor-application/components/mentor-application-form";
import { dementorApiFetchers } from "@repo/api";
import { useMutation } from "@tanstack/react-query";

export interface UsePostMentorApplicationProps {
  memberId?: string;
}

export function usePostMentorApplication({
  memberId,
}: UsePostMentorApplicationProps) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: MentorApplicationFormValues) => {
      if (!memberId) {
        throw new Error("memberId is required");
      }
      return dementorApiFetchers.mentor.applyForMentorRole({
        body: {
          mentorApplyData: {
            career: data.experience,
            currentCompany: data.company,
            email: data.email,
            introduction: data.introduction,
            jobId: Number(data.position),
            memberId: Number(memberId),
            name: data.name,
            phone: data.phoneNumber,
          },
          files: data.attachments,
        },
      });
    },
  });

  return {
    postMentorApplication: mutateAsync,
    isPending,
  };
}
