// ============================================================================
// src/modules/dishes/repositories/dish.repository.impl.ts
// ============================================================================
import {
  IDishRepository,
  DishSearchFilters,
} from "../../domain/repositories/dish.repository";
import { DishEntity } from "../../domain/entities/dish.entity";
import { DishModel } from "../infrastructure/models/dish.model";
import { DishMapper } from "../infrastructure/mappers/dish.mapper";
import { QueryOptions } from "@core/types";
import mongoose from "mongoose";

export class DishRepositoryImpl implements IDishRepository {
  async findById(id: string): Promise<DishEntity | null> {
    const dish = await DishModel.findById(id);
    return dish ? DishMapper.toDomain(dish) : null;
  }

  async findByCookId(
    cookId: string,
    options: QueryOptions
  ): Promise<{ dishes: DishEntity[]; total: number }> {
    const page = options.page || 1;
    const limit = options.limit || 10;
    const skip = (page - 1) * limit;

    const [dishes, total] = await Promise.all([
      DishModel.find({ cookId: new mongoose.Types.ObjectId(cookId) })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      DishModel.countDocuments({ cookId: new mongoose.Types.ObjectId(cookId) }),
    ]);

    return {
      dishes: dishes.map(DishMapper.toDomain),
      total,
    };
  }

  async findAll(
    options: QueryOptions
  ): Promise<{ dishes: DishEntity[]; total: number }> {
    const page = options.page || 1;
    const limit = options.limit || 10;
    const skip = (page - 1) * limit;

    const [dishes, total] = await Promise.all([
      DishModel.find({ status: "active", isAvailable: true })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      DishModel.countDocuments({ status: "active", isAvailable: true }),
    ]);

    return {
      dishes: dishes.map(DishMapper.toDomain),
      total,
    };
  }

  async search(
    filters: DishSearchFilters,
    options: QueryOptions
  ): Promise<{ dishes: DishEntity[]; total: number }> {
    const page = options.page || 1;
    const limit = options.limit || 10;
    const skip = (page - 1) * limit;

    const query: any = {};

    if (filters.cookId) {
      query.cookId = new mongoose.Types.ObjectId(filters.cookId);
    }

    if (filters.category) {
      query.category = filters.category;
    }

    if (filters.cuisine) {
      query.cuisine = filters.cuisine;
    }

    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      query.price = {};
      if (filters.minPrice !== undefined) query.price.$gte = filters.minPrice;
      if (filters.maxPrice !== undefined) query.price.$lte = filters.maxPrice;
    }

    if (filters.spiceLevel) {
      query.spiceLevel = filters.spiceLevel;
    }

    if (filters.isVegetarian !== undefined) {
      query["dietaryInfo.isVegetarian"] = filters.isVegetarian;
    }

    if (filters.isVegan !== undefined) {
      query["dietaryInfo.isVegan"] = filters.isVegan;
    }

    if (filters.isGlutenFree !== undefined) {
      query["dietaryInfo.isGlutenFree"] = filters.isGlutenFree;
    }

    if (filters.isDairyFree !== undefined) {
      query["dietaryInfo.isDairyFree"] = filters.isDairyFree;
    }

    if (filters.isHalal !== undefined) {
      query["dietaryInfo.isHalal"] = filters.isHalal;
    }

    if (filters.minRating !== undefined) {
      query.rating = { $gte: filters.minRating };
    }

    if (filters.status) {
      query.status = filters.status;
    }

    if (filters.isAvailable !== undefined) {
      query.isAvailable = filters.isAvailable;
    }

    if (filters.featured !== undefined) {
      query.featured = filters.featured;
    }

    if (filters.tags && filters.tags.length > 0) {
      query.tags = { $in: filters.tags };
    }

    if (filters.search) {
      query.$text = { $search: filters.search };
    }

    // Sort logic
    let sort: any = { createdAt: -1 };
    if (options.sort === "popular") {
      sort = { totalOrders: -1, viewCount: -1 };
    } else if (options.sort === "rating") {
      sort = { rating: -1, totalReviews: -1 };
    } else if (options.sort === "price_low") {
      sort = { price: 1 };
    } else if (options.sort === "price_high") {
      sort = { price: -1 };
    }

    const [dishes, total] = await Promise.all([
      DishModel.find(query).sort(sort).skip(skip).limit(limit),
      DishModel.countDocuments(query),
    ]);

    return {
      dishes: dishes.map(DishMapper.toDomain),
      total,
    };
  }

  async findFeatured(limit: number): Promise<DishEntity[]> {
    const dishes = await DishModel.find({
      featured: true,
      status: "active",
      isAvailable: true,
      $or: [
        { featuredUntil: { $exists: false } },
        { featuredUntil: { $gte: new Date() } },
      ],
    })
      .sort({ rating: -1 })
      .limit(limit);

    return dishes.map(DishMapper.toDomain);
  }

  async findPopular(limit: number): Promise<DishEntity[]> {
    const dishes = await DishModel.find({
      status: "active",
      isAvailable: true,
    })
      .sort({ totalOrders: -1, rating: -1 })
      .limit(limit);

    return dishes.map(DishMapper.toDomain);
  }

  async save(dish: DishEntity): Promise<DishEntity> {
    const persistenceData = DishMapper.toPersistence(dish);

    if (dish.id) {
      const updated = await DishModel.findByIdAndUpdate(
        dish.id,
        persistenceData,
        { new: true }
      );
      return DishMapper.toDomain(updated!);
    }

    const created = await DishModel.create(persistenceData);
    return DishMapper.toDomain(created);
  }

  async update(id: string, data: Partial<DishEntity>): Promise<DishEntity> {
    const updated = await DishModel.findByIdAndUpdate(id, data, { new: true });
    if (!updated) {
      throw new Error("Dish not found");
    }
    return DishMapper.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await DishModel.findByIdAndDelete(id);
  }

  async countByCookId(cookId: string): Promise<number> {
    return DishModel.countDocuments({
      cookId: new mongoose.Types.ObjectId(cookId),
    });
  }
}
