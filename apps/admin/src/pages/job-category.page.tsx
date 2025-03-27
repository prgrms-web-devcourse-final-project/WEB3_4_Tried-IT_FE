export function jobCategoryPageMeta() {
  return [
    { title: "직무 카테고리 관리 - DeMentor Admin" },
    { name: "description", content: "직무 카테고리 관리 페이지" },
  ];
}

export function JobCategoryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">직무 카테고리 관리</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          새 카테고리 추가
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold">프론트엔드 개발</h3>
              <p className="text-sm text-gray-500">활성 멘토: 45명</p>
            </div>
            <div className="flex gap-2">
              <button className="text-gray-600 hover:text-gray-900">
                수정
              </button>
              <button className="text-red-600 hover:text-red-900">삭제</button>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            웹 프론트엔드 개발 관련 멘토링
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold">백엔드 개발</h3>
              <p className="text-sm text-gray-500">활성 멘토: 38명</p>
            </div>
            <div className="flex gap-2">
              <button className="text-gray-600 hover:text-gray-900">
                수정
              </button>
              <button className="text-red-600 hover:text-red-900">삭제</button>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            서버 사이드 개발 관련 멘토링
          </div>
        </div>
      </div>
    </div>
  );
}
