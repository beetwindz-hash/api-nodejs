// ============================================================================
// src/modules/reviews/presentation/routes/reviews.routes.ts
// ============================================================================
import { Router } from "express";
import { authenticate, authorize, validate } from "@core/middlewares";
import { ReviewsController } from "../controllers/reviews.controller";
import {
  createReviewValidator,
  replyReviewValidator,
  reviewIdValidator,
  searchReviewsValidator,
  cookIdParamValidator,
} from "../validators/review.validators";
import { ReviewRepositoryImpl } from "../../infrastructure/repositories/review.repository.impl";
import { OrderRepositoryImpl } from "@modules/orders/infrastructure/repositories/order.repository.impl";
import { CookRepositoryImpl } from "@modules/cooks/infrastructure/repositories/cook.repository.impl";
import {
  CreateReviewUseCase,
  GetReviewUseCase,
  SearchReviewsUseCase,
  ReplyReviewUseCase,
  DeleteReviewUseCase,
  GetCookReviewsUseCase,
  GetCookReviewStatsUseCase,
} from "../../application/use-cases";

const router = Router();

// Dependency injection
const reviewRepository = new ReviewRepositoryImpl();
const orderRepository = new OrderRepositoryImpl();
const cookRepository = new CookRepositoryImpl();

const reviewsController = new ReviewsController(
  new CreateReviewUseCase(reviewRepository, orderRepository, cookRepository),
  new GetReviewUseCase(reviewRepository),
  new SearchReviewsUseCase(reviewRepository),
  new ReplyReviewUseCase(reviewRepository, cookRepository),
  new DeleteReviewUseCase(reviewRepository),
  new GetCookReviewsUseCase(reviewRepository),
  new GetCookReviewStatsUseCase(reviewRepository, cookRepository)
);

/**
 * @route   GET /api/reviews
 * @desc    Get all reviews (with filters)
 * @access  Public
 */
router.get(
  "/",
  validate(searchReviewsValidator),
  reviewsController.getAll
);

/**
 * @route   GET /api/reviews/:id
 * @desc    Get review by ID
 * @access  Public
 */
router.get(
  "/:id",
  validate(reviewIdValidator),
  reviewsController.getById
);

/**
 * @route   POST /api/reviews
 * @desc    Create review
 * @access  Private (Customer)
 */
router.post(
  "/",
  authenticate,
  authorize("customer"),
  validate(createReviewValidator),
  reviewsController.create
);

/**
 * @route   POST /api/reviews/:id/reply
 * @desc    Reply to review
 * @access  Private (Cook)
 */
router.post(
  "/:id/reply",
  authenticate,
  authorize("cook"),
  validate(reviewIdValidator),
  validate(replyReviewValidator),
  reviewsController.reply
);

/**
 * @route   DELETE /api/reviews/:id
 * @desc    Delete review
 * @access  Private (Owner)
 */
router.delete(
  "/:id",
  authenticate,
  validate(reviewIdValidator),
  reviewsController.delete
);

/**
 * @route   GET /api/cooks/:id/reviews
 * @desc    Get cook's reviews
 * @access  Public
 */
router.get(
  "/cooks/:id/reviews",
  validate(cookIdParamValidator),
  reviewsController.getCookReviews
);

/**
 * @route   GET /api/cooks/:cookId/reviews/stats
 * @desc    Get cook review stats
 * @access  Public
 */
router.get(
  "/cooks/:cookId/reviews/stats",
  validate(cookIdParamValidator),
  reviewsController.getCookStats
);

export { router as reviewsRouter };

