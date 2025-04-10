import {
  MentorClassCreateForm,
  MentorClassCreateFormValues,
} from "@/widgets/mentor/mentor-class-create-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  ScrollArea,
} from "@repo/ui";

export interface MentorClassCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: MentorClassCreateFormValues) => Promise<void>;
}

export function MentorClassCreateModal({
  isOpen,
  onClose,
  onSubmit,
}: MentorClassCreateModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <ScrollArea className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>수업 생성</DialogTitle>
          </DialogHeader>
          <div className="overflow-y-auto">
            <MentorClassCreateForm onSubmit={onSubmit} />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
