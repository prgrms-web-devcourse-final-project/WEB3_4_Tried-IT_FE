import { Button } from "@/shared/ui/button";
import { Typography } from "@/shared/ui/typography";
import { ROUTE_PATH } from "@app/routes";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Link } from "react-router";

export function MentorSection() {
  return (
    <section className="min-h-[calc(100dvh-72px)] w-full bg-gradient-to-b bg-background pt-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4 items-center justify-items-center lg:px-8">
          <div>
            <Typography.H2 className="text-center">
              <span className="text-primary text-4xl mr-2">멘토</span>로
              참가하기
            </Typography.H2>
          </div>
          <div className="flex justify-center w-[240px] md:w-[360px]">
            <AspectRatio ratio={1 / 1} className="rounded-md overflow-hidden">
              <img src="/mentor-character.png" alt="mentor-character" />
            </AspectRatio>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-center flex-wrap gap-4 mt-8 lg:mt-12">
              <Link to={ROUTE_PATH.MENTOR_APPLICATION}>
                <Button size="lg" variant="default" className="font-bold">
                  멘토 지원하기
                </Button>
              </Link>
            </div>
            <div className="mt-8">
              <Typography.Lead className="text-center">
                멘토로 참여하여 자신의 경험과 지식을 나누고, 후배 개발자들의
                성장을 도와주세요.
                <br />
                멘토링을 통해 새로운 인사이트를 얻고, 네트워크를 확장하며,
                개인적인 성취감을 느낄 수 있습니다.
                <br />
                지금 멘토로 지원하여 더 나은 개발자 커뮤니티를 만들어가세요!
              </Typography.Lead>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
