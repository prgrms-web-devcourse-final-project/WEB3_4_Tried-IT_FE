import { ClassListOrderModel } from "@/entities/model/class/class-list-order.model";
import { JobCategoryModel } from "@/entities/model/class/job-category.model";
import { useGetClassListOrders } from "@/pages/available-classes/hooks/use-get-class-list-orders";
import { useGetJobCategories } from "@/pages/available-classes/hooks/use-get-job-categories";
import { useState } from "react";

export function useAvailableClassesFilter() {
  const { data: jobCategories } = useGetJobCategories();
  const { data: classListOrders } = useGetClassListOrders();

  const [selectedJobCategories, setSelectedJobCategories] = useState<
    JobCategoryModel[]
  >([]);
  const [selectedClassListOrder, setSelectedClassListOrder] =
    useState<ClassListOrderModel>(classListOrders[0]);

  const handleJobCategoriesChangeById = (jobCategoryIds: string[]) => {
    setSelectedJobCategories(
      jobCategories.filter((jobCategory) =>
        jobCategoryIds.includes(jobCategory.id)
      )
    );
  };

  const handleClassListOrderChangeById = (orderId: string) => {
    const newOrder = classListOrders.find(
      (classListOrder) => classListOrder.value === orderId
    );
    if (!newOrder) return;
    setSelectedClassListOrder(newOrder);
  };

  return {
    jobCategories,
    classListOrders,
    selectedJobCategories,
    selectedClassListOrder,
    handleJobCategoriesChangeById,
    handleClassListOrderChangeById,
  };
}
