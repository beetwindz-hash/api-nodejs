// ============================================================================
// src/modules/admin/presentation/validators/admin.validators.ts
// ============================================================================
import { param, query } from "express-validator";

export const paginationValidator = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("page must be a positive integer"),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("limit must be between 1 and 100"),
  query("sort").optional().isString(),
  query("order")
    .optional()
    .isIn(["asc", "desc"])
    .withMessage("order must be asc or desc"),
];

export const userFiltersValidator = [
  query("role")
    .optional()
    .isIn(["customer", "cook", "admin"])
    .withMessage("role must be one of customer, cook, admin"),
  query("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be boolean"),
  query("search").optional().isString(),
];

export const orderFiltersValidator = [
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
    .withMessage("Invalid order status"),
  query("customerId").optional().isMongoId().withMessage("Invalid customerId"),
  query("cookId").optional().isMongoId().withMessage("Invalid cookId"),
];

export const userIdParamValidator = [
  param("id").isMongoId().withMessage("Invalid user ID"),
];

