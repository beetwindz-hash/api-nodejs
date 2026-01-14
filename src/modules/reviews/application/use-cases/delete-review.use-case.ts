// ============================================================================
// src/modules/reviews/application/use-cases/delete-review.use-case.ts
// ============================================================================
import { IReviewRepository } from "../../domain/repositories/review.repository";
import { NotFoundError, ForbiddenError } from "@core/errors";

export class DeleteReviewUseCase {
  constructor(private readonly reviewRepository: IReviewRepository) {}

  async execute(reviewId: string, userId: string) {
    const review = await this.reviewRepository.findById(reviewId);

    if (!review) {
      throw new NotFoundError("Review not found");
    }

    if (review.customerId !== userId) {
      throw new ForbiddenError("You can only delete your own reviews");
    }

    await this.reviewRepository.delete(reviewId);
  }
}

