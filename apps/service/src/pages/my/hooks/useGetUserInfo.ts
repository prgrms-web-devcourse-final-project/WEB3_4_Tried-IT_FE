import { ModelCreator } from "@/entities/model/model-creator";
import { UserModel } from "@/entities/model/user/user.model";
import { useSuspenseQuery } from "@tanstack/react-query";

const MOCK_USER_DATA = {
  id: "1",
  email: "example@email.com",
  nickname: "홍길동",
  createdAt: "2024-03-28T00:00:00.000Z",
};

let MOCK_IS_LOGGED_IN = false;

export function useGetUserInfo() {
  const query = useSuspenseQuery({
    queryKey: ["user-info"],
    queryFn: async () => {
      if (MOCK_IS_LOGGED_IN) {
        return MOCK_USER_DATA;
      } else {
        return null;
      }
    },
    select: (data) => data && ModelCreator.create(UserModel, data),
  });

  const DEV_setIsLoggedIn = (isLoggedIn: boolean) => {
    MOCK_IS_LOGGED_IN = isLoggedIn;
  };

  return { ...query, DEV_setIsLoggedIn };
}
