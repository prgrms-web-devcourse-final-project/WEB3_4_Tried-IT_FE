import { LoginForm } from "@/widgets/auth/login-form";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { beforeEach, describe, expect, test, vi } from "vitest";

describe("LoginForm", () => {
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();

    const RoutesStub = createRoutesStub([
      {
        path: "/",
        Component: () => <LoginForm onSubmit={mockOnSubmit} />,
      },
    ]);

    render(<RoutesStub initialEntries={["/"]} />);
  });

  test("이메일 및 비밀번호 입력 필드가 렌더링되는지 확인", () => {
    expect(screen.getByLabelText("이메일"));
    expect(screen.getByLabelText("비밀번호"));
    expect(screen.getByRole("button", { name: "로그인" }));
    expect(screen.getByRole("link", { name: "회원가입" }));
  });

  test("유효하지 않은 이메일 형식에 대한 유효성 검사", async () => {
    const emailInput = screen.getByLabelText("이메일");

    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(screen.getByText("이메일 형식이 올바르지 않습니다."));
    });
  });

  test("비밀번호 길이 유효성 검사", async () => {
    const passwordInput = screen.getByLabelText("비밀번호");
    fireEvent.change(passwordInput, { target: { value: "short1!" } });
    fireEvent.blur(passwordInput);

    await waitFor(() => {
      expect(screen.getByText("비밀번호는 8자 이상이어야 합니다."));
    });
  });

  test("비밀번호 형식 유효성 검사", async () => {
    const passwordInput = screen.getByLabelText("비밀번호");
    fireEvent.change(passwordInput, { target: { value: "password12345" } });
    fireEvent.blur(passwordInput);

    await waitFor(() => {
      expect(
        screen.getByText("비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.")
      );
    });
  });

  test("유효한 데이터로 폼 제출 시 onSubmit 함수 호출", async () => {
    const emailInput = screen.getByLabelText("이메일");
    const passwordInput = screen.getByLabelText("비밀번호");
    const submitButton = screen.getByRole("button", { name: "로그인" });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "Valid123!" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        "test@example.com",
        "Valid123!"
      );
    });
  });

  test("유효하지 않은 데이터로 폼 제출 시 onSubmit 함수 호출되지 않음", async () => {
    const emailInput = screen.getByLabelText("이메일");
    const passwordInput = screen.getByLabelText("비밀번호");
    const submitButton = screen.getByRole("button", { name: "로그인" });

    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.change(passwordInput, { target: { value: "short" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });
});
