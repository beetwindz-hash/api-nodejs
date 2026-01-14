// ============================================================================
// src/modules/notifications/infrastructure/models/notification-preferences.model.ts
// ============================================================================
import mongoose, { Schema, Document } from "mongoose";

export interface IChannelPreferences {
  order_update: boolean;
  new_order: boolean;
  message: boolean;
  review: boolean;
  application_update: boolean;
}

export interface INotificationPreferencesDocument extends Document {
  userId: mongoose.Types.ObjectId;
  push: IChannelPreferences;
  email: IChannelPreferences;
  createdAt: Date;
  updatedAt: Date;
}

const channelPreferencesSchema = new Schema<IChannelPreferences>(
  {
    order_update: { type: Boolean, default: true },
    new_order: { type: Boolean, default: true },
    message: { type: Boolean, default: true },
    review: { type: Boolean, default: true },
    application_update: { type: Boolean, default: true },
  },
  { _id: false }
);

const notificationPreferencesSchema =
  new Schema<INotificationPreferencesDocument>(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
      },
      push: {
        type: channelPreferencesSchema,
        default: {},
      },
      email: {
        type: channelPreferencesSchema,
        default: {},
      },
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


export const NotificationPreferencesModel =
  mongoose.model<INotificationPreferencesDocument>(
    "NotificationPreferences",
    notificationPreferencesSchema
  );

