import { MentoringPostModel } from "@/entities/model/mentoring-post/mentoring-post.model";
import { ModelCreator } from "@/entities/model/model-creator";
import { useSuspenseQuery } from "@tanstack/react-query";

const MOCK_MENTORING_POSTS = [
  {
    class_id: 1,
    mentor: {
      member_id: 1,
      name: "김멘토",
      job: "소프트웨어 개발자",
      career: 5,
    },
    stack: "React, TypeScript, Node.js",
    content:
      "프론트엔드 개발 멘토링을 진행합니다. React와 TypeScript를 중심으로 실전 프로젝트 경험을 공유하고, 코드 리뷰를 통해 실력 향상을 도와드립니다.",
    title: "프론트엔드 개발 멘토링",
    price: 50000,
    mentee: [
      {
        member_id: 101,
        date: "2024-03-15T14:00:00Z",
      },
      {
        member_id: 102,
        date: "2024-03-16T15:30:00Z",
      },
    ],
  },
  {
    class_id: 2,
    mentor: {
      member_id: 1,
      name: "김멘토",
      job: "소프트웨어 개발자",
      career: 5,
    },
    stack: "Spring Boot, JPA, MySQL",
    content:
      "백엔드 개발자를 위한 Spring Boot 멘토링입니다. JPA를 활용한 데이터베이스 설계와 API 개발 경험을 공유합니다.",
    title: "Spring Boot 백엔드 멘토링",
    price: 60000,
    mentee: [
      {
        member_id: 103,
        date: "2024-03-17T10:00:00Z",
      },
    ],
  },
];

export function useGetMentoringPosts() {
  const query = useSuspenseQuery({
    queryKey: ["mentoring-posts"],
    queryFn: () =>
      new Promise<typeof MOCK_MENTORING_POSTS>((resolve) => {
        setTimeout(() => {
          resolve(MOCK_MENTORING_POSTS);
        }, 1000);
      }),
    select: (data) =>
      data.map((post) =>
        ModelCreator.create(MentoringPostModel, {
          classId: post.class_id,
          content: post.content,
          mentee: post.mentee.map((mentee) => ({
            memberId: mentee.member_id,
            date: mentee.date,
          })),
          mentor: {
            memberId: post.mentor.member_id,
            name: post.mentor.name,
            job: post.mentor.job,
            career: post.mentor.career,
          },
          stack: post.stack,
          title: post.title,
          price: post.price,
        })
      ),
  });

  return query;
}
