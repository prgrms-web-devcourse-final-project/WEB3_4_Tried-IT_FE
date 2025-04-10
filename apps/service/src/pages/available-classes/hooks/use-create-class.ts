import { MentorClassCreateFormValues } from "@/widgets/mentor/mentor-class-create-form";
import { dementorApiFetchers } from "@repo/api";
import { useMutation } from "@tanstack/react-query";

export function useCreateClass() {
  const { mutateAsync: createClass, isPending } = useMutation({
    mutationFn: (values: MentorClassCreateFormValues) => {
      return dementorApiFetchers.class.postClass({
        body: {
          content: values.content,
          price: values.price,
          schedules: values.schedule,
          stack: values.stacks.split(","),
          title: values.title,
        },
      });
    },
  });

  return {
    createClass,
    isPending,
  };
}
