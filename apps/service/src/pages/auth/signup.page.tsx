export function signupPageMeta() {
  return [
    { title: "Sign Up - Dementor" },
    { name: "description", content: "Sign up for Dementor" },
  ];
}

export function SignupPage() {
  return (
    <>
      <h1>DeMentor: Service</h1>
      <h2>회원가입</h2>
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
            <label className="block text-sm font-medium">비밀번호</label>
            <input
              type="password"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">비밀번호 확인</label>
            <input
              type="password"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            가입하기
          </button>
        </form>
      </div>
    </>
  );
}
