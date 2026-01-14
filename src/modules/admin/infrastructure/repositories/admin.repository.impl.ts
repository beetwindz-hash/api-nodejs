// ============================================================================
// src/modules/admin/infrastructure/repositories/admin.repository.impl.ts
// ============================================================================
import { IAdminRepository, AdminUserFilters, AdminOrderFilters } from "../../domain/repositories/admin.repository";
import { QueryOptions } from "@core/types";
import { UserModel } from "@modules/auth/infrastructure/models/user.model";
import { OrderModel } from "@modules/orders/infrastructure/models/order.model";
import { DishModel } from "@modules/dishes/infrastructure/models/dish.model";
import mongoose from "mongoose";

export class AdminRepositoryImpl implements IAdminRepository {
  async getStats() {
    const [
      totalUsers,
      activeUsers,
      totalCooks,
      totalCustomers,
      totalOrders,
      completedOrders,
      revenueAgg,
    ] = await Promise.all([
      UserModel.countDocuments({}),
      UserModel.countDocuments({ isActive: true }),
      UserModel.countDocuments({ role: "cook" }),
      UserModel.countDocuments({ role: "customer" }),
      OrderModel.countDocuments({}),
      OrderModel.countDocuments({ status: "delivered" }),
      OrderModel.aggregate([
        { $match: { paymentStatus: "completed" } },
        { $group: { _id: null, revenue: { $sum: "$total" } } },
      ]),
    ]);

    const revenue = revenueAgg[0]?.revenue ?? 0;

    return {
      totalUsers,
      activeUsers,
      totalCooks,
      totalCustomers,
      totalOrders,
      completedOrders,
      revenue,
    };
  }

  async getUsers(filters: AdminUserFilters, options: QueryOptions) {
    const page = options.page || 1;
    const limit = options.limit || 10;
    const skip = (page - 1) * limit;

    const query: Record<string, any> = {};

    if (filters.role) {
      query.role = filters.role;
    }

    if (filters.isActive !== undefined) {
      query.isActive = filters.isActive;
    }

    if (filters.search) {
      const regex = new RegExp(filters.search, "i");
      query.$or = [{ email: regex }, { name: regex }];
    }

    const [users, total] = await Promise.all([
      UserModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      UserModel.countDocuments(query),
    ]);

    return {
      users: users.map((u) => u.toJSON()),
      total,
    };
  }

  async getUserById(id: string) {
    const user = await UserModel.findById(id);
    return user ? user.toJSON() : null;
  }

  async setUserActiveState(id: string, isActive: boolean) {
    const updated = await UserModel.findByIdAndUpdate(
      id,
      { isActive },
      { new: true }
    );
    return updated ? updated.toJSON() : null;
  }

  async deleteUser(id: string) {
    await UserModel.findByIdAndDelete(id);
  }

  async getOrders(filters: AdminOrderFilters, options: QueryOptions) {
    const page = options.page || 1;
    const limit = options.limit || 10;
    const skip = (page - 1) * limit;

    const query: Record<string, any> = {};

    if (filters.status) {
      query.status = filters.status;
    }

    if (filters.customerId) {
      query.customerId = new mongoose.Types.ObjectId(filters.customerId);
    }

    if (filters.cookId) {
      query.cookId = new mongoose.Types.ObjectId(filters.cookId);
    }

    const sortField = options.sort || "createdAt";
    const sortDirection = options.order === "asc" ? 1 : -1;

    const [orders, total] = await Promise.all([
      OrderModel.find(query)
        .sort({ [sortField]: sortDirection })
        .skip(skip)
        .limit(limit),
      OrderModel.countDocuments(query),
    ]);

    return {
      orders: orders.map((o) => o.toJSON()),
      total,
    };
  }

  async getAnalytics() {
    const since = new Date();
    since.setDate(since.getDate() - 30);

    const ordersPerDayAgg = await OrderModel.aggregate([
      { $match: { createdAt: { $gte: since } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
          revenue: { $sum: "$total" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const topCooksAgg = await OrderModel.aggregate([
      {
        $group: {
          _id: "$cookId",
          totalRevenue: { $sum: "$total" },
          totalOrders: { $sum: 1 },
        },
      },
      { $sort: { totalRevenue: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "cook",
        },
      },
      { $unwind: { path: "$cook", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          id: { $toString: "$_id" },
          name: { $ifNull: ["$cook.name", "Unknown Cook"] },
          totalRevenue: 1,
          totalOrders: 1,
        },
      },
    ]);

    const topDishesAgg = await OrderModel.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.dishId",
          name: { $first: "$items.dishName" },
          totalRevenue: { $sum: { $multiply: ["$items.quantity", "$items.price"] } },
          totalOrders: { $sum: "$items.quantity" },
        },
      },
      { $sort: { totalRevenue: -1 } },
      { $limit: 5 },
      {
        $project: {
          id: { $toString: "$_id" },
          name: 1,
          totalRevenue: 1,
          totalOrders: 1,
        },
      },
    ]);

    return {
      ordersPerDay: ordersPerDayAgg.map((o) => ({
        date: o._id,
        count: o.count,
        revenue: o.revenue,
      })),
      topCooks: topCooksAgg,
      topDishes: topDishesAgg,
    };
  }
}

