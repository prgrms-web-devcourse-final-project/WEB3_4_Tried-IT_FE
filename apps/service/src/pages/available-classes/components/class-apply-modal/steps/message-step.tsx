import { Textarea, Typography } from "@repo/ui";

interface MessageStepProps {
  message: string;
  onMessageChange: (message: string) => void;
}

export function MessageStep({ message, onMessageChange }: MessageStepProps) {
  return (
    <div className="space-y-4">
      <Typography.H4>멘토에게 보낼 메시지</Typography.H4>
      <Textarea
        value={message}
        onChange={(e) => onMessageChange(e.target.value)}
        placeholder="멘토에게 전달할 메시지를 작성해주세요."
        className="min-h-[150px]"
      />
    </div>
  );
}
