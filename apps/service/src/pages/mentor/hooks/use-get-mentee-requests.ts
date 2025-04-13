import { MenteeRequestStatus } from "@/entities/model/mentee-request/mentee-request-status.enum";
import { MenteeRequestModel } from "@/entities/model/mentee-request/mentee-request.model";
import { ModelCreator } from "@/entities/model/model-creator";
import { PaginationModel } from "@/entities/model/pagination/pagination.model";
import { dementorApiFetchers } from "@repo/api";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useGetMenteeRequests(page: number = 1, size: number = 10) {
  const query = useSuspenseQuery({
    queryKey: ["mentee-requests", page, size],
    queryFn: () =>
      dementorApiFetchers.mentor.getAppliedMenteeList({
        queryParam: { page, size },
      }),
    select: (response) => {
      const data = response.data;
      const applyments =
        data?.applyments?.map((item) =>
          ModelCreator.create(MenteeRequestModel, {
            applymentId: item.applyId ?? 0,
            classId: item.classId ?? 0,
            memberId: item.memberId ?? 0,
            nickname: item.nickname ?? "",
            status: convertStatus(item.status),
            inquiry: item.inquiry ?? "",
            schedule: item.schedule ?? "",
          })
        ) || [];
      const pagination = ModelCreator.create(PaginationModel, {
        page: data?.pagination?.page ?? 1,
        size: data?.pagination?.size ?? 10,
        totalElements: data?.pagination?.total_elements ?? 0,
        totalPages: data?.pagination?.total_pages ?? 1,
      });
      return {
        applyments,
        pagination,
      };
    },
  });

  return query;
}

// API Status 타입을 MenteeRequestStatus로 변환
function convertStatus(status?: string): MenteeRequestStatus {
  if (!status) return MenteeRequestStatus.PENDING;

  switch (status) {
    case "APPROVED":
      return MenteeRequestStatus.APPROVED;
    case "REJECTED":
      return MenteeRequestStatus.REJECTED;
    default:
      return MenteeRequestStatus.PENDING;
  }
}
