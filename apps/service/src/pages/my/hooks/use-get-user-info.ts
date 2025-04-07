"use client";

import { ModelCreator } from "@/entities/model/model-creator";
import { UserModel } from "@/entities/model/user/user.model";
import { dementorApiFetchers } from "@repo/api";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useGetUserInfo() {
  const query = useSuspenseQuery({
    queryKey: ["user-info"],
    queryFn: async () => {
      try {
        const response = await dementorApiFetchers.member.getMyMemberInfo();
        return response.data;
      } catch {
        return null;
      }
    },
    select: (data) => {
      if (!data) {
        return null;
      }
      if (!data.id || !data.created_at || !data.email || !data.nickname) {
        throw new Error(`서버 응답이 예상과 다릅니다: ${JSON.stringify(data)}`);
      }
      return (
        data &&
        ModelCreator.create(UserModel, {
          id: data.id.toString(),
          createdAt: data.created_at,
          email: data.email,
          nickname: data.nickname,
        })
      );
    },
  });

  return { ...query };
}
