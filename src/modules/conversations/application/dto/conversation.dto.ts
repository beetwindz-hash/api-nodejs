// ============================================================================
// src/modules/conversations/application/dto/conversation.dto.ts
// ============================================================================

export interface CreateConversationDto {
  cookId: string;
  dishName: string;
  initialMessage?: string;
}

export interface SendMessageDto {
  content: string;
  isOrder?: boolean;
}

