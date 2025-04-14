import { useAuth } from "@/features/auth/hooks/use-auth";
import { DateFormatter } from "@/shared/date/date-formatter";
import { dementorApiFetchers } from "@repo/api";
import { useSuspenseQuery } from "@tanstack/react-query";

// Status 타입 직접 정의
type Status = "PENDING" | "APPROVED" | "REJECTED";

export interface ModificationRequestField {
  before: string | number;
  after: string | number;
}

export interface ModificationRequest {
  requestId: number;
  status: Status;
  requestDate: DateFormatter;
  modifiedFields: {
    career?: ModificationRequestField;
    currentCompany?: ModificationRequestField;
    introduction?: ModificationRequestField;
    jobId?: ModificationRequestField;
  };
}

export interface UseGetMentorInfoModificationRequestsOptions {
  status?: Status;
  page?: number;
  size?: number;
}

export function useGetMentorInfoModificationRequests({
  status = "PENDING",
  page = 1,
  size = 10,
}: UseGetMentorInfoModificationRequestsOptions = {}) {
  const { user } = useAuth();

  const query = useSuspenseQuery({
    queryKey: [
      "mentor-info-modification-requests",
      user?.id,
      status,
      page,
      size,
    ],
    queryFn: async () => {
      if (!user?.id) return null;

      return dementorApiFetchers.mentor.getMentorInfoModificationRequestList({
        pathParams: {
          memberId: user.id,
        },
        queryParam: {
          status,
          page,
          size,
        },
      });
    },
    select: (response) => {
      if (!response || !response.data) {
        return {
          requests: [],
          pagination: {
            page,
            size,
            totalElements: 0,
            totalPages: 0,
          },
        };
      }

      const { data } = response;

      const requests = data.modificationRequests.map((request) => ({
        requestId: request.requestId,
        status: request.status,
        requestDate: new DateFormatter(request.requestDate),
        modifiedFields: {
          career: request.modifiedFields.career,
          currentCompany: request.modifiedFields.currentCompany,
          introduction: request.modifiedFields.introduction,
          jobId: request.modifiedFields.jobId,
        },
      }));

      return {
        requests,
        pagination: data.pagination,
      };
    },
  });

  return query;
}
