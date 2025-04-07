import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Typography,
} from "@repo/ui";
import { Suspense } from "react";
import { useGetMentoringPosts } from "../hooks/use-get-mentoring-posts";

export function MentoringPosts() {
  return (
    <Suspense fallback={<MentoringPostsSkeleton />}>
      <MentoringPostsContent />
    </Suspense>
  );
}

function MentoringPostsContent() {
  const { data: mentoringPosts } = useGetMentoringPosts();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">등록한 멘토링 글</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">제목</TableHead>
                <TableHead>기술 스택</TableHead>
                <TableHead className="w-[150px]">가격</TableHead>
                <TableHead className="w-[100px]">신청자 수</TableHead>
                <TableHead className="text-right w-[150px]">관리</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mentoringPosts.map((post) => (
                <TableRow key={post.classId}>
                  <TableCell>
                    <Typography.P className="font-medium">
                      {post.title}
                    </Typography.P>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-2">
                      {post.stackArray.map((tech) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{post.formattedPrice}</TableCell>
                  <TableCell>{post.menteeCount}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline">
                        수정
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-destructive"
                      >
                        삭제
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

function MentoringPostsSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">등록한 멘토링 글</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">제목</TableHead>
                <TableHead>기술 스택</TableHead>
                <TableHead className="w-[150px]">가격</TableHead>
                <TableHead className="w-[100px]">신청자 수</TableHead>
                <TableHead className="text-right w-[150px]">관리</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 3 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-5 w-48 bg-primary/10" />
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-2">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <Skeleton key={i} className="h-6 w-20 bg-primary/10" />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-24 bg-primary/10" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-8 bg-primary/10" />
                  </TableCell>
                  <TableCell className="text-right"></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
