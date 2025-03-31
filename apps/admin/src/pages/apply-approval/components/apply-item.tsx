import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Typography,
} from "@repo/ui";

export interface Applicant {
  id: number;
  type: "profile" | "blank";
  category: "modification" | "approval";
  title: string;
  description: string;
  mentor: {
    name: string;
  };
  timestamp: string;
  approved?: boolean;
}

interface ApplyItemProps {
  applicant: Applicant;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
}

export function ApplyItem({ applicant, onApprove, onReject }: ApplyItemProps) {
  return (
    <div className="border rounded-lg p-4 flex items-start">
      <div className="w-16 h-16 mr-4 flex-shrink-0">
        <Avatar className="h-16 w-16">
          <AvatarImage
            src={applicant.mentor.name}
            alt={applicant.mentor.name}
          />
          <AvatarFallback>
            {applicant.mentor.name.substring(0, 2)}
          </AvatarFallback>
        </Avatar>
      </div>

      <div className="flex-grow">
        <Typography.Large>{applicant.title}</Typography.Large>
        <Typography.Small>{applicant.description}</Typography.Small>

        <div className="mt-2 flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onApprove(applicant.id)}
          >
            승인
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onReject(applicant.id)}
          >
            비승인
          </Button>
        </div>
      </div>

      <div className="text-right text-accent text-sm whitespace-nowrap">
        {applicant.timestamp}
      </div>
    </div>
  );
}
