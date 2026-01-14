// ============================================================================
// src/modules/reviews/application/use-cases/get-cook-reviews.use-case.ts
// ============================================================================
import { IReviewRepository } from "../../domain/repositories/review.repository";
import { PaginationUtil } from "@core/utils";

export class GetCookReviewsUseCase {
  constructor(private readonly reviewRepository: IReviewRepository) {}

  async execute(cookId: string, page?: number, limit?: number) {
    const pagination = PaginationUtil.getPagination({ page, limit });

    const { reviews, total } = await this.reviewRepository.findByCookId(
      cookId,
      {
        page: pagination.page,
        limit: pagination.limit,
      }
    );

    return {
      reviews: reviews.map((r) => r.toJSON()),
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        total,
        totalPages: Math.ceil(total / pagination.limit),
      },
    };
  }
}

