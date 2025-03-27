import { HeroSection } from "@/pages/home/compoents/hero-section";
import { PageLayout } from "@/shared/layouts/page-layout";

export function homePageMeta() {
  return [
    { title: "DeMentor - 온라인 멘토링 플랫폼" },
    { name: "description", content: "DeMentor에서 나만의 멘토를 찾아보세요!" },
  ];
}

export function HomePage() {
  return (
    <PageLayout>
      <HeroSection />
    </PageLayout>
  );
}
