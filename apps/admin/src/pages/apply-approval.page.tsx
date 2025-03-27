export function applyApprovalPageMeta() {
  return [
    { title: "멘토 신청 승인 - DeMentor Admin" },
    { name: "description", content: "멘토 신청 승인 관리" },
  ];
}

export function ApplyApprovalPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">멘토 신청 승인</h1>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                신청자
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                이메일
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                직무
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                신청일
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                상태
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                작업
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">홍길동</td>
              <td className="px-6 py-4 whitespace-nowrap">hong@example.com</td>
              <td className="px-6 py-4 whitespace-nowrap">프론트엔드 개발</td>
              <td className="px-6 py-4 whitespace-nowrap">2024-03-27</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                  대기중
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900 mr-3">
                  승인
                </button>
                <button className="text-red-600 hover:text-red-900">
                  거절
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
