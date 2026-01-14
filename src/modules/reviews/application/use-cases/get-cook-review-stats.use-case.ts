// ============================================================================
// src/modules/reviews/application/use-cases/get-cook-review-stats.use-case.ts
// ============================================================================
import { IReviewRepository } from "../../domain/repositories/review.repository";
import { NotFoundError } from "@core/errors";
import { ICookRepository } from "@modules/cooks/domain/repositories/cook.repository";

export class GetCookReviewStatsUseCase {
  constructor(
    private readonly reviewRepository: IReviewRepository,
    private readonly cookRepository: ICookRepository
  ) {}

  async execute(cookId: string) {
    const cook = await this.cookRepository.findById(cookId);

    if (!cook) {
      throw new NotFoundError("Cook not found");
    }

    const stats = await this.reviewRepository.getCookStats(cookId);

    return stats;
  }
}

