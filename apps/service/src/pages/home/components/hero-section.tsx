import { Logo } from "@/widgets/logo";
import { ROUTE_PATH } from "@app/routes";
import { Button, Typography } from "@repo/ui";
import { Link } from "react-router";

export function HeroSection() {
  return (
    <section className="min-h-[calc(100dvh-72px)] w-full bg-gradient-to-b bg-background pt-12 md:py-24 flex md:items-center">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center justify-items-center lg:px-8">
          <div className="flex justify-center w-full md:w-[360px] lg:w-[480px] order-1 lg:order-2">
            <img src="/hero-image.png" alt="hero-image" />
          </div>
          <div className="flex flex-col order-2 lg:order-1">
            <div className="order-1">
              <Logo />
            </div>
            <div className="order-4 lg:order-2 mt-8 lg:mt-24">
              <Typography.P>
                취업 준비생과 신입 개발자들은 실무 경험과 최신 트렌드를 배울
                기회가 부족하며, 기존의 멘토링 시스템은 비용 부담이 크거나
                접근성이 낮은 경우가 많습니다. 우리 플랫폼은 이러한 문제를
                해결하기 위해 무료 또는 합리적인 비용의 멘토링, 실무 경험 공유
                기반의 멘토 매칭을 제공합니다.
              </Typography.P>
            </div>
            <div className="order-3 flex flex-wrap gap-4 mt-8 lg:mt-12">
              <Link to={ROUTE_PATH.AVAILABLE_CLASSES}>
                <Button size="lg" variant="secondary" className="font-bold">
                  멘토링 신청하기
                </Button>
              </Link>
              <Link to={ROUTE_PATH.MENTOR_APPLICATION}>
                <Button size="lg" variant="default" className="font-bold">
                  멘토 지원하기
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
