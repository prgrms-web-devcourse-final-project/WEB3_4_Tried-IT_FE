import { useGetClassDetail } from "@/pages/available-classes/hooks/useGetClassDetail";
import { createTypedSwitch } from "@/shared/components/switch";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/ui";
import { useState } from "react";
import { ClassDetailsStep, MessageStep, ScheduleStep } from "./steps";

type ClassBookingStep = "details" | "schedule" | "message";

interface ClassApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  classId: number;
}

const StepSwitch = createTypedSwitch<ClassBookingStep>();

export function ClassApplyModal({
  isOpen,
  onClose,
  classId,
}: ClassApplyModalProps) {
  const { data: classDetail } = useGetClassDetail(classId);
  const [currentStep, setCurrentStep] = useState<ClassBookingStep>("details");
  const [selectedDate, setSelectedDate] = useState<string>("");
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

  const handleSubmit = () => {
    // TODO: 멘토링 신청 API 호출
    const payload = {
      classId: classDetail.id,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      message,
    };
    alert(`TODO: 멘토링 신청: ${JSON.stringify(payload)}`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>멘토링 신청하기</DialogTitle>
          <DialogDescription>
            <StepSwitch value={currentStep}>
              <StepSwitch.Case on="details">
                클래스 정보를 확인해주세요
              </StepSwitch.Case>
              <StepSwitch.Case on="schedule">
                멘토링 일정을 선택해주세요
              </StepSwitch.Case>
              <StepSwitch.Case on="message">
                멘토에게 보낼 메시지를 작성해주세요
              </StepSwitch.Case>
            </StepSwitch>
          </DialogDescription>
        </DialogHeader>

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

        <DialogFooter className="flex justify-between mt-6">
          <StepSwitch value={currentStep}>
            <StepSwitch.Case on="details">
              <div className="flex-1" />
              <Button onClick={handleNext}>다음</Button>
            </StepSwitch.Case>
            <StepSwitch.Case on="schedule">
              <Button variant="outline" onClick={handleBack}>
                이전
              </Button>
              <div className="flex-1" />
              <Button onClick={handleNext}>다음</Button>
            </StepSwitch.Case>
            <StepSwitch.Case on="message">
              <Button variant="outline" onClick={handleBack}>
                이전
              </Button>
              <div className="flex-1" />
              <Button onClick={handleSubmit}>신청하기</Button>
            </StepSwitch.Case>
          </StepSwitch>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
