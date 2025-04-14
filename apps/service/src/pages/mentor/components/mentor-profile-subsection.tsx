import { MentorModel } from "@/entities/model/mentor/mentor.model";
import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@repo/ui";
import MDEditor from "@uiw/react-md-editor";
import { BookOpen } from "lucide-react";
import { overlay } from "overlay-kit";
import { useState } from "react";
import { MentorProfileEditDialog } from "./mentor-profile-edit-dialog";

interface MentorProfileSubSectionProps {
  mentor: MentorModel;
}

export function MentorProfileSubSection({
  mentor,
}: MentorProfileSubSectionProps) {
  const [isIntroDialogOpen, setIsIntroDialogOpen] = useState(false);

  const handleEditButtonClick = () => {
    overlay.open(({ isOpen, close }) => (
      <MentorProfileEditDialog
        mentor={mentor}
        isOpen={isOpen}
        onClose={close}
      />
    ));
  };

  return (
    <div className="relative">
      <div className="absolute top-0 right-0">
        <Button variant="outline" onClick={handleEditButtonClick}>
          수정
        </Button>
      </div>
      <h3 className="text-lg font-medium mb-4">멘토정보</h3>
      <div className="rounded-md p-4">
        <div className="flex items-center gap-4 mb-6">
          <Avatar className="h-16 w-16">
            <div className="flex h-full w-full items-center justify-center bg-muted text-xl">
              {mentor.name.charAt(0)}
            </div>
          </Avatar>
          <div>
            <Typography.H3>{mentor.name}</Typography.H3>
            <Typography.Muted>{mentor.job}</Typography.Muted>
          </div>
        </div>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-semibold w-24">직무</TableCell>
              <TableCell>{mentor.job}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">경력</TableCell>
              <TableCell>{mentor.careerText}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">현재 직장</TableCell>
              <TableCell>{mentor.currentCompany}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="font-semibold">소개</TableCell>
              <TableCell>
                <Dialog
                  open={isIntroDialogOpen}
                  onOpenChange={setIsIntroDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <BookOpen className="h-4 w-4" />
                      자세히 보기
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>멘토 소개</DialogTitle>
                    </DialogHeader>
                    <div className="mt-4 max-h-[70vh] overflow-y-auto">
                      <div
                        data-color-mode="light"
                        className="p-4 bg-white rounded-md"
                      >
                        <MDEditor.Markdown source={mentor.introduction} />
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                {/* 간략한 소개 미리보기 (100자 제한) */}
                <Typography.Muted className="mt-2 line-clamp-2">
                  {mentor.introduction.replace(/[#*`]/g, "").substring(0, 100)}
                  {mentor.introduction.length > 100 ? "..." : ""}
                </Typography.Muted>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export function MentorProfileSubSectionSkeleton() {
  return (
    <div className="relative">
      <h3 className="text-lg font-medium mb-4">멘토정보</h3>
      <div className="rounded-md p-4">
        <div className="flex items-center gap-4 mb-6">
          <Skeleton className="h-16 w-16 rounded-full bg-primary/10" />
          <div className="space-y-2">
            <Skeleton className="h-7 w-32 bg-primary/10" />
            <Skeleton className="h-5 w-24 bg-primary/10" />
          </div>
        </div>
        <Table>
          <TableBody>
            {Array.from({ length: 6 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell className="font-semibold w-24">
                  {["직무", "경력", "현재 직장", "소개"][index]}
                </TableCell>
                <TableCell>
                  {index === 3 ? (
                    <div className="flex flex-wrap gap-2">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton key={i} className="h-6 w-20 bg-primary/10" />
                      ))}
                    </div>
                  ) : (
                    <Skeleton className="h-5 w-full max-w-md bg-primary/10" />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
