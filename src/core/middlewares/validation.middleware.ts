// ============================================================================
// src/core/middlewares/validation.middleware.ts
// ============================================================================
import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationChain } from "express-validator";
import { BadRequestError } from "@core/errors";

export const validate = (validations: ValidationChain[]) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    for (const validation of validations) {
      await validation.run(req);
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formattedErrors = errors.array().reduce((acc, error) => {
        if (error.type === "field") {
          acc[error.path] = error.msg;
        }
        return acc;
      }, {} as Record<string, string>);

      throw new BadRequestError("Validation failed", formattedErrors as any);
    }

    next();
  };
};
