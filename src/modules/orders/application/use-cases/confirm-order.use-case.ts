// ============================================================================
// src/modules/orders/application/use-cases/confirm-order.use-case.ts
// ============================================================================
import { IOrderRepository } from "../../domain/repositories/order.repository";
import { ICookRepository } from "@modules/cooks/domain/repositories/cook.repository";
import { OrderValidationService } from "../../domain/services/order-validation.service";
import { NotFoundError, ForbiddenError } from "@core/errors";

export class ConfirmOrderUseCase {
  constructor(
    private readonly orderRepository: IOrderRepository,
    private readonly cookRepository: ICookRepository
  ) {}

  async execute(orderId: string, cookUserId: string) {
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      throw new NotFoundError("Order not found");
    }

    const cook = await this.cookRepository.findByUserId(cookUserId);
    if (!cook || cook.id !== order.cookId) {
      throw new ForbiddenError(
        "You can only confirm orders for your restaurant"
      );
    }

    OrderValidationService.canConfirm(order);

    order.confirm();
    const updated = await this.orderRepository.save(order);

    // TODO: Send notification to customer

    return updated.toJSON();
  }
}
