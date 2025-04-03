import { ClassDetailModel } from "@/entities/model/class/class-detail.model";
import { ModelCreator } from "@/entities/model/model-creator";
import { useSuspenseQuery } from "@tanstack/react-query";

const MOCK_CLASS_DETAIL = {
  id: 1,
  title:
    "A 멘토의 기가막힌 개발 수업! 수업 제목이 길어지면 어떻게 될까? 이것도 될까? 이것보다도 길어지면?",
  description:
    "극강의 개발 수업을 경험해보세요! 최대 10명의 학생이 참여할 수 있습니다. 무지하게 긴 설명을 쓰고 싶다면 이렇게 쓰면 됩니다. 무지하게 긴 설명을 쓰고 싶다면 이렇게 쓰면 됩니다.  무지하게 긴 설명을 쓰고 싶다면 이렇게 쓰면 됩니다.  ",
  price: 10000,
  mentor: {
    name: "A 멘토",
    job: "개발자",
    career: 10,
  },
  stack: "React",
  image: "https://placehold.co/400x400?text=A",
  availableSchedules: [
    {
      date: "2025-04-03",
      time: "10:00",
    },
    {
      date: "2025-04-03",
      time: "14:00",
    },
    {
      date: "2025-04-04",
      time: "10:00",
    },
    {
      date: "2025-04-04",
      time: "14:00",
    },
    {
      date: "2025-04-05",
      time: "10:00",
    },
  ],
  unavailableSchedules: [
    {
      date: "2025-04-03",
      time: "11:00",
    },
  ],
  message: "React 개발 수업 메시지",
};

export function useGetClassDetail(classId: number) {
  const query = useSuspenseQuery({
    queryKey: ["classDetail", classId],
    queryFn: async () => {
      return new Promise<ClassDetailModel>((resolve) => {
        setTimeout(() => {
          resolve(ModelCreator.create(ClassDetailModel, MOCK_CLASS_DETAIL));
        }, 1000);
      });
    },
  });

  return query;
}
