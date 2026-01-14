// ============================================================================
// src/modules/conversations/presentation/controllers/conversations.controller.ts
// ============================================================================
import { Request, Response, NextFunction } from "express";
import { ResponseUtil } from "@core/utils";
import {
  GetConversationsUseCase,
  GetConversationUseCase,
  GetMessagesUseCase,
  SendMessageUseCase,
  CreateConversationUseCase,
  MarkConversationReadUseCase,
} from "../../application/use-cases";

export class ConversationsController {
  constructor(
    private readonly getConversationsUseCase: GetConversationsUseCase,
    private readonly getConversationUseCase: GetConversationUseCase,
    private readonly getMessagesUseCase: GetMessagesUseCase,
    private readonly sendMessageUseCase: SendMessageUseCase,
    private readonly createConversationUseCase: CreateConversationUseCase,
    private readonly markConversationReadUseCase: MarkConversationReadUseCase
  ) {}

  getConversations = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const page = req.query.page
        ? parseInt(req.query.page as string, 10)
        : undefined;
      const limit = req.query.limit
        ? parseInt(req.query.limit as string, 10)
        : undefined;

      const result = await this.getConversationsUseCase.execute(
        req.user!.userId,
        page,
        limit
      );

      ResponseUtil.success(res, result);
    } catch (error) {
      next(error);
    }
  };

  getConversation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await this.getConversationUseCase.execute(
        req.params.id,
        req.user!.userId
      );

      ResponseUtil.success(res, result);
    } catch (error) {
      next(error);
    }
  };

  getMessages = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const page = req.query.page
        ? parseInt(req.query.page as string, 10)
        : undefined;
      const limit = req.query.limit
        ? parseInt(req.query.limit as string, 10)
        : undefined;

      const result = await this.getMessagesUseCase.execute(
        req.params.id,
        req.user!.userId,
        page,
        limit
      );

      ResponseUtil.success(res, result);
    } catch (error) {
      next(error);
    }
  };

  sendMessage = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const isCook = req.user!.role === "cook";

      const result = await this.sendMessageUseCase.execute(
        req.params.id,
        req.user!.userId,
        req.body,
        isCook
      );

      ResponseUtil.created(res, result);
    } catch (error) {
      next(error);
    }
  };

  createConversation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const isCook = req.user!.role === "cook";

      const result = await this.createConversationUseCase.execute(
        req.user!.userId,
        req.body,
        isCook
      );

      ResponseUtil.created(res, result);
    } catch (error) {
      next(error);
    }
  };

  markAsRead = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await this.markConversationReadUseCase.execute(
        req.params.id,
        req.user!.userId
      );

      ResponseUtil.success(res, result, "Conversation marked as read");
    } catch (error) {
      next(error);
    }
  };
}

