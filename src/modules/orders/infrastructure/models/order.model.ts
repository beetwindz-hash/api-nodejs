// ============================================================================
// src/modules/orders/infrastructure/models/order.model.ts
// ============================================================================
import mongoose, { Schema, Document } from "mongoose";
import { OrderStatus } from "@core/types";
import {
  PaymentMethod,
  PaymentStatus,
} from "../../domain/entities/order.entity";

export interface IOrderDocument extends Document {
  orderNumber: string;
  customerId: mongoose.Types.ObjectId;
  cookId: mongoose.Types.ObjectId;
  items: {
    dishId: mongoose.Types.ObjectId;
    dishName: string;
    quantity: number;
    price: number;
    specialInstructions?: string;
  }[];
  deliveryAddress: {
    street: string;
    city: string;
    state?: string;
    postalCode?: string;
    country: string;
    phone: string;
    instructions?: string;
    latitude?: number;
    longitude?: number;
  };
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  tax: number;
  discount: number;
  total: number;
  estimatedPreparationTime: number;
  estimatedDeliveryTime?: Date;
  actualDeliveryTime?: Date;
  notes?: string;
  cancelReason?: string;
  cancelledBy?: "customer" | "cook" | "admin";
  cancelledAt?: Date;
  confirmedAt?: Date;
  preparingAt?: Date;
  readyAt?: Date;
  deliveringAt?: Date;
  deliveredAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<IOrderDocument>(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    cookId: {
      type: Schema.Types.ObjectId,
      ref: "Cook",
      required: true,
      index: true,
    },
    items: [
      {
        dishId: {
          type: Schema.Types.ObjectId,
          ref: "Dish",
          required: true,
        },
        dishName: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
          max: 20,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
        specialInstructions: String,
      },
    ],
    deliveryAddress: {
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: String,
      postalCode: String,
      country: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      instructions: String,
      latitude: Number,
      longitude: Number,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "preparing",
        "ready",
        "delivering",
        "delivered",
        "cancelled",
      ],
      default: "pending",
      required: true,
      index: true,
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "card", "mobile_wallet"],
      required: true,
      index: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
      required: true,
    },
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
    deliveryFee: {
      type: Number,
      required: true,
      min: 0,
    },
    serviceFee: {
      type: Number,
      required: true,
      min: 0,
    },
    tax: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
      index: true,
    },
    estimatedPreparationTime: {
      type: Number,
      required: true,
      min: 0,
    },
    estimatedDeliveryTime: Date,
    actualDeliveryTime: Date,
    notes: String,
    cancelReason: String,
    cancelledBy: {
      type: String,
      enum: ["customer", "cook", "admin"],
    },
    cancelledAt: Date,
    confirmedAt: Date,
    preparingAt: Date,
    readyAt: Date,
    deliveringAt: Date,
    deliveredAt: Date,
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
orderSchema.index({ customerId: 1, createdAt: -1 });
orderSchema.index({ cookId: 1, createdAt: -1 });
orderSchema.index({ status: 1, createdAt: -1 });
orderSchema.index({ customerId: 1, status: 1 });
orderSchema.index({ cookId: 1, status: 1 });
orderSchema.index({ paymentStatus: 1 });
orderSchema.index({ createdAt: -1 });

export const OrderModel = mongoose.model<IOrderDocument>("Order", orderSchema);
