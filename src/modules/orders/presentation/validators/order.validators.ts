// ============================================================================
// src/modules/orders/presentation/validators/order.validators.ts
// ============================================================================
import { body, query, param } from "express-validator";

export const createOrderValidator = [
  body("cookId").isMongoId().withMessage("Valid cook ID is required"),
  body("items")
    .isArray({ min: 1 })
    .withMessage("At least one item is required"),
  body("items.*.dishId").isMongoId().withMessage("Valid dish ID is required"),
  body("items.*.quantity")
    .isInt({ min: 1, max: 20 })
    .withMessage("Quantity must be between 1 and 20"),
  body("items.*.specialInstructions")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Special instructions cannot exceed 500 characters"),
  body("deliveryAddressId")
    .isMongoId()
    .withMessage("Valid delivery address ID is required"),
  body("paymentMethod")
    .isIn(["cash", "card", "mobile_wallet"])
    .withMessage("Invalid payment method"),
  body("notes")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Notes cannot exceed 1000 characters"),
];

export const updateOrderStatusValidator = [
  body("status")
    .isIn(["confirmed", "preparing", "ready", "delivering", "delivered"])
    .withMessage("Invalid status"),
];

export const cancelOrderValidator = [
  body("reason")
    .trim()
    .isLength({ min: 3, max: 500 })
    .withMessage("Cancel reason must be between 3 and 500 characters"),
];

export const searchOrdersValidator = [
  query("status")
    .optional()
    .isIn([
      "pending",
      "confirmed",
      "preparing",
      "ready",
      "delivering",
      "delivered",
      "cancelled",
    ])
    .withMessage("Invalid status"),
  query("startDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid start date format"),
  query("endDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid end date format"),
  query("minTotal")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Invalid min total"),
  query("maxTotal")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Invalid max total"),
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100"),
];

export const orderIdValidator = [
  param("id").isMongoId().withMessage("Invalid order ID"),
];
