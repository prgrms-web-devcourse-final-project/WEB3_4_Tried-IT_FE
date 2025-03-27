export function mentorDashboardPageMeta() {
  return [
    { title: "Mentor Dashboard - Dementor" },
    { name: "description", content: "Mentor Dashboard in Dementor" },
  ];
}

export function MentorDashboardPage() {
  return (
    <>
      <h1>DeMentor: Service</h1>
      <h2>멘토 대시보드</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-4">현재 수업</h3>
          <div className="space-y-2">
            <p>진행중인 수업: 2개</p>
            <p>예정된 수업: 3개</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-4">학생 현황</h3>
          <div className="space-y-2">
            <p>전체 학생: 15명</p>
            <p>활성 학생: 12명</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-4">수업 요청</h3>
          <div className="space-y-2">
            <p>새로운 요청: 3개</p>
            <p>대기중인 요청: 2개</p>
          </div>
        </div>
      </div>
    </>
  );
}
