import { MentorModel } from "@/entities/model/mentor/mentor.model";
import { Progress, Skeleton, Typography } from "@repo/ui";

interface MentorStatsSubSectionProps {
  mentor: MentorModel;
}

export function MentorStatsSubSection({ mentor }: MentorStatsSubSectionProps) {
  return (
    <div className="relative">
      <h3 className="text-lg font-medium mb-4">멘토링 현황</h3>
      <div className="rounded-md p-4 space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <Typography.Muted>멘토링 완료율</Typography.Muted>
            <Typography.Muted>{mentor.completionRate}%</Typography.Muted>
          </div>
          <Progress value={mentor.completionRate} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-muted">
            <Typography.H4>{mentor.totalClasses}</Typography.H4>
            <Typography.Muted>전체 멘토링</Typography.Muted>
          </div>
          <div className="p-4 rounded-lg bg-muted">
            <Typography.H4>{mentor.completedSessions}</Typography.H4>
            <Typography.Muted>완료된 멘토링</Typography.Muted>
          </div>
        </div>
        {mentor.hasPendingRequests && (
          <div className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700">
            <Typography.H4 className="text-yellow-800 dark:text-yellow-200 animate-pulse">
              {mentor.pendingRequests}개의 승인 대기 요청
            </Typography.H4>
            <Typography.Muted className="text-yellow-700 dark:text-yellow-300">
              멘토링 요청을 확인해주세요
            </Typography.Muted>
          </div>
        )}
      </div>
    </div>
  );
}

export function MentorStatsSubSectionSkeleton() {
  return (
    <div className="relative">
      <h3 className="text-lg font-medium mb-4">멘토링 현황</h3>
      <div className="rounded-md p-4 space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <Typography.Muted>멘토링 완료율</Typography.Muted>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <Progress value={0} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-muted">
            <Skeleton className="h-4 w-4 mb-2 bg-primary/10" />
            <Typography.Muted>전체 멘토링</Typography.Muted>
          </div>
          <div className="p-4 rounded-lg bg-muted">
            <Skeleton className="h-4 w-4 mb-2 bg-primary/10" />
            <Typography.Muted>완료된 멘토링</Typography.Muted>
          </div>
        </div>
        <div className="p-4 rounded-lg ">
          <Skeleton className="h-8 w-48 bg-transparent mb-2" />
          <Skeleton className="h-5 w-64 bg-transparent" />
        </div>
      </div>
    </div>
  );
}
