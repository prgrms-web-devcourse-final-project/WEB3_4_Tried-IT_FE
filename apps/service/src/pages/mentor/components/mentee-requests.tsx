import {
  Pagination as PaginationWidget,
  usePagination,
} from "@/widgets/pagination";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
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
} from "@repo/ui";
import { Suspense } from "react";
import { useGetMenteeRequests } from "../hooks/use-get-mentee-requests";
import { MenteeRequestDialog } from "./mentee-request-dialog";

export function MenteeRequests() {
  return (
    <Suspense fallback={<MenteeRequestsSkeleton />}>
      <MenteeRequestsContent />
    </Suspense>
  );
}

function MenteeRequestsContent() {
  const { size, page, setPage, setSize } = usePagination();
  const {
    data: { applyments, pagination },
  } = useGetMenteeRequests(page, size);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">신청한 멘티관리</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">신청한 날짜&시간</TableHead>
                <TableHead className="w-[100px]">멘티</TableHead>
                <TableHead className="w-[300px]">문의내용</TableHead>
                <TableHead className="w-[100px] text-center">상태</TableHead>
                <TableHead className="w-[100px] text-center">관리</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applyments.map((request) => (
                <TableRow key={request.applymentId}>
                  <TableCell>
                    {request.scheduleFormatter.fullDateTime}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={`/placeholder.svg?height=40&width=40`}
                          alt={request.nickname}
                        />
                        <AvatarFallback>
                          {request.nicknameInitials}
                        </AvatarFallback>
                      </Avatar>
                      <span>{request.nickname}</span>
                    </div>
                  </TableCell>
                  <TableCell>{request.inquiry}</TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant={
                        request.isApproved
                          ? "default"
                          : request.isRejected
                            ? "destructive"
                            : "secondary"
                      }
                      className={request.isApproved ? "bg-green-500" : ""}
                    >
                      {request.statusText}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <MenteeRequestDialog
                      menteeRequest={request}
                      trigger={
                        <Button variant="outline" className="cursor-pointer">
                          관리
                        </Button>
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex items-center justify-center py-4">
            <PaginationWidget
              pagination={pagination}
              onPageChange={setPage}
              onSizeChange={setSize}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function MenteeRequestsSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">신청한 멘티관리</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">신청한 날짜&시간</TableHead>
                <TableHead className="w-[200px]">멘티</TableHead>
                <TableHead className="w-[300px]">문의내용</TableHead>
                <TableHead className="w-[100px] text-center">상태</TableHead>
                <TableHead className="w-[100px] text-center">관리</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 3 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-5 w-48 bg-primary/10" />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-8 w-8 rounded-full bg-primary/10" />
                      <Skeleton className="h-5 w-24 bg-primary/10" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-48 bg-primary/10" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-16 bg-primary/10" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Skeleton className="h-6 w-16 bg-primary/10" />
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
  );
}
