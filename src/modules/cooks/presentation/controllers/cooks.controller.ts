// ============================================================================
// src/modules/cooks/presentation/controllers/cooks.controller.ts
// ============================================================================
import { Request, Response, NextFunction } from "express";
import { ResponseUtil } from "@core/utils";
import {
  CreateCookProfileUseCase,
  GetCookProfileUseCase,
  GetMyCookProfileUseCase,
  UpdateCookProfileUseCase,
  UpdateLocationUseCase,
  UpdateDeliverySettingsUseCase,
  UpdateAvailabilityUseCase,
  SearchCooksUseCase,
  VerifyCookUseCase,
} from "../../application/use-cases";

export class CooksController {
  constructor(
    private readonly createCookProfileUseCase: CreateCookProfileUseCase,
    private readonly getCookProfileUseCase: GetCookProfileUseCase,
    private readonly getMyCookProfileUseCase: GetMyCookProfileUseCase,
    private readonly updateCookProfileUseCase: UpdateCookProfileUseCase,
    private readonly updateLocationUseCase: UpdateLocationUseCase,
    private readonly updateDeliverySettingsUseCase: UpdateDeliverySettingsUseCase,
    private readonly updateAvailabilityUseCase: UpdateAvailabilityUseCase,
    private readonly searchCooksUseCase: SearchCooksUseCase,
    private readonly verifyCookUseCase: VerifyCookUseCase
  ) {}

  createProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await this.createCookProfileUseCase.execute(
        req.user!.userId,
        req.body
      );
      ResponseUtil.created(res, result, "Cook profile created successfully");
    } catch (error) {
      next(error);
    }
  };

  getProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await this.getCookProfileUseCase.execute(req.params.id);
      ResponseUtil.success(res, result);
    } catch (error) {
      next(error);
    }
  };

  getMyProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await this.getMyCookProfileUseCase.execute(
        req.user!.userId
      );
      ResponseUtil.success(res, result);
    } catch (error) {
      next(error);
    }
  };

  updateProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await this.updateCookProfileUseCase.execute(
        req.user!.userId,
        req.body
      );
      ResponseUtil.success(res, result, "Profile updated successfully");
    } catch (error) {
      next(error);
    }
  };

  updateLocation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await this.updateLocationUseCase.execute(
        req.user!.userId,
        req.body
      );
      ResponseUtil.success(res, result, "Location updated successfully");
    } catch (error) {
      next(error);
    }
  };

  updateDeliverySettings = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await this.updateDeliverySettingsUseCase.execute(
        req.user!.userId,
        req.body
      );
      ResponseUtil.success(
        res,
        result,
        "Delivery settings updated successfully"
      );
    } catch (error) {
      next(error);
    }
  };

  updateAvailability = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await this.updateAvailabilityUseCase.execute(
        req.user!.userId,
        req.body
      );
      ResponseUtil.success(res, result, "Availability updated successfully");
    } catch (error) {
      next(error);
    }
  };

  searchCooks = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await this.searchCooksUseCase.execute(req.query as any);
      ResponseUtil.success(res, result);
    } catch (error) {
      next(error);
    }
  };

  verifyCook = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await this.verifyCookUseCase.execute(req.params.id);
      ResponseUtil.success(res, result, "Cook verified successfully");
    } catch (error) {
      next(error);
    }
  };
}
