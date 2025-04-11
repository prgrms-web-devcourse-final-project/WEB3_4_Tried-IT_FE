import {
  JobCategoryModel,
  JobCategoryModelJson,
} from "@/entities/job/job-category.model";
import { ModelCreator } from "@/entities/model-creator";
import { dementorApiFetchers } from "@repo/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function usePutJobCategories() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (jobCategory: JobCategoryModelJson) => {
      return await dementorApiFetchers.admin.putJobCategory({
        pathParams: {
          jobId: Number(jobCategory.id),
        },
        body: {
          jobName: jobCategory.label,
        },
      });
    },
    onMutate: async (newJobCategory) => {
      await queryClient.cancelQueries({ queryKey: ["job-categories"] });
      const previousJobCategories = queryClient.getQueryData<
        JobCategoryModel[]
      >(["job-categories"]);
      queryClient.setQueryData(
        ["job-categories"],
        (
          old: Awaited<
            ReturnType<typeof dementorApiFetchers.admin.getJobCategoryList>
          >
        ) => {
          return old.data?.map((jobCategory) => {
            if (jobCategory.jobId === Number(newJobCategory.id)) {
              return ModelCreator.create(JobCategoryModel, {
                id: jobCategory.jobId?.toString() ?? "-1",
                label: jobCategory.name ?? "",
              });
            }
            return jobCategory;
          });
        }
      );
      return { previousJobCategories };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["job-categories"] });
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(
        ["job-categories"],
        context?.previousJobCategories
      );
    },
  });
}
