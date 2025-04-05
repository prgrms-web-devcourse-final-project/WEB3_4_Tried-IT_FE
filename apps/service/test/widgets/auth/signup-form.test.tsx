import { DuplicateError } from "@/app/errors/duplicate.error";
import { SignupForm } from "@/widgets/auth/signup-form";
import userEvent from "@testing-library/user-event";
import { createRoutesStub } from "react-router";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen } from "../../test-utils";

// matchMedia mock 설정
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe("SignupForm", () => {
  const mockOnValidateNameDuplicate = vi.fn();
  const mockOnValidateEmailDuplicate = vi.fn();
  const mockOnValidateEmailAuth = vi.fn();
  const mockOnValidateEmailVerifyCode = vi.fn();
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();

    const RoutesStub = createRoutesStub([
      {
        path: "/",
        Component: () => (
          <SignupForm
            onValidateNicknameDuplicate={mockOnValidateNameDuplicate}
            onValidateEmailDuplicate={mockOnValidateEmailDuplicate}
            onValidateEmailAuth={mockOnValidateEmailAuth}
            onValidateEmailVerifyCode={mockOnValidateEmailVerifyCode}
            onSubmit={mockOnSubmit}
          />
        ),
      },
    ]);

    render(<RoutesStub initialEntries={["/"]} />);
  });

  describe("필드 표시 테스트", () => {
    test("닉네임 필드가 표시된다", () => {
      expect(screen.getByRole("textbox", { name: /닉네임/i }));
    });

    test("이메일 필드가 표시된다.", () => {
      expect(screen.getByRole("textbox", { name: /이메일/i }));
    });

    test("비밀번호 필드가 표시된다.", () => {
      expect(screen.getByLabelText("비밀번호"));
    });

    test("비밀번호 확인 필드가 표시된다.", () => {
      expect(screen.getByLabelText("비밀번호 확인"));
    });
  });

  describe("닉네임 유효 검사", () => {
    const duplicationErrorMessage = "이미 사용중인 닉네임입니다.";
    const emptyErrorMessage = "닉네임을 입력해주세요.";

    test("최초에 닉네임 필드가 비어있으면 유효성 검사 메시지가 표시되지 않는다.", () => {
      // arrange
      const nameInput = screen.getByRole("textbox", {
        name: /닉네임/i,
      }) as HTMLInputElement;

      expect(nameInput.value).toBe("");
      expect(screen.queryByText(duplicationErrorMessage)).toBeNull();
      expect(screen.queryByText(emptyErrorMessage)).toBeNull();
    });

    test(`닉네임 필드에 값을 입력한 후에 다시 비우면 '${emptyErrorMessage}' 메시지가 표시된다.`, async () => {
      const nameInput = screen.getByRole("textbox", {
        name: /닉네임/i,
      }) as HTMLInputElement;

      fireEvent.change(nameInput, { target: { value: "test" } });
      fireEvent.change(nameInput, { target: { value: "" } });

      expect(await screen.findByText(emptyErrorMessage));
    });

    test("닉네임 필드에 이미 존재하는 닉네임을 입력한 후에 중복 확인 버튼을 누르면 '이미 사용중인 닉네임입니다.' 메시지가 표시된다.", async () => {
      // arrange
      const tInputValue = "test";
      const nameInput = screen.getByRole("textbox", {
        name: /닉네임/i,
      }) as HTMLInputElement;

      const duplicateCheckButton = nameInput
        .closest("div")
        ?.querySelector("button") as HTMLButtonElement;

      mockOnValidateNameDuplicate.mockRejectedValue(
        new DuplicateError("nickname")
      );

      // act
      fireEvent.change(nameInput, { target: { value: tInputValue } });
      await userEvent.click(duplicateCheckButton);

      // assert

      expect(mockOnValidateNameDuplicate).toHaveBeenCalledWith(tInputValue);
      expect(await screen.findByText("이미 사용중인 닉네임입니다."));
    });
  });

  describe("이메일 유효 검사", () => {
    test("최초에 이메일 필드가 비어있으면 유효성 검사 메시지가 표시되지 않는다.", () => {
      // arrange
      const emailInput = screen.getByRole("textbox", {
        name: /이메일/i,
      }) as HTMLInputElement;

      // assert
      expect(emailInput.value).toBe("");
      expect(screen.queryByText("이미 사용중인 이메일입니다.")).toBeNull();
      expect(screen.queryByText("이메일을 입력해주세요.")).toBeNull();
    });

    test("이메일 필드에 값을 입력한 후에 다시 비우면 '이메일을 입력해주세요.' 메시지가 표시된다.", async () => {
      // arrange
      const emailInput = screen.getByRole("textbox", {
        name: /이메일/i,
      }) as HTMLInputElement;

      // act

      fireEvent.change(emailInput, { target: { value: "test@test.com" } });

      fireEvent.change(emailInput, { target: { value: "" } });

      // assert
      expect(emailInput.value).toBe("");
      expect(await screen.findByText("이메일을 입력해주세요."));
    });

    test("이메일 필드에 이미 존재하는 이메일을 입력한 후에 중복 확인 버튼을 누르면 '이미 사용중인 이메일입니다.' 메시지가 표시된다.", async () => {
      // arrange
      const tInputValue = "test@test.com";
      const emailInput = screen.getByRole("textbox", {
        name: /이메일/i,
      }) as HTMLInputElement;

      const buttons = emailInput
        .closest("div")
        ?.querySelectorAll("button") as NodeListOf<HTMLButtonElement>;
      const duplicateCheckButton = buttons[0];

      mockOnValidateEmailDuplicate.mockRejectedValue(
        new DuplicateError("email")
      );

      // act
      fireEvent.change(emailInput, { target: { value: tInputValue } });
      await userEvent.click(duplicateCheckButton);

      // assert
      expect(mockOnValidateEmailDuplicate).toHaveBeenCalledWith(tInputValue);
      expect(await screen.findByText("이미 사용중인 이메일입니다."));
    });

    test("이메일 인증 버튼을 클릭하면 이메일 인증 요청이 전달된다.", async () => {
      // arrange
      const tInputValue = "test@test.com";
      const emailInput = screen.getByRole("textbox", {
        name: /이메일/i,
      }) as HTMLInputElement;

      const buttons = emailInput
        .closest("div")
        ?.querySelectorAll("button") as NodeListOf<HTMLButtonElement>;
      const emailAuthButton = buttons[1];

      // act
      fireEvent.change(emailInput, { target: { value: tInputValue } });
      await userEvent.click(emailAuthButton);

      // assert
      expect(mockOnValidateEmailAuth).toHaveBeenCalledWith(tInputValue);
    });

    test("이메일 인증 버튼을 클릭하면 이메일 인증 모달이 표시된다.", async () => {
      // arrange
      const tInputValue = "test@test.com";
      const emailInput = screen.getByRole("textbox", {
        name: /이메일/i,
      }) as HTMLInputElement;

      const buttons = emailInput
        .closest("div")
        ?.querySelectorAll("button") as NodeListOf<HTMLButtonElement>;
      const emailAuthButton = buttons[1];

      // act
      fireEvent.change(emailInput, { target: { value: tInputValue } });
      await userEvent.click(emailAuthButton);

      // assert
      expect(mockOnValidateEmailAuth).toHaveBeenCalledWith(tInputValue);
      expect(
        await screen.findByText(
          `${tInputValue} 이메일로 인증코드가 전송되었습니다. 전달받은 인증 코드를 입력해주세요.`
        )
      );
    });

    test("이메일 인증 코드가 성공적으로 검증되면 verifyCode 필드가 업데이트된다.", async () => {
      // arrange
      const tInputValue = "test@test.com";
      const tVerifyCode = "123456";
      const emailInput = screen.getByRole("textbox", {
        name: /이메일/i,
      }) as HTMLInputElement;

      fireEvent.change(emailInput, { target: { value: tInputValue } });
      const buttons = emailInput
        .closest("div")
        ?.querySelectorAll("button") as NodeListOf<HTMLButtonElement>;
      const emailAuthButton = buttons[1];

      mockOnValidateEmailVerifyCode.mockResolvedValue(undefined);

      // act
      await userEvent.click(emailAuthButton);

      const verifyEmailModal = await screen.findByText(
        `${tInputValue} 이메일로 인증코드가 전송되었습니다. 전달받은 인증 코드를 입력해주세요.`
      );
      expect(verifyEmailModal).toBeTruthy();

      const verifyCodeInput = screen.getByRole("textbox", {
        name: /인증 코드/i,
      }) as HTMLInputElement;
      fireEvent.change(verifyCodeInput, { target: { value: tVerifyCode } });

      const verifyButton = screen.getByRole("button", {
        name: /인증/i,
      });
      await userEvent.click(verifyButton);

      // assert
      expect(mockOnValidateEmailVerifyCode).toHaveBeenCalledWith(
        tInputValue,
        tVerifyCode
      );
    });

    test("이메일 인증 코드 검증이 실패하면 에러 메시지가 표시된다.", async () => {
      // arrange
      const tInputValue = "test@test.com";
      const tVerifyCode = "123456";
      const emailInput = screen.getByRole("textbox", {
        name: /이메일/i,
      }) as HTMLInputElement;

      fireEvent.change(emailInput, { target: { value: tInputValue } });
      const buttons = emailInput
        .closest("div")
        ?.querySelectorAll("button") as NodeListOf<HTMLButtonElement>;
      const emailAuthButton = buttons[1];

      mockOnValidateEmailVerifyCode.mockRejectedValue(new Error("인증 실패"));

      // act
      await userEvent.click(emailAuthButton);

      const verifyEmailModal = await screen.findByText(
        `${tInputValue} 이메일로 인증코드가 전송되었습니다. 전달받은 인증 코드를 입력해주세요.`
      );
      expect(verifyEmailModal).toBeTruthy();

      const verifyCodeInput = screen.getByRole("textbox", {
        name: /인증 코드/i,
      }) as HTMLInputElement;
      fireEvent.change(verifyCodeInput, { target: { value: tVerifyCode } });

      const verifyButton = screen.getByRole("button", {
        name: /인증/i,
      });
      await userEvent.click(verifyButton);

      // assert
      expect(mockOnValidateEmailVerifyCode).toHaveBeenCalledWith(
        tInputValue,
        tVerifyCode
      );
      expect(await screen.findByText("오류가 발생했습니다."));
    });
  });

  describe("비밀번호 유효 검사", () => {
    test("최초에 비밀번호 필드가 비어있으면 유효성 검사 메시지가 표시되지 않는다.", () => {
      // arrange
      const passwordInput = screen.getByLabelText(
        "비밀번호"
      ) as HTMLInputElement;

      // assert
      expect(passwordInput.value).toBe("");
      expect(screen.queryByText("비밀번호를 입력해주세요.")).toBeNull();
    });

    test("비밀번호 필드에 값을 입력한 후에 다시 비우면 '비밀번호를 입력해주세요.' 메시지가 표시된다.", async () => {
      // arrange
      const passwordInput = screen.getByLabelText(
        "비밀번호"
      ) as HTMLInputElement;

      // act
      fireEvent.change(passwordInput, { target: { value: "test" } });
      fireEvent.change(passwordInput, { target: { value: "" } });

      // assert
      expect(await screen.findByText("비밀번호를 입력해주세요."));
    });

    test.each`
      password               | expectedMessage
      ${"test"}              | ${"비밀번호는 8자 이상이어야 합니다."}
      ${"test123"}           | ${"비밀번호는 8자 이상이어야 합니다."}
      ${"test@test.com"}     | ${"비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다."}
      ${"12345678910111213"} | ${"비밀번호는 16자 이하여야 합니다."}
    `(
      "비밀번호 필드에 $password를 입력한 후에 유효성 검사 메시지가 $expectedMessage가 표시된다.",
      async ({ password, expectedMessage }) => {
        // arrange
        const passwordInput = screen.getByLabelText(
          "비밀번호"
        ) as HTMLInputElement;
        fireEvent.change(passwordInput, { target: { value: "initial-value" } });

        // act

        fireEvent.change(passwordInput, { target: { value: password } });

        // assert
        expect(await screen.findByText(expectedMessage));
      }
    );

    test("정상적인 비밀번호를 입력한 후에 유효성 검사 메시지가 표시되지 않는다.", async () => {
      // arrange
      const passwordInput = screen.getByLabelText(
        "비밀번호"
      ) as HTMLInputElement;
      const tInputValue = "test1234!";

      // act
      fireEvent.change(passwordInput, { target: { value: tInputValue } });

      // assert
      expect(screen.queryByText("비밀번호를 입력해주세요.")).toBeNull();
      expect(
        screen.queryByText("비밀번호는 8자 이상이어야 합니다.")
      ).toBeNull();
      expect(screen.queryByText("비밀번호는 16자 이하여야 합니다.")).toBeNull();
      expect(
        screen.queryByText("비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.")
      ).toBeNull();
    });
  });

  describe("비밀번호 확인 유효 검사", () => {
    test("최초에 비밀번호 확인 필드가 비어있으면 유효성 검사 메시지가 표시되지 않는다.", () => {
      // arrange
      const passwordConfirmInput = screen.getByLabelText(
        "비밀번호 확인"
      ) as HTMLInputElement;

      // assert
      expect(passwordConfirmInput.value).toBe("");
      expect(screen.queryByText("비밀번호 확인을 입력해주세요.")).toBeNull();
    });

    test("비밀번호 확인 필드에 값을 입력한 후에 다시 비우면 '비밀번호 확인을 입력해주세요.' 메시지가 표시된다.", async () => {
      // arrange
      const passwordConfirmInput = screen.getByLabelText(
        "비밀번호 확인"
      ) as HTMLInputElement;

      // act
      fireEvent.change(passwordConfirmInput, { target: { value: "test" } });
      fireEvent.change(passwordConfirmInput, { target: { value: "" } });

      // assert
      expect(await screen.findByText("비밀번호 확인을 입력해주세요."));
    });

    test("비밀번호 확인 필드에 비밀번호 필드와 다른 값을 입력한 후에 유효성 검사 메시지가 표시된다.", async () => {
      // arrange
      const passwordInput = screen.getByLabelText(
        "비밀번호"
      ) as HTMLInputElement;
      const passwordConfirmInput = screen.getByLabelText(
        "비밀번호 확인"
      ) as HTMLInputElement;

      // act
      fireEvent.change(passwordInput, { target: { value: "test1234!" } });
      fireEvent.change(passwordConfirmInput, {
        target: { value: "test12345!" },
      });

      // assert
      expect(await screen.findByText("비밀번호가 일치하지 않습니다."));
    });

    test("비밀번호 확인 필드에 비밀번호 필드와 같은 값을 입력한 후에 유효성 검사 메시지가 표시되지 않는다.", async () => {
      // arrange
      const passwordInput = screen.getByLabelText(
        "비밀번호"
      ) as HTMLInputElement;
      const passwordConfirmInput = screen.getByLabelText(
        "비밀번호 확인"
      ) as HTMLInputElement;

      // act
      fireEvent.change(passwordInput, { target: { value: "test1234!" } });
      fireEvent.change(passwordConfirmInput, {
        target: { value: "test1234!" },
      });

      // assert
      expect(screen.queryByText("비밀번호가 일치하지 않습니다.")).toBeNull();
    });
  });

  describe("모든 필드가 정상적으로 입력되면 회원가입 버튼을 누르면 회원가입 요청이 전달된다.", () => {
    test("아직 모든 필드의 유효성 검사가 완료되지 않았으면 회원가입 버튼을 누르면 회원가입 요청이 전달되지 않는다.", async () => {
      // arrange
      const signupButton = screen.getByRole("button", { name: /회원가입/i });

      // act
      await userEvent.click(signupButton);

      // assert
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    // TODO: 모든 필드의 유효성 검사가 완료되면 회원가입 버튼을 누르면 회원가입 요청이 전달된다.
  });
});
