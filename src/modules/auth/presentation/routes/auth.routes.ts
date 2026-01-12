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
  new ForgotPasswordUseCase(userRepository),
  new ResetPasswordUseCase(userRepository),
  new GetMeUseCase(userRepository)
);

// Public routes
router.post("/login", validate(loginValidator), authController.login);
router.post("/register", validate(registerValidator), authController.register);
router.post(
  "/refresh",
  validate(refreshTokenValidator),
  authController.refreshToken
);
router.post(
  "/forgot-password",
  validate(forgotPasswordValidator),
  authController.forgotPassword
);
router.post(
  "/reset-password",
  validate(resetPasswordValidator),
  authController.resetPassword
);

// Protected routes
router.post("/logout", authenticate, authController.logout);
router.get("/me", authenticate, authController.getMe);

export { router as authRouter };
