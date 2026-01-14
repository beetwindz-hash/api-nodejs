// ============================================================================
// src/modules/reviews/application/use-cases/get-review.use-case.ts
// ============================================================================
import { IReviewRepository } from "../../domain/repositories/review.repository";
import { NotFoundError } from "@core/errors";

export class GetReviewUseCase {
  constructor(private readonly reviewRepository: IReviewRepository) {}

  async execute(id: string) {
    const review = await this.reviewRepository.findById(id);

    if (!review) {
      throw new NotFoundError("Review not found");
    }

    return review.toJSON();
  }
}

