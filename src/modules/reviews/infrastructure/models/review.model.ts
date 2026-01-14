// ============================================================================
// src/modules/reviews/infrastructure/models/review.model.ts
// ============================================================================
import mongoose, { Schema, Document } from "mongoose";

export interface IReviewDocument extends Document {
  orderId: mongoose.Types.ObjectId;
  cookId: mongoose.Types.ObjectId;
  customerId: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
  reply?: string | null;
  repliedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReviewDocument>(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      index: true,
    },
    cookId: {
      type: Schema.Types.ObjectId,
      ref: "Cook",
      required: true,
      index: true,
    },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      index: true,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
    reply: {
      type: String,
      default: null,
      maxlength: 2000,
    },
    repliedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

reviewSchema.index({ cookId: 1, createdAt: -1 });
reviewSchema.index({ customerId: 1, createdAt: -1 });
reviewSchema.index({ cookId: 1, rating: -1 });
reviewSchema.index({ orderId: 1, customerId: 1 }, { unique: true });

export const ReviewModel = mongoose.model<IReviewDocument>(
  "Review",
  reviewSchema
);

