import { DuplicateError } from "@/app/errors/duplicate.error";
import { SignupForm } from "@/widgets/auth/signup-form";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRoutesStub } from "react-router";
import { beforeEach, describe, expect, test, vi } from "vitest";

describe("SignupForm", () => {
  const mockOnValidateNameDuplicate = vi.fn();
  const mockOnValidateEmailDuplicate = vi.fn();
  const mockOnValidateEmailAuth = vi.fn();
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
    test("최초에 닉네임 필드가 비어있으면 유효성 검사 메시지가 표시되지 않는다.", () => {
      // arrange
      const nameInput = screen.getByRole("textbox", {
        name: /닉네임/i,
      }) as HTMLInputElement;

      expect(nameInput.value).toBe("");
      expect(screen.queryByText("이미 사용중인 닉네임입니다.")).toBeNull();
      expect(screen.queryByText("이름을 입력해주세요.")).toBeNull();
    });

    test("닉네임 필드에 값을 입력한 후에 다시 비우면 '이름을 입력해주세요.' 메시지가 표시된다.", async () => {
      const nameInput = screen.getByRole("textbox", {
        name: /닉네임/i,
      }) as HTMLInputElement;

      fireEvent.change(nameInput, { target: { value: "test" } });
      fireEvent.change(nameInput, { target: { value: "" } });

      expect(await screen.findByText("이름을 입력해주세요."));
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

      mockOnValidateNameDuplicate.mockRejectedValue(new DuplicateError());

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

      mockOnValidateEmailDuplicate.mockRejectedValue(new DuplicateError());

      // act
      fireEvent.change(emailInput, { target: { value: tInputValue } });
      await userEvent.click(duplicateCheckButton);

      // assert
      expect(mockOnValidateEmailDuplicate).toHaveBeenCalledWith(tInputValue);
      expect(await screen.findByText("이미 사용중인 이메일입니다."));
    });

    // TODO: 이메일 인증 버튼 테스트
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

    test("회원가입 버튼을 누르면 회원가입 요청이 전달된다.", async () => {
      // arrange
      const signupButton = screen.getByRole("button", { name: /회원가입/i });
      const nameInput = screen.getByRole("textbox", { name: /닉네임/i });
      const nameDuplicateCheckButton = nameInput
        .closest("div")
        ?.querySelector("button") as HTMLButtonElement;
      const emailInput = screen.getByRole("textbox", { name: /이메일/i });
      const emailValidateButtons = emailInput
        .closest("div")
        ?.querySelectorAll("button") as NodeListOf<HTMLButtonElement>;
      const emailDuplicateCheckButton = emailValidateButtons[0];
      const emailAuthButton = emailValidateButtons[1];
      const passwordInput = screen.getByLabelText("비밀번호");
      const passwordConfirmInput = screen.getByLabelText("비밀번호 확인");

      // act
      fireEvent.change(nameInput, { target: { value: "test" } });
      await userEvent.click(nameDuplicateCheckButton);
      fireEvent.change(emailInput, { target: { value: "test@test.com" } });
      await userEvent.click(emailDuplicateCheckButton);
      await userEvent.click(emailAuthButton);
      fireEvent.change(passwordInput, { target: { value: "test1234!" } });
      fireEvent.change(passwordConfirmInput, {
        target: { value: "test1234!" },
      });

      await userEvent.click(signupButton);

      // assert
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });
});
