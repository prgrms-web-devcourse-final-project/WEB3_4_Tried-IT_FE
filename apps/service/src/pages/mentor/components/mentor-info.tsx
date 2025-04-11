import { useAuth } from "@/features/auth/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle, Typography } from "@repo/ui";
import { Suspense } from "react";
import { useGetMentorInfo } from "../hooks/use-get-mentor-info";
import {
  MentorProfileSubSection,
  MentorProfileSubSectionSkeleton,
} from "./mentor-profile-subsection";
import {
  MentorStatsSubSection,
  MentorStatsSubSectionSkeleton,
} from "./mentor-stats-subsection";

export function MentorInfo() {
  return (
    <Suspense fallback={<MentorInfoSkeleton />}>
      <MentorInfoContent />
    </Suspense>
  );
}

function MentorInfoContent() {
  const { user } = useAuth();
  const { data: mentorInfo } = useGetMentorInfo({
    memberId: user?.id,
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">멘토 관리</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {mentorInfo ? (
            <>
              <MentorProfileSubSection mentor={mentorInfo} />
              <MentorStatsSubSection mentor={mentorInfo} />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <Typography.Small>
                멘토 정보를 불러오는데 실패하였습니다.
              </Typography.Small>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function MentorInfoSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">멘토 관리</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <MentorProfileSubSectionSkeleton />
          <MentorStatsSubSectionSkeleton />
        </div>
      </CardContent>
    </Card>
  );
}
