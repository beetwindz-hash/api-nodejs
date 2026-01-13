// ============================================================================
// src/modules/dishes/infrastructure/mappers/dish.mapper.ts
// ============================================================================
import { DishEntity } from "../../domain/entities/dish.entity";
import { IDishDocument } from "../models/dish.model";

export class DishMapper {
  static toDomain(document: IDishDocument): DishEntity {
    return DishEntity.fromPersistence({
      id: document._id.toString(),
      cookId: document.cookId.toString(),
      name: document.name,
      description: document.description,
      category: document.category,
      cuisine: document.cuisine,
      price: document.price,
      originalPrice: document.originalPrice,
      preparationTime: document.preparationTime,
      servings: document.servings,
      portionSize: document.portionSize,
      spiceLevel: document.spiceLevel,
      images: document.images,
      ingredients: document.ingredients,
      dietaryInfo: document.dietaryInfo,
      nutritionalInfo: document.nutritionalInfo,
      tags: document.tags,
      isAvailable: document.isAvailable,
      status: document.status,
      maxOrdersPerDay: document.maxOrdersPerDay,
      currentOrdersToday: document.currentOrdersToday,
      rating: document.rating,
      totalReviews: document.totalReviews,
      totalOrders: document.totalOrders,
      viewCount: document.viewCount,
      featured: document.featured,
      featuredUntil: document.featuredUntil,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    });
  }

  static toPersistence(entity: DishEntity): Partial<IDishDocument> {
    const json = entity.toJSON();
    return {
      cookId: json.cookId as any,
      name: json.name,
      description: json.description,
      category: json.category,
      cuisine: json.cuisine,
      price: json.price,
      originalPrice: json.originalPrice,
      preparationTime: json.preparationTime,
      servings: json.servings,
      portionSize: json.portionSize,
      spiceLevel: json.spiceLevel,
      images: json.images,
      ingredients: json.ingredients,
      dietaryInfo: json.dietaryInfo,
      nutritionalInfo: json.nutritionalInfo,
      tags: json.tags,
      isAvailable: json.isAvailable,
      status: json.status,
      maxOrdersPerDay: json.maxOrdersPerDay,
      currentOrdersToday: json.currentOrdersToday,
      rating: json.rating,
      totalReviews: json.totalReviews,
      totalOrders: json.totalOrders,
      viewCount: json.viewCount,
      featured: json.featured,
      featuredUntil: json.featuredUntil,
    };
  }
}
