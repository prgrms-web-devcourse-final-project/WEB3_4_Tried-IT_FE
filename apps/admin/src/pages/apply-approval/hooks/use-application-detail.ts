import { dementorApiFetchers } from "@repo/api";
import { useQuery } from "@tanstack/react-query";

export interface ApplymentInfo {
  applymentId?: number;
  memberId?: number;
  name?: string;
  job?: {
    name?: string;
  };
  career?: number;
  phone?: string;
  email?: string;
  currentCompany?: string;
  introduction?: string;
  status?: string;
  createdAt?: string;
  modifiedAt?: string;
}

export function useApplicationDetail(applymentId: number) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["application-detail", applymentId],
    queryFn: async () => {
      if (!applymentId) return null;

      try {
        const response =
          await dementorApiFetchers.admin.getMentorApplicationDetail({
            pathParams: { id: applymentId },
          });

        return response.data?.applymentInfo;
      } catch (error) {
        console.error("멘토 지원 상세 정보 조회 실패:", error);
        return null;
      }
    },
    enabled: !!applymentId, // applymentId가 있을 때만 쿼리 실행
  });

  return {
    applicationDetail: data,
    isLoading,
    error,
  };
}
