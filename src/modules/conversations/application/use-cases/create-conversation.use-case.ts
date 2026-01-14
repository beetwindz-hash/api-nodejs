// ============================================================================
// src/modules/conversations/application/use-cases/create-conversation.use-case.ts
// ============================================================================
import { IConversationRepository } from "../../domain/repositories/conversation.repository";
import { ConversationEntity } from "../../domain/entities/conversation.entity";
import { MessageEntity } from "../../domain/entities/message.entity";
import { IMessageRepository } from "../../domain/repositories/conversation.repository";
import { CreateConversationDto } from "../dto/conversation.dto";
import { PaginationUtil } from "@core/utils";

export class CreateConversationUseCase {
  constructor(
    private readonly conversationRepository: IConversationRepository,
    private readonly messageRepository: IMessageRepository
  ) {}

  async execute(userId: string, dto: CreateConversationDto, isCook: boolean) {
    const cookId = isCook ? userId : dto.cookId;
    const customerId = isCook ? dto.cookId : userId;

    let conversation = await this.conversationRepository.findBetweenUsers(
      cookId,
      customerId,
      dto.dishName
    );

    if (!conversation) {
      conversation = ConversationEntity.create({
        cookId,
        customerId,
        dishName: dto.dishName,
      });
      conversation = await this.conversationRepository.save(conversation);
    }

    let initialMessageJson: any = null;

    if (dto.initialMessage && dto.initialMessage.trim().length > 0) {
      const message = MessageEntity.create({
        conversationId: conversation.id,
        senderId: userId,
        content: dto.initialMessage.trim(),
        isOrder: false,
      });

      const saved = await this.messageRepository.save(message);
      conversation.updateLastMessage(
        saved.content,
        saved.createdAt,
        isCook
      );
      await this.conversationRepository.save(conversation);

      initialMessageJson = saved.toJSON();
    }

    const convJson = conversation.toJSON();

    return {
      ...convJson,
      lastMessage: convJson.lastMessage,
      lastMessageAt: convJson.lastMessageAt,
      unreadCount: convJson.unreadCount,
      initialMessage: initialMessageJson,
    };
  }
}

