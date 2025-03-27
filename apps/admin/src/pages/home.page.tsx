export function homePageMeta() {
  return [
    { title: "DeMentor Admin" },
    { name: "description", content: "DeMentor 관리자 대시보드" },
  ];
}

export function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">관리자 대시보드</h1>
          <p className="text-gray-600 mt-2">DeMentor 플랫폼 관리 시스템</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              멘토 신청
            </h3>
            <p className="text-3xl font-bold text-blue-600">12</p>
            <p className="text-sm text-gray-500 mt-1">승인 대기중</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              문의사항
            </h3>
            <p className="text-3xl font-bold text-green-600">8</p>
            <p className="text-sm text-gray-500 mt-1">미답변</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              직무 카테고리
            </h3>
            <p className="text-3xl font-bold text-purple-600">24</p>
            <p className="text-sm text-gray-500 mt-1">등록됨</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              활성 멘토
            </h3>
            <p className="text-3xl font-bold text-orange-600">156</p>
            <p className="text-sm text-gray-500 mt-1">현재 활동중</p>
          </div>
        </div>
      </div>
    </div>
  );
}
