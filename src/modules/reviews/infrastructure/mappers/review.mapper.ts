// ============================================================================
// src/modules/reviews/infrastructure/mappers/review.mapper.ts
// ============================================================================
import { ReviewEntity } from "../../domain/entities/review.entity";
import { IReviewDocument } from "../models/review.model";

export class ReviewMapper {
  static toDomain(document: IReviewDocument): ReviewEntity {
    return ReviewEntity.fromPersistence({
      id: document._id.toString(),
      orderId: document.orderId.toString(),
      cookId: document.cookId.toString(),
      customerId: document.customerId.toString(),
      rating: document.rating,
      comment: document.comment,
      reply: document.reply ?? null,
      repliedAt: document.repliedAt ?? null,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    });
  }

  static toPersistence(entity: ReviewEntity): Partial<IReviewDocument> {
    return {
      orderId: entity.orderId as any,
      cookId: entity.cookId as any,
      customerId: entity.customerId as any,
      rating: entity.rating,
      comment: entity.comment,
      reply: entity.reply ?? null,
      repliedAt: entity.repliedAt ?? null,
    };
  }
}

