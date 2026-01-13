// ============================================================================
// src/modules/cooks/domain/repositories/cook.repository.ts
// ============================================================================
import { CookEntity } from "../entities/cook.entity";
import { CuisineType, CookStatus } from "../entities/cook.entity";
import { QueryOptions } from "@core/types";

export interface CookSearchFilters {
  cuisines?: CuisineType[];
  city?: string;
  maxDistance?: number;
  minRating?: number;
  status?: CookStatus;
  isVerified?: boolean;
  coordinates?: { lat: number; lng: number };
}

export interface ICookRepository {
  findById(id: string): Promise<CookEntity | null>;
  findByUserId(userId: string): Promise<CookEntity | null>;
  findAll(
    options: QueryOptions
  ): Promise<{ cooks: CookEntity[]; total: number }>;
  search(
    filters: CookSearchFilters,
    options: QueryOptions
  ): Promise<{ cooks: CookEntity[]; total: number }>;
  findNearby(
    lat: number,
    lng: number,
    maxDistanceKm: number
  ): Promise<CookEntity[]>;
  save(cook: CookEntity): Promise<CookEntity>;
  update(id: string, data: Partial<CookEntity>): Promise<CookEntity>;
  delete(id: string): Promise<void>;
  exists(userId: string): Promise<boolean>;
}
