import { HeroSection } from "@/pages/home/components/hero-section";
import { MenteeSection } from "@/pages/home/components/mentee-section";
import { MentorSection } from "@/pages/home/components/mentor-section";
import { PageLayout } from "@/shared/layouts/page-layout";
import { Separator } from "@repo/ui";

export function HomePage() {
  return (
    <PageLayout>
      <HeroSection />
      <Separator className="my-12" />
      <div className="container mx-auto px-4 lg:px-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <MenteeSection />
          <Separator className="my-12 block lg:hidden" />
          <MentorSection />
        </div>
      </div>
    </PageLayout>
  );
}
