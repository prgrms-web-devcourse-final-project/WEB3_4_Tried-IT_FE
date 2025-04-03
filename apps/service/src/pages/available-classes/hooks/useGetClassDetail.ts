import { ClassDetailModel } from "@/entities/model/class/class-detail.model";
import { ModelCreator } from "@/entities/model/model-creator";
import { useSuspenseQuery } from "@tanstack/react-query";

const MOCK_CLASS_DETAIL = {
  id: 1,
  title: "React 개발 수업",
  description: "React 개발 수업 설명",
  price: 10000,
  mentor: {
    name: "홍길동",
    job: "개발자",
    career: 10,
  },
  stack: "React",
  image: "https://placehold.co/400x400?text=React",
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
