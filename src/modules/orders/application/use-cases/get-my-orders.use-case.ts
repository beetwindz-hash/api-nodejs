// ============================================================================
// src/modules/orders/application/use-cases/get-my-orders.use-case.ts
// ============================================================================
import { IOrderRepository } from "../../domain/repositories/order.repository";
import { PaginationUtil } from "@core/utils";

export class GetMyOrdersUseCase {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(customerId: string, page?: number, limit?: number) {
    const pagination = PaginationUtil.getPagination({ page, limit });

    const { orders, total } = await this.orderRepository.findByCustomerId(
      customerId,
      {
        page: pagination.page,
        limit: pagination.limit,
      }
    );

    return {
      orders: orders.map((order) => order.toJSON()),
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        total,
        totalPages: Math.ceil(total / pagination.limit),
      },
    };
  }
}
