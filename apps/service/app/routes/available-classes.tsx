import { withAuth } from "@/features/auth/components/with-auth";
import { AvailableClassesPage } from "@/pages";

export default withAuth(AvailableClassesPage);

export function meta() {
  return [
    { title: "Available Classes - Dementor" },
    { name: "description", content: "Available Classes in Dementor" },
  ];
}
