import { toast } from "@repo/ui";
import React from "react";
import { DuplicateError } from "../errors/duplicate.error";

type ToastType = "warning" | "error" | "info";

interface ErrorConfig {
  type: ToastType;
  getTitle: (error: unknown) => string;
  getMessage: (error: unknown) => string;
}

const ERROR_CONFIG: Record<string, ErrorConfig> = {
  DuplicateError: {
    type: "warning",
    getTitle: (error) => {
      if (error instanceof DuplicateError) {
        switch (error.field) {
          case "nickname":
            return "닉네임 중복 확인";
          case "email":
            return "이메일 중복 확인";
          default:
            return "중복 확인";
        }
      }
      return "중복 확인";
    },
    getMessage: (error) => {
      if (error instanceof Error) {
        return error.message;
      }
      return "중복된 값이 존재합니다.";
    },
  },
  default: {
    type: "error",
    getTitle: () => "오류가 발생했습니다.",
    getMessage: (error) =>
      error instanceof Error
        ? error.message
        : "알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
  },
};

export const handleError = (error: unknown): void => {
  const errorName = error instanceof Error ? error.constructor.name : "default";
  const config = ERROR_CONFIG[errorName] || ERROR_CONFIG.default;

  toast[config.type](config.getTitle(error), {
    description: React.createElement(
      "span",
      { className: "text-sm text-muted-foreground" },
      config.getMessage(error)
    ),
  });
};
