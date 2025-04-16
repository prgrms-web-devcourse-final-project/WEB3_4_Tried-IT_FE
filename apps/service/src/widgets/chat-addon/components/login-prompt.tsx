import { Button } from "@repo/ui";
import { MessageCircle } from "lucide-react";

export interface LoginPromptProps {
  onLoginButtonClick: () => void;
}

export function LoginPrompt({ onLoginButtonClick }: LoginPromptProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
      <MessageCircle className="size-12 text-muted-foreground mb-4" />
      <h2 className="text-xl font-bold mb-2">로그인이 필요합니다</h2>
      <p className="text-muted-foreground mb-6">
        채팅 기능을 이용하기 위해서는 로그인이 필요합니다.
      </p>
      <Button variant="gradient" size="lg" onClick={onLoginButtonClick}>
        로그인 하러 가기
      </Button>
    </div>
  );
}
