// ============================================================================
// src/modules/orders/domain/repositories/order.repository.ts
// ============================================================================
import { OrderEntity } from "../entities/order.entity";
import { OrderStatus } from "@core/types";
import { QueryOptions } from "@core/types";
import { PaymentStatus } from "../entities/order.entity";

export interface OrderSearchFilters {
  customerId?: string;
  cookId?: string;
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  startDate?: Date;
  endDate?: Date;
  minTotal?: number;
  maxTotal?: number;
}

export interface IOrderRepository {
  findById(id: string): Promise<OrderEntity | null>;
  findByOrderNumber(orderNumber: string): Promise<OrderEntity | null>;
  findByCustomerId(
    customerId: string,
    options: QueryOptions
  ): Promise<{ orders: OrderEntity[]; total: number }>;
  findByCookId(
    cookId: string,
    options: QueryOptions
  ): Promise<{ orders: OrderEntity[]; total: number }>;
  findAll(
    options: QueryOptions
  ): Promise<{ orders: OrderEntity[]; total: number }>;
  search(
    filters: OrderSearchFilters,
    options: QueryOptions
  ): Promise<{ orders: OrderEntity[]; total: number }>;
  save(order: OrderEntity): Promise<OrderEntity>;
  update(id: string, data: Partial<OrderEntity>): Promise<OrderEntity>;
  delete(id: string): Promise<void>;
  countByCustomerId(customerId: string): Promise<number>;
  countByCookId(cookId: string): Promise<number>;
  getTotalRevenueByCookId(cookId: string): Promise<number>;
}
