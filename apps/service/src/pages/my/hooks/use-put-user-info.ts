import { UserInfoFormData } from "@/pages/my/components/my-info-section";
import { dementorApiFetchers } from "@repo/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function usePutUserInfo() {
  const queryClient = useQueryClient();
  const { mutateAsync: putUserInfo, isPending } = useMutation({
    mutationFn: (userInfo: Pick<UserInfoFormData, "name">) => {
      const response = dementorApiFetchers.member.putMyMemberInfo({
        queryParam: {
          nickname: userInfo.name,
        },
      });
      return response;
    },
    onMutate: async (userInfo) => {
      await queryClient.cancelQueries({ queryKey: ["user-info"] });
      const previousData = queryClient.getQueryData<UserInfoFormData>([
        "user-info",
      ]);
      queryClient.setQueryData(["user-info"], (old: UserInfoFormData) => {
        return {
          ...old,
          nickname: userInfo.name,
        };
      });

      return { previousData };
    },
    onError: (_, __, context) => {
      console.log("onError", context);
      queryClient.setQueryData(["user-info"], context?.previousData);
    },
  });

  return {
    putUserInfo,
    isPending,
  };
}
