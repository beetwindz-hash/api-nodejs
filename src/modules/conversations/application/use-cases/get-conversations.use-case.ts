// ============================================================================
// src/modules/conversations/application/use-cases/get-conversations.use-case.ts
// ============================================================================
import { IConversationRepository } from "../../domain/repositories/conversation.repository";
import { PaginationUtil } from "@core/utils";

export class GetConversationsUseCase {
  constructor(
    private readonly conversationRepository: IConversationRepository
  ) {}

  async execute(userId: string, page?: number, limit?: number) {
    const pagination = PaginationUtil.getPagination({ page, limit });

    const { conversations, total } =
      await this.conversationRepository.findByUser(userId, {
        page: pagination.page,
        limit: pagination.limit,
      });

    return {
      conversations: conversations.map((c) => c.toJSON()),
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        total,
        totalPages: Math.ceil(total / pagination.limit),
      },
    };
  }
}

