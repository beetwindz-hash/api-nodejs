// ============================================================================
// src/modules/users/infrastructure/models/address.model.ts
// ============================================================================
import mongoose, { Schema, Document } from "mongoose";

export interface IAddressDocument extends Document {
  userId: mongoose.Types.ObjectId;
  label: string;
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
  createdAt: Date;
  updatedAt: Date;
}

const addressSchema = new Schema<IAddressDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    label: {
      type: String,
      required: true,
    },
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
    isDefault: {
      type: Boolean,
      default: false,
    },
    phone: String,
    instructions: String,
    latitude: Number,
    longitude: Number,
  },
  { timestamps: true }
);

addressSchema.index({ userId: 1, isDefault: 1 });

export const AddressModel = mongoose.model<IAddressDocument>(
  "Address",
  addressSchema
);
