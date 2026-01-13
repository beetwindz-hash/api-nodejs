// ============================================================================
// src/modules/dishes/presentation/middleware/cook-ownership.middleware.ts
// ============================================================================
import { Request, Response, NextFunction } from "express";
import { CookRepositoryImpl } from "@modules/cooks/infrastructure/repositories/cook.repository.impl";
import { NotFoundError, ForbiddenError } from "@core/errors";

const cookRepository = new CookRepositoryImpl();

export const verifyCookOwnership = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const cook = await cookRepository.findByUserId(req.user!.userId);
    if (!cook) {
      throw new NotFoundError("Cook profile not found");
    }

    // Attach cookId to request for use in controllers
    (req as any).cookId = cook.id;
    next();
  } catch (error) {
    next(error);
  }
};
