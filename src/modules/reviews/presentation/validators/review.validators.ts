// ============================================================================
// src/modules/reviews/presentation/validators/review.validators.ts
// ============================================================================
import { body, param, query } from "express-validator";

export const reviewIdValidator = [
  param("id").isMongoId().withMessage("Invalid review ID"),
];

export const createReviewValidator = [
  body("orderId").isMongoId().withMessage("Valid order ID is required"),
  body("cookId").isMongoId().withMessage("Valid cook ID is required"),
  body("rating")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),
  body("comment")
    .isString()
    .trim()
    .isLength({ min: 3, max: 2000 })
    .withMessage("Comment must be between 3 and 2000 characters"),
];

export const replyReviewValidator = [
  body("reply")
    .isString()
    .trim()
    .isLength({ min: 1, max: 2000 })
    .withMessage("Reply must be between 1 and 2000 characters"),
];

export const searchReviewsValidator = [
  query("cookId")
    .optional()
    .isMongoId()
    .withMessage("cookId must be a valid ID"),
  query("customerId")
    .optional()
    .isMongoId()
    .withMessage("customerId must be a valid ID"),
  query("minRating")
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage("minRating must be between 1 and 5"),
  query("maxRating")
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage("maxRating must be between 1 and 5"),
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100"),
];

export const cookIdParamValidator = [
  param("cookId").isMongoId().withMessage("Invalid cook ID"),
];

