// ============================================================================
// src/core/errors/http.error.ts
// ============================================================================
export class HttpError extends AppError {
  constructor(message: string, statusCode: number, code?: string) {
    super(message, statusCode, true, code);
    this.name = "HttpError";
  }
}

export class BadRequestError extends HttpError {
  constructor(message: string = "Bad Request", code?: string) {
    super(message, 400, code);
    this.name = "BadRequestError";
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message: string = "Unauthorized", code?: string) {
    super(message, 401, code);
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends HttpError {
  constructor(message: string = "Forbidden", code?: string) {
    super(message, 403, code);
    this.name = "ForbiddenError";
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string = "Resource not found", code?: string) {
    super(message, 404, code);
    this.name = "NotFoundError";
  }
}

export class ConflictError extends HttpError {
  constructor(message: string = "Conflict", code?: string) {
    super(message, 409, code);
    this.name = "ConflictError";
  }
}

export class UnprocessableEntityError extends HttpError {
  constructor(message: string = "Unprocessable Entity", code?: string) {
    super(message, 422, code);
    this.name = "UnprocessableEntityError";
  }
}

export class TooManyRequestsError extends HttpError {
  constructor(message: string = "Too Many Requests", code?: string) {
    super(message, 429, code);
    this.name = "TooManyRequestsError";
  }
}

export class InternalServerError extends HttpError {
  constructor(message: string = "Internal Server Error", code?: string) {
    super(message, 500, code);
    this.name = "InternalServerError";
  }
}
