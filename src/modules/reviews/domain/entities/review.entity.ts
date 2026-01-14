// ============================================================================
// src/modules/reviews/domain/entities/review.entity.ts
// ============================================================================
import { Timestamp } from "@core/types";

export interface ReviewProps extends Timestamp {
  id: string;
  orderId: string;
  cookId: string;
  customerId: string;
  rating: number;
  comment: string;
  reply?: string | null;
  repliedAt?: Date | null;
}

export class ReviewEntity {
  private constructor(private props: ReviewProps) {}

  static create(props: {
    orderId: string;
    cookId: string;
    customerId: string;
    rating: number;
    comment: string;
  }): ReviewEntity {
    const now = new Date();

    return new ReviewEntity({
      id: "",
      orderId: props.orderId,
      cookId: props.cookId,
      customerId: props.customerId,
      rating: props.rating,
      comment: props.comment,
      reply: null,
      repliedAt: null,
      createdAt: now,
      updatedAt: now,
    });
  }

  static fromPersistence(props: ReviewProps): ReviewEntity {
    return new ReviewEntity(props);
  }

  get id(): string {
    return this.props.id;
  }

  get orderId(): string {
    return this.props.orderId;
  }

  get cookId(): string {
    return this.props.cookId;
  }

  get customerId(): string {
    return this.props.customerId;
  }

  get rating(): number {
    return this.props.rating;
  }

  get comment(): string {
    return this.props.comment;
  }

  get reply(): string | null | undefined {
    return this.props.reply;
  }

  get repliedAt(): Date | null | undefined {
    return this.props.repliedAt;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  replyToReview(reply: string): void {
    this.props.reply = reply;
    this.props.repliedAt = new Date();
    this.props.updatedAt = new Date();
  }

  toJSON() {
    return {
      id: this.props.id,
      orderId: this.props.orderId,
      cookId: this.props.cookId,
      customerId: this.props.customerId,
      rating: this.props.rating,
      comment: this.props.comment,
      reply: this.props.reply ?? null,
      repliedAt: this.props.repliedAt ?? null,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    };
  }
}

