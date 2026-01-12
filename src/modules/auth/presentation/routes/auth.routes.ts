// ============================================================================
// src/modules/auth/presentation/routes/auth.routes.ts
// ============================================================================
import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { validate, authenticate } from "@core/middlewares";
import {
  loginValidator,
  registerValidator,
  refreshTokenValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
} from "../validators/auth.validators";
import { UserRepositoryImpl } from "../../infrastructure/repositories/user.repository.impl";
import {
  LoginUseCase,
  RegisterUseCase,
  RefreshTokenUseCase,
  LogoutUseCase,
  ForgotPasswordUseCase,
  ResetPasswordUseCase,
  GetMeUseCase,
} from "../../application/use-cases";

const router = Router();

// Dependency injection
const userRepository = new UserRepositoryImpl();
const authController = new AuthController(
  new LoginUseCase(userRepository),
  new RegisterUseCase(userRepository),
  new RefreshTokenUseCase(userRepository),
  new LogoutUseCase(userRepository),
  new ForgotPasswordUseCase(userRepository),
  new ResetPasswordUseCase(userRepository),
  new GetMeUseCase(userRepository)
);

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post("/login", validate(loginValidator), authController.login);

/**
 * @route   POST /api/auth/register
 * @desc    Register new user
 * @access  Public
 */
router.post("/register", validate(registerValidator), authController.register);

/**
 * @route   POST /api/auth/refresh
 * @desc    Refresh access token
 * @access  Public
 */
router.post(
  "/refresh",
  validate(refreshTokenValidator),
  authController.refreshToken
);

/**
 * @route   POST /api/auth/forgot-password
 * @desc    Request password reset
 * @access  Public
 */
router.post(
  "/forgot-password",
  validate(forgotPasswordValidator),
  authController.forgotPassword
);

/**
 * @route   POST /api/auth/reset-password
 * @desc    Reset password with token
 * @access  Public
 */
router.post(
  "/reset-password",
  validate(resetPasswordValidator),
  authController.resetPassword
);

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user
 * @access  Private
 */
router.post("/logout", authenticate, authController.logout);

/**
 * @route   GET /api/auth/me
 * @desc    Get current user
 * @access  Private
 */
router.get("/me", authenticate, authController.getMe);

export { router as authRouter };
