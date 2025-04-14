import { withAuth } from "@/features/auth/components/with-auth";
import { MentorApplicationPage } from "@/pages";

export function meta() {
  return [
    { title: "Apply as Mentor - Dementor" },
    { name: "description", content: "Apply as a mentor in Dementor" },
  ];
}

export default withAuth(MentorApplicationPage);
