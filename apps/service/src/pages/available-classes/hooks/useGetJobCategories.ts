import { JobCategoryModel } from "@/entities/model/class/job-category.model";
import { ModelCreator } from "@/entities/model/model-creator";
import { useSuspenseQuery } from "@tanstack/react-query";

const MOCK_JOB_CATEGORIES = [
  {
    id: "Java",
    label: "자바",
  },
  {
    id: "JavaScript",
    label: "자바스크립트",
  },
  {
    id: "Python",
    label: "파이썬",
  },
  {
    id: "C#",
    label: "C#",
  },
];

export function useGetJobCategories() {
  const query = useSuspenseQuery({
    queryKey: ["job-categories"],
    queryFn: () =>
      new Promise<typeof MOCK_JOB_CATEGORIES>((resolve) =>
        resolve(MOCK_JOB_CATEGORIES)
      ),
    select: (data) =>
      data.map((item) => ModelCreator.create(JobCategoryModel, item)),
  });

  return query;
}
