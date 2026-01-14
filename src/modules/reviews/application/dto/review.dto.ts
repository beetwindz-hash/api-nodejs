// ============================================================================
// src/modules/reviews/application/dto/review.dto.ts
// ============================================================================

export interface CreateReviewDto {
  orderId: string;
  cookId: string;
  rating: number;
  comment: string;
}

export interface ReplyReviewDto {
  reply: string;
}

export interface SearchReviewsDto {
  cookId?: string;
  customerId?: string;
  minRating?: number;
  maxRating?: number;
  page?: number;
  limit?: number;
}

