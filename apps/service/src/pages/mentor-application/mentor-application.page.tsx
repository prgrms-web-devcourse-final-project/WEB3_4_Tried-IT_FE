import { MentorApplicationForm } from "@/pages/mentor-application/components/mentor-application-form";
import { PageLayout } from "@/shared/layouts/page-layout";

export function MentorApplicationPage() {
  const handleSubmit = (values: unknown) => {
    alert(JSON.stringify(values));
  };

  return (
    <PageLayout>
      <MentorApplicationForm onSubmit={handleSubmit} />
    </PageLayout>
  );
}
