import {
  Pagination as PaginationWidget,
  usePagination,
} from "@/widgets/pagination";
import { StatusConst } from "@repo/api";
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardContent,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Typography,
} from "@repo/ui";
import { MoreHorizontal } from "lucide-react";
import { useGetAppliedClasses } from "../hooks/use-get-applied-classes";

export function AppliedClassesSection() {
  const paginationProps = usePagination({
    defaultPage: 1,
    defaultSize: 10,
  });
  const {
    data: { appliedClasses, pagination },
  } = useGetAppliedClasses(paginationProps);

  return (
    <div className="space-y-4">
      <Typography.H2>신청한 멘토링</Typography.H2>
      <Card className="p-0">
        <CardContent className="p-0">
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/8">멘토</TableHead>
                  <TableHead className="w-1/2">문의</TableHead>
                  <TableHead className="w-1/8">상태</TableHead>
                  <TableHead className="w-1/8">예약일</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appliedClasses?.map((session) => (
                  <TableRow key={session.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <div className="flex h-full w-full items-center justify-center bg-muted text-xs">
                            {session.mentor.name.charAt(0)}
                          </div>
                        </Avatar>
                        <div className="grid gap-0.5 text-xs">
                          <div className="font-medium">
                            {session.mentor.name}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{session.inquiry}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          session.status === StatusConst.APPROVED
                            ? "default"
                            : session.status === StatusConst.PENDING
                              ? "outline"
                              : "secondary"
                        }
                      >
                        {session.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {session.scheduleFormatter.fullDateTime}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          수정
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">더 보기</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>상세 보기</DropdownMenuItem>
                            <DropdownMenuItem>일정 변경</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              취소하기
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="flex items-center justify-center py-4">
              <PaginationWidget
                pagination={pagination}
                onPageChange={paginationProps.setPage}
                onSizeChange={paginationProps.setSize}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

AppliedClassesSection.Skeleton = AppliedClassesSectionSkeleton;

function AppliedClassesSectionSkeleton() {
  return (
    <div className="space-y-4">
      <Typography.H2>신청한 멘토링</Typography.H2>
      <Card className="p-0">
        <CardContent className="p-0">
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/8">멘토</TableHead>
                  <TableHead className="w-1/2">문의</TableHead>
                  <TableHead className="w-1/8">상태</TableHead>
                  <TableHead className="w-1/8">예약일</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 4 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-8 w-8 rounded-full bg-primary/10" />
                        <Skeleton className="h-4 w-20 bg-primary/10" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-40 bg-primary/10" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-16 bg-primary/10" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-32 bg-primary/10" />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Skeleton className="h-8 w-16 bg-primary/10" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="flex items-center justify-center py-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
