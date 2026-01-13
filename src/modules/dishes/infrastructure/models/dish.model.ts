// ============================================================================
// src/modules/dishes/infrastructure/models/dish.model.ts
// ============================================================================
import mongoose, { Schema, Document } from "mongoose";
import {
  DishCategory,
  DishStatus,
  SpiceLevel,
  PortionSize,
} from "../../domain/entities/dish.entity";
import { CuisineType } from "@modules/cooks/domain/entities/cook.entity";

export interface IDishDocument extends Document {
  cookId: mongoose.Types.ObjectId;
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
  images: string[];
  ingredients: string[];
  dietaryInfo: {
    isVegetarian: boolean;
    isVegan: boolean;
    isGlutenFree: boolean;
    isDairyFree: boolean;
    isNutFree: boolean;
    isHalal: boolean;
    allergens: string[];
    calories?: number;
  };
  nutritionalInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber?: number;
    sugar?: number;
    sodium?: number;
  };
  tags: string[];
  isAvailable: boolean;
  status: DishStatus;
  maxOrdersPerDay?: number;
  currentOrdersToday: number;
  rating: number;
  totalReviews: number;
  totalOrders: number;
  viewCount: number;
  featured: boolean;
  featuredUntil?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const dishSchema = new Schema<IDishDocument>(
  {
    cookId: {
      type: Schema.Types.ObjectId,
      ref: "Cook",
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
      index: "text",
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 2000,
      index: "text",
    },
    category: {
      type: String,
      enum: [
        "appetizer",
        "main_course",
        "dessert",
        "beverage",
        "snack",
        "side_dish",
      ],
      required: true,
      index: true,
    },
    cuisine: {
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
      index: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
      index: true,
    },
    originalPrice: {
      type: Number,
      min: 0,
    },
    preparationTime: {
      type: Number,
      required: true,
      min: 1,
      max: 300,
    },
    servings: {
      type: Number,
      required: true,
      min: 1,
      max: 20,
    },
    portionSize: {
      type: String,
      enum: ["small", "medium", "large", "family"],
      required: true,
    },
    spiceLevel: {
      type: String,
      enum: ["none", "mild", "medium", "hot", "very_hot"],
      required: true,
      index: true,
    },
    images: [
      {
        type: String,
      },
    ],
    ingredients: [
      {
        type: String,
        required: true,
      },
    ],
    dietaryInfo: {
      isVegetarian: {
        type: Boolean,
        default: false,
        index: true,
      },
      isVegan: {
        type: Boolean,
        default: false,
        index: true,
      },
      isGlutenFree: {
        type: Boolean,
        default: false,
        index: true,
      },
      isDairyFree: {
        type: Boolean,
        default: false,
        index: true,
      },
      isNutFree: {
        type: Boolean,
        default: false,
      },
      isHalal: {
        type: Boolean,
        default: false,
        index: true,
      },
      allergens: [String],
      calories: Number,
    },
    nutritionalInfo: {
      calories: Number,
      protein: Number,
      carbs: Number,
      fat: Number,
      fiber: Number,
      sugar: Number,
      sodium: Number,
    },
    tags: [
      {
        type: String,
        lowercase: true,
        index: true,
      },
    ],
    isAvailable: {
      type: Boolean,
      default: false,
      index: true,
    },
    status: {
      type: String,
      enum: ["draft", "active", "inactive", "out_of_stock"],
      default: "draft",
      index: true,
    },
    maxOrdersPerDay: Number,
    currentOrdersToday: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
      index: true,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    totalOrders: {
      type: Number,
      default: 0,
      index: true,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
      index: true,
    },
    featuredUntil: Date,
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

// Compound indexes for common queries
dishSchema.index({ cookId: 1, status: 1 });
dishSchema.index({ category: 1, cuisine: 1 });
dishSchema.index({ status: 1, isAvailable: 1 });
dishSchema.index({ rating: -1, totalReviews: -1 });
dishSchema.index({ featured: 1, featuredUntil: 1 });
dishSchema.index({ price: 1, status: 1 });
dishSchema.index({ tags: 1, status: 1 });

// Text index for search
dishSchema.index({ name: "text", description: "text", tags: "text" });

export const DishModel = mongoose.model<IDishDocument>("Dish", dishSchema);
