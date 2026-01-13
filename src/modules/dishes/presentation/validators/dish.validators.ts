// ============================================================================
// src/modules/dishes/presentation/validators/dish.validators.ts
// ============================================================================
import { body, query, param } from "express-validator";

export const createDishValidator = [
  body("name")
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Name must be between 3 and 100 characters"),
  body("description")
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage("Description must be between 10 and 2000 characters"),
  body("category")
    .isIn([
      "appetizer",
      "main_course",
      "dessert",
      "beverage",
      "snack",
      "side_dish",
    ])
    .withMessage("Invalid category"),
  body("cuisine")
    .isIn([
      "algerian",
      "french",
      "italian",
      "mediterranean",
      "international",
      "other",
    ])
    .withMessage("Invalid cuisine type"),
  body("price").isFloat({ min: 1 }).withMessage("Price must be greater than 0"),
  body("originalPrice")
    .optional()
    .isFloat({ min: 1 })
    .withMessage("Original price must be greater than 0"),
  body("preparationTime")
    .isInt({ min: 1, max: 300 })
    .withMessage("Preparation time must be between 1 and 300 minutes"),
  body("servings")
    .isInt({ min: 1, max: 20 })
    .withMessage("Servings must be between 1 and 20"),
  body("portionSize")
    .isIn(["small", "medium", "large", "family"])
    .withMessage("Invalid portion size"),
  body("spiceLevel")
    .isIn(["none", "mild", "medium", "hot", "very_hot"])
    .withMessage("Invalid spice level"),
  body("ingredients")
    .isArray({ min: 1, max: 50 })
    .withMessage("At least 1 ingredient required, maximum 50"),
  body("dietaryInfo.isVegetarian")
    .isBoolean()
    .withMessage("isVegetarian must be boolean"),
  body("dietaryInfo.isVegan")
    .isBoolean()
    .withMessage("isVegan must be boolean"),
  body("dietaryInfo.isGlutenFree")
    .isBoolean()
    .withMessage("isGlutenFree must be boolean"),
  body("dietaryInfo.isDairyFree")
    .isBoolean()
    .withMessage("isDairyFree must be boolean"),
  body("dietaryInfo.isNutFree")
    .isBoolean()
    .withMessage("isNutFree must be boolean"),
  body("dietaryInfo.isHalal")
    .isBoolean()
    .withMessage("isHalal must be boolean"),
];

export const updateDishValidator = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Name must be between 3 and 100 characters"),
  body("description")
    .optional()
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage("Description must be between 10 and 2000 characters"),
  body("category")
    .optional()
    .isIn([
      "appetizer",
      "main_course",
      "dessert",
      "beverage",
      "snack",
      "side_dish",
    ])
    .withMessage("Invalid category"),
  body("cuisine")
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
  body("preparationTime")
    .optional()
    .isInt({ min: 1, max: 300 })
    .withMessage("Preparation time must be between 1 and 300 minutes"),
  body("servings")
    .optional()
    .isInt({ min: 1, max: 20 })
    .withMessage("Servings must be between 1 and 20"),
];

export const updatePricingValidator = [
  body("price").isFloat({ min: 1 }).withMessage("Price must be greater than 0"),
  body("originalPrice")
    .optional()
    .isFloat({ min: 1 })
    .withMessage("Original price must be greater than 0"),
];

export const updateIngredientsValidator = [
  body("ingredients")
    .isArray({ min: 1, max: 50 })
    .withMessage("At least 1 ingredient required, maximum 50"),
];

export const updateDietaryInfoValidator = [
  body("isVegetarian").optional().isBoolean(),
  body("isVegan").optional().isBoolean(),
  body("isGlutenFree").optional().isBoolean(),
  body("isDairyFree").optional().isBoolean(),
  body("isNutFree").optional().isBoolean(),
  body("isHalal").optional().isBoolean(),
];

export const toggleAvailabilityValidator = [
  body("isAvailable").isBoolean().withMessage("isAvailable must be boolean"),
];

export const searchDishesValidator = [
  query("cookId").optional().isMongoId().withMessage("Invalid cook ID"),
  query("category")
    .optional()
    .isIn([
      "appetizer",
      "main_course",
      "dessert",
      "beverage",
      "snack",
      "side_dish",
    ])
    .withMessage("Invalid category"),
  query("cuisine")
    .optional()
    .isIn([
      "algerian",
      "french",
      "italian",
      "mediterranean",
      "international",
      "other",
    ])
    .withMessage("Invalid cuisine"),
  query("minPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Invalid min price"),
  query("maxPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Invalid max price"),
  query("spiceLevel")
    .optional()
    .isIn(["none", "mild", "medium", "hot", "very_hot"])
    .withMessage("Invalid spice level"),
  query("minRating")
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage("Rating must be between 0 and 5"),
  query("sort")
    .optional()
    .isIn(["newest", "popular", "rating", "price_low", "price_high"])
    .withMessage("Invalid sort option"),
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100"),
];

export const dishIdValidator = [
  param("id").isMongoId().withMessage("Invalid dish ID"),
];
