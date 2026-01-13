// ============================================================================
// src/modules/dishes/presentation/controllers/dishes.controller.ts
// ============================================================================
import { Request, Response, NextFunction } from "express";
import { ResponseUtil } from "@core/utils";
import {
  CreateDishUseCase,
  GetDishUseCase,
  UpdateDishUseCase,
  UpdatePricingUseCase,
  UploadDishImageUseCase,
  DeleteDishImageUseCase,
  UpdateIngredientsUseCase,
  UpdateDietaryInfoUseCase,
  PublishDishUseCase,
  ToggleAvailabilityUseCase,
  DeleteDishUseCase,
  SearchDishesUseCase,
  GetMyDishesUseCase,
} from "../../application/use-cases";

export class DishesController {
  constructor(
    private readonly createDishUseCase: CreateDishUseCase,
    private readonly getDishUseCase: GetDishUseCase,
    private readonly updateDishUseCase: UpdateDishUseCase,
    private readonly updatePricingUseCase: UpdatePricingUseCase,
    private readonly uploadDishImageUseCase: UploadDishImageUseCase,
    private readonly deleteDishImageUseCase: DeleteDishImageUseCase,
    private readonly updateIngredientsUseCase: UpdateIngredientsUseCase,
    private readonly updateDietaryInfoUseCase: UpdateDietaryInfoUseCase,
    private readonly publishDishUseCase: PublishDishUseCase,
    private readonly toggleAvailabilityUseCase: ToggleAvailabilityUseCase,
    private readonly deleteDishUseCase: DeleteDishUseCase,
    private readonly searchDishesUseCase: SearchDishesUseCase,
    private readonly getMyDishesUseCase: GetMyDishesUseCase
  ) {}

  createDish = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await this.createDishUseCase.execute(
        req.user!.userId,
        req.body
      );
      ResponseUtil.created(res, result, "Dish created successfully");
    } catch (error) {
      next(error);
    }
  };

  getDish = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await this.getDishUseCase.execute(req.params.id);
      ResponseUtil.success(res, result);
    } catch (error) {
      next(error);
    }
  };

  getMyDishes = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const page = req.query.page
        ? parseInt(req.query.page as string)
        : undefined;
      const limit = req.query.limit
        ? parseInt(req.query.limit as string)
        : undefined;
      const result = await this.getMyDishesUseCase.execute(
        req.user!.userId,
        page,
        limit
      );
      ResponseUtil.success(res, result);
    } catch (error) {
      next(error);
    }
  };

  updateDish = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await this.updateDishUseCase.execute(
        req.user!.userId,
        req.params.id,
        req.body,
        (req as any).cookId
      );
      ResponseUtil.success(res, result, "Dish updated successfully");
    } catch (error) {
      next(error);
    }
  };

  updatePricing = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await this.updatePricingUseCase.execute(
        req.params.id,
        (req as any).cookId,
        req.body
      );
      ResponseUtil.success(res, result, "Pricing updated successfully");
    } catch (error) {
      next(error);
    }
  };

  uploadImage = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      // TODO: Implement actual file upload (Cloudinary/S3)
      const imageUrl = "https://example.com/dish-image.jpg";
      const result = await this.uploadDishImageUseCase.execute(
        req.params.id,
        (req as any).cookId,
        imageUrl
      );
      ResponseUtil.success(res, result, "Image uploaded successfully");
    } catch (error) {
      next(error);
    }
  };

  deleteImage = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const imageUrl = req.body.imageUrl;
      const result = await this.deleteDishImageUseCase.execute(
        req.params.id,
        (req as any).cookId,
        imageUrl
      );
      ResponseUtil.success(res, result, "Image deleted successfully");
    } catch (error) {
      next(error);
    }
  };

  updateIngredients = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await this.updateIngredientsUseCase.execute(
        req.params.id,
        (req as any).cookId,
        req.body.ingredients
      );
      ResponseUtil.success(res, result, "Ingredients updated successfully");
    } catch (error) {
      next(error);
    }
  };

  updateDietaryInfo = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await this.updateDietaryInfoUseCase.execute(
        req.params.id,
        (req as any).cookId,
        req.body
      );
      ResponseUtil.success(res, result, "Dietary info updated successfully");
    } catch (error) {
      next(error);
    }
  };

  publishDish = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await this.publishDishUseCase.execute(
        req.params.id,
        (req as any).cookId
      );
      ResponseUtil.success(res, result, "Dish published successfully");
    } catch (error) {
      next(error);
    }
  };

  toggleAvailability = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await this.toggleAvailabilityUseCase.execute(
        req.params.id,
        (req as any).cookId,
        req.body.isAvailable
      );
      ResponseUtil.success(res, result, "Availability updated successfully");
    } catch (error) {
      next(error);
    }
  };

  deleteDish = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await this.deleteDishUseCase.execute(req.params.id, (req as any).cookId);
      ResponseUtil.success(res, null, "Dish deleted successfully");
    } catch (error) {
      next(error);
    }
  };

  searchDishes = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await this.searchDishesUseCase.execute(req.query as any);
      ResponseUtil.success(res, result);
    } catch (error) {
      next(error);
    }
  };
}
