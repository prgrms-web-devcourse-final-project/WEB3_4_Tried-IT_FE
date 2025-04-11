import { JobCategoryModel } from "@/entities/job/job-category.model";
import { ModelCreator } from "@/entities/model-creator";
import { dementorApiFetchers } from "@repo/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function usePostJobCategories() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (label: string) => {
      return await dementorApiFetchers.admin.postJobCategory({
        body: {
          jobName: label,
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
          console.log("old", old);
          return [
            ...(old.data ?? []),
            ModelCreator.create(JobCategoryModel, {
              id: String(old.data?.length ?? 0 + 1),
              label: newJobCategory,
            }),
          ];
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
