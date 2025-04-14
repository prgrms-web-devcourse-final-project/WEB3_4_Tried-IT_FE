import { withAuth } from "@/features/auth/components/with-auth";
import { MentorDashboardPage } from "@/pages";

export default withAuth(MentorDashboardPage, {
  requireMentor: true,
});

export function meta() {
  return [
    { title: "Mentor Dashboard - Dementor" },
    { name: "description", content: "Mentor Dashboard in Dementor" },
  ];
}
