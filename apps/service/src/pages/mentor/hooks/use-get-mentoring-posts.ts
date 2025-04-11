import { MentoringPostModel } from "@/entities/model/mentoring-post/mentoring-post.model";
import { ModelCreator } from "@/entities/model/model-creator";
import { dementorApiFetchers } from "@repo/api";
import { useSuspenseQuery } from "@tanstack/react-query";

export interface UseGetMentoringPostsProps {
  memberId?: string;
}

export function useGetMentoringPosts({ memberId }: UseGetMentoringPostsProps) {
  const query = useSuspenseQuery({
    queryKey: ["mentoring-posts", memberId],
    queryFn: () => {
      if (!memberId) {
        return null;
      }
      return dementorApiFetchers.mentor.getRegisteredClassList({
        pathParams: {
          memberId,
        },
      });
    },
    select: (data) => {
      if (!data) {
        return [];
      }
      return data.data?.map((post) =>
        ModelCreator.create(MentoringPostModel, {
          classId: post.classId ?? 0,
          content: post.content ?? "",
          mentee: [],
          stack: post.stack?.join(", ") ?? "",
          title: post.title ?? "",
          price: post.price ?? 0,
        })
      );
    },
  });

  return query;
}
