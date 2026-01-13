// ============================================================================
// src/modules/cooks/application/dto/cook.dto.ts
// ============================================================================
import {
  CuisineType,
  AvailabilitySlot,
} from "../../domain/entities/cook.entity";

export interface CreateCookDto {
  bio?: string;
  cuisines: CuisineType[];
  specialties: string[];
  yearsOfExperience: number;
  certifications?: string[];
  businessName?: string;
  businessLicense?: string;
  phoneNumber: string;
  location: {
    address: string;
    city: string;
    state?: string;
    postalCode?: string;
    country: string;
    latitude?: number;
    longitude?: number;
  };
  deliveryRadius: number;
  deliveryFee: number;
  minimumOrder: number;
  availability: AvailabilitySlot[];
}

export interface UpdateCookProfileDto {
  bio?: string;
  cuisines?: CuisineType[];
  specialties?: string[];
  yearsOfExperience?: number;
  businessName?: string;
  phoneNumber?: string;
}

export interface UpdateLocationDto {
  address: string;
  city: string;
  state?: string;
  postalCode?: string;
  country: string;
  latitude?: number;
  longitude?: number;
}

export interface UpdateDeliverySettingsDto {
  deliveryRadius: number;
  deliveryFee: number;
  minimumOrder: number;
}

export interface UpdateAvailabilityDto {
  availability: AvailabilitySlot[];
}

export interface SearchCooksDto {
  cuisines?: CuisineType[];
  city?: string;
  maxDistance?: number;
  minRating?: number;
  latitude?: number;
  longitude?: number;
  page?: number;
  limit?: number;
}
