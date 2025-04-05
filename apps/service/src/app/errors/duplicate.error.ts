export type DuplicateField = "nickname" | "email";

function getDuplicateErrorMessage(field: DuplicateField): string {
  const messages = {
    nickname: "이미 사용 중인 닉네임입니다.",
    email: "이미 가입된 이메일입니다.",
  };
  return messages[field];
}

export class DuplicateError extends Error {
  constructor(
    public field: DuplicateField,
    message?: string
  ) {
    super(message || getDuplicateErrorMessage(field));
    this.name = "DuplicateError";
  }
}
