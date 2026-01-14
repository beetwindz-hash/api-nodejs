// ============================================================================
// src/modules/conversations/application/use-cases/send-message.use-case.ts
// ============================================================================
import {
  IConversationRepository,
  IMessageRepository,
} from "../../domain/repositories/conversation.repository";
import { MessageEntity } from "../../domain/entities/message.entity";
import { SendMessageDto } from "../dto/conversation.dto";
import { NotFoundError, ForbiddenError } from "@core/errors";

export class SendMessageUseCase {
  constructor(
    private readonly conversationRepository: IConversationRepository,
    private readonly messageRepository: IMessageRepository
  ) {}

  async execute(
    conversationId: string,
    userId: string,
    dto: SendMessageDto,
    isCook: boolean
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

    const message = MessageEntity.create({
      conversationId,
      senderId: userId,
      content: dto.content.trim(),
      isOrder: dto.isOrder ?? false,
    });

    const saved = await this.messageRepository.save(message);

    conversation.updateLastMessage(
      saved.content,
      saved.createdAt,
      isCook
    );
    await this.conversationRepository.save(conversation);

    return saved.toJSON();
  }
}

