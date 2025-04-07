import { ClassListOrderModel } from "@/entities/model/class/class-list-order.model";
import { ModelCreator } from "@/entities/model/model-creator";
import { useSuspenseQuery } from "@tanstack/react-query";

const MOCK_CLASS_LIST_ORDERS = [
  {
    value: "popular",
    label: "인기순",
  },
  {
    value: "latest",
    label: "최신순",
  },
  {
    value: "reviews",
    label: "후기많은순",
  },
  {
    value: "beauty",
    label: "비용순",
  },
];

export function useGetClassListOrders() {
  const query = useSuspenseQuery({
    queryKey: ["class-list-orders"],
    queryFn: () =>
      new Promise<typeof MOCK_CLASS_LIST_ORDERS>((resolve) =>
        resolve(MOCK_CLASS_LIST_ORDERS)
      ),
    select: (data) =>
      data.map((item) => ModelCreator.create(ClassListOrderModel, item)),
  });

  return query;
}
