// ============================================================================
// src/modules/conversations/application/use-cases/get-conversation.use-case.ts
// ============================================================================
import { IConversationRepository } from "../../domain/repositories/conversation.repository";
import { NotFoundError, ForbiddenError } from "@core/errors";

export class GetConversationUseCase {
  constructor(
    private readonly conversationRepository: IConversationRepository
  ) {}

  async execute(id: string, userId: string) {
    const conversation = await this.conversationRepository.findById(id);

    if (!conversation) {
      throw new NotFoundError("Conversation not found");
    }

    if (
      conversation.cookId !== userId &&
      conversation.customerId !== userId
    ) {
      throw new ForbiddenError("You are not part of this conversation");
    }

    return conversation.toJSON();
  }
}

