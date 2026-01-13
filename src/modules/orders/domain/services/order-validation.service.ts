// ============================================================================
// src/modules/orders/domain/services/order-validation.service.ts
// ============================================================================
import { OrderEntity } from "../entities/order.entity";
import { BusinessRuleViolationError } from "@core/errors";

export class OrderValidationService {
  static canConfirm(order: OrderEntity): void {
    if (order.status !== "pending") {
      throw new BusinessRuleViolationError(
        "Only pending orders can be confirmed"
      );
    }

    if (order.paymentMethod === "card" && order.paymentStatus !== "completed") {
      throw new BusinessRuleViolationError(
        "Card payment must be completed before confirmation"
      );
    }
  }

  static canCancel(
    order: OrderEntity,
    role: "customer" | "cook" | "admin"
  ): void {
    if (order.status === "delivered") {
      throw new BusinessRuleViolationError(
        "Delivered orders cannot be cancelled"
      );
    }

    if (order.status === "cancelled") {
      throw new BusinessRuleViolationError("Order is already cancelled");
    }

    if (role === "customer" && !order.canBeCancelledByCustomer()) {
      throw new BusinessRuleViolationError(
        "Customer can only cancel pending or confirmed orders"
      );
    }

    if (role === "cook" && !order.canBeCancelledByCook()) {
      throw new BusinessRuleViolationError(
        "Cook cannot cancel orders in current status"
      );
    }
  }

  static validateStatusTransition(
    currentStatus: string,
    newStatus: string
  ): void {
    const validTransitions: Record<string, string[]> = {
      pending: ["confirmed", "cancelled"],
      confirmed: ["preparing", "cancelled"],
      preparing: ["ready", "cancelled"],
      ready: ["delivering", "cancelled"],
      delivering: ["delivered", "cancelled"],
      delivered: [],
      cancelled: [],
    };

    const allowed = validTransitions[currentStatus] || [];
    if (!allowed.includes(newStatus)) {
      throw new BusinessRuleViolationError(
        `Invalid status transition from ${currentStatus} to ${newStatus}`
      );
    }
  }
}
