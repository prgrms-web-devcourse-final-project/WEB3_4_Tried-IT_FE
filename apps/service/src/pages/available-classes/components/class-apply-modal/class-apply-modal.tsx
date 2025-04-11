import { handleError } from "@/app/error-handler/error-handler";
import { useApplyClass } from "@/pages/available-classes/hooks/use-apply-class";
import { useGetClassDetail } from "@/pages/available-classes/hooks/use-get-class-detail";
import { MenteeTheme } from "@/shared/components/mentee-theme/mentee-theme";
import { createTypedSwitch } from "@/shared/components/switch";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Skeleton,
  toast,
} from "@repo/ui";
import dayjs from "dayjs";
import { Suspense, useState } from "react";
import { ClassDetailsStep, MessageStep, ScheduleStep } from "./steps";

type ClassBookingStep = "details" | "schedule" | "message";

interface ClassApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  classId: number;
}

const StepSwitch = createTypedSwitch<ClassBookingStep>();

export type ApplyClassFormValues = {
  classId: number;
  date: dayjs.Dayjs;
  timeSlot: string;
  message: string;
};

export function ClassApplyModal({
  isOpen,
  onClose,
  classId,
}: ClassApplyModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <MenteeTheme asChild>
        <DialogContent className="flex flex-col max-w-dvw sm:max-w-fit min-h-[50vh] max-h-[80vh] overflow-y-hidden justify-between">
          <Suspense fallback={<ClassApplyModalSkeleton />}>
            <ClassApplyModalContent classId={classId} onClose={onClose} />
          </Suspense>
        </DialogContent>
      </MenteeTheme>
    </Dialog>
  );
}

function ClassApplyModalContent({
  classId,
  onClose,
}: Omit<ClassApplyModalProps, "isOpen">) {
  const { data: classDetail } = useGetClassDetail(classId);
  const { mutateAsync: applyClass } = useApplyClass();
  const [currentStep, setCurrentStep] = useState<ClassBookingStep>("details");
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>();
  const [message, setMessage] = useState("");

  const handleNext = () => {
    if (currentStep === "details") setCurrentStep("schedule");
    else if (currentStep === "schedule") setCurrentStep("message");
  };

  const handleBack = () => {
    if (currentStep === "schedule") setCurrentStep("details");
    else if (currentStep === "message") setCurrentStep("schedule");
  };

  const handleSubmit = async () => {
    if (!selectedTimeSlot) {
      toast.error("시간을 선택해주세요");
      return;
    }
    const payload: ApplyClassFormValues = {
      classId: classDetail.id,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      message,
    };
    try {
      await applyClass(payload);
      toast.success("멘토링 신청이 완료되었습니다.");
      onClose();
    } catch (e) {
      handleError(e);
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>멘토링 신청하기</DialogTitle>
        <DialogDescription>
          <StepSwitch value={currentStep}>
            <StepSwitch.Case on="schedule">
              멘토링 일정을 선택해주세요
            </StepSwitch.Case>
            <StepSwitch.Case on="message">
              멘토에게 보낼 메시지를 작성해주세요
            </StepSwitch.Case>
          </StepSwitch>
        </DialogDescription>
      </DialogHeader>
      <div className="flex-1 flex flex-col">
        <StepSwitch value={currentStep}>
          <StepSwitch.Case on="details">
            <ClassDetailsStep
              title={classDetail.title}
              mentorName={classDetail.mentor.name}
              description={classDetail.description}
              price={classDetail.price}
            />
          </StepSwitch.Case>
          <StepSwitch.Case on="schedule">
            <ScheduleStep
              availableSchedules={classDetail.availableSchedules}
              unavailableSchedules={classDetail.unavailableSchedules}
              selectedDate={selectedDate}
              selectedTimeSlot={selectedTimeSlot}
              onDateChange={setSelectedDate}
              onTimeSlotChange={setSelectedTimeSlot}
            />
          </StepSwitch.Case>
          <StepSwitch.Case on="message">
            <MessageStep message={message} onMessageChange={setMessage} />
          </StepSwitch.Case>
        </StepSwitch>
      </div>

      <DialogFooter className="flex flex-row justify-center">
        <StepSwitch value={currentStep}>
          <StepSwitch.Case on="details">
            <Button className="invisible flex-1" disabled>
              이전
            </Button>
            <Button className="flex-1" size="lg" onClick={handleNext}>
              다음
            </Button>
          </StepSwitch.Case>
          <StepSwitch.Case on="schedule">
            <Button
              className="flex-1"
              variant="outline"
              size="lg"
              onClick={handleBack}
            >
              이전
            </Button>
            <Button className="flex-1" size="lg" onClick={handleNext}>
              다음
            </Button>
          </StepSwitch.Case>
          <StepSwitch.Case on="message">
            <Button
              className="flex-1"
              variant="outline"
              size="lg"
              onClick={handleBack}
            >
              이전
            </Button>
            <Button className="flex-1" size="lg" onClick={handleSubmit}>
              신청하기
            </Button>
          </StepSwitch.Case>
        </StepSwitch>
      </DialogFooter>
    </>
  );
}

function ClassApplyModalSkeleton() {
  return (
    <>
      <DialogHeader>
        <DialogTitle>멘토링 신청하기</DialogTitle>
      </DialogHeader>
      <div className="flex-1 flex flex-col min-w-96 space-y-4">
        <Skeleton className="h-4 bg-primary/20 rounded w-3/4" />
        <Skeleton className="h-4 bg-primary/20 rounded w-1/2" />
        <Skeleton className="h-4 bg-primary/20 rounded w-2/3" />
      </div>
      <DialogFooter className="flex flex-row justify-center">
        <Skeleton className="h-10 flex-1 bg-primary/20 rounded" />
        <Skeleton className="h-10 flex-1 bg-primary/20 rounded ml-4" />
      </DialogFooter>
    </>
  );
}
