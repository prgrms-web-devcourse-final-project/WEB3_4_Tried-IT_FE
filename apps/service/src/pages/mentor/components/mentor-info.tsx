import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui";
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
  const { data: mentorInfo } = useGetMentorInfo();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">멘토 관리</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <MentorProfileSubSection mentor={mentorInfo} />
          <MentorStatsSubSection mentor={mentorInfo} />
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
