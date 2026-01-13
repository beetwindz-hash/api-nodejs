// ============================================================================
// src/modules/orders/application/use-cases/search-orders.use-case.ts
// ============================================================================
import { IOrderRepository } from "../../domain/repositories/order.repository";
import { SearchOrdersDto } from "../dto/order.dto";
import { PaginationUtil } from "@core/utils";

export class SearchOrdersUseCase {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(dto: SearchOrdersDto, userRole: string, userId?: string) {
    const pagination = PaginationUtil.getPagination({
      page: dto.page,
      limit: dto.limit,
    });

    const filters: any = {
      status: dto.status,
      minTotal: dto.minTotal,
      maxTotal: dto.maxTotal,
    };

    if (dto.startDate) {
      filters.startDate = new Date(dto.startDate);
    }

    if (dto.endDate) {
      filters.endDate = new Date(dto.endDate);
    }

    // For customers, only show their orders
    if (userRole === "customer" && userId) {
      filters.customerId = userId;
    }

    const { orders, total } = await this.orderRepository.search(filters, {
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
