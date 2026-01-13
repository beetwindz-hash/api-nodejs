// ============================================================================
// src/modules/cooks/presentation/validators/cook.validators.ts
// ============================================================================
import { body, query, param } from "express-validator";

export const createCookProfileValidator = [
  body("bio")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Bio cannot exceed 1000 characters"),
  body("cuisines")
    .isArray({ min: 1 })
    .withMessage("At least one cuisine type is required"),
  body("cuisines.*")
    .isIn([
      "algerian",
      "french",
      "italian",
      "mediterranean",
      "international",
      "other",
    ])
    .withMessage("Invalid cuisine type"),
  body("specialties").isArray().withMessage("Specialties must be an array"),
  body("yearsOfExperience")
    .isInt({ min: 0, max: 100 })
    .withMessage("Years of experience must be between 0 and 100"),
  body("phoneNumber").trim().notEmpty().withMessage("Phone number is required"),
  body("location.address").trim().notEmpty().withMessage("Address is required"),
  body("location.city").trim().notEmpty().withMessage("City is required"),
  body("location.country").trim().notEmpty().withMessage("Country is required"),
  body("deliveryRadius")
    .isFloat({ min: 0.1, max: 50 })
    .withMessage("Delivery radius must be between 0.1 and 50 km"),
  body("deliveryFee")
    .isFloat({ min: 0 })
    .withMessage("Delivery fee cannot be negative"),
  body("minimumOrder")
    .isFloat({ min: 0 })
    .withMessage("Minimum order cannot be negative"),
  body("availability")
    .isArray({ min: 1 })
    .withMessage("At least one availability slot is required"),
  body("availability.*.day")
    .isIn([
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ])
    .withMessage("Invalid day of week"),
  body("availability.*.startTime")
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage("Start time must be in HH:MM format"),
  body("availability.*.endTime")
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage("End time must be in HH:MM format"),
];

export const updateCookProfileValidator = [
  body("bio")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Bio cannot exceed 1000 characters"),
  body("cuisines")
    .optional()
    .isArray({ min: 1 })
    .withMessage("At least one cuisine type is required"),
  body("cuisines.*")
    .optional()
    .isIn([
      "algerian",
      "french",
      "italian",
      "mediterranean",
      "international",
      "other",
    ])
    .withMessage("Invalid cuisine type"),
  body("specialties")
    .optional()
    .isArray()
    .withMessage("Specialties must be an array"),
  body("yearsOfExperience")
    .optional()
    .isInt({ min: 0, max: 100 })
    .withMessage("Years of experience must be between 0 and 100"),
  body("phoneNumber")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Phone number cannot be empty"),
];

export const updateLocationValidator = [
  body("address").trim().notEmpty().withMessage("Address is required"),
  body("city").trim().notEmpty().withMessage("City is required"),
  body("country").trim().notEmpty().withMessage("Country is required"),
  body("latitude")
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage("Invalid latitude"),
  body("longitude")
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage("Invalid longitude"),
];

export const updateDeliverySettingsValidator = [
  body("deliveryRadius")
    .isFloat({ min: 0.1, max: 50 })
    .withMessage("Delivery radius must be between 0.1 and 50 km"),
  body("deliveryFee")
    .isFloat({ min: 0 })
    .withMessage("Delivery fee cannot be negative"),
  body("minimumOrder")
    .isFloat({ min: 0 })
    .withMessage("Minimum order cannot be negative"),
];

export const updateAvailabilityValidator = [
  body("availability")
    .isArray({ min: 1 })
    .withMessage("At least one availability slot is required"),
  body("availability.*.day")
    .isIn([
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ])
    .withMessage("Invalid day of week"),
  body("availability.*.startTime")
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage("Start time must be in HH:MM format"),
  body("availability.*.endTime")
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage("End time must be in HH:MM format"),
];

export const searchCooksValidator = [
  query("cuisines")
    .optional()
    .customSanitizer((value) => {
      if (typeof value === "string") return [value];
      return value;
    }),
  query("city").optional().trim(),
  query("maxDistance")
    .optional()
    .isFloat({ min: 0.1, max: 50 })
    .withMessage("Max distance must be between 0.1 and 50 km"),
  query("minRating")
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage("Min rating must be between 0 and 5"),
  query("latitude")
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage("Invalid latitude"),
  query("longitude")
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage("Invalid longitude"),
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100"),
];

export const cookIdValidator = [
  param("id").isMongoId().withMessage("Invalid cook ID"),
];
