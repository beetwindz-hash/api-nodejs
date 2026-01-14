// ============================================================================
// src/modules/notifications/presentation/controllers/notifications.controller.ts
// ============================================================================
import { Request, Response, NextFunction } from "express";
import { ResponseUtil } from "@core/utils";
import {
  GetNotificationsUseCase,
  GetNotificationUseCase,
  MarkNotificationsReadUseCase,
  MarkAllNotificationsReadUseCase,
  GetUnreadCountUseCase,
  GetNotificationPreferencesUseCase,
  UpdateNotificationPreferencesUseCase,
} from "../../application/use-cases";

export class NotificationsController {
  constructor(
    private readonly getNotificationsUseCase: GetNotificationsUseCase,
    private readonly getNotificationUseCase: GetNotificationUseCase,
    private readonly markNotificationsReadUseCase: MarkNotificationsReadUseCase,
    private readonly markAllNotificationsReadUseCase: MarkAllNotificationsReadUseCase,
    private readonly getUnreadCountUseCase: GetUnreadCountUseCase,
    private readonly getPreferencesUseCase: GetNotificationPreferencesUseCase,
    private readonly updatePreferencesUseCase: UpdateNotificationPreferencesUseCase
  ) {}

  getNotifications = async (
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
      const isRead =
        typeof req.query.isRead === "string"
          ? req.query.isRead === "true"
          : undefined;
      const type = req.query.type as any;

      const result = await this.getNotificationsUseCase.execute(
        req.user!.userId,
        {
          page,
          limit,
          isRead,
          type,
        }
      );

      ResponseUtil.paginated(
        res,
        result.notifications,
        result.pagination.page,
        result.pagination.limit,
        result.pagination.total
      );
    } catch (error) {
      next(error);
    }
  };

  getNotification = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const notification = await this.getNotificationUseCase.execute(
        req.params.id,
        req.user!.userId
      );
      ResponseUtil.success(res, notification);
    } catch (error) {
      next(error);
    }
  };

  markAsRead = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const ids = req.body.ids as string[];
      const result = await this.markNotificationsReadUseCase.execute(
        req.user!.userId,
        ids
      );
      ResponseUtil.success(
        res,
        result,
        "Notifications marked as read successfully"
      );
    } catch (error) {
      next(error);
    }
  };

  markAllAsRead = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await this.markAllNotificationsReadUseCase.execute(
        req.user!.userId
      );
      ResponseUtil.success(
        res,
        result,
        "All notifications marked as read successfully"
      );
    } catch (error) {
      next(error);
    }
  };

  getUnreadCount = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await this.getUnreadCountUseCase.execute(
        req.user!.userId
      );
      ResponseUtil.success(res, result);
    } catch (error) {
      next(error);
    }
  };

  getPreferences = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await this.getPreferencesUseCase.execute(
        req.user!.userId
      );
      ResponseUtil.success(res, result);
    } catch (error) {
      next(error);
    }
  };

  updatePreferences = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await this.updatePreferencesUseCase.execute(
        req.user!.userId,
        req.body
      );
      ResponseUtil.success(res, result, "Notification preferences updated");
    } catch (error) {
      next(error);
    }
  };
}

