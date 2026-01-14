// ============================================================================
// src/modules/admin/presentation/routes/admin.routes.ts
// ============================================================================
import { Router } from "express";
import { authenticate, authorize, validate } from "@core/middlewares";
import { AdminController } from "../controllers/admin.controller";
import {
  paginationValidator,
  userFiltersValidator,
  orderFiltersValidator,
  userIdParamValidator,
} from "../validators/admin.validators";
import { AdminRepositoryImpl } from "../../infrastructure/repositories/admin.repository.impl";
import {
  GetAdminStatsUseCase,
  GetAdminUsersUseCase,
  GetAdminUserUseCase,
  UpdateUserStatusUseCase,
  DeleteUserUseCase,
  GetAdminOrdersUseCase,
  GetAdminAnalyticsUseCase,
} from "../../application/use-cases";

const router = Router();

// Admin-only routes
router.use(authenticate, authorize("admin"));

// Dependency injection
const adminRepository = new AdminRepositoryImpl();

const adminController = new AdminController(
  new GetAdminStatsUseCase(adminRepository),
  new GetAdminUsersUseCase(adminRepository),
  new GetAdminUserUseCase(adminRepository),
  new UpdateUserStatusUseCase(adminRepository),
  new DeleteUserUseCase(adminRepository),
  new GetAdminOrdersUseCase(adminRepository),
  new GetAdminAnalyticsUseCase(adminRepository)
);

/**
 * @route   GET /api/admin/stats
 * @desc    Get overview stats
 * @access  Admin
 */
router.get("/stats", adminController.getStats);

/**
 * @route   GET /api/admin/users
 * @desc    List users with filters
 * @access  Admin
 */
router.get(
  "/users",
  validate(paginationValidator),
  validate(userFiltersValidator),
  adminController.getUsers
);

/**
 * @route   GET /api/admin/users/:id
 * @desc    Get user by ID
 * @access  Admin
 */
router.get(
  "/users/:id",
  validate(userIdParamValidator),
  adminController.getUserById
);

/**
 * @route   POST /api/admin/users/:id/suspend
 * @desc    Suspend user
 * @access  Admin
 */
router.post(
  "/users/:id/suspend",
  validate(userIdParamValidator),
  adminController.suspendUser
);

/**
 * @route   POST /api/admin/users/:id/activate
 * @desc    Activate user
 * @access  Admin
 */
router.post(
  "/users/:id/activate",
  validate(userIdParamValidator),
  adminController.activateUser
);

/**
 * @route   DELETE /api/admin/users/:id
 * @desc    Delete user
 * @access  Admin
 */
router.delete(
  "/users/:id",
  validate(userIdParamValidator),
  adminController.deleteUser
);

/**
 * @route   GET /api/admin/orders
 * @desc    List orders with filters
 * @access  Admin
 */
router.get(
  "/orders",
  validate(paginationValidator),
  validate(orderFiltersValidator),
  adminController.getOrders
);

/**
 * @route   GET /api/admin/analytics
 * @desc    Get analytics (last 30 days)
 * @access  Admin
 */
router.get("/analytics", adminController.getAnalytics);

export { router as adminRouter };

