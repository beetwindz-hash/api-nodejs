// ============================================================================
// src/modules/users/infrastructure/models/user-profile.model.ts
// ============================================================================
import mongoose, { Schema, Document } from "mongoose";

export interface IUserProfileDocument extends Document {
  userId: mongoose.Types.ObjectId;
  phone?: string;
  address?: {
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
  };
  preferences: {
    language: "ar" | "fr" | "en";
    notifications: boolean;
    newsletter: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

const userProfileSchema = new Schema<IUserProfileDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
    phone: String,
    address: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
      isDefault: Boolean,
      phone: String,
      instructions: String,
      latitude: Number,
      longitude: Number,
    },
    preferences: {
      language: {
        type: String,
        enum: ["ar", "fr", "en"],
        default: "en",
      },
      notifications: {
        type: Boolean,
        default: true,
      },
      newsletter: {
        type: Boolean,
        default: false,
      },
    },
  },
  { timestamps: true }
);

export const UserProfileModel = mongoose.model<IUserProfileDocument>(
  "UserProfile",
  userProfileSchema
);
