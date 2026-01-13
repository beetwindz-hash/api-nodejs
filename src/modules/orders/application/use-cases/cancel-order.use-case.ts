// ============================================================================
// src/modules/orders/application/use-cases/cancel-order.use-case.ts
// ============================================================================
import { IOrderRepository } from "../../domain/repositories/order.repository";
import { ICookRepository } from "@modules/cooks/domain/repositories/cook.repository";
import { OrderValidationService } from "../../domain/services/order-validation.service";
import { CancelOrderDto } from "../dto/order.dto";
import { NotFoundError, ForbiddenError } from "@core/errors";

export class CancelOrderUseCase {
  constructor(
    private readonly orderRepository: IOrderRepository,
    private readonly cookRepository: ICookRepository
  ) {}

  async execute(
    orderId: string,
    userId: string,
    userRole: "customer" | "cook" | "admin",
    dto: CancelOrderDto
  ) {
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      throw new NotFoundError("Order not found");
    }

    // Check authorization
    if (userRole === "customer" && order.customerId !== userId) {
      throw new ForbiddenError("You can only cancel your own orders");
    }

    if (userRole === "cook") {
      const cook = await this.cookRepository.findByUserId(userId);
      if (!cook || cook.id !== order.cookId) {
        throw new ForbiddenError(
          "You can only cancel orders for your restaurant"
        );
      }
    }

    OrderValidationService.canCancel(order, userRole);

    order.cancel(dto.reason, userRole);
    const updated = await this.orderRepository.save(order);

    // TODO: Process refund if payment was completed
    // TODO: Send notification

    return updated.toJSON();
  }
}
