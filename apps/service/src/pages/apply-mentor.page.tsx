export function applyMentorPageMeta() {
  return [
    { title: "Apply as Mentor - Dementor" },
    { name: "description", content: "Apply as a mentor in Dementor" },
  ];
}

export function ApplyMentorPage() {
  return (
    <>
      <h1>DeMentor: Service</h1>
      <h2>Apply as Mentor</h2>
      <div>
        <h2>멘토 신청</h2>
        <div className="max-w-md mx-auto">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium">이름</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">이메일</label>
              <input
                type="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">자기소개</label>
              <textarea
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                rows={4}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
