// ============================================================================
// src/modules/reviews/application/use-cases/reply-review.use-case.ts
// ============================================================================
import { IReviewRepository } from "../../domain/repositories/review.repository";
import { ICookRepository } from "@modules/cooks/domain/repositories/cook.repository";
import { NotFoundError, ForbiddenError } from "@core/errors";
import { ReplyReviewDto } from "../dto/review.dto";

export class ReplyReviewUseCase {
  constructor(
    private readonly reviewRepository: IReviewRepository,
    private readonly cookRepository: ICookRepository
  ) {}

  async execute(reviewId: string, cookUserId: string, dto: ReplyReviewDto) {
    const review = await this.reviewRepository.findById(reviewId);

    if (!review) {
      throw new NotFoundError("Review not found");
    }

    const cook = await this.cookRepository.findById(review.cookId);

    if (!cook) {
      throw new NotFoundError("Cook not found for this review");
    }

    if (cook.userId !== cookUserId) {
      throw new ForbiddenError("You can only reply to your own reviews");
    }

    review.replyToReview(dto.reply.trim());

    const saved = await this.reviewRepository.save(review);

    return saved.toJSON();
  }
}

