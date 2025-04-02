import { HTTPError } from "../utils/api-fetcher/HTTPError";

export class ServiceError extends Error {
  readonly code: number | string;

  constructor(code: number | string, message: string) {
    super(message);
    this.code = code;
  }

  static byHTTPError(error: HTTPError) {
    return ServiceError.byCode(error.code, error.message);
  }

  static byCode(code: string | number, message: string) {
    const codeNumber = Number(code);
    switch (codeNumber) {
      case 400:
        return ServiceError.badRequest(message);
      case 401:
        return ServiceError.unauthorized(message);
      case 403:
        return ServiceError.forbidden(message);
      case 404:
        return ServiceError.notFound(message);
      case 409:
        return ServiceError.conflict(message);
      case 500:
        return ServiceError.internalServerError(message);
      default:
        console.error(`Unknown error code: ${code}`);
        return new ServiceError(code, message);
    }
  }

  static badRequest(message: string) {
    return new BadRequestError(message);
  }

  static unauthorized(message: string) {
    return new UnauthorizedError(message);
  }

  static forbidden(message: string) {
    return new ForbiddenError(message);
  }

  static notFound(message: string) {
    return new NotFoundError(message);
  }

  static conflict(message: string) {
    return new ConflictError(message);
  }

  static internalServerError(message: string) {
    return new InternalServerError(message);
  }
}

export class BadRequestError extends ServiceError {
  constructor(message: string) {
    super(400, message);
  }
}

export class UnauthorizedError extends ServiceError {
  constructor(message: string) {
    super(401, message);
  }
}

export class ForbiddenError extends ServiceError {
  constructor(message: string) {
    super(403, message);
  }
}

export class NotFoundError extends ServiceError {
  constructor(message: string) {
    super(404, message);
  }
}

export class ConflictError extends ServiceError {
  constructor(message: string) {
    super(409, message);
  }
}

export class InternalServerError extends ServiceError {
  constructor(message: string) {
    super(500, message);
  }
}

export class FieldsError extends ServiceError {
  readonly fields: { field: string; message: string }[];

  constructor(fields: { field: string; message: string }[], message: string) {
    super(400, message);
    this.fields = fields;
  }

  static isFieldsErrorBody(body: unknown): body is {
    fields: { field: string; message: string }[];
    message: string;
  } {
    return typeof body === "object" && body !== null && "fields" in body;
  }
}

export class ConflictingAppointmentError extends ServiceError {
  readonly conflicts: {
    date: string;
    timePattern: number[];
  }[];

  constructor(
    conflicts: { date: string; timePattern: number[] }[],
    message: string
  ) {
    super(409, message);
    this.conflicts = conflicts;
  }

  static isConflictingAppointmentBody(body: unknown): body is {
    data: {
      conflictingAppointments: { date: string; timePattern: number[] }[];
    };
    message: string;
  } {
    return (
      typeof body === "object" &&
      body !== null &&
      "data" in body &&
      typeof body.data === "object" &&
      body.data !== null &&
      "conflictingAppointments" in body.data
    );
  }
}
