export function AvailableClassesTabs() {
  return (
    <div>
      <h2>수업 목록</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-bold">React 기초</h3>
          <p>React의 기본 개념과 실습</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-bold">TypeScript 심화</h3>
          <p>TypeScript 고급 기능 학습</p>
        </div>
      </div>
    </div>
  );
}
