// ============================================================================
// src/core/types/common.types.ts
// ============================================================================
export type Role = "customer" | "cook" | "admin";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "ready"
  | "delivering"
  | "delivered"
  | "cancelled";

export type ApplicationStatus = "pending" | "approved" | "rejected";

export type NotificationType =
  | "order_update"
  | "new_order"
  | "message"
  | "review"
  | "application_update";

export interface Timestamp {
  createdAt: Date;
  updatedAt: Date;
}

export interface SoftDelete {
  deletedAt?: Date;
  isDeleted: boolean;
}

export interface Pagination {
  page: number;
  limit: number;
  skip: number;
}

export interface QueryOptions {
  page?: number;
  limit?: number;
  sort?: string;
  order?: "asc" | "desc";
  search?: string;
  filter?: Record<string, any>;
}

export interface Address {
  street: string;
  city: string;
  state?: string;
  postalCode?: string;
  country: string;
  isDefault: boolean;
  phone?: string;
  instructions?: string;
  latitude?: number;
  longitude?: number;
}

export interface Preferences {
  language: "ar" | "fr" | "en";
  notifications: boolean;
  newsletter: boolean;
}

export interface Location {
  type: "Point";
  coordinates: [number, number]; // [longitude, latitude]
}
