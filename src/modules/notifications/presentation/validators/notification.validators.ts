// ============================================================================
// src/modules/notifications/presentation/validators/notification.validators.ts
// ============================================================================
import { body, param, query } from "express-validator";

export const notificationIdParamValidator = [
  param("id").isMongoId().withMessage("Invalid notification ID"),
];

export const getNotificationsValidator = [
  query("type")
    .optional()
    .isIn([
      "order_update",
      "new_order",
      "message",
      "review",
      "application_update",
    ])
    .withMessage("Invalid notification type"),
  query("isRead")
    .optional()
    .isBoolean()
    .withMessage("isRead must be a boolean"),
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("page must be a positive integer"),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("limit must be between 1 and 100"),
];

export const markReadValidator = [
  body("ids")
    .isArray({ min: 1 })
    .withMessage("ids must be a non-empty array"),
  body("ids.*").isMongoId().withMessage("Each id must be a valid Mongo ID"),
];

export const preferencesValidator = [
  body("push.order_update")
    .optional()
    .isBoolean()
    .withMessage("push.order_update must be boolean"),
  body("push.new_order")
    .optional()
    .isBoolean()
    .withMessage("push.new_order must be boolean"),
  body("push.message")
    .optional()
    .isBoolean()
    .withMessage("push.message must be boolean"),
  body("push.review")
    .optional()
    .isBoolean()
    .withMessage("push.review must be boolean"),
  body("push.application_update")
    .optional()
    .isBoolean()
    .withMessage("push.application_update must be boolean"),
  body("email.order_update")
    .optional()
    .isBoolean()
    .withMessage("email.order_update must be boolean"),
  body("email.new_order")
    .optional()
    .isBoolean()
    .withMessage("email.new_order must be boolean"),
  body("email.message")
    .optional()
    .isBoolean()
    .withMessage("email.message must be boolean"),
  body("email.review")
    .optional()
    .isBoolean()
    .withMessage("email.review must be boolean"),
  body("email.application_update")
    .optional()
    .isBoolean()
    .withMessage("email.application_update must be boolean"),
];

