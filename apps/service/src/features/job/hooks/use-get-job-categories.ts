import { JobCategoryModel } from "@/entities/model/class/job-category.model";
import { ModelCreator } from "@/entities/model/model-creator";
import { dementorApiFetchers } from "@repo/api";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useGetJobCategories() {
  const query = useSuspenseQuery({
    queryKey: ["job-categories"],
    queryFn: () => dementorApiFetchers.admin.getJobCategoryList({}),
    select: (data) => {
      return data.data?.map((jobCategory) => {
        return ModelCreator.create(JobCategoryModel, {
          id: jobCategory.jobId?.toString() ?? "-1",
          label: jobCategory.name ?? "",
        });
      });
    },
  });

  return query;
}
