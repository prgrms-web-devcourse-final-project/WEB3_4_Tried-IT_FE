import { ClassListItemModel } from "@/entities/model/class/class-list-item.model";
import { ModelCreator } from "@/entities/model/model-creator";
import { useSuspenseQuery } from "@tanstack/react-query";

const classes = Array.from({ length: 8 }, (_, index) => ({
  id: index + 1,
  title: `${String.fromCharCode(65 + index)} 멘토의 기가막힌 개발 수업! 수업 제목이 길어지면 어떻게 될까? 이것도 될까? 이것보다도 길어지면?`,
  price: 10000 + index * 1000,
  description: `극강의 개발 수업을 경험해보세요! 최대 10명의 학생이 참여할 수 있습니다. 무지하게 긴 설명을 쓰고 싶다면 이렇게 쓰면 됩니다. 무지하게 긴 설명을 쓰고 싶다면 이렇게 쓰면 됩니다.  무지하게 긴 설명을 쓰고 싶다면 이렇게 쓰면 됩니다.  `,
  mentor: {
    name: `${String.fromCharCode(65 + index)} 멘토`,
    job: "개발자",
    career: 10,
  },
  stack: "React",
  image: `https://placehold.co/400x400?text=${index + 1}`,
}));

// TODO: 서버에서 데이터를 가져오는 로직 추가. 페이지 네이션 API 추가
export function useGetAvailableClasses() {
  const query = useSuspenseQuery({
    queryKey: ["available-classes"],
    queryFn: () =>
      new Promise<typeof classes>((resolve) => {
        setTimeout(() => {
          resolve(classes);
        }, 1000);
      }),
    select: (data) =>
      data.map((item) => ModelCreator.create(ClassListItemModel, item)),
  });

  return query;
}
