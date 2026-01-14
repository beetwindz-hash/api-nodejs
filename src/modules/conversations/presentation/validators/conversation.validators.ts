// ============================================================================
// src/modules/conversations/presentation/validators/conversation.validators.ts
// ============================================================================
import { body, param, query } from "express-validator";

export const conversationIdValidator = [
  param("id").isMongoId().withMessage("Invalid conversation ID"),
];

export const createConversationValidator = [
  body("cookId").isMongoId().withMessage("Valid cook ID is required"),
  body("dishName")
    .isString()
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage("Dish name is required"),
  body("initialMessage")
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1, max: 2000 })
    .withMessage("Initial message must be between 1 and 2000 characters"),
];

export const sendMessageValidator = [
  body("content")
    .isString()
    .trim()
    .isLength({ min: 1, max: 2000 })
    .withMessage("Message content must be between 1 and 2000 characters"),
  body("isOrder").optional().isBoolean().withMessage("isOrder must be boolean"),
];

export const paginationValidator = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100"),
];

