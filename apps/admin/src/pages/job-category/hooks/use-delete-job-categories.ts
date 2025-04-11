import { JobCategoryModel } from "@/entities/job/job-category.model";
import { dementorApiFetchers } from "@repo/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteJobCategories() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (jobId: number) => {
      return await dementorApiFetchers.admin.deleteJobCategory({
        pathParams: {
          jobId,
        },
      });
    },
    onMutate: async (jobId) => {
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
          return old.data?.filter((jobCategory) => jobCategory.jobId !== jobId);
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
