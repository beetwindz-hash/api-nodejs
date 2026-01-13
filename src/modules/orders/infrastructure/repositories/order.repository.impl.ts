// ============================================================================
// src/modules/orders/infrastructure/repositories/order.repository.impl.ts
// ============================================================================
import {
  IOrderRepository,
  OrderSearchFilters,
} from "../../domain/repositories/order.repository";
import { OrderEntity } from "../../domain/entities/order.entity";
import { OrderModel } from "../models/order.model";
import { OrderMapper } from "../mappers/order.mapper";
import { QueryOptions } from "@core/types";
import mongoose from "mongoose";

export class OrderRepositoryImpl implements IOrderRepository {
  async findById(id: string): Promise<OrderEntity | null> {
    const order = await OrderModel.findById(id);
    return order ? OrderMapper.toDomain(order) : null;
  }

  async findByOrderNumber(orderNumber: string): Promise<OrderEntity | null> {
    const order = await OrderModel.findOne({ orderNumber });
    return order ? OrderMapper.toDomain(order) : null;
  }

  async findByCustomerId(
    customerId: string,
    options: QueryOptions
  ): Promise<{ orders: OrderEntity[]; total: number }> {
    const page = options.page || 1;
    const limit = options.limit || 10;
    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      OrderModel.find({ customerId: new mongoose.Types.ObjectId(customerId) })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      OrderModel.countDocuments({
        customerId: new mongoose.Types.ObjectId(customerId),
      }),
    ]);

    return {
      orders: orders.map(OrderMapper.toDomain),
      total,
    };
  }

  async findByCookId(
    cookId: string,
    options: QueryOptions
  ): Promise<{ orders: OrderEntity[]; total: number }> {
    const page = options.page || 1;
    const limit = options.limit || 10;
    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      OrderModel.find({ cookId: new mongoose.Types.ObjectId(cookId) })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      OrderModel.countDocuments({
        cookId: new mongoose.Types.ObjectId(cookId),
      }),
    ]);

    return {
      orders: orders.map(OrderMapper.toDomain),
      total,
    };
  }

  async findAll(
    options: QueryOptions
  ): Promise<{ orders: OrderEntity[]; total: number }> {
    const page = options.page || 1;
    const limit = options.limit || 10;
    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      OrderModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      OrderModel.countDocuments(),
    ]);

    return {
      orders: orders.map(OrderMapper.toDomain),
      total,
    };
  }

  async search(
    filters: OrderSearchFilters,
    options: QueryOptions
  ): Promise<{ orders: OrderEntity[]; total: number }> {
    const page = options.page || 1;
    const limit = options.limit || 10;
    const skip = (page - 1) * limit;

    const query: any = {};

    if (filters.customerId) {
      query.customerId = new mongoose.Types.ObjectId(filters.customerId);
    }

    if (filters.cookId) {
      query.cookId = new mongoose.Types.ObjectId(filters.cookId);
    }

    if (filters.status) {
      query.status = filters.status;
    }

    if (filters.paymentStatus) {
      query.paymentStatus = filters.paymentStatus;
    }

    if (filters.startDate || filters.endDate) {
      query.createdAt = {};
      if (filters.startDate) query.createdAt.$gte = filters.startDate;
      if (filters.endDate) query.createdAt.$lte = filters.endDate;
    }

    if (filters.minTotal !== undefined || filters.maxTotal !== undefined) {
      query.total = {};
      if (filters.minTotal !== undefined) query.total.$gte = filters.minTotal;
      if (filters.maxTotal !== undefined) query.total.$lte = filters.maxTotal;
    }

    const [orders, total] = await Promise.all([
      OrderModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      OrderModel.countDocuments(query),
    ]);

    return {
      orders: orders.map(OrderMapper.toDomain),
      total,
    };
  }

  async save(order: OrderEntity): Promise<OrderEntity> {
    const persistenceData = OrderMapper.toPersistence(order);

    if (order.id) {
      const updated = await OrderModel.findByIdAndUpdate(
        order.id,
        persistenceData,
        { new: true }
      );
      return OrderMapper.toDomain(updated!);
    }

    const created = await OrderModel.create(persistenceData);
    return OrderMapper.toDomain(created);
  }

  async update(id: string, data: Partial<OrderEntity>): Promise<OrderEntity> {
    const updated = await OrderModel.findByIdAndUpdate(id, data, { new: true });
    if (!updated) {
      throw new Error("Order not found");
    }
    return OrderMapper.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await OrderModel.findByIdAndDelete(id);
  }

  async countByCustomerId(customerId: string): Promise<number> {
    return OrderModel.countDocuments({
      customerId: new mongoose.Types.ObjectId(customerId),
    });
  }

  async countByCookId(cookId: string): Promise<number> {
    return OrderModel.countDocuments({
      cookId: new mongoose.Types.ObjectId(cookId),
    });
  }

  async getTotalRevenueByCookId(cookId: string): Promise<number> {
    const result = await OrderModel.aggregate([
      {
        $match: {
          cookId: new mongoose.Types.ObjectId(cookId),
          status: "delivered",
          paymentStatus: "completed",
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$total" },
        },
      },
    ]);

    return result.length > 0 ? result[0].totalRevenue : 0;
  }
}
