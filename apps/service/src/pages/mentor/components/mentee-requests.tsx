import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui";

export default function MenteeRequests() {
  // 실제 구현에서는 API에서 멘티 신청 목록을 가져올 것입니다
  const menteeRequests = [
    {
      id: 1,
      date: "2023-05-10 14:00",
      mentee: {
        name: "John Doe",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      inquiry: "React 상태 관리에 대해 질문이 있습니다",
      status: "대기중",
    },
    {
      id: 2,
      date: "2023-05-12 15:30",
      mentee: {
        name: "Jane Doe",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      inquiry: "프론트엔드 개발자 커리어 상담",
      status: "승인",
    },
    {
      id: 3,
      date: "2023-05-15 10:00",
      mentee: {
        name: "Kim Smith",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      inquiry: "Next.js 프로젝트 구조에 대한 조언",
      status: "대기중",
    },
  ];

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
                <TableHead>신청한 날짜&시간</TableHead>
                <TableHead>멘티</TableHead>
                <TableHead>문의내용</TableHead>
                <TableHead className="text-center">상태</TableHead>
                <TableHead className="text-center">관리</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {menteeRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.date}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={request.mentee.avatar}
                          alt={request.mentee.name}
                        />
                        <AvatarFallback>
                          {request.mentee.name.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <span>{request.mentee.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{request.inquiry}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        request.status === "승인" ? "outline" : "secondary"
                      }
                    >
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant="outline" className="cursor-pointer">
                      관리
                    </Badge>
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
