// ============================================================================
// src/modules/dishes/domain/repositories/dish.repository.ts
// ============================================================================
import { DishEntity } from "../entities/dish.entity";
import { DishCategory, DishStatus, SpiceLevel } from "../entities/dish.entity";
import { CuisineType } from "@modules/cooks/domain/entities/cook.entity";
import { QueryOptions } from "@core/types";

export interface DishSearchFilters {
  cookId?: string;
  category?: DishCategory;
  cuisine?: CuisineType;
  minPrice?: number;
  maxPrice?: number;
  spiceLevel?: SpiceLevel;
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  isDairyFree?: boolean;
  isHalal?: boolean;
  minRating?: number;
  status?: DishStatus;
  isAvailable?: boolean;
  featured?: boolean;
  tags?: string[];
  search?: string;
}

export interface IDishRepository {
  findById(id: string): Promise<DishEntity | null>;
  findByCookId(
    cookId: string,
    options: QueryOptions
  ): Promise<{ dishes: DishEntity[]; total: number }>;
  findAll(
    options: QueryOptions
  ): Promise<{ dishes: DishEntity[]; total: number }>;
  search(
    filters: DishSearchFilters,
    options: QueryOptions
  ): Promise<{ dishes: DishEntity[]; total: number }>;
  findFeatured(limit: number): Promise<DishEntity[]>;
  findPopular(limit: number): Promise<DishEntity[]>;
  save(dish: DishEntity): Promise<DishEntity>;
  update(id: string, data: Partial<DishEntity>): Promise<DishEntity>;
  delete(id: string): Promise<void>;
  countByCookId(cookId: string): Promise<number>;
}
