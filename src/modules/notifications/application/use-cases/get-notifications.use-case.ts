// ============================================================================
// src/modules/notifications/application/use-cases/get-notifications.use-case.ts
// ============================================================================
import { INotificationRepository } from "../../domain/repositories/notification.repository";
import { NotificationType, QueryOptions } from "@core/types";

interface GetNotificationsFilters {
  type?: NotificationType;
  isRead?: boolean;
  page?: number;
  limit?: number;
}

export class GetNotificationsUseCase {
  constructor(
    private readonly notificationRepository: INotificationRepository
  ) {}

  async execute(userId: string, filters: GetNotificationsFilters) {
    const page = filters.page && filters.page > 0 ? filters.page : 1;
    const limit =
      filters.limit && filters.limit > 0 && filters.limit <= 100
        ? filters.limit
        : 10;

    const queryOptions: QueryOptions = {
      page,
      limit,
      sort: "createdAt",
      order: "desc",
    };

    const { notifications, total } =
      await this.notificationRepository.findForUser(
        {
          userId,
          type: filters.type,
          isRead: filters.isRead,
        },
        queryOptions
      );

    return {
      notifications: notifications.map((n) => n.toJSON()),
      pagination: {
        page,
        limit,
        total,
      },
    };
  }
}

