import { ClassListItemModel } from "@/entities/model/class/class-list-item.model";
import { ModelCreator } from "@/entities/model/model-creator";
import { PaginationModel } from "@/entities/model/pagination/pagination.model";
import { dementorApiFetchers } from "@repo/api";
import { useSuspenseQuery } from "@tanstack/react-query";

export interface UseGetAvailableClassesOptions {
  jobIds?: string[];
  page: number;
  size: number;
}

export function useGetAvailableClasses(options: UseGetAvailableClassesOptions) {
  const query = useSuspenseQuery({
    queryKey: ["available-classes", options.page, options.size, options.jobIds],
    queryFn: ({ queryKey }) =>
      dementorApiFetchers.class.getClasses({
        queryParam: {
          sort: ["createdAt"],
          page: queryKey[1] as number,
          size: queryKey[2] as number,
          jobId: (queryKey[3] as string[]).join(","),
        },
      }),
    select: (data) => {
      if (!data.data?.content) {
        return {
          contents: [],
          pagination: ModelCreator.create(PaginationModel, {
            totalPages: 0,
            totalElements: 0,
            page: options.page,
            size: options.size,
          }),
        };
      }

      const contents = data.data.content.map((item) =>
        ModelCreator.create(ClassListItemModel, {
          id: item.classId ?? 0,
          description: item.content ?? "",
          mentor: {
            career: item.mentor?.career ?? 0,
            job: item.mentor?.job ?? "",
            name: item.mentor?.name ?? "",
          },
          price: item.price ?? 0,
          stack: item.stack?.join(", ") ?? "",
          title: item.title ?? "제목 없음",
        })
      );

      const pagination = ModelCreator.create(PaginationModel, {
        totalPages: data.data.totalPages ?? 0,
        totalElements: data.data?.totalElements ?? 0,
        page: options.page,
        size: data.data.size ?? 0,
      });

      return { contents, pagination };
    },
  });

  return query;
}
