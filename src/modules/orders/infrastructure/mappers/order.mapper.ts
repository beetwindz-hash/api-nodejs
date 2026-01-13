// ============================================================================
// src/modules/orders/infrastructure/mappers/order.mapper.ts
// ============================================================================
import { OrderEntity } from "../../domain/entities/order.entity";
import { IOrderDocument } from "../models/order.model";

export class OrderMapper {
  static toDomain(document: IOrderDocument): OrderEntity {
    return OrderEntity.fromPersistence({
      id: document._id.toString(),
      orderNumber: document.orderNumber,
      customerId: document.customerId.toString(),
      cookId: document.cookId.toString(),
      items: document.items.map((item) => ({
        dishId: item.dishId.toString(),
        dishName: item.dishName,
        quantity: item.quantity,
        price: item.price,
        specialInstructions: item.specialInstructions,
      })),
      deliveryAddress: document.deliveryAddress,
      status: document.status,
      paymentMethod: document.paymentMethod,
      paymentStatus: document.paymentStatus,
      subtotal: document.subtotal,
      deliveryFee: document.deliveryFee,
      serviceFee: document.serviceFee,
      tax: document.tax,
      discount: document.discount,
      total: document.total,
      estimatedPreparationTime: document.estimatedPreparationTime,
      estimatedDeliveryTime: document.estimatedDeliveryTime,
      actualDeliveryTime: document.actualDeliveryTime,
      notes: document.notes,
      cancelReason: document.cancelReason,
      cancelledBy: document.cancelledBy,
      cancelledAt: document.cancelledAt,
      confirmedAt: document.confirmedAt,
      preparingAt: document.preparingAt,
      readyAt: document.readyAt,
      deliveringAt: document.deliveringAt,
      deliveredAt: document.deliveredAt,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    });
  }

  static toPersistence(entity: OrderEntity): Partial<IOrderDocument> {
    const json = entity.toJSON();
    return {
      orderNumber: json.orderNumber,
      customerId: json.customerId as any,
      cookId: json.cookId as any,
      items: json.items.map((item) => ({
        dishId: item.dishId as any,
        dishName: item.dishName,
        quantity: item.quantity,
        price: item.price,
        specialInstructions: item.specialInstructions,
      })),
      deliveryAddress: json.deliveryAddress,
      status: json.status,
      paymentMethod: json.paymentMethod,
      paymentStatus: json.paymentStatus,
      subtotal: json.subtotal,
      deliveryFee: json.deliveryFee,
      serviceFee: json.serviceFee,
      tax: json.tax,
      discount: json.discount,
      total: json.total,
      estimatedPreparationTime: json.estimatedPreparationTime,
      estimatedDeliveryTime: json.estimatedDeliveryTime,
      actualDeliveryTime: json.actualDeliveryTime,
      notes: json.notes,
      cancelReason: json.cancelReason,
      cancelledBy: json.cancelledBy,
      cancelledAt: json.cancelledAt,
      confirmedAt: json.confirmedAt,
      preparingAt: json.preparingAt,
      readyAt: json.readyAt,
      deliveringAt: json.deliveringAt,
      deliveredAt: json.deliveredAt,
    };
  }
}
