// ============================================================================
// src/modules/admin/presentation/controllers/admin.controller.ts
// ============================================================================
import { Request, Response, NextFunction } from "express";
import { ResponseUtil } from "@core/utils";
import {
  GetAdminStatsUseCase,
  GetAdminUsersUseCase,
  GetAdminUserUseCase,
  UpdateUserStatusUseCase,
  DeleteUserUseCase,
  GetAdminOrdersUseCase,
  GetAdminAnalyticsUseCase,
} from "../../application/use-cases";

export class AdminController {
  constructor(
    private readonly getStatsUseCase: GetAdminStatsUseCase,
    private readonly getUsersUseCase: GetAdminUsersUseCase,
    private readonly getUserUseCase: GetAdminUserUseCase,
    private readonly updateUserStatusUseCase: UpdateUserStatusUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly getOrdersUseCase: GetAdminOrdersUseCase,
    private readonly getAnalyticsUseCase: GetAdminAnalyticsUseCase
  ) {}

  getStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const stats = await this.getStatsUseCase.execute();
      ResponseUtil.success(res, stats);
    } catch (error) {
      next(error);
    }
  };

  getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
      const limit = req.query.limit
        ? parseInt(req.query.limit as string, 10)
        : 10;
      const sort = (req.query.sort as string) || "createdAt";
      const order = (req.query.order as "asc" | "desc") || "desc";
      const isActive =
        typeof req.query.isActive === "string"
          ? req.query.isActive === "true"
          : undefined;

      const result = await this.getUsersUseCase.execute(
        {
          role: req.query.role as any,
          isActive,
          search: req.query.search as string | undefined,
        },
        { page, limit, sort, order }
      );

      ResponseUtil.paginated(
        res,
        result.users,
        page,
        limit,
        result.total,
        "Users fetched successfully"
      );
    } catch (error) {
      next(error);
    }
  };

  getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.getUserUseCase.execute(req.params.id);
      ResponseUtil.success(res, user);
    } catch (error) {
      next(error);
    }
  };

  suspendUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.updateUserStatusUseCase.execute(
        req.params.id,
        false
      );
      ResponseUtil.success(res, user, "User suspended");
    } catch (error) {
      next(error);
    }
  };

  activateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.updateUserStatusUseCase.execute(
        req.params.id,
        true
      );
      ResponseUtil.success(res, user, "User activated");
    } catch (error) {
      next(error);
    }
  };

  deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.deleteUserUseCase.execute(req.params.id);
      ResponseUtil.success(res, { deleted: true }, "User deleted");
    } catch (error) {
      next(error);
    }
  };

  getOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
      const limit = req.query.limit
        ? parseInt(req.query.limit as string, 10)
        : 10;
      const sort = (req.query.sort as string) || "createdAt";
      const order = (req.query.order as "asc" | "desc") || "desc";

      const result = await this.getOrdersUseCase.execute(
        {
          status: req.query.status as any,
          customerId: req.query.customerId as string | undefined,
          cookId: req.query.cookId as string | undefined,
        },
        { page, limit, sort, order }
      );

      ResponseUtil.paginated(
        res,
        result.orders,
        page,
        limit,
        result.total,
        "Orders fetched successfully"
      );
    } catch (error) {
      next(error);
    }
  };

  getAnalytics = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const analytics = await this.getAnalyticsUseCase.execute();
      ResponseUtil.success(res, analytics);
    } catch (error) {
      next(error);
    }
  };
}

