// ============================================================================
// src/core/middlewares/error.middleware.ts
// ============================================================================
import { Request, Response, NextFunction } from "express";
import {
  AppError,
  ValidationError as DomainValidationError,
} from "@core/errors";
import { logger, ResponseUtil } from "@core/utils";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  logger.error("Error occurred:", {
    message: error.message,
    stack: error.stack,
    path: req.path,
    method: req.method,
  });

  if (error instanceof AppError) {
    return ResponseUtil.error(res, error.message, error.statusCode);
  }

  if (error instanceof DomainValidationError) {
    return ResponseUtil.error(res, error.message, 422, error.fields);
  }

  if (error.name === "ValidationError") {
    return ResponseUtil.error(res, "Validation failed", 422, error.message);
  }

  if (error.name === "MongoServerError" && (error as any).code === 11000) {
    const field = Object.keys((error as any).keyPattern)[0];
    return ResponseUtil.error(res, `${field} already exists`, 409);
  }

  if (error.name === "CastError") {
    return ResponseUtil.error(res, "Invalid ID format", 400);
  }

  if (error.name === "JsonWebTokenError") {
    return ResponseUtil.error(res, "Invalid token", 401);
  }

  if (error.name === "TokenExpiredError") {
    return ResponseUtil.error(res, "Token expired", 401);
  }

  return ResponseUtil.error(
    res,
    process.env.NODE_ENV === "production"
      ? "Internal server error"
      : error.message,
    500
  );
};

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  return ResponseUtil.error(res, `Route ${req.originalUrl} not found`, 404);
};
