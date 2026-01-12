// ============================================================================
// src/modules/users/presentation/validators/user.validators.ts
// ============================================================================
import { body, param } from "express-validator";

export const updateProfileValidator = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters"),
  body("phone")
    .optional()
    .trim()
    .isMobilePhone("any")
    .withMessage("Invalid phone number"),
  body("address.street")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Street is required"),
  body("address.city")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("City is required"),
  body("address.country")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Country is required"),
  body("preferences.language")
    .optional()
    .isIn(["ar", "fr", "en"])
    .withMessage("Language must be ar, fr, or en"),
];

export const createAddressValidator = [
  body("label").trim().notEmpty().withMessage("Label is required"),
  body("street").trim().notEmpty().withMessage("Street is required"),
  body("city").trim().notEmpty().withMessage("City is required"),
  body("country").trim().notEmpty().withMessage("Country is required"),
  body("latitude")
    .optional()
    .isNumeric()
    .withMessage("Latitude must be a number"),
  body("longitude")
    .optional()
    .isNumeric()
    .withMessage("Longitude must be a number"),
];

export const updateAddressValidator = [
  param("id").isMongoId().withMessage("Invalid address ID"),
  ...createAddressValidator.map((v) => {
    const chain = v as any;
    return chain.optional ? chain : chain.optional();
  }),
];

export const addressIdValidator = [
  param("id").isMongoId().withMessage("Invalid address ID"),
];
