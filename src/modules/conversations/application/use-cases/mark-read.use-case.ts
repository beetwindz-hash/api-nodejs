// ============================================================================
// src/modules/conversations/application/use-cases/mark-read.use-case.ts
// ============================================================================
import {
  IConversationRepository,
  IMessageRepository,
} from "../../domain/repositories/conversation.repository";
import { NotFoundError, ForbiddenError } from "@core/errors";

export class MarkConversationReadUseCase {
  constructor(
    private readonly conversationRepository: IConversationRepository,
    private readonly messageRepository: IMessageRepository
  ) {}

  async execute(conversationId: string, userId: string) {
    const conversation = await this.conversationRepository.findById(
      conversationId
    );

    if (!conversation) {
      throw new NotFoundError("Conversation not found");
    }

    const isCook = conversation.cookId === userId;
    const isCustomer = conversation.customerId === userId;

    if (!isCook && !isCustomer) {
      throw new ForbiddenError("You are not part of this conversation");
    }

    await this.messageRepository.markConversationMessagesRead(
      conversationId,
      userId
    );

    conversation.markMessagesRead(isCook);
    const updated = await this.conversationRepository.save(conversation);

    return updated.toJSON();
  }
}

