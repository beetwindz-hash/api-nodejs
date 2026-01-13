// ============================================================================
// src/modules/cooks/infrastructure/repositories/cook.repository.impl.ts
// ============================================================================
import {
  ICookRepository,
  CookSearchFilters,
} from "../../domain/repositories/cook.repository";
import { CookEntity } from "../../domain/entities/cook.entity";
import { CookModel } from "../models/cook.model";
import { CookMapper } from "../mappers/cook.mapper";
import { QueryOptions } from "@core/types";
import mongoose from "mongoose";

export class CookRepositoryImpl implements ICookRepository {
  async findById(id: string): Promise<CookEntity | null> {
    const cook = await CookModel.findById(id);
    return cook ? CookMapper.toDomain(cook) : null;
  }

  async findByUserId(userId: string): Promise<CookEntity | null> {
    const cook = await CookModel.findOne({
      userId: new mongoose.Types.ObjectId(userId),
    });
    return cook ? CookMapper.toDomain(cook) : null;
  }

  async findAll(
    options: QueryOptions
  ): Promise<{ cooks: CookEntity[]; total: number }> {
    const page = options.page || 1;
    const limit = options.limit || 10;
    const skip = (page - 1) * limit;

    const [cooks, total] = await Promise.all([
      CookModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      CookModel.countDocuments(),
    ]);

    return {
      cooks: cooks.map(CookMapper.toDomain),
      total,
    };
  }

  async search(
    filters: CookSearchFilters,
    options: QueryOptions
  ): Promise<{ cooks: CookEntity[]; total: number }> {
    const page = options.page || 1;
    const limit = options.limit || 10;
    const skip = (page - 1) * limit;

    const query: any = {};

    if (filters.cuisines && filters.cuisines.length > 0) {
      query.cuisines = { $in: filters.cuisines };
    }

    if (filters.city) {
      query["location.city"] = { $regex: new RegExp(filters.city, "i") };
    }

    if (filters.minRating !== undefined) {
      query.rating = { $gte: filters.minRating };
    }

    if (filters.status) {
      query.status = filters.status;
    }

    if (filters.isVerified !== undefined) {
      query.isVerified = filters.isVerified;
    }

    // Geospatial search if coordinates provided
    if (filters.coordinates && filters.maxDistance) {
      query["location.coordinates"] = {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [filters.coordinates.lng, filters.coordinates.lat],
          },
          $maxDistance: filters.maxDistance * 1000, // Convert km to meters
        },
      };
    }

    const [cooks, total] = await Promise.all([
      CookModel.find(query)
        .sort({ rating: -1, totalReviews: -1 })
        .skip(skip)
        .limit(limit),
      CookModel.countDocuments(query),
    ]);

    return {
      cooks: cooks.map(CookMapper.toDomain),
      total,
    };
  }

  async findNearby(
    lat: number,
    lng: number,
    maxDistanceKm: number
  ): Promise<CookEntity[]> {
    const cooks = await CookModel.find({
      "location.coordinates": {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [lng, lat],
          },
          $maxDistance: maxDistanceKm * 1000, // Convert km to meters
        },
      },
      status: "active",
      isVerified: true,
    }).limit(20);

    return cooks.map(CookMapper.toDomain);
  }

  async save(cook: CookEntity): Promise<CookEntity> {
    const persistenceData = CookMapper.toPersistence(cook);

    if (cook.id) {
      const updated = await CookModel.findByIdAndUpdate(
        cook.id,
        persistenceData,
        { new: true }
      );
      return CookMapper.toDomain(updated!);
    }

    const created = await CookModel.create(persistenceData);
    return CookMapper.toDomain(created);
  }

  async update(id: string, data: Partial<CookEntity>): Promise<CookEntity> {
    const updated = await CookModel.findByIdAndUpdate(id, data, { new: true });
    if (!updated) {
      throw new Error("Cook not found");
    }
    return CookMapper.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await CookModel.findByIdAndDelete(id);
  }

  async exists(userId: string): Promise<boolean> {
    const count = await CookModel.countDocuments({
      userId: new mongoose.Types.ObjectId(userId),
    });
    return count > 0;
  }
}
