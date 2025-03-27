import { AspectRatio } from "@/shared/ui/aspect-ratio";
import { Button } from "@/shared/ui/button";
import { Typography } from "@/shared/ui/typography";
import { ROUTE_PATH } from "@app/routes";
import { Link } from "react-router";

export function HeroSection() {
  return (
    <section className="min-h-[calc(100dvh-72px)] w-full bg-gradient-to-b from-blue-100 to-white py-24 flex items-center">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-items-center px-8">
          <div className="space-y-24">
            <Typography.H1>개발자 멘토링 플랫폼</Typography.H1>
            <Typography.P>
              취업 준비생과 신입 개발자들은 실무 경험과 최신 트렌드를 배울
              기회가 부족하며, 기존의 멘토링 시스템은 비용 부담이 크거나
              접근성이 낮은 경우가 많습니다. 우리 플랫폼은 이러한 문제를
              해결하기 위해 무료 또는 합리적인 비용의 멘토링, 실무 경험 공유
              기반의 멘토 매칭을 제공합니다.
            </Typography.P>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link to={ROUTE_PATH.AVAILABLE_CLASSES}>
                <Button variant="default" className="rounded-md px-6">
                  멘토링 신청하기
                </Button>
              </Link>
              <Link to={ROUTE_PATH.APPLY_MENTOR}>
                <Button variant="secondary" className="rounded-md px-6">
                  멘토 지원하기
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex justify-center w-[480px] ">
            <AspectRatio ratio={1 / 1} className="rounded-md overflow-hidden">
              <img src="/hero-image.png" alt="hero-image" />
            </AspectRatio>
          </div>
        </div>
      </div>
    </section>
  );
}
