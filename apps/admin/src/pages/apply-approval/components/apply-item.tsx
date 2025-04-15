import { ApprovalRequestModel } from "@/entities/approval/approval-request.model";
import { MentorModificationDetailModal } from "@/pages/apply-approval/components/mentor-modification-detail-modal";
import { StatusConst } from "@repo/api";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui";
import { useState } from "react";
import { ApplyDetailModal } from "./apply-detail-modal";

interface ApplyItemProps {
  applicant: ApprovalRequestModel;
  onApprove: () => void;
  onReject: () => void;
}

export function ApplyItem({ applicant, onApprove, onReject }: ApplyItemProps) {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const isPending = applicant.status === StatusConst.PENDING;
  const isApprovalCategory = applicant.category === "approval";

  // 상세 보기 모달 열기
  const handleOpenDetailModal = () => {
    setIsDetailModalOpen(true);
  };

  // 상세 보기 모달 닫기
  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
  };

  // 상태에 따른 배지 스타일 설정
  const getStatusBadge = () => {
    switch (applicant.status) {
      case StatusConst.APPROVED:
        return (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-800 border-green-300"
          >
            승인됨
          </Badge>
        );
      case StatusConst.REJECTED:
        return (
          <Badge
            variant="outline"
            className="bg-red-100 text-red-800 border-red-300"
          >
            거절됨
          </Badge>
        );
      default:
        return (
          <Badge
            variant="outline"
            className="bg-yellow-100 text-yellow-800 border-yellow-300"
          >
            대기중
          </Badge>
        );
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{applicant.title}</CardTitle>
            {!isPending && getStatusBadge()}
          </div>
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
            <div className="flex gap-2 items-center">
              <Button
                variant="outline"
                size="sm"
                onClick={handleOpenDetailModal}
              >
                상세 보기
              </Button>
              {isPending && (
                <>
                  <Button variant="outline" onClick={onReject}>
                    거절
                  </Button>
                  <Button onClick={onApprove}>승인</Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {isApprovalCategory ? (
        <ApplyDetailModal
          isOpen={isDetailModalOpen}
          onClose={handleCloseDetailModal}
          applymentId={applicant.memberId}
        />
      ) : (
        <MentorModificationDetailModal
          isOpen={isDetailModalOpen}
          onClose={handleCloseDetailModal}
          memberId={applicant.memberId}
          proposalId={applicant.id}
        />
      )}
    </>
  );
}
