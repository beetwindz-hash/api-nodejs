// ============================================================================
// src/modules/auth/presentation/validators/auth.validators.ts
// ============================================================================
import { body } from "express-validator";

export const loginValidator = [
  body("email")
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
];

export const registerValidator = [
  body("email")
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/(?=.*[a-z])/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/(?=.*[A-Z])/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/(?=.*\d)/)
    .withMessage("Password must contain at least one number"),
  body("name")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters"),
  body("role")
    .isIn(["customer", "cook"])
    .withMessage("Role must be customer or cook"),
];

export const refreshTokenValidator = [
  body("refreshToken").notEmpty().withMessage("Refresh token is required"),
];

export const forgotPasswordValidator = [
  body("email")
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail(),
];

export const resetPasswordValidator = [
  body("token").notEmpty().withMessage("Reset token is required"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/(?=.*[a-z])/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/(?=.*[A-Z])/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/(?=.*\d)/)
    .withMessage("Password must contain at least one number"),
  body("confirmPassword")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords must match"),
];
