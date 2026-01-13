// ============================================================================
// src/modules/orders/application/use-cases/get-cook-orders.use-case.ts
// ============================================================================
import { IOrderRepository } from "../../domain/repositories/order.repository";
import { ICookRepository } from "@modules/cooks/domain/repositories/cook.repository";
import { NotFoundError } from "@core/errors";
import { PaginationUtil } from "@core/utils";

export class GetCookOrdersUseCase {
  constructor(
    private readonly orderRepository: IOrderRepository,
    private readonly cookRepository: ICookRepository
  ) {}

  async execute(userId: string, page?: number, limit?: number) {
    const cook = await this.cookRepository.findByUserId(userId);
    if (!cook) {
      throw new NotFoundError("Cook profile not found");
    }

    const pagination = PaginationUtil.getPagination({ page, limit });

    const { orders, total } = await this.orderRepository.findByCookId(cook.id, {
      page: pagination.page,
      limit: pagination.limit,
    });

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
