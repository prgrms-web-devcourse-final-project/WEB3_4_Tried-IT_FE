import { JobCategoryModel } from "@/entities/job/job-category.model";
import { ModelCreator } from "@/entities/model-creator";
import { dementorApiFetchers, NotFoundError } from "@repo/api";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useGetJobCategories() {
  const query = useSuspenseQuery({
    queryKey: ["job-categories"],
    queryFn: () => dementorApiFetchers.admin.getJobCategoryList({}),
    select: (data) => {
      if (!data.data) {
        throw new NotFoundError("직무 카테고리 목록을 찾을 수 없습니다.");
      }
      return data.data.map((jobCategory) => {
        return ModelCreator.create(JobCategoryModel, {
          id: jobCategory.jobId?.toString() ?? "-1",
          label: jobCategory.name ?? "",
        });
      });
    },
  });

  return query;
}
