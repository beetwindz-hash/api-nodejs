# Conversations API Documentation

## Overview

The Conversations API manages messaging between customers and cooks.

**Base URL**: `/api/conversations`

---

## Endpoints

### 1. Get All Conversations

**GET** `/api/conversations`

Get all conversations for authenticated user.

#### Headers

```
Authorization: Bearer <access_token>
```

#### Query Parameters

- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Results per page (1-100, default: 10)

#### Success Response (200 OK)

```json
{
  "data": {
    "conversations": [
      {
        "id": "507f1f77bcf86cd799439011",
        "cookId": "507f1f77bcf86cd799439012",
        "customerId": "507f1f77bcf86cd799439013",
        "dishName": "Traditional Couscous",
        "lastMessage": "What time can you deliver?",
        "lastMessageAt": "2026-01-15T14:30:00.000Z",
        "unreadCount": 2,
        "createdAt": "2026-01-15T10:00:00.000Z",
        "updatedAt": "2026-01-15T14:30:00.000Z"
      },
      {
        "id": "507f1f77bcf86cd799439014",
        "cookId": "507f1f77bcf86cd799439015",
        "customerId": "507f1f77bcf86cd799439013",
        "dishName": "Baklava",
        "lastMessage": "Order received, preparing now",
        "lastMessageAt": "2026-01-14T16:00:00.000Z",
        "unreadCount": 0,
        "createdAt": "2026-01-14T15:00:00.000Z",
        "updatedAt": "2026-01-14T16:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "totalPages": 3
    }
  }
}
```

---

### 2. Get Conversation by ID

**GET** `/api/conversations/:id`

Get a specific conversation.

#### Headers

```
Authorization: Bearer <access_token>
```

#### Success Response (200 OK)

```json
{
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "cookId": "507f1f77bcf86cd799439012",
    "customerId": "507f1f77bcf86cd799439013",
    "dishName": "Traditional Couscous",
    "lastMessage": "What time can you deliver?",
    "lastMessageAt": "2026-01-15T14:30:00.000Z",
    "unreadCount": 2,
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T14:30:00.000Z"
  }
}
```

#### Error Responses

- **403 Forbidden**: Not part of this conversation
- **404 Not Found**: Conversation not found

---

### 3. Get Conversation Messages

**GET** `/api/conversations/:id/messages`

Get all messages in a conversation.

#### Headers

```
Authorization: Bearer <access_token>
```

#### Query Parameters

- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Results per page (1-100, default: 20)

#### Success Response (200 OK)

```json
{
  "data": {
    "messages": [
      {
        "id": "507f1f77bcf86cd799439016",
        "conversationId": "507f1f77bcf86cd799439011",
        "senderId": "507f1f77bcf86cd799439013",
        "content": "What time can you deliver?",
        "isOrder": false,
        "isRead": false,
        "createdAt": "2026-01-15T14:30:00.000Z",
        "updatedAt": "2026-01-15T14:30:00.000Z"
      },
      {
        "id": "507f1f77bcf86cd799439017",
        "conversationId": "507f1f77bcf86cd799439011",
        "senderId": "507f1f77bcf86cd799439012",
        "content": "I can deliver between 6-8 PM today",
        "isOrder": false,
        "isRead": true,
        "createdAt": "2026-01-15T14:25:00.000Z",
        "updatedAt": "2026-01-15T14:26:00.000Z"
      },
      {
        "id": "507f1f77bcf86cd799439018",
        "conversationId": "507f1f77bcf86cd799439011",
        "senderId": "507f1f77bcf86cd799439013",
        "content": "Hi, I'm interested in ordering your couscous",
        "isOrder": false,
        "isRead": true,
        "createdAt": "2026-01-15T14:00:00.000Z",
        "updatedAt": "2026-01-15T14:01:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 3,
      "totalPages": 1
    }
  }
}
```

**Note**: Messages are returned in reverse chronological order (newest first).

---

### 4. Create Conversation

**POST** `/api/conversations`

Create a new conversation (or retrieve existing one).

#### Headers

```
Authorization: Bearer <access_token>
```

#### Request Body

```json
{
  "cookId": "507f1f77bcf86cd799439012",
  "dishName": "Traditional Couscous",
  "initialMessage": "Hi, I'm interested in ordering your couscous. Is it available today?"
}
```

#### Fields

- `cookId` (string, required): Cook's ID
- `dishName` (string, required): Dish name being discussed
- `initialMessage` (string, optional): First message (1-2000 characters)

#### Success Response (201 Created)

```json
{
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "cookId": "507f1f77bcf86cd799439012",
    "customerId": "507f1f77bcf86cd799439013",
    "dishName": "Traditional Couscous",
    "lastMessage": "Hi, I'm interested in ordering your couscous. Is it available today?",
    "lastMessageAt": "2026-01-15T14:00:00.000Z",
    "unreadCount": 1,
    "initialMessage": {
      "id": "507f1f77bcf86cd799439018",
      "conversationId": "507f1f77bcf86cd799439011",
      "senderId": "507f1f77bcf86cd799439013",
      "content": "Hi, I'm interested in ordering your couscous. Is it available today?",
      "isOrder": false,
      "isRead": false,
      "createdAt": "2026-01-15T14:00:00.000Z",
      "updatedAt": "2026-01-15T14:00:00.000Z"
    },
    "createdAt": "2026-01-15T14:00:00.000Z",
    "updatedAt": "2026-01-15T14:00:00.000Z"
  }
}
```

**Note**: If a conversation already exists between the customer and cook for the same dish, it returns the existing conversation.

---

### 5. Send Message

**POST** `/api/conversations/:id/messages`

Send a message in a conversation.

#### Headers

```
Authorization: Bearer <access_token>
```

#### Request Body

```json
{
  "content": "I can deliver between 6-8 PM today",
  "isOrder": false
}
```

#### Fields

- `content` (string, required): Message text (1-2000 characters)
- `isOrder` (boolean, optional): Flag if message is order-related (default: false)

#### Success Response (201 Created)

```json
{
  "data": {
    "id": "507f1f77bcf86cd799439017",
    "conversationId": "507f1f77bcf86cd799439011",
    "senderId": "507f1f77bcf86cd799439012",
    "content": "I can deliver between 6-8 PM today",
    "isOrder": false,
    "isRead": false,
    "createdAt": "2026-01-15T14:25:00.000Z",
    "updatedAt": "2026-01-15T14:25:00.000Z"
  }
}
```

#### Error Responses

- **403 Forbidden**: Not part of this conversation
- **404 Not Found**: Conversation not found

---

### 6. Mark Conversation as Read

**POST** `/api/conversations/:id/read`

Mark all messages in a conversation as read.

#### Headers

```
Authorization: Bearer <access_token>
```

#### Success Response (200 OK)

```json
{
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "cookId": "507f1f77bcf86cd799439012",
    "customerId": "507f1f77bcf86cd799439013",
    "dishName": "Traditional Couscous",
    "lastMessage": "What time can you deliver?",
    "lastMessageAt": "2026-01-15T14:30:00.000Z",
    "unreadCount": 0,
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T14:35:00.000Z"
  },
  "message": "Conversation marked as read"
}
```

---

## Conversation Flow

### Creating a Conversation

1. Customer finds a dish they're interested in
2. Customer creates conversation with cook about that dish
3. Optional initial message is sent
4. Conversation is created or existing one is returned

### Messaging

1. Both parties can send messages
2. Messages are marked as unread for recipient
3. Unread count increases for recipient
4. When recipient views conversation, messages marked as read

### Unread Count

- Tracks unread messages separately for cook and customer
- Increments when other party sends message
- Resets to 0 when user marks conversation as read

---

## Message Types

### Regular Messages

- `isOrder: false`
- General conversation about dish, availability, etc.

### Order-Related Messages

- `isOrder: true`
- Messages about specific orders, delivery, etc.

---

## Validation Rules

- **Dish Name**: 1-255 characters (required)
- **Message Content**: 1-2000 characters (required)
- **Initial Message**: 1-2000 characters (optional)

---

## Best Practices

### For Customers

- Ask specific questions about dishes
- Confirm availability before ordering
- Be clear about delivery preferences

### For Cooks

- Respond promptly to inquiries
- Provide clear availability information
- Confirm order details in messages

---

## Notes

- Conversations are unique per customer-cook-dish combination
- Creating a conversation with the same cook and dish returns existing conversation
- Messages are paginated with newest first
- Unread count shows total unread messages in conversation
- Both parties receive updates when new messages arrive
