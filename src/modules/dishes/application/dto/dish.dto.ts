// ============================================================================
// src/modules/dishes/application/dto/dish.dto.ts
// ============================================================================
import {
  DishCategory,
  DietaryInfo,
  NutritionalInfo,
  PortionSize,
  SpiceLevel,
} from "../../domain/entities/dish.entity";
import { CuisineType } from "@modules/cooks/domain/entities/cook.entity";

export interface CreateDishDto {
  name: string;
  description: string;
  category: DishCategory;
  cuisine: CuisineType;
  price: number;
  originalPrice?: number;
  preparationTime: number;
  servings: number;
  portionSize: PortionSize;
  spiceLevel: SpiceLevel;
  ingredients: string[];
  dietaryInfo: DietaryInfo;
  nutritionalInfo?: NutritionalInfo;
  tags?: string[];
  maxOrdersPerDay?: number;
}

export interface UpdateDishDto {
  name?: string;
  description?: string;
  category?: DishCategory;
  cuisine?: CuisineType;
  preparationTime?: number;
  servings?: number;
  portionSize?: PortionSize;
  spiceLevel?: SpiceLevel;
}

export interface UpdatePricingDto {
  price: number;
  originalPrice?: number;
}

export interface UpdateDietaryInfoDto {
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  isDairyFree?: boolean;
  isNutFree?: boolean;
  isHalal?: boolean;
  allergens?: string[];
  calories?: number;
}

export interface SearchDishesDto {
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
  tags?: string[];
  search?: string;
  page?: number;
  limit?: number;
  sort?: "newest" | "popular" | "rating" | "price_low" | "price_high";
}
