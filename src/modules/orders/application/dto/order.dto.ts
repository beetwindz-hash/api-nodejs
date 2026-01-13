// ============================================================================
// src/modules/orders/application/dto/order.dto.ts
// ============================================================================
import { PaymentMethod } from "../../domain/entities/order.entity";
import { OrderStatus } from "@core/types";

export interface CreateOrderItemDto {
  dishId: string;
  quantity: number;
  specialInstructions?: string;
}

export interface CreateOrderDto {
  cookId: string;
  items: CreateOrderItemDto[];
  deliveryAddressId: string;
  paymentMethod: PaymentMethod;
  notes?: string;
}

export interface UpdateOrderStatusDto {
  status: OrderStatus;
}

export interface CancelOrderDto {
  reason: string;
}

export interface SearchOrdersDto {
  status?: OrderStatus;
  startDate?: string;
  endDate?: string;
  minTotal?: number;
  maxTotal?: number;
  page?: number;
  limit?: number;
}
