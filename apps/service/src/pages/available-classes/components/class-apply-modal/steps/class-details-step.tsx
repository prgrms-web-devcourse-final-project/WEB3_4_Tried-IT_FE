import { Typography } from "@repo/ui";

interface ClassDetailsStepProps {
  title: string;
  mentorName: string;
  description: string;
  price: number;
}

export function ClassDetailsStep({
  title,
  mentorName,
  description,
  price,
}: ClassDetailsStepProps) {
  return (
    <div className="space-y-4">
      <Typography.H3>{title}</Typography.H3>
      <Typography.P className="text-muted-foreground">
        멘토: {mentorName}
      </Typography.P>
      <Typography.P>{description}</Typography.P>
      <Typography.P className="font-bold">
        가격: {price.toLocaleString()}원
      </Typography.P>
    </div>
  );
}
