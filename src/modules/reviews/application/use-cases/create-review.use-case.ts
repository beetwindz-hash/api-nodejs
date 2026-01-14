// ============================================================================
// src/modules/reviews/application/use-cases/create-review.use-case.ts
// ============================================================================
import { IReviewRepository } from "../../domain/repositories/review.repository";
import { ReviewEntity } from "../../domain/entities/review.entity";
import { CreateReviewDto } from "../dto/review.dto";
import { IOrderRepository } from "@modules/orders/domain/repositories/order.repository";
import { NotFoundError, ForbiddenError } from "@core/errors";
import { ICookRepository } from "@modules/cooks/domain/repositories/cook.repository";

export class CreateReviewUseCase {
  constructor(
    private readonly reviewRepository: IReviewRepository,
    private readonly orderRepository: IOrderRepository,
    private readonly cookRepository: ICookRepository
  ) {}

  async execute(customerId: string, dto: CreateReviewDto) {
    const order = await this.orderRepository.findById(dto.orderId);

    if (!order) {
      throw new NotFoundError("Order not found");
    }

    if (order.customerId !== customerId) {
      throw new ForbiddenError("You can only review your own orders");
    }

    if (order.cookId !== dto.cookId) {
      throw new ForbiddenError("Order does not belong to this cook");
    }

    // Ensure cook exists
    const cook = await this.cookRepository.findById(dto.cookId);
    if (!cook) {
      throw new NotFoundError("Cook not found");
    }

    const alreadyReviewed =
      await this.reviewRepository.existsByOrderAndCustomer(
        dto.orderId,
        customerId
      );

    if (alreadyReviewed) {
      throw new ForbiddenError("You have already reviewed this order");
    }

    const review = ReviewEntity.create({
      orderId: dto.orderId,
      cookId: dto.cookId,
      customerId,
      rating: dto.rating,
      comment: dto.comment.trim(),
    });

    const saved = await this.reviewRepository.save(review);

    // Update cook rating
    cook.updateRating(saved.rating, true);
    await this.cookRepository.save(cook);

    return saved.toJSON();
  }
}

