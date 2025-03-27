export function homePageMeta() {
  return [
    { title: "DeMentor - 온라인 멘토링 플랫폼" },
    { name: "description", content: "DeMentor에서 나만의 멘토를 찾아보세요!" },
  ];
}

export function HomePage() {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">DeMentor</h1>
          <p className="text-xl text-gray-600">
            당신의 성장을 위한 최고의 멘토링 플랫폼
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-blue-500 text-2xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-2">맞춤형 멘토링</h3>
            <p className="text-gray-600">
              당신의 목표와 수준에 맞는 최적의 멘토를 찾아보세요
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-blue-500 text-2xl mb-4">💡</div>
            <h3 className="text-xl font-semibold mb-2">실전 경험</h3>
            <p className="text-gray-600">
              현업 전문가들의 실제 경험을 바탕으로 한 실전적인 학습
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-blue-500 text-2xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold mb-2">성장의 기회</h3>
            <p className="text-gray-600">
              지속적인 피드백과 함께 성장할 수 있는 환경
            </p>
          </div>
        </div>

        <div className="text-center">
          <a
            href="/available-classes"
            className="inline-block bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            수업 둘러보기
          </a>
        </div>
      </div>
    </div>
  );
}
