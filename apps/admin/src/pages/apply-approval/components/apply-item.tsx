import { ApprovalRequestModel } from "@/entities/approval/approval-request.model";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui";

interface ApplyItemProps {
  applicant: ApprovalRequestModel;
  onApprove: () => void;
  onReject: () => void;
}

export function ApplyItem({ applicant, onApprove, onReject }: ApplyItemProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{applicant.title}</CardTitle>
        <CardDescription>{applicant.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">
              {applicant.formattedCreatedAt}
            </p>
            <p className="text-sm font-medium">{applicant.mentor.name}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onReject}>
              거절
            </Button>
            <Button onClick={onApprove}>승인</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
