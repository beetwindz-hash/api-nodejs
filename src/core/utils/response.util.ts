// ============================================================================
// src/core/utils/response.util.ts
// ============================================================================
import { Response } from "express";
import { v4 as uuidv4 } from "uuid";

export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  meta?: {
    requestId: string;
    timestamp: string;
    [key: string]: any;
  };
}

export interface PaginatedResponse<T = any> extends ApiResponse<T[]> {
  meta: {
    requestId: string;
    timestamp: string;
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export class ResponseUtil {
  static success<T>(
    res: Response,
    data: T,
    message?: string,
    statusCode: number = 200,
    additionalMeta?: Record<string, any>
  ): Response {
    const response: ApiResponse<T> = {
      data,
      message,
      meta: {
        requestId: uuidv4(),
        timestamp: new Date().toISOString(),
        ...additionalMeta,
      },
    };
    return res.status(statusCode).json(response);
  }

  static created<T>(res: Response, data: T, message?: string): Response {
    return this.success(res, data, message, 201);
  }

  static paginated<T>(
    res: Response,
    data: T[],
    page: number,
    limit: number,
    total: number,
    message?: string
  ): Response {
    const totalPages = Math.ceil(total / limit);
    const response: PaginatedResponse<T> = {
      data,
      message,
      meta: {
        requestId: uuidv4(),
        timestamp: new Date().toISOString(),
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
    return res.status(200).json(response);
  }

  static error(
    res: Response,
    message: string,
    statusCode: number = 500,
    errors?: any
  ): Response {
    return res.status(statusCode).json({
      error: {
        message,
        statusCode,
        errors,
      },
      meta: {
        requestId: uuidv4(),
        timestamp: new Date().toISOString(),
      },
    });
  }
}
