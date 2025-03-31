import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@repo/ui";

export default function MentorInfo() {
  const mentorInfo = {
    position: "소프트웨어 개발자",
    experience: "5년",
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">멘토 관리</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative py-2">
            <div className="absolute top-0 right-0">
              <Button variant="outline">수정</Button>
            </div>
            <h3 className="text-lg font-medium mb-2">멘토정보</h3>
            <div className="rounded-md p-4">
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-semibold w-24">직무</TableCell>
                    <TableCell>{mentorInfo.position}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">경력</TableCell>
                    <TableCell>{mentorInfo.experience}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
