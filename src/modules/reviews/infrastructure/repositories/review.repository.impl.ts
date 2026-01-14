// ============================================================================
// src/modules/reviews/infrastructure/repositories/review.repository.impl.ts
// ============================================================================
import {
  IReviewRepository,
  ReviewSearchFilters,
} from "../../domain/repositories/review.repository";
import { ReviewEntity } from "../../domain/entities/review.entity";
import { ReviewModel } from "../models/review.model";
import { ReviewMapper } from "../mappers/review.mapper";
import { QueryOptions } from "@core/types";
import mongoose from "mongoose";

export class ReviewRepositoryImpl implements IReviewRepository {
  async findById(id: string): Promise<ReviewEntity | null> {
    const doc = await ReviewModel.findById(id);
    return doc ? ReviewMapper.toDomain(doc) : null;
  }

  async findAll(
    filters: ReviewSearchFilters,
    options: QueryOptions
  ): Promise<{ reviews: ReviewEntity[]; total: number }> {
    const page = options.page || 1;
    const limit = options.limit || 10;
    const skip = (page - 1) * limit;

    const query: any = {};

    if (filters.cookId) {
      query.cookId = new mongoose.Types.ObjectId(filters.cookId);
    }

    if (filters.customerId) {
      query.customerId = new mongoose.Types.ObjectId(filters.customerId);
    }

    if (filters.minRating !== undefined || filters.maxRating !== undefined) {
      query.rating = {};
      if (filters.minRating !== undefined) {
        query.rating.$gte = filters.minRating;
      }
      if (filters.maxRating !== undefined) {
        query.rating.$lte = filters.maxRating;
      }
    }

    const [docs, total] = await Promise.all([
      ReviewModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      ReviewModel.countDocuments(query),
    ]);

    return {
      reviews: docs.map(ReviewMapper.toDomain),
      total,
    };
  }

  async findByCookId(
    cookId: string,
    options: QueryOptions
  ): Promise<{ reviews: ReviewEntity[]; total: number }> {
    return this.findAll({ cookId }, options);
  }

  async save(review: ReviewEntity): Promise<ReviewEntity> {
    const data = ReviewMapper.toPersistence(review);

    if (review.id) {
      const updated = await ReviewModel.findByIdAndUpdate(review.id, data, {
        new: true,
      });
      return ReviewMapper.toDomain(updated!);
    }

    const created = await ReviewModel.create(data);
    return ReviewMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await ReviewModel.findByIdAndDelete(id);
  }

  async getCookStats(cookId: string): Promise<{
    averageRating: number;
    totalReviews: number;
    ratingDistribution: Record<string, number>;
  }> {
    const cookObjectId = new mongoose.Types.ObjectId(cookId);

    const [agg] = await ReviewModel.aggregate([
      { $match: { cookId: cookObjectId } },
      {
        $group: {
          _id: "$cookId",
          averageRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 },
          ratingDistribution: {
            $push: "$rating",
          },
        },
      },
    ]);

    if (!agg) {
      return {
        averageRating: 0,
        totalReviews: 0,
        ratingDistribution: {
          "1": 0,
          "2": 0,
          "3": 0,
          "4": 0,
          "5": 0,
        },
      };
    }

    const distribution: Record<string, number> = {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
    };

    for (const rating of agg.ratingDistribution as number[]) {
      const key = String(rating) as keyof typeof distribution;
      if (distribution[key] !== undefined) {
        distribution[key] += 1;
      }
    }

    return {
      averageRating: agg.averageRating,
      totalReviews: agg.totalReviews,
      ratingDistribution: distribution,
    };
  }

  async existsByOrderAndCustomer(
    orderId: string,
    customerId: string
  ): Promise<boolean> {
    const doc = await ReviewModel.findOne({
      orderId: new mongoose.Types.ObjectId(orderId),
      customerId: new mongoose.Types.ObjectId(customerId),
    }).select({ _id: 1 });

    return !!doc;
  }
}

