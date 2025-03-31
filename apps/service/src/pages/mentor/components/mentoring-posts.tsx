import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui";

export default function MentoringPosts() {
  // 실제 구현에서는 API에서 멘토링 글 목록을 가져올 것입니다
  const mentoringPosts = [
    {
      id: 1,
      registrationDate: "2023-03-15",
      content: "프론트엔드 개발 멘토링",
    },
    {
      id: 2,
      registrationDate: "2023-04-20",
      content: "React 프로젝트 코드 리뷰",
    },
  ];

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
                <TableHead className="w-[150px]">등록일</TableHead>
                <TableHead>멘토링 내용</TableHead>
                <TableHead className="text-right w-[150px]">관리</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mentoringPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>{post.registrationDate}</TableCell>
                  <TableCell>{post.content}</TableCell>
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
