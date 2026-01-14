// ============================================================================
// src/modules/reviews/presentation/controllers/reviews.controller.ts
// ============================================================================
import { Request, Response, NextFunction } from "express";
import { ResponseUtil } from "@core/utils";
import {
  CreateReviewUseCase,
  GetReviewUseCase,
  SearchReviewsUseCase,
  ReplyReviewUseCase,
  DeleteReviewUseCase,
  GetCookReviewsUseCase,
  GetCookReviewStatsUseCase,
} from "../../application/use-cases";

export class ReviewsController {
  constructor(
    private readonly createReviewUseCase: CreateReviewUseCase,
    private readonly getReviewUseCase: GetReviewUseCase,
    private readonly searchReviewsUseCase: SearchReviewsUseCase,
    private readonly replyReviewUseCase: ReplyReviewUseCase,
    private readonly deleteReviewUseCase: DeleteReviewUseCase,
    private readonly getCookReviewsUseCase: GetCookReviewsUseCase,
    private readonly getCookReviewStatsUseCase: GetCookReviewStatsUseCase
  ) {}

  getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await this.searchReviewsUseCase.execute(
        req.query as any
      );
      ResponseUtil.success(res, result);
    } catch (error) {
      next(error);
    }
  };

  getById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await this.getReviewUseCase.execute(req.params.id);
      ResponseUtil.success(res, result);
    } catch (error) {
      next(error);
    }
  };

  create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await this.createReviewUseCase.execute(
        req.user!.userId,
        req.body
      );
      ResponseUtil.created(res, result);
    } catch (error) {
      next(error);
    }
  };

  reply = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await this.replyReviewUseCase.execute(
        req.params.id,
        req.user!.userId,
        req.body
      );
      ResponseUtil.success(res, result);
    } catch (error) {
      next(error);
    }
  };

  delete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await this.deleteReviewUseCase.execute(req.params.id, req.user!.userId);
      ResponseUtil.noContent(res);
    } catch (error) {
      next(error);
    }
  };

  getCookReviews = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const page = req.query.page
        ? parseInt(req.query.page as string, 10)
        : undefined;
      const limit = req.query.limit
        ? parseInt(req.query.limit as string, 10)
        : undefined;

      const result = await this.getCookReviewsUseCase.execute(
        req.params.id || req.params.cookId,
        page,
        limit
      );

      ResponseUtil.success(res, result);
    } catch (error) {
      next(error);
    }
  };

  getCookStats = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await this.getCookReviewStatsUseCase.execute(
        req.params.cookId
      );
      ResponseUtil.success(res, result);
    } catch (error) {
      next(error);
    }
  };
}

