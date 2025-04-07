import { PageLayout } from "@/shared/layouts/page-layout";
import { ROUTE_PATH } from "@app/routes";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@repo/ui";
import { Link } from "react-router";

export function SignupCompletePage() {
  return (
    <PageLayout className="flex flex-col items-center justify-center">
      <div className="space-y-4 w-full px-4 max-w-xl">
        <Card>
          <CardContent className="space-y-4">
            <CardTitle>🎉 회원가입 완료 🎉</CardTitle>
            <CardDescription>
              환영합니다! 로그인 후 서비스를 이용해주세요.
            </CardDescription>
            <Button variant="gradient" className="w-full" asChild>
              <Link to={ROUTE_PATH.AUTH.LOGIN}>로그인 하러 가기</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
