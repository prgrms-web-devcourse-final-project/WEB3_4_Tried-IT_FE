import { ModelCreator } from "@/entities/model/model-creator";
import { UserModel } from "@/entities/model/user/user.model";
import { useSuspenseQuery } from "@tanstack/react-query";

const MOCK_USER_DATA = {
  id: 1,
  email: "example@email.com",
  nickname: "홍길동",
  createdAt: "2024-03-28T00:00:00.000Z",
};

export function useGetUserInfo() {
  const query = useSuspenseQuery({
    queryKey: ["user-info"],
    queryFn: () =>
      new Promise<typeof MOCK_USER_DATA>((resolve) => resolve(MOCK_USER_DATA)),
    select: (data) => ModelCreator.create(UserModel, data),
  });

  return query;
}
