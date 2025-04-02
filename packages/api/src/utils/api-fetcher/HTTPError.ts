import { CustomError } from "ts-custom-error";

export class HTTPError extends CustomError {
  code: string;
  body?: object;

  constructor(code: string, body?: unknown) {
    if (typeof body === "string") {
      super(body);
    } else if (hasMessage(body)) {
      super(body.message);
    } else {
      super(JSON.stringify(body));
    }
    this.code = code;
    if (typeof body === "object" && body !== null) {
      this.body = body;
    }
  }

  static isHTTPError(error: unknown): error is HTTPError {
    return error instanceof HTTPError;
  }
}

function hasMessage(body: unknown): body is { message: string } {
  return typeof body === "object" && body !== null && "message" in body;
}
