import { AppliedClassModel } from "@/entities/model/applied-class/applied-class.model";
import { ModelCreator } from "@/entities/model/model-creator";
import { PaginationModel } from "@/entities/model/pagination/pagination.model";
import { dementorApiFetchers, StatusConst } from "@repo/api";
import { useSuspenseQuery } from "@tanstack/react-query";

export interface UseGetAppliedClassesProps {
  page?: number;
  size?: number;
}

export function useGetAppliedClasses({
  page = 1,
  size = 10,
}: UseGetAppliedClassesProps) {
  const query = useSuspenseQuery({
    queryKey: ["applied-classes", page, size],
    queryFn: async () => {
      const response = await dementorApiFetchers.applyClass.getAppliedClassList(
        {
          queryParam: {
            page,
            size,
          },
        }
      );
      return response.data;
    },
    select: (data) => {
      const pagination = ModelCreator.create(PaginationModel, {
        page: data?.pagination?.page ?? 1,
        size: data?.pagination?.size ?? 10,
        totalElements: data?.pagination?.total_elements ?? 0,
        totalPages: data?.pagination?.total_pages ?? 0,
      });

      if (!data) {
        return {
          appliedClasses: [],
          pagination,
        };
      }
      const appliedClasses = data.applyments?.map((item) =>
        ModelCreator.create(AppliedClassModel, {
          id: item.applyId ?? 0,
          inquiry: item.inquiry ?? "",
          mentor: {
            name: item.name ?? "",
          },
          schedule: item.schedule?.replace("Z", "") ?? new Date(),
          status: item.status ?? StatusConst.PENDING,
        })
      );
      return {
        appliedClasses,
        pagination,
      };
    },
  });

  return query;
}
