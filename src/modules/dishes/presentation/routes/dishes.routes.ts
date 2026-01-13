// ============================================================================
// src/modules/dishes/presentation/routes/dishes.routes.ts
// ============================================================================
import { Router } from "express";
import { authenticate, authorize, validate } from "@core/middlewares";
import { DishesController } from "../controllers/dishes.controller";
import { verifyCookOwnership } from "../middleware/cook-ownership.middleware";
import {
  createDishValidator,
  updateDishValidator,
  updatePricingValidator,
  updateIngredientsValidator,
  updateDietaryInfoValidator,
  toggleAvailabilityValidator,
  searchDishesValidator,
  dishIdValidator,
} from "../validators/dish.validators";
import { DishRepositoryImpl } from "../../infrastructure/repositories/dish.repository.impl";
import { CookRepositoryImpl } from "@modules/cooks/infrastructure/repositories/cook.repository.impl";
import {
  CreateDishUseCase,
  GetDishUseCase,
  UpdateDishUseCase,
  UpdatePricingUseCase,
  UploadDishImageUseCase,
  DeleteDishImageUseCase,
  UpdateIngredientsUseCase,
  UpdateDietaryInfoUseCase,
  PublishDishUseCase,
  ToggleAvailabilityUseCase,
  DeleteDishUseCase,
  SearchDishesUseCase,
  GetMyDishesUseCase,
} from "../../application/use-cases";

const router = Router();

// Dependency injection
const dishRepository = new DishRepositoryImpl();
const cookRepository = new CookRepositoryImpl();

const dishesController = new DishesController(
  new CreateDishUseCase(dishRepository, cookRepository),
  new GetDishUseCase(dishRepository, cookRepository),
  new UpdateDishUseCase(dishRepository),
  new UpdatePricingUseCase(dishRepository),
  new UploadDishImageUseCase(dishRepository),
  new DeleteDishImageUseCase(dishRepository),
  new UpdateIngredientsUseCase(dishRepository),
  new UpdateDietaryInfoUseCase(dishRepository),
  new PublishDishUseCase(dishRepository),
  new ToggleAvailabilityUseCase(dishRepository),
  new DeleteDishUseCase(dishRepository),
  new SearchDishesUseCase(dishRepository),
  new GetMyDishesUseCase(dishRepository, cookRepository)
);

/**
 * @route   GET /api/dishes/search
 * @desc    Search dishes
 * @access  Public
 */
router.get(
  "/search",
  validate(searchDishesValidator),
  dishesController.searchDishes
);

/**
 * @route   GET /api/dishes/:id
 * @desc    Get dish by ID
 * @access  Public
 */
router.get("/:id", validate(dishIdValidator), dishesController.getDish);

/**
 * @route   POST /api/dishes
 * @desc    Create new dish
 * @access  Private (Cook only)
 */
router.post(
  "/",
  authenticate,
  authorize("cook"),
  validate(createDishValidator),
  dishesController.createDish
);

/**
 * @route   GET /api/dishes/my/dishes
 * @desc    Get my dishes
 * @access  Private (Cook only)
 */
router.get(
  "/my/dishes",
  authenticate,
  authorize("cook"),
  dishesController.getMyDishes
);

/**
 * @route   PATCH /api/dishes/:id
 * @desc    Update dish
 * @access  Private (Cook only - owner)
 */
router.patch(
  "/:id",
  authenticate,
  authorize("cook"),
  verifyCookOwnership,
  validate(dishIdValidator),
  validate(updateDishValidator),
  dishesController.updateDish
);

/**
 * @route   PATCH /api/dishes/:id/pricing
 * @desc    Update dish pricing
 * @access  Private (Cook only - owner)
 */
router.patch(
  "/:id/pricing",
  authenticate,
  authorize("cook"),
  verifyCookOwnership,
  validate(dishIdValidator),
  validate(updatePricingValidator),
  dishesController.updatePricing
);

/**
 * @route   POST /api/dishes/:id/images
 * @desc    Upload dish image
 * @access  Private (Cook only - owner)
 */
router.post(
  "/:id/images",
  authenticate,
  authorize("cook"),
  verifyCookOwnership,
  validate(dishIdValidator),
  dishesController.uploadImage
);

/**
 * @route   DELETE /api/dishes/:id/images
 * @desc    Delete dish image
 * @access  Private (Cook only - owner)
 */
router.delete(
  "/:id/images",
  authenticate,
  authorize("cook"),
  verifyCookOwnership,
  validate(dishIdValidator),
  dishesController.deleteImage
);

/**
 * @route   PATCH /api/dishes/:id/ingredients
 * @desc    Update dish ingredients
 * @access  Private (Cook only - owner)
 */
router.patch(
  "/:id/ingredients",
  authenticate,
  authorize("cook"),
  verifyCookOwnership,
  validate(dishIdValidator),
  validate(updateIngredientsValidator),
  dishesController.updateIngredients
);

/**
 * @route   PATCH /api/dishes/:id/dietary-info
 * @desc    Update dietary information
 * @access  Private (Cook only - owner)
 */
router.patch(
  "/:id/dietary-info",
  authenticate,
  authorize("cook"),
  verifyCookOwnership,
  validate(dishIdValidator),
  validate(updateDietaryInfoValidator),
  dishesController.updateDietaryInfo
);

/**
 * @route   POST /api/dishes/:id/publish
 * @desc    Publish dish (make it active)
 * @access  Private (Cook only - owner)
 */
router.post(
  "/:id/publish",
  authenticate,
  authorize("cook"),
  verifyCookOwnership,
  validate(dishIdValidator),
  dishesController.publishDish
);

/**
 * @route   PATCH /api/dishes/:id/availability
 * @desc    Toggle dish availability
 * @access  Private (Cook only - owner)
 */
router.patch(
  "/:id/availability",
  authenticate,
  authorize("cook"),
  verifyCookOwnership,
  validate(dishIdValidator),
  validate(toggleAvailabilityValidator),
  dishesController.toggleAvailability
);

/**
 * @route   DELETE /api/dishes/:id
 * @desc    Delete dish
 * @access  Private (Cook only - owner)
 */
router.delete(
  "/:id",
  authenticate,
  authorize("cook"),
  verifyCookOwnership,
  validate(dishIdValidator),
  dishesController.deleteDish
);

export { router as dishesRouter };
