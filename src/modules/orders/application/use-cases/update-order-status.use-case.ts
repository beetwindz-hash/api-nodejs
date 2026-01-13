// ============================================================================
// src/modules/orders/application/use-cases/update-order-status.use-case.ts
// ============================================================================
import { IOrderRepository } from "../../domain/repositories/order.repository";
import { ICookRepository } from "@modules/cooks/domain/repositories/cook.repository";
import { OrderValidationService } from "../../domain/services/order-validation.service";
import { UpdateOrderStatusDto } from "../dto/order.dto";
import { NotFoundError, ForbiddenError } from "@core/errors";

export class UpdateOrderStatusUseCase {
  constructor(
    private readonly orderRepository: IOrderRepository,
    private readonly cookRepository: ICookRepository
  ) {}

  async execute(
    orderId: string,
    cookUserId: string,
    dto: UpdateOrderStatusDto
  ) {
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      throw new NotFoundError("Order not found");
    }

    const cook = await this.cookRepository.findByUserId(cookUserId);
    if (!cook || cook.id !== order.cookId) {
      throw new ForbiddenError(
        "You can only update orders for your restaurant"
      );
    }

    OrderValidationService.validateStatusTransition(order.status, dto.status);

    switch (dto.status) {
      case "confirmed":
        order.confirm();
        break;
      case "preparing":
        order.startPreparing();
        break;
      case "ready":
        order.markReady();
        break;
      case "delivering":
        order.startDelivering();
        break;
      case "delivered":
        order.markDelivered();
        break;
      default:
        throw new Error("Invalid status");
    }

    const updated = await this.orderRepository.save(order);

    // TODO: Send notification to customer

    return updated.toJSON();
  }
}
