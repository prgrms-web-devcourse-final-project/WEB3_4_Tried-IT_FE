import { Textarea, Typography } from "@repo/ui";

interface MessageStepProps {
  message: string;
  onMessageChange: (message: string) => void;
}

export function MessageStep({ message, onMessageChange }: MessageStepProps) {
  return (
    <div className="flex-1 flex flex-col gap-4">
      <Typography.H4>멘토에게 보낼 메시지</Typography.H4>

      <Textarea
        value={message}
        onChange={(e) => onMessageChange(e.target.value)}
        placeholder="멘토에게 전달할 메시지를 작성해주세요."
        className="min-h-72 max-h-[450px] resize-none"
      />
    </div>
  );
}
