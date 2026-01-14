// ============================================================================
// src/modules/notifications/presentation/routes/notifications.routes.ts
// ============================================================================
import { Router } from "express";
import { authenticate, validate } from "@core/middlewares";
import { NotificationsController } from "../controllers/notifications.controller";
import {
  getNotificationsValidator,
  notificationIdParamValidator,
  markReadValidator,
  preferencesValidator,
} from "../validators/notification.validators";
import { NotificationRepositoryImpl } from "../../infrastructure/repositories/notification.repository.impl";
import { NotificationPreferencesRepositoryImpl } from "../../infrastructure/repositories/notification-preferences.repository.impl";
import {
  GetNotificationsUseCase,
  GetNotificationUseCase,
  MarkNotificationsReadUseCase,
  MarkAllNotificationsReadUseCase,
  GetUnreadCountUseCase,
  GetNotificationPreferencesUseCase,
  UpdateNotificationPreferencesUseCase,
} from "../../application/use-cases";

const router = Router();

// All routes require authentication
router.use(authenticate);

// Dependency injection
const notificationRepository = new NotificationRepositoryImpl();
const preferencesRepository = new NotificationPreferencesRepositoryImpl();

const notificationsController = new NotificationsController(
  new GetNotificationsUseCase(notificationRepository),
  new GetNotificationUseCase(notificationRepository),
  new MarkNotificationsReadUseCase(notificationRepository),
  new MarkAllNotificationsReadUseCase(notificationRepository),
  new GetUnreadCountUseCase(notificationRepository),
  new GetNotificationPreferencesUseCase(preferencesRepository),
  new UpdateNotificationPreferencesUseCase(preferencesRepository)
);

/**
 * @route   GET /api/notifications
 * @desc    Get notifications for current user
 * @access  Private
 */
router.get(
  "/",
  validate(getNotificationsValidator),
  notificationsController.getNotifications
);

/**
 * @route   GET /api/notifications/:id
 * @desc    Get a single notification
 * @access  Private
 */
router.get(
  "/:id",
  validate(notificationIdParamValidator),
  notificationsController.getNotification
);

/**
 * @route   POST /api/notifications/mark-read
 * @desc    Mark notifications as read
 * @access  Private
 */
router.post(
  "/mark-read",
  validate(markReadValidator),
  notificationsController.markAsRead
);

/**
 * @route   POST /api/notifications/mark-all-read
 * @desc    Mark all notifications as read
 * @access  Private
 */
router.post("/mark-all-read", notificationsController.markAllAsRead);

/**
 * @route   GET /api/notifications/unread-count
 * @desc    Get unread notifications count
 * @access  Private
 */
router.get("/unread-count", notificationsController.getUnreadCount);

/**
 * @route   GET /api/notifications/preferences
 * @desc    Get notification preferences for current user
 * @access  Private
 */
router.get("/preferences", notificationsController.getPreferences);

/**
 * @route   PATCH /api/notifications/preferences
 * @desc    Update notification preferences for current user
 * @access  Private
 */
router.patch(
  "/preferences",
  validate(preferencesValidator),
  notificationsController.updatePreferences
);

export { router as notificationsRouter };

