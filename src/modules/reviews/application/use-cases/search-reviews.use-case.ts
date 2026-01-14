// ============================================================================
// src/modules/reviews/application/use-cases/search-reviews.use-case.ts
// ============================================================================
import { IReviewRepository } from "../../domain/repositories/review.repository";
import { SearchReviewsDto } from "../dto/review.dto";
import { PaginationUtil } from "@core/utils";

export class SearchReviewsUseCase {
  constructor(private readonly reviewRepository: IReviewRepository) {}

  async execute(dto: SearchReviewsDto) {
    const pagination = PaginationUtil.getPagination({
      page: dto.page,
      limit: dto.limit,
    });

    const { reviews, total } = await this.reviewRepository.findAll(
      {
        cookId: dto.cookId,
        customerId: dto.customerId,
        minRating: dto.minRating,
        maxRating: dto.maxRating,
      },
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

