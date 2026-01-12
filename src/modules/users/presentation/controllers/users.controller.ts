// ============================================================================
// PRESENTATION - Controllers & Routes
// ============================================================================
// src/modules/users/presentation/controllers/users.controller.ts
import { Request, Response, NextFunction } from "express";
import { ResponseUtil } from "@core/utils";
import { GetProfileUseCase } from "../../application/use-cases/get-profile.use-case";

export class UsersController {
  constructor(private readonly getProfileUseCase: GetProfileUseCase) {}

  getProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await this.getProfileUseCase.execute(req.user!.userId);
      ResponseUtil.success(res, result);
    } catch (error) {
      next(error);
    }
  };
}
