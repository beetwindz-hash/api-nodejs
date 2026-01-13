// ============================================================================
// src/modules/orders/presentation/controllers/orders.controller.ts
// ============================================================================
import { Request, Response, NextFunction } from "express";
import { ResponseUtil } from "@core/utils";
import {
  CreateOrderUseCase,
  GetOrderUseCase,
  GetMyOrdersUseCase,
  GetCookOrdersUseCase,
  ConfirmOrderUseCase,
  UpdateOrderStatusUseCase,
  CancelOrderUseCase,
  SearchOrdersUseCase,
} from "../../application/use-cases";

export class OrdersController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly getOrderUseCase: GetOrderUseCase,
    private readonly getMyOrdersUseCase: GetMyOrdersUseCase,
    private readonly getCookOrdersUseCase: GetCookOrdersUseCase,
    private readonly confirmOrderUseCase: ConfirmOrderUseCase,
    private readonly updateOrderStatusUseCase: UpdateOrderStatusUseCase,
    private readonly cancelOrderUseCase: CancelOrderUseCase,
    private readonly searchOrdersUseCase: SearchOrdersUseCase
  ) {}

  createOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await this.createOrderUseCase.execute(
        req.user!.userId,
        req.body
      );
      ResponseUtil.created(res, result, "Order created successfully");
    } catch (error) {
      next(error);
    }
  };

  getOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await this.getOrderUseCase.execute(
        req.params.id,
        req.user!.userId,
        req.user!.role
      );
      ResponseUtil.success(res, result);
    } catch (error) {
      next(error);
    }
  };

  getMyOrders = async (
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
      const result = await this.getMyOrdersUseCase.execute(
        req.user!.userId,
        page,
        limit
      );
      ResponseUtil.success(res, result);
    } catch (error) {
      next(error);
    }
  };

  getCookOrders = async (
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
      const result = await this.getCookOrdersUseCase.execute(
        req.user!.userId,
        page,
        limit
      );
      ResponseUtil.success(res, result);
    } catch (error) {
      next(error);
    }
  };

  confirmOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await this.confirmOrderUseCase.execute(
        req.params.id,
        req.user!.userId
      );
      ResponseUtil.success(res, result, "Order confirmed successfully");
    } catch (error) {
      next(error);
    }
  };

  updateOrderStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await this.updateOrderStatusUseCase.execute(
        req.params.id,
        req.user!.userId,
        req.body
      );
      ResponseUtil.success(res, result, "Order status updated successfully");
    } catch (error) {
      next(error);
    }
  };

  cancelOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await this.cancelOrderUseCase.execute(
        req.params.id,
        req.user!.userId,
        req.user!.role as any,
        req.body
      );
      ResponseUtil.success(res, result, "Order cancelled successfully");
    } catch (error) {
      next(error);
    }
  };

  searchOrders = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await this.searchOrdersUseCase.execute(
        req.query as any,
        req.user!.role,
        req.user!.userId
      );
      ResponseUtil.success(res, result);
    } catch (error) {
      next(error);
    }
  };
}
