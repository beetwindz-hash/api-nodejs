// ============================================================================
// src/modules/conversations/infrastructure/models/message.model.ts
// ============================================================================
import mongoose, { Schema, Document } from "mongoose";

export interface IMessageDocument extends Document {
  conversationId: mongoose.Types.ObjectId;
  senderId: mongoose.Types.ObjectId;
  content: string;
  isOrder: boolean;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<IMessageDocument>(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
      index: true,
    },
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
    isOrder: {
      type: Boolean,
      default: false,
      index: true,
    },
    isRead: {
      type: Boolean,
      default: false,
      index: true,
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

messageSchema.index({ conversationId: 1, createdAt: -1 });

export const MessageModel = mongoose.model<IMessageDocument>(
  "Message",
  messageSchema
);

