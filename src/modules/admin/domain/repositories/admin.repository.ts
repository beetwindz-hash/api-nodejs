// ============================================================================
// src/modules/admin/domain/repositories/admin.repository.ts
// ============================================================================
import { Role, QueryOptions, OrderStatus } from "@core/types";

export interface AdminUserFilters {
  role?: Role;
  isActive?: boolean;
  search?: string;
}

export interface AdminOrderFilters {
  status?: OrderStatus;
  customerId?: string;
  cookId?: string;
}

export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalCooks: number;
  totalCustomers: number;
  totalOrders: number;
  completedOrders: number;
  revenue: number;
}

export interface OrdersPerDay {
  date: string;
  count: number;
  revenue: number;
}

export interface TopEntity {
  id: string;
  name: string;
  totalRevenue: number;
  totalOrders: number;
}

export interface AdminAnalytics {
  ordersPerDay: OrdersPerDay[];
  topCooks: TopEntity[];
  topDishes: TopEntity[];
}

export interface IAdminRepository {
  getStats(): Promise<AdminStats>;
  getUsers(
    filters: AdminUserFilters,
    options: QueryOptions
  ): Promise<{ users: any[]; total: number }>;
  getUserById(id: string): Promise<any | null>;
  setUserActiveState(id: string, isActive: boolean): Promise<any | null>;
  deleteUser(id: string): Promise<void>;
  getOrders(
    filters: AdminOrderFilters,
    options: QueryOptions
  ): Promise<{ orders: any[]; total: number }>;
  getAnalytics(): Promise<AdminAnalytics>;
}

