// ============================================================================
// src/modules/reviews/domain/repositories/review.repository.ts
// ============================================================================
import { ReviewEntity } from "../entities/review.entity";
import { QueryOptions } from "@core/types";

export interface ReviewSearchFilters {
  cookId?: string;
  customerId?: string;
  minRating?: number;
  maxRating?: number;
}

export interface IReviewRepository {
  findById(id: string): Promise<ReviewEntity | null>;
  findAll(
    filters: ReviewSearchFilters,
    options: QueryOptions
  ): Promise<{ reviews: ReviewEntity[]; total: number }>;
  findByCookId(
    cookId: string,
    options: QueryOptions
  ): Promise<{ reviews: ReviewEntity[]; total: number }>;
  save(review: ReviewEntity): Promise<ReviewEntity>;
  delete(id: string): Promise<void>;
  getCookStats(cookId: string): Promise<{
    averageRating: number;
    totalReviews: number;
    ratingDistribution: Record<string, number>;
  }>;
  existsByOrderAndCustomer(
    orderId: string,
    customerId: string
  ): Promise<boolean>;
}

