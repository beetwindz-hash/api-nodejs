// ============================================================================
// src/modules/users/presentation/controllers/users.controller.ts
// ============================================================================
import { Request, Response, NextFunction } from "express";
import { ResponseUtil } from "@core/utils";
import {
  GetProfileUseCase,
  UpdateProfileUseCase,
  GetAddressesUseCase,
  CreateAddressUseCase,
  UpdateAddressUseCase,
  DeleteAddressUseCase,
  SetDefaultAddressUseCase,
} from "../../application/use-cases";

export class UsersController {
  constructor(
    private readonly getProfileUseCase: GetProfileUseCase,
    private readonly updateProfileUseCase: UpdateProfileUseCase,
    private readonly getAddressesUseCase: GetAddressesUseCase,
    private readonly createAddressUseCase: CreateAddressUseCase,
    private readonly updateAddressUseCase: UpdateAddressUseCase,
    private readonly deleteAddressUseCase: DeleteAddressUseCase,
    private readonly setDefaultAddressUseCase: SetDefaultAddressUseCase
  ) {}

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

  updateProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await this.updateProfileUseCase.execute(
        req.user!.userId,
        req.body
      );
      ResponseUtil.success(res, result, "Profile updated successfully");
    } catch (error) {
      next(error);
    }
  };

  uploadAvatar = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      // TODO: Implement file upload with Cloudinary/local storage
      ResponseUtil.success(
        res,
        { avatarUrl: "https://example.com/avatar.jpg" },
        "Avatar uploaded successfully"
      );
    } catch (error) {
      next(error);
    }
  };

  deleteAvatar = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      // TODO: Implement avatar deletion
      ResponseUtil.success(res, null, "Avatar deleted successfully");
    } catch (error) {
      next(error);
    }
  };

  getAddresses = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await this.getAddressesUseCase.execute(req.user!.userId);
      ResponseUtil.success(res, result);
    } catch (error) {
      next(error);
    }
  };

  createAddress = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await this.createAddressUseCase.execute(
        req.user!.userId,
        req.body
      );
      ResponseUtil.created(res, result, "Address created successfully");
    } catch (error) {
      next(error);
    }
  };

  updateAddress = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await this.updateAddressUseCase.execute(
        req.user!.userId,
        req.params.id,
        req.body
      );
      ResponseUtil.success(res, result, "Address updated successfully");
    } catch (error) {
      next(error);
    }
  };

  deleteAddress = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await this.deleteAddressUseCase.execute(req.user!.userId, req.params.id);
      ResponseUtil.success(res, null, "Address deleted successfully");
    } catch (error) {
      next(error);
    }
  };

  setDefaultAddress = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await this.setDefaultAddressUseCase.execute(
        req.user!.userId,
        req.params.id
      );
      ResponseUtil.success(res, result, "Default address set successfully");
    } catch (error) {
      next(error);
    }
  };

  getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      // TODO: Implement get user by ID (public profile view)
      ResponseUtil.success(res, { id: req.params.id, name: "User Name" });
    } catch (error) {
      next(error);
    }
  };
}
