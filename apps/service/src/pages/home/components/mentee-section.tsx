import { ROUTE_PATH } from "@app/routes";
import { AspectRatio, Button, Typography } from "@repo/ui";
import { Link } from "react-router";

export function MenteeSection() {
  return (
    <section className="min-h-[calc(100dvh-72px)] w-full bg-gradient-to-b bg-background pt-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4 items-center justify-items-center lg:px-8">
          <div>
            <Typography.H2 className="text-center">
              <span className="text-secondary text-4xl mr-2">멘티</span>로
              참가하기
            </Typography.H2>
          </div>
          <div className="flex justify-center w-[240px] md:w-[360px]">
            <AspectRatio ratio={1 / 1} className="rounded-md overflow-hidden">
              <img src="/mentee-character.png" alt="mentee-character" />
            </AspectRatio>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-center flex-wrap gap-4 mt-8 lg:mt-12">
              <Link to={ROUTE_PATH.AVAILABLE_CLASSES}>
                <Button size="lg" variant="secondary" className="font-bold">
                  멘토링 신청하기
                </Button>
              </Link>
            </div>
            <div className="mt-8">
              <Typography.Lead className="text-center">
                멘토링을 통해 실무 경험이 풍부한 현직자의 생생한 조언을
                들어보세요.
                <br />
                업계 트렌드부터 실제 프로젝트 경험까지, 멘토와 함께 성장의
                기회를 만들어가세요.
              </Typography.Lead>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
