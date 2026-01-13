// ============================================================================
// src/modules/orders/application/use-cases/get-order.use-case.ts
// ============================================================================
import { IOrderRepository } from "../../domain/repositories/order.repository";
import { IUserRepository } from "@modules/auth/domain/repositories/user.repository";
import { ICookRepository } from "@modules/cooks/domain/repositories/cook.repository";
import { NotFoundError, ForbiddenError } from "@core/errors";

export class GetOrderUseCase {
  constructor(
    private readonly orderRepository: IOrderRepository,
    private readonly userRepository: IUserRepository,
    private readonly cookRepository: ICookRepository
  ) {}

  async execute(orderId: string, userId: string, userRole: string) {
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      throw new NotFoundError("Order not found");
    }

    // Check authorization
    if (userRole === "customer" && order.customerId !== userId) {
      throw new ForbiddenError("You can only view your own orders");
    }

    if (userRole === "cook") {
      const cook = await this.cookRepository.findByUserId(userId);
      if (!cook || cook.id !== order.cookId) {
        throw new ForbiddenError(
          "You can only view orders for your restaurant"
        );
      }
    }

    // Fetch customer and cook details
    const customer = await this.userRepository.findById(order.customerId);
    const cook = await this.cookRepository.findById(order.cookId);

    return {
      ...order.toJSON(),
      customer: customer
        ? {
            id: customer.id,
            name: customer.name,
            email: customer.email,
          }
        : null,
      cook: cook
        ? {
            id: cook.id,
            businessName: cook.businessName,
            phone: cook.phoneNumber,
          }
        : null,
    };
  }
}
