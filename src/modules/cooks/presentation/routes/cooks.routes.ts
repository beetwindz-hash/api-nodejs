// ============================================================================
// src/modules/cooks/presentation/routes/cooks.routes.ts
// ============================================================================
import { Router } from "express";
import { authenticate, authorize, validate } from "@core/middlewares";
import { CooksController } from "../controllers/cooks.controller";
import {
  createCookProfileValidator,
  updateCookProfileValidator,
  updateLocationValidator,
  updateDeliverySettingsValidator,
  updateAvailabilityValidator,
  searchCooksValidator,
  cookIdValidator,
} from "../validators/cook.validators";
import { CookRepositoryImpl } from "../../infrastructure/repositories/cook.repository.impl";
import { UserRepositoryImpl } from "@modules/auth/infrastructure/repositories/user.repository.impl";
import {
  CreateCookProfileUseCase,
  GetCookProfileUseCase,
  GetMyCookProfileUseCase,
  UpdateCookProfileUseCase,
  UpdateLocationUseCase,
  UpdateDeliverySettingsUseCase,
  UpdateAvailabilityUseCase,
  SearchCooksUseCase,
  VerifyCookUseCase,
} from "../../application/use-cases";

const router = Router();

// Dependency injection
const cookRepository = new CookRepositoryImpl();
const userRepository = new UserRepositoryImpl();

const cooksController = new CooksController(
  new CreateCookProfileUseCase(cookRepository, userRepository),
  new GetCookProfileUseCase(cookRepository, userRepository),
  new GetMyCookProfileUseCase(cookRepository, userRepository),
  new UpdateCookProfileUseCase(cookRepository),
  new UpdateLocationUseCase(cookRepository),
  new UpdateDeliverySettingsUseCase(cookRepository),
  new UpdateAvailabilityUseCase(cookRepository),
  new SearchCooksUseCase(cookRepository),
  new VerifyCookUseCase(cookRepository)
);

/**
 * @route   GET /api/cooks/search
 * @desc    Search for cooks
 * @access  Public
 */
router.get(
  "/search",
  validate(searchCooksValidator),
  cooksController.searchCooks
);

/**
 * @route   GET /api/cooks/:id
 * @desc    Get cook profile by ID
 * @access  Public
 */
router.get("/:id", validate(cookIdValidator), cooksController.getProfile);

/**
 * @route   POST /api/cooks/profile
 * @desc    Create cook profile
 * @access  Private (Cook only)
 */
router.post(
  "/profile",
  authenticate,
  authorize("cook"),
  validate(createCookProfileValidator),
  cooksController.createProfile
);

/**
 * @route   GET /api/cooks/profile/me
 * @desc    Get my cook profile
 * @access  Private (Cook only)
 */
router.get(
  "/profile/me",
  authenticate,
  authorize("cook"),
  cooksController.getMyProfile
);

/**
 * @route   PATCH /api/cooks/profile
 * @desc    Update cook profile
 * @access  Private (Cook only)
 */
router.patch(
  "/profile",
  authenticate,
  authorize("cook"),
  validate(updateCookProfileValidator),
  cooksController.updateProfile
);

/**
 * @route   PATCH /api/cooks/location
 * @desc    Update cook location
 * @access  Private (Cook only)
 */
router.patch(
  "/location",
  authenticate,
  authorize("cook"),
  validate(updateLocationValidator),
  cooksController.updateLocation
);

/**
 * @route   PATCH /api/cooks/delivery-settings
 * @desc    Update delivery settings
 * @access  Private (Cook only)
 */
router.patch(
  "/delivery-settings",
  authenticate,
  authorize("cook"),
  validate(updateDeliverySettingsValidator),
  cooksController.updateDeliverySettings
);

/**
 * @route   PATCH /api/cooks/availability
 * @desc    Update availability schedule
 * @access  Private (Cook only)
 */
router.patch(
  "/availability",
  authenticate,
  authorize("cook"),
  validate(updateAvailabilityValidator),
  cooksController.updateAvailability
);

/**
 * @route   POST /api/cooks/:id/verify
 * @desc    Verify a cook (Admin only)
 * @access  Private (Admin only)
 */
router.post(
  "/:id/verify",
  authenticate,
  authorize("admin"),
  validate(cookIdValidator),
  cooksController.verifyCook
);

export { router as cooksRouter };
