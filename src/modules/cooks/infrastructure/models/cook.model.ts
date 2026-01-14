// ============================================================================
// src/modules/cooks/infrastructure/models/cook.model.ts
// ============================================================================
import mongoose, { Schema, Document } from "mongoose";
import {
  CuisineType,
  CookStatus,
  DayOfWeek,
} from "../../domain/entities/cook.entity";

export interface ICookDocument extends Document {
  userId: mongoose.Types.ObjectId;
  bio?: string;
  cuisines: CuisineType[];
  specialties: string[];
  yearsOfExperience: number;
  certifications: string[];
  businessName?: string;
  businessLicense?: string;
  phoneNumber: string;
  location: {
    address: string;
    city: string;
    state?: string;
    postalCode?: string;
    country: string;
    coordinates?: {
      type: "Point";
      coordinates: [number, number]; // [longitude, latitude]
    };
  };
  deliveryRadius: number;
  deliveryFee: number;
  minimumOrder: number;
  availability: {
    day: DayOfWeek;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
  }[];
  status: CookStatus;
  rating: number;
  totalReviews: number;
  totalOrders: number;
  isVerified: boolean;
  verifiedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const availabilitySlotSchema = new Schema(
  {
    day: {
      type: String,
      enum: [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ],
      required: true,
    },
    startTime: {
      type: String,
      required: true,
      match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
    },
    endTime: {
      type: String,
      required: true,
      match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { _id: false }
);

const cookSchema = new Schema<ICookDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    bio: {
      type: String,
      maxlength: 1000,
    },
    cuisines: [
      {
        type: String,
        enum: [
          "algerian",
          "french",
          "italian",
          "mediterranean",
          "international",
          "other",
        ],
        required: true,
      },
    ],
    specialties: [
      {
        type: String,
        trim: true,
      },
    ],
    yearsOfExperience: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    certifications: [
      {
        type: String,
        trim: true,
      },
    ],
    businessName: {
      type: String,
      trim: true,
    },
    businessLicense: {
      type: String,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    location: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
        index: true,
      },
      state: String,
      postalCode: String,
      country: {
        type: String,
        required: true,
      },
      coordinates: {
        type: {
          type: String,
          enum: ["Point"],
        },
        coordinates: {
          type: [Number], // [longitude, latitude]
          index: "2dsphere",
        },
      },
    },
    deliveryRadius: {
      type: Number,
      required: true,
      min: 0,
      max: 50,
    },
    deliveryFee: {
      type: Number,
      required: true,
      min: 0,
    },
    minimumOrder: {
      type: Number,
      required: true,
      min: 0,
    },
    availability: [availabilitySlotSchema],
    status: {
      type: String,
      enum: ["pending", "active", "suspended", "inactive"],
      default: "pending",
      index: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalReviews: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalOrders: {
      type: Number,
      default: 0,
      min: 0,
    },
    isVerified: {
      type: Boolean,
      default: false,
      index: true,
    },
    verifiedAt: Date,
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Indexes
cookSchema.index({ status: 1, isVerified: 1 });
cookSchema.index({ "location.city": 1, status: 1 });
cookSchema.index({ cuisines: 1, status: 1 });
cookSchema.index({ rating: -1 });
cookSchema.index({ "location.coordinates": "2dsphere" });

export const CookModel = mongoose.model<ICookDocument>("Cook", cookSchema);
