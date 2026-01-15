# Notifications API Documentation

## Overview

The Notifications API manages user notifications and notification preferences.

**Base URL**: `/api/notifications`

---

## Endpoints

### 1. Get All Notifications

**GET** `/api/notifications`

Get notifications for authenticated user.

#### Headers

```
Authorization: Bearer <access_token>
```

#### Query Parameters

- `type` (string, optional): Filter by notification type
- `isRead` (boolean, optional): Filter by read status
- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Results per page (1-100, default: 10)

#### Example Request

```
GET /api/notifications?isRead=false&page=1&limit=20
```

#### Success Response (200 OK)

```json
{
  "data": [
    {
      "id": "507f1f77bcf86cd799439011",
      "userId": "507f1f77bcf86cd799439012",
      "type": "order_update",
      "title": "Order Confirmed",
      "message": "Your order #ORD-L5Z3R9X-A8B2C has been confirmed by the cook",
      "data": {
        "orderId": "507f1f77bcf86cd799439013",
        "orderNumber": "ORD-L5Z3R9X-A8B2C",
        "status": "confirmed"
      },
      "isRead": false,
      "readAt": null,
      "createdAt": "2026-01-15T11:05:00.000Z",
      "updatedAt": "2026-01-15T11:05:00.000Z"
    },
    {
      "id": "507f1f77bcf86cd799439014",
      "userId": "507f1f77bcf86cd799439012",
      "type": "message",
      "title": "New Message",
      "message": "You have a new message about Traditional Couscous",
      "data": {
        "conversationId": "507f1f77bcf86cd799439015",
        "messageId": "507f1f77bcf86cd799439016"
      },
      "isRead": true,
      "readAt": "2026-01-15T12:00:00.000Z",
      "createdAt": "2026-01-15T11:30:00.000Z",
      "updatedAt": "2026-01-15T12:00:00.000Z"
    }
  ],
  "meta": {
    "requestId": "abc-123",
    "timestamp": "2026-01-15T14:00:00.000Z",
    "page": 1,
    "limit": 20,
    "total": 45,
    "totalPages": 3,
    "hasNext": true,
    "hasPrev": false
  }
}
```

---

### 2. Get Notification by ID

**GET** `/api/notifications/:id`

Get a specific notification.

#### Headers

```
Authorization: Bearer <access_token>
```

#### Success Response (200 OK)

```json
{
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "userId": "507f1f77bcf86cd799439012",
    "type": "order_update",
    "title": "Order Confirmed",
    "message": "Your order #ORD-L5Z3R9X-A8B2C has been confirmed by the cook",
    "data": {
      "orderId": "507f1f77bcf86cd799439013",
      "orderNumber": "ORD-L5Z3R9X-A8B2C",
      "status": "confirmed"
    },
    "isRead": false,
    "readAt": null,
    "createdAt": "2026-01-15T11:05:00.000Z",
    "updatedAt": "2026-01-15T11:05:00.000Z"
  }
}
```

---

### 3. Mark Notifications as Read

**POST** `/api/notifications/mark-read`

Mark specific notifications as read.

#### Headers

```
Authorization: Bearer <access_token>
```

#### Request Body

```json
{
  "ids": ["507f1f77bcf86cd799439011", "507f1f77bcf86cd799439014"]
}
```

#### Fields

- `ids` (string[], required): Array of notification IDs to mark as read

#### Success Response (200 OK)

```json
{
  "data": {
    "updated": 2
  },
  "message": "Notifications marked as read successfully"
}
```

---

### 4. Mark All Notifications as Read

**POST** `/api/notifications/mark-all-read`

Mark all notifications as read for authenticated user.

#### Headers

```
Authorization: Bearer <access_token>
```

#### Success Response (200 OK)

```json
{
  "data": {
    "updated": 15
  },
  "message": "All notifications marked as read successfully"
}
```

---

### 5. Get Unread Count

**GET** `/api/notifications/unread-count`

Get count of unread notifications.

#### Headers

```
Authorization: Bearer <access_token>
```

#### Success Response (200 OK)

```json
{
  "data": {
    "count": 8
  }
}
```

---

### 6. Get Notification Preferences

**GET** `/api/notifications/preferences`

Get notification preferences for authenticated user.

#### Headers

```
Authorization: Bearer <access_token>
```

#### Success Response (200 OK)

```json
{
  "data": {
    "id": "507f1f77bcf86cd799439017",
    "userId": "507f1f77bcf86cd799439012",
    "push": {
      "order_update": true,
      "new_order": true,
      "message": true,
      "review": true,
      "application_update": true
    },
    "email": {
      "order_update": true,
      "new_order": false,
      "message": false,
      "review": true,
      "application_update": true
    },
    "createdAt": "2026-01-01T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  }
}
```

---

### 7. Update Notification Preferences

**PATCH** `/api/notifications/preferences`

Update notification preferences.

#### Headers

```
Authorization: Bearer <access_token>
```

#### Request Body

```json
{
  "push": {
    "order_update": true,
    "new_order": true,
    "message": false,
    "review": true,
    "application_update": true
  },
  "email": {
    "order_update": true,
    "new_order": false,
    "message": false,
    "review": false,
    "application_update": true
  }
}
```

#### Success Response (200 OK)

```json
{
  "data": {
    "id": "507f1f77bcf86cd799439017",
    "userId": "507f1f77bcf86cd799439012",
    "push": {
      "order_update": true,
      "new_order": true,
      "message": false,
      "review": true,
      "application_update": true
    },
    "email": {
      "order_update": true,
      "new_order": false,
      "message": false,
      "review": false,
      "application_update": true
    },
    "createdAt": "2026-01-01T10:00:00.000Z",
    "updatedAt": "2026-01-15T14:30:00.000Z"
  },
  "message": "Notification preferences updated"
}
```

---

## Notification Types

### order_update

Order status changes (confirmed, preparing, ready, delivering, delivered, cancelled)

**Example Data**:

```json
{
  "orderId": "507f1f77bcf86cd799439013",
  "orderNumber": "ORD-L5Z3R9X-A8B2C",
  "status": "confirmed"
}
```

### new_order

New order received (for cooks)

**Example Data**:

```json
{
  "orderId": "507f1f77bcf86cd799439013",
  "orderNumber": "ORD-L5Z3R9X-A8B2C",
  "customerName": "John Doe",
  "total": 4097
}
```

### message

New message in conversation

**Example Data**:

```json
{
  "conversationId": "507f1f77bcf86cd799439015",
  "messageId": "507f1f77bcf86cd799439016",
  "senderName": "Chef's Kitchen"
}
```

### review

New review received (for cooks)

**Example Data**:

```json
{
  "reviewId": "507f1f77bcf86cd799439018",
  "orderId": "507f1f77bcf86cd799439013",
  "rating": 5,
  "customerName": "John Doe"
}
```

### application_update

Cook application status change

**Example Data**:

```json
{
  "applicationId": "507f1f77bcf86cd799439019",
  "status": "approved"
}
```

---

## Notification Channels

### Push Notifications

Real-time notifications delivered to mobile apps and web browsers

### Email Notifications

Notifications sent to user's email address

### Preferences

Users can enable/disable each notification type for each channel independently

---

## Default Preferences

When a user account is created, these are the default notification settings:

```json
{
  "push": {
    "order_update": true,
    "new_order": true,
    "message": true,
    "review": true,
    "application_update": true
  },
  "email": {
    "order_update": true,
    "new_order": true,
    "message": true,
    "review": true,
    "application_update": true
  }
}
```

---

## Validation Rules

- **Notification IDs**: Must be valid MongoDB ObjectIds
- **Preference Values**: Must be boolean (true/false)
- **Notification Types**: Must be one of the defined types

---

## Best Practices

### For Users

- Enable notifications for important updates (orders, messages)
- Disable email for high-frequency notifications to reduce inbox clutter
- Regularly mark notifications as read to keep count accurate

### For Developers

- Always check user preferences before sending notifications
- Include relevant data in notification payload for deep linking
- Use appropriate notification type for each event
- Respect user's channel preferences (push vs email)

---

## Notes

- Notifications are automatically created by the system for specific events
- Users cannot create notifications manually
- Unread count updates in real-time as notifications are marked as read
- Preferences apply to future notifications only
- Marking a notification as read is permanent (cannot be unmarked)
