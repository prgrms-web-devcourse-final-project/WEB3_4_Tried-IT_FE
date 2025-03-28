import { Avatar } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import { Checkbox } from "@/shared/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/ui/pagination";
import { Typography } from "@/shared/ui/typography";
import { MoreHorizontal } from "lucide-react";

interface AppliedClassesSectionProps {
  appliedClasses: {
    id: number;
    mentor: {
      name: string;
    };
    inquiry: string;
    status: string;
    schedule: string;
  }[];
}

export function AppliedClassesSection({
  appliedClasses,
}: AppliedClassesSectionProps) {
  return (
    <div className="space-y-4">
      <Typography.H2>신청한 멘토링</Typography.H2>
      <Card className="p-0">
        <CardContent className="p-0">
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox />
                  </TableHead>
                  <TableHead className="w-12">멘토</TableHead>
                  <TableHead>문의</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead>예약일</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appliedClasses.map((session) => (
                  <TableRow key={session.id}>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
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
                          session.status === "진행중"
                            ? "default"
                            : session.status === "예약됨"
                              ? "outline"
                              : "secondary"
                        }
                      >
                        {session.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{session.schedule}</TableCell>
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
