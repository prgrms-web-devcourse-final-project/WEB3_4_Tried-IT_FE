import { useAuth } from "@/features/auth/hooks/use-auth";
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
import { MentoringPostDeleteDialog } from "./mentoring-post-delete-dialog";
import { MentoringPostEditDialog } from "./mentoring-post-edit-dialog";

export function MentoringPosts() {
  return (
    <Suspense fallback={<MentoringPostsSkeleton />}>
      <MentoringPostsContent />
    </Suspense>
  );
}

function MentoringPostsContent() {
  const { user } = useAuth();
  const { data: mentoringPosts } = useGetMentoringPosts({
    memberId: user?.id,
  });

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
                <TableHead className="text-right w-[150px]">관리</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mentoringPosts?.map((post) => (
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
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <MentoringPostEditDialog
                        post={post}
                        trigger={
                          <Button size="sm" variant="outline">
                            수정
                          </Button>
                        }
                      />
                      <MentoringPostDeleteDialog
                        post={post}
                        trigger={
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-destructive"
                          >
                            삭제
                          </Button>
                        }
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}

              {/* 멘토링 포스트가 없는 경우 */}
              {(!mentoringPosts || mentoringPosts.length === 0) && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-10">
                    <div className="flex flex-col items-center">
                      <Typography.P className="text-muted-foreground mb-2">
                        등록된 멘토링 글이 없습니다
                      </Typography.P>
                      <Typography.Small className="text-muted-foreground/70">
                        멘토링 글을 등록하여 멘티들에게 멘토링을 제공해보세요
                      </Typography.Small>
                    </div>
                  </TableCell>
                </TableRow>
              )}
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
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Skeleton className="h-8 w-16 bg-primary/10" />
                      <Skeleton className="h-8 w-16 bg-primary/10" />
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
