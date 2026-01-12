// ============================================================================
// src/modules/users/application/dto/user.dto.ts
// ============================================================================
import { Address, Preferences } from "@core/types";

export interface UpdateProfileDto {
  name?: string;
  phone?: string;
  address?: Address;
  preferences?: Preferences;
}

export interface CreateAddressDto {
  label: string;
  street: string;
  city: string;
  state?: string;
  postalCode?: string;
  country: string;
  isDefault?: boolean;
  phone?: string;
  instructions?: string;
  latitude?: number;
  longitude?: number;
}

export interface UpdateAddressDto {
  label?: string;
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  isDefault?: boolean;
  phone?: string;
  instructions?: string;
  latitude?: number;
  longitude?: number;
}
