// ============================================================================
// src/modules/users/presentation/routes/users.routes.ts
// ============================================================================
import { Router } from "express";
import { authenticate } from "@core/middlewares";
import { validate } from "@core/middlewares";
import { UsersController } from "../controllers/users.controller";
import {
  updateProfileValidator,
  createAddressValidator,
  updateAddressValidator,
  addressIdValidator,
} from "../validators/user.validators";
import {
  GetProfileUseCase,
  UpdateProfileUseCase,
  GetAddressesUseCase,
  CreateAddressUseCase,
  UpdateAddressUseCase,
  DeleteAddressUseCase,
  SetDefaultAddressUseCase,
} from "../../application/use-cases";
import { UserProfileRepositoryImpl } from "../../infrastructure/repositories/user-profile.repository.impl";
import { AddressRepositoryImpl } from "../../infrastructure/repositories/address.repository.impl";
import { UserRepositoryImpl } from "@modules/auth/infrastructure/repositories/user.repository.impl";

const router = Router();

// All user routes require authentication
router.use(authenticate);

// Dependency injection
const userRepository = new UserRepositoryImpl();
const profileRepository = new UserProfileRepositoryImpl();
const addressRepository = new AddressRepositoryImpl();

const usersController = new UsersController(
  new GetProfileUseCase(profileRepository, userRepository),
  new UpdateProfileUseCase(profileRepository, userRepository),
  new GetAddressesUseCase(addressRepository),
  new CreateAddressUseCase(addressRepository),
  new UpdateAddressUseCase(addressRepository),
  new DeleteAddressUseCase(addressRepository),
  new SetDefaultAddressUseCase(addressRepository)
);

/**
 * @route   GET /api/users/profile
 * @desc    Get current user profile
 * @access  Private
 */
router.get("/profile", usersController.getProfile);

/**
 * @route   PATCH /api/users/profile
 * @desc    Update current user profile
 * @access  Private
 */
router.patch(
  "/profile",
  validate(updateProfileValidator),
  usersController.updateProfile
);

/**
 * @route   POST /api/users/avatar
 * @desc    Upload user avatar
 * @access  Private
 */
router.post("/avatar", usersController.uploadAvatar);

/**
 * @route   DELETE /api/users/avatar
 * @desc    Delete user avatar
 * @access  Private
 */
router.delete("/avatar", usersController.deleteAvatar);

/**
 * @route   GET /api/users/addresses
 * @desc    Get all user addresses
 * @access  Private
 */
router.get("/addresses", usersController.getAddresses);

/**
 * @route   POST /api/users/addresses
 * @desc    Create new address
 * @access  Private
 */
router.post(
  "/addresses",
  validate(createAddressValidator),
  usersController.createAddress
);

/**
 * @route   PATCH /api/users/addresses/:id
 * @desc    Update address
 * @access  Private
 */
router.patch(
  "/addresses/:id",
  validate(updateAddressValidator),
  usersController.updateAddress
);

/**
 * @route   DELETE /api/users/addresses/:id
 * @desc    Delete address
 * @access  Private
 */
router.delete(
  "/addresses/:id",
  validate(addressIdValidator),
  usersController.deleteAddress
);

/**
 * @route   POST /api/users/addresses/:id/default
 * @desc    Set address as default
 * @access  Private
 */
router.post(
  "/addresses/:id/default",
  validate(addressIdValidator),
  usersController.setDefaultAddress
);

/**
 * @route   GET /api/users/:id
 * @desc    Get user by ID (public profile)
 * @access  Private
 */
router.get("/:id", usersController.getUserById);

export { router as usersRouter };
