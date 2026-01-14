// ============================================================================
// src/modules/notifications/infrastructure/repositories/notification.repository.impl.ts
// ============================================================================
import {
  INotificationRepository,
  NotificationSearchFilters,
} from "../../domain/repositories/notification.repository";
import { NotificationEntity } from "../../domain/entities/notification.entity";
import { NotificationModel } from "../models/notification.model";
import { NotificationMapper } from "../mappers/notification.mapper";
import { QueryOptions } from "@core/types";
import mongoose from "mongoose";

export class NotificationRepositoryImpl implements INotificationRepository {
  async findById(
    id: string,
    userId: string
  ): Promise<NotificationEntity | null> {
    const doc = await NotificationModel.findOne({
      _id: id,
      userId: new mongoose.Types.ObjectId(userId),
    });
    return doc ? NotificationMapper.toDomain(doc) : null;
  }

  async findForUser(
    filters: NotificationSearchFilters,
    options: QueryOptions
  ): Promise<{ notifications: NotificationEntity[]; total: number }> {
    const page = options.page || 1;
    const limit = options.limit || 10;
    const skip = (page - 1) * limit;

    const query: Record<string, any> = {
      userId: new mongoose.Types.ObjectId(filters.userId),
    };

    if (filters.type) {
      query.type = filters.type;
    }

    if (filters.isRead !== undefined) {
      query.isRead = filters.isRead;
    }

    const sortDirection = options.order === "asc" ? 1 : -1;
    const sortField = options.sort || "createdAt";

    const [docs, total] = await Promise.all([
      NotificationModel.find(query)
        .sort({ [sortField]: sortDirection })
        .skip(skip)
        .limit(limit),
      NotificationModel.countDocuments(query),
    ]);

    return {
      notifications: docs.map(NotificationMapper.toDomain),
      total,
    };
  }

  async save(notification: NotificationEntity): Promise<NotificationEntity> {
    const data = NotificationMapper.toPersistence(notification);

    if (notification.id) {
      const updated = await NotificationModel.findOneAndUpdate(
        {
          _id: notification.id,
          userId: new mongoose.Types.ObjectId(notification.userId),
        },
        data,
        { new: true }
      );
      return NotificationMapper.toDomain(updated!);
    }

    const created = await NotificationModel.create(data);
    return NotificationMapper.toDomain(created);
  }

  async markAsRead(ids: string[], userId: string): Promise<number> {
    if (!ids.length) return 0;

    const objectIds = ids.map((id) => new mongoose.Types.ObjectId(id));

    const result = await NotificationModel.updateMany(
      {
        _id: { $in: objectIds },
        userId: new mongoose.Types.ObjectId(userId),
        isRead: false,
      },
      {
        $set: {
          isRead: true,
          readAt: new Date(),
        },
      }
    );

    return result.modifiedCount ?? 0;
  }

  async markAllAsRead(userId: string): Promise<number> {
    const result = await NotificationModel.updateMany(
      {
        userId: new mongoose.Types.ObjectId(userId),
        isRead: false,
      },
      {
        $set: {
          isRead: true,
          readAt: new Date(),
        },
      }
    );

    return result.modifiedCount ?? 0;
  }

  async getUnreadCount(userId: string): Promise<number> {
    return NotificationModel.countDocuments({
      userId: new mongoose.Types.ObjectId(userId),
      isRead: false,
    });
  }
}

