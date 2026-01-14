// ============================================================================
// src/modules/conversations/infrastructure/models/conversation.model.ts
// ============================================================================
import mongoose, { Schema, Document } from "mongoose";

export interface IConversationDocument extends Document {
  cookId: mongoose.Types.ObjectId;
  customerId: mongoose.Types.ObjectId;
  dishName: string;
  lastMessage?: string | null;
  lastMessageAt?: Date | null;
  unreadCountForCook: number;
  unreadCountForCustomer: number;
  createdAt: Date;
  updatedAt: Date;
}

const conversationSchema = new Schema<IConversationDocument>(
  {
    cookId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    dishName: {
      type: String,
      required: true,
      trim: true,
    },
    lastMessage: {
      type: String,
      default: null,
    },
    lastMessageAt: {
      type: Date,
      default: null,
      index: true,
    },
    unreadCountForCook: {
      type: Number,
      default: 0,
      min: 0,
    },
    unreadCountForCustomer: {
      type: Number,
      default: 0,
      min: 0,
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

conversationSchema.index(
  { cookId: 1, customerId: 1, dishName: 1 },
  { unique: true }
);
conversationSchema.index({ customerId: 1, lastMessageAt: -1 });
conversationSchema.index({ cookId: 1, lastMessageAt: -1 });

export const ConversationModel = mongoose.model<IConversationDocument>(
  "Conversation",
  conversationSchema
);

