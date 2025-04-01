import { MentorModel } from "@/entities/model/mentor/mentor.model";
import {
  Avatar,
  Badge,
  Button,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@repo/ui";

interface MentorProfileSubSectionProps {
  mentor: MentorModel;
}

export function MentorProfileSubSection({
  mentor,
}: MentorProfileSubSectionProps) {
  return (
    <div className="relative">
      <div className="absolute top-0 right-0">
        <Button variant="outline">수정</Button>
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
              <TableCell className="font-semibold">기술 스택</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-2">
                  {mentor.stackArray.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">소개</TableCell>
              <TableCell>{mentor.introduction}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">추천 대상</TableCell>
              <TableCell>{mentor.bestFor}</TableCell>
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
                  {
                    [
                      "직무",
                      "경력",
                      "현재 직장",
                      "기술 스택",
                      "소개",
                      "추천 대상",
                    ][index]
                  }
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
