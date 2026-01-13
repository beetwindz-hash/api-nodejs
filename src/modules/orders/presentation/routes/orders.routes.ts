// ============================================================================
// src/modules/orders/presentation/routes/orders.routes.ts
// ============================================================================
import { Router } from "express";
import { authenticate, authorize, validate } from "@core/middlewares";
import { OrdersController } from "../controllers/orders.controller";
import {
  createOrderValidator,
  updateOrderStatusValidator,
  cancelOrderValidator,
  searchOrdersValidator,
  orderIdValidator,
} from "../validators/order.validators";
import { OrderRepositoryImpl } from "../../infrastructure/repositories/order.repository.impl";
import { DishRepositoryImpl } from "@modules/dishes/infrastructure/repositories/dish.repository.impl";
import { CookRepositoryImpl } from "@modules/cooks/infrastructure/repositories/cook.repository.impl";
import { AddressRepositoryImpl } from "@modules/users/infrastructure/repositories/address.repository.impl";
import { UserRepositoryImpl } from "@modules/auth/infrastructure/repositories/user.repository.impl";
import {
  CreateOrderUseCase,
  GetOrderUseCase,
  GetMyOrdersUseCase,
  GetCookOrdersUseCase,
  ConfirmOrderUseCase,
  UpdateOrderStatusUseCase,
  CancelOrderUseCase,
  SearchOrdersUseCase,
} from "../../application/use-cases";

const router = Router();

// All routes require authentication
router.use(authenticate);

// Dependency injection
const orderRepository = new OrderRepositoryImpl();
const dishRepository = new DishRepositoryImpl();
const cookRepository = new CookRepositoryImpl();
const addressRepository = new AddressRepositoryImpl();
const userRepository = new UserRepositoryImpl();

const ordersController = new OrdersController(
  new CreateOrderUseCase(
    orderRepository,
    dishRepository,
    cookRepository,
    addressRepository
  ),
  new GetOrderUseCase(orderRepository, userRepository, cookRepository),
  new GetMyOrdersUseCase(orderRepository),
  new GetCookOrdersUseCase(orderRepository, cookRepository),
  new ConfirmOrderUseCase(orderRepository, cookRepository),
  new UpdateOrderStatusUseCase(orderRepository, cookRepository),
  new CancelOrderUseCase(orderRepository, cookRepository),
  new SearchOrdersUseCase(orderRepository)
);

/**
 * @route   POST /api/orders
 * @desc    Create new order
 * @access  Private (Customer)
 */
router.post(
  "/",
  authorize("customer"),
  validate(createOrderValidator),
  ordersController.createOrder
);

/**
 * @route   GET /api/orders/my
 * @desc    Get my orders (customer)
 * @access  Private (Customer)
 */
router.get("/my", authorize("customer"), ordersController.getMyOrders);

/**
 * @route   GET /api/orders/cook
 * @desc    Get cook's orders
 * @access  Private (Cook)
 */
router.get("/cook", authorize("cook"), ordersController.getCookOrders);

/**
 * @route   GET /api/orders/search
 * @desc    Search orders
 * @access  Private
 */
router.get(
  "/search",
  validate(searchOrdersValidator),
  ordersController.searchOrders
);

/**
 * @route   GET /api/orders/:id
 * @desc    Get order by ID
 * @access  Private (Owner or Cook)
 */
router.get("/:id", validate(orderIdValidator), ordersController.getOrder);

/**
 * @route   POST /api/orders/:id/confirm
 * @desc    Confirm order (Cook)
 * @access  Private (Cook)
 */
router.post(
  "/:id/confirm",
  authorize("cook"),
  validate(orderIdValidator),
  ordersController.confirmOrder
);

/**
 * @route   PATCH /api/orders/:id/status
 * @desc    Update order status (Cook)
 * @access  Private (Cook)
 */
router.patch(
  "/:id/status",
  authorize("cook"),
  validate(orderIdValidator),
  validate(updateOrderStatusValidator),
  ordersController.updateOrderStatus
);

/**
 * @route   POST /api/orders/:id/cancel
 * @desc    Cancel order
 * @access  Private (Customer or Cook)
 */
router.post(
  "/:id/cancel",
  validate(orderIdValidator),
  validate(cancelOrderValidator),
  ordersController.cancelOrder
);

export { router as ordersRouter };
