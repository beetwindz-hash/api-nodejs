// ============================================================================
// src/modules/conversations/application/use-cases/get-messages.use-case.ts
// ============================================================================
import {
  IConversationRepository,
  IMessageRepository,
} from "../../domain/repositories/conversation.repository";
import { PaginationUtil } from "@core/utils";
import { NotFoundError, ForbiddenError } from "@core/errors";

export class GetMessagesUseCase {
  constructor(
    private readonly conversationRepository: IConversationRepository,
    private readonly messageRepository: IMessageRepository
  ) {}

  async execute(
    conversationId: string,
    userId: string,
    page?: number,
    limit?: number
  ) {
    const conversation = await this.conversationRepository.findById(
      conversationId
    );

    if (!conversation) {
      throw new NotFoundError("Conversation not found");
    }

    if (
      conversation.cookId !== userId &&
      conversation.customerId !== userId
    ) {
      throw new ForbiddenError("You are not part of this conversation");
    }

    const pagination = PaginationUtil.getPagination({ page, limit });

    const { messages, total } =
      await this.messageRepository.findByConversationId(conversationId, {
        page: pagination.page,
        limit: pagination.limit,
      });

    return {
      messages: messages.map((m) => m.toJSON()),
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        total,
        totalPages: Math.ceil(total / pagination.limit),
      },
    };
  }
}

