export function MyPage() {
  return (
    <>
      <h1>DeMentor: Service</h1>
      <h2>My Page</h2>
      <div>
        <h2>내 정보</h2>
        <div className="flex gap-2">
          <div className="bg-gray-100 p-4 rounded-lg">
            <p>이름: 홍길동</p>
            <p>이메일: example@email.com</p>
          </div>
        </div>
      </div>
    </>
  );
}
