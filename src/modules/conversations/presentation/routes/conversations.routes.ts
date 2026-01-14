// ============================================================================
// src/modules/conversations/presentation/routes/conversations.routes.ts
// ============================================================================
import { Router } from "express";
import { authenticate, validate } from "@core/middlewares";
import { ConversationsController } from "../controllers/conversations.controller";
import {
  conversationIdValidator,
  createConversationValidator,
  sendMessageValidator,
  paginationValidator,
} from "../validators/conversation.validators";
import {
  ConversationRepositoryImpl,
  MessageRepositoryImpl,
} from "../../infrastructure/repositories/conversation.repository.impl";
import {
  GetConversationsUseCase,
  GetConversationUseCase,
  GetMessagesUseCase,
  SendMessageUseCase,
  CreateConversationUseCase,
  MarkConversationReadUseCase,
} from "../../application/use-cases";

const router = Router();

// All routes require authentication
router.use(authenticate);

// Dependency injection
const conversationRepository = new ConversationRepositoryImpl();
const messageRepository = new MessageRepositoryImpl();

const conversationsController = new ConversationsController(
  new GetConversationsUseCase(conversationRepository),
  new GetConversationUseCase(conversationRepository),
  new GetMessagesUseCase(conversationRepository, messageRepository),
  new SendMessageUseCase(conversationRepository, messageRepository),
  new CreateConversationUseCase(conversationRepository, messageRepository),
  new MarkConversationReadUseCase(conversationRepository, messageRepository)
);

/**
 * @route   GET /api/conversations
 * @desc    Get all conversations for current user
 * @access  Private
 */
router.get(
  "/",
  validate(paginationValidator),
  conversationsController.getConversations
);

/**
 * @route   GET /api/conversations/:id
 * @desc    Get conversation by ID
 * @access  Private
 */
router.get(
  "/:id",
  validate(conversationIdValidator),
  conversationsController.getConversation
);

/**
 * @route   GET /api/conversations/:id/messages
 * @desc    Get messages for a conversation
 * @access  Private
 */
router.get(
  "/:id/messages",
  validate(conversationIdValidator),
  validate(paginationValidator),
  conversationsController.getMessages
);

/**
 * @route   POST /api/conversations/:id/messages
 * @desc    Send message in a conversation
 * @access  Private
 */
router.post(
  "/:id/messages",
  validate(conversationIdValidator),
  validate(sendMessageValidator),
  conversationsController.sendMessage
);

/**
 * @route   POST /api/conversations
 * @desc    Create conversation
 * @access  Private
 */
router.post(
  "/",
  validate(createConversationValidator),
  conversationsController.createConversation
);

/**
 * @route   POST /api/conversations/:id/read
 * @desc    Mark conversation messages as read
 * @access  Private
 */
router.post(
  "/:id/read",
  validate(conversationIdValidator),
  conversationsController.markAsRead
);

export { router as conversationsRouter };

